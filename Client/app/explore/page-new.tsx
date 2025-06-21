"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, Filter, Star, MapPin, Heart, Wifi, Car, ChefHat, Waves, Snowflake, Home, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { propertiesAPI } from "@/lib/api"

interface Property {
  id: number;
  title: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  type: string;
  amenities: string[];
  images: string[];
  avgRating?: string;
  reviewCount: number;
  host_first_name: string;
  host_last_name: string;
  availability: boolean;
}

export default function ExplorePage() {
  const { t } = useLanguage()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([1000, 10000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const amenityIcons = {
    'Wi-Fi': Wifi,
    'Wifi': Wifi,
    'Parking': Car,
    'Kitchen': ChefHat,
    'Pool': Waves,
    'Air Conditioning': Snowflake,
    'Balcony': Home,
    'Mountain View': Home,
    'Lake View': Waves,
    'Wildlife View': Home,
  }

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const response = await propertiesAPI.getAll({
          page: currentPage,
          limit: 12,
          ...(searchQuery && { city: searchQuery }),
          ...(priceRange[0] && { minPrice: priceRange[0] }),
          ...(priceRange[1] && { maxPrice: priceRange[1] }),
        })
        
        setProperties(response.data.properties)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch properties:', err)
        setError('Failed to load properties. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [currentPage, searchQuery, priceRange])

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
    const propertyAmenities = Array.isArray(property.amenities) ? property.amenities : 
      (typeof property.amenities === 'string' ? JSON.parse(property.amenities) : [])
    
    const matchesAmenities =
      selectedAmenities.length === 0 || selectedAmenities.every((amenity) => 
        propertyAmenities.some((propAmenity: string) => 
          propAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      )
    const matchesPropertyType = selectedPropertyTypes.length === 0 || selectedPropertyTypes.includes(property.type)

    return matchesAmenities && matchesPropertyType
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "priceLowToHigh":
        return a.price - b.price
      case "priceHighToLow":
        return b.price - a.price
      case "highestRated":
        return (parseFloat(b.avgRating || '0') - parseFloat(a.avgRating || '0'))
      default:
        return 0
    }
  })

  const handleSearch = () => {
    setCurrentPage(1)
    // The useEffect will automatically trigger with the new searchQuery
  }

  if (loading && properties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading properties...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search destinations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="highestRated">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Properties</SheetTitle>
                    <SheetDescription>
                      Narrow down your search with these filters
                    </SheetDescription>
                  </SheetHeader>

                  <div className="py-6 space-y-6">
                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Price Range (NPR {priceRange[0]} - NPR {priceRange[1]})
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={20000}
                        min={500}
                        step={500}
                        className="w-full"
                      />
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Property Type</label>
                      <div className="space-y-2">
                        {["apartment", "house", "villa", "cabin", "hotel"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              checked={selectedPropertyTypes.includes(type)}
                              onCheckedChange={(checked) =>
                                handlePropertyTypeChange(type, checked as boolean)
                              }
                            />
                            <label htmlFor={type} className="text-sm capitalize">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Amenities</label>
                      <div className="space-y-2">
                        {["Wi-Fi", "Parking", "Kitchen", "Mountain View", "Lake View"].map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={(checked) =>
                                handleAmenityChange(amenity, checked as boolean)
                              }
                            />
                            <label htmlFor={amenity} className="text-sm">
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {sortedProperties.length} properties found
          </h1>
          <p className="text-gray-600">
            Discover amazing places to stay in Nepal
          </p>
        </div>

        {sortedProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No properties found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedAmenities([])
                setSelectedPropertyTypes([])
                setPriceRange([1000, 10000])
                setSearchQuery('')
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProperties.map((property) => {
              const propertyAmenities = Array.isArray(property.amenities) ? property.amenities : 
                (typeof property.amenities === 'string' ? JSON.parse(property.amenities) : [])
              const propertyImages = Array.isArray(property.images) ? property.images : 
                (typeof property.images === 'string' ? JSON.parse(property.images) : ['/placeholder.svg?height=250&width=350'])

              return (
                <Link key={property.id} href={`/property/${property.id}`}>
                  <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                        <Image
                          src={propertyImages[0] || '/placeholder.svg?height=250&width=350'}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {property.type && (
                        <Badge className="absolute top-3 left-3 bg-black/70 text-white capitalize">
                          {property.type}
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm line-clamp-2 flex-1">
                          {property.title}
                        </h3>
                      </div>

                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.city}
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">
                          {property.avgRating || 'New'}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({property.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {propertyAmenities.slice(0, 3).map((amenity: string) => {
                          const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                          return IconComponent ? (
                            <div key={amenity} className="flex items-center gap-1">
                              <IconComponent className="h-3 w-3 text-gray-400" />
                            </div>
                          ) : null
                        })}
                        {propertyAmenities.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{propertyAmenities.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold">NPR {property.price.toLocaleString()}</span>
                          <span className="text-gray-600 text-sm"> / night</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {property.max_guests} guests • {property.bedrooms} bed
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        Host: {property.host_first_name} {property.host_last_name}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
