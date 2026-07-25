// Pure UI/presentation config — pipeline stage labels + colors used
// consistently across StatsCards, LeadTable, and the lead detail page.
// No backend logic here; the string values must keep matching the
// existing status values already used by the API/service layer.

export const STATUSES = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export const STATUS_STYLES = {
  New: {
    text: "text-[var(--color-new)]",
    bg: "bg-[var(--color-new-bg)]",
    dot: "bg-[var(--color-new)]",
    accent: "var(--color-new)",
  },
  Contacted: {
    text: "text-[var(--color-contacted)]",
    bg: "bg-[var(--color-contacted-bg)]",
    dot: "bg-[var(--color-contacted)]",
    accent: "var(--color-contacted)",
  },
  Qualified: {
    text: "text-[var(--color-qualified)]",
    bg: "bg-[var(--color-qualified-bg)]",
    dot: "bg-[var(--color-qualified)]",
    accent: "var(--color-qualified)",
  },
  "Proposal Sent": {
    text: "text-[var(--color-proposal)]",
    bg: "bg-[var(--color-proposal-bg)]",
    dot: "bg-[var(--color-proposal)]",
    accent: "var(--color-proposal)",
  },
  Won: {
    text: "text-[var(--color-won)]",
    bg: "bg-[var(--color-won-bg)]",
    dot: "bg-[var(--color-won)]",
    accent: "var(--color-won)",
  },
  Lost: {
    text: "text-[var(--color-lost)]",
    bg: "bg-[var(--color-lost-bg)]",
    dot: "bg-[var(--color-lost)]",
    accent: "var(--color-lost)",
  },
};

export function getStatusStyle(status) {
  return (
    STATUS_STYLES[status] || {
      text: "text-[var(--color-ink-soft)]",
      bg: "bg-[var(--color-border)]",
      dot: "bg-[var(--color-ink-soft)]",
      accent: "var(--color-ink-soft)",
    }
  );
}

export function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
