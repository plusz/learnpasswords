"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ExternalLink,
  Languages,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"

type Language = "en" | "pl"

interface AdminScreenProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onBack: () => void
  onSwitchToChild: () => void
  onSwitchToGuide: () => void
  password: string
  onPasswordChange: (password: string) => void
  requireConfirmation: boolean
  onRequireConfirmationChange: (require: boolean) => void
}

const translations = {
  en: {
    title: "Parent Dashboard",
    passwordSection: "Set Child Password",
    passwordLabel: "Password for your child",
    passwordPlaceholder: "Enter a password...",
    strengthMeter: "Password Strength",
    switchToChild: "Switch to Child Mode",
    instructions: "After entering your child's password, switch to Child Mode. The password is not saved and remains only in your browser until you close the tab.",
    education: {
      title: "Why Password Strength Matters",
      importance: "Strong passwords protect your child's accounts from hackers and keep personal information safe.",
      memory:
        "Choose a password that's strong but easy for your child to remember. Consider using a memorable phrase or pattern.",
      privacy: "This password never leaves your browser - it's completely private and secure.",
      learnMore: "Learn more about password security",
      sourceCode: "Application source code",
      passwordGuide: "Guide: How to set a good password",
    },
    confirmation: {
      title: "Mode Selection",
      description: "Simple Mode: Password validation happens as the child types (easier learning). Real Mode: Password validation happens only after pressing Enter or clicking the Login button, similar to real applications.",
      buttonText: "Login",
      simpleMode: "Simple Mode",
      realMode: "Real Mode",
    },
    strength: {
      weak: "Weak",
      fair: "Fair",
      good: "Good",
      strong: "Strong",
    },
    crackTime: {
      instant: "Could be cracked instantly",
      seconds: "Could be cracked in seconds",
      minutes: "Could be cracked in minutes",
      hours: "Could be cracked in hours",
      days: "Could be cracked in days",
      months: "Could be cracked in months",
      years: "Could be cracked in years",
      centuries: "Would take centuries to crack",
    },
  },
  pl: {
    title: "Panel Rodzica",
    passwordSection: "Ustaw Hasło Dziecka",
    passwordLabel: "Hasło dla twojego dziecka",
    passwordPlaceholder: "Wprowadź hasło...",
    strengthMeter: "Siła Hasła",
    switchToChild: "Przełącz na Tryb Dziecka",
    instructions: "Po wpisaniu hasła dziecka, przełącz na Tryb Dziecka. Hasło nie jest zapisywane i jest jedynie w Twojej przeglądarce do czasu zamknięcia karty.",
    education: {
      title: "Dlaczego Siła Hasła Ma Znaczenie",
      importance:
        "Silne hasła chronią konta twojego dziecka przed hakerami i zapewniają bezpieczeństwo danych osobowych.",
      memory:
        "Wybierz hasło, które jest silne, ale łatwe do zapamiętania dla dziecka. Rozważ użycie pamiętnej frazy lub wzoru.",
      privacy: "To hasło nigdy nie opuszcza przeglądarki - jest całkowicie prywatne i bezpieczne.",
      learnMore: "Dowiedz się więcej o bezpieczeństwie haseł",
      sourceCode: "Kod źródłowy aplikacji",
      passwordGuide: "Poradnik: Jak ustawić dobre hasło",
    },
    confirmation: {
      title: "Wybór Trybu",
      description: "Tryb Uproszczony: Walidacja hasła następuje podczas pisania (łatwiejsza nauka). Tryb Realny: Walidacja hasła następuje dopiero po naciśnięciu Enter lub kliknięciu przycisku Zaloguj, podobnie jak w prawdziwych aplikacjach.",
      buttonText: "Zaloguj",
      simpleMode: "Tryb Uproszczony",
      realMode: "Tryb Realny",
    },
    strength: {
      weak: "Słabe",
      fair: "Średnie",
      good: "Dobre",
      strong: "Silne",
    },
    crackTime: {
      instant: "Może być złamane natychmiast",
      seconds: "Może być złamane w sekundach",
      minutes: "Może być złamane w minutach",
      hours: "Może być złamane w godzinach",
      days: "Może być złamane w dniach",
      months: "Może być złamane w miesiącach",
      years: "Może być złamane w latach",
      centuries: "Złamanie zajęłoby wieki",
    },
  },
}

