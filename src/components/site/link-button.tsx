import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LinkButton({
  href,
  variant = "default",
  className,
  children,
}: {
  href: string
  variant?: "default" | "outline" | "ghost"
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size: "lg" }), "h-11 px-5", className)}
    >
      {children}
    </Link>
  )
}
