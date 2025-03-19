import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TreesIcon as Lungs, WormIcon as Virus, Microscope, Scan } from "lucide-react"

export function Features() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Classification Categories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-red-100 p-2 rounded-full dark:bg-red-900">
            <Virus className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-medium">COVID-19</h3>
            <p className="text-sm text-muted-foreground">
              Coronavirus infection with characteristic ground-glass opacities
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-green-100 p-2 rounded-full dark:bg-green-900">
            <Lungs className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-medium">Normal</h3>
            <p className="text-sm text-muted-foreground">Healthy lung X-rays with no visible abnormalities</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-amber-100 p-2 rounded-full dark:bg-amber-900">
            <Microscope className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <h3 className="font-medium">Viral Pneumonia</h3>
            <p className="text-sm text-muted-foreground">Lung infection caused by viruses other than SARS-CoV-2</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
            <Scan className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium">Lung Opacity</h3>
            <p className="text-sm text-muted-foreground">
              Abnormal appearance in lungs that may indicate various conditions
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

