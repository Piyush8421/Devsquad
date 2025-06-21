"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Star, MapPin, Heart, Wifi, Car, ChefHat, Waves, Snowflake, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function ExplorePage() {
  const { t } = useLanguage()
  const [priceRange, setPriceRange] = useState([1000, 10000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [searchQuery, setSearchQuery] = useState("")

  const properties = [
    {
      id: 1,
      title: "Luxury Mountain View Apartment",
      location: "Nagarkot, Nepal",
      price: 4500,
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg?height=250&width=350",
      host: "Sarita",
      type: "apartment",
      amenities: ["wifi", "parking", "kitchen", "balcony"],
      instantBook: true,
    },
    {
      id: 2,
      title: "Cozy Lakeside Cottage",
      location: "Pokhara, Nepal",
      price: 3200,
      rating: 4.8,
      reviews: 89,
      image: "/placeholder.svg?height=250&width=350",
      host: "Rajesh",
      type: "house",
      amenities: ["wifi", "kitchen", "balcony"],
      instantBook: false,
    },
    {
      id: 3,
      title: "Traditional Newari House",
      location: "Bhaktapur, Nepal",
      price: 2800,
      rating: 4.7,
      reviews: 203,
      image: "/placeholder.svg?height=250&width=350",
      host: "Sunita",
      type: "house",
      amenities: ["wifi", "parking", "kitchen"],
      instantBook: true,
    },
    {
      id: 4,
      title: "Modern City Center Room",
      location: "Kathmandu, Nepal",
      price: 2200,
      rating: 4.6,
      reviews: 156,
      image: "/placeholder.svg?height=250&width=350",
      host: "Amit",
      type: "room",
      amenities: ["wifi", "airConditioning"],
      instantBook: true,
    },
    {
      id: 5,
      title: "Peaceful Garden Villa",
      location: "Bandipur, Nepal",
      price: 6500,
      rating: 4.8,
      reviews: 94,
      image: "/placeholder.svg?height=250&width=350",
      host: "Priya",
      type: "villa",
      amenities: ["wifi", "parking", "kitchen", "pool", "balcony"],
      instantBook: false,
    },
    {
      id: 6,
      title: "Jungle View Eco Lodge",
      location: "Chitwan, Nepal",
      price: 3800,
      rating: 4.6,
      reviews: 67,
      image: "/placeholder.svg?height=250&width=350",
      host: "Bikash",
      type: "house",
      amenities: ["wifi", "kitchen", "balcony"],
      instantBook: true,
    },
  ]

  const amenityIcons = {
    wifi: Wifi,
    parking: Car,
    kitchen: ChefHat,
    pool: Waves,
    airConditioning: Snowflake,
    balcony: Home,
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedPropertyTypes([...selectedPropertyTypes, type])
    } else {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type))
    }
  }

  const filteredProperties = properties.filter((property) => {
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => property.amenities.includes(amenity))
    const matchesPropertyType = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(property.type)
    const matchesSearch =
      searchQuery === "" ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesPrice && matchesAmenities && matchesPropertyType && matchesSearch
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "priceLowToHigh":
        return a.price - b.price
      case "priceHighToLow":
        return b.price - a.price
      case "highestRated":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">{t("priceRange")}</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={15000} min={1000} step={500} className="mb-4" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>NPR {priceRange[0].toLocaleString()}</span>
            <span>NPR {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h3 className="font-semibold mb-3">{t("propertyType")}</h3>
        <div className="space-y-2">
          {["apartment", "house", "room", "villa"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedPropertyTypes.includes(type)}
                onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
              />
              <label htmlFor={type} className="text-sm">
                {t(type as any)}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold mb-3">{t("amenities")}</h3>
        <div className="space-y-2">
          {["wifi", "parking", "kitchen", "pool", "airConditioning", "balcony"].map((amenity) => {
            const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
            return (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <IconComponent className="w-4 h-4" />
                <label htmlFor={amenity} className="text-sm">
                  {t(amenity as any)}
                </label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={() => {
          setPriceRange([1000, 10000])
          setSelectedAmenities([])
          setSelectedPropertyTypes([])
        }}
        className="w-full"
      >
        {t("clearFilters")}
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Kostra
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("exploreTitle")}</h1>
          <p className="text-lg text-gray-600 mb-6">{t("exploreSubtitle")}</p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t("whereGoing")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
            <div className="flex gap-2">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden h-12 px-4">
                    <Filter className="w-5 h-5 mr-2" />
                    {t("filters")}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>{t("filters")}</SheetTitle>
                    <SheetDescription>Filter accommodations by your preferences</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue placeholder={t("sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">{t("recommended")}</SelectItem>
                  <SelectItem value="priceLowToHigh">{t("priceLowToHigh")}</SelectItem>
                  <SelectItem value="priceHighToLow">{t("priceHighToLow")}</SelectItem>
                  <SelectItem value="highestRated">{t("highestRated")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-600">
            {sortedProperties.length} {t("resultsFound")}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{t("filters")}</h2>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Property Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <Card
                  key={property.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
                >
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={350}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700 rounded-full"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    {property.instantBook && (
                      <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white">
                        {t("instantBook")}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">{property.title}</h3>
                      <div className="flex items-center ml-2">
                        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                        <span className="text-sm font-medium text-gray-700 ml-1">{property.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {property.amenities.slice(0, 3).map((amenity) => {
                        const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                        return <IconComponent key={amenity} className="w-4 h-4 text-gray-500" />
                      })}
                      {property.amenities.length > 3 && (
                        <span className="text-xs text-gray-500">+{property.amenities.length - 3}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">NPR {property.price.toLocaleString()}</span>
                        <span className="text-gray-600 ml-1">/ {t("night")}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.reviews} {t("reviews")}
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      {t("hostedBy")} {property.host}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties match your current filters.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPriceRange([1000, 10000])
                    setSelectedAmenities([])
                    setSelectedPropertyTypes([])
                    setSearchQuery("")
                  }}
                  className="mt-4"
                >
                  {t("clearFilters")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
