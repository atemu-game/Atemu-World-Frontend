// Provider Script and Google
import Script from 'next/script';
import React from 'react';

// TODO: Update the Google Analytics ID
const ProviderScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-R8TCRJY11M"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-R8TCRJY11M');
        gtag('send', 'pageview');
        `}
      </Script>
    </>
  );
};

export default ProviderScript;
