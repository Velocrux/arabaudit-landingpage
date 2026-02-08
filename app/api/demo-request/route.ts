import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import Mixpanel from 'mixpanel'

const resend = new Resend(process.env.RESEND_API_KEY)
const DEMO_REQUEST_EMAIL = process.env.DEMO_REQUEST_EMAIL || 'kauser@velocrux.com'

// Initialize server-side Mixpanel
const mixpanel = process.env.MIXPANEL_TOKEN
  ? Mixpanel.init(process.env.MIXPANEL_TOKEN)
  : null

interface DemoRequestBody {
  firstName: string
  lastName: string
  email: string
  organization: string
  industry: string
  phone: string
}

export async function POST(request: Request) {
  try {
    const body: DemoRequestBody = await request.json()
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.organization || !body.industry || !body.phone) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Create email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      line-height: 1.6;
      color: #1F2937;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0B4634 0%, #006C35 100%);
      color: white;
      padding: 30px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .accent-bar {
      height: 4px;
      background: #D4AF37;
      margin: 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 2px solid #D4AF37;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #E5E7EB;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-weight: 600;
      color: #0B4634;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .value {
      font-size: 16px;
      color: #1F2937;
      margin-top: 4px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #E5E7EB;
      text-align: center;
      color: #6B7280;
      font-size: 14px;
    }
    .timestamp {
      color: #9CA3AF;
      font-size: 12px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 New Demo Request</h1>
  </div>
  <div class="accent-bar"></div>
  <div class="content">
    <div class="field">
      <div class="label">Full Name</div>
      <div class="value">${body.firstName} ${body.lastName}</div>
    </div>
    
    <div class="field">
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${body.email}" style="color: #D4AF37; text-decoration: none;">${body.email}</a></div>
    </div>
    
    <div class="field">
      <div class="label">Organization</div>
      <div class="value">${body.organization}</div>
    </div>
    
    <div class="field">
      <div class="label">Industry / Framework</div>
      <div class="value">${body.industry}</div>
    </div>
    
    <div class="field">
      <div class="label">Phone Number</div>
      <div class="value">${body.phone}</div>
    </div>
    
    <div class="footer">
      <p class="timestamp">Received on ${new Date().toLocaleString('en-US', { 
        dateStyle: 'full', 
        timeStyle: 'long',
        timeZone: 'Asia/Riyadh'
      })}</p>
      <p>This request was submitted through the ArabAudit landing page demo request form.</p>
    </div>
  </div>
</body>
</html>
    `.trim()
    
    // Create plain text version
    const emailText = `
New Demo Request - ArabAudit

Name: ${body.firstName} ${body.lastName}
Email: ${body.email}
Organization: ${body.organization}
Industry: ${body.industry}
Phone: ${body.phone}

Received: ${new Date().toLocaleString('en-US', { 
  dateStyle: 'full', 
  timeStyle: 'long',
  timeZone: 'Asia/Riyadh'
})}

This request was submitted through the ArabAudit landing page demo request form.
    `.trim()
    
    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'ArabAudit Demo Requests <onboarding@resend.dev>',
      to: [DEMO_REQUEST_EMAIL],
      subject: `[ArabAudit] Demo Request - ${body.organization}`,
      html: emailHtml,
      text: emailText,
    })
    
    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }
    
    console.log('Email sent successfully:', data)

    // Track successful demo request server-side
    if (mixpanel) {
      try {
        // Track the conversion event
        mixpanel.track('demo_requested_server', {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          organization: body.organization,
          industry: body.industry,
          phone: body.phone,
          timestamp: new Date().toISOString(),
          source: 'api_submission',
          email_sent: true
        })

        // Set user properties for the identified user
        mixpanel.people.set(body.email, {
          $name: `${body.firstName} ${body.lastName}`,
          $email: body.email,
          $phone: body.phone,
          organization: body.organization,
          industry: body.industry,
          demo_requested: true,
          demo_requested_at: new Date().toISOString(),
          last_seen: new Date().toISOString()
        })

        console.log('Mixpanel server-side tracking completed')
      } catch (mixpanelError) {
        console.error('Failed to track in Mixpanel:', mixpanelError)
        // Don't fail the request if tracking fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Demo request submitted successfully'
    })
    
  } catch (error) {
    console.error('Error processing demo request:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'An unexpected error occurred' 
      },
      { status: 500 }
    )
  }
}
