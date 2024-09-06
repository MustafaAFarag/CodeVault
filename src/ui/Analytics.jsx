// Analytics.jsx
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-P3TPJPS1QN', {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  return null;
};

export default Analytics;
