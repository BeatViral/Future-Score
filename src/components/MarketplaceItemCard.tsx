import { ArrowUpRight, LockKeyhole, ShoppingBag } from "lucide-react";
import { marketplaceIcon } from "../lib/utils";
import type { CouponOffer, MarketplaceItem } from "../types";

type RewardLike = CouponOffer | MarketplaceItem;

function getCredits(item: RewardLike) {
  return "requiredCredits" in item ? item.requiredCredits : item.priceCredits;
}

function getVendor(item: RewardLike) {
  return "vendor" in item && item.vendor ? item.vendor : "creator" in item ? item.creator : "FutureScore";
}

export default function MarketplaceItemCard({
  item,
  onRedeem,
  compact = false,
}: {
  item: RewardLike;
  onRedeem?: (item: RewardLike) => void;
  compact?: boolean;
}) {
  const Icon = marketplaceIcon(item.type);
  const credits = getCredits(item);
  const discount = "discountText" in item ? item.discountText : item.discountText;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white/[0.035] transition hover:-translate-y-1 hover:border-gold/40 hover:bg-white/[0.055]">
      <div className="relative grid aspect-[1.55] place-items-center overflow-hidden bg-gradient-to-br from-gold/20 via-slate-900 to-futureBlue/10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.16),transparent)] opacity-0 transition group-hover:opacity-100" />
        <div className="grid h-16 w-16 place-items-center rounded-2xl border border-gold/30 bg-black/35 text-gold shadow-gold">
          <Icon className="h-8 w-8" />
        </div>
        {discount && (
          <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-xs font-black text-gold">
            {discount}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xs font-bold uppercase text-gold">{item.category}</div>
        <h3 className="text-base font-black text-white">{item.title}</h3>
        <p className="mt-1 text-xs text-muted">By {getVendor(item)}</p>
        {!compact && <p className="mt-3 line-clamp-3 text-sm text-slate-300">{item.description}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-2 font-black text-gold">
            <ShoppingBag className="h-4 w-4" />
            {credits}
          </div>
          {onRedeem ? (
            <button className="ghost-button py-2" onClick={() => onRedeem(item)}>
              <LockKeyhole className="h-4 w-4" />
              Redeem
            </button>
          ) : (
            <span className="flex items-center gap-1 text-xs font-bold text-gold">
              View
              <ArrowUpRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
