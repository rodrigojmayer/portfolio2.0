"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { useApp } from "@/lib/context"
import { translations } from "@/lib/translations"

export function Hero() {
  const { language } = useApp()
  const t = translations[language]

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-pulse opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-up opacity-0 delay-100">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">
                {t.hero.name}
              </span>
            </h1>
          </div>

          <div className="animate-fade-up opacity-0 delay-200">
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4">{t.hero.role}</p>
          </div>

          <div className="animate-fade-up opacity-0 delay-300">
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </div>

          <div className="animate-fade-up opacity-0 delay-400 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg" className="group">
              <a href="#projects">
                {t.hero.viewWork}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">{t.hero.contactMe}</a>
            </Button>
          </div>

          <div className="animate-fade-up opacity-0 delay-500 flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/rodrigojmayer" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/rodrigojmayer/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:rodrigojmayer@gmail.com.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </section>
  )
}
