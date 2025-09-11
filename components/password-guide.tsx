"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Shield, Key, Users, CheckCircle, AlertTriangle, Languages } from "lucide-react"

type Language = "en" | "pl"

interface PasswordGuideProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onBack: () => void
}

const translations = {
  pl: {
    title: "Poradnik: Jak Ustawić Dobre Hasło dla Dziecka",
    subtitle: "Praktyczne wskazówki dla rodziców",
    sections: {
      basics: {
        title: "Podstawowe Zasady Silnego Hasła",
        rules: [
          "Minimum 8 znaków (lepiej 12 lub więcej)",
          "Małe i duże litery (a-z, A-Z)",
          "Cyfry (0-9)",
          "Znaki specjalne (!@#$%^&*)",
          "Unikaj słów ze słownika"
        ]
      },
      phrases: {
        title: "Najlepsza Metoda: Dwa Słowa + Cyfry",
        description: "Wybierz dwa słowa które kojarzą się dziecku z jakimś wydarzeniem, np. ulubionym zwierzęciem i imieniem. Połącz je cyframi zamiast spacji.",
        examples: [
          "Lew21Kuba",
          "Mysz396Patrycja", 
          "Słoń!88!Ania",
          "Kot123Tomek"
        ],
        tips: [
          "Wybierz ulubione zwierzę dziecka + jego imię",
          "Zamiast spacji użyj cyfr (np. wiek, ulubiona liczba)",
          "Pierwsza litera imienia niech będzie duża",
          "Możesz dodać znak specjalny na początku lub końcu",
          "Przykład: zwierzę + cyfry + Imię = Lew21Kuba"
        ]
      },
      managers: {
        title: "Managery Haseł vs Dzieci",
        description: "Dla dorosłych najlepszym rozwiązaniem są managery haseł i unikalne hasła dla każdego serwisu. Jednak dzieci potrzebują prostszego podejścia:",
        childNeeds: [
          "Logowanie do Teams na lekcjach",
          "Dostęp do komputera w szkole",
          "Korzystanie z platform edukacyjnych",
          "Łatwe zapamiętanie bez zapisywania"
        ],
        recommendation: "Dla dzieci lepiej jest mieć jedno silne hasło, które łatwo zapamiętają, niż słabe hasła które będą zapisywać na kartce."
      },
      examples: {
        title: "Przykłady Dobrych Haseł dla Dzieci",
        good: [
          "MamNajlepsząMamę123!",
          "KochamCzytaćKsiążki7",
          "ZielonyDinosaurJestSuper!",
          "PiłkaNożnaToMojaPasja9"
        ],
        bad: [
          "hasło123",
          "qwerty",
          "123456789",
          "password"
        ]
      },
      tips: {
        title: "Dodatkowe Wskazówki",
        list: [
          "Ćwicz z dzieckiem wpisywanie hasła",
          "Nie zapisuj hasła w widocznym miejscu",
          "Zmień hasło jeśli podejrzewasz, że ktoś je zna",
          "Naucz dziecko, żeby nie dzieliło się hasłem z kolegami",
          "Regularnie przypominaj o zasadach bezpieczeństwa"
        ]
      }
    }
  },
  en: {
    title: "Guide: How to Set a Good Password for Your Child",
    subtitle: "Practical tips for parents",
    sections: {
      basics: {
        title: "Basic Rules for Strong Passwords",
        rules: [
          "Minimum 8 characters (better 12 or more)",
          "Lowercase and uppercase letters (a-z, A-Z)",
          "Numbers (0-9)",
          "Special characters (!@#$%^&*)",
          "Avoid dictionary words"
        ]
      },
      phrases: {
        title: "Best Method: Two Words + Numbers",
        description: "Choose two words that the child associates with some event, like a favorite animal and their name. Connect them with numbers instead of spaces.",
        examples: [
          "Lion21Kuba",
          "Mouse396Patricia", 
          "Elephant!88!Anna",
          "Cat123Tommy"
        ],
        tips: [
          "Choose child's favorite animal + their name",
          "Use numbers instead of spaces (age, favorite number)",
          "Make the first letter of the name uppercase",
          "You can add a special character at the beginning or end",
          "Example: animal + numbers + Name = Lion21Kuba"
        ]
      },
      managers: {
        title: "Password Managers vs Children",
        description: "For adults, password managers and unique passwords for each service are the best solution. However, children need a simpler approach:",
        childNeeds: [
          "Logging into Teams during lessons",
          "Access to school computers",
          "Using educational platforms",
          "Easy memorization without writing down"
        ],
        recommendation: "For children, it's better to have one strong password they can easily remember than weak passwords they'll write on paper."
      },
      examples: {
        title: "Examples of Good Passwords for Children",
        good: [
          "IHaveTheBestMom123!",
          "ILoveReadingBooks7",
          "GreenDinosaurIsSuper!",
          "SoccerIsMyPassion9"
        ],
        bad: [
          "password123",
          "qwerty",
          "123456789",
          "password"
        ]
      },
      tips: {
        title: "Additional Tips",
        list: [
          "Practice typing the password with your child",
          "Don't write the password in a visible place",
          "Change the password if you suspect someone knows it",
          "Teach your child not to share the password with friends",
          "Regularly remind about security rules"
        ]
      }
    }
  }
}

export default function PasswordGuide({ language, onLanguageChange, onBack }: PasswordGuideProps) {
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              {language === "pl" ? "Wróć" : "Back"}
            </Button>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <Key className="w-8 h-8" />
              {t.title}
            </h1>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
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
        </div>

        <p className="text-xl text-muted-foreground mb-8 text-center">{t.subtitle}</p>

        <div className="space-y-6">
          {/* Basic Rules */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
              <Shield className="w-6 h-6" />
              {t.sections.basics.title}
            </h2>
            <ul className="space-y-2">
              {t.sections.basics.rules.map((rule, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Phrases Method */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
              <Key className="w-6 h-6" />
              {t.sections.phrases.title}
            </h2>
            <p className="mb-4 text-muted-foreground">{t.sections.phrases.description}</p>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">{language === "pl" ? "Przykłady:" : "Examples:"}</h3>
              <div className="grid md:grid-cols-2 gap-2">
                {t.sections.phrases.examples.map((example, index) => (
                  <div key={index} className="bg-primary/10 p-3 rounded-lg font-mono text-center">
                    {example}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">{language === "pl" ? "Wskazówki:" : "Tips:"}</h3>
              <ul className="space-y-1">
                {t.sections.phrases.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Password Managers vs Children */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
              <Users className="w-6 h-6" />
              {t.sections.managers.title}
            </h2>
            <p className="mb-4 text-muted-foreground">{t.sections.managers.description}</p>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">{language === "pl" ? "Dzieci potrzebują:" : "Children need:"}</h3>
              <ul className="space-y-1">
                {t.sections.managers.childNeeds.map((need, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-sm">{need}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg border-l-4 border-accent">
              <p className="font-medium">{t.sections.managers.recommendation}</p>
            </div>
          </Card>

          {/* Examples */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">{t.sections.examples.title}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-primary flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {language === "pl" ? "Dobre hasła:" : "Good passwords:"}
                </h3>
                <div className="space-y-2">
                  {t.sections.examples.good.map((password, index) => (
                    <div key={index} className="bg-primary/10 p-2 rounded font-mono text-sm">
                      {password}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {language === "pl" ? "Złe hasła:" : "Bad passwords:"}
                </h3>
                <div className="space-y-2">
                  {t.sections.examples.bad.map((password, index) => (
                    <div key={index} className="bg-destructive/10 p-2 rounded font-mono text-sm line-through">
                      {password}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Tips */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">{t.sections.tips.title}</h2>
            <ul className="space-y-3">
              {t.sections.tips.list.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
