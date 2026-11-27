#!/usr/bin/env node
/**
 * CLI for generating campaign refs and adding them to the registry.
 *
 * Usage:
 *   npm run add-campaign -- --label "ACME Corp" --audience recruiter --channel email
 *   npm run add-campaign -- --label "BigCo" --position "Lead Fullstack" --channel linkedin
 *
 * This prints the campaign config block and the shareable link(s).
 * Copy the output into lib/analytics/campaigns/registry.ts, then redeploy.
 */

import crypto from "crypto";

function generateRef(prefix: string): string {
  const bytes = crypto.randomBytes(8).toString("hex");
  return `${prefix}_${bytes}`;
}

function usage(): void {
  console.log(`
Usage:
  npm run add-campaign -- --label <label> --audience <recruiter|prospect> --channel <email|whatsapp|linkedin|other> [--position <title>] [--base-url <url>] [--path <path>] [--expires <YYYY-MM-DD>]

Example:
  npm run add-campaign -- --label "NYXRA" --position "Senior Fullstack" --audience recruiter --channel email --base-url https://marcellinlele.lasolutions.net
`);
}

function parseArgs(args: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const val = args[i + 1];
      if (val && !val.startsWith("--")) {
        result[key] = val;
        i++;
      }
    }
  }
  return result;
}

const args = parseArgs(process.argv.slice(2));

if (!args.label || !args.audience || !args.channel) {
  usage();
  process.exit(1);
}

const validAudiences = ["recruiter", "prospect"];
const validChannels = ["email", "whatsapp", "linkedin", "other"];

if (!validAudiences.includes(args.audience)) {
  console.error(`Error: audience must be one of: ${validAudiences.join(", ")}`);
  process.exit(1);
}

if (!validChannels.includes(args.channel)) {
  console.error(`Error: channel must be one of: ${validChannels.join(", ")}`);
  process.exit(1);
}

const prefix = args.audience === "recruiter" ? "r" : "p";
const ref = generateRef(prefix);
const today = new Date().toISOString().slice(0, 10);
const campaignId = `${args.label.toLowerCase().replace(/\s+/g, "-")}-${args.channel}-${today}`;
const baseUrl = args["base-url"] ?? "https://marcellinlele.lasolutions.net";
const allowedPath = args.path ?? (args.audience === "recruiter" ? "/fr/recruteur" : "/fr");
const expiresLine = args.expires ? `\n    expires_at: "${args.expires}",` : "";
const positionLine = args.position ? `\n    position: "${args.position}",` : "";

const configBlock = `  {
    campaign_id: "${campaignId}",
    ref: "${ref}",
    label: "${args.label}",${positionLine}
    audience: "${args.audience}",
    channel: "${args.channel}",
    created_at: "${today}",
    active: true,${expiresLine}
    allowed_path: "${allowedPath}",
  },`;

const linkFr = `${baseUrl}/fr/${args.audience === "recruiter" ? "recruteur" : ""}?ref=${ref}`;
const linkEn = `${baseUrl}/en/${args.audience === "recruiter" ? "recruteur" : ""}?ref=${ref}`;

console.log("\n──────────────────────────────────────────────────────────────");
console.log("NOUVELLE CAMPAGNE");
console.log("──────────────────────────────────────────────────────────────");
console.log("\n1. Ajouter dans lib/analytics/campaigns/registry.ts :\n");
console.log(configBlock);
console.log("\n2. Liens à partager :\n");
console.log(`   FR : ${linkFr}`);
console.log(`   EN : ${linkEn}`);
console.log("\nNote : un redeploiement est nécessaire pour activer la campagne.");
console.log("──────────────────────────────────────────────────────────────\n");
