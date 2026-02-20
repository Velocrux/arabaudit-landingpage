// Base event properties that are common across events
export interface BaseEventProperties {
  timestamp?: string
  language?: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  device_type?: string
  browser?: string
  os?: string
  country?: string
  city?: string
  region?: string
  screen_width?: number
  screen_height?: number
}

// Page View Event
export interface PageViewProperties extends BaseEventProperties {
  page_title: string
  page_path: string
  page_url: string
  time_on_page?: number
  scroll_depth?: number
}

// Section View Event
export interface SectionViewProperties extends BaseEventProperties {
  section_name: string
  section_id?: string
  time_on_page: number
  scroll_depth: number
  viewport_height?: number
  viewport_width?: number
}

// Button Click Event
export interface ButtonClickProperties extends BaseEventProperties {
  button_text: string
  button_type: 'primary' | 'secondary' | 'tertiary'
  button_location: string
  section_name?: string
  href?: string
  target?: '_blank' | '_self'
  time_on_page: number
  scroll_depth: number
}

// Navigation Event
export interface NavigationProperties extends BaseEventProperties {
  nav_type: 'header_link' | 'mobile_menu' | 'logo_click' | 'contact_link'
  link_text: string
  link_href: string
  target?: '_blank' | '_self'
  mobile_menu_open?: boolean
}

// Language Change Event
export interface LanguageChangeProperties extends BaseEventProperties {
  previous_language: string
  new_language: string
  change_method: 'toggle' | 'auto'
  time_on_page: number
}

// Scroll Depth Event
export interface ScrollDepthProperties extends BaseEventProperties {
  scroll_percentage: number
  scroll_depth: string
  time_on_page: number
  max_scroll_depth?: number
}

// Form Event
export interface FormEventProperties extends BaseEventProperties {
  form_type: 'demo_request'
  action: 'open' | 'close' | 'submit_attempt' | 'submit_success' | 'abandon' | 'field_focus' | 'field_blur' | 'validation_error'
  field_name?: string
  field_value?: string
  error_message?: string
  time_in_form?: number
  form_completion_rate?: number
  sections_viewed?: string[]
}

// Demo Request Event
export interface DemoRequestProperties extends BaseEventProperties {
  first_name: string
  last_name: string
  email: string
  organization: string
  industry: string
  phone: string
  time_to_conversion: number
  sections_viewed: string[]
  form_completion_time: number
  referrer?: string
  utm_source?: string
  utm_campaign?: string
}

// User Profile Properties (set via identify/setUserProperties)
export interface UserProfileProperties {
  $name?: string
  $email?: string
  $phone?: string
  organization?: string
  industry?: string
  preferred_language?: string
  first_seen?: string
  last_seen?: string
  total_page_views?: number
  total_sessions?: number
  demo_requested?: boolean
  demo_requested_at?: string
  country?: string
  city?: string
  device_type?: string
  browser?: string
  os?: string
}

// Event Types Union
export type EventProperties =
  | PageViewProperties
  | SectionViewProperties
  | ButtonClickProperties
  | NavigationProperties
  | LanguageChangeProperties
  | ScrollDepthProperties
  | FormEventProperties
  | DemoRequestProperties

// Event Name Types
export type EventName =
  | 'page_viewed'
  | 'section_viewed'
  | 'button_clicked'
  | 'navigation_clicked'
  | 'language_changed'
  | 'scroll_depth_reached'
  | 'form_interaction'
  | 'demo_requested'

// Section Names
export type SectionName =
  | 'hero'
  | 'trust_signals'
  | 'features'
  | 'aiCapabilities'
  | 'comparison'
  | 'personas'
  | 'frameworks'
  | 'team'
  | 'cta'
  | 'footer'

// Industry Types (matching form options)
export type IndustryType =
  | 'Banking & Financial Services'
  | 'Insurance & Takaful'
  | 'Fintech & Payment Services'
  | 'Investment & Securities'
  | 'Government & Public Sector'
  | 'Energy & Utilities'
  | 'Healthcare & Hospitals'
  | 'Telecommunications'
  | 'Transportation & Logistics'
  | 'Education'
  | 'Retail & E-commerce'
  | 'Technology & Software'
  | 'Professional Services'
  | 'Real Estate & Construction'
  | 'Other'

// Language Types
export type LanguageType = 'en' | 'ar'

// Device Types
export type DeviceType = 'desktop' | 'tablet' | 'mobile'

// Browser Types
export type BrowserType =
  | 'Chrome'
  | 'Firefox'
  | 'Safari'
  | 'Edge'
  | 'Opera'
  | 'Other'

// OS Types
export type OSType =
  | 'Windows'
  | 'macOS'
  | 'Linux'
  | 'Android'
  | 'iOS'
  | 'Other'

// Utility Types
export interface UTMParameters {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
}

export interface DeviceInfo {
  type: DeviceType
  browser: BrowserType
  os: OSType
  screenWidth: number
  screenHeight: number
}

export interface LocationInfo {
  country?: string
  region?: string
  city?: string
}

export interface SessionInfo {
  sessionId: string
  startTime: number
  currentTime: number
  timeOnPage: number
  scrollDepth: number
  sectionsViewed: SectionName[]
}