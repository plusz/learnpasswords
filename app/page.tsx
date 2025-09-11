"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Languages, Shield, Star, Users } from "lucide-react"
import AdminScreen from "@/components/admin-screen"
import ChildScreen from "@/components/child-screen"
import PasswordGuide from "@/components/password-guide"

type Language = "en" | "pl"
type Screen = "home" | "admin" | "child" | "guide"

const translations = {
  en: {
    title: "Password Learning Adventure",
    subtitle: "Learn password security in a fun way!",
    adminButton: "Parent Mode",
    childButton: "Play & Learn",
    languageLabel: "Language",
    contact: "Contact",
    features: {
      secure: "Safe & Secure",
      secureDesc: "Everything stays in your browser - no passwords are sent to the internet. Security details and source code link can be found in the parent module in the 'Why Password Strength Matters' section.",
      fun: "Fun Learning",
      funDesc: "Children earn stars for each successful password entry. Parents can show the password on screen to help children learn key positions on the keyboard.",
      educational: "Educational",
      educationalDesc: "Education for both children and parents - kids learn safe habits while parents discover how to create strong passwords.",
    },
  },
  pl: {
    title: "Przygoda z Hasłami",
    subtitle: "Naucz się bezpieczeństwa haseł w zabawny sposób!",
    adminButton: "Tryb Rodzica",
    childButton: "Graj i Ucz Się",
    languageLabel: "Język",
    contact: "Kontakt",
    features: {
      secure: "Bezpieczne",
      secureDesc: "Wszystko zostaje w przeglądarce - żadne hasła nie są wysyłane do internetu. Szczegóły bezpieczeństwa i link do kodu źródłowego znajdziesz w module rodzica w sekcji 'Dlaczego Siła Hasła Ma Znaczenie'.",
      fun: "Zabawna Nauka",
      funDesc: "Dziecko otrzymuje gwiazdki za każdy sukces w wpisywaniu hasła. Rodzic może pokazać hasło na ekranie, aby łatwiej nauczyć dziecko położenia klawiszy na klawiaturze.",
      educational: "Edukacyjne",
      educationalDesc: "Edukacja zarówno dla dzieci jak i rodziców - dzieci uczą się bezpiecznych nawyków, a rodzice dowiadują się jak tworzyć silne hasła.",
    },
  },
}

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("pl")
  const [screen, setScreen] = useState<Screen>("home")
  const [password, setPassword] = useState("")
  const [childScore, setChildScore] = useState(0)

  // Check URL parameters for language on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')
    if (langParam === 'en' || langParam === 'pl') {
      setLanguage(langParam as Language)
      
      // Update metadata on initial load
      const metadata = {
        pl: {
          title: 'Przygoda z Hasłami',
          description: 'Naucz się bezpieczeństwa haseł w zabawny sposób!',
        },
        en: {
          title: 'Password Learning Adventure',
          description: 'Learn password security in a fun way!',
        }
      }
      
      document.title = metadata[langParam as Language].title
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', metadata[langParam as Language].description)
      }
      
      // Update html lang attribute
      document.documentElement.lang = langParam
    }
  }, [])

  // Update URL when language changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', newLanguage)
    window.history.replaceState({}, '', url.toString())
    
    // Update document title and meta description dynamically
    const metadata = {
      pl: {
        title: 'Przygoda z Hasłami',
        description: 'Naucz się bezpieczeństwa haseł w zabawny sposób!',
      },
      en: {
        title: 'Password Learning Adventure',
        description: 'Learn password security in a fun way!',
      }
    }
    
    document.title = metadata[newLanguage].title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata[newLanguage].description)
    }
    
    // Update html lang attribute
    document.documentElement.lang = newLanguage
  }

  const t = translations[language]

  if (screen === "admin") {
    return (
      <AdminScreen
        language={language}
        onLanguageChange={handleLanguageChange}
        onBack={() => setScreen("home")}
        onSwitchToChild={() => setScreen("child")}
        onSwitchToGuide={() => setScreen("guide")}
        password={password}
        onPasswordChange={setPassword}
      />
    )
  }

  if (screen === "child") {
    return (
      <ChildScreen
        language={language}
        onLanguageChange={handleLanguageChange}
        onBack={() => setScreen("home")}
        password={password}
        score={childScore}
        onScoreChange={setChildScore}
      />
    )
  }

  if (screen === "guide") {
    return (
      <PasswordGuide
        language={language}
        onLanguageChange={handleLanguageChange}
        onBack={() => setScreen("admin")}
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
              onClick={() => handleLanguageChange("en")}
              className="h-8 px-3"
            >
              EN
            </Button>
            <Button
              variant={language === "pl" ? "default" : "outline"}
              size="sm"
              onClick={() => handleLanguageChange("pl")}
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

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-muted-foreground">
          <p className="mb-2">© Ola i Tata 2025</p>
          <p>
            {t.contact}:{" "}
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => {
                const email = ['n', 'a', 'u', 'k', 'a', 'h', 'a', 's', 'e', 'l', '@', 'o', 'r', 'p', 'i', '.', 'p', 'l'].join('');
                window.location.href = 'mailto:' + email;
              }}
            >
              naukahasel@orpi.pl
            </span>
          </p>
        </footer>
      </div>
    </div>
  )
}
