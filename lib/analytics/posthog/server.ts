import { PostHog } from "posthog-node";

function createClient(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";

  if (!key || process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "true") return null;

  return new PostHog(key, {
    host,
    flushAt: 1,
    flushInterval: 0,
  });
}

interface ServerCaptureOptions {
  event: string;
  properties: Record<string, unknown>;
  distinctId?: string;
}

/** Captures a server-side event to PostHog and flushes immediately. */
export async function serverCapture({
  event,
  properties,
  distinctId = "anonymous",
}: ServerCaptureOptions): Promise<void> {
  const client = createClient();
  if (!client) return;

  try {
    client.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        $lib: "posthog-node",
        environment:
          process.env.NODE_ENV === "production" ? "production" : "development",
      },
    });
    await client.flush();
  } catch (err) {
    console.error("[posthog-server] capture failed", err);
  } finally {
    await client.shutdown().catch(() => {});
  }
}
