import { z } from "zod";
import { projects } from "@/lib/content/projects";

const PROJECT_SLUGS = projects.map((p) => p.slug) as [string, ...string[]];

const AudienceSchema = z.enum(["recruiter", "prospect"]);
const ChannelSchema = z.enum(["email", "whatsapp", "linkedin", "other"]);
const LocaleSchema = z.enum(["fr", "en"]);
const EnvironmentSchema = z.enum(["production", "development", "test"]);

/** Common properties included with every event. */
const CommonPropsSchema = z.object({
  schema_version: z.literal(1),
  locale: LocaleSchema,
  page_path: z.string().max(500),
  environment: EnvironmentSchema,
  is_test: z.boolean().default(false),
  campaign_id: z.string().max(100).optional(),
  audience: AudienceSchema.optional(),
  channel: ChannelSchema.optional(),
});

export const EventSchemas = {
  portfolio_page_viewed: CommonPropsSchema,

  portfolio_visit_engaged: CommonPropsSchema.extend({
    visible_seconds: z.number().int().min(10).max(3600),
  }),

  project_viewed: CommonPropsSchema.extend({
    project_slug: z.enum(PROJECT_SLUGS),
  }),

  cv_download_clicked: CommonPropsSchema.extend({
    cv_locale: LocaleSchema,
    cv_variant: z.enum(["pdf", "static"]).default("pdf"),
    cta_location: z.string().max(100),
  }),

  contact_cta_clicked: CommonPropsSchema.extend({
    contact_method: z.enum(["email", "whatsapp", "phone", "form", "calendar"]),
    cta_location: z.string().max(100),
  }),

  contact_form_started: CommonPropsSchema,

  contact_form_submitted: CommonPropsSchema.extend({
    request_type: z.enum(["project", "ai", "recruiting", "other"]),
  }),

  contact_form_failed: CommonPropsSchema.extend({
    error_code: z.string().max(50),
  }),
} as const;

export type EventName = keyof typeof EventSchemas;
export type EventProps<T extends EventName> = z.infer<typeof EventSchemas[T]>;

/** Validates event name and properties. Returns parsed props or throws ZodError. */
export function validateEvent<T extends EventName>(
  name: T,
  props: unknown
): EventProps<T> {
  const schema = EventSchemas[name];
  return schema.parse(props) as EventProps<T>;
}

export function isEventName(name: string): name is EventName {
  return name in EventSchemas;
}
