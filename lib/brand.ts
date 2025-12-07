import { COMPANY_NAME, PRIMARY_CITY, PRIMARY_STATE_ABBR, PHONE_NUMBER, PHONE_NUMBER_URI, SUPPORT_EMAIL, OFFICE_ADDRESS_LINE_1, OFFICE_ADDRESS_LINE_2, SITE_DOMAIN } from '@/lib/config';

export function getBrand() {
  const COLORS = {
    primary: '#C9A227',
    secondary: '#0B3C5D',
    dark: '#0F0F0F',
  };

  return {
    subject: "We received your 1031 exchange inquiry",
    preheader: "Thanks for your inquiry, we have received your 1031 exchange request and will contact you within one business day.",
    company_name: COMPANY_NAME,
    city_state: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    brand_accent: COLORS.primary,
    cta_dark_bg: COLORS.dark,
    bg_color: "#0F0F0F",
    text_dark: "#0F0F0F",
    text_muted: "#666666",
    text_body: "#333333",
    text_faint: "#999999",
    border_color: "#E5E5E5",
    card_header_bg: "#F5F5F5",
    card_header_text: "#0F0F0F",
    header_text_color: "#FFFFFF",
    footer_text_color: "#FFFFFF",
    hero_title: "Thanks for your inquiry. We received your 1031 exchange request.",
    hero_subtitle: "Our team will review your details and reach out within one business day to discuss your exchange strategy.",
    details_title: "Your project details",
    call_cta_label: "Call Now",
    call_phone: PHONE_NUMBER,
    call_phone_plain: PHONE_NUMBER_URI.replace(/\D/g, ''),
    site_cta_label: "Go To Site",
    site_url: SITE_DOMAIN,
    address_line: `${OFFICE_ADDRESS_LINE_1}, ${OFFICE_ADDRESS_LINE_2}`,
    footer_note: "This confirmation is a transactional email related to your request.",
    supportEmail: SUPPORT_EMAIL,
  };
}



