# ArabAudit Landing Page

> Saudi Arabia's first AI-powered GRC platform with native support for NCA ECC-2024, SAMA CSF, and SDAIA PDPL

## 🎯 Project Overview

ArabAudit is a bilingual (Arabic/English) landing page for an AI-powered Governance, Risk, and Compliance (GRC) platform built specifically for Saudi Arabia's regulatory environment. Unlike Western competitors, we provide native support for:

- **NCA ECC-2024**: National Cybersecurity Authority's Essential Cybersecurity Controls
- **SAMA CSF**: Saudi Central Bank's Cyber Security Framework  
- **SDAIA PDPL**: Personal Data Protection Law (Saudi GDPR)

## 🚀 Key Features

### Framework Harmonization
Upload evidence once, apply it across NCA, SAMA, and SDAIA automatically - reducing duplicate work by 40%

### Deep AI Validation
Goes beyond document metadata to validate actual compliance in policies, logs, and configuration files

### One-Click Regulatory Export
Generates government-ready NCA/SAMA Excel reports with pre-mapped control IDs

### Bilingual Excellence
Executive-level Arabic and English content, not just translation

## 🏗️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: JSON-based bilingual content system
- **Validation**: Zod schemas
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
AA-landingpage/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── privacy/              # Privacy policy page
│   └── api/
│       └── demo-request/     # Demo request API endpoint
├── components/
│   ├── Hero.tsx              # Above-the-fold hero section
│   ├── ValueProp.tsx         # Framework harmonization value
│   ├── Features.tsx          # Core platform features
│   ├── Comparison.tsx        # Competitor comparison table
│   ├── Frameworks.tsx        # NCA/SAMA/SDAIA overview
│   ├── Personas.tsx          # Target audience sections
│   ├── TrustSignals.tsx      # Social proof
│   ├── CTA.tsx               # Call-to-action
│   ├── Footer.tsx            # Footer with contact info
│   └── DemoRequestModal.tsx  # Demo request form
├── content/
│   ├── ar.json               # Arabic content
│   └── en.json               # English content
├── lib/
│   ├── validation.ts         # Zod validation schemas
│   ├── content.ts            # Content helper utilities
│   └── constants.ts          # App-wide constants
├── .cursor/
│   ├── rules/                # Cursor AI rules
│   │   ├── arabaudit-core.mdc
│   │   ├── frontend-standards.mdc
│   │   └── api-standards.mdc
│   ├── skills/               # Cursor AI skills
│   │   ├── saudi-compliance-context/
│   │   ├── bilingual-content-generator/
│   │   └── framework-mapper/
│   └── business-context.md   # Product strategy & market analysis
└── docs/
    ├── ArabAudit Market Research.docx
    ├── Market Gaps to penetrate ArabAudit in KSA.docx
    ├── Saudi Regulatory Ecosystem Briefing.docx
    └── Audit Workflow in KSA.docx
```

## 🎨 Design Principles

### Saudi-First Design
- Professional colors (blues/grays) for executive audience
- Culturally appropriate imagery
- Vision 2030 alignment in messaging

### Bilingual UX
- Not just translation - cultural adaptation
- RTL support for Arabic
- Consistent terminology across languages

### Compliance Terminology
- "Framework" not "Standard"
- "Control" not "Rule"
- "Maturity Level" (SAMA) vs "Compliance Status" (NCA)
- "Media Manager" not "Document Vault"
- "Finding" not "Issue"

## 🎯 Target Audience

### Primary Personas

1. **CISO / IT Manager**
   - Pain: Excel chaos, manual evidence gathering
   - Solution: 70% automation with AI.

2. **Compliance Officer**
   - Pain: Fear of NCA/SAMA fines
   - Solution: Always audit-ready monitoring

3. **CFO / CEO**
   - Pain: Can't understand technical reports
   - Solution: Executive Arabic dashboards

4. **Internal Auditor**
   - Pain: Chasing files across teams
   - Solution: One source of truth

### Target Sectors

1. **Banking & Finance** (SAMA): Must reach Maturity Level 3
2. **Government Entities** (NCA): Mandatory for 100+ ministries
3. **Fintech Startups** (SAMA + NCA): Compliance before launch
4. **Energy & Utilities** (NCA/ICS): Critical infrastructure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd AA-landingpage

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Environment Variables

Create a `.env` file:

```env
# Demo Request Email Configuration
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
SALES_EMAIL=sales@arabaudit.com

