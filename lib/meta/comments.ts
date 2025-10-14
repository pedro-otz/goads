// lib/meta/comments.ts
const FB_VER = process.env.NEXT_PUBLIC_FB_API_VERSION || 'v20.0';

/**
 * Responde um comentário NO INSTAGRAM (IG Graph).
 * - Para responder a um comentário específico: POST /{ig_comment_id}/replies
 */
export async function replyInstagramComment(opts: {
  accessToken: string;
  commentId: string;  // id do comentário no IG Graph
  message: string;
}) {
  const { accessToken, commentId, message } = opts;

  const url = new URL(`https://graph.facebook.com/${FB_VER}/${commentId}/replies`);
  url.searchParams.set('message', message);
  url.searchParams.set('access_token', accessToken);

  const r = await fetch(url.toString(), { method: 'POST' });
  const j = await r.json();

  if (!r.ok || (j as any)?.error) {
    const err = (j as any)?.error?.message || JSON.stringify(j);
    throw new Error(`IG reply failed: ${err}`);
  }
  return j; // { id: reply_id }
}

/**
 * Responde um comentário NO FACEBOOK (Page).
 * - Para responder a um comentário específico: POST /{comment_id}/comments
 */
export async function replyFacebookComment(opts: {
  accessToken: string; // Page Access Token
  commentId: string;   // id do comentário do post da Page
  message: string;
}) {
  const { accessToken, commentId, message } = opts;

  const url = new URL(`https://graph.facebook.com/${FB_VER}/${commentId}/comments`);
  url.searchParams.set('message', message);
  url.searchParams.set('access_token', accessToken);

  const r = await fetch(url.toString(), { method: 'POST' });
  const j = await r.json();

  if (!r.ok || (j as any)?.error) {
    const err = (j as any)?.error?.message || JSON.stringify(j);
    throw new Error(`FB reply failed: ${err}`);
  }
  return j; // { id: reply_id }
}
