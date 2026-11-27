import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import React from "react";

export interface CampaignAlertEmailProps {
  category: string;
  event_name: string;
  campaign_label: string;
  campaign_position?: string;
  campaign_channel: string;
  locale: string;
  page_path: string;
  cta_location?: string;
  cv_locale?: string;
  contact_method?: string;
  request_type?: string;
  datetime_local: string;
  posthog_url: string;
}

export default function CampaignAlertEmail({
  category,
  event_name,
  campaign_label,
  campaign_position,
  campaign_channel,
  locale,
  page_path,
  cta_location,
  cv_locale,
  contact_method,
  request_type,
  datetime_local,
  posthog_url,
}: CampaignAlertEmailProps) {
  const eventLabel: Record<string, string> = {
    cv_download_clicked: "Clic sur le CV",
    contact_cta_clicked: "Clic sur un CTA contact",
    contact_form_submitted: "Formulaire de contact accepté",
  };

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#F5F2EB", fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            maxWidth: "560px",
            margin: "32px auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "32px",
            border: "1px solid #E5E0D6",
          }}
        >
          <Text
            style={{ color: "#CE6B3D", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 8px" }}
          >
            Portfolio — Signal d'engagement
          </Text>

          <Heading
            style={{ color: "#17201C", fontSize: "22px", fontWeight: "bold", margin: "0 0 24px", lineHeight: "1.3" }}
          >
            {campaign_label}
            {campaign_position ? ` · ${campaign_position}` : ""}
            {" — "}
            {eventLabel[event_name] ?? event_name}
          </Heading>

          <Section style={{ marginBottom: "24px" }}>
            <Row label="Campagne" value={campaign_label} />
            {campaign_position && <Row label="Poste" value={campaign_position} />}
            <Row label="Canal déclaré" value={campaign_channel} />
            <Row label="Événement" value={eventLabel[event_name] ?? event_name} />
            {contact_method && <Row label="Méthode contact" value={contact_method} />}
            {cv_locale && <Row label="CV langue" value={cv_locale.toUpperCase()} />}
            {request_type && <Row label="Type de demande" value={request_type} />}
            <Row label="Date (Douala)" value={datetime_local} />
            <Row label="Langue du site" value={locale.toUpperCase()} />
            <Row label="Page" value={page_path} />
            {cta_location && <Row label="Emplacement CTA" value={cta_location} />}
          </Section>

          <Hr style={{ borderColor: "#E5E0D6", margin: "24px 0" }} />

          <Text style={{ color: "#666", fontSize: "12px", margin: "0 0 8px" }}>
            Ce signal indique un engagement probable, pas une certitude sur l&apos;identité du visiteur. Deux personnes utilisant le même lien restent deux visiteurs distincts.
          </Text>

          <Link
            href={posthog_url}
            style={{ color: "#234B3D", fontSize: "13px", fontWeight: "bold" }}
          >
            → Voir le dashboard PostHog
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
      <Text
        style={{ color: "#888", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.5px", minWidth: "120px", margin: 0 }}
      >
        {label}
      </Text>
      <Text style={{ color: "#17201C", fontSize: "13px", margin: 0 }}>
        {value}
      </Text>
    </div>
  );
}
