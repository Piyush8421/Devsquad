"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  CreditCard,
  Shield,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { paymentsAPI, bookingsAPI } from "@/lib/api"
import { toast } from "sonner"

interface PaymentData {
  propertyId: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  nights: string;
  pricePerNight: string;
  totalPrice: string;
  currency: string;
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get booking data from URL params
  const paymentData: PaymentData = {
    propertyId: searchParams.get('propertyId') || '',
    propertyTitle: searchParams.get('propertyTitle') || '',
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: searchParams.get('guests') || '',
    nights: searchParams.get('nights') || '',
    pricePerNight: searchParams.get('pricePerNight') || '',
    totalPrice: searchParams.get('totalPrice') || '',
    currency: searchParams.get('currency') || 'NPR'
  }

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })
  const handlePayment = async () => {
    if (!user) {
      router.push('/auth?mode=signin')
      return
    }

    // Basic validation
    if (paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv || !cardData.cardholderName) {
        toast.error('Please fill in all card details')
        return
      }
    }

    try {
      setLoading(true)
      
      // Step 1: Create payment intent
      const paymentIntentData = {
        propertyId: parseInt(paymentData.propertyId),
        checkIn: paymentData.checkIn,
        checkOut: paymentData.checkOut,
        guests: parseInt(paymentData.guests),
        totalAmount: parseInt(paymentData.totalPrice),
        currency: paymentData.currency,
        paymentMethod,
      }

      const intentResponse = await paymentsAPI.createIntent(paymentIntentData)
      
      if (!intentResponse.success) {
        throw new Error(intentResponse.message)
      }

      // Step 2: Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Step 3: Confirm payment
      const confirmData = {
        paymentIntentId: intentResponse.data.paymentIntent.id,
        paymentProvider: paymentMethod === 'card' ? 'stripe' : paymentMethod
      }

      const confirmResponse = await paymentsAPI.confirmPayment(confirmData)
      
      if (!confirmResponse.success) {
        throw new Error(confirmResponse.message)
      }

      toast.success('Payment successful! Booking confirmed.')
      router.push('/dashboard/guest?tab=bookings')
      
    } catch (error: any) {
      toast.error(error.message || 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!paymentData.propertyId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Invalid Checkout Session</h2>
          <p className="text-gray-600 mb-4">No booking data found. Please start over.</p>
          <Link href="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href={`/property/${paymentData.propertyId}`} className="inline-flex items-center text-gray-600 hover:text-orange-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Property
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete your booking</h1>
              <p className="text-gray-600">You're just one step away from your amazing stay!</p>
            </div>

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      paymentMethod === 'card' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mb-2" />
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, etc.</p>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('esewa')}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      paymentMethod === 'esewa' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-6 h-6 bg-green-500 rounded mb-2"></div>
                    <p className="font-medium">eSewa</p>
                    <p className="text-sm text-gray-600">Digital wallet</p>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('khalti')}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      paymentMethod === 'khalti' 
                        ? 'border-orange-500 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-6 h-6 bg-purple-500 rounded mb-2"></div>
                    <p className="font-medium">Khalti</p>
                    <p className="text-sm text-gray-600">Digital wallet</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            {paymentMethod === 'card' && (
              <Card>
                <CardHeader>
                  <CardTitle>Card Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={cardData.cardholderName}
                      onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {(paymentMethod === 'esewa' || paymentMethod === 'khalti') && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className={`w-16 h-16 ${paymentMethod === 'esewa' ? 'bg-green-500' : 'bg-purple-500'} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <span className="text-white font-bold text-xl">
                        {paymentMethod === 'esewa' ? 'E' : 'K'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      You will be redirected to {paymentMethod === 'esewa' ? 'eSewa' : 'Khalti'} to complete your payment
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg">{paymentData.propertyTitle}</h3>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Check-in</span>
                    <span>{new Date(paymentData.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out</span>
                    <span>{new Date(paymentData.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests</span>
                    <span>{paymentData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights</span>
                    <span>{paymentData.nights}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{paymentData.currency} {parseInt(paymentData.pricePerNight).toLocaleString()} x {paymentData.nights} nights</span>
                    <span>{paymentData.currency} {parseInt(paymentData.totalPrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>{paymentData.currency} 0</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{paymentData.currency} {parseInt(paymentData.totalPrice).toLocaleString()}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  size="lg"
                >
                  {loading ? (
                    "Processing Payment..."
                  ) : (
                    `Pay ${paymentData.currency} ${parseInt(paymentData.totalPrice).toLocaleString()}`
                  )}
                </Button>

                <p className="text-xs text-gray-600 text-center">
                  By clicking "Pay", you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
