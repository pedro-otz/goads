// pages/api/dv360/getData.ts

import { NextResponse } from 'next/server';
export async function GET(req: Request) {
    try {
        // 1. Obter a sessão do usuário
        // const apiUrl = `http://104.154.42.60/app/Services/big-query/dv_gam/retorna_dv+gam.php?start_date=${start_date}&end_date=${end_date}`;
        const apiUrl = `http://104.154.42.60/app/Services/big-query/dv360/fetch_data_for_goads.php`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 3. Retornar a lista no formato que o frontend espera
        return NextResponse.json({ data });

    } catch (error) {
        console.error('[DV360 ADVERTISERS GET]', error);
        return new NextResponse(JSON.stringify({ error: 'Erro interno do servidor' }), { status: 500 });
    }
}