"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Users, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function SafetyInformationPage() {
  const { t } = useLanguage()

  const safetyInitiatives = [
    {
      icon: Shield,
      title: "Host Protection Insurance",
      description: "Up to $1M in property damage protection for hosts",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "All payments are processed securely through our platform",
    },
    {
      icon: Eye,
      title: "Identity Verification",
      description: "Government ID verification for all users",
    },
    {
      icon: Users,
      title: "Community Standards",
      description: "Clear guidelines for respectful interactions",
    },
  ]

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
          <span className="text-gray-900">Safety Information</span>
        </div>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Information</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your safety and security are our top priorities. Learn about our comprehensive safety measures and how we
              protect our community.
            </p>
          </div>

          {/* Safety Initiatives */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Safety Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyInitiatives.map((initiative, index) => {
                const IconComponent = initiative.icon
                return (
                  <Card key={index} className="text-center border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">{initiative.title}</h3>
                      <p className="text-gray-600 text-sm">{initiative.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Safety Guidelines */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>For Guests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      "Verify host identity and read reviews",
                      "Communicate through Kostra messaging",
                      "Report any safety concerns immediately",
                      "Follow local laws and house rules",
                      "Keep emergency contacts handy",
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>For Hosts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      "Screen guests and set clear expectations",
                      "Install safety equipment (smoke detectors, etc.)",
                      "Provide emergency contact information",
                      "Report suspicious activity",
                      "Keep property secure and well-maintained",
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Emergency Response */}
          <section>
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Emergency Response
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Immediate Danger</h4>
                    <p className="text-sm text-gray-600 mb-3">Call local emergency services first</p>
                    <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      Emergency: 100
                    </Button>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Safety Concerns</h4>
                    <p className="text-sm text-gray-600 mb-3">Report to our Trust & Safety team</p>
                    <Button className="bg-purple-600 hover:bg-purple-700">Report Issue</Button>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">24/7 Support</h4>
                    <p className="text-sm text-gray-600 mb-3">Get help anytime</p>
                    <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Resources */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Safety Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/safety/community-standards" className="block">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Community Standards</h3>
                    <p className="text-gray-600 text-sm">Our guidelines for respectful interactions</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/safety/discrimination-policy" className="block">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Non-Discrimination Policy</h3>
                    <p className="text-gray-600 text-sm">Ensuring equal access for all users</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/safety/safety-tips" className="block">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Safety Tips</h3>
                    <p className="text-gray-600 text-sm">Best practices for safe stays</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
