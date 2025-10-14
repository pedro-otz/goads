import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, Package, TrendingUp } from "lucide-react"

interface SalesSummaryProps {
  totals: {
    totalInventoryValue: number
    totalSalesValue: number
    totalProfit: number
  }
}

export function SalesSummary({ totals }: SalesSummaryProps) {
  const { totalInventoryValue, totalSalesValue, totalProfit } = totals
  const profitMargin = totalSalesValue > 0 ? (totalProfit / totalSalesValue) * 100 : 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Valor Total do Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Package className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">{formatCurrency(totalInventoryValue)}</div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Custo do estoque atual</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Valor Potencial de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="text-2xl font-bold">{formatCurrency(totalSalesValue)}</div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Valor se todo o estoque for vendido</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Lucro Potencial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            {totalProfit >= 0 ? (
              <ArrowUpIcon className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownIcon className="mr-2 h-4 w-4 text-red-500" />
            )}
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? "text-green-500" : "text-red-500"}`}>
              {formatCurrency(totalProfit)}
            </div>
          </div>
          <div className="flex items-center mt-1">
            <TrendingUp className="mr-2 h-3 w-3 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Margem de lucro:{" "}
              <span className={totalProfit >= 0 ? "text-green-500" : "text-red-500"}>{profitMargin.toFixed(1)}%</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
