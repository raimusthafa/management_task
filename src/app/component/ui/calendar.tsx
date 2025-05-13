"use client"

import * as React from "react"
import CalendarLib from "react-calendar"

import { cn } from "@/app/lib/utils"

function Calendar({
  className,
  ...props
}: React.ComponentProps<typeof CalendarLib>) {
  return (
    <div className={cn("p-3", className)}>
      <CalendarLib {...props} />
    </div>
  )
}

export { Calendar }
