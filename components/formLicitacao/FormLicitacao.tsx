"use client"

import { useState } from "react";
import { Card } from "../ui/card";

export default function FormLicitacao({ onGenerate }: { onGenerate: (data: any) => void }) {
  const [formData, setFormData] = useState({
    produto: "",
    entrega: "",
    valor: "",
    quantidade: "",
    marca: "",
    numero_processo: "",
    nome : "Pedro",
    cpf : "344.112.333-05",
    razaoSocial : "Razao social teste",
    cnpj : "1231.12312.123/0001",
    endereco : "Rua Teste",
    cep : "17507-111"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Cadastrar Licitação</h2>
      <input type="text" name="produto" placeholder="Produto" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input type="text" name="entrega" placeholder="Local de Entrega" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input type="number" name="valor" placeholder="Valor" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input type="number" name="quantidade" placeholder="Quantidade" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input type="text" name="marca" placeholder="Marca do Produto" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input type="number" name="numero_processo" placeholder="Número processo" onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <button onClick={() => onGenerate(formData)} className="mt-4 p-2 bg-blue-500 text-white rounded">Gerar PDF</button>
    </Card>
  );
}