function calculatePasswordStrength(password: string) {
  if (!password) return { score: 0, level: "weak", crackTime: "instant" }

  let score = 0
  let crackTime = "instant"

  // Length scoring
  if (password.length >= 8) score += 25
  if (password.length >= 12) score += 25

  // Character variety
  if (/[a-z]/.test(password)) score += 10
  if (/[A-Z]/.test(password)) score += 10
  if (/[0-9]/.test(password)) score += 10
  if (/[^A-Za-z0-9]/.test(password)) score += 20

  // Determine level and crack time
  let level = "weak"
  if (score >= 75) {
    level = "strong"
    crackTime = password.length >= 12 ? "centuries" : "years"
  } else if (score >= 50) {
    level = "good"
    crackTime = password.length >= 10 ? "months" : "days"
  } else if (score >= 25) {
    level = "fair"
    crackTime = password.length >= 8 ? "hours" : "minutes"
  } else {
    crackTime = password.length >= 4 ? "seconds" : "instant"
  }

  return { score: Math.min(score, 100), level, crackTime }
}

export default function AdminScreen({
  language,
  onLanguageChange,
  onBack,
  onSwitchToChild,
  onSwitchToGuide,
  password,
  onPasswordChange,
  requireConfirmation,
  onRequireConfirmationChange,
}: AdminScreenProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const t = translations[language]
  const strength = calculatePasswordStrength(password)

  const getStrengthColor = (level: string) => {
    switch (level) {
      case "weak":
        return "bg-destructive"
      case "fair":
        return "bg-orange-500"
      case "good":
        return "bg-yellow-500"
      case "strong":
        return "bg-primary"
      default:
        return "bg-gray-300"
    }
  }

  const getStrengthIcon = (level: string) => {
    switch (level) {
      case "weak":
        return <XCircle className="w-5 h-5 text-destructive" />
      case "fair":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "good":
        return <CheckCircle className="w-5 h-5 text-yellow-500" />
      case "strong":
        return <CheckCircle className="w-5 h-5 text-primary" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* Top row - Back button and title */}
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
              {t.title}
            </h1>
          </div>

          {/* Bottom row - Controls (responsive) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 max-w-[390px] sm:max-w-none mx-auto sm:mx-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm w-full sm:w-auto justify-center sm:justify-start">
              <Languages className="w-4 h-4 text-primary" />
              <Button
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => onLanguageChange("en")}
                className="h-8 px-3"
              >
                EN
              </Button>
              <Button
                variant={language === "pl" ? "default" : "outline"}
                size="sm"
                onClick={() => onLanguageChange("pl")}
                className="h-8 px-3"
              >
                PL
              </Button>
            </div>

            <Button 
              onClick={onSwitchToChild} 
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
            >
              {t.switchToChild}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Password Setup */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              {t.passwordSection}
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-base font-medium">
                  {t.passwordLabel}
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => onPasswordChange(e.target.value.replace(/\s/g, ''))}
                    onKeyDown={(e) => {
                      if (e.key === ' ') {
                        e.preventDefault()
                      }
                    }}
                    placeholder={t.passwordPlaceholder}
                    className="pr-12 text-lg h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {password && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t.strengthMeter}</span>
                    <div className="flex items-center gap-2">
                      {getStrengthIcon(strength.level)}
                      <span className="text-sm font-medium capitalize">
                        {t.strength[strength.level as keyof typeof t.strength]}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${getStrengthColor(strength.level)}`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {t.crackTime[strength.crackTime as keyof typeof t.crackTime]}
                  </p>
                </div>
              )}

              {/* Confirmation Toggle */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium">{t.confirmation.title}</span>
                    <div 
                      className="relative"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                      {showTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                          <div className="text-center">{t.confirmation.description}</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRequireConfirmationChange(!requireConfirmation)}
                    className="flex items-center gap-2 h-8"
                  >
                    {requireConfirmation ? (
                      <ToggleRight className="w-6 h-6 text-primary" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-muted-foreground" />
                    )}
                    <span className="text-sm">
                      {requireConfirmation ? t.confirmation.realMode : t.confirmation.simpleMode}
                    </span>
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              {password && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {t.instructions}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Educational Content */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">{t.education.title}</h2>

            <div className="space-y-4 text-sm leading-relaxed">
              <p>{t.education.importance}</p>
              <p>{t.education.memory}</p>
              <p className="font-medium text-primary">{t.education.privacy}</p>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="default"
                  className="flex items-center gap-2"
                  onClick={onSwitchToGuide}
                >
                  <Shield className="w-4 h-4" />
                  {t.education.passwordGuide}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => window.open("https://bitwarden.com/password-strength/", "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t.education.learnMore}
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => window.open("https://github.com/plusz/learnpasswords", "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t.education.sourceCode}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
