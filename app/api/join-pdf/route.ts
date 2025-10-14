import { NextRequest } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const { files } = await req.json();

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ message: "Nenhum arquivo enviado" }), { status: 400 });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const existingPdfBytes = new Uint8Array(Buffer.from(file, "base64")); 
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();

    return new Response(mergedPdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=merged.pdf",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Erro ao gerar PDF" }), { status: 500 });
  }
}
