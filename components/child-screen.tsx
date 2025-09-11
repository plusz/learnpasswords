"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Eye, EyeOff, Languages, Star, Trophy, Sparkles } from "lucide-react"

type Language = "en" | "pl"

interface ChildScreenProps {
  language: Language
  onLanguageChange: (lang: Language) => void
  onBack: () => void
  password: string
  score: number
  onScoreChange: (score: number) => void
}

const translations = {
  en: {
    title: "Password Practice",
    subtitle: "Type your password to earn stars!",
    passwordLabel: "Enter your password",
    passwordPlaceholder: "Type your password here...",
    showPassword: "Show password",
    hidePassword: "Hide password",
    tryAgain: "Try again! You can do it! 🌟",
    success: "Amazing! You got it right! ⭐",
    score: "Stars earned",
    level: "Level",
    encouragement: [
      "You're doing great! 🌟",
      "Keep practicing! 💪",
      "Almost there! 🎯",
      "You're a password star! ⭐",
      "Fantastic job! 🎉",
    ],
    tooLong: "Maybe try from the beginning and ask your parent for help? 🤔",
    levelNames: ["Beginner", "Explorer", "Guardian", "Champion", "Master"],
  },
  pl: {
    title: "Ćwiczenie Haseł",
    subtitle: "Wpisz swoje hasło, aby zdobyć gwiazdki!",
    passwordLabel: "Wprowadź swoje hasło",
    passwordPlaceholder: "Wpisz tutaj swoje hasło...",
    showPassword: "Pokaż hasło",
    hidePassword: "Ukryj hasło",
    tryAgain: "Spróbuj ponownie! Dasz radę! 🌟",
    success: "Niesamowite! Udało ci się! ⭐",
    score: "Zdobyte gwiazdki",
    level: "Poziom",
    encouragement: [
      "Świetnie ci idzie! 🌟",
      "Ćwicz dalej! 💪",
      "Prawie tam! 🎯",
      "Jesteś gwiazdą haseł! ⭐",
      "Fantastyczna robota! 🎉",
    ],
    tooLong: "Może spróbuj od początku i poproś rodzica o pomoc? 🤔",
    levelNames: ["Początkujący", "Odkrywca", "Strażnik", "Mistrz", "Ekspert"],
  },
}

export default function ChildScreen({
  language,
  onLanguageChange,
  onBack,
  password,
  score,
  onScoreChange,
}: ChildScreenProps) {
  const [inputPassword, setInputPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const t = translations[language]

  const currentLevel = Math.floor(score / 5)
  const levelName = t.levelNames[Math.min(currentLevel, t.levelNames.length - 1)]
  const starsInLevel = score % 5

  // Auto-focus input on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (inputPassword && inputPassword === password) {
      setIsSuccess(true)
      setFeedback(t.success)
      setShowCelebration(true)
      onScoreChange(score + 1)
      setInputPassword("")

      // Play success sound (if available)
      try {
        const audio = new Audio("/success-sound.mp3")
        audio.play().catch(() => {}) // Ignore if sound fails
      } catch (e) {}

      setTimeout(() => {
        setShowCelebration(false)
        setIsSuccess(false)
        setFeedback("")
      }, 3000)
    } else if (inputPassword && inputPassword !== password && inputPassword.length >= password.length) {
      setIsSuccess(false)
      
      // If user typed more characters than password length, show special message
      if (inputPassword.length > password.length) {
        setFeedback(t.tooLong)
      } else {
        setFeedback(t.tryAgain)
      }
      
      setAttempts((prev) => prev + 1)

      setTimeout(() => {
        setFeedback("")
      }, 3000)
    }
  }, [inputPassword, password, t.success, t.tryAgain, score, onScoreChange])

  if (!password) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 p-4 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            {language === "en" ? "No Password Set" : "Brak Hasła"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === "en" ? "Ask a parent to set up your password first!" : "Poproś rodzica o ustawienie hasła!"}
          </p>
          <Button onClick={onBack}>{language === "en" ? "Go Back" : "Wróć"}</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back" : "Wróć"}
          </Button>

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

        {/* Score Display */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-primary mb-2">
                {t.score}: {score}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.level}: {levelName}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < starsInLevel ? "text-accent fill-accent animate-star-twinkle" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Main Game Area */}
        <Card className="p-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-10 h-10" />
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Password Input */}
          <div className="max-w-md mx-auto mb-8">
            <label className="block text-lg font-medium mb-4 text-left">{t.passwordLabel}</label>
            <div className="relative">
              <Input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="text-2xl h-16 pr-16 text-center placeholder:text-gray-400 placeholder:font-light caret-primary"
                autoFocus
                style={{
                  caretColor: 'hsl(var(--primary))',
                  fontSize: '1.5rem',
                  fontWeight: '500'
                }}
                autoComplete="off"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-muted-foreground mt-2 hover:text-primary transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              {showPassword ? t.hidePassword : t.showPassword}
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                isSuccess
                  ? "bg-primary/20 text-primary border-2 border-primary/40"
                  : "bg-orange-100 text-orange-800 border-2 border-orange-300"
              }`}
            >
              <p className="text-lg font-bold">{feedback}</p>
            </div>
          )}

          {/* Celebration Animation */}
          {showCelebration && (
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
              <div className="animate-bounce-in">
                <Sparkles className="w-32 h-32 text-accent animate-celebration" />
              </div>
            </div>
          )}

          {/* Encouragement */}
          {attempts > 0 && !isSuccess && (
            <div className="mt-6 p-4 bg-blue-100 rounded-lg border-2 border-blue-300">
              <p className="text-blue-800 font-semibold text-lg">{t.encouragement[attempts % t.encouragement.length]}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
