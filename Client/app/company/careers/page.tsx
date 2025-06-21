"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Heart, Lightbulb, Globe, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function CareersPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Heart,
      title: "Belong Anywhere",
      description: "We create a world where anyone can belong anywhere",
    },
    {
      icon: Users,
      title: "Champion the Mission",
      description: "We're united with our community to create a world where anyone can belong anywhere",
    },
    {
      icon: Lightbulb,
      title: "Be a Cereal Entrepreneur",
      description: "We're scrappy and resourceful, turning big ideas into reality",
    },
    {
      icon: Globe,
      title: "Embrace the Adventure",
      description: "We're curious, optimistic, and we embrace the unknown",
    },
  ]

  const openPositions = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Kathmandu, Nepal",
      type: "Full-time",
      description: "Build scalable systems that power millions of bookings worldwide",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Drive product strategy and execution for our core booking platform",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Kathmandu, Nepal",
      type: "Full-time",
      description: "Create beautiful and intuitive experiences for hosts and guests",
    },
    {
      title: "Customer Success Manager",
      department: "Support",
      location: "Pokhara, Nepal",
      type: "Full-time",
      description: "Help our community of hosts succeed and grow their businesses",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Contract",
      description: "Drive growth through creative marketing campaigns and partnerships",
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Kathmandu, Nepal",
      type: "Full-time",
      description: "Turn data into insights that drive business decisions",
    },
  ]

  const benefits = [
    "Competitive salary and equity",
    "Comprehensive health insurance",
    "Annual travel credits",
    "Flexible work arrangements",
    "Professional development budget",
    "Paid time off and sabbaticals",
    "Free meals and snacks",
    "Wellness programs",
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
          <span className="text-gray-900">Careers</span>
        </div>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us create a world where anyone can belong anywhere. Build the future of travel and hospitality with
              us.
            </p>
          </div>

          {/* Company Values */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <Card key={index} className="text-center border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold mb-2">{value.title}</h3>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Open Positions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Open Positions</h2>
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{position.title}</h3>
                          <Badge variant="secondary">{position.department}</Badge>
                          <Badge variant={position.type === "Full-time" ? "default" : "outline"}>{position.type}</Badge>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{position.location}</span>
                        </div>
                        <p className="text-gray-600">{position.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Apply Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Work at Kostra?</h2>
                <p className="text-gray-600 mb-6">
                  We believe that work should be meaningful, challenging, and fun. Join a team that's passionate about
                  creating belonging for everyone, everywhere.
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Life at Kostra</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Company Culture Video</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Get a glimpse into our culture, values, and what it's like to work at Kostra.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Diversity & Inclusion */}
          <section>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Diversity & Inclusion</h2>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                  We're committed to building a diverse and inclusive team that reflects the communities we serve. We
                  welcome applications from all backgrounds and encourage everyone to apply.
                </p>
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-100">
                  Learn More About Our Commitment
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Contact */}
          <section>
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See the Right Role?</h2>
                <p className="text-gray-600 mb-6">
                  We're always looking for talented people to join our team. Send us your resume and tell us how you'd
                  like to contribute.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">Send Us Your Resume</Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
