import {
  Bot,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  Globe,
  Handshake,
  Rocket,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

export const serviceIcons: Record<string, LucideIcon> = {
  "white-label-web-development": Globe,
  "white-label-app-development": Smartphone,
  "white-label-ai-automation": Bot,
  "white-label-software-development": Code2,
  "white-label-mvp-development": Rocket,
}

export const trustIcons: LucideIcon[] = [ShieldCheck, Clock, CheckCircle2]

export const processFlowIcons: LucideIcon[] = [FileText, Clock, ShieldCheck, Handshake]

export const engagementIcons: LucideIcon[] = [
  ShieldCheck,
  FileText,
  Code2,
  CheckCircle2,
  Handshake,
]

export const iconClass = "size-5 shrink-0 text-foreground"
