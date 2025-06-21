"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Home, Building, TreePine, Coffee, Hotel } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function HostSetupPage() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPropertyType, setSelectedPropertyType] = useState("")

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const propertyTypes = [
    {
      id: "apartment",
      title: t("apartment"),
      description: "A place within a multi-unit residential building",
      icon: Building,
    },
    {
      id: "house",
      title: t("house"),
      description: "A residential building, usually for one family",
      icon: Home,
    },
    {
      id: "secondary-unit",
      title: t("secondaryUnit"),
      description: "A private unit that's part of a larger property",
      icon: Home,
    },
    {
      id: "unique-space",
      title: t("uniqueSpace"),
      description: "A space that's not typically used for accommodation",
      icon: TreePine,
    },
    {
      id: "bed-breakfast",
      title: t("bedAndBreakfast"),
      description: "A small lodging establishment with breakfast included",
      icon: Coffee,
    },
    {
      id: "boutique-hotel",
      title: t("boutique"),
      description: "A small, stylish hotel with unique character",
      icon: Hotel,
    },
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Handle completion
      console.log("Setup completed!")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whichDescribes")}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {propertyTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedPropertyType === type.id ? "ring-2 ring-purple-600 bg-purple-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedPropertyType(type.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <IconComponent className="w-8 h-8 text-gray-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                          <p className="text-gray-600 text-sm">{type.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whereLocated")}</h1>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country/Region</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                        <option>Nepal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street address</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Enter your address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                          placeholder="Province"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("shareBasics")}</h1>
              <p className="text-gray-600">You'll add more details later, like bed types, photos, and amenities.</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {[
                      { label: t("guests"), key: "guests" },
                      { label: t("bedrooms"), key: "bedrooms" },
                      { label: t("beds"), key: "beds" },
                      { label: t("bathrooms"), key: "bathrooms" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-lg font-medium">{item.label}</span>
                        <div className="flex items-center space-x-4">
                          <Button variant="outline" size="icon" className="rounded-full w-10 h-10" onClick={() => {}}>
                            -
                          </Button>
                          <span className="text-lg font-medium w-8 text-center">1</span>
                          <Button variant="outline" size="icon" className="rounded-full w-10 h-10" onClick={() => {}}>
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Kostra
            </Link>
            <div className="text-sm text-gray-600">{t("kostraSetup")}</div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {t("stepOf").replace("{current}", currentStep.toString()).replace("{total}", totalSteps.toString())}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">{renderStepContent()}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="rounded-full px-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("back")}
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentStep === 1 && !selectedPropertyType}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
            >
              {currentStep === totalSteps ? t("finish") : t("next")}
              {currentStep !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
