/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_NAME?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_ADSENSE_SLOT_DEFAULT?: string;
  readonly PUBLIC_ADSENSE_SLOT_HOME?: string;
  readonly PUBLIC_ADSENSE_SLOT_TOOLKIT?: string;
  readonly PUBLIC_ADSENSE_SLOT_TOOL?: string;
  readonly PUBLIC_ADSENSE_SLOT_USE_CASE?: string;
  readonly PUBLIC_FUNDING_CHOICES_SCRIPT_SRC?: string;
  readonly PUBLIC_CONSENT_PROVIDER?: string;
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
