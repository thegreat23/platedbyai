import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, restaurant, city, message } = body

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 })
    }

    try {
      const resendApiKey = process.env.RESEND_API_KEY

      if (!resendApiKey) {
        console.warn("RESEND_API_KEY not found. Email will not be sent.")
      } else {
        // Send email to hello@platedbyai.com
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "JewelAI Contact Form <onboarding@resend.dev>",
            to: "hello@platedbyai.com",
            subject: `New Contact Form Submission from ${name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              ${restaurant ? `<p><strong>Restaurant/Business:</strong> ${restaurant}</p>` : ""}
              ${city ? `<p><strong>City:</strong> ${city}</p>` : ""}
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br/>")}</p>
            `,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error("Resend API error:", errorData)
        }
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      // Don't fail the request if email fails
    }

    console.log("Contact form submission received:", {
      name,
      restaurant,
      city,
      message,
    })

    return NextResponse.json(
      {
        message: "Message sent successfully",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
