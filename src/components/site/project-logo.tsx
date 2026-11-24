"use client"

import Image from "next/image"
import { useState } from "react"
import type { ProjectLogo as ProjectLogoType } from "@/lib/logos"
import { cn } from "@/lib/utils"

export function ProjectLogoMark({
  logo,
  size = 64,
  className,
  priority = false,
}: {
  logo: ProjectLogoType
  size?: number
  className?: string
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const chip =
    logo.chip === "dark"
      ? "bg-[#0B1120] dark:bg-[#0B1120]"
      : "bg-white dark:bg-white"

  if (failed) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-xl border border-border px-3 text-sm font-medium tracking-tight",
          chip === "bg-white dark:bg-white" ? "text-zinc-900" : "text-white",
          className
        )}
        style={{ width: size, height: size }}
      >
        {logo.title.slice(0, 2)}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-xl border border-border/60",
        chip,
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={size}
        height={size}
        className="size-full object-contain p-2"
        onError={() => setFailed(true)}
        priority={priority}
      />
    </span>
  )
}
