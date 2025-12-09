"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const Check = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const X = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for new restaurants",
      features: [
        { name: "5 AI visuals per month", included: true },
        { name: "Unlimited revisions", included: true },
        { name: "Email support", included: true },
        { name: "24-hour delivery", included: true },
        { name: "Commercial rights", included: true },
        { name: "Priority support", included: false },
        { name: "Custom brand guidelines", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      cta: "Get Started",
    },
    {
      name: "Growth",
      price: 99,
      description: "For growing restaurants",
      features: [
        { name: "20 AI visuals per month", included: true },
        { name: "Unlimited revisions", included: true },
        { name: "Priority email support", included: true },
        { name: "24-hour delivery", included: true },
        { name: "Commercial rights", included: true },
        { name: "Priority support", included: true },
        { name: "Custom brand guidelines", included: true },
        { name: "Dedicated account manager", included: false },
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Pro",
      price: 249,
      description: "For restaurant groups",
      features: [
        { name: "Unlimited AI visuals", included: true },
        { name: "Unlimited revisions", included: true },
        { name: "24/7 phone & email support", included: true },
        { name: "Same-day delivery", included: true },
        { name: "Commercial rights", included: true },
        { name: "Priority support", included: true },
        { name: "Custom brand guidelines", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      cta: "Get Started",
    },
  ]

  const comparisonData = [
    {
      aspect: "Professional Photoshoot",
      acquismart: "Les than $5/ visual",
      traditional: "$1,000-2,000",
    },
    {
      aspect: "Setup Time",
      acquismart: "5 minutes",
      traditional: "2-4 weeks",
    },
    {
      aspect: "Styling & Prep",
      acquismart: "Included",
      traditional: "+ $1000-2,000",
    },
    {
      aspect: "Rush Delivery",
      acquismart: "24-48 hours",
      traditional: "Not available",
    },
    {
      aspect: "Cost Savings",
      acquismart: "95%",
      traditional: "Baseline",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-b from-muted to-background">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-foreground/70">
              From startups to enterprise Jewellers — we have a plan for everyone
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground border-primary shadow-2xl md:scale-105"
                      : "bg-card text-foreground border-border hover:shadow-lg"
                  }`}
                >
                  <div className="p-8">
                    {/* Header */}
                    <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "" : ""}`}>{plan.name}</h3>
                    <p
                      className={`text-sm mb-6 ${plan.highlighted ? "text-primary-foreground/70" : "text-foreground/70"}`}
                    >
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span
                        className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-foreground/70"}`}
                      >
                        /month
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/how-it-works"
                      className={`block w-full text-center py-3 rounded-lg font-semibold mb-8 transition-opacity hover:opacity-90 ${
                        plan.highlighted ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {plan.cta}
                    </Link>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check
                              className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`}
                            />
                          ) : (
                            <X
                              className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? "text-primary-foreground/30" : "text-foreground/30"}`}
                            />
                          )}
                          <span
                            className={
                              feature.included
                                ? ""
                                : plan.highlighted
                                  ? "text-primary-foreground/50"
                                  : "text-foreground/50"
                            }
                          >
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ROI Callout */}
            <div className="bg-accent/10 border border-accent rounded-2xl p-12 text-center mb-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">Your ROI is Guaranteed</h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
                On average, our clients see a <span className="font-bold text-accent">42% increase in revenue</span>{" "}
                within 3 months of using AcquiSmart. That's a 14x return on your investment.
              </p>
              <Link
                href="/how-it-works"
                className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Start with a Free AI Visual
              </Link>
            </div>

            {/* Comparison Table */}
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
                PlatedbyAi vs. Traditional Photography
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Aspect</th>
                      <th className="text-left py-4 px-6 font-semibold text-primary">{"PlatedAI"}</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground/60">Traditional Photography</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted">
                        <td className="py-4 px-6 font-semibold text-foreground">{row.aspect}</td>
                        <td className="py-4 px-6 text-primary font-semibold">{row.acquismart}</td>
                        <td className="py-4 px-6 text-foreground/60">{row.traditional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-muted">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Pricing Questions?</h2>

            <div className="space-y-4">
              {[
                {
                  q: "Can I change plans anytime?",
                  a: "Yes! Upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No setup fees. Just sign up and start creating. Your first visual is free.",
                },
                {
                  q: "What if I need more visuals?",
                  a: "You can purchase additional visuals à la carte, or upgrade to a higher plan for more monthly visuals.",
                },
                {
                  q: "Do you offer discounts for annual billing?",
                  a: "Yes! Pay annually and get 2 months free. Contact our team at hello@acquismart.ai for details.",
                },
              ].map((item, idx) => (
                <details key={idx} className="bg-card rounded-lg border border-border overflow-hidden group">
                  <summary className="p-6 cursor-pointer font-semibold text-foreground hover:bg-card transition-colors flex items-center justify-between">
                    {item.q}
                    <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-foreground/70 border-t border-border">{item.a}</div>
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
