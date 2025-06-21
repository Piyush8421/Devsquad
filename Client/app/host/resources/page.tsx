"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Video, Users, MessageCircle, TrendingUp, Shield, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function HostResourcesPage() {
  const { t } = useLanguage()

  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Essential guides for new hosts",
      resources: ["Host onboarding checklist", "Setting up your listing", "Photography tips", "Pricing your space"],
    },
    {
      icon: TrendingUp,
      title: "Growing Your Business",
      description: "Tips to maximize your earnings",
      resources: [
        "Increasing bookings",
        "Seasonal pricing strategies",
        "Guest experience optimization",
        "Marketing your listing",
      ],
    },
    {
      icon: Users,
      title: "Guest Management",
      description: "Best practices for hosting",
      resources: [
        "Communication templates",
        "Check-in procedures",
        "Handling difficult situations",
        "Building guest relationships",
      ],
    },
    {
      icon: Shield,
      title: "Safety & Legal",
      description: "Protect yourself and your property",
      resources: ["Host protection insurance", "Legal requirements", "Safety guidelines", "Tax information"],
    },
  ]

  const featuredResources = [
    {
      title: "Host Academy: Complete Course",
      description: "Comprehensive video series covering all aspects of hosting",
      type: "Video Course",
      duration: "2 hours",
      icon: Video,
    },
    {
      title: "Host Community Forum",
      description: "Connect with other hosts and share experiences",
      type: "Community",
      members: "10,000+ hosts",
      icon: MessageCircle,
    },
    {
      title: "Monthly Host Newsletter",
      description: "Latest tips, updates, and success stories",
      type: "Newsletter",
      frequency: "Monthly",
      icon: BookOpen,
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
              <Link href="/host" className="text-gray-600 hover:text-gray-900">
                Hosting
              </Link>
            </div>
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
          <Link href="/host" className="text-purple-600 hover:text-purple-700">
            Hosting
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Host Resources</span>
        </div>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Host Resources</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed as a Kostra host. From getting started to growing your business.
            </p>
          </div>

          {/* Featured Resources */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => {
                const IconComponent = resource.icon
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                          <IconComponent className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <span className="text-sm text-purple-600 font-medium">{resource.type}</span>
                          <p className="text-xs text-gray-500">
                            {resource.duration || resource.members || resource.frequency}
                          </p>
                        </div>
                      </div>
                      <h3 className="font-semibold mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Access Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Resource Categories */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resourceCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <IconComponent className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg">{category.title}</h3>
                          <p className="text-sm text-gray-600 font-normal">{category.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.resources.map((resource, resourceIndex) => (
                          <li key={resourceIndex}>
                            <Link
                              href={`/host/resources/${category.title.toLowerCase().replace(/\s+/g, "-")}/${resource.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-purple-600 hover:text-purple-700 hover:underline"
                            >
                              {resource}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h2>
                  <p className="text-gray-600">Get support from our team and community</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/help/contact">
                    <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-100">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/host/community">
                    <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-100">
                      Join Community
                    </Button>
                  </Link>
                  <Link href="/host/webinars">
                    <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-100">
                      Attend Webinar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Success Stories */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Host Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya Sharma",
                  location: "Kathmandu",
                  story: "Increased bookings by 300% using our pricing tips",
                  earnings: "NPR 50,000/month",
                },
                {
                  name: "Rajesh Thapa",
                  location: "Pokhara",
                  story: "Built a 5-star reputation with excellent guest service",
                  earnings: "NPR 75,000/month",
                },
                {
                  name: "Sunita Gurung",
                  location: "Nagarkot",
                  story: "Turned family home into successful business",
                  earnings: "NPR 40,000/month",
                },
              ].map((host, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
                      <h3 className="font-semibold">{host.name}</h3>
                      <p className="text-sm text-gray-600">{host.location}</p>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">"{host.story}"</p>
                    <div className="text-center">
                      <span className="text-lg font-bold text-purple-600">{host.earnings}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
