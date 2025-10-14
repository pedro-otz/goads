// app/api/uploads-supa/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // **NÃO** exponha no client!
const BUCKET = process.env.SUPABASE_BUCKET || 'Goads';

function sanitizeName(name: string) {
  return name.normalize('NFKD').replace(/[^\w.\-]+/g, '-');
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: 'Envie um POST multipart/form-data com campo "file".',
  });
}

export async function POST(req: Request) {
  const debug: Record<string, any> = { step: 'start' };

  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Supabase não configurado no servidor.', debug: { SUPABASE_URL: !!SUPABASE_URL, SERVICE_KEY: !!SUPABASE_SERVICE_ROLE_KEY } },
        { status: 500 },
      );
    }

    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'Campo "file" é obrigatório.' }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const safe = sanitizeName(file.name || 'file.bin');
    const unique = `${Date.now()}-${(globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2))}-${safe}`;
    const path = `images/${unique}`;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    debug.step = 'upload';
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, bytes, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    });

    if (upErr) {
      return NextResponse.json({ error: upErr.message || 'Falha no upload', debug: { ...debug, upErr } }, { status: 400 });
    }

    // Tenta pública; se bucket for privado, gera signed URL longa
    debug.step = 'public-url';
    let { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
    let url = pub.publicUrl;

    if (!url) {
      debug.step = 'signed-url';
      const { data: signed, error: sErr } = await supabase
        .storage
        .from(BUCKET)
        .createSignedUrl(path, 60 * 60 * 24 * 365); // 1 ano

      if (sErr || !signed?.signedUrl) {
        return NextResponse.json(
          { error: sErr?.message || 'Falha ao gerar URL', debug: { ...debug, sErr } },
          { status: 400 },
        );
      }
      url = signed.signedUrl;
    }

    debug.step = 'done';
    return NextResponse.json({ ok: true, url, path, bucket: BUCKET, debug }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Erro inesperado no upload', debug },
      { status: 500 },
    );
  }
}
