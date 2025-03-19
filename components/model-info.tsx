import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Layers, Cpu, BarChart } from "lucide-react"

export function ModelInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Custom CNN</h3>
            <p className="text-sm text-muted-foreground">
              Convolutional Neural Network optimized for X-ray classification
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Architecture</h3>
            <p className="text-sm text-muted-foreground">4 convolutional blocks with batch normalization and dropout</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Cpu className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Input Size</h3>
            <p className="text-sm text-muted-foreground">224×224 pixel images processed in RGB format</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <BarChart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Performance</h3>
            <p className="text-sm text-muted-foreground">
              ~95% accuracy on validation data with high precision and recall
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

