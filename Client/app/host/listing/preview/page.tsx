"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Star, 
  Users, 
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Shield,
  Calendar,
  Heart,
  Share,
  Flag,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

interface SetupData {
  photos: string[]
  title: string
  description: string
  selectedAmenities: string[]
  pricing: {
    basePrice: string
    cleaningFee: string
    securityDeposit: string
  }
  timestamp: number
}

const amenityIcons: { [key: string]: any } = {
  'WiFi': Wifi,
  'Parking': Car,
  'Kitchen': Utensils,
  'TV': Tv,
  'Air conditioning': Wind,
  'Security': Shield,
}

export default function ListingPreview() {
  const { t } = useLanguage()
  const [setupData, setSetupData] = useState<SetupData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    // Load setup data from localStorage
    const savedData = localStorage.getItem('kostra_host_setup')
    if (savedData) {
      try {
        const data = JSON.parse(savedData) as SetupData
        setSetupData(data)
      } catch (error) {
        console.error('Error parsing setup data:', error)
      }
    }
  }, [])

  const nextImage = () => {
    if (setupData?.photos && setupData.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === setupData.photos.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (setupData?.photos && setupData.photos.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? setupData.photos.length - 1 : prev - 1
      )
    }
  }

  const calculateTotalPrice = () => {
    if (!setupData?.pricing) return 0
    const basePrice = Number(setupData.pricing.basePrice) || 0
    const cleaningFee = Number(setupData.pricing.cleaningFee) || 0
    return basePrice + cleaningFee
  }

  if (!setupData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No listing data found</p>
          <Link href="/host/dashboard">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/host/dashboard" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Kostra
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-blue-100 text-blue-800">Preview Mode</Badge>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden">
            <div className="relative">
              <Image
                src={setupData.photos && setupData.photos.length > 0 ? setupData.photos[currentImageIndex] : "/placeholder.svg?height=400&width=600"}
                alt="Property main image"
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
              {setupData.photos && setupData.photos.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
            <div className="hidden md:grid grid-cols-2 gap-2">
              {setupData.photos && setupData.photos.slice(1, 5).map((photo, index) => (
                <Image
                  key={index}
                  src={photo}
                  alt={`Property image ${index + 2}`}
                  width={300}
                  height={190}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
              ))}
            </div>
          </div>
          {setupData.photos && setupData.photos.length > 5 && (
            <Button
              className="absolute bottom-4 right-4 bg-white text-gray-900 hover:bg-gray-50"
              size="sm"
            >
              Show all {setupData.photos.length} photos
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {setupData.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span>2 guests • 1 bedroom • 1 bed • 1 bathroom</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">New listing</span>
                </div>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">Kathmandu, Nepal</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About this place</h2>
              <p className="text-gray-700 leading-relaxed">
                {setupData.description || "A beautiful place to stay with amazing amenities and great location."}
              </p>
            </div>

            {/* Amenities */}
            {setupData.selectedAmenities && setupData.selectedAmenities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {setupData.selectedAmenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity]
                    return (
                      <div key={index} className="flex items-center">
                        {IconComponent && <IconComponent className="w-5 h-5 mr-3 text-gray-600" />}
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Calendar placeholder */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Availability</h2>
              <div className="border border-gray-200 rounded-lg p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Calendar will be displayed here</p>
                <p className="text-sm text-gray-500 mt-2">Guests can select their dates</p>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">NPR {setupData.pricing?.basePrice ? Number(setupData.pricing.basePrice).toLocaleString() : "0"}</span>
                    <span className="text-gray-600 ml-1">night</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">New listing</span>
                  </div>
                </div>

                {/* Mock booking form */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-gray-300 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-700 uppercase">Check-in</div>
                      <div className="text-sm text-gray-500">Add date</div>
                    </div>
                    <div className="border border-gray-300 rounded-lg p-3">
                      <div className="text-xs font-medium text-gray-700 uppercase">Check-out</div>
                      <div className="text-sm text-gray-500">Add date</div>
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded-lg p-3">
                    <div className="text-xs font-medium text-gray-700 uppercase">Guests</div>
                    <div className="text-sm text-gray-500">1 guest</div>
                  </div>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4" disabled>
                  Reserve (Preview Mode)
                </Button>

                <div className="text-center text-sm text-gray-600 mb-4">
                  This is how guests will see your listing
                </div>

                {/* Price breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>NPR {setupData.pricing?.basePrice ? Number(setupData.pricing.basePrice).toLocaleString() : "0"} x 1 night</span>
                    <span>NPR {setupData.pricing?.basePrice ? Number(setupData.pricing.basePrice).toLocaleString() : "0"}</span>
                  </div>
                  {setupData.pricing?.cleaningFee && Number(setupData.pricing.cleaningFee) > 0 && (
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>NPR {Number(setupData.pricing.cleaningFee).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>NPR {calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
