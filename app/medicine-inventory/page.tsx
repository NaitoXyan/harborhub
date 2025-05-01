"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Check, Clock, Download, Filter, Pill, Plus, RefreshCw, Search, Ship, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ChangeEvent, FormEvent } from 'react';
import type { BadgeProps } from "@/components/ui/badge"

// Dummy data for medicine inventory
const medicineData = [
  {
    id: 1,
    name: "Paracetamol",
    quantity: 50,
    unit: "tablets",
    expirationDate: "2025-12-31",
    category: "Pain Relief",
    status: "Normal",
  },
  {
    id: 2,
    name: "Ibuprofen",
    quantity: 30,
    unit: "tablets",
    expirationDate: "2026-03-15",
    category: "Pain Relief",
    status: "Normal",
  },
  {
    id: 3,
    name: "Band-aids",
    quantity: 25,
    unit: "pieces",
    expirationDate: "N/A",
    category: "First Aid",
    status: "Normal",
  },
  {
    id: 4,
    name: "Antiseptic Solution",
    quantity: 1,
    unit: "bottle",
    expirationDate: "2025-08-20",
    category: "First Aid",
    status: "Normal",
  },
  {
    id: 5,
    name: "Motion Sickness Pills",
    quantity: 20,
    unit: "tablets",
    expirationDate: "2025-06-10",
    category: "Seasickness",
    status: "Normal",
  },
  {
    id: 6,
    name: "Antibiotics",
    quantity: 10,
    unit: "capsules",
    expirationDate: "2025-05-15",
    category: "Infection",
    status: "Normal",
  },
  {
    id: 7,
    name: "Antihistamines",
    quantity: 20,
    unit: "tablets",
    expirationDate: "2025-09-30",
    category: "Allergy",
    status: "Normal",
  },
  {
    id: 8,
    name: "Cough Syrup",
    quantity: 1,
    unit: "bottle",
    expirationDate: "2025-04-20",
    category: "Cold & Flu",
    status: "Low Stock",
  },
  {
    id: 9,
    name: "Gauze Bandages",
    quantity: 5,
    unit: "rolls",
    expirationDate: "N/A",
    category: "First Aid",
    status: "Low Stock",
  },
  {
    id: 10,
    name: "Burn Ointment",
    quantity: 2,
    unit: "tubes",
    expirationDate: "2025-03-10",
    category: "First Aid",
    status: "Expiring Soon",
  },
  {
    id: 11,
    name: "Eye Drops",
    quantity: 3,
    unit: "bottles",
    expirationDate: "2025-02-28",
    category: "Eye Care",
    status: "Expiring Soon",
  },
  {
    id: 12,
    name: "Rehydration Salts",
    quantity: 15,
    unit: "sachets",
    expirationDate: "2026-01-15",
    category: "Hydration",
    status: "Normal",
  },
]

