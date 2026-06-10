"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type ServiceCardProps = {
  title: string;
  description: string;
  services: string[];
  icon: LucideIcon;
  accentColor?: string;
  index?: number;
};

export function ServiceCard({
  title,
  description,
  services,
  icon: Icon,
  accentColor = "#f63a39",
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn(
        "group relative p-6 md:p-8 rounded-2xl",
        "bg-white/[0.03] border border-white/[0.08]",
        "hover:border-white/[0.15] transition-all duration-500",
        "hover:bg-white/[0.05]"
      )}
    >
      {/* Subtle glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${accentColor}08, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          <Icon size={20} style={{ color: accentColor }} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white/90 tracking-tight mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed mb-5">
          {description}
        </p>

        {/* Service list */}
        <ul className="space-y-2">
          {services.map((service) => (
            <li
              key={service}
              className="flex items-center gap-2 text-[13px] text-white/60"
            >
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
              />
              {service}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
