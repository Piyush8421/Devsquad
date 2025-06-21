"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Heart,
  MessageCircle,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { bookingsAPI } from "@/lib/api"
import { toast } from "sonner"

interface Booking {
  id: number;
  property_title: string;
  property_city: string;
  property_images: string[];
  host_first_name: string;
  host_last_name: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
}

export default function GuestDashboard() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'
  
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  })

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingsAPI.getAll()
      if (response.success) {
        setBookings(response.data.bookings)
        calculateStats(response.data.bookings)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (bookingsData: Booking[]) => {
    const now = new Date()
    const upcoming = bookingsData.filter(b => 
      new Date(b.check_in) > now && b.status !== 'cancelled'
    )
    const completed = bookingsData.filter(b => b.status === 'completed')
    const totalSpent = bookingsData
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + b.total_price, 0)

    setStats({
      totalBookings: bookingsData.length,
      upcomingBookings: upcoming.length,
      completedBookings: completed.length,
      totalSpent
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCancelBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    try {
      const response = await bookingsAPI.cancel(bookingId)
      if (response.success) {
        toast.success('Booking cancelled successfully')
        fetchBookings() // Refresh the list
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel booking')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view your dashboard</p>
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
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-gray-600">Manage your bookings and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.totalBookings}</p>
                      <p className="text-sm text-gray-600">Total Bookings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.upcomingBookings}</p>
                      <p className="text-sm text-gray-600">Upcoming Trips</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{stats.completedBookings}</p>
                      <p className="text-sm text-gray-600">Completed Trips</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-2xl font-bold">NPR {stats.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading bookings...</p>
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={booking.property_images[0] || '/placeholder.svg?height=60&width=60'}
                            alt={booking.property_title}
                            className="w-15 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium">{booking.property_title}</h4>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {booking.property_city}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(booking.status)}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status}</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No bookings yet</p>
                    <Link href="/explore">
                      <Button>Explore Properties</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading bookings...</p>
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                          <div className="flex items-center space-x-4">
                            <img
                              src={booking.property_images[0] || '/placeholder.svg?height=80&width=80'}
                              alt={booking.property_title}
                              className="w-20 h-16 object-cover rounded"
                            />
                            <div>
                              <h4 className="font-medium text-lg">{booking.property_title}</h4>
                              <p className="text-gray-600 flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {booking.property_city}
                              </p>
                              <p className="text-gray-600 flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {booking.guests} guests
                              </p>
                              <p className="text-sm text-gray-600">
                                Host: {booking.host_first_name} {booking.host_last_name}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-medium">Check-in</p>
                            <p className="text-sm text-gray-600">
                              {new Date(booking.check_in).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-medium">Check-out</p>
                            <p className="text-sm text-gray-600">
                              {new Date(booking.check_out).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <p className="font-medium">Total</p>
                            <p className="text-lg font-bold text-orange-600">
                              NPR {booking.total_price.toLocaleString()}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-center space-y-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1 capitalize">{booking.status}</span>
                            </Badge>
                            {booking.status === 'confirmed' && new Date(booking.check_in) > new Date() && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-6">Start exploring amazing properties and make your first booking!</p>
                    <Link href="/explore">
                      <Button size="lg">Explore Properties</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600 mb-6">Save properties you love to easily find them later</p>
                  <Link href="/explore">
                    <Button size="lg">Explore Properties</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">Profile management coming soon!</p>
                  <p className="text-sm text-gray-500">
                    You can update your profile information, preferences, and account settings here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
