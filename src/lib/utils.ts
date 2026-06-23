import {
  BadgeCheck,
  Bitcoin,
  Clapperboard,
  Cpu,
  Gem,
  Gift,
  Globe2,
  LucideIcon,
  Monitor,
  Music,
  Rocket,
  TrendingUp,
  Trophy,
} from "lucide-react";
import type { PredictionCategory } from "../types";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function daysUntil(value: string) {
  const diff = new Date(value).getTime() - Date.now();
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hours = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  return `${days}d ${hours}h`;
}

export function categoryIcon(category: PredictionCategory): LucideIcon {
  const icons: Record<PredictionCategory, LucideIcon> = {
    AI: Cpu,
    Tech: Monitor,
    Markets: TrendingUp,
    Crypto: Bitcoin,
    Sports: Trophy,
    Music,
    Entertainment: Clapperboard,
    Startups: Rocket,
    "World Events": Globe2,
  };

  return icons[category] || Gem;
}

export function marketplaceIcon(type: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    coupon: Gift,
    sponsor_offer: BadgeCheck,
    creator_product: Rocket,
    digital_download: Gem,
    gift_card_placeholder: Gift,
    premium_access: Trophy,
    badge: BadgeCheck,
    report: TrendingUp,
    plugin: Music,
    template: Monitor,
  };

  return icons[type] || Gift;
}
