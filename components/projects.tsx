"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useApp } from "@/lib/context"
import { translations } from "@/lib/translations"
import { projects } from "@/lib/projects"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

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
          <LayoutGroup>
            <motion.div 
              layout 
              transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
              className="grid md:grid-cols-2 gap-6"
            >
              {translatedProjects.map((project, index) => (
                // <Card
                //   key={index}
                //   className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card group"
                // >
                <MotionCard
                  layoutId={`project-card-${project.slug}`}
                  key={index}
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
                    initial={false}
                    className="
                      absolute inset-6
                      bg-card
                      rounded-2xl
                      overflow-auto
                    "
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* HEADER IMAGE */}
                    <div className="relative h-[15vh]">
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
                          cursor-pointer
                          hover:bg-black/90 
                          active:bg-black/10

                        "
                      >
                        Close
                      </button>
                    </div>

                    {/* CONTENT */}
                    <div className="w-[93vw] h-[75vh] mx-auto flex flex-col">
                      {/* TITLE */}
                      <h2 className="text-3xl font-bold text-center mb-8">
                        {activeProject.title}
                      </h2>
                      {/* CONTENT */}
                      <div className="grid grid-cols-3 gap-10 flex-1 items-center">
                        {/* LEFT SIDE */}
                        <div className="col-span-1 flex flex-col justify-center">
                          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                            {activeProject.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {activeProject.tags.map((tag, i) => (
                              <Badge key={i}>{tag}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="col-span-2 w-full h-full flex items-center">
                          {/* <video
                            // src="/StockPro/01-Main-page.webm"
                            src={activeProject.video}
                            controls
                            playsInline
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-contain rounded-xl shadow-lg"
                          /> */}
                          {/* <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            centeredSlides
                            slidesPerView={1.8}
                            spaceBetween={30}
                            // className="w-full"
                            className="project-swiper"
                          > */}
                            <Swiper
                            modules={[Navigation, Pagination, EffectCoverflow]} // Agregar EffectCoverflow
                            effect="coverflow" // Habilitar el efecto
                            grabCursor={true} // Cambiar cursor a mano al pasar
                            centeredSlides={true} // Centrar diapositiva activa
                            watchSlidesProgress={true} // Esto ayuda a que las clases de estado se actualicen bien
                            preventClicks={false}
                            preventClicksPropagation={false}
                            className="w-full !overflow-hidden py-10" // Asegúrate que este nombre coincida con el CSS
                            slidesPerView={1.7} // Cambia "auto" por un número decimal
                            coverflowEffect={{ // Configuración detallada del efecto
                              rotate: -100, // No rotar las diapositivas (mantenerlas planas como en imagen 2)
                              stretch: 100, 
                              depth: 260, // Profundidad de las diapositivas secundarias
                              modifier: 0.5, // Multiplicador del efecto depth para mayor diferencia de tamaño
                              slideShadows: false, // Habilitar sombras para mayor sensación de profundidad (como imagen 2)
                            }}
                            navigation={{ // Configuración personalizada de navegación
                              prevEl: '.swiper-button-prev-custom',
                              nextEl: '.swiper-button-next-custom',
                            }}
                            pagination={{ clickable: true }}
                            // className="w-full"
                          // className="project-swiper pt-10 pb-12 " // Agregar padding para no cortar sombras
                          >
                            {activeProject.videos?.map((video, i) => (
                              <SwiperSlide key={i} className="w-[80vw] max-w-[700px] flex justify-center items-center">
                                {({ isActive }) => ( // Usamos el render prop de Swiper para manejar estados
                              <div className={`transition-all duration-500 ${isActive ? 'scale-110 opacity-100' : 'scale-75 opacity-40 blur-[1px]'}`}>
                                <video
                                  src={video}
                                  controls
                                  playsInline
                                  muted
                                  autoPlay={isActive}
            loop
            // className="w-full rounded-2xl shadow-2xl bg-black aspect-video object-contain"
            // style={{ pointerEvents: isActive ? 'auto' : 'none' }}
className="carousel-video rounded-xl shadow-xl border-2 border-primary/20"
                                  // className="w-full rounded-xl shadow-lg"
                                />
                                </div>
      )}
                              </SwiperSlide>
                            ))}
                            <div className="prev-arrow-custom" 
                            // "swiper-button-prev swiper-button-prev-custom text-primary font-bold"
                            ></div>
                            <div className="next-arrow-custom"
                            // "swiper-button-next swiper-button-next-custom text-primary font-bold"
                            ></div>
                          </Swiper>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </section>
  )
}
