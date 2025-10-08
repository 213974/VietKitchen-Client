import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  pathname?: string; // Optional pathname prop
  children?: React.ReactNode;
}

const SEO = ({ title, description, children }: SEOProps) => {
  const siteName = "Viet Kitchen & Tea House";
  const siteUrl = "https://www.vietkitchenteahouse.com"; // Your production URL
  const location = useLocation();

  const fullTitle = title.toLowerCase() === 'home' 
    ? siteName 
    : `${title} | ${siteName}`;
  
  // Construct the canonical URL
  const canonicalUrl = `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      
      {children}
    </Helmet>
  );
};

export default SEO;