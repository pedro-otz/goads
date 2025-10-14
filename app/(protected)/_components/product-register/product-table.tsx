import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Product } from "@/types/product"

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Custo de Compra</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Valor de Estoque</TableHead>
            <TableHead>Valor de Venda</TableHead>
            <TableHead>Lucro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                Nenhum produto adicionado ainda. Adicione seu primeiro produto para começar.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const inventoryValue = product.purchaseCost * product.quantity
              const potentialSalesValue = product.salesValue * product.quantity
              const profit = potentialSalesValue - inventoryValue
              const profitMargin = (profit / potentialSalesValue) * 100

              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{formatCurrency(product.purchaseCost)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{formatCurrency(inventoryValue)}</TableCell>
                  <TableCell>{formatCurrency(potentialSalesValue)}</TableCell>
                  <TableCell className={profit > 0 ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(profit)} ({profitMargin.toFixed(1)}%)
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
