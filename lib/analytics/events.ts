import mixpanelClient from './mixpanel'
import type {
  PageViewProperties,
  SectionViewProperties,
  ButtonClickProperties,
  NavigationProperties,
  LanguageChangeProperties,
  ScrollDepthProperties,
  FormEventProperties,
  DemoRequestProperties,
  UserProfileProperties,
  SectionName,
  DeviceType,
  BrowserType,
  OSType,
  UTMParameters,
  DeviceInfo,
  LocationInfo,
  SessionInfo
} from './types'

// Utility functions for getting common properties
function getDeviceInfo(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      type: 'desktop',
      browser: 'Other',
      os: 'Other',
      screenWidth: 1920,
      screenHeight: 1080
    }
  }

  const userAgent = navigator.userAgent
  const screenWidth = window.screen.width
  const screenHeight = window.screen.height

  // Determine device type
  let deviceType: DeviceType = 'desktop'
  if (screenWidth <= 768) {
    deviceType = 'mobile'
  } else if (screenWidth <= 1024) {
    deviceType = 'tablet'
  }

  // Determine browser
  let browser: BrowserType = 'Other'
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browser = 'Chrome'
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari'
  } else if (userAgent.includes('Edg')) {
    browser = 'Edge'
  } else if (userAgent.includes('Opera')) {
    browser = 'Opera'
  }

  // Determine OS
  let os: OSType = 'Other'
  if (userAgent.includes('Windows')) {
    os = 'Windows'
  } else if (userAgent.includes('Mac')) {
    os = 'macOS'
  } else if (userAgent.includes('Linux')) {
    os = 'Linux'
  } else if (userAgent.includes('Android')) {
    os = 'Android'
  } else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS'
  }

  return {
    type: deviceType,
    browser,
    os,
    screenWidth,
    screenHeight
  }
}

function getUTMParameters(): UTMParameters {
  if (typeof window === 'undefined') {
    return {}
  }

  const urlParams = new URLSearchParams(window.location.search)
  return {
    source: urlParams.get('utm_source') || undefined,
    medium: urlParams.get('utm_medium') || undefined,
    campaign: urlParams.get('utm_campaign') || undefined,
    content: urlParams.get('utm_content') || undefined,
    term: urlParams.get('utm_term') || undefined
  }
}

function getBaseProperties(sessionInfo?: Partial<SessionInfo>): Record<string, any> {
  const deviceInfo = getDeviceInfo()
  const utmParams = getUTMParameters()

  return {
    timestamp: new Date().toISOString(),
    device_type: deviceInfo.type,
    browser: deviceInfo.browser,
    os: deviceInfo.os,
    screen_width: deviceInfo.screenWidth,
    screen_height: deviceInfo.screenHeight,
    utm_source: utmParams.source,
    utm_medium: utmParams.medium,
    utm_campaign: utmParams.campaign,
    utm_content: utmParams.content,
    utm_term: utmParams.term,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    ...sessionInfo
  }
}

// Event tracking functions

export function trackPageView(properties?: Partial<PageViewProperties>): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const pageProps: PageViewProperties = {
    page_title: document.title,
    page_path: window.location.pathname,
    page_url: window.location.href,
    time_on_page: 0,
    scroll_depth: 0,
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('page_viewed', pageProps)
}

export function trackSectionView(
  sectionName: SectionName,
  properties?: Partial<SectionViewProperties>
): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const sectionProps: SectionViewProperties = {
    section_name: sectionName,
    time_on_page: Math.floor((Date.now() - performance.timeOrigin) / 1000),
    scroll_depth: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
    viewport_height: window.innerHeight,
    viewport_width: window.innerWidth,
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('section_viewed', sectionProps)
}

