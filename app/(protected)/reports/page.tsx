"use client"

import { Product } from "@/types/product";
import { SalesSummary } from "../_components/product-register/sales-summary";
import { useState } from "react";

const Reports = () => {

const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Wireless Earbuds",
      brand: "SoundTech",
      purchaseCost: 45,
      quantity: 15,
      salesValue: 89.99,
    },
    {
      id: "2",
      name: "Smart Watch",
      brand: "TechFit",
      purchaseCost: 75,
      quantity: 8,
      salesValue: 149.99,
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      brand: "AudioMax",
      purchaseCost: 35,
      quantity: 12,
      salesValue: 69.99,
    },
  ])
const calculateTotals = () => {
    const totalInventoryValue = products.reduce((sum, product) => sum + product.purchaseCost * product.quantity, 0)

    const totalSalesValue = products.reduce((sum, product) => sum + product.salesValue * product.quantity, 0)

    const totalProfit = totalSalesValue - totalInventoryValue

    return {
      totalInventoryValue,
      totalSalesValue,
      totalProfit,
    }
  }
    return ( 
        <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
            <SalesSummary totals={calculateTotals()} />
        </div>
     );
}
 
export default Reports;