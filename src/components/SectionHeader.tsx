import { ReactNode } from "react";

export default function SectionHeader({
  title,
  eyebrow,
  action,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs font-bold uppercase text-gold">{eyebrow}</p>}
        <h2 className="text-xl font-black text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}
