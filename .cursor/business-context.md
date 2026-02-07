# ArabAudit - Business Context & Product Strategy

## Market Context

### Regulatory Frameworks

**NCA ECC-2024 (National Cybersecurity Authority)**
- Target: Government entities and Critical National Infrastructure (CNI)
- 114 controls across 5 domains
- Focus: National security, sabotage prevention
- New 2024 requirements: Cloud Security, Ransomware Defense, Supply Chain risks
- Key requirement: 100% Saudi nationals in cybersecurity roles

**SAMA CSF (Saudi Central Bank)**
- Target: Financial sector (banks, insurance, fintechs)
- Maturity model: Levels 0-5 (Level 3 = minimum passing)
- Focus: Fraud prevention, transaction security, business continuity
- Requirements: 90-day password expiry, MFA

### Market Position

**Competitors:**
1. Regional Modern: CyberArrow, Jethur, GRC Vantage, AutoResilience
2. Global Giants: ServiceNow, MetricStream (expensive, Western-centric)
3. Localized Niche: ManageEngine, Consultancy firms

**Competitive Advantages:**
- **Saudi-Native Logic**: Built for Saudi frameworks from day one, not translated
- **AI Validation**: Reads documents and flags non-compliance (e.g., "90 days vs 180 days")
- **2024 Native**: Built for ECC-2024, not patched from 2018
- **Framework Harmonization**: Maps SAMA controls to NCA controls, saves 40% of work
- **Deep Technical AI**: Validates configuration files, not just document expiry dates

## Product Workflow

### Phase 1: Document Media Manager
- Central vault for legal documents (CR, GOSI, Saudization, VAT)
- Upload once, link to multiple audits
- Smart tagging and expiry alerts
- Prevents duplicate uploads

### Phase 2: Scheduling & Pre-Audit
- Lead Auditor creates audit, selects framework
- Organization links documents from Media Manager
- Secure browser-based preview (no downloads)
- Remote data room review

### Phase 3: Audit Execution
- Split-screen interface: Criteria (left) | Actions (right)
- Mobile mode for on-site walk-arounds
- AI Co-Pilot: Scans uploads, flags issues, suggests non-compliance
- Photo capture attached directly to criteria

### Phase 4: Findings & Communication
- Inline comments (legal audit trail) vs. Chat (logistics)
- Open/Closed findings tracking
- All communication logged for report

### Phase 5: Remediation (Ticket System)
- Auto-create tickets from non-compliant items
- Assign to employees
- Upload fixes, request review
- Auditor closes verified findings

### Phase 6: Reporting & Government Export
- Standard PDF reports
- **One-Click Regulatory Export**: Generates NCA/SAMA Excel templates
- Maps internal criteria IDs to government control IDs
- Ready for immediate portal upload

## Target Personas

1. **CISO / IT Manager**: Drowning in Excel chaos → 70% less manual work
2. **Compliance Officer**: Fear of fines → Always up-to-date frameworks
3. **CFO / CEO**: Can't understand IT reports → Bilingual dashboards
4. **Internal Auditor**: Chasing files → One source of truth

## Target Sectors

1. **Banking & Finance** (SAMA): Must reach Maturity Level 3
2. **Government Entities** (NCA): Mandatory for 100+ ministries
3. **Fintech Startups** (SAMA + NCA): Compliance before launch
4. **Energy & Utilities** (NCA/ICS): Critical infrastructure

## Real-World Example: "Saudico Pay"

**Phase 1 - Identity Audit (NCA)**
- Chaos: HR/IT spreadsheets, PDFs flying, proof missing
- ArabAudit: Saudization tracker, AI validates 12 roles → Green checkmark

**Phase 2 - Password Audit (SAMA)**
- Chaos: Screenshot in Word file "Evidence_vFinal_REALLY_FINAL.docx"
- ArabAudit: AI detects 180-day vs 90-day requirement → Alert to fix

**Phase 3 - Auditor Visit**
- Chaos: CEO sweating, USB drives, messy English notes
- ArabAudit: Bilingual tablet dashboard, switch to Arabic, full history

## Value Proposition

"While many GRC tools treat Saudi regulations as an 'add-on' or a translation, we built ArabAudit with the DNA of NCA and SAMA from day one. We don't just store your files; we audit them for you."

**Framework Harmonization Example:**
- User completes SAMA Control 3.3.5 (Identity & Access)
- AI suggests: "This also fulfills NCA ECC Control 2.2. Apply to both?"
- Saves 40% of work instantly

## Technical Differentiation

**Shallow AI (Competitors):**
- Input: PDF/Image
- Action: Flags expired date
- Output: "Document appears expired"

**Deep AI (ArabAudit):**
- Input: Raw logs, configuration files (JSON, XML)
- Action: Maps config to specific NCA control
- Output: "Criteria 3.5 (Firewall Rule Set) Non-Compliant. Detected unauthorized port 8080"
