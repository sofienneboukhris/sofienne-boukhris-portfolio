import { useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { analyticsService } from '../services/analyticsService';

export const AnalyticsTracker = () => {
  const { path } = useRouter();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (path !== prevPathRef.current) {
      analyticsService.trackVisit(
        path,
        window.location.href,
        prevPathRef.current ? window.location.origin + prevPathRef.current : document.referrer
      );
      prevPathRef.current = path;
    }
  }, [path]);

  return null;
};
