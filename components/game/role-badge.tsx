"use client";

import { ROLES, RoleId } from "@/lib/game-data";
import { cn } from "@/lib/utils";

interface RoleBadgeProps {
  roleId: RoleId;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function RoleBadge({
  roleId,
  size = "md",
  showIcon = true,
  className,
}: RoleBadgeProps) {
  const role = ROLES.find((r) => r.id === roleId);
  if (!role) return null;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold border",
        role.bgClass,
        role.textClass,
        role.borderClass,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <span aria-hidden="true">{role.icon}</span>}
      {role.label}
    </span>
  );
}

interface RoleCardProps {
  roleId: RoleId;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function RoleCard({ roleId, selected, disabled, onClick }: RoleCardProps) {
  const role = ROLES.find((r) => r.id === roleId);
  if (!role) return null;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
        "hover:scale-[1.02] active:scale-[0.98]",
        selected
          ? `${role.borderClass} ${role.bgClass}`
          : "border-border bg-card hover:border-muted-foreground",
        disabled && "opacity-50 cursor-not-allowed hover:scale-100"
      )}
      aria-pressed={selected}
      aria-label={`Chọn vai ${role.label}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl" aria-hidden="true">
          {role.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className={cn("font-bold text-base", role.textClass)}>
            {role.label}
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed mt-0.5">
            {role.description}
          </div>
        </div>
        {selected && (
          <div
            className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
              role.bgClass,
              role.textClass
            )}
            aria-hidden="true"
          >
            ✓
          </div>
        )}
      </div>
    </button>
  );
}
