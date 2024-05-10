// Provider Script and Google
import Script from "next/script";
import React from "react";

// TODO: Update the Google Analytics ID
const ProviderScript = () => {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=...."
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`     
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '....');
        gtag('send', 'pageview');
        `}
      </Script>
    </>
  );
};

export default ProviderScript;
