// lib/ai/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
const GEMINI_KEY = process.env.GOOGLE_GEMINI_API_KEY!;
if (!GEMINI_KEY) {
  console.warn('[AI] GOOGLE_GEMINI_API_KEY ausente no .env');
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

/**
 * Gera uma resposta curta e simpática para um comentário em redes sociais.
 */
export async function generateSmartReply(params: {
  commentText: string;
  postCaption?: string;
  brand?: string;
  language?: string;   // ex: 'pt-BR'
  tone?: string;       // ex: 'amigável', 'profissional', 'descontraído'
}) {
  const {
    commentText,
    postCaption = '',
    brand = 'sua marca',
    language = 'pt-BR',
    tone = 'amigável',
  } = params;

  const prompt = `
Você é um social media do ${brand}. Responda ao comentário do jeito ${tone}, em ${language}.
- Seja breve (1-2 frases).
- Sem links, sem emojis em excesso, sem informações sensíveis.
- Se o comentário for ofensivo, responda com educação e proponha levar para o DM.
- Se o comentário for pergunta, responda objetivamente.
Contexto do post: "${postCaption}"
Comentário recebido: "${commentText}"
Resposta:`;

  // gemini-1.5-flash é ótimo p/ latência baixa. Troque para pro se quiser melhor qualidade.
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const { response } = await model.generateContent([{ text: prompt }]);
  const text = (response?.text() || '').trim();

  // fallback bem curto, se der algo vazio
  return text || 'Obrigado pelo comentário! 😊';
}
