"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Clock,
  Filter,
  Lightbulb,
  Plus,
  RefreshCw,
  Search,
  Ship,
  ShoppingCart,
  Utensils,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface IngredientItemProps {
  item: {
    name: string; // Include name property here
    level: number;
    capacity: number;
    unit: string;
    lastUpdated: string;
    expiry?: string;
  };
}

// Placeholder data for ingredient categories and items
const ingredientData = [
  {
    category: "Protein",
    icon: "🥩",
    items: [
      { name: "Chicken Breast", level: 15, capacity: 30, unit: "kg", lastUpdated: "2 hours ago" },
      { name: "Pork Belly", level: 8, capacity: 20, unit: "kg", lastUpdated: "1 day ago" },
      { name: "Beef Chunks", level: 5, capacity: 15, unit: "kg", lastUpdated: "3 hours ago" },
      { name: "Fish (Tilapia)", level: 10, capacity: 25, unit: "kg", lastUpdated: "5 hours ago" },
      { name: "Shrimp", level: 3, capacity: 10, unit: "kg", lastUpdated: "1 day ago" },
    ],
  },
  {
    category: "Vegetables",
    icon: "🥬",
    items: [
      { name: "Onions", level: 10, capacity: 20, unit: "kg", lastUpdated: "1 hour ago" },
      { name: "Garlic", level: 5, capacity: 10, unit: "kg", lastUpdated: "4 hours ago" },
      { name: "Tomatoes", level: 7, capacity: 15, unit: "kg", lastUpdated: "2 hours ago" },
      { name: "Eggplant", level: 4, capacity: 12, unit: "kg", lastUpdated: "1 day ago" },
      { name: "String Beans", level: 6, capacity: 10, unit: "kg", lastUpdated: "3 hours ago" },
      { name: "Bok Choy", level: 3, capacity: 8, unit: "kg", lastUpdated: "5 hours ago" },
    ],
  },
  {
    category: "Sauces & Flavorings",
    icon: "🧂",
    items: [
      { name: "Soy Sauce", level: 8, capacity: 10, unit: "L", lastUpdated: "1 week ago" },
      { name: "Fish Sauce", level: 4, capacity: 5, unit: "L", lastUpdated: "2 days ago" },
      { name: "Vinegar", level: 7, capacity: 10, unit: "L", lastUpdated: "1 week ago" },
      { name: "Calamansi", level: 2, capacity: 5, unit: "kg", lastUpdated: "1 day ago" },
      { name: "Bagoong", level: 3, capacity: 5, unit: "kg", lastUpdated: "3 days ago" },
    ],
  },
  {
    category: "Staples",
    icon: "🍚",
    items: [
      { name: "Rice (Jasmine)", level: 50, capacity: 100, unit: "kg", lastUpdated: "1 day ago" },
      { name: "Rice (Glutinous)", level: 15, capacity: 30, unit: "kg", lastUpdated: "3 days ago" },
      { name: "Coconut Milk", level: 12, capacity: 20, unit: "L", lastUpdated: "2 days ago" },
      { name: "Cooking Oil", level: 15, capacity: 25, unit: "L", lastUpdated: "1 week ago" },
    ],
  },
]

// Placeholder data for suggested viands
const suggestedViands = [
  {
    name: "Chicken Adobo",
    ingredients: ["Chicken", "Soy Sauce", "Vinegar", "Garlic", "Bay Leaves", "Peppercorns"],
    difficulty: "Easy",
    prepTime: "45 mins",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    name: "Sinigang na Baboy",
    ingredients: ["Pork Belly", "Tamarind", "Tomatoes", "Onions", "String Beans", "Eggplant"],
    difficulty: "Medium",
    prepTime: "60 mins",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    name: "Ginataang Kalabasa",
    ingredients: ["Squash", "Coconut Milk", "String Beans", "Shrimp", "Onions", "Garlic"],
    difficulty: "Easy",
    prepTime: "30 mins",
    image: "/placeholder.svg?height=100&width=150",
  },
]

