"use client"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import Contact from "@/components/contact";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function PriceCalculator() {
  const [productionCost, setProductionCost] = useState("");
  const [operationalExpenses, setOperationalExpenses] = useState("");
  const [taxes, setTaxes] = useState("");
  const [profitMargin, setProfitMargin] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    calculatePrice();
  }, [productionCost, operationalExpenses, taxes, profitMargin, discount]);

  const calculatePrice = () => {
    setError("");

    const cost = Number.parseFloat(productionCost) || 0;
    const expenses = Number.parseFloat(operationalExpenses) || 0;
    const taxRate = Number.parseFloat(taxes) || 0;
    const margin = Number.parseFloat(profitMargin) || 0;
    const discountRate = Number.parseFloat(discount) || 0;

    if (cost < 0 || expenses < 0 || taxRate < 0 || margin < 0 || discountRate < 0) {
      setError("Por favor, insira números válidos e positivos.");
      return;
    }

    const total = cost + expenses;
    const taxAmount = total * (taxRate / 100);
    const priceBeforeProfit = total + taxAmount;
    const finalPrice = priceBeforeProfit / (1 - margin / 100);
    const discountedPrice = finalPrice * (1 - discountRate / 100);

    setTotalCost(total);
    setTaxAmount(taxAmount);
    setFinalPrice(finalPrice);
    setDiscountedPrice(discountedPrice);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4 text-center">Configure suas margens de lucro de uma forma simples e eficiente</h2>
        <p className="mb-6 text-lg text-gray-700 text-center">
          Simplifique o processo de cálculo de preços e garanta as melhores margens e custos para seu negócio.
        </p>
        <div className="flex justify-center">
          <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
            Teste Grátis 
            <ArrowRight
            className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Calculadora de Preço</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="productionCost">Custo de Produção</Label>
            <Input
              id="productionCost"
              type="number"
              value={productionCost}
              onChange={(e) => setProductionCost(e.target.value)}
              placeholder="Insira o custo de produção"
            />
          </div>
          <div>
            <Label htmlFor="operationalExpenses">Despesas Operacionais</Label>
            <Input
              id="operationalExpenses"
              type="number"
              value={operationalExpenses}
              onChange={(e) => setOperationalExpenses(e.target.value)}
              placeholder="Insira as despesas operacionais"
            />
          </div>
          <div>
            <Label htmlFor="taxes">Impostos (%)</Label>
            <Input
              id="taxes"
              type="number"
              value={taxes}
              onChange={(e) => setTaxes(e.target.value)}
              placeholder="Insira a porcentagem de impostos"
            />
          </div>
          <div>
            <Label htmlFor="profitMargin">Margem de Lucro (%)</Label>
            <Input
              id="profitMargin"
              type="number"
              value={profitMargin}
              onChange={(e) => setProfitMargin(e.target.value)}
              placeholder="Insira a margem de lucro"
            />
          </div>
          <div>
            <Label htmlFor="discount">Desconto (%)</Label>
            <Input
              id="discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Insira o desconto (opcional)"
            />
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-6 space-y-2">
          <p>
            <strong>Custo Total:</strong> R${totalCost.toFixed(2)}
          </p>
          <p>
            <strong>Valor dos Impostos:</strong> R${taxAmount.toFixed(2)}
          </p>
          <p>
            <strong>Preço Final:</strong> R${finalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Preço com Desconto:</strong> R${discountedPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
    <Contact/>
    <Faq/>
    <Footer/> 
    </>
  );
}
