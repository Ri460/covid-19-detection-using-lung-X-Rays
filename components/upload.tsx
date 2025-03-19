"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadIcon, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { detectCovid } from "@/lib/detect-covid"

export function Upload() {
  const [image, setImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    class: string
    confidence: number
    allClasses: { class: string; confidence: number }[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleClear = () => {
    setImage(null)
    setFileName(null)
    setResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAnalyze = async () => {
    if (!image) return

    setLoading(true)
    try {
      // In a real app, this would call the API with the image
      const result = await detectCovid(image)
      setResult(result)
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload X-ray Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center min-h-[300px] cursor-pointer",
            image ? "border-muted" : "border-primary/50",
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

          {image ? (
            <div className="relative w-full h-[300px]">
              <Image src={image || "/placeholder.svg"} alt="Uploaded X-ray" fill className="object-contain" />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <UploadIcon className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop your X-ray image here or click to browse</p>
            </div>
          )}
        </div>

        {fileName && <p className="mt-2 text-sm text-muted-foreground">File: {fileName}</p>}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" disabled={!image || loading} onClick={handleAnalyze}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze X-ray"
          )}
        </Button>

        {result && (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <span className="font-medium">Diagnosis:</span>
              <span
                className={cn(
                  "font-bold",
                  result.class === "COVID"
                    ? "text-red-500"
                    : result.class === "NORMAL"
                      ? "text-green-500"
                      : "text-amber-500",
                )}
              >
                {result.class}
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Confidence Scores:</p>
              {result.allClasses.map((item) => (
                <div key={item.class} className="flex items-center justify-between">
                  <span className="text-sm">{item.class}:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-[150px] h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          item.class === "COVID"
                            ? "bg-red-500"
                            : item.class === "NORMAL"
                              ? "bg-green-500"
                              : item.class === "VIRAL_PNEUMONIA"
                                ? "bg-amber-500"
                                : "bg-blue-500",
                        )}
                        style={{ width: `${item.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs">{(item.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

