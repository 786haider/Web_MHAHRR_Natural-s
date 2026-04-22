"use client";

export function CheckItem({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <li 
      className="flex items-start gap-3 fade-up"
      data-delay={delay}
      style={{ 
        opacity: 0, 
        transform: 'translateY(15px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
    >
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-sm text-gray-600">{text}</span>
    </li>
  );
}
