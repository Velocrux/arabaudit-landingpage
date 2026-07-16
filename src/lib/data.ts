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

type Translator = (key: string) => string;

type FrameworkKey =
  | "samaCsf"
  | "ncaEcc"
  | "sdaiaPdpl"
  | "samaItGovernance"
  | "pciDss"
  | "iso27001"
  | "cbahiClinic"
  | "cbahiHospital";

interface FrameworkMeta {
  id: string;
  frameworkId: string;
  shortCode: string;
  controls: number;
  domains: number;
  color: string;
  version: string;
  translationKey: FrameworkKey;
  domainsList: {
    id: string;
    number: number;
    controlCount: number;
  }[];
}

export const frameworkMeta: FrameworkMeta[] = [
  {
    id: "sama-csf",
    frameworkId: "sama-csf",
    shortCode: "SAMA-CSF",
    controls: 28,
    domains: 4,
    color: "#2b6da8",
    version: "1.0",
    translationKey: "samaCsf",
    domainsList: [
      { id: "d1", number: 1, controlCount: 6 },
      { id: "d2", number: 2, controlCount: 4 },
      { id: "d3", number: 3, controlCount: 16 },
      { id: "d4", number: 4, controlCount: 2 },
    ],
  },
  {
    id: "nca-ecc",
    frameworkId: "nca-ecc",
    shortCode: "NCA-ECC",
    controls: 28,
    domains: 4,
    color: "#1f8060",
    version: "1.0",
    translationKey: "ncaEcc",
    domainsList: [
      { id: "d1", number: 1, controlCount: 10 },
      { id: "d2", number: 2, controlCount: 15 },
      { id: "d3", number: 3, controlCount: 1 },
      { id: "d4", number: 4, controlCount: 2 },
    ],
  },
  {
    id: "sdaia-pdpl",
    frameworkId: "sdaia-pdpl",
    shortCode: "SDAIA-PDPL",
    controls: 20,
    domains: 6,
    color: "#6d4099",
    version: "1.0",
    translationKey: "sdaiaPdpl",
    domainsList: [
      { id: "d1", number: 1, controlCount: 4 },
      { id: "d2", number: 2, controlCount: 3 },
      { id: "d3", number: 3, controlCount: 4 },
      { id: "d4", number: 4, controlCount: 3 },
      { id: "d5", number: 5, controlCount: 4 },
      { id: "d6", number: 6, controlCount: 2 },
    ],
  },
  {
    id: "sama-it-governance",
    frameworkId: "sama-it-governance",
    shortCode: "SAMA-IT-GOVERNANCE",
    controls: 35,
    domains: 4,
    color: "#1a5a8c",
    version: "1.0",
    translationKey: "samaItGovernance",
    domainsList: [
      { id: "d1", number: 1, controlCount: 9 },
      { id: "d2", number: 2, controlCount: 4 },
      { id: "d3", number: 3, controlCount: 11 },
      { id: "d4", number: 4, controlCount: 11 },
    ],
  },
  {
    id: "pci-dss-v4.0.1",
    frameworkId: "pci-dss-v4.0.1",
    shortCode: "PCI-DSS-V4.0.1",
    controls: 12,
    domains: 6,
    color: "#cc3333",
    version: "4.0.1",
    translationKey: "pciDss",
    domainsList: [
      { id: "d1", number: 1, controlCount: 2 },
      { id: "d2", number: 2, controlCount: 2 },
      { id: "d3", number: 3, controlCount: 2 },
      { id: "d4", number: 4, controlCount: 3 },
      { id: "d5", number: 5, controlCount: 2 },
      { id: "d6", number: 6, controlCount: 1 },
    ],
  },
  {
    id: "iso-27001:2022",
    frameworkId: "iso-27001:2022",
    shortCode: "ISO-27001:2022",
    controls: 118,
    domains: 5,
    color: "#1a4d7a",
    version: "2022",
    translationKey: "iso27001",
    domainsList: [
      { id: "d1", number: 1, controlCount: 25 },
      { id: "d2", number: 2, controlCount: 37 },
      { id: "d3", number: 3, controlCount: 8 },
      { id: "d4", number: 4, controlCount: 14 },
      { id: "d5", number: 5, controlCount: 34 },
    ],
  },
  {
    id: "cbahi-clinic",
    frameworkId: "cbahi-clinic",
    shortCode: "CBAHI-CLINIC",
    controls: 133,
    domains: 11,
    color: "#d9654a",
    version: "1.0",
    translationKey: "cbahiClinic",
    domainsList: [
      { id: "d1", number: 1, controlCount: 36 },
      { id: "d2", number: 2, controlCount: 15 },
      { id: "d3", number: 3, controlCount: 12 },
      { id: "d4", number: 4, controlCount: 3 },
      { id: "d5", number: 5, controlCount: 5 },
      { id: "d6", number: 6, controlCount: 14 },
      { id: "d7", number: 7, controlCount: 7 },
      { id: "d8", number: 8, controlCount: 14 },
      { id: "d9", number: 9, controlCount: 9 },
      { id: "d10", number: 10, controlCount: 12 },
      { id: "d11", number: 11, controlCount: 6 },
    ],
  },
  {
    id: "cbahi-hospital",
    frameworkId: "cbahi-hospital",
    shortCode: "CBAHI-HOSPITAL",
    controls: 314,
    domains: 16,
    color: "#b8472f",
    version: "1.0",
    translationKey: "cbahiHospital",
    domainsList: [
      { id: "d1", number: 1, controlCount: 22 },
      { id: "d2", number: 2, controlCount: 16 },
      { id: "d3", number: 3, controlCount: 24 },
      { id: "d4", number: 4, controlCount: 16 },
      { id: "d5", number: 5, controlCount: 28 },
      { id: "d6", number: 6, controlCount: 14 },
      { id: "d7", number: 7, controlCount: 16 },
      { id: "d8", number: 8, controlCount: 20 },
      { id: "d9", number: 9, controlCount: 28 },
      { id: "d10", number: 10, controlCount: 26 },
      { id: "d11", number: 11, controlCount: 14 },
      { id: "d12", number: 12, controlCount: 22 },
      { id: "d13", number: 13, controlCount: 14 },
      { id: "d14", number: 14, controlCount: 24 },
      { id: "d15", number: 15, controlCount: 16 },
      { id: "d16", number: 16, controlCount: 14 },
    ],
  },
];

