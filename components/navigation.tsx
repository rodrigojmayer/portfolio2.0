"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { useApp } from "@/lib/context"
import { translations } from "@/lib/translations"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, theme, toggleTheme } = useApp()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            RJM
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="w-[480px]">
            <div className="grid grid-cols-5 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  // className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  className="
                    flex
                    items-center
                    justify-center
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-muted-foreground
                    hover:text-foreground
                    transition-colors
                    whitespace-nowrap
                  "
                >
                  {link.label}
                </a>
              ))}
            </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2  cursor-pointer">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost"  onClick={() => setLanguage(language === "en" ? "es" : "en")}>
              <Globe className="h-5 w-5" />
              <span className="ml-1 text-xs font-semibold">{language.toUpperCase()}</span>
            </Button>
            <Button asChild size="sm" className="ml-2">
              <a href="#contact">{t.nav.getInTouch}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={toggleTheme} className="flex-1 bg-transparent">
                {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {theme === "dark" ? "Light" : "Dark"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="flex-1"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "Español" : "English"}
              </Button>
            </div>
            <Button asChild size="sm" className="w-full">
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                {t.nav.getInTouch}
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
