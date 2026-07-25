export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-5 text-center">
        <a
          href="https://digitalheroesco.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-signal-dark)]"
        >
          Built for Digital Heroes Training Task
        </a>
      </div>
    </footer>
  );
}
