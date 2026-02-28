"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useApp } from "@/lib/context"
import { translations } from "@/lib/translations"

export function Projects() {
  const { language } = useApp()
  const t = translations[language]

  const projects = [
    {
      title: t.projects.items[0].title,
      description: t.projects.items[0].description,
      image: "/Great-stock-pro-image-show3.png",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      // tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      github: "https://github.com/rodrigojmayer/stockpro",
      demo: 'https://stockpro-deploy.onrender.com/',
    },
    {
      title: t.projects.items[1].title,
      description: t.projects.items[1].description,
      image: "/task-management-app.jpg",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "#",
      demo: "#",
    },
    {
      title: t.projects.items[2].title,
      description: t.projects.items[2].description,
      image: "/analytics-dashboard.png",
      tags: ["React", "D3.js", "Express", "AWS"],
      github: "#",
      demo: "#",
    },
    {
      title: t.projects.items[3].title,
      description: t.projects.items[3].description,
      image: "/social-media-app-feed.jpg",
      tags: ["Next.js", "Supabase", "Tailwind", "Vercel"],
      github: "#",
      demo: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">{t.projects.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.projects.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card group"
              >
                <div className="relative overflow-hidden aspect-video bg-muted">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        {t.projects.code}
                      </a>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t.projects.demo}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
