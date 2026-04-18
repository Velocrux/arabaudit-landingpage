export interface Domain {
  id: string;
  number: number;
  name: string;
  controlCount: number;
  description: string;
}

export interface Framework {
  id: string;
  frameworkId: string;
  shortCode: string;
  name: string;
  authority: string;
  tagline: string;
  sector: string;
  controls: number;
  domains: number;
  color: string;
  version: string;
  summary: string;
  domainsList: Domain[];
}

export const frameworks: Framework[] = [
  {
    id: "sama-csf",
    frameworkId: "sama-csf",
    shortCode: "SAMA-CSF",
    name: "SAMA CSF (Financial)",
    authority: "Saudi Central Bank (SAMA)",
    tagline: "SAMA Cybersecurity Framework",
    sector: "Compliance",
    controls: 28,
    domains: 4,
    color: "#2b6da8",
    version: "1.0",
    summary: "SAMA Cybersecurity Framework",
    domainsList: [
      { id: "d1", number: 1, name: "Cyber Security Leadership and Governance", controlCount: 6, description: "Controls related to Cyber Security Leadership and Governance" },
      { id: "d2", number: 2, name: "Cyber Security Risk Management and Compliance", controlCount: 4, description: "Controls related to Cyber Security Risk Management and Compliance" },
      { id: "d3", number: 3, name: "Cyber Security Operations and Technology", controlCount: 16, description: "Controls related to Cyber Security Operations and Technology" },
      { id: "d4", number: 4, name: "Third Party Cyber Security", controlCount: 2, description: "Controls related to Third Party Cyber Security" },
    ],
  },
  {
    id: "nca-ecc",
    frameworkId: "nca-ecc",
    shortCode: "NCA-ECC",
    name: "NCA ECC (Cybersecurity)",
    authority: "National Cybersecurity Authority (NCA)",
    tagline: "NCA Essential Cybersecurity Controls",
    sector: "Compliance",
    controls: 28,
    domains: 4,
    color: "#1f8060",
    version: "1.0",
    summary: "NCA Essential Cybersecurity Controls",
    domainsList: [
      { id: "d1", number: 1, name: "Cybersecurity Governance", controlCount: 10, description: "Controls related to Cybersecurity Governance" },
      { id: "d2", number: 2, name: "Cybersecurity Defense", controlCount: 15, description: "Controls related to Cybersecurity Defense" },
      { id: "d3", number: 3, name: "Cybersecurity Resilience", controlCount: 1, description: "Controls related to Cybersecurity Resilience" },
      { id: "d4", number: 4, name: "Third-Party and Cloud Computing Cybersecurity", controlCount: 2, description: "Controls related to Third-Party and Cloud Computing Cybersecurity" },
    ],
  },
  {
    id: "sdaia-pdpl",
    frameworkId: "sdaia-pdpl",
    shortCode: "SDAIA-PDPL",
    name: "SDAIA Personal Data Protection Law",
    authority: "Saudi Data & AI Authority (SDAIA)",
    tagline: "SDAIA PDPL (نظام حماية البيانات الشخصية)",
    sector: "Compliance",
    controls: 20,
    domains: 6,
    color: "#6d4099",
    version: "1.0",
    summary: "SDAIA PDPL (نظام حماية البيانات الشخصية)",
    domainsList: [
      { id: "d1", number: 1, name: "Privacy Governance and Accountability", controlCount: 4, description: "Covers the organisational governance structures, designated privacy roles (DPO), privacy impact assessments, records of processing activities, and management of data processors to ensure accountable personal data handling under SDAIA PDPL." },
      { id: "d2", number: 2, name: "Lawful Basis and Consent", controlCount: 3, description: "Covers consent management, legitimate bases for processing without consent, and purpose limitation and data minimisation principles under SDAIA PDPL." },
      { id: "d3", number: 3, name: "Transparency and Individual Rights", controlCount: 4, description: "Covers privacy policy requirements, collection notice obligations, the full framework of data subject rights, and the handling of data subject requests under SDAIA PDPL." },
      { id: "d4", number: 4, name: "Data Quality and Retention", controlCount: 3, description: "Covers data accuracy obligations, personal data retention management, correction and update notification, and compliant data destruction under SDAIA PDPL." },
      { id: "d5", number: 5, name: "Data Disclosure, Transfer and Special Processing", controlCount: 4, description: "Covers personal data disclosure controls, cross-border data transfer requirements, direct marketing, scientific and research processing, and special handling of official documents under SDAIA PDPL." },
      { id: "d6", number: 6, name: "Data Security and Breach Management", controlCount: 2, description: "Covers the implementation of technical and organisational security measures to protect personal data, and the management of personal data breach notifications to SDAIA and data subjects as required under PDPL." },
    ],
  },
  {
    id: "sama-it-governance",
    frameworkId: "sama-it-governance",
    shortCode: "SAMA-IT-GOVERNANCE",
    name: "SAMA IT Governance Framework",
    authority: "Saudi Central Bank (SAMA)",
    tagline: "SAMA IT Governance Framework (الدليل التنظيمي لحوكمة تقنية المعلومات)",
    sector: "Compliance",
    controls: 35,
    domains: 4,
    color: "#1a5a8c",
    version: "1.0",
    summary: "SAMA IT Governance Framework (الدليل التنظيمي لحوكمة تقنية المعلومات)",
    domainsList: [
      { id: "d1", number: 1, name: "IT Governance and Leadership", controlCount: 9, description: "Establishes the governance structure, strategy, policies, roles, regulatory compliance, audit, training, and performance management for IT within the financial institution." },
      { id: "d2", number: 2, name: "IT Risk Management", controlCount: 4, description: "Covers the identification, analysis, treatment, reporting, and monitoring of IT risks within the financial institution." },
      { id: "d3", number: 3, name: "Operations Management", controlCount: 11, description: "Governs IT asset management, service levels, availability, data centres, networks, batch processing, incident management, problem management, backup, and virtualisation for the financial institution." },
      { id: "d4", number: 4, name: "System Change Management", controlCount: 11, description: "Governs system change governance, requirements, acquisition, development, testing, security, release, configuration, patch management, project management, and quality assurance." },
    ],
  },
  {
    id: "pci-dss-v4.0.1",
    frameworkId: "pci-dss-v4.0.1",
    shortCode: "PCI-DSS-V4.0.1",
    name: "PCI DSS v4.0.1",
    authority: "PCI Security Standards Council",
    tagline: "Payment Card Industry Data Security Standard version 4.0.1. A global security standard designed to protect cardholder data and reduce payment card fraud through technical and operational controls across six domains and twelve core requirements.",
    sector: "Compliance",
    controls: 12,
    domains: 6,
    color: "#cc3333",
    version: "4.0.1",
    summary: "Payment Card Industry Data Security Standard version 4.0.1. A global security standard designed to protect cardholder data and reduce payment card fraud through technical and operational controls across six domains and twelve core requirements.",
    domainsList: [
      { id: "d1", number: 1, name: "Build and Maintain a Secure Network and Systems", controlCount: 2, description: "Establish and maintain network security controls (NSCs) and apply secure configurations to all system components to protect the cardholder data environment." },
      { id: "d2", number: 2, name: "Protect Account Data", controlCount: 2, description: "Protect stored account data using strong controls and encrypt cardholder data during transmission over open, public networks to prevent unauthorized access." },
      { id: "d3", number: 3, name: "Maintain a Vulnerability Management Program", controlCount: 2, description: "Protect all systems and networks from malicious software, and develop and maintain secure systems and software to prevent exploitation of vulnerabilities." },
      { id: "d4", number: 4, name: "Implement Strong Access Control Measures", controlCount: 3, description: "Restrict access to system components and cardholder data by business need to know, uniquely identify all users with authentication, and restrict physical access to cardholder data." },
      { id: "d5", number: 5, name: "Regularly Monitor and Test Networks", controlCount: 2, description: "Log and monitor all access to network resources and cardholder data, and regularly test security systems and processes to ensure the environment is protected." },
      { id: "d6", number: 6, name: "Maintain an Information Security Policy", controlCount: 1, description: "An information security policy sets the direction for an entity's approach to managing information security across the enterprise and helps establish a culture of security within the organization." },
    ],
  },
  {
    id: "iso-27001:2022",
    frameworkId: "iso-27001:2022",
    shortCode: "ISO-27001:2022",
    name: "ISO 27001:2022",
    authority: "International Organization for Standardization (ISO)",
    tagline: "ISO/IEC 27001:2022 – Information security, cybersecurity and privacy protection. Specifies the requirements for establishing, implementing, maintaining and continually improving an ISMS. Includes mandatory Clauses 4–10 and 93 Annex A controls across four themes: Organizational (5.1–5.37), People (6.1–6.8), Physical (7.1–7.14), Technological (8.1–8.34).",
    sector: "Compliance",
    controls: 118,
    domains: 5,
    color: "#1a4d7a",
    version: "2022",
    summary: "ISO/IEC 27001:2022 – Information security, cybersecurity and privacy protection. Specifies the requirements for establishing, implementing, maintaining and continually improving an ISMS. Includes mandatory Clauses 4–10 and 93 Annex A controls across four themes: Organizational (5.1–5.37), People (6.1–6.8), Physical (7.1–7.14), Technological (8.1–8.34).",
    domainsList: [
      { id: "d1", number: 1, name: "ISMS Mandatory Clauses (4–10)", controlCount: 25, description: "ISO 27001:2022 mandatory ISMS requirements that every organization must satisfy for certification. These clauses establish, implement, maintain, and continually improve the ISMS." },
      { id: "d2", number: 2, name: "Organizational Controls", controlCount: 37, description: "Annex A Theme 1 – policies, governance, risk, supplier security, and incident management (controls 5.1–5.37)." },
      { id: "d3", number: 3, name: "People Controls", controlCount: 8, description: "Annex A Theme 2 – screening, terms of employment, awareness, training, discipline, termination, and event reporting (controls 6.1–6.8)." },
      { id: "d4", number: 4, name: "Physical Controls", controlCount: 14, description: "Annex A Theme 3 – secure areas, entry, equipment, cabling, and clear desk/screen (controls 7.1–7.14)." },
      { id: "d5", number: 5, name: "Technological Controls", controlCount: 34, description: "Annex A Theme 4 – endpoint security, access, cryptography, vulnerability management, logging, and network security (controls 8.1–8.34)." },
    ],
  },
  {
    id: "cbahi-clinic",
    frameworkId: "cbahi-clinic",
    shortCode: "CBAHI-CLINIC",
    name: "CBAHI National Standards for Ambulatory Care Centers",
    authority: "Central Board for Accreditation of Healthcare Institutions",
    tagline: "CBAHI National Standards for Ambulatory Care Centers – First Edition 2019, Effective 1 January 2020. 11 chapters, 133 standards, 594 sub-standards (7 core).",
    sector: "Compliance",
    controls: 133,
    domains: 11,
    color: "#d9654a",
    version: "1.0",
    summary: "CBAHI National Standards for Ambulatory Care Centers – First Edition 2019, Effective 1 January 2020. 11 chapters, 133 standards, 594 sub-standards (7 core).",
    domainsList: [
      { id: "d1", number: 1, name: "LD - Leadership of the Organization", controlCount: 36, description: "For any ambulatory care center, quality and patient safety depend on effective leadership. The leadership chapter addresses organizational structure, governance, roles and responsibilities of leaders, human resource management, patient and family rights, and quality improvement and patient safety." },
      { id: "d2", number: 2, name: "PC - Provision of Care", controlCount: 15, description: "The provision of care chapter addresses the process of patient registration, patient assessment and reassessment, plan of care, consultations, patient's and family's education and participation in the treatment plan, cardiopulmonary resuscitation process, transfer and referral, and emergency care." },
      { id: "d3", number: 3, name: "LB - Laboratory Services", controlCount: 12, description: "The assessment/reassessment of patients to determine the proper diagnosis, the course of treatment, and the evaluation of the treatment plan for future decisions may require laboratory services. To meet the patient's needs, the center should either provide basic laboratory services or outsource them to a recognized laboratory through a formal contracting process. This chapter addresses physical structure, staffing, safety program, specimen collection, equipment management program, labeling, quality management program, and point of care testing." },
      { id: "d4", number: 4, name: "RD - Radiology Services", controlCount: 3, description: "The assessment/reassessment of patients to determine the proper diagnosis, course of treatment, and evaluation of the treatment plan for future decisions may require radiology services. To meet patient needs, the center should offer radiology services or outsource them through a formal agreement with a recognized radiology center. If the center provides radiology services, the services are expected to meet the necessary national guidelines on radiation safety. This chapter addresses staffing, radiation safety program, and equipment maintenance program." },
      { id: "d5", number: 5, name: "DN - Dental Services", controlCount: 5, description: "Dental clinics pose a risk to patients that is different from the risks posed in other clinics in the center. This chapter addresses the peculiar dental standards that mitigate such risk, including staffing requirements, patients' assessment and treatment planning, patients' and families' education, medical records documentation requirements, and infection control requirements." },
      { id: "d6", number: 6, name: "MM - Medication Management", controlCount: 14, description: "The standards in this chapter focus on medication management as it applies to outpatient prescriptions, and medication use in the day procedure unit, the emergency room, and owned outpatient pharmacies. The standards focus on scope of medication services, safe storage of medications, safe medication preparation, review of prescriptions for appropriateness, handling of expired medications, management of narcotics and psychotropic medications, and management of medication errors and adverse drug reactions." },
      { id: "d7", number: 7, name: "MOI - Management of Information", controlCount: 7, description: "Information management is a cornerstone of patient care and the decision support process by center leaders. Center leaders are required to design and implement an information management plan that defines managing the information required by governmental and external agents, managing internal information requirements, maintaining the security and confidentiality of information, retaining records, and documenting and completing patients' unique medical record." },
      { id: "d8", number: 8, name: "IPC - Infection Prevention and Control", controlCount: 14, description: "The ambulatory care center requires processes to support the prevention and control of infection that might be acquired or transmitted by patients, staff, and visitors while in the center. These processes reduce the risk or spread of infection and ensure that care is provided in a clean, sterile environment. To ensure staff and patient safety, infection prevention and control requires an effective center-wide infection prevention and control program that identifies, reduces, and eliminates infection risks." },
      { id: "d9", number: 9, name: "FMS - Facility Management and Safety", controlCount: 9, description: "A safe, functional, and effective environment for patients, staff, and other individuals is crucial to prevent or minimize risks in the environment of care. The center leadership must provide all necessary support and resources to improve safety in the workplace in alignment with regulatory requirements. The center must maintain plans for managing the safety of the environment and must implement these plans. The center must collect and analyze data to determine the effectiveness of the plans and facilitate continuous quality improvement." },
      { id: "d10", number: 10, name: "DPU - Day Procedure Unit", controlCount: 12, description: "Ambulatory care centers may have a day procedure unit where all day procedures are performed under local anesthesia, sedation analgesia, or general anesthesia. This chapter focuses on the standards required to safely manage patients in the day procedure unit, utilizing evidence-based criteria." },
      { id: "d11", number: 11, name: "DA - Dermatology & Aesthetics Medicine", controlCount: 6, description: "Although dermatology and aesthetics medicine are recognized scopes of medical services that can be covered by the other chapters in this standards' manual, yet their wide spread practices in the ambulatory arena and their specific risky procedures warrants a separate chapter. The chapter, therefore, focuses on specific human resources and structural requirements as well as clinical risk management requirements." },
    ],
  },
];

export const marqueeExtras = ["SAMA IT Governance", "PCI-DSS v4"];

export function getFramework(id: string): Framework | undefined {
  return frameworks.find((f) => f.id === id);
}
