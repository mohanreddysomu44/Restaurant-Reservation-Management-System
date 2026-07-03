export default function HeroTicket({ className = "hero-ticket" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="232" height="292" rx="14" fill="#FAF5EC" stroke="#D3C4AC" />
      <circle cx="4" cy="120" r="12" fill="#211D1A" />
      <circle cx="236" cy="120" r="12" fill="#211D1A" />
      <line
        x1="16"
        y1="120"
        x2="224"
        y2="120"
        stroke="#D3C4AC"
        strokeWidth="2"
        strokeDasharray="4 6"
      />
      <text x="26" y="40" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2" fill="#A9812F">
        RESERVED.
      </text>
      <text x="26" y="70" fontFamily="Fraunces, serif" fontSize="22" fontWeight="600" fill="#211D1A">
        Table for Two
      </text>
      <text x="26" y="92" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#776B5A">
        Fri · 7:30 PM · Window seat
      </text>

      <text x="26" y="150" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5" fill="#9C8F7A">
        CONFIRMATION
      </text>
      <text x="26" y="172" fontFamily="JetBrains Mono, monospace" fontSize="20" fontWeight="700" fill="#C1440E">
        HT-2847
      </text>

      <circle cx="200" cy="155" r="26" fill="none" stroke="#45573F" strokeWidth="2" />
      <path d="M190 155l7 7 13-15" stroke="#45573F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      <text x="26" y="210" fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="1" fill="#9C8F7A">
        PARTY
      </text>
      <text x="26" y="226" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#2A241E">
        2 guests
      </text>

      <text x="120" y="210" fontFamily="JetBrains Mono, monospace" fontSize="8.5" letterSpacing="1" fill="#9C8F7A">
        TABLE
      </text>
      <text x="120" y="226" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#2A241E">
        T5
      </text>

      <line x1="26" y1="250" x2="214" y2="250" stroke="#E4D9C6" />
      <text x="26" y="270" fontFamily="JetBrains Mono, monospace" fontSize="8" letterSpacing="1.5" fill="#9C8F7A">
        SHOW THIS AT THE HOST STAND
      </text>
    </svg>
  );
}
