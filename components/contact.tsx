"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"
import { useApp } from "@/lib/context"
import { translations } from "@/lib/translations"

export function Contact() {
  const { language } = useApp()
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // 1. Creamos el objeto FormData
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message); // Asegurate que coincida con lo que esperas recibir

    try {
      const res = await fetch("https://formsubmit.co/ajax/rodrigojmayer@gmail.com", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Limpiamos el formulario
      } else {
        throw new Error("Error al enviar");
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setLoading(false);
      // Opcional: Ocultar el mensaje de exito despues de unos segundos
      if (status === 'success') {
        setTimeout(() => setStatus(null), 3000);
      }
    }
    // console.log("[v0] Form submitted:", formData)
    // Handle form submission
  }

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.info.email,
      value: "rodrigojmayer@gmail.com",
      href: "mailto:rodrigojmayer@gmail.com",
    },
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: "+54 (341) 2612-996",
      href: "tel:+152612996",
    },
    {
      icon: MapPin,
      label: t.contact.info.location,
      value: "Rosario, Santa Fe",
      href: "#",
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">{t.contact.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.contact.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <info.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-1">{info.label}</h3>
                <a href={info.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {info.value}
                </a>
              </Card>
            ))}
          </div>

          <Card className="p-8 md:p-12 border-border bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.form.name}</Label>
                  <Input
                    id="name"
                    placeholder={t.contact.form.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.form.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.form.message}</Label>
                <Textarea
                  id="message"
                  placeholder={t.contact.form.messagePlaceholder}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="w-full md:w-auto cursor-pointer">
                {loading ? "Enviando..." : t.contact.form.send}
              </Button>
              {status === 'success' && (
                <p className="text-green-500">¡Gracias por tu mensaje!</p>
              )}
              {status === 'error' && (
                <p className="text-red-500">Ocurrió un error. Intenta de nuevo.</p>
              )}
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
