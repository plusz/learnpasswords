"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Languages, Shield, Star, Users } from "lucide-react"
import AdminScreen from "@/components/admin-screen"
import ChildScreen from "@/components/child-screen"

type Language = "en" | "pl"
type Screen = "home" | "admin" | "child"

const translations = {
  en: {
    title: "Password Learning Adventure",
    subtitle: "Learn password security in a fun way!",
    adminButton: "Parent Mode",
    childButton: "Play & Learn",
    languageLabel: "Language",
    features: {
      secure: "Safe & Secure",
      secureDesc: "Everything stays in your browser",
      fun: "Fun Learning",
      funDesc: "Gamified password practice",
      educational: "Educational",
      educationalDesc: "Learn why passwords matter",
    },
  },
  pl: {
    title: "Przygoda z Hasłami",
    subtitle: "Naucz się bezpieczeństwa haseł w zabawny sposób!",
    adminButton: "Tryb Rodzica",
    childButton: "Graj i Ucz Się",
    languageLabel: "Język",
    features: {
      secure: "Bezpieczne",
      secureDesc: "Wszystko zostaje w przeglądarce",
      fun: "Zabawna Nauka",
      funDesc: "Gamifikacja ćwiczenia haseł",
      educational: "Edukacyjne",
      educationalDesc: "Dowiedz się dlaczego hasła są ważne",
    },
  },
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en")
  const [screen, setScreen] = useState<Screen>("home")
  const [password, setPassword] = useState("")
  const [childScore, setChildScore] = useState(0)

  const t = translations[language]

  if (screen === "admin") {
    return (
      <AdminScreen
        language={language}
        onLanguageChange={setLanguage}
        onBack={() => setScreen("home")}
        onSwitchToChild={() => setScreen("child")}
        password={password}
        onPasswordChange={setPassword}
      />
    )
  }

  if (screen === "child") {
    return (
      <ChildScreen
        language={language}
        onLanguageChange={setLanguage}
        onBack={() => setScreen("home")}
        password={password}
        score={childScore}
        onScoreChange={setChildScore}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
            <Languages className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{t.languageLabel}:</span>
            <Button
              variant={language === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="h-8 px-3"
            >
              EN
            </Button>
            <Button
              variant={language === "pl" ? "default" : "outline"}
              size="sm"
              onClick={() => setLanguage("pl")}
              className="h-8 px-3"
            >
              PL
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-24 h-24 text-primary animate-pulse" />
              <Star className="w-8 h-8 text-accent absolute -top-2 -right-2 animate-star-twinkle" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 text-balance">{t.title}</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">{t.subtitle}</p>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card
            className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary"
            onClick={() => setScreen("admin")}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.adminButton}</h3>
              <p className="text-muted-foreground">Set passwords and monitor progress</p>
            </div>
          </Card>

          <Card
            className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-accent"
            onClick={() => setScreen("child")}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.childButton}</h3>
              <p className="text-muted-foreground">Practice passwords and earn stars!</p>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold mb-2">{t.features.secure}</h4>
            <p className="text-sm text-muted-foreground">{t.features.secureDesc}</p>
          </Card>

          <Card className="p-6 text-center">
            <Star className="w-12 h-12 text-accent mx-auto mb-4" />
            <h4 className="font-bold mb-2">{t.features.fun}</h4>
            <p className="text-sm text-muted-foreground">{t.features.funDesc}</p>
          </Card>

          <Card className="p-6 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold mb-2">{t.features.educational}</h4>
            <p className="text-sm text-muted-foreground">{t.features.educationalDesc}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
