export type TrafficSource = 'search' | 'direct' | 'social' | 'campaign' | 'referral';

export interface VisitRecord {
  id: string;
  timestamp: number;
  path: string;
  url: string;
  referrer: string;
  source: TrafficSource;
  browser: string;
  os: string;
  device: 'desktop' | 'mobile' | 'tablet';
  countryCode: string;
  countryName: string;
  ip: string;
}

export interface QuoteRequestRecord {
  id: string;
  timestamp: number;
  type: string;
  sourcePath: string;
}

export interface AnalyticsData {
  visits: VisitRecord[];
  quoteRequests: QuoteRequestRecord[];
}

const STORAGE_KEY = 'sb_analytics_data_v1';
const SESSION_IP_KEY = 'sb_analytics_ip';

function getBrowserAndOS() {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('SamsungBrowser')) browser = 'Samsung Internet';
  else if (ua.includes('Opera') || ua.includes('OPR')) browser = 'Opera';
  else if (ua.includes('Trident') || ua.includes('MSIE')) browser = 'Internet Explorer';
  else if (ua.includes('Edge') || ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';

  let os = 'Unknown';
  if (ua.includes('Win')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('like Mac') || ua.includes('iOS')) os = 'iOS';

  let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  if (/Mobi|Android/i.test(ua)) device = 'mobile';
  if (/Tablet|iPad/i.test(ua)) device = 'tablet';

  return { browser, os, device };
}

function determineTrafficSource(referrer: string): TrafficSource {
  if (!referrer) return 'direct';
  try {
    const refUrl = new URL(referrer);
    const host = refUrl.hostname.toLowerCase();
    
    const searchEngines = ['google', 'bing', 'yahoo', 'duckduckgo', 'ecosia', 'qwant'];
    if (searchEngines.some(se => host.includes(se))) return 'search';
    
    const socials = ['facebook', 'twitter', 't.co', 'instagram', 'linkedin', 'tiktok', 'pinterest'];
    if (socials.some(s => host.includes(s))) return 'social';
    
    if (window.location.search.includes('utm_source=')) return 'campaign';
    
    if (host === window.location.hostname) return 'direct'; // internal navigation usually handled by router, but just in case
    
    return 'referral';
  } catch (e) {
    return 'direct';
  }
}

async function getClientIpAndGeo(): Promise<{ ip: string; countryCode: string; countryName: string }> {
  const cachedGeo = sessionStorage.getItem('sb_detected_country') || 'TN';
  let cachedIp = sessionStorage.getItem(SESSION_IP_KEY);
  
  if (!cachedIp) {
    try {
      const res = await fetch('https://api.country.is/', { signal: AbortSignal.timeout(2000) });
      const data = await res.json();
      if (data && data.ip) {
        cachedIp = data.ip;
        sessionStorage.setItem(SESSION_IP_KEY, cachedIp);
        if (data.country && !sessionStorage.getItem('sb_detected_country')) {
           sessionStorage.setItem('sb_detected_country', data.country);
        }
      }
    } catch {
      cachedIp = '192.168.1.' + Math.floor(Math.random() * 255);
      sessionStorage.setItem(SESSION_IP_KEY, cachedIp);
    }
  }
  
  const finalCountryCode = sessionStorage.getItem('sb_detected_country') || 'TN';
  return {
    ip: cachedIp || 'Unknown',
    countryCode: finalCountryCode,
    countryName: finalCountryCode === 'TN' ? 'Tunisie' : finalCountryCode === 'FR' ? 'France' : finalCountryCode // simplified fallback
  };
}

export const analyticsService = {
  getData: (): AnalyticsData => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load analytics data', e);
    }
    return { visits: [], quoteRequests: [] };
  },

  saveData: (data: AnalyticsData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save analytics data', e);
    }
  },

  trackVisit: async (path: string, url: string, referrer: string) => {
    // Avoid tracking admin panel itself
    if (path.startsWith('/admin')) return;
    
    const { browser, os, device } = getBrowserAndOS();
    const source = determineTrafficSource(referrer);
    const { ip, countryCode, countryName } = await getClientIpAndGeo();
    
    const visit: VisitRecord = {
      id: `vis-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      path,
      url,
      referrer,
      source,
      browser,
      os,
      device,
      ip,
      countryCode,
      countryName,
    };
    
    const data = analyticsService.getData();
    data.visits.push(visit);
    analyticsService.saveData(data);
  },

  trackQuoteRequest: (type: string, sourcePath: string) => {
    const request: QuoteRequestRecord = {
      id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now(),
      type,
      sourcePath,
    };
    const data = analyticsService.getData();
    data.quoteRequests.push(request);
    analyticsService.saveData(data);
  }
};

// Auto-seed mock data for demonstration if empty
setTimeout(() => {
  const data = analyticsService.getData();
  if (data.visits.length === 0) {
    const now = Date.now();
    const mockVisits: VisitRecord[] = [];
    const mockQuotes: QuoteRequestRecord[] = [];
    const day = 24 * 60 * 60 * 1000;
    
    const paths = ['/', '/services', '/tarifs', '/contact', '/blog', '/realisations'];
    const sources: TrafficSource[] = ['search', 'direct', 'social', 'campaign', 'referral'];
    const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
    const oses = ['Windows', 'macOS', 'iOS', 'Android'];
    const countries = [{ c: 'FR', n: 'France' }, { c: 'TN', n: 'Tunisie' }, { c: 'US', n: 'États-Unis' }, { c: 'CA', n: 'Canada' }];

    for (let i = 0; i < 150; i++) {
      const timeOffset = Math.floor(Math.random() * 30 * day); // last 30 days
      const country = countries[Math.floor(Math.random() * countries.length)];
      mockVisits.push({
        id: `mock-vis-${i}`,
        timestamp: now - timeOffset,
        path: paths[Math.floor(Math.random() * paths.length)],
        url: 'http://localhost:3000' + paths[Math.floor(Math.random() * paths.length)],
        referrer: '',
        source: sources[Math.floor(Math.random() * sources.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        os: oses[Math.floor(Math.random() * oses.length)],
        device: 'desktop',
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        countryCode: country.c,
        countryName: country.n,
      });

      // 10% chance of a quote request
      if (Math.random() > 0.9) {
        mockQuotes.push({
          id: `mock-quote-${i}`,
          timestamp: now - timeOffset + 5000, // 5s after visit
          type: 'general',
          sourcePath: '/contact',
        });
      }
    }
    
    analyticsService.saveData({ visits: mockVisits, quoteRequests: mockQuotes });
  }
}, 2000);
