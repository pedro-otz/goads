import { NextResponse } from 'next/server';

import { db } from '@/lib/db'; // Ajuste o caminho para o seu cliente Prisma
import { auth } from '@/auth';

export async function GET(req: Request) {
  try {
    // 1. Obter a sessão do usuário
    const session = await auth();
   

    if (!session || !session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Não autorizado' }), { status: 401 });
    }

    // 2. Buscar no banco de dados os advertisers associados a esse usuário
    const advertisers = await db.advertiser.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        displayName: 'asc', // Ordenar por nome para uma exibição consistente
      },
    });

    // 3. Retornar a lista no formato que o frontend espera
    return NextResponse.json({ advertisers });

  } catch (error) {
    console.error('[DV360 ADVERTISERS GET]', error);
    return new NextResponse(JSON.stringify({ error: 'Erro interno do servidor' }), { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    // 1. Obter a sessão do usuário
    const session = await auth();

    if (!session || !session.user?.id) {
      return new NextResponse(JSON.stringify({ error: 'Não autorizado' }), { status: 401 });
    }

    // 2. Extrair os dados do corpo da requisição
    const body = await req.json();
    const { dv360AdvertiserId, displayName } = body;

    // 3. Validar os dados recebidos
    if (!dv360AdvertiserId || !displayName) {
      return new NextResponse(JSON.stringify({ error: 'ID do Advertiser e Nome são obrigatórios' }), { status: 400 });
    }

    // 4. Criar o novo advertiser no banco de dados, associando ao usuário
    const newAdvertiser = await db.advertiser.create({
      data: {
        userId: session.user.id,
        dv360AdvertiserId,
        displayName,
      },
    });

    // 5. Retornar o advertiser criado com status 201 (Created)
    return NextResponse.json(newAdvertiser, { status: 201 });

  } catch (error) {
    console.error('[DV360 ADVERTISERS POST]', error);
    // Adicionar verificação para erros de constraint (ID duplicado)
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
       return new NextResponse(JSON.stringify({ error: 'Este ID de Advertiser já está cadastrado.' }), { status: 409 });
    }
    return new NextResponse(JSON.stringify({ error: 'Erro interno do servidor' }), { status: 500 });
  }
}
