
"use client";

import { createElement } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IconProps = {
  name: string;
  className?: string;
};

export default function Icon({ name, className }: IconProps) {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;

  const pascalName = name
    .replace(/(^\w|[-_\s]\w)/g, (match) =>
      match.replace(/[-_\s]/g, "").toUpperCase()
    );

  const SelectedIcon = icons[pascalName] ?? LucideIcons.Layers;

  return createElement(SelectedIcon, {
    className,
    "aria-hidden": true,
  });
}
