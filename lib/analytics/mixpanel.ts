type EventProperties = Record<string, any>
type UserProperties = Record<string, any>

let mixpanelModule: typeof import('mixpanel-browser') | null = null

async function loadMixpanel() {
  if (!mixpanelModule) {
    mixpanelModule = await import('mixpanel-browser')
  }
  return mixpanelModule.default
}

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

  async init(): Promise<void> {
    if (!this.shouldInitialize()) {
      return
    }

    const token = this.getToken()!
    const debug = this.isDebugMode()

    try {
      const mixpanel = await loadMixpanel()
      mixpanel.init(token, {
        debug,
        track_pageview: false,
        persistence: 'localStorage',
        ignore_dnt: false,
        api_host: 'https://api.mixpanel.com',
        loaded: () => {
          this.initialized = true
          this.flushQueues()
        }
      })

      mixpanel.set_config({
        ip: true,
        cross_subdomain_cookie: true,
      })
    } catch (error) {
      console.error('Failed to initialize Mixpanel:', error)
    }
  }

  private async flushQueues(): Promise<void> {
    this.eventQueue.forEach(({ event, properties }) => {
      this.track(event, properties)
    })
    this.eventQueue = []

    this.identifyQueue.forEach(({ distinctId, properties }) => {
      this.identify(distinctId, properties)
    })
    this.identifyQueue = []

    this.userPropertiesQueue.forEach(({ properties }) => {
      this.setUserProperties(properties)
    })
    this.userPropertiesQueue = []
  }

  async track(event: string, properties?: EventProperties): Promise<void> {
    if (!this.initialized) {
      this.eventQueue.push({ event, properties })
      return
    }

    try {
      const mixpanel = await loadMixpanel()
      mixpanel.track(event, properties)
    } catch (error) {
      console.error('Failed to track event:', event, error)
    }
  }

  async identify(distinctId: string, properties?: UserProperties): Promise<void> {
    if (!this.initialized) {
      this.identifyQueue.push({ distinctId, properties })
      return
    }

    try {
      const mixpanel = await loadMixpanel()
      mixpanel.identify(distinctId)
      if (properties) {
        mixpanel.people.set(properties)
      }
    } catch (error) {
      console.error('Failed to identify user:', distinctId, error)
    }
  }

  async setUserProperties(properties: UserProperties): Promise<void> {
    if (!this.initialized) {
      this.userPropertiesQueue.push({ properties })
      return
    }

    try {
      const mixpanel = await loadMixpanel()
      mixpanel.people.set(properties)
    } catch (error) {
      console.error('Failed to set user properties:', error)
    }
  }

  async setSuperProperties(properties: EventProperties): Promise<void> {
    if (!this.initialized) {
      return
    }

    try {
      const mixpanel = await loadMixpanel()
      mixpanel.register(properties)
    } catch (error) {
      console.error('Failed to set super properties:', error)
    }
  }

  async reset(): Promise<void> {
    if (!this.initialized) {
      return
    }

    try {
      const mixpanel = await loadMixpanel()
      mixpanel.reset()
    } catch (error) {
      console.error('Failed to reset Mixpanel:', error)
    }
  }

  isReady(): boolean {
    return this.initialized
  }

  async getDistinctId(): Promise<string | null> {
    if (!this.initialized) {
      return null
    }

    try {
      const mixpanel = await loadMixpanel()
      return mixpanel.get_distinct_id()
    } catch (error) {
      console.error('Failed to get distinct ID:', error)
      return null
    }
  }
}

const mixpanelClient = new MixpanelClient()

export default mixpanelClient
