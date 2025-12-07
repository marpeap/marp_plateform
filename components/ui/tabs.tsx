"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({
  tabs,
  defaultValue,
  className,
}: {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? tabs[0]?.value);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setValue(tab.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              value === tab.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-foreground hover:bg-muted/70",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map(
          (tab) =>
            tab.value === value && (
              <div key={tab.value} className="rounded-lg border border-border p-4">
                {tab.content}
              </div>
            ),
        )}
      </div>
    </div>
  );
}

