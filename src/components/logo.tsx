interface LogoProps {
  /** Total width in px — height scales automatically */
  width?: number;
  /** Force light (white text) or dark (navy text) variant. Default: "dark" */
  variant?: "light" | "dark";
}

export default function Logo({ width = 160, variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "#FFFFFF" : "#1A2B47";
  const h = Math.round(width * 0.36);

  return (
    <svg
      viewBox="0 0 200 72"
      width={width}
      height={h}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="bAInder"
    >
      {/* ── Document icon ─────────────────────────── */}
      <path
        d="M2 2 H22 L30 10 V36 H2 Z"
        fill="#1565C0"
      />
      {/* folded corner */}
      <path
        d="M22 2 L22 10 H30"
        fill="#0D47A1"
      />
      {/* lines on document */}
      <line x1="6"  y1="17" x2="25" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6"  y1="22" x2="23" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="6"  y1="27" x2="24" y2="27" stroke="white" strokeWidth="2" strokeLinecap="round"/>

      {/* ── Pipeline line ─────────────────────────── */}
      <line x1="30" y1="19" x2="164" y2="19" stroke="#1A2B47" strokeWidth="2.5"/>

      {/* Dot 1 */}
      <circle cx="76"  cy="19" r="6" fill="#1A2B47"/>

      {/* Dot 2 */}
      <circle cx="118" cy="19" r="6" fill="#1A2B47"/>

      {/* ── Checkmark circle ──────────────────────── */}
      <circle cx="178" cy="19" r="16" fill="#1565C0"/>
      <polyline
        points="170,19 174.5,24.5 186,12"
        fill="none"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── bAInder text ──────────────────────────── */}
      <text
        y="62"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="22"
        textAnchor="middle"
      >
        <tspan x="89" fill={textColor} fontWeight="400">b</tspan>
        <tspan fill="#E67E22" fontWeight="700">AI</tspan>
        <tspan fill={textColor} fontWeight="400">nder</tspan>
      </text>
    </svg>
  );
}
