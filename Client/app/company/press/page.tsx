"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, ExternalLink, ArrowLeft, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function PressPage() {
  const { t } = useLanguage()

  const pressReleases = [
    {
      title: "Kostra Expands to 100+ Cities Across Nepal",
      date: "December 15, 2024",
      excerpt: "Leading accommodation platform reaches major milestone with presence in over 100 cities nationwide",
      category: "Expansion",
    },
    {
      title: "Kostra Launches Host Protection Insurance Program",
      date: "November 28, 2024",
      excerpt: "New comprehensive insurance coverage provides up to NPR 10 million in property protection for hosts",
      category: "Product",
    },
    {
      title: "Kostra Partners with Nepal Tourism Board",
      date: "October 10, 2024",
      excerpt:
        "Strategic partnership aims to boost domestic and international tourism through unique accommodation experiences",
      category: "Partnership",
    },
    {
      title: "Kostra Reaches 1 Million Guest Milestone",
      date: "September 5, 2024",
      excerpt:
        "Platform celebrates serving over one million guests since launch, driving economic growth for local hosts",
      category: "Milestone",
    },
  ]

  const mediaKit = [
    {
      title: "Company Logo Pack",
      description: "High-resolution logos in various formats",
      type: "ZIP",
      size: "2.5 MB",
    },
    {
      title: "Brand Guidelines",
      description: "Complete brand identity and usage guidelines",
      type: "PDF",
      size: "1.8 MB",
    },
    {
      title: "Product Screenshots",
      description: "High-quality screenshots of our platform",
      type: "ZIP",
      size: "15.2 MB",
    },
    {
      title: "Executive Photos",
      description: "Professional headshots of leadership team",
      type: "ZIP",
      size: "8.7 MB",
    },
  ]

  const awards = [
    {
      title: "Best Travel Platform 2024",
      organization: "Nepal Digital Awards",
      year: "2024",
    },
    {
      title: "Startup of the Year",
      organization: "Nepal Startup Awards",
      year: "2023",
    },
    {
      title: "Innovation in Tourism",
      organization: "Tourism Excellence Awards",
      year: "2023",
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
          <span className="text-gray-900">Press</span>
        </div>

        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Press & Media</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Latest news, press releases, and media resources about Kostra's mission to create belonging anywhere.
            </p>
          </div>

          {/* Press Contact */}
          <section>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Media Inquiries</h2>
                    <p className="text-gray-600 mb-6">
                      For press inquiries, interview requests, or media partnerships, please contact our press team.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-purple-600 mr-3" />
                        <span>press@kostra.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-purple-600 mr-3" />
                        <span>+977-1-4567890</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Founded: 2022</li>
                      <li>• Headquarters: Kathmandu, Nepal</li>
                      <li>• 100+ cities covered</li>
                      <li>• 500+ active properties</li>
                      <li>• 1M+ guests served</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Press Releases */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="secondary">{release.category}</Badge>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {release.date}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                        <p className="text-gray-600">{release.excerpt}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Button variant="outline">
                          Read More
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Media Kit */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Media Kit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.size}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Awards & Recognition */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Awards & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h3 className="font-semibold mb-2">{award.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">{award.organization}</p>
                    <p className="text-gray-500 text-sm">{award.year}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* In the News */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">In the News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  outlet: "The Kathmandu Post",
                  headline: "How Kostra is Revolutionizing Nepal's Tourism Industry",
                  date: "Dec 10, 2024",
                },
                {
                  outlet: "Republica",
                  headline: "Local Startup Kostra Reaches Major Growth Milestone",
                  date: "Nov 25, 2024",
                },
                {
                  outlet: "My Republica",
                  headline: "The Future of Travel: Kostra's Vision for Nepal",
                  date: "Oct 15, 2024",
                },
              ].map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-sm text-purple-600 font-medium mb-2">{article.outlet}</div>
                    <h3 className="font-semibold mb-2">{article.headline}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
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
