import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplets, ArrowLeft, RefreshCw, Plus } from "lucide-react"
import Link from "next/link"
import * as React from "react";

export default function DrinkingWaterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Droplets className="h-6 w-6 text-blue-500" />
            <span className="text-slate-800">Drinking Water Inventory</span>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Drinking Water Monitoring</h1>
            <p className="text-slate-500">Detailed tracking of water tanks and consumption</p>
          </div>
          <Button variant="outline" className="gap-1 border-slate-200">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Water Supply Overview</CardTitle>
              <CardDescription>Current status of all water tanks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1 mb-6">
                <div className="text-4xl font-bold text-slate-900">680</div>
                <div className="text-slate-500">L</div>
                <div className="text-slate-500 ml-2">of 1000L total capacity</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Current level</span>
                  <span className="font-medium text-slate-700">68%</span>
                </div>
                <Progress value={68} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0 L</span>
                  <span>1000 L</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <h3 className="font-medium text-blue-700">Water Consumption Insights</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Average daily consumption: 85L</li>
                  <li>• Estimated days remaining: 8 days</li>
                  <li>• Next port arrival: May 5, 2025 (4 days)</li>
                  <li>• Recommended refill: 400L minimum</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Water Tank #1</CardTitle>
                <CardDescription>250L capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  75L <span className="text-sm font-normal text-slate-500">remaining</span>
                </div>
                <Progress value={30} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                <div className="mt-4 text-sm text-slate-500">Last updated: 10 minutes ago</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Water Tank #2</CardTitle>
                <CardDescription>250L capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  230L <span className="text-sm font-normal text-slate-500">remaining</span>
                </div>
                <Progress value={92} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                <div className="mt-4 text-sm text-slate-500">Last updated: 10 minutes ago</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Water Tank #3</CardTitle>
                <CardDescription>500L capacity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-2">
                  375L <span className="text-sm font-normal text-slate-500">remaining</span>
                </div>
                <Progress value={75} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
                <div className="mt-4 text-sm text-slate-500">Last updated: 10 minutes ago</div>
              </CardContent>
            </Card>
          </div>

          {/* <Card>
            <CardHeader>
              <CardTitle>Water Quality Monitoring</CardTitle>
              <CardDescription>Latest water quality test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">pH Level</div>
                  <div className="text-2xl font-bold text-slate-900">7.2</div>
                  <div className="text-xs text-green-600 mt-1">Normal (6.5-8.5)</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">TDS</div>
                  <div className="text-2xl font-bold text-slate-900">145 ppm</div>
                  <div className="text-xs text-green-600 mt-1">Good (&lt; 500 ppm)</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Chlorine</div>
                  <div className="text-2xl font-bold text-slate-900">0.5 mg/L</div>
                  <div className="text-xs text-green-600 mt-1">Safe (&lt; 4 mg/L)</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-slate-500 mb-1">Bacteria</div>
                  <div className="text-2xl font-bold text-slate-900">None</div>
                  <div className="text-xs text-green-600 mt-1">Safe</div>
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-500">Last water quality test: April 28, 2025</div>
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  )
}
