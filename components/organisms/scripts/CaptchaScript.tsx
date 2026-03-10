import Script from 'next/script';

import { CAPTCHA_SITE_KEY } from '@/constants/security';

function CaptchaScript() {
  if (!CAPTCHA_SITE_KEY) return null;

  return (
    <Script
      id="recaptcha-script"
      src={`https://www.google.com/recaptcha/api.js?render=${CAPTCHA_SITE_KEY}`}
      strategy="afterInteractive"
    />
  );
}

export default CaptchaScript;
