const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arabaudit.com'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ArabAudit',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Saudi-native smart audit engine for NCA ECC-2024, SAMA CSF, PDPL, and CBAHI healthcare accreditation readiness.',
  areaServed: [
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Place', name: 'Gulf Cooperation Council' },
  ],
  knowsAbout: [
    'NCA ECC-2024',
    'SAMA Cyber Security Framework',
    'Personal Data Protection Law (PDPL)',
    'SDAIA',
    'CBAHI',
    'Saudi Central Board for Accreditation of Healthcare Institutions',
    'Healthcare accreditation',
    'Patient safety standards',
    'Clinical governance',
    'Cybersecurity compliance',
    'Audit readiness',
  ],
}

const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ArabAudit',
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'SAR',
  },
  featureList: [
    'NCA ECC-2024 audit workflow and one-click Excel export',
    'SAMA CSF maturity assessment with Central Bank portal-ready export',
    'PDPL consent, privacy policy, and data subject rights evidence',
    'CBAHI healthcare accreditation evidence organization for hospitals, clinics, and labs',
    'AI evidence validation and reuse across frameworks',
    'Cryptographically signed, immutable audit records',
  ],
  inLanguage: ['en', 'ar'],
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CBAHI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CBAHI is the Saudi Central Board for Accreditation of Healthcare Institutions — the national body that sets healthcare quality and patient safety standards in the Kingdom of Saudi Arabia. It accredits hospitals, medical centers, clinics, labs, and other healthcare providers against national standards covering governance, clinical services, infection prevention, medication safety, and continuous improvement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who must comply with CBAHI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hospitals, medical centers, clinics, laboratories, and other healthcare providers in Saudi Arabia that seek accreditation. CBAHI accreditation is the recognized national benchmark for healthcare quality and patient safety in the Kingdom.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does ArabAudit support CBAHI accreditation readiness?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ArabAudit helps healthcare providers organize policies, clinical governance evidence, and continuous improvement cycles against CBAHI expectations. Evidence is stored in one audit trail, reused across cybersecurity and privacy frameworks, and kept survey-ready — so hospitals, clinics, and labs can pursue accreditation without duplicating work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I run CBAHI alongside NCA and PDPL audits on ArabAudit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ArabAudit is designed to run NCA ECC-2024, SAMA CSF, SDAIA/PDPL, and CBAHI workstreams in parallel on a single platform. Evidence uploaded once can be mapped and reused across frameworks, with AI validating alignment and keeping one consolidated audit trail.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does CBAHI accreditation cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CBAHI standards cover governance, clinical services, infection prevention and control, medication safety, patient rights, quality management, and continuous improvement. The accreditation process uses evidence review and on-site surveys comparable in rigor to IT and cybersecurity audits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is ArabAudit built for Saudi Arabia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. ArabAudit is a Saudi-native platform built from day one for the Kingdom. It maps evidence directly to NCA control IDs, exports in official SAMA Excel formats for Central Bank submission, supports SDAIA/PDPL requirements, and structures evidence for CBAHI healthcare accreditation — all with Arabic and English interfaces.',
      },
    },
  ],
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}
