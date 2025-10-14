// app/api/cron/publish-due-posts/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Platform, ScheduledStatus, MediaType } from '@prisma/client';
import { currentUser } from '@/lib/auth'; // opcional (para bloquear em dev)
const FB_VER = process.env.NEXT_PUBLIC_FB_API_VERSION || 'v20.0';

// Proteção simples com token na query (?key=...)
// Defina CRON_SECRET no seu .env e inclua na cron URL (ver seção 2)
function checkCronAuth(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');
  if (!process.env.CRON_SECRET) return true; // se não configurado, não bloqueia
  return key === process.env.CRON_SECRET;
}

/* ===== Helpers IG ===== */
async function igCreateImageContainer(
  igUserId: string,
  pageAccessToken: string,
  imageUrl: string,
  caption?: string,
  isCarouselItem?: boolean,
) {
  const form = new URLSearchParams();
  form.set('image_url', imageUrl);
  if (caption) form.set('caption', caption);
  if (isCarouselItem) form.set('is_carousel_item', 'true');
  form.set('access_token', pageAccessToken);

  const resp = await fetch(`https://graph.facebook.com/${FB_VER}/${igUserId}/media`, {
    method: 'POST',
    body: form,
  });
  const json = await resp.json();
  if (!resp.ok || json?.error) {
    throw new Error(json?.error?.message || 'Falha ao criar container de imagem (IG)');
  }
  return json; // { id }
}

async function igCreateVideoContainer(
  igUserId: string,
  pageAccessToken: string,
  videoUrl: string,
  caption?: string,
  isCarouselItem?: boolean,
) {
  const form = new URLSearchParams();
  form.set('media_type', 'VIDEO');
  form.set('video_url', videoUrl);
  if (caption) form.set('caption', caption);
  if (isCarouselItem) form.set('is_carousel_item', 'true');
  form.set('access_token', pageAccessToken);

  const resp = await fetch(`https://graph.facebook.com/${FB_VER}/${igUserId}/media`, {
    method: 'POST',
    body: form,
  });
  const json = await resp.json();
  if (!resp.ok || json?.error) {
    throw new Error(json?.error?.message || 'Falha ao criar container de vídeo (IG)');
  }
  return json; // { id }
}

async function igPublishContainer(
  igUserId: string,
  pageAccessToken: string,
  creationId: string,
) {
  const form = new URLSearchParams();
  form.set('creation_id', creationId);
  form.set('access_token', pageAccessToken);

  const resp = await fetch(`https://graph.facebook.com/${FB_VER}/${igUserId}/media_publish`, {
    method: 'POST',
    body: form,
  });
  const json = await resp.json();
  if (!resp.ok || json?.error) {
    throw new Error(json?.error?.message || 'Falha ao publicar container (IG)');
  }
  return json;
}

async function publishInstagramSingle(
  igUserId: string,
  pageAccessToken: string,
  mediaUrl: string,
  caption?: string,
) {
  const isVideo =
    /\.(mp4|mov|m4v|webm)(\?.*)?$/i.test(mediaUrl) || mediaUrl.includes('video');

  const container = isVideo
    ? await igCreateVideoContainer(igUserId, pageAccessToken, mediaUrl, caption)
    : await igCreateImageContainer(igUserId, pageAccessToken, mediaUrl, caption);

  return igPublishContainer(igUserId, pageAccessToken, container.id);
}

async function publishInstagramCarousel(
  igUserId: string,
  pageAccessToken: string,
  mediaUrls: string[],
  caption?: string,
) {
  const childIds: string[] = [];
  for (const url of mediaUrls) {
    const isVideo =
      /\.(mp4|mov|m4v|webm)(\?.*)?$/i.test(url) || url.includes('video');

    const child = isVideo
      ? await igCreateVideoContainer(igUserId, pageAccessToken, url, undefined, true)
      : await igCreateImageContainer(igUserId, pageAccessToken, url, undefined, true);

    childIds.push(child.id);
  }

  const form = new URLSearchParams();
  form.set('media_type', 'CAROUSEL');
  form.set('children', childIds.join(','));
  if (caption) form.set('caption', caption);
  form.set('access_token', pageAccessToken);

  const mediaResp = await fetch(`https://graph.facebook.com/${FB_VER}/${igUserId}/media`, {
    method: 'POST',
    body: form,
  });
  const mediaJson = await mediaResp.json();
  if (!mediaResp.ok || mediaJson?.error) {
    throw new Error(mediaJson?.error?.message || 'Falha ao criar mídia carrossel (IG)');
  }

  return igPublishContainer(igUserId, pageAccessToken, mediaJson.id);
}

