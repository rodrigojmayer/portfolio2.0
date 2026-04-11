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
                      <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent" onClick={(e) => e.stopPropagation()}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          {t.projects.code}
                        </a>
                      </Button>
                      <Button size="sm" asChild className="flex-1" onClick={(e) => e.stopPropagation()}>
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
                        style={{ objectPosition: activeProject.imagePositionValues || 'center' }}
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
                        {t.projects.close}
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
                        <div className="col-span-2 w-full h-full flex flex-col items-center justify-center">
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
                            centeredSlides={true} // Centrar diapositiva activa
                            slidesPerView={1.7} // Cambia "auto" por un número decimal
                            grabCursor={true} // Cambiar cursor a mano al pasar
                            watchSlidesProgress={true} // Esto ayuda a que las clases de estado se actualicen bien
                            preventClicks={false}
                            preventClicksPropagation={false}
                            slideToClickedSlide={true}
                            spaceBetween={-60}
                            className="w-full !overflow-hidden py-10 relative" // Asegúrate que este nombre coincida con el CSS
                            coverflowEffect={{ // Configuración detallada del efecto
                              rotate: -100, // No rotar las diapositivas (mantenerlas planas como en imagen 2)
                              stretch: 100, 
                              depth: 260, // Profundidad de las diapositivas secundarias
                              modifier: 0.6, // Multiplicador del efecto depth para mayor diferencia de tamaño
                              slideShadows: false, // Habilitar sombras para mayor sensación de profundidad (como imagen 2)
                            }}
                            breakpoints={{
                              768: {
                                allowTouchMove: false,
                                grabCursor: false,
                              }
                            }}
                            // navigation={true}
                            navigation={{ // Configuración personalizada de navegación
                              prevEl: '.swiper-button-prev-custom',
                              nextEl: '.swiper-button-next-custom',
                            }}
                            pagination={{ 
                              el: '.swiper-pagination-custom',
                              clickable: true 
                            }}
                          >
                            {activeProject.videos?.map((video, i) => (
                              <SwiperSlide 
                                key={i} 
                                className="w-[80vw] max-w-[700px] h-full flex justify-center items-center"
                                >
                                {({ isActive }) => { // Usamos el render prop de Swiper para manejar estados
                                  const videoRef = React.useRef<HTMLVideoElement>(null)
                                  // Estado para controlar si el video terminó
                                  const [hasEnded, setHasEnded] = React.useState(false);
                                  const [showTitle, setShowTitle] = React.useState(true)
                                  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
                                  
                                  React.useEffect(() => {
                                    if(!videoRef.current) return
                                    if(isActive) {
                                      setHasEnded(false); // Resetear estado al activar
                                      videoRef.current.play()
                                      // Mostrar título al inicio
                                      setShowTitle(true)

                                      if (timeoutRef.current) clearTimeout(timeoutRef.current)

                                      timeoutRef.current = setTimeout(() => {
                                        setShowTitle(false)
                                      }, 3000)
                                    } else {
                                      videoRef.current.pause()
                                      videoRef.current.currentTime = 0 // reset to start
                                      setHasEnded(false);
                                      setShowTitle(false)
                                    }
                                    return () => {
                                      if (timeoutRef.current) clearTimeout(timeoutRef.current)
                                    }
                                  }, [isActive])
                                  
                                  const handleReplay = () => {
                                    if (videoRef.current) {
                                      setHasEnded(false);
                                      videoRef.current.currentTime = 0;
                                      videoRef.current.play();
                                    }
                                  };

                                  return(                               
                                    <div 
                                      className="w-full h-full flex items-center justify-center transition-all duration-500"
                                      style={{
                                        zIndex: isActive ? 50 : 0,
                                        position: 'relative',
                                        pointerEvents: 'auto' // Permitimos clics en este nivel
                                      }}
                                      onMouseEnter={() => {
                                        setShowTitle(true)

                                        if (timeoutRef.current) clearTimeout(timeoutRef.current)

                                        timeoutRef.current = setTimeout(() => {
                                          setShowTitle(false)
                                        }, 3000)
                                      }}
                                    > 
                                      <div 
                                        className={`
                                           w-full h-full flex items-center justify-center transition-all duration-500
                                          ${isActive 
                                            ? 'scale-100 opacity-100' 
                                            : 'scale-75 opacity-40 blur-[1px] cursor-pointer hover:scale-90'
                                        }`}
                                      >
                                        {!isActive && (
                                          <div className="absolute inset-0 z-10" />
                                        )}
                                        {/* {!isActive && (
                                          <div className="absolute inset-0 z-10 pointer-events-none" />
                                        )} */}
                                          <video
                                            ref={videoRef}
                                            src={`/${activeProject.slug}/${video.src}.webm`}
                                            // controls={isActive}
                                            controls={isActive && !hasEnded} // Ocultar controles nativos si terminó para mostrar nuestro botón
                                            playsInline
                                            muted
                                            // autoPlay={isActive}
                                            // loop
                                            onEnded={() => setHasEnded(true)}
                                            className={`
                                              carousel-video rounded-xl shadow-xl border-2 border-primary/20
                                              w-full h-full 
                                              object-contain
                                              ${!isActive ? 'pointer-events-none' : ''} // 👈 CLAVE
                                            `}
                                          >
                                          <track
                                            src={`/${activeProject.slug}/subtitles/${video.src}-${language}.vtt`}
                                            kind="subtitles"
                                            srcLang="es"
                                            label="Español"
                                            default
                                          />
                                          </video>
                                          
                                          {/* BOTÓN DE REPETIR (Solo si está activo y terminó) */}
                                          {isActive && hasEnded && (
                                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 rounded-xl transition-opacity">
                                              <button 
                                                onClick={handleReplay}
                                                className="bg-black/70 hover:bg-black/50 p-4 rounded-full backdrop-blur-md border border-white/50 transition-all transform hover:scale-110 cursor-pointer"
                                                title="Replay"
                                              >
                                                <svg 
                                                  viewBox="0 0 24 24" 
                                                  className="w-12 h-12 text-white fill-current"
                                                >
                                                  <path d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z" />
                                                </svg>
                                              </button>
                                            </div>
                                          )}

                                          {/* TEXTO SOBRE EL VIDEO */}
                                          <div className={`absolute top-2 left-2 transition-opacity duration-500
                                              ${showTitle ? "opacity-100" : "opacity-0"}
                                          `}
                                          >
                                            <p className="text-white text-sm md:text-base font-semibold bg-black/40 px-3 py-1 rounded-lg inline-block">
                                              {video.title[language as "es" | "en"]}
                                            </p>
                                          </div>
                                      </div>
                                    </div>
                                  )
                                }}
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <div className="flex items-center gap-6 mt-4">
    
                            {/* LEFT ARROW */}
                            <button className="swiper-button-prev-custom px-3 py-2 rounded-lg cursor-pointer">
                              ◀
                            </button>

                            {/* BULLETS */}
                            <div className="swiper-pagination-custom flex items-center"></div>

                            {/* RIGHT ARROW */}
                            <button className="swiper-button-next-custom px-3 py-2 rounded-lg cursor-pointer">
                              ▶
                            </button>

                          </div>


                          {/* <div className="swiper-pagination-custom mt-4 flex items-center justify-center"></div> */}
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
