"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImageSlider } from "@/components/image-slider"
import { useState } from "react"

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export default function About() {
  const [formState, setFormState] = useState({
    name: "",
    restaurant: "",
    city: "",
    message: "",
  })

  const sliderImages = [
    {
      before: "/basic-salad-plate.jpg",
      after: "/professional-gourmet-salad-dish-michelin-star-phot.jpg",
      alt: "Salad transformation",
    },
    {
      before: "/simple-dessert.jpg",
      after: "/professional-gourmet-dessert-plating-photography.jpg",
      alt: "Dessert transformation",
    },
    {
      before: "/basic-pizza.jpg",
      after: "/professional-gourmet-pizza-studio-photography.jpg",
      alt: "Pizza transformation",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      if (response.ok) {
        alert("Thank you! We'll be in touch soon.")
        setFormState({ name: "", restaurant: "", city: "", message: "" })
      } else {
        alert("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-muted to-background">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">About PlatedbyAI </h1>
            <p className="text-xl text-foreground/70">We&#39;re a design studio built for Jewellers — not marketers</p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-4">Bridging the Visualization Gap </h2>
                <p className="text-lg text-foreground/70 leading-relaxed mb-4">
                  {
                    "At PlatedbyAi, We believe that jewellery is more than just metal and stone—it is an expression of identity. Yet, for too long, the online jewellery buying experience has been disconnected from reality. A pair of earrings on a white background is a product; those same earrings on a person are a story"
                  }
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {
                    "We realized that traditional e-commerce photography leaves too much to the imagination. Customers struggle to gauge size, drop, and fit, leading to hesitation and returns. Traditional model photoshoots are expensive and logistically complex to adapt to every new collection."
                  }
                </p>
              </div>

              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  To bridge the gap between imagination and reality by using AI to transform static jewelry images into diverse, lifelike experiences that represent every customer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Gallery</h2>
            <ImageSlider images={sliderImages} autoPlay={true} />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Get in Touch</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold text-foreground mb-2">Name</label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-foreground mb-2">Store Name/Website</label>
                    <input
                      type="text"
                      value={formState.restaurant}
                      onChange={(e) => setFormState({ ...formState, restaurant: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Restaurant name"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-foreground mb-2">City</label>
                    <input
                      type="text"
                      value={formState.city}
                      onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your city"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-foreground mb-2">Message</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your message"
                      rows={4}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Contact Info</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">Email</p>
                        <a href="mailto:hello@platedbyai.com" className="text-primary hover:underline">
                          hello@platedbyai.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent rounded-xl p-6">
                  <p className="text-foreground/70">
                    <span className="font-semibold text-foreground">Response Time:</span> We typically respond within 24
                    hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
