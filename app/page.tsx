"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ImageSlider } from "@/components/image-slider"

const Sparkle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 10.26 24 10.27 17.18 16.70 20.27 24.97 12 19.54 3.73 24.97 6.82 16.70 0 10.27 8.91 10.26 12 2" />
  </svg>
)

export default function Home() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Jewellery Brand Owner, NYC",
      text: "JewelAI increased our product page conversions by 340%. The AI-generated photos show our jewellery from every angle beautifully.",
      image: "/professional-woman-jewelry-designer.jpg",
    },
    {
      name: "Marcus Rodriguez",
      role: "Luxury Jeweller, LA",
      text: "We used to spend $15k on professional shoots. Now we generate unlimited showcase photos for $79/month. Game changer.",
      image: "/professional-man-jewelry-maker.jpg",
    },
    {
      name: "Emily Watson",
      role: "E-commerce Manager, Chicago",
      text: "Our Instagram engagement tripled with JewelAI. Every post shows jewellery on diverse, stunning AI-generated models.",
      image: "/professional-woman-e-commerce.jpg",
    },
  ]

  const stats = [
    { label: "E-commerce Conversion Increase", value: "+340%" },
    { label: "Instagram Engagement Boost", value: "+287%" },
    { label: "Average Revenue Increase", value: "+58%" },
  ]

  const sliderImages = [
    {
      before: "/simple-gold-ring-on-white-background.jpg",
      after: "/luxury-gold-ring-on-womans-hand-professional-photo.jpg",
      alt: "Ring showcase transformation",
    },
    {
      before: "/basic-diamond-necklace-product-photo.jpg",
      after: "/luxury-diamond-necklace-on-model-professional-stud.jpg",
      alt: "Necklace transformation",
    },
    {
      before: "/simple-bracelet-on-white-background.jpg",
      after: "/luxury-bracelet-on-womans-wrist-elegant-profession.jpg",
      alt: "Bracelet transformation",
    },
  ]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20 md:py-32 bg-gradient-to-b from-background via-background to-muted">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8 mb-16">
              {/* Left side: Headline and description */}
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                  Professional jewellery shots — <span className="text-primary">on AI models</span>, instantly.
                </h1>
                <p className="text-xl md:text-2xl text-foreground/70 mb-12 text-balance leading-relaxed">
                  AI-generated product photography of your jewellery on diverse human models. Perfect for e-commerce,
                  Instagram, lookbooks & campaigns — delivered in minutes, not weeks.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <Link
                    href="/how-it-works"
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity text-center"
                  >
                    Generate Your First Photo
                  </Link>
                </div>
              </div>

              {/* Right side: Image Slider */}
              <div className="flex-1 w-full">
                <ImageSlider images={sliderImages} autoPlay={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Grid */}
        <section className="py-20 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground text-balance">
              Why Jewellery Brands Love JewelAI
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkle,
                  problem: "Professional product shoots are expensive and time-consuming",
                  solution: "Generate unlimited AI photos for $79/month on diverse models",
                },
                {
                  icon: Users,
                  problem: "Need to show jewellery on many different skin tones and body types",
                  solution: "Customize AI models by appearance, style, and setting instantly",
                },
                {
                  icon: TrendingUp,
                  problem: "Inconsistent product imagery across channels",
                  solution: "Brand-consistent, realistic, stunning jewellery photography every time",
                },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-8 bg-card rounded-2xl border border-border hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-foreground">The Challenge</h3>
                    <p className="text-foreground/70 mb-4">{item.problem}</p>
                    <div className="h-px bg-border my-4" />
                    <h3 className="font-semibold text-lg mb-2 text-primary">Our Solution</h3>
                    <p className="text-foreground/70">{item.solution}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ROI Stats */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Real Results from Jewellery Brands</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-card p-8 rounded-2xl text-center border border-border">
                  <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-20 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground">What Jewellery Brands Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-8 bg-card rounded-2xl border border-border">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-muted"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Transform Your Jewellery Photography?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Join jewellery brands and designers generating stunning AI product photos on beautiful models. No
              photoshoots, no stylists, no weeks of waiting.
            </p>
            <Link
              href="/how-it-works"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Start Generating Photos Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
