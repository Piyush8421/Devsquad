"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Home,
  DollarSign,
  Users,
  Calendar,
  Star,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { propertiesAPI } from "@/lib/api"
import { toast } from "sonner"

interface Property {
  id: number;
  title: string;
  city: string;
  type: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  images: string[];
  avgRating?: string;
  reviewCount: number;
  is_active: boolean;
  created_at: string;
}

interface HostStats {
  totalProperties: number;
  activeProperties: number;
  totalBookings: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
}

export default function HostDashboard() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'
  
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<HostStats>({
    totalProperties: 0,
    activeProperties: 0,
    totalBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
    totalReviews: 0
  })

  useEffect(() => {
    if (user) {
      fetchHostProperties()
    }
  }, [user])

  const fetchHostProperties = async () => {
    try {
      setLoading(true)
      // Note: We would need to add a host-specific properties endpoint
      // For now, we'll simulate with the general properties endpoint
      const response = await propertiesAPI.getAll()
      if (response.success) {
        // In real implementation, filter by host_id
        setProperties(response.data.properties)
        calculateStats(response.data.properties)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (propertiesData: Property[]) => {
    const active = propertiesData.filter(p => p.is_active)
    const totalRating = propertiesData.reduce((sum, p) => 
      sum + (parseFloat(p.avgRating || '0') * p.reviewCount), 0
    )
    const totalReviews = propertiesData.reduce((sum, p) => sum + p.reviewCount, 0)
    
    setStats({
      totalProperties: propertiesData.length,
      activeProperties: active.length,
      totalBookings: 0, // Would be calculated from bookings API
      totalEarnings: 0, // Would be calculated from bookings API
      averageRating: totalReviews > 0 ? totalRating / totalReviews : 0,
      totalReviews
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your host dashboard</p>
          <Link href="/auth?mode=signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-lg">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user.firstName}!
                </h1>
                <p className="text-gray-600">Manage your properties and bookings</p>
              </div>
            </div>
            <Link href="/host/create">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Home className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalProperties}</p>
                      <p className="text-sm text-gray-600">Properties</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.activeProperties}</p>
                      <p className="text-sm text-gray-600">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalBookings}</p>
                      <p className="text-sm text-gray-600">Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-8 h-8 text-emerald-500" />
                    <div>
                      <p className="text-2xl font-bold">NPR {stats.totalEarnings.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Earnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-8 h-8 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</p>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalReviews}</p>
                      <p className="text-sm text-gray-600">Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/host/create">
                    <Button variant="outline" className="w-full h-20 flex-col">
                      <Plus className="w-6 h-6 mb-2" />
                      Add New Property
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-20 flex-col">
                    <Calendar className="w-6 h-6 mb-2" />
                    Manage Calendar
                  </Button>
                  <Button variant="outline" className="w-full h-20 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    View Messages
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Properties</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading properties...</p>
                  </div>
                ) : properties.length > 0 ? (
                  <div className="space-y-4">
                    {properties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={property.images[0] || '/placeholder.svg?height=60&width=60'}
                            alt={property.title}
                            className="w-15 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium">{property.title}</h4>
                            <p className="text-sm text-gray-600">{property.city}</p>
                            <p className="text-sm font-medium text-orange-600">
                              {property.currency} {property.price.toLocaleString()}/night
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={property.is_active ? "default" : "secondary"}>
                            {property.is_active ? "Active" : "Inactive"}
                          </Badge>
                          {property.avgRating && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm">{property.avgRating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No properties yet</p>
                    <Link href="/host/create">
                      <Button>Add Your First Property</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Properties</h2>
              <Link href="/host/create">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading properties...</p>
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={property.images[0] || '/placeholder.svg?height=200&width=300'}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          property.is_active ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      >
                        {property.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg truncate">{property.title}</h3>
                        <p className="text-gray-600">{property.city}</p>
                        <p className="text-orange-600 font-medium">
                          {property.currency} {property.price.toLocaleString()}/night
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{property.bedrooms} bed, {property.bathrooms} bath</span>
                          {property.avgRating && (
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span>{property.avgRating} ({property.reviewCount})</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <Link href={`/property/${property.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                  <p className="text-gray-600 mb-6">Start earning by listing your first property on Kostra</p>
                  <Link href="/host/create">
                    <Button size="lg">Add Your First Property</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600">Bookings will appear here once guests start booking your properties</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No earnings yet</h3>
                  <p className="text-gray-600">Your earnings will be tracked here once you start receiving bookings</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Insights coming soon</h3>
                  <p className="text-gray-600">Get detailed analytics about your property performance, booking trends, and optimization tips</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
