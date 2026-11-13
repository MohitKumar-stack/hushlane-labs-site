import { z } from "zod"

export const serviceOptions = [
  { value: "white-label-web-development", label: "White-label web development" },
  { value: "white-label-app-development", label: "White-label app development" },
  { value: "white-label-ai-automation", label: "White-label AI automation" },
  { value: "white-label-software-development", label: "White-label software development" },
  { value: "white-label-mvp-development", label: "White-label MVP development" },
  { value: "not-sure", label: "Not sure yet" },
] as const

export const budgetOptions = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10-25k", label: "$10,000–$25,000" },
  { value: "25-50k", label: "$25,000–$50,000" },
  { value: "50-100k", label: "$50,000–$100,000" },
  { value: "100k-plus", label: "$100,000+" },
  { value: "retainer", label: "Monthly retainer" },
] as const

const freeEmailDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
])

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z
    .string()
    .trim()
    .email("Enter a valid work email.")
    .refine((value) => {
      const domain = value.split("@")[1]?.toLowerCase() ?? ""
      return !freeEmailDomains.has(domain)
    }, "Use your agency email. We reply to the company, not a personal inbox."),
  agency: z.string().trim().min(2, "Enter the agency name.").max(120),
  website: z
    .string()
    .trim()
    .max(200)
    .refine(
      (value) =>
        value === "" ||
        /^https?:\/\/[^\s]+\.[^\s]+$/i.test(value) ||
        /^[a-z0-9.-]+\.[a-z]{2,}([/?#].*)?$/i.test(value),
      "Enter a website, or leave this blank."
    ),
  service: z.enum(
    serviceOptions.map((option) => option.value) as [
      (typeof serviceOptions)[number]["value"],
      ...(typeof serviceOptions)[number]["value"][],
    ],
    { message: "Choose a service." }
  ),
  budget: z.enum(
    budgetOptions.map((option) => option.value) as [
      (typeof budgetOptions)[number]["value"],
      ...(typeof budgetOptions)[number]["value"][],
    ],
    { message: "Choose a budget range." }
  ),
  message: z
    .string()
    .trim()
    .min(20, "Add a few sentences about the work.")
    .max(4000, "Keep the note under 4,000 characters."),
})

export type ContactInput = z.infer<typeof contactSchema>

export function normalizeWebsite(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return ""
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}
