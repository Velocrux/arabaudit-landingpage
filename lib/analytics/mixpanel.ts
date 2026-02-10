import mixpanel from 'mixpanel-browser'

type EventProperties = Record<string, any>
type UserProperties = Record<string, any>

class MixpanelClient {
  private initialized = false
  private eventQueue: Array<{ event: string; properties?: EventProperties }> = []
  private identifyQueue: Array<{ distinctId: string; properties?: UserProperties }> = []
  private userPropertiesQueue: Array<{ properties: UserProperties }> = []

  private getToken(): string | null {
    return process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || null
  }

  private isDebugMode(): boolean {
    return process.env.NEXT_PUBLIC_MIXPANEL_DEBUG === 'true'
  }

  private isClient(): boolean {
    return typeof window !== 'undefined'
  }

  private shouldInitialize(): boolean {
    return this.isClient() && !this.initialized && !!this.getToken()
  }

  init(): void {
    if (!this.shouldInitialize()) {
      return
    }

    const token = this.getToken()!
    const debug = this.isDebugMode()

    try {
      mixpanel.init(token, {
        debug,
        track_pageview: false, // We'll handle page views manually
        persistence: 'localStorage',
        ignore_dnt: false, // Respect Do Not Track
        api_host: 'https://api.mixpanel.com',
        loaded: (mixpanelInstance: any) => {
          this.initialized = true
          this.flushQueues()
        }
      })

      // Set up automatic geolocation tracking
      mixpanel.set_config({
        ip: true,
        cross_subdomain_cookie: true,
      })

    } catch (error) {
      console.error('Failed to initialize Mixpanel:', error)
    }
  }

  private flushQueues(): void {
    // Flush event queue
    this.eventQueue.forEach(({ event, properties }) => {
      this.track(event, properties)
    })
    this.eventQueue = []

    // Flush identify queue
    this.identifyQueue.forEach(({ distinctId, properties }) => {
      this.identify(distinctId, properties)
    })
    this.identifyQueue = []

    // Flush user properties queue
    this.userPropertiesQueue.forEach(({ properties }) => {
      this.setUserProperties(properties)
    })
    this.userPropertiesQueue = []
  }

  track(event: string, properties?: EventProperties): void {
    if (!this.initialized) {
      this.eventQueue.push({ event, properties })
      return
    }

    try {
      mixpanel.track(event, properties)
    } catch (error) {
      console.error('Failed to track event:', event, error)
    }
  }

  identify(distinctId: string, properties?: UserProperties): void {
    if (!this.initialized) {
      this.identifyQueue.push({ distinctId, properties })
      return
    }

    try {
      mixpanel.identify(distinctId)
      if (properties) {
        mixpanel.people.set(properties)
      }
    } catch (error) {
      console.error('Failed to identify user:', distinctId, error)
    }
  }

  setUserProperties(properties: UserProperties): void {
    if (!this.initialized) {
      this.userPropertiesQueue.push({ properties })
      return
    }

    try {
      mixpanel.people.set(properties)
    } catch (error) {
      console.error('Failed to set user properties:', error)
    }
  }

  setSuperProperties(properties: EventProperties): void {
    if (!this.initialized) {
      // Store super properties for later
      return
    }

    try {
      mixpanel.register(properties)
    } catch (error) {
      console.error('Failed to set super properties:', error)
    }
  }

  reset(): void {
    if (!this.initialized) {
      return
    }

    try {
      mixpanel.reset()
    } catch (error) {
      console.error('Failed to reset Mixpanel:', error)
    }
  }

  isReady(): boolean {
    return this.initialized
  }

  getDistinctId(): string | null {
    if (!this.initialized) {
      return null
    }

    try {
      return mixpanel.get_distinct_id()
    } catch (error) {
      console.error('Failed to get distinct ID:', error)
      return null
    }
  }
}

// Create singleton instance
const mixpanelClient = new MixpanelClient()

export default mixpanelClient