"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useApp } from "@/lib/context"
import { translations } from "@/lib/translations"
import { projects } from "@/lib/projects"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"


export function Projects() {
  const { language } = useApp()
  const t = translations[language]
  const translatedProjects = projects.map((project, index) => ({
      ...project,
      title: t.projects.items[index].title,
      description: t.projects.items[index].description,
    }))
    const [activeProject, setActiveProject] = useState<
      null | typeof translatedProjects[number]
    >(null)
    useEffect(() => {
      if (activeProject) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = "auto"
      }

      return () => {
        document.body.style.overflow = "auto"
      }
    }, [activeProject])

    const MotionCard = motion(Card)

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">{t.projects.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.projects.subtitle}</p>
          </div>

          {/* <div className="grid md:grid-cols-2 gap-6"> */}
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            {translatedProjects.map((project, index) => (
              // <Card
              //   key={index}
              //   className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card group"
              // >
              <MotionCard
                layoutId={`project-card-${project.slug}`}
                key={project.slug}
                onClick={() => setActiveProject(project)}
                className="cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card group"
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
              {/* </Card> */}
              </MotionCard>
            ))}
          {/* </div> */}
          </motion.div>

          <AnimatePresence>
  {activeProject && (
    <motion.div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveProject(null)}
    >
      <motion.div
        layoutId={`project-card-${activeProject.slug}`}
        className="
          absolute inset-6
          bg-card
          rounded-2xl
          overflow-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER IMAGE */}
        <div className="relative h-[40vh]">
          <img
            src={activeProject.image}
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => setActiveProject(null)}
            className="
              absolute top-4 right-4
              bg-black/50 text-white
              px-4 py-2 rounded-lg
            "
          >
            Close
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            {activeProject.title}
          </h2>

          <p className="text-muted-foreground mb-6">
            {activeProject.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {activeProject.tags.map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


        </div>
      </div>
    </section>
  )
}