export function trackButtonClick(
  buttonText: string,
  buttonType: 'primary' | 'secondary' | 'tertiary',
  buttonLocation: string,
  properties?: Partial<ButtonClickProperties>
): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const buttonProps: ButtonClickProperties = {
    button_text: buttonText,
    button_type: buttonType,
    button_location: buttonLocation,
    time_on_page: Math.floor((Date.now() - performance.timeOrigin) / 1000),
    scroll_depth: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('button_clicked', buttonProps)
}

export function trackNavigationClick(
  navType: NavigationProperties['nav_type'],
  linkText: string,
  linkHref: string,
  properties?: Partial<NavigationProperties>
): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const navProps: NavigationProperties = {
    nav_type: navType,
    link_text: linkText,
    link_href: linkHref,
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('navigation_clicked', navProps)
}

export function trackLanguageChange(
  previousLanguage: string,
  newLanguage: string,
  changeMethod: 'toggle' | 'auto' = 'toggle',
  properties?: Partial<LanguageChangeProperties>
): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const languageProps: LanguageChangeProperties = {
    previous_language: previousLanguage,
    new_language: newLanguage,
    change_method: changeMethod,
    time_on_page: Math.floor((Date.now() - performance.timeOrigin) / 1000),
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('language_changed', languageProps)
}

export function trackScrollDepth(
  scrollPercentage: number,
  properties?: Partial<ScrollDepthProperties>
): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const scrollProps: ScrollDepthProperties = {
    scroll_percentage: scrollPercentage,
    scroll_depth: `${scrollPercentage}%`,
    time_on_page: Math.floor((Date.now() - performance.timeOrigin) / 1000),
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('scroll_depth_reached', scrollProps)
}

export function trackFormEvent(
  formType: 'demo_request',
  action: FormEventProperties['action'],
  properties?: Partial<FormEventProperties>
): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const formProps: FormEventProperties = {
    form_type: formType,
    action,
    time_in_form: properties?.time_in_form || 0,
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('form_interaction', formProps)
}

export function trackDemoRequest(
  formData: {
    firstName: string
    lastName: string
    email: string
    organization: string
    industry: string
    phone: string
  },
  sectionsViewed: SectionName[],
  timeToConversion: number,
  formCompletionTime: number,
  properties?: Partial<DemoRequestProperties>
): void {
  if (typeof window === 'undefined') return

  const baseProps = getBaseProperties()
  const utmParams = getUTMParameters()

  const demoProps: DemoRequestProperties = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    organization: formData.organization,
    industry: formData.industry,
    phone: formData.phone,
    time_to_conversion: timeToConversion,
    sections_viewed: sectionsViewed,
    form_completion_time: formCompletionTime,
    referrer: document.referrer,
    utm_source: utmParams.source,
    utm_campaign: utmParams.campaign,
    ...baseProps,
    ...properties
  }

  mixpanelClient.track('demo_requested', demoProps)
}

export function identifyUser(
  email: string,
  properties?: Partial<UserProfileProperties>
): void {
  const userProps: UserProfileProperties = {
    $email: email,
    last_seen: new Date().toISOString(),
    total_page_views: 1,
    total_sessions: 1,
    ...properties
  }

  mixpanelClient.identify(email, userProps)
}

export function setUserProperties(properties: Partial<UserProfileProperties>): void {
  const userProps: UserProfileProperties = {
    last_seen: new Date().toISOString(),
    ...properties
  }

  mixpanelClient.setUserProperties(userProps)
}

export function setSuperProperties(properties: Record<string, any>): void {
  mixpanelClient.setSuperProperties(properties)
}

// Utility function to track time spent on page
export function startPageTimer(): () => number {
  const startTime = Date.now()

  return () => {
    return Math.floor((Date.now() - startTime) / 1000)
  }
}

// Utility function to get current scroll depth
export function getCurrentScrollDepth(): number {
  if (typeof window === 'undefined') return 0

  return Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)
}

// Initialize tracking when module loads (client-side only)
if (typeof window !== 'undefined') {
  // Initialize Mixpanel
  mixpanelClient.init()
}