"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, AlertTriangle, Phone, MessageCircle, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function SafetySecurityPage() {
  const { t } = useLanguage()

  const safetyFeatures = [
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All users go through identity verification to ensure authentic profiles.",
    },
    {
      icon: Lock,
      title: "Secure Payments",
      description: "Your payment information is encrypted and never shared with hosts.",
    },
    {
      icon: Eye,
      title: "Background Checks",
      description: "Hosts undergo background checks in supported regions.",
    },
    {
      icon: AlertTriangle,
      title: "Trust & Safety Team",
      description: "24/7 support team ready to help with any safety concerns.",
    },
  ]

  const safetyTips = [
    {
      category: "Before Booking",
      tips: [
        "Read reviews from previous guests",
        "Check host verification status",
        "Communicate through Kostra messaging",
        "Verify property photos and amenities",
      ],
    },
    {
      category: "During Your Stay",
      tips: [
        "Keep important documents secure",
        "Follow house rules and local laws",
        "Report any issues immediately",
        "Stay connected with friends/family",
      ],
    },
    {
      category: "For Hosts",
      tips: [
        "Screen guests carefully",
        "Set clear house rules",
        "Install smoke and carbon monoxide detectors",
        "Provide emergency contact information",
      ],
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
            <div className="flex items-center space-x-4">
              <Link href="/help" className="text-gray-600 hover:text-gray-900">
                {t("help")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link href="/help" className="flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("help")}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{t("safetyHelp")}</span>
        </div>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("safetyHelp")}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("safetyHelpDesc")}</p>
          </div>

          {/* Safety Features */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Safety Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="text-center border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Safety Tips */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Safety Tips</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {safetyTips.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Emergency Contacts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Emergency & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-2 border-red-200">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-red-600">Emergency</h3>
                  <p className="text-gray-600 mb-4">For immediate safety concerns</p>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    Call Emergency Services
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600 mb-4">Get help anytime, anywhere</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">Contact Support</Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Report Issue</h3>
                  <p className="text-gray-600 mb-4">Report safety concerns</p>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Report Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Trust & Safety Policies */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Trust & Safety Policies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/policies/community-standards"
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium mb-2">Community Standards</h4>
                    <p className="text-sm text-gray-600">Our guidelines for respectful interactions</p>
                  </Link>
                  <Link
                    href="/policies/discrimination"
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium mb-2">Non-Discrimination Policy</h4>
                    <p className="text-sm text-gray-600">Ensuring equal access for all users</p>
                  </Link>
                  <Link
                    href="/policies/content-policy"
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium mb-2">Content Policy</h4>
                    <p className="text-sm text-gray-600">Guidelines for photos and descriptions</p>
                  </Link>
                  <Link
                    href="/policies/guest-standards"
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium mb-2">Guest Standards</h4>
                    <p className="text-sm text-gray-600">Expected behavior for guests</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
