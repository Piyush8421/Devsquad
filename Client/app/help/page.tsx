"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  Calendar,
  CreditCard,
  Home,
  User,
  Shield,
  Phone,
  Mail,
  MessageCircle,
  BookOpen,
  HelpCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function HelpPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const helpCategories = [
    {
      icon: Calendar,
      title: t("bookingHelp"),
      description: t("bookingHelpDesc"),
      color: "bg-blue-100 text-blue-600",
      href: "/help/booking",
    },
    {
      icon: CreditCard,
      title: t("paymentHelp"),
      description: t("paymentHelpDesc"),
      color: "bg-green-100 text-green-600",
      href: "/help/payments",
    },
    {
      icon: Home,
      title: t("hostingHelp"),
      description: t("hostingHelpDesc"),
      color: "bg-orange-100 text-orange-600",
      href: "/help/hosting",
    },
    {
      icon: User,
      title: t("accountHelp"),
      description: t("accountHelpDesc"),
      color: "bg-purple-100 text-purple-600",
      href: "/help/account",
    },
    {
      icon: Shield,
      title: t("safetyHelp"),
      description: t("safetyHelpDesc"),
      color: "bg-red-100 text-red-600",
      href: "/help/safety",
    },
    {
      icon: HelpCircle,
      title: t("contactSupport"),
      description: t("contactSupportDesc"),
      color: "bg-gray-100 text-gray-600",
      href: "/help/contact",
    },
  ]

  const faqs = [
    {
      question: "How do I make a reservation?",
      answer:
        "To make a reservation, search for your destination, select your dates and number of guests, then choose from available properties. Click 'Book Now' and follow the payment process.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "Cancellation policies vary by property. You can find the specific policy on each listing page. Most hosts offer flexible, moderate, or strict cancellation policies.",
    },
    {
      question: "How do I contact my host?",
      answer:
        "Once your booking is confirmed, you can message your host directly through the Kostra platform. Go to your trips and click on the property to access messaging.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards, debit cards, and digital wallets. Payment is processed securely through our platform.",
    },
    {
      question: "How do I become a host?",
      answer:
        "To become a host, click 'Become a Host' in the navigation menu. You'll need to provide information about your property, upload photos, and set your pricing.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard encryption to protect your personal and payment information. We never share your details with hosts until after booking confirmation.",
    },
    {
      question: "What if I have issues during my stay?",
      answer:
        "Contact our 24/7 support team immediately if you encounter any issues. We're here to help resolve problems quickly and ensure you have a great experience.",
    },
    {
      question: "How do I leave a review?",
      answer:
        "After your stay, you'll receive an email invitation to leave a review. You can also access the review form through your account under 'Your Trips'.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Kostra
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">{t("helpTitle")}</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">{t("helpSubtitle")}</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                placeholder={t("searchHelp")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-14 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("popularTopics")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link href={category.href} key={index}>
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("contactSupport")}</h2>
            <p className="text-lg text-gray-600">{t("contactSupportDesc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t("callUs")}</h3>
                <p className="text-gray-600 mb-4">+977-1-4567890</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  24/7 Available
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t("emailUs")}</h3>
                <p className="text-gray-600 mb-4">support@kostra.com</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Response within 24 hours
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t("chatWithUs")}</h3>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                  Start Chat
                </Button>
                <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
                  <Clock className="w-4 h-4 mr-2" />
                  Average response: 5 minutes
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("faqSection")}</h2>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-4">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && searchQuery && (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No FAQs match your search.</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                    Clear Search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Still need help?</h2>
          <p className="text-xl text-gray-600 mb-8">Our support team is here to assist you 24/7</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold text-lg px-8 py-4 rounded-xl"
          >
            {t("contactSupport")}
          </Button>
        </div>
      </section>
    </div>
  )
}
