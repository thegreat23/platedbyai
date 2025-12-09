"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const Mail = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const AlertCircle = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

const Upload = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const Sparkles = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l2.5 7h7.5l-6 4.5 2.5 7-6-4.5-6 4.5 2.5-7h7.5z" />
  </svg>
)

const CheckCircle = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="16 12 12 8 8 12" />
  </svg>
)

const Send = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    usage: "",
    specifics: "",
    email: "",
    phone: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [emailError, setEmailError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const steps = [
    {
      title: "Upload",
      icon: Upload,
      description: "Share your dish",
    },
    {
      title: "Reimagine",
      icon: Sparkles,
      description: "Describe the vision",
    },
    {
      title: "Approve",
      icon: CheckCircle,
      description: "Confirm details",
    },
    {
      title: "Deliver",
      icon: Send,
      description: "Get your visuals",
    },
  ]

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (validTypes.includes(file.type)) {
        setUploadedFile(file)
        setActiveStep(1)
      } else {
        alert("Please upload a JPEG, JPG, or PNG file.")
      }
    }
  }

  const handleNext = () => {
    if (activeStep === 0 && !uploadedFile) {
      alert("Please upload an image first.")
      return
    }
    if (activeStep < 3) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    setFormData({ ...formData, email })
    setEmailError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.")
      return
    }

    console.log("[v0] Starting form submission...")
    console.log("[v0] Form data:", {
      email: formData.email,
      phone: formData.phone,
      usage: formData.usage,
      specifics: formData.specifics,
      file: uploadedFile?.name,
    })

    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
    const originalText = submitButton?.innerHTML
    if (submitButton) {
      submitButton.disabled = true
      submitButton.innerHTML = "Sending..."
    }

    // Create FormData for file upload
    const data = new FormData()
    if (uploadedFile) {
      data.append("file", uploadedFile)
    }
    data.append("email", formData.email)
    data.append("phone", formData.phone)
    data.append("usage", formData.usage)
    data.append("specifics", formData.specifics)

    try {
      console.log("[v0] Sending POST request to /api/submit-form...")
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: data,
      })

      console.log("[v0] Response status:", response.status)
      const responseData = await response.json()
      console.log("[v0] Response data:", responseData)

      if (response.ok) {
        console.log("[v0] Form submitted successfully!")
        setSubmitted(true)
        setActiveStep(3) // Ensure we stay on step 3 to show success message
      } else {
        console.error("[v0] Error response:", responseData)
        alert("Something went wrong. Please try again.")
        if (submitButton && originalText) {
          submitButton.disabled = false
          submitButton.innerHTML = originalText
        }
      }
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      alert("Error submitting form. Please try again.")
      if (submitButton && originalText) {
        submitButton.disabled = false
        submitButton.innerHTML = originalText
      }
    }
  }

  const faqItems = [
    {
      question: "How long does it take to receive my visuals?",
      answer:
        "We deliver your AI-generated visuals within 24 hours of approval. Most clients receive them even faster.",
    },
    {
      question: "Can I request multiple images?",
      answer: "Yes! With our Starter plan, you get 5 images per month. Growth and Pro plans offer unlimited images.",
    },
    {
      question: "What if I don't like the first result?",
      answer: "We offer unlimited revisions with your subscription. Just let us know what to adjust.",
    },
    {
      question: "Do I own the rights to the images?",
      answer: "Absolutely. You own all commercial rights to every image we create for you.",
    },
    {
      question: "Can I use these for multiple platforms?",
      answer: "Yes! Use them on Instagram, your menu, delivery apps, your website, print materials — everywhere.",
    },
    {
      question: "Is there a contract or commitment?",
      answer: "Nope. Cancel anytime. No hidden fees, no long-term commitment.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-muted to-background">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">How It Works</h1>
            <p className="text-xl text-foreground/70">Four simple steps to transform your Jewellery colection </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Step Navigation */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 mb-12">
              {steps.map((step, idx) => {
                const StepIcon = step.icon
                const isActive = idx === activeStep
                const isCompleted = idx < activeStep

                return (
                  <button
                    key={idx}
                    onClick={() => idx <= activeStep && setActiveStep(idx)}
                    disabled={idx > activeStep}
                    className={`p-4 rounded-xl transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : isCompleted
                          ? "bg-accent text-accent-foreground cursor-pointer"
                          : "bg-muted text-foreground/40 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <StepIcon size={24} />
                      <span className="text-sm font-semibold hidden sm:inline">{step.title}</span>
                      <span className="text-xs sm:hidden">{idx + 1}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Step Content */}
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
              {/* Step 0: Upload */}
              {activeStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Upload Your Image</h2>
                    <p className="text-foreground/70">Share a photo of your dish or restaurant</p>
                  </div>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:bg-muted transition-colors"
                  >
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">
                      {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-foreground/60">PNG, JPG or JPEG (max 10MB)</p>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      disabled={!uploadedFile}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1: Reimagine */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Reimagine Your Image</h2>
                    <p className="text-foreground/70">Tell us about your vision</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-foreground mb-2">Where will this image be used?</label>
                      <textarea
                        value={formData.usage}
                        onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                        placeholder="e.g., Instagram feed, menu, delivery app listing..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-foreground mb-2">
                        Any specifics to be addressed in the shot?
                      </label>
                      <textarea
                        value={formData.specifics}
                        onChange={(e) => setFormData({ ...formData, specifics: e.target.value })}
                        placeholder="e.g., Professional lighting, showcase plating, warm tones..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handlePrev}
                      className="px-8 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Approve */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Confirm Your Details</h2>
                    <p className="text-foreground/70">We'll email you your free sample within 24 hours</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {emailError && (
                        <div className="flex items-center gap-2 mt-2 text-destructive">
                          <AlertCircle size={16} />
                          <span className="text-sm">{emailError}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-foreground mb-2">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={handlePrev}
                      className="px-8 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Deliver */}
              {activeStep === 3 && !submitted && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Almost There!</h2>
                    <p className="text-foreground/70">Submit and we'll get started on your visuals</p>
                  </div>

                  <div className="bg-muted p-6 rounded-lg space-y-3">
                    <h3 className="font-semibold text-foreground">Review Your Information:</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-foreground/60">File:</span>{" "}
                        <span className="text-foreground">{uploadedFile?.name}</span>
                      </p>
                      <p>
                        <span className="text-foreground/60">Email:</span>{" "}
                        <span className="text-foreground">{formData.email}</span>
                      </p>
                      {formData.phone && (
                        <p>
                          <span className="text-foreground/60">Phone:</span>{" "}
                          <span className="text-foreground">{formData.phone}</span>
                        </p>
                      )}
                      {formData.usage && (
                        <p>
                          <span className="text-foreground/60">Usage:</span>{" "}
                          <span className="text-foreground">{formData.usage}</span>
                        </p>
                      )}
                      {formData.specifics && (
                        <p>
                          <span className="text-foreground/60">Specifics:</span>{" "}
                          <span className="text-foreground">{formData.specifics}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-8 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                      >
                        <Send size={18} />
                        Submit Request
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Success State */}
              {submitted && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-accent-foreground" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Request Submitted!</h2>
                    <p className="text-foreground/70 mb-4">
                      Your AI visual is cooking. Check your email in 24 hours for your free sample.
                    </p>
                    <p className="text-sm text-foreground/60 mb-6">
                      We'll also send you a link to view your complete order and next steps.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-4 bg-muted rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">Confirmation sent to {formData.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <details key={idx} className="bg-card rounded-lg border border-border overflow-hidden group">
                  <summary className="p-6 cursor-pointer font-semibold text-foreground hover:bg-muted transition-colors flex items-center justify-between">
                    {item.question}
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-foreground/70 border-t border-border">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
