"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format, startOfDay, endOfDay, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";


// ===== Types =====

type Advertiser = {
  id: string;
  dv360AdvertiserId: string;
  displayName: string;
  createdAt: string;
};

type TableDataItem = {
  dv_date: string;
  advertiser_id: string;
  line_item_id: string;
  line_item_name: string;
  dv_impressions: string;
  dv_clicks: string;
  dv_revenue_usd: string; // Custo em BRL, segundo a regra de negócio
  ad_unit_name: string;
  country_name: string;
  gam_revenue_usd: string; // Receita em USD (precisa de conversão)
  gam_impressions: string;
  gam_clicks: string;
  usd_to_brl: string;
};


// ===== helpers =====
async function fetchJSON<T = any>(url: string, options?: RequestInit) {
  const r = await fetch(url, { ...options, cache: "no-store" });
  if (!r.ok) {
    const errorText = await r.text().catch(() => "Erro desconhecido na API externa.");
    throw new Error(errorText || r.statusText || "Erro");
  }
  const j = await r.json().catch(() => ({}));
  return j as T;
}

function formatNumber(n?: number | string | null) {
  if (!n) return "0";
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("pt-BR").format(num);
}

function formatCurrency(n?: number | null) {
  if (!n) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(n);
}

function formatPercent(p?: number | null) {
  if (p === null || p === undefined || isNaN(p)) return "0,0%";
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(p);
}

type RangeKey = "today" | "7d" | "29d";
function getRangeISO(range: RangeKey) {
  const now = new Date();
  if (range === "today") {
    return {
      since: startOfDay(now).toISOString(),
      until: endOfDay(now).toISOString()
    };
  }
  if (range === "7d") {
    return {
      since: startOfDay(subDays(now, 6)).toISOString(),
      until: endOfDay(now).toISOString()
    };
  }
  return {
    since: startOfDay(subDays(now, 28)).toISOString(),
    until: endOfDay(now).toISOString()
  };
}



