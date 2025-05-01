"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Battery,
  Calendar,
  Clock,
  Droplets,
  Edit,
  Filter,
  LifeBuoy,
  Pill,
  Plus,
  RefreshCw,
  ScanBarcode,
  Search,
  Ship,
  ShoppingCart,
  Utensils,
  Anchor,
  Sun,
  Sunset,
  Moon,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function InventoryDashboard() {
  const [lastScan, setLastScan] = useState("Water Tank #2 - 10 minutes ago")
  const [isScanning, setIsScanning] = useState(false)
  const [voyageDuration, setVoyageDuration] = useState("7")
  const [showMealPlan, setShowMealPlan] = useState(false)

  const router = useRouter()

  const simulateScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setLastScan("Rice Storage - Just now")
    }, 2000)
  }

  const generateMealPlan = () => {
    setShowMealPlan(false)
    // Add a small delay to create a visual transition effect
    setTimeout(() => {
      setShowMealPlan(true)
    }, 300)
  }

  // Dummy data for meal plan
  const mealPlanData = [
    {
      day: "Day 1",
      meals: {
        breakfast: "Garlic Fried Rice with Egg and Tocino",
        lunch: "Chicken Adobo with Steamed Rice",
        dinner: "Sinigang na Baboy with Rice",
      },
    },
    {
      day: "Day 2",
      meals: {
        breakfast: "Champorado with Dried Fish",
        lunch: "Pancit Canton with Vegetables",
        dinner: "Beef Nilaga with Rice",
      },
    },
    {
      day: "Day 3",
      meals: {
        breakfast: "Pandesal with Cheese and Coffee",
        lunch: "Pork Menudo with Rice",
        dinner: "Grilled Fish with Ensaladang Talong",
      },
    },
    {
      day: "Day 4",
      meals: {
        breakfast: "Arroz Caldo with Egg",
        lunch: "Beef Caldereta with Rice",
        dinner: "Pinakbet with Fried Fish",
      },
    },
    {
      day: "Day 5",
      meals: {
        breakfast: "Corned Beef with Egg and Rice",
        lunch: "Chicken Tinola with Rice",
        dinner: "Kare-Kare with Rice",
      },
    },
    {
      day: "Day 6",
      meals: {
        breakfast: "Lugaw with Tokwa't Baboy",
        lunch: "Bicol Express with Rice",
        dinner: "Inihaw na Liempo with Ensalada",
      },
    },
    {
      day: "Day 7",
      meals: {
        breakfast: "Tapsilog (Beef Tapa, Egg, and Rice)",
        lunch: "Ginataang Kalabasa with Shrimp",
        dinner: "Lechon Kawali with Atchara",
      },
    },
  ]

  const consumptionData = [
    { name: "Mon", water: 120, food: 80, staples: 3 },
    { name: "Tue", water: 110, food: 85, staples: 2.5 },
    { name: "Wed", water: 130, food: 90, staples: 4 },
    { name: "Thu", water: 125, food: 75, staples: 3.5 },
    { name: "Fri", water: 115, food: 95, staples: 2 },
    { name: "Sat", water: 105, food: 70, staples: 3 },
    { name: "Sun", water: 100, food: 65, staples: 2.5 },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Ship className="h-6 w-6 text-slate-700" />
            <span className="text-slate-800">SeaFarer</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-[200px] lg:w-[300px] pl-8 border-slate-200"
              />
            </div>
            <Button variant="outline" size="icon" className="text-slate-600 border-slate-200">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh data</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-slate-600 border-slate-200">
              <Calendar className="h-4 w-4" />
              <span>Apr 30, 2025</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inventory Tracking</h1>
            <p className="text-slate-500">Real-time monitoring of essential supplies</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {/* <Button variant="outline" className="gap-1 border-slate-200" onClick={simulateScan}>
              <ScanBarcode className="h-4 w-4" />
              {isScanning ? "Scanning..." : "Scan Barcode/RFID"}
            </Button>
            <Button className="gap-1 bg-slate-900 hover:bg-slate-800">
              <Plus className="h-4 w-4" />
              Add New Item
            </Button> */}
          </div>
        </div>

        {lastScan && (
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <Badge variant="outline" className="text-slate-600 bg-slate-50 border-slate-200">
              Last Scan
            </Badge>
            {lastScan}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ResourceCard
            icon={<Droplets className="h-5 w-5 text-sky-500" />}
            title="Drinking Water"
            description="3 tanks monitored"
            value="680"
            unit="L"
            percentage={68}
            capacity={1000}
            daysRemaining={8}
            color="sky"
          />

          <ResourceCard
            icon={<Utensils className="h-5 w-5 text-amber-500" />}
            title="Rice Supply"
            description="Main food storage"
            value="42"
            unit="kg"
            percentage={42}
            capacity={100}
            daysRemaining={14}
            color="amber"
          />

          <button onClick={() => router.push("/food-inventory")} className="cursor-pointer">
            <ResourceCard
              icon={<Utensils className="h-5 w-5 text-amber-500" />}
              title="Dish Ingredients"
              description="Key supplies for daily Filipino dishes"
              value="60"
              unit="Units"
              percentage={60}
              capacity={100}
              daysRemaining={15}
              color="amber"
            />
          </button>

          <ResourceCard
            icon={<Pill className="h-5 w-5 text-rose-500" />}
            title="Medicines"
            description="First aid and prescriptions"
            value="18"
            unit="items"
            percentage={18}
            capacity={100}
            daysRemaining={18}
            color="rose"
            alert="2 items expiring soon"
          />
        </div>

        <Alert variant="destructive" className="bg-rose-50 border-rose-200 text-rose-800">
          <Battery className="h-4 w-4 text-rose-500" />
          <AlertTitle className="text-rose-800 font-medium">Low Stock Alert</AlertTitle>
          <AlertDescription className="text-rose-700">
            Medicine supplies are running low (18%). Please restock at the next port.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-slate-600" />
              <div>
                <CardTitle>Voyage Meal Planner</CardTitle>
                <CardDescription>Plan meals for your entire voyage based on available ingredients</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-6">
              {/* Voyage Duration Input */}
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="text-lg font-medium text-slate-800 mb-4">Generate Your Voyage Meal Plan</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="voyage-duration" className="block text-sm font-medium text-slate-700 mb-1">
                      Voyage Duration (Days)
                    </label>
                    <input
                      id="voyage-duration"
                      type="number"
                      min="1"
                      max="30"
                      value={voyageDuration}
                      onChange={(e) => setVoyageDuration(e.target.value)}
                      placeholder="Enter number of days"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={generateMealPlan}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Generate Meal Plan
                    </Button>
                  </div>
                </div>
              </div>

              {/* Generated Meal Plan Display */}
              <div
                className={`transition-all duration-500 ${
                  showMealPlan ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
                }`}
              >
                {showMealPlan && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-slate-800">Meal Plan for the Voyage</h3>
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                        {voyageDuration} Days
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {mealPlanData.slice(0, Number.parseInt(voyageDuration)).map((day, index) => (
                        <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2 bg-slate-50 border-b">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-base text-slate-800">{day.day}</CardTitle>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-slate-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="divide-y">
                              <MealItem
                                icon={<Sun className="h-4 w-4 text-amber-500" />}
                                mealType="Breakfast"
                                mealName={day.meals.breakfast}
                              />
                              <MealItem
                                icon={<Sunset className="h-4 w-4 text-orange-500" />}
                                mealType="Lunch"
                                mealName={day.meals.lunch}
                              />
                              <MealItem
                                icon={<Moon className="h-4 w-4 text-indigo-500" />}
                                mealType="Dinner"
                                mealName={day.meals.dinner}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button variant="outline" className="gap-1 border-slate-200 mr-2">
                        <RefreshCw className="h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button className="gap-1 bg-slate-900 hover:bg-slate-800">
                        <ShoppingCart className="h-4 w-4" />
                        Generate Shopping List
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="inventory" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="inventory">Inventory Details</TabsTrigger>
              <TabsTrigger value="consumption">Consumption Trends</TabsTrigger>
              <TabsTrigger value="forecast">Forecasting</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-slate-200">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="water">Drinking Water</SelectItem>
                  <SelectItem value="food">Food Supplies</SelectItem>
                  <SelectItem value="medicine">Medicines</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="border-slate-200">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="inventory" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Anchor className="h-5 w-5 text-slate-600" />
                  <div>
                    <CardTitle>Detailed Inventory</CardTitle>
                    <CardDescription>Current stock levels of all tracked resources</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailedResourceItem
                      icon={<Droplets className="h-4 w-4 text-sky-500" />}
                      name="Water Tank #1"
                      level={75}
                      unit="L"
                      capacity={250}
                      lastUpdated="10 minutes ago"
                      color="sky"
                    />
                    <DetailedResourceItem
                      icon={<Droplets className="h-4 w-4 text-sky-500" />}
                      name="Water Tank #2"
                      level={230}
                      unit="L"
                      capacity={250}
                      lastUpdated="10 minutes ago"
                      color="sky"
                    />
                    <DetailedResourceItem
                      icon={<Droplets className="h-4 w-4 text-sky-500" />}
                      name="Water Tank #3"
                      level={375}
                      unit="L"
                      capacity={500}
                      lastUpdated="10 minutes ago"
                      color="sky"
                    />
                    <DetailedResourceItem
                      icon={<Utensils className="h-4 w-4 text-amber-500" />}
                      name="Rice Storage"
                      level={42}
                      unit="kg"
                      capacity={100}
                      lastUpdated="1 hour ago"
                      color="amber"
                    />
                    <DetailedResourceItem
                      icon={<Utensils className="h-4 w-4 text-amber-500" />}
                      name="Viand Ingredients"
                      level={60}
                      unit="Units"
                      capacity={100}
                      lastUpdated="2 hours ago"
                      color="amber"
                    />
                    <DetailedResourceItem
                      icon={<Pill className="h-4 w-4 text-rose-500" />}
                      name="Medicine Cabinet"
                      level={18}
                      unit="items"
                      capacity={100}
                      lastUpdated="3 hours ago"
                      color="rose"
                      alert="2 items expiring in 5 days"
                    />
                    <DetailedResourceItem
                      icon={<LifeBuoy className="h-4 w-4 text-orange-500" />}
                      name="Safety Equipment"
                      level={95}
                      unit="items"
                      capacity={100}
                      lastUpdated="1 day ago"
                      color="orange"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" className="gap-1 border-slate-200">
                  <RefreshCw className="h-4 w-4" />
                  Refresh Data
                </Button>
                <Button className="gap-1 bg-slate-900 hover:bg-slate-800">
                  <ShoppingCart className="h-4 w-4" />
                  Generate Order List
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="consumption" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-slate-600" />
                  <div>
                    <CardTitle>Weekly Consumption Trends</CardTitle>
                    <CardDescription>Resource usage patterns over the past 7 days</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={consumptionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          borderColor: "#e2e8f0",
                          borderRadius: "6px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar dataKey="water" fill="#0ea5e9" name="Water (L)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="food" fill="#f59e0b" name="Food (kg)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="staples" fill="#a3e4d7" name="Staples (kg)" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Ship className="h-5 w-5 text-slate-600" />
                  <div>
                    <CardTitle>Resource Forecast</CardTitle>
                    <CardDescription>Projected consumption and depletion dates</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ForecastItem
                      name="Drinking Water"
                      icon={<Droplets className="h-4 w-4 text-sky-500" />}
                      currentLevel="680 L"
                      dailyUsage="~85 L/day"
                      depletionDate="May 8, 2025"
                      daysRemaining={8}
                      nextPort="May 5, 2025"
                      status="sufficient"
                      color="sky"
                    />
                    <ForecastItem
                      name="Rice Supply"
                      icon={<Utensils className="h-4 w-4 text-amber-500" />}
                      currentLevel="42 kg"
                      dailyUsage="~3 kg/day"
                      depletionDate="May 14, 2025"
                      daysRemaining={14}
                      nextPort="May 5, 2025"
                      status="sufficient"
                      color="amber"
                    />
                    <ForecastItem
                      name="Dish Ingredients"
                      icon={<Utensils className="h-4 w-4 text-amber-500" />}
                      currentLevel="60 Units"
                      dailyUsage="~4 Units/day"
                      depletionDate="May 15, 2025"
                      daysRemaining={15}
                      nextPort="May 5, 2025"
                      status="sufficient"
                      color="amber"
                    />
                    <ForecastItem
                      name="Medicines"
                      icon={<Pill className="h-4 w-4 text-rose-500" />}
                      currentLevel="18 items"
                      dailyUsage="~1 item/day"
                      depletionDate="May 18, 2025"
                      daysRemaining={18}
                      nextPort="May 5, 2025"
                      status="warning"
                      alert="Critical items low"
                      color="rose"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-4 px-6 text-slate-500 bg-white">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          <div className="text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Last updated: 10 minutes ago</span>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-1">
              <BarChart className="h-3 w-3" />
              <span>Next forecast update: 1 hour</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ResourceCard({ icon, title, description, value, unit, percentage, capacity, daysRemaining, color, alert }) {
  const getColorClasses = (colorName, percentage) => {
    const isLow = percentage <= 25

    const colorMap = {
      sky: {
        bg: isLow ? "bg-sky-50" : "bg-white",
        text: "text-sky-700",
        progress: "bg-sky-500",
        progressBg: "bg-sky-100",
      },
      amber: {
        bg: isLow ? "bg-amber-50" : "bg-white",
        text: "text-amber-700",
        progress: "bg-amber-500",
        progressBg: "bg-amber-100",
      },
      emerald: {
        bg: isLow ? "bg-emerald-50" : "bg-white",
        text: "text-emerald-700",
        progress: "bg-emerald-500",
        progressBg: "bg-emerald-100",
      },
      rose: {
        bg: isLow ? "bg-rose-50" : "bg-white",
        text: "text-rose-700",
        progress: "bg-rose-500",
        progressBg: "bg-rose-100",
      },
    }

    return colorMap[colorName] || colorMap.sky
  }

  const colorClasses = getColorClasses(color, percentage)
  const isLow = percentage <= 25

  return (
    <Card className={`${colorClasses.bg} shadow-sm border-0 overflow-hidden`}>
      <div className={`h-1 w-full ${colorClasses.progress}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <CardTitle className="text-slate-800 text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <div className="text-3xl font-bold text-slate-900">{value}</div>
          <div className="text-slate-500">{unit}</div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Current level</span>
            <span className="font-medium text-slate-700">{percentage}%</span>
          </div>
          <Progress
            value={percentage}
            className={`h-2 ${colorClasses.progressBg}`}
            indicatorClassName={colorClasses.progress}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>0 {unit}</span>
            <span>
              {capacity} {unit}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <Badge
          variant={isLow ? "destructive" : "outline"}
          className={`text-xs ${!isLow ? "border-slate-200 bg-white" : ""}`}
        >
          {isLow ? "Low Stock" : "Sufficient"}
        </Badge>
        <span className="text-xs text-slate-500">Est. {daysRemaining} days remaining</span>
      </CardFooter>
      {alert && (
        <div className="px-6 pb-4 -mt-2">
          <p className="text-xs text-rose-500">{alert}</p>
        </div>
      )}
    </Card>
  )
}

function DetailedResourceItem({ icon, name, level, unit, capacity, lastUpdated, color, alert }) {
  const percentage = (level / capacity) * 100
  const status = percentage > 25 ? "normal" : "low"

  const getColorClasses = (colorName) => {
    const colorMap = {
      sky: "bg-sky-500",
      amber: "bg-amber-500",
      emerald: "bg-emerald-500",
      rose: "bg-rose-500",
      orange: "bg-orange-500",
    }

    return colorMap[colorName] || "bg-slate-500"
  }

  const progressColor = getColorClasses(color)

  return (
    <div className="flex flex-col p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-slate-800">{name}</span>
        </div>
        <Badge variant={status === "normal" ? "outline" : "destructive"} className="text-xs">
          {status === "normal" ? "Normal" : "Low"}
        </Badge>
      </div>
      <div className="text-xl font-bold text-slate-900">
        {level} <span className="text-slate-500 text-sm font-normal">{unit}</span>
      </div>
      <Progress value={percentage} className="h-1.5 mt-2" indicatorClassName={progressColor} />
      <div className="flex justify-between mt-1 text-xs text-slate-500">
        <span>0 {unit}</span>
        <span>
          {capacity} {unit}
        </span>
      </div>
      <div className="mt-2 text-xs text-slate-500 flex justify-between">
        <span>Updated {lastUpdated}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      {alert && <div className="mt-2 text-xs text-rose-500">{alert}</div>}
    </div>
  )
}

function ForecastItem({
  name,
  icon,
  currentLevel,
  dailyUsage,
  depletionDate,
  daysRemaining,
  nextPort,
  status,
  alert,
  color,
}) {
  const getColorClasses = (colorName) => {
    const colorMap = {
      sky: "border-l-sky-500 bg-sky-50/30",
      amber: "border-l-amber-500 bg-amber-50/30",
      emerald: "border-l-emerald-500 bg-emerald-50/30",
      rose: "border-l-rose-500 bg-rose-50/30",
    }

    return colorMap[colorName] || "border-l-slate-500"
  }

  const borderColor = getColorClasses(color)

  return (
    <div className={`border rounded-lg p-5 bg-white shadow-sm border-l-4 ${borderColor}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium text-slate-800">{name}</h3>
        </div>
        <Badge variant={status === "sufficient" ? "outline" : "destructive"} className="text-xs">
          {status === "sufficient" ? "Sufficient" : "Warning"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-sm">
          <div className="text-slate-500">Current Level</div>
          <div className="font-medium text-slate-900">{currentLevel}</div>
        </div>
        <div className="text-sm">
          <div className="text-slate-500">Daily Usage</div>
          <div className="font-medium text-slate-900">{dailyUsage}</div>
        </div>
        <div className="text-sm">
          <div className="text-slate-500">Depletion Date</div>
          <div className="font-medium text-slate-900">{depletionDate}</div>
        </div>
        <div className="text-sm">
          <div className="text-slate-500">Days Remaining</div>
          <div className="font-medium text-slate-900">{daysRemaining} days</div>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <div className="text-slate-500">Next Port</div>
        <div className="font-medium text-slate-900">{nextPort}</div>
      </div>

      {alert && <div className="mt-3 text-xs text-rose-500 p-2 bg-rose-50 rounded-md">{alert}</div>}
    </div>
  )
}

function MealItem({ icon, mealType, mealName }) {
  return (
    <div className="p-4 hover:bg-slate-50 transition-colors group">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-medium text-slate-500">{mealType}</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-slate-800">{mealName}</p>
        <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  )
}
