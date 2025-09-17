import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const SEO = ({ title, description, children }: SEOProps) => {
  const siteName = "Viet Kitchen & Tea House";
  
  const fullTitle = title.toLowerCase() === 'home' 
    ? siteName 
    : `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {children}
    </Helmet>
  );
};

export default SEO;