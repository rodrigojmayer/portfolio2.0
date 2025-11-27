"use client"

import { Card } from "@/components/ui/card"
import { Code2, Rocket, Users } from "lucide-react"
import { useApp } from "@/lib/context"
import { translations } from "@/lib/translations"

export function About() {
  const { language } = useApp()
  const t = translations[language]

  const features = [
    {
      icon: Code2,
      title: t.about.features.cleanCode.title,
      description: t.about.features.cleanCode.description,
    },
    {
      icon: Rocket,
      title: t.about.features.fastDelivery.title,
      description: t.about.features.fastDelivery.description,
    },
    {
      icon: Users,
      title: t.about.features.collaborative.title,
      description: t.about.features.collaborative.description,
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">{t.about.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.about.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/20 border-border">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">{t.about.bio1}</p>
              <p className="text-lg leading-relaxed">{t.about.bio2}</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
