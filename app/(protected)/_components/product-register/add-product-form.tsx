"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/types/product"

interface AddProductFormProps {
  onSubmit: (produto: Omit<Product, "id">) => void
  onCancel: () => void
}

export function AddProductForm({ onSubmit, onCancel }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    purchaseCost: "",
    quantity: "",
    salesValue: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpa o erro quando o usuário digita
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "O nome é obrigatório"
    if (!formData.brand.trim()) newErrors.brand = "A marca é obrigatória"

    if (!formData.purchaseCost || isNaN(Number(formData.purchaseCost)) || Number(formData.purchaseCost) <= 0) {
      newErrors.purchaseCost = "É necessário um custo de compra válido"
    }

    if (
      !formData.quantity ||
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) <= 0 ||
      !Number.isInteger(Number(formData.quantity))
    ) {
      newErrors.quantity = "É necessário uma quantidade válida"
    }

    if (!formData.salesValue || isNaN(Number(formData.salesValue)) || Number(formData.salesValue) <= 0) {
      newErrors.salesValue = "É necessário um valor de venda válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit({
      name: formData.name,
      brand: formData.brand,
      purchaseCost: Number(formData.purchaseCost),
      quantity: Number(formData.quantity),
      salesValue: Number(formData.salesValue),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Digite o nome do produto" />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Marca</Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Digite o nome da marca"
          />
          {errors.brand && <p className="text-sm text-red-500">{errors.brand}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseCost">Custo de Compra</Label>
          <Input
            id="purchaseCost"
            name="purchaseCost"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.purchaseCost}
            onChange={handleChange}
            placeholder="0.00"
          />
          {errors.purchaseCost && <p className="text-sm text-red-500">{errors.purchaseCost}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantidade</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            step="1"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="0"
          />
          {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="salesValue">Valor de Venda</Label>
          <Input
            id="salesValue"
            name="salesValue"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.salesValue}
            onChange={handleChange}
            placeholder="0.00"
          />
          {errors.salesValue && <p className="text-sm text-red-500">{errors.salesValue}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Adicionar Produto</Button>
      </div>
    </form>
  )
}
