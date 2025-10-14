"use client"

import type React from "react"

import { useState } from "react"
import { Upload, File, X, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import FormLicitacao from "@/components/formLicitacao/FormLicitacao"
import { gerarPDF } from "@/lib/gerarPdf"

export default function MergePdf() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(event.target.files || [])])
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files) {
      const pdfFiles = Array.from(event.dataTransfer.files).filter((file) => file.type === "application/pdf")
      setSelectedFiles((prev) => [...prev, ...pdfFiles])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleMerge = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one PDF file.")
      return
    }

    setLoading(true)
    setProgress(10)

    try {
      // Convert files to base64
      const filesBase64 = await Promise.all(
        selectedFiles.map(async (file, index) => {
          const buffer = await file.arrayBuffer()
          setProgress(10 + Math.floor((index / selectedFiles.length) * 40))
          return Buffer.from(buffer).toString("base64")
        }),
      )

      setProgress(50)

      // Send to API
      const response = await fetch("/api/join-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: filesBase64 }),
      })

      setProgress(90)

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "merged-document.pdf"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setProgress(100)
      } else {
        alert("Error generating PDF.")
      }
    } catch (error) {
      console.error("Error merging PDFs:", error)
      alert("An error occurred while merging PDFs.")
    } finally {
      setLoading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="pb-6">
        <FormLicitacao onGenerate={gerarPDF} />
      </div>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gerador de Pdf</CardTitle>
          <CardDescription>Agrupe vários documentos em somente um</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File upload area */}
          <div
            className={`border-2 border-dashed rounded-lg p-10 text-center ${
              loading ? "border-gray-300 bg-gray-50" : "border-primary/20 hover:border-primary/50"
            } transition-colors cursor-pointer`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => !loading && document.getElementById("file-upload")?.click()}
          >
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
            <Upload className="h-10 w-10 mx-auto mb-3 text-primary/60" />
            <p className="text-lg font-medium">{loading ? "Gerando documentos..." : "Arraste e solte arquivos PDF aqui"}</p>
            <p className="text-sm text-muted-foreground mt-1">{loading ? "Por favor espere" : "ou clique para navegar"}</p>
          </div>

          {/* Selected files list */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Arquivos selecionados ({selectedFiles.length})
              </h3>
              <div className="max-h-60 overflow-y-auto rounded-md border">
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-3 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <File className="h-4 w-4 flex-shrink-0 text-primary/70" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFile(index)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress bar */}
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Merging PDFs...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedFiles([])}
            disabled={loading || selectedFiles.length === 0}
          >
            Limpar
          </Button>
          <Button onClick={handleMerge} disabled={loading || selectedFiles.length === 0} className="min-w-[120px]">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              "Merge PDFs"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

