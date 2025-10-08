import { useEffect } from 'react';

// Hook to set page title and track page views
export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | WorkSocial India` : 'WorkSocial India - Financial Tools & EMI Calculator';
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default usePageTitle;