type Props = {
  className?: string;
  strokeWidth?: number;
};

/**
 * The brand's signature: a crown reduced to one continuous abstract line,
 * echoing the founder's love of modern art. Used sparingly — page loader,
 * section dividers, hover states — never as decoration.
 */
export function CrownMark({ className = "", strokeWidth = 1.2 }: Props) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 52 L6 30 L26 44 L40 14 L60 40 L80 14 L94 44 L114 30 L114 52 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
