import Script from "next/script"

const gtmPattern = /^GTM-[A-Z0-9]+$/
const gaPattern = /^G-[A-Z0-9]+$/
const domainPattern = /^[a-z0-9.-]+\.[a-z]{2,}$/i
const clarityPattern = /^[a-z0-9]{6,20}$/i

const clarityId = clarityPattern.test(process.env.NEXT_PUBLIC_CLARITY_ID || "zim6c00ryf")
  ? process.env.NEXT_PUBLIC_CLARITY_ID || "zim6c00ryf"
  : ""

const gtmId = gtmPattern.test(process.env.NEXT_PUBLIC_GTM_ID || "GTM-PCW867CZ")
  ? process.env.NEXT_PUBLIC_GTM_ID || "GTM-PCW867CZ"
  : ""

export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? ""
  const gaId = gaPattern.test(ga) ? ga : ""
  const domain = domainPattern.test(plausible) ? plausible : ""

  return (
    <>
      {gtmId ? (
        <>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <Script id="hushlane-gtm" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        </>
      ) : null}
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="hushlane-ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
      {domain ? (
        <Script defer src="https://plausible.io/js/script.js" data-domain={domain} strategy="afterInteractive" />
      ) : null}
      {clarityId ? (
        <Script id="hushlane-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      ) : null}
    </>
  )
}
