import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Utensils, ArrowLeft, RefreshCw, AlertTriangle, Plus } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import * as React from "react";

export default function RiceSupplyPage() {
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
            <Utensils className="h-6 w-6 text-amber-500" />
            <span className="text-slate-800">Rice Supply Inventory</span>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Rice Supply Management</h1>
            <p className="text-slate-500">Detailed tracking of rice inventory and consumption</p>
          </div>
          <div className="flex flex-row gap-4">
            <Button variant="outline" className="gap-1 border-slate-200">
                <RefreshCw className="h-4 w-4" />
                Refresh Data
            </Button>
            <Button className="gap-1 bg-green-500 hover:bg-green-600 text-white">
                <Plus className="h-4 w-4" />
                Add Rice
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Rice Supply Overview</CardTitle>
              <CardDescription>Current status of rice storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1 mb-6">
                <div className="text-4xl font-bold text-slate-900">42</div>
                <div className="text-slate-500">kg</div>
                <div className="text-slate-500 ml-2">of 100kg total capacity</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Current level</span>
                  <span className="font-medium text-slate-700">42%</span>
                </div>
                <Progress value={42} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>0 kg</span>
                  <span>100 kg</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="h-5 w-5 text-amber-500" />
                  <h3 className="font-medium text-amber-700">Rice Consumption Insights</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• Average daily consumption: 3kg</li>
                  <li>• Estimated days remaining: 14 days</li>
                  <li>• Next port arrival: May 5, 2025 (4 days)</li>
                  <li>• Recommended refill: 60kg minimum</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Rice Storage Details</CardTitle>
                <CardDescription>Main food storage compartment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">White Rice</span>
                    <span className="text-sm font-medium">30 kg</span>
                  </div>
                  <Progress value={30} max={100} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Brown Rice</span>
                    <span className="text-sm font-medium">12 kg</span>
                  </div>
                  <Progress value={12} max={100} className="h-2 bg-amber-100" indicatorClassName="bg-amber-500" />

                  <div className="mt-4 text-sm text-slate-500">Last inventory check: 1 hour ago</div>
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle className="text-base">Storage Conditions</CardTitle>
                <CardDescription>Environmental monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-slate-500 mb-1">Temperature</div>
                    <div className="text-xl font-bold text-slate-900">22°C</div>
                    <div className="text-xs text-green-600 mt-1">Optimal (18-24°C)</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-slate-500 mb-1">Humidity</div>
                    <div className="text-xl font-bold text-slate-900">45%</div>
                    <div className="text-xs text-green-600 mt-1">Optimal (&lt; 60%)</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-slate-500 mb-1">Pest Control</div>
                    <div className="text-xl font-bold text-slate-900">Active</div>
                    <div className="text-xs text-green-600 mt-1">No issues detected</div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="text-sm text-slate-500 mb-1">Last Inspection</div>
                    <div className="text-xl font-bold text-slate-900">Apr 29</div>
                    <div className="text-xs text-green-600 mt-1">2 days ago</div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Rice Consumption Planning</CardTitle>
                <CardDescription>Projected usage based on meal plan</CardDescription>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                14 days remaining
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-slate-50">
                  <h3 className="font-medium text-slate-800 mb-2">Daily Rice Consumption by Meal</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-3 bg-white rounded border">
                      <div className="text-sm text-slate-500">Breakfast</div>
                      <div className="text-lg font-medium text-slate-900">0.8 kg</div>
                      <div className="text-xs text-slate-500 mt-1">~27% of daily</div>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <div className="text-sm text-slate-500">Lunch</div>
                      <div className="text-lg font-medium text-slate-900">1.2 kg</div>
                      <div className="text-xs text-slate-500 mt-1">~40% of daily</div>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <div className="text-sm text-slate-500">Dinner</div>
                      <div className="text-lg font-medium text-slate-900">1.0 kg</div>
                      <div className="text-xs text-slate-500 mt-1">~33% of daily</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 border rounded-lg bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div className="text-sm text-amber-800">
                    At current consumption rates, rice supply will need to be replenished at the next port to maintain
                    adequate levels for the remainder of the voyage.
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="text-sm font-medium text-slate-700">Recommended Actions:</div>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li>• Order 60kg of white rice and 20kg of brown rice at next port</li>
                    <li>• Consider adjusting meal plan to reduce rice consumption if port arrival is delayed</li>
                    <li>• Inspect storage area for optimal preservation conditions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
