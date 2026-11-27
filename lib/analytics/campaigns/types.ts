export type Audience = "recruiter" | "prospect";
export type Channel = "email" | "whatsapp" | "linkedin" | "other";

export interface Campaign {
  campaign_id: string;
  ref: string;
  label: string;
  position?: string;
  audience: Audience;
  channel: Channel;
  created_at: string;
  active: boolean;
  expires_at?: string;
  allowed_path?: string;
}

/** Stored client-side (sessionStorage). No PII, no company name. */
export interface Attribution {
  campaign_id: string;
  audience: Audience;
  channel: Channel;
}

export type ValidationResult =
  | { valid: true; attribution: Attribution }
  | { valid: false };