/* ===== Helpers Facebook ===== */
async function publishFacebookNow(
  pageId: string,
  pageAccessToken: string,
  caption: string | undefined,
  mediaUrls: string[],
) {
  if (mediaUrls.length > 0) {
    const form = new URLSearchParams();
    form.set('url', mediaUrls[0]); // primeira imagem
    if (caption) form.set('caption', caption);
    form.set('published', 'true');
    form.set('access_token', pageAccessToken);

    const resp = await fetch(`https://graph.facebook.com/${FB_VER}/${pageId}/photos`, {
      method: 'POST',
      body: form,
    });
    const json = await resp.json();
    if (!resp.ok || json?.error) {
      throw new Error(json?.error?.message || 'Falha ao publicar foto (FB)');
    }
    return json;
  }

  const form = new URLSearchParams();
  form.set('message', caption || '');
  form.set('access_token', pageAccessToken);

  const resp = await fetch(`https://graph.facebook.com/${FB_VER}/${pageId}/feed`, {
    method: 'POST',
    body: form,
  });
  const json = await resp.json();
  if (!resp.ok || json?.error) {
    throw new Error(json?.error?.message || 'Falha ao publicar no feed (FB)');
  }
  return json;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    if (!checkCronAuth(req)) {
      return NextResponse.json({ error: 'Unauthorized cron' }, { status: 401 });
    }

    // (Opcional) Em dev você pode bloquear por user logado:
    // const user = await currentUser();
    // if (!user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const now = new Date();
    const BATCH = 10;

    // Busca posts devidos
    const due = await db.scheduledPost.findMany({
      where: {
        status: ScheduledStatus.SCHEDULED,
        scheduledAt: { lte: now },
      },
      orderBy: { scheduledAt: 'asc' },
      take: BATCH,
      include: {
        medias: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!due.length) {
      return NextResponse.json({ ok: true, processed: 0 });
    }

    let ok = 0, failed = 0;

    // Processa um por um (simples; suficiente pra protótipo)
    for (const post of due) {
      try {
        const mediaUrls = post.medias.map(m => m.url);
        const caption = post.caption || undefined;

        if (post.platform === Platform.INSTAGRAM) {
          if (!post.instagramAccountId) throw new Error('instagramAccountId ausente');
          // busca a conta IG (para obter accessToken da página)
          const meta = await db.metaAccount.findFirst({
            where: {
              userId: post.userId,
              isActive: true,
              accountType: { in: ['instagram_business', 'instagram_creator'] },
              instagramAccountId: post.instagramAccountId,
            },
          });
          if (!meta?.accessToken) throw new Error('accessToken da página ausente');

          if (!mediaUrls.length) {
            // IG exige mídia; se não tiver, marca como FAILED
            throw new Error('Instagram exige pelo menos 1 mídia');
          }

          if (mediaUrls.length > 1 || post.mediaType === MediaType.CAROUSEL) {
            await publishInstagramCarousel(post.instagramAccountId, meta.accessToken, mediaUrls, caption);
          } else {
            await publishInstagramSingle(post.instagramAccountId, meta.accessToken, mediaUrls[0], caption);
          }

          await db.scheduledPost.update({
            where: { id: post.id },
            data: { status: ScheduledStatus.PUBLISHED },
          });
          ok++;
        } else {
          // FACEBOOK
          if (!post.facebookPageId) throw new Error('facebookPageId ausente');
          const meta = await db.metaAccount.findFirst({
            where: {
              userId: post.userId,
              isActive: true,
              accountType: 'facebook_page',
              facebookPageId: post.facebookPageId,
            },
          });
          if (!meta?.accessToken) throw new Error('accessToken da página ausente');

          await publishFacebookNow(post.facebookPageId, meta.accessToken, caption, mediaUrls);

          await db.scheduledPost.update({
            where: { id: post.id },
            data: { status: ScheduledStatus.PUBLISHED },
          });
          ok++;
        }
      } catch (err) {
        failed++;
        await db.scheduledPost.update({
          where: { id: post.id },
          data: { status: ScheduledStatus.FAILED },
        });
        console.error('CRON publish error', post.id, err);
      }
    }

    return NextResponse.json({ ok: true, processed: due.length, published: ok, failed });
  } catch (e: any) {
    console.error('CRON ERROR', e);
    return NextResponse.json({ error: e?.message || 'Erro inesperado' }, { status: 500 });
  }
}
