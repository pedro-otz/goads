// hooks/useSupabaseUpload.ts
import { useState } from 'react';

type UseSupabaseUploadReturn = {
  progressPorcent: number;
  uploadImage: (file: File | null, callback: (url: string) => void) => void;
};

export const useSupabaseUpload = (): UseSupabaseUploadReturn => {
  const [progressPorcent, setProgressPorcent] = useState(0);

  const uploadImage = async (file: File | null, callback: (url: string) => void) => {
    if (!file) return;

    // progresso “fake” até 95%
    setProgressPorcent(0);
    let tick = 0;
    const timer = setInterval(() => {
      tick += 1;
      setProgressPorcent((p) => Math.min(p + 7, 95));
      if (tick > 100) clearInterval(timer);
    }, 150);

    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await fetch('/api/uploads-supa', { method: 'POST', body: fd });
      const txt = await res.text();

      let data: any;
      try {
        data = JSON.parse(txt);
      } catch {
        throw new Error(`Resposta inválida do servidor: ${txt.slice(0, 200)}`);
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Falha no upload');
      }

      setProgressPorcent(100);
      callback(data.url as string);
    } catch (err: any) {
      setProgressPorcent(0);
      alert('Erro no upload: ' + (err?.message || String(err)));
    } finally {
      clearInterval(timer);
    }
  };

  return { progressPorcent, uploadImage };
};
