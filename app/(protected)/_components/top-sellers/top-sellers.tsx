import { Progress } from "@/components/ui/progress"

export function TopSellers() {
  const topSellers = [
    {
      id: 1,
      name: "Vintage Rolex Submariner",
      sales: 12500,
      progress: 100,
    },
    {
      id: 2,
      name: "Mid-Century Modern Chair",
      sales: 9800,
      progress: 78,
    },
    {
      id: 3,
      name: "First Edition Book Collection",
      sales: 7650,
      progress: 61,
    },
    {
      id: 4,
      name: "Antique Silver Jewelry Set",
      sales: 6200,
      progress: 50,
    },
    {
      id: 5,
      name: "Rare Coin Collection",
      sales: 4800,
      progress: 38,
    },
  ]

  return (
    <div className="space-y-4">
      {topSellers.map((item) => (
        <div key={item.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-muted-foreground">${item.sales.toLocaleString()}</div>
          </div>
          <Progress value={item.progress} className="h-2" />
        </div>
      ))}
    </div>
  )
}

