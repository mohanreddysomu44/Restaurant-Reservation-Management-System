export default function BrandMark({ className = "brand-mark" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeOpacity="0.25" />
      <path
        d="M16 6c-3.2 3.6-4.6 6.2-4.6 8.8a4.6 4.6 0 0 0 9.2 0c0-1-.3-1.9-.9-2.9-.3.9-.9 1.6-1.7 1.9.4-1.9-.1-3.7-1.6-5.2-.2 1.1-.8 2-1.7 2.6-.3-1.6-.1-3.1.3-4.4Z"
        fill="#C1440E"
      />
      <path
        d="M9 24c1.6-1.2 3-1.8 4.2-1.8h5.6c1.2 0 2.6.6 4.2 1.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
