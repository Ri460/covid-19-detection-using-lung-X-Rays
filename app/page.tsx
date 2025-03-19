import { Upload } from "@/components/upload"
import { Features } from "@/components/features"
import { ModelInfo } from "@/components/model-info"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">COVID-19 Detection from Lung X-rays</h1>
        <p className="text-center mb-8 text-muted-foreground">
          Upload a lung X-ray image to detect COVID-19, Normal, Viral Pneumonia, or Lung Opacity
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Upload />
          </div>
          <div className="space-y-8">
            <ModelInfo />
            <Features />
          </div>
        </div>
      </div>
    </main>
  )
}

