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
  // Fetch properties from API with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
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
    }, 500) // 500ms debounce

    return () => clearTimeout(timeoutId)
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
  }  return (
    <div className="min-h-screen bg-white">      {/* Header with Logo */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Kostra</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Results count */}
      <div className="container mx-auto px-6 py-4">
        <h2 className="text-lg font-medium text-gray-900">
          {sortedProperties.length} results found
        </h2>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Price Range</h4>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={1000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>NPR {priceRange[0].toLocaleString()}</span>
                    <span>NPR {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Property Type</h4>
                <div className="space-y-3">
                  {[
                    { value: "apartment", label: "Apartment" },
                    { value: "house", label: "House" },
                    { value: "room", label: "Room" },
                    { value: "villa", label: "Villa" }
                  ].map((type) => (
                    <div key={type.value} className="flex items-center">
                      <Checkbox
                        id={type.value}
                        checked={selectedPropertyTypes.includes(type.value)}
                        onCheckedChange={(checked) =>
                          handlePropertyTypeChange(type.value, checked as boolean)
                        }
                        className="mr-3"
                      />
                      <label htmlFor={type.value} className="text-sm text-gray-700 cursor-pointer">
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Amenities</h4>
                <div className="space-y-3">
                  {[
                    { value: "WiFi", label: "WiFi", icon: Wifi },
                    { value: "Parking", label: "Parking", icon: Car },
                    { value: "Kitchen", label: "Kitchen", icon: ChefHat },
                    { value: "Pool", label: "Pool", icon: Waves },
                    { value: "Air Conditioning", label: "Air Conditioning", icon: Snowflake },
                    { value: "Balcony", label: "Balcony", icon: Home }
                  ].map((amenity) => (
                    <div key={amenity.value} className="flex items-center">
                      <Checkbox
                        id={amenity.value}
                        checked={selectedAmenities.includes(amenity.value)}
                        onCheckedChange={(checked) =>
                          handleAmenityChange(amenity.value, checked as boolean)
                        }
                        className="mr-3"
                      />
                      <amenity.icon className="w-4 h-4 mr-2 text-gray-500" />
                      <label htmlFor={amenity.value} className="text-sm text-gray-700 cursor-pointer">
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear All Button */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSelectedAmenities([])
                  setSelectedPropertyTypes([])
                  setPriceRange([1000, 10000])
                  setSearchQuery('')
                }}
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Property Listings */}
          <div className="flex-1">
            {sortedProperties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No properties found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProperties.map((property) => {
                  const propertyAmenities = Array.isArray(property.amenities) ? property.amenities : 
                    (typeof property.amenities === 'string' ? JSON.parse(property.amenities) : [])
                  const propertyImages = Array.isArray(property.images) ? property.images : 
                    (typeof property.images === 'string' ? JSON.parse(property.images) : ['/placeholder.svg?height=250&width=350'])

                  return (
                    <Link key={property.id} href={`/property/${property.id}`}>
                      <Card className="group hover:shadow-md transition-shadow cursor-pointer border border-gray-200 overflow-hidden">
                        <div className="relative">
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <Image
                              src={propertyImages[0] || '/placeholder.svg?height=250&width=350'}
                              alt={property.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          {/* Instant Book Badge */}
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
                              Instant Book
                            </Badge>
                          </div>

                          {/* Heart Icon */}
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-3 right-3 bg-white/80 hover:bg-white w-8 h-8"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <CardContent className="p-4">
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                            <span className="text-sm font-medium">
                              {property.avgRating || '4.9'}
                            </span>
                          </div>

                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {property.title}
                          </h3>

                          <div className="flex items-center text-gray-600 text-sm mb-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            {property.city}
                          </div>

                          {/* Amenity Icons */}
                          <div className="flex items-center gap-3 mb-4">
                            {propertyAmenities.slice(0, 3).map((amenity: string, index: number) => {
                              const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi
                              return (
                                <IconComponent key={index} className="h-4 w-4 text-gray-400" />
                              )
                            })}
                            {propertyAmenities.length > 3 && (
                              <span className="text-xs text-gray-500">+{propertyAmenities.length - 3}</span>
                            )}
                          </div>

                          <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-lg font-semibold text-gray-900">
                              NPR {property.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-600">/ night</span>
                          </div>

                          <div className="text-sm text-gray-500">
                            {property.reviewCount} reviews
                          </div>

                          <div className="mt-2 text-xs text-gray-500">
                            Hosted by {property.host_first_name}
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
      </div>
    </div>
  )
}