export default function MedicinesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "tablets",
    expirationDate: "",
    batchNumber: "",
    manufacturer: "",
  })

  // Filter medicines based on search query, category, and status
  const filteredMedicines = medicineData.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || medicine.category === categoryFilter
    const matchesStatus = statusFilter === "all" || medicine.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(medicineData.map((medicine) => medicine.category))]
  const statuses = ["all", ...new Set(medicineData.map((medicine) => medicine.status))]

  // Get counts for status summary
  const totalCount = medicineData.length
  const lowStockCount = medicineData.filter((medicine) => medicine.status === "Low Stock").length
  const expiringCount = medicineData.filter((medicine) => medicine.status === "Expiring Soon").length

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field:string, value:string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)

    // Show success state
    setIsSuccess(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    // Reset success state when modal is closed
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        category: "",
        quantity: "",
        unit: "tablets",
        expirationDate: "",
        batchNumber: "",
        manufacturer: "",
      })
    }, 300)
  }

  // Generate a random batch ID for the QR code
  const batchId = `MED-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2 text-slate-600">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Pill className="h-6 w-6 text-red-500" />
            <span className="text-slate-800">Medicine Inventory</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search medicines..."
                className="w-[200px] lg:w-[300px] pl-8 border-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Medicine Inventory</h1>
            <p className="text-slate-500">Detailed tracking of medical supplies and first aid items</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="gap-1 border-slate-200">
              <Download className="h-4 w-4" />
              Export List
            </Button>
            <Button 
              className="gap-1 bg-red-500 hover:bg-red-600 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Medicine
            </Button>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-slate-800">Total Medicines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{totalCount}</div>
              <p className="text-sm text-slate-500 mt-1">Different medical items</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-amber-800">Low Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-700">{lowStockCount}</div>
              <p className="text-sm text-amber-600 mt-1">Items need restocking</p>
            </CardContent>
          </Card>
          <Card className="bg-red-50 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-red-800">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{expiringCount}</div>
              <p className="text-sm text-red-600 mt-1">Items expiring within 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full border-slate-200">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full border-slate-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Statuses" : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="icon" className="border-slate-200">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Medicine Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedicines.map((medicine) => (
                  <TableRow key={medicine.id}>
                    <TableCell className="font-medium">{medicine.name}</TableCell>
                    <TableCell>{medicine.category}</TableCell>
                    <TableCell>
                      {medicine.quantity} {medicine.unit}
                    </TableCell>
                    <TableCell>{medicine.expirationDate}</TableCell>
                    <TableCell>
                      <StatusBadge status={medicine.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="outline" className="gap-1 border-slate-200 mr-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
          <Button className="gap-1 bg-slate-900 hover:bg-slate-800">
            Update Stock
          </Button>
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

      {/* Add Medicine Modal */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[500px]">
          {!isSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>Add Medicine to Inventory</DialogTitle>
                <DialogDescription>Enter the details of the medicine being added to the inventory.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Medicine Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <div className="col-span-3">
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                        <SelectItem value="First Aid">First Aid</SelectItem>
                        <SelectItem value="Seasickness">Seasickness</SelectItem>
                        <SelectItem value="Infection">Infection</SelectItem>
                        <SelectItem value="Allergy">Allergy</SelectItem>
                        <SelectItem value="Cold & Flu">Cold & Flu</SelectItem>
                        <SelectItem value="Eye Care">Eye Care</SelectItem>
                        <SelectItem value="Hydration">Hydration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <div className="col-span-3">
                    <Select value={formData.unit} onValueChange={(value) => handleSelectChange("unit", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tablets">Tablets</SelectItem>
                        <SelectItem value="capsules">Capsules</SelectItem>
                        <SelectItem value="bottles">Bottles</SelectItem>
                        <SelectItem value="tubes">Tubes</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                        <SelectItem value="rolls">Rolls</SelectItem>
                        <SelectItem value="sachets">Sachets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expirationDate" className="text-right">
                    Expiration Date
                  </Label>
                  <Input
                    id="expirationDate"
                    name="expirationDate"
                    type="date"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="batchNumber" className="text-right">
                    Batch Number
                  </Label>
                  <Input
                    id="batchNumber"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="manufacturer" className="text-right">
                    Manufacturer
                  </Label>
                  <Input
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-red-500 hover:bg-red-600">
                    Add to Inventory
                  </Button>
                </DialogFooter>
              </form>
            </>
          ) : (
            <div className="py-6 space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <Check className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-800">Success!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Medicine has been successfully added to the inventory.
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <div className="text-sm text-slate-500">Medicine Tracking ID: {batchId}</div>

                <div className="flex justify-center">
                  <div className="border p-4 rounded-lg bg-white">
                    {/* Simple QR code placeholder */}
                    <svg
                      width="150"
                      height="150"
                      viewBox="0 0 150 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto"
                    >
                      <rect width="150" height="150" fill="white" />
                      <g>
                        {/* This is a simplified QR code pattern */}
                        <rect x="20" y="20" width="20" height="20" fill="black" />
                        <rect x="40" y="20" width="20" height="20" fill="black" />
                        <rect x="60" y="20" width="20" height="20" fill="black" />
                        <rect x="20" y="40" width="20" height="20" fill="black" />
                        <rect x="60" y="40" width="20" height="20" fill="black" />
                        <rect x="20" y="60" width="20" height="20" fill="black" />
                        <rect x="40" y="60" width="20" height="20" fill="black" />
                        <rect x="60" y="60" width="20" height="20" fill="black" />

                        <rect x="90" y="20" width="20" height="20" fill="black" />
                        <rect x="110" y="20" width="20" height="20" fill="black" />
                        <rect x="90" y="40" width="20" height="20" fill="black" />
                        <rect x="110" y="60" width="20" height="20" fill="black" />

                        <rect x="20" y="90" width="20" height="20" fill="black" />
                        <rect x="60" y="90" width="20" height="20" fill="black" />
                        <rect x="40" y="110" width="20" height="20" fill="black" />

                        <rect x="90" y="90" width="20" height="20" fill="black" />
                        <rect x="110" y="90" width="20" height="20" fill="black" />
                        <rect x="90" y="110" width="20" height="20" fill="black" />
                      </g>
                    </svg>
                    <div className="text-xs text-center mt-2 text-slate-500">Scan to track this medicine</div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={closeModal} className="w-full">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let variant: BadgeProps["variant"] = "outline"
  let className = "text-slate-700 border-slate-200 bg-slate-50"

  if (status === "Low Stock") {
    variant = "outline"
    className = "text-amber-700 border-amber-200 bg-amber-50"
  } else if (status === "Expiring Soon") {
    variant = "outline"
    className = "text-red-700 border-red-200 bg-red-50"
  }

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  )
}