# Optional: CRM Integration
HUBSPOT_API_KEY=your-hubspot-key
SALESFORCE_API_KEY=your-salesforce-key
```

## 📝 Content Management

Content is stored in JSON files for easy bilingual management:

### Adding New Content

**content/en.json**
```json
{
  "new_section": {
    "title": "New Feature",
    "description": "Description in English"
  }
}
```

**content/ar.json**
```json
{
  "new_section": {
    "title": "ميزة جديدة",
    "description": "الوصف بالعربية"
  }
}
```

### Using Content in Components

```tsx
import content from '@/content/en.json';

export function NewSection({ locale }: { locale: 'ar' | 'en' }) {
  const text = locale === 'ar' ? arContent : enContent;
  
  return (
    <section className={locale === 'ar' ? 'rtl' : 'ltr'}>
      <h2>{text.new_section.title}</h2>
      <p>{text.new_section.description}</p>
    </section>
  );
}
```

## 🤖 AI Context & Skills

### Cursor Rules

The project includes comprehensive Cursor AI rules in `.cursor/rules/`:

- **arabaudit-core.mdc**: Core project rules, Saudi regulatory context, terminology
- **frontend-standards.mdc**: React/Next.js patterns, i18n, UI/UX guidelines
- **api-standards.mdc**: API development, validation, PDPL compliance

### Cursor Skills

Custom skills in `.cursor/skills/` provide deep domain knowledge:

- **saudi-compliance-context**: NCA/SAMA/SDAIA regulatory frameworks
- **bilingual-content-generator**: Professional Arabic/English content patterns
- **framework-mapper**: Control mapping logic for framework harmonization

### Using Skills

Skills are automatically discovered by Cursor AI when relevant. To manually invoke:

1. Reference the skill in your question: "Using the Saudi compliance context skill..."
2. The AI will read and apply the skill's guidance

## 🧪 Testing

### Validation Testing

```bash
# Test Zod schemas
npm test lib/validation.test.ts
```

### E2E Testing (Future)

```bash
# Playwright tests for bilingual flows
npm run test:e2e
```

## 📊 Performance Targets

- Landing page load: < 2s
- Form validation: Instant
- AI scans: < 5s for documents
- Language switching: Immediate (no reload)

## 🔒 Security & Privacy

### SDAIA PDPL Compliance

- Consent management for form submissions
- Data retention policies (5 years for consent records)
- Right to erasure implementation
- Audit trail for all data access

### Data Protection

- All uploads encrypted at rest
- Secure preview (no downloads)
- Rate limiting on API endpoints
- CORS restricted to approved domains

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup

Ensure all environment variables are configured in Vercel dashboard.

### Custom Domain

For Saudi domains (.sa, .com.sa):
1. Add domain in Vercel
2. Update DNS records
3. Configure SSL/TLS

## 📈 Analytics & Monitoring

### Conversion Tracking

Track demo requests by:
- Sector (banking, government, fintech, energy)
- Locale (ar, en)
- Source (direct, referral, campaign)

### Performance Monitoring

Monitor:
- Page load times
- API response times
- Form submission success rates
- Email delivery rates

## 🤝 Contributing

### Code Style

- Use TypeScript strictly
- Follow ESLint/Prettier rules
- Write bilingual content in JSON files
- Test validation schemas
- Ensure RTL compatibility

### Commit Messages

Follow conventional commits:
```
feat(hero): add Vision 2030 messaging
fix(validation): correct Saudi phone regex
docs(readme): update deployment instructions
```

## 📚 Additional Resources

### Market Research Documents

See `/docs` folder for:
- Complete market research analysis
- Competitive landscape breakdown
- Saudi regulatory ecosystem briefing
- Detailed audit workflow documentation

### Business Context

See `.cursor/business-context.md` for:
- Product strategy
- Target market analysis
- Competitive positioning
- Value propositions
- Real-world use cases

## 📞 Contact

- **Website**: [arabaudit.com](https://arabaudit.com) (coming soon)
- **Email**: info@arabaudit.com
- **LinkedIn**: [ArabAudit](https://linkedin.com/company/arabaudit)

## 📄 License

Proprietary - All rights reserved

---

Built with ❤️ for Saudi Arabia's digital transformation journey 🇸🇦
