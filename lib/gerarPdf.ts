import { PDFDocument, rgb } from "pdf-lib";
import logo from "../public/boneco.png"

export async function gerarPDF(data: any) {
  console.log(data);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const { width, height } = page.getSize();

  const maxWidth = 500;
  let yPosition = height - 50;

  function quebrarTexto(texto: string, tamanhoFonte: number, maxLargura: number) {
    const palavras = texto.split(" ");
    let linha = "";
    let linhas: string[] = [];

    for (const palavra of palavras) {
      const linhaTeste = linha.length === 0 ? palavra : linha + " " + palavra;
      const larguraTeste = linhaTeste.length * (tamanhoFonte * 0.5);

      if (larguraTeste > maxLargura) {
        linhas.push(linha);
        linha = palavra;
      } else {
        linha = linhaTeste;
      }
    }
    linhas.push(linha);
    return linhas;
  }

  const titulo = "Proposta de Licitação";
  const tamanhoFonteTitulo = 18;
  const larguraTitulo = titulo.length * (tamanhoFonteTitulo * 0.5);
  const xTitulo = (width - larguraTitulo) / 2;

  page.drawText(titulo, {
    x: xTitulo,
    y: yPosition,
    size: tamanhoFonteTitulo,
    color: rgb(0, 0, 0),
  });

  yPosition -= 60;

  page.drawText(`Razão Social: ${data.razaoSocial}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`CNPJ: ${data.cnpj}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`Endereço: ${data.endereco}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`CEP: ${data.cep}`, { x: 50, y: yPosition, size: 14 });

  yPosition -= 40;

  const total = Number(data.valor) * Number(data.quantidade);

  page.drawText(`Produto: ${data.produto}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`Marca / Modelo: ${data.marca}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`Local de Entrega: ${data.entrega}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`Valor Unitário: R$ ${data.valor}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`Quantidade: ${data.quantidade}`, { x: 50, y: yPosition, size: 14 });
  yPosition -= 30;
  page.drawText(`Total: R$ ${total.toFixed(2)}`, { x: 50, y: yPosition, size: 14, color: rgb(0, 0, 1) });

  yPosition -= 60;

  const hoje = new Date();
  const dataAtual = hoje.toLocaleDateString("pt-BR");
  page.drawText(`Data: ${dataAtual}`, { x: 50, y: yPosition, size: 12 });

  yPosition -= 40;

  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: 250, y: yPosition },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  yPosition -= 30;

  page.drawText(`Nome: ${data.nome}`, { x: 50, y: yPosition, size: 12 });
  yPosition -= 25;
  page.drawText(`CPF: ${data.cpf}`, { x: 50, y: yPosition, size: 12 });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "licitacao.pdf";
  link.click();
}
