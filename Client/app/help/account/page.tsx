"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Bell, CreditCard, Globe, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function AccountHelpPage() {
  const { t } = useLanguage()

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
          <span className="text-gray-900">{t("accountHelp")}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Account Topics</h3>
                <nav className="space-y-2">
                  <Link href="#personal-info" className="block text-purple-600 hover:text-purple-700 py-2">
                    Personal Information
                  </Link>
                  <Link href="#login-security" className="block text-gray-600 hover:text-gray-900 py-2">
                    Login & Security
                  </Link>
                  <Link href="#notifications" className="block text-gray-600 hover:text-gray-900 py-2">
                    Notifications
                  </Link>
                  <Link href="#payments" className="block text-gray-600 hover:text-gray-900 py-2">
                    Payments & Payouts
                  </Link>
                  <Link href="#privacy" className="block text-gray-600 hover:text-gray-900 py-2">
                    Privacy Settings
                  </Link>
                  <Link href="#preferences" className="block text-gray-600 hover:text-gray-900 py-2">
                    Global Preferences
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("accountHelp")}</h1>
                <p className="text-lg text-gray-600 mb-8">{t("accountHelpDesc")}</p>
              </div>

              <Tabs defaultValue="personal-info" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="personal-info">Personal</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="personal-info">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+977 98XXXXXXXX" />
                      </div>
                      <div>
                        <Label htmlFor="bio">About You</Label>
                        <textarea
                          id="bio"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          rows={4}
                          placeholder="Tell guests a little bit about yourself..."
                        />
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Lock className="w-5 h-5 mr-2" />
                        Login & Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Password</h4>
                          <p className="text-sm text-gray-600">Last updated 3 months ago</p>
                        </div>
                        <Button variant="outline">Update</Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Two-factor authentication</h4>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Login alerts</h4>
                          <p className="text-sm text-gray-600">Get notified of suspicious activity</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notification Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        { title: "Booking confirmations", desc: "Get notified when bookings are confirmed" },
                        { title: "Messages from hosts", desc: "Receive messages from your hosts" },
                        { title: "Special offers", desc: "Get deals and promotions" },
                        { title: "Account updates", desc: "Important account information" },
                        { title: "Marketing emails", desc: "Travel tips and inspiration" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                          <Switch defaultChecked={index < 3} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Payments & Payouts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Payment Methods</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center">
                              <div className="w-10 h-6 bg-blue-600 rounded mr-3"></div>
                              <div>
                                <p className="font-medium">•••• •••• •••• 1234</p>
                                <p className="text-sm text-gray-600">Expires 12/25</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" className="mt-4">
                          Add Payment Method
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium mb-4">Payout Methods</h4>
                        <div className="p-4 border rounded-lg">
                          <p className="text-gray-600">No payout methods added yet</p>
                          <Button variant="outline" className="mt-2">
                            Add Payout Method
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Privacy Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        { title: "Profile visibility", desc: "Control who can see your profile" },
                        { title: "Activity status", desc: "Show when you're active on Kostra" },
                        { title: "Read receipts", desc: "Let others know when you've read their messages" },
                        { title: "Data sharing", desc: "Share data to improve your experience" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                          <Switch defaultChecked={index === 0} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="w-5 h-5 mr-2" />
                        Global Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <select id="language" className="w-full p-3 border border-gray-300 rounded-lg mt-2">
                          <option>English</option>
                          <option>नेपाली (Nepali)</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <select id="currency" className="w-full p-3 border border-gray-300 rounded-lg mt-2">
                          <option>NPR (Nepalese Rupee)</option>
                          <option>USD (US Dollar)</option>
                          <option>EUR (Euro)</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <select id="timezone" className="w-full p-3 border border-gray-300 rounded-lg mt-2">
                          <option>Asia/Kathmandu (GMT+5:45)</option>
                        </select>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700">Save Preferences</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
