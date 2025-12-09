import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const usage = formData.get("usage") as string
    const specifics = formData.get("specifics") as string
    const file = formData.get("file") as File

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    let fileData = null
    if (file) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      fileData = {
        filename: file.name,
        content: buffer.toString("base64"),
        contentType: file.type,
      }
    }

    try {
      const resendApiKey = process.env.RESEND_API_KEY

      if (!resendApiKey) {
        console.warn("RESEND_API_KEY not found. Email will not be sent.")
      } else {
        // NOTE: To send to hello@platedbyai.com, verify the domain at resend.com/domains
        const emailPayload: any = {
          from: "JewelAI Form <onboarding@resend.dev>",
          to: "meezee@acquismart.com", // Using verified email address
          subject: `New JewelAI Request from ${email}`,
          html: `
            <h2>New JewelAI Image Request</h2>
            <p><strong>Customer Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Image Usage:</strong><br/>${usage || "Not specified"}</p>
            <p><strong>Specific Requirements:</strong><br/>${specifics || "Not specified"}</p>
            ${fileData ? `<p><strong>Attached File:</strong> ${fileData.filename}</p>` : ""}
            <hr/>
            <p style="color: #666; font-size: 12px;">
              <strong>Note:</strong> This email is being sent to meezee@acquismart.com (verified address).
              To receive emails at hello@platedbyai.com, verify your domain at resend.com/domains
            </p>
          `,
        }

        // Add attachment if file exists
        if (fileData) {
          emailPayload.attachments = [
            {
              filename: fileData.filename,
              content: fileData.content,
            },
          ]
        }

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailPayload),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error("Resend API error:", errorData.message)
          throw new Error(`Resend API error: ${errorData.message}`)
        }

        const result = await response.json()
        console.log("Admin notification email sent successfully:", result.id)

        const confirmationResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "JewelAI <onboarding@resend.dev>",
            to: email,
            subject: "Your JewelAI Request is Confirmed",
            html: `
              <h2>Thank you for your request!</h2>
              <p>Hi there,</p>
              <p>We've received your jewellery image and will process your AI-generated photos within 24 hours.</p>
              <p><strong>What's next:</strong></p>
              <ul>
                <li>Our AI is analyzing your image</li>
                <li>You'll receive a free sample within 24 hours</li>
                <li>We'll email you at ${email} when it's ready</li>
              </ul>
              <p>Questions? Reply to this email or contact us at hello@platedbyai.com</p>
              <p>Best regards,<br/>The JewelAI Team</p>
            `,
          }),
        })

        if (confirmationResponse.ok) {
          const confirmResult = await confirmationResponse.json()
          console.log("Customer confirmation email sent successfully:", confirmResult.id)
        }
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      return NextResponse.json(
        {
          error: "Failed to send email. Please contact hello@platedbyai.com directly.",
          details: emailError instanceof Error ? emailError.message : "Unknown error",
        },
        { status: 500 },
      )
    }

    console.log("Form submission received:", {
      email,
      phone,
      usage,
      specifics,
      fileName: file?.name,
    })

    return NextResponse.json(
      {
        message: "Form submitted successfully",
        submittedEmail: email,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing form:", error)
    return NextResponse.json({ error: "Failed to process form submission" }, { status: 500 })
  }
}