export default function DishIngredientsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Filter ingredients based on search query and selected category
  const filteredIngredients = ingredientData.filter((category) => {
    if (selectedCategory !== "all" && category.category.toLowerCase() !== selectedCategory) {
      return false
    }

    if (searchQuery) {
      return category.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return true
  })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2 text-slate-600">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Utensils className="h-6 w-6 text-amber-500" />
            <span className="text-slate-800">Dish Ingredients</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search ingredients..."
                className="w-[200px] lg:w-[300px] pl-8 border-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] border-slate-200">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="protein">Protein</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="sauces & flavorings">Sauces & Flavorings</SelectItem>
                <SelectItem value="staples">Staples</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="text-slate-600 border-slate-200">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh data</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dish Ingredients Inventory</h1>
            <p className="text-slate-500">Detailed tracking of ingredients for Filipino cuisine</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="gap-1 border-slate-200">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button className="gap-1 bg-slate-900 hover:bg-slate-800">
              <Plus className="h-4 w-4" />
              Add New Ingredient
            </Button>
          </div>
        </div>

        {/* AI-powered Viand Suggestion Section */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <div>
                <CardTitle className="text-slate-800">AI-Powered Viand Suggestions</CardTitle>
                <CardDescription>Based on your current inventory levels</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestedViands.map((viand, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    <img
                      src={viand.image || "/placeholder.svg"}
                      alt={viand.name}
                      className="w-[100px] h-[70px] object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium text-slate-800">{viand.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          {viand.difficulty}
                        </Badge>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {viand.prepTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-1">Main ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {viand.ingredients.map((ingredient, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full border-amber-200 text-amber-700 hover:bg-amber-100">
              Generate More Suggestions
            </Button>
          </CardFooter>
        </Card>

        {/* Ingredient Categories */}
        <div className="space-y-6">
          {filteredIngredients.map((category, index) => (
            <Card key={index} className="border-slate-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <CardTitle>{category.category}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-slate-600 bg-slate-50">
                    {category.items.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Accordion type="single" collapsible defaultValue="items" className="w-full">
                    <AccordionItem value="items" className="border-none">
                      <AccordionTrigger className="py-0 hover:no-underline">
                        <span className="text-sm font-medium text-slate-500">View All Items</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {category.items.map((item, itemIndex) => (
                            <IngredientItem key={itemIndex} item={item} />
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1 border-slate-200">
                        <RefreshCw className="h-3 w-3" />
                        Update
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh inventory data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button size="sm" className="gap-1 bg-slate-900 hover:bg-slate-800">
                  <ShoppingCart className="h-3 w-3" />
                  Order More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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
              <Ship className="h-3 w-3" />
              <span>SeaFarer Inventory System</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function IngredientItem({ item }: IngredientItemProps) {
  const percentage = (item.level / item.capacity) * 100;
  const status = percentage > 25 ? "normal" : "low";

  // Check for expiry warning (item.expiry)
  const isExpiringSoon = item.expiry && new Date(item.expiry) <= new Date(new Date().setDate(new Date().getDate() + 7)); // Expiring within 7 days

  // Determine color based on percentage
  let progressColor = "bg-emerald-500"
  let progressBg = "bg-emerald-100"

  if (percentage <= 25) {
    progressColor = "bg-rose-500"
    progressBg = "bg-rose-100"
  } else if (percentage <= 50) {
    progressColor = "bg-amber-500"
    progressBg = "bg-amber-100"
  }

  return (
    <div className="flex flex-col p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <span className="font-medium text-slate-800">{item.name}</span>
        <Badge variant={status === "normal" ? "outline" : "destructive"} className="text-xs">
          {status === "normal" ? "Normal" : "Low"}
        </Badge>
      </div>
      <div className="text-xl font-bold text-slate-900">
        {item.level} <span className="text-slate-500 text-sm font-normal">{item.unit}</span>
      </div>

      {/* Corrected Progress bar */}
      <Progress value={percentage} className={`h-1.5 mt-2 ${progressBg}`} />
      
      <div className="flex justify-between mt-1 text-xs text-slate-500">
        <span>0 {item.unit}</span>
        <span>
          {item.capacity} {item.unit}
        </span>
      </div>
      <div className="mt-2 text-xs text-slate-500 flex justify-between">
        <span>Updated {item.lastUpdated}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>

      {/* Expiry Alert */}
      {isExpiringSoon && (
        <div className="mt-2 text-xs text-red-500 flex justify-between">
          <span>Expiring soon: {item.expiry}</span>
        </div>
      )}
    </div>
  );
}