export default function Dashboard() {
  const [range, setRange] = useState<RangeKey>("7d");
  const { since, until } = useMemo(() => getRangeISO(range), [range]);

  // ===== Estados para DV360 =====
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [loadingAdvertisers, setLoadingAdvertisers] = useState(true);
  const [selectedAdvertiserId, setSelectedAdvertiserId] = useState<string>("");

  // ===== Estados para os dados da tabela =====
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [loadingTableData, setLoadingTableData] = useState(false);

  // Estados para o formulário do modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdvertiserId, setNewAdvertiserId] = useState("");
  const [newAdvertiserName, setNewAdvertiserName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAdvertisers = async () => {
    setLoadingAdvertisers(true);
    try {
      const data = await fetchJSON<{ advertisers: Advertiser[] }>("/api/dv360/advertisers");
      setAdvertisers(data.advertisers || []);
    } catch (e: any) {
      toast.error("Erro ao carregar advertisers", { description: e?.message });
    } finally {
      setLoadingAdvertisers(false);
    }
  };

  useEffect(() => {
    loadAdvertisers();
  }, []);

  useEffect(() => {
    if (!selectedAdvertiserId && advertisers.length > 0) {
      setSelectedAdvertiserId(advertisers[0].id);
    }
  }, [advertisers, selectedAdvertiserId]);

  useEffect(() => {
    if (loadingAdvertisers === false && advertisers.length === 0) {
      setIsDialogOpen(true);
    }
  }, [loadingAdvertisers, advertisers]);

  // useEffect para carregar os dados da tabela
  useEffect(() => {
    if (!since || !until) return;

    const loadTableData = async () => {
      setLoadingTableData(true);
      setTableData([]); // Limpa dados antigos

      try {
        const startDate = format(new Date(since), "yyyy-MM-dd");
        const endDate = format(new Date(until), "yyyy-MM-dd");

        const result = await fetchJSON<{ data: TableDataItem[] }>(`/api/dv360/getData`);

        setTableData(result.data.data || []);
        console.log(result.data.data);

      } catch (e: any) {
        toast.error("Erro ao carregar dados da tabela", { description: e?.message });
      } finally {
        setLoadingTableData(false);
      }
    };

    loadTableData();
  }, [since, until]);


  const handleRegisterAdvertiser = async () => {
    if (!newAdvertiserId.trim() || !newAdvertiserName.trim()) {
      toast.error("Preencha o ID e o Nome do Advertiser.");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetchJSON("/api/dv360/advertisers", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dv360AdvertiserId: newAdvertiserId,
          displayName: newAdvertiserName,
        }),
      });
      toast.success("Advertiser cadastrado com sucesso!");
      setNewAdvertiserId("");
      setNewAdvertiserName("");
      setIsDialogOpen(false);
      await loadAdvertisers();
    } catch (e: any) {
      toast.error("Erro ao cadastrar advertiser", { description: e?.message });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className="flex h-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            Painel — Dv360
          </h1>

          {/* Botão para abrir o Modal de Cadastro */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Cadastrar Advertiser
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Advertiser</DialogTitle>
                <DialogDescription>
                  Insira o ID e um nome de identificação para a sua propriedade (Advertiser) do DV360.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="adv-name" className="text-right">Nome</Label>
                  <Input id="adv-name" placeholder="Ex: Minha Empresa" className="col-span-3" value={newAdvertiserName} onChange={(e) => setNewAdvertiserName(e.target.value)} disabled={isSubmitting} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="adv-id" className="text-right">Advertiser ID</Label>
                  <Input id="adv-id" placeholder="Apenas números" className="col-span-3" value={newAdvertiserId} onChange={(e) => setNewAdvertiserId(e.target.value)} disabled={isSubmitting} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline" disabled={isSubmitting}>Cancelar</Button></DialogClose>
                <Button onClick={handleRegisterAdvertiser} disabled={isSubmitting}>{isSubmitting ? "Salvando..." : "Salvar"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Range selector */}
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant={range === "today" ? "default" : "outline"} onClick={() => setRange("today")}>Hoje</Button>
            <Button size="sm" variant={range === "7d" ? "default" : "outline"} onClick={() => setRange("7d")}>Últimos 7 dias</Button>
            <Button size="sm" variant={range === "29d" ? "default" : "outline"} onClick={() => setRange("29d")}>Últimos 29 dias</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader><CardTitle>Advertisers Cadastrados</CardTitle><CardDescription>Selecione um advertiser para ver os detalhes das campanhas.</CardDescription></CardHeader>
            <CardContent>
              {loadingAdvertisers ? (
                <p className="text-sm text-muted-foreground">Carregando...</p>
              ) : advertisers.length > 0 ? (
                <Select value={selectedAdvertiserId} onValueChange={setSelectedAdvertiserId}>
                  <SelectTrigger><SelectValue placeholder="Selecione um advertiser" /></SelectTrigger>
                  <SelectContent>
                    {advertisers.map((adv) => (
                      <SelectItem key={adv.id} value={adv.id}>{adv.displayName} ({adv.dv360AdvertiserId})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum advertiser cadastrado ainda.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabela de dados */}
        <Card>
          <CardHeader>
            <CardTitle>Resultados das Campanhas</CardTitle>
            <CardDescription>
              Dados consolidados do DV360 e GAM para o período selecionado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingTableData ? (
              <p className="text-sm text-muted-foreground text-center p-4">Carregando dados...</p>
            ) : tableData.length > 0 ? (
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Line Item</TableHead>
                      <TableHead className="text-right">Receita (GAM)</TableHead>
                      <TableHead className="text-right">Custo (DV)</TableHead>
                      <TableHead className="text-right">Impressões (DV)</TableHead>
                      <TableHead className="text-right">Cliques (DV)</TableHead>
                      <TableHead className="text-right text-green-600">Lucro (R$)</TableHead>
                      <TableHead className="text-right font-bold">ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((item, index) => {
                      // Cálculos
                      const gamRevenueUSD = parseFloat(item.gam_revenue_usd) || 0;
                      const dvCostBRL = parseFloat(item.dv_revenue_usd) || 0;
                      const usdToBrlRate = parseFloat(item.usd_to_brl) || 0;

                      // Regra de negócio: gam_revenue / 1.000.000 * cotação
                      const gamRevenueBRL = (gamRevenueUSD / 1000000) * usdToBrlRate;
                      const profit = gamRevenueBRL - dvCostBRL;
                      const roi = dvCostBRL > 0 ? profit / dvCostBRL : 0;

                      return (
                        <TableRow key={item.line_item_id + index}>
                          <TableCell className="font-medium">{item.line_item_name}</TableCell>
                          <TableCell className="text-right">{formatCurrency(gamRevenueBRL)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(dvCostBRL)}</TableCell>
                          <TableCell className="text-right">{formatNumber(item.dv_impressions)}</TableCell>
                          <TableCell className="text-right">{formatNumber(item.dv_clicks)}</TableCell>
                          <TableCell className={`text-right font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(profit)}
                          </TableCell>
                          <TableCell className={`text-right font-bold ${roi >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            {formatPercent(roi)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center p-4">Nenhum dado encontrado para o período selecionado.</p>
            )}
          </CardContent>
        </Card>

      </main>
    </section>
  );
}

