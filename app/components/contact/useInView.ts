"use client";

import { useEffect, useState, useRef } from "react";

export function useInView(options = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.unobserve(el);
      }
    }, { threshold: 0.15, ...options });

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, visible] as const;
}
