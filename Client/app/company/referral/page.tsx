"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Gift, Users, DollarSign, Share2, ArrowLeft, Copy, Mail, MessageCircle, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function ReferralProgramPage() {
  const { t } = useLanguage()

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://kostra.com/ref/USER123")
    alert("Referral link copied!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Kostra
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link href="/" className="flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Referral Program</span>
        </div>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Referral Program</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Share Kostra with friends and earn rewards when they book or host. It's a win-win for everyone!
            </p>
          </div>

          {/* How it Works */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Share Your Link</h3>
                <p className="text-gray-600">Send your unique referral link to friends and family</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Friends Join</h3>
                <p className="text-gray-600">They sign up and complete their first booking or hosting</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. You Both Earn</h3>
                <p className="text-gray-600">Both you and your friend receive travel credits</p>
              </div>
            </div>
          </section>

          {/* Rewards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Referral Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-center text-purple-600">For Guests</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">NPR 1,000</div>
                  <p className="text-gray-600 mb-4">Travel credit for your friend's first booking</p>
                  <div className="text-2xl font-bold text-purple-600 mb-2">NPR 500</div>
                  <p className="text-gray-600">Travel credit for you when they book</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-center text-green-600">For Hosts</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">NPR 2,000</div>
                  <p className="text-gray-600 mb-4">Bonus for your friend's first hosting</p>
                  <div className="text-2xl font-bold text-green-600 mb-2">NPR 1,000</div>
                  <p className="text-gray-600">Bonus for you when they start hosting</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Share Your Link */}
          <section>
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Share Your Referral Link</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex space-x-2">
                    <Input value="https://kostra.com/ref/USER123" readOnly className="flex-1" />
                    <Button onClick={handleCopyLink} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">Or share directly:</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="icon">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Your Referrals */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">12</div>
                    <p className="text-gray-600">Friends Invited</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <p className="text-gray-600">Successful Referrals</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600">NPR 4,000</div>
                    <p className="text-gray-600">Credits Earned</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">NPR 2,500</div>
                    <p className="text-gray-600">Credits Used</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Terms */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Program Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Referral credits are valid for 1 year from the date earned</li>
                  <li>• Credits can be used for bookings but cannot be transferred or redeemed for cash</li>
                  <li>• Both referrer and referee must be new to Kostra</li>
                  <li>• Referee must complete their first booking/hosting within 30 days of signup</li>
                  <li>• Kostra reserves the right to modify or terminate the program at any time</li>
                  <li>• Fraudulent activity will result in account suspension</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