export function buildFrameworks(t: Translator): Framework[] {
  const sector = t("sector");
  return frameworkMeta.map((m) => ({
    id: m.id,
    frameworkId: m.frameworkId,
    shortCode: m.shortCode,
    controls: m.controls,
    domains: m.domains,
    color: m.color,
    version: m.version,
    sector,
    name: t(`${m.translationKey}.name`),
    authority: t(`${m.translationKey}.authority`),
    tagline: t(`${m.translationKey}.tagline`),
    summary: t(`${m.translationKey}.summary`),
    domainsList: m.domainsList.map((d) => ({
      id: d.id,
      number: d.number,
      controlCount: d.controlCount,
      name: t(`${m.translationKey}.${d.id}.name`),
      description: t(`${m.translationKey}.${d.id}.desc`),
    })),
  }));
}

export function buildFramework(
  t: Translator,
  id: string,
): Framework | undefined {
  return buildFrameworks(t).find((f) => f.id === id);
}

export function buildMarqueeExtras(t: Translator): string[] {
  return [t("marqueeSamaIt"), t("marqueePci")];
}

// Static raw data - English fallback used by non-localized consumers (e.g. sitemap, routing).
export const frameworks: Framework[] = frameworkMeta.map((m) => ({
  id: m.id,
  frameworkId: m.frameworkId,
  shortCode: m.shortCode,
  controls: m.controls,
  domains: m.domains,
  color: m.color,
  version: m.version,
  sector: "Compliance",
  name: m.shortCode,
  authority: "",
  tagline: "",
  summary: "",
  domainsList: m.domainsList.map((d) => ({
    id: d.id,
    number: d.number,
    controlCount: d.controlCount,
    name: "",
    description: "",
  })),
}));

export const marqueeExtras = ["SAMA IT Governance", "PCI-DSS v4"];

export function getFramework(id: string): Framework | undefined {
  return frameworks.find((f) => f.id === id);
}
