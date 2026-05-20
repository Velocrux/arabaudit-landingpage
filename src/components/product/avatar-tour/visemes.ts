export const mouthVariants = {
  closed: {
    d: "M -14 0 Q 0 8 14 0",
  },
  half: {
    d: "M -13 -1 Q 0 9 13 -1 Q 0 7 -13 -1 Z",
  },
  open: {
    d: "M -11 -3 Q 0 13 11 -3 Q 0 8 -11 -3 Z",
  },
  wide: {
    d: "M -15 -2 Q 0 16 15 -2 Q 0 11 -15 -2 Z",
  },
} as const;

export type Viseme = keyof typeof mouthVariants;

export const TALK_CYCLE: Viseme[] = ["half", "open", "wide", "half", "open"];

export function nextViseme(prev: Viseme): Viseme {
  const next = TALK_CYCLE[(TALK_CYCLE.indexOf(prev) + 1) % TALK_CYCLE.length];
  return next;
}

export const TALK_INTERVAL_MIN = 140;
export const TALK_INTERVAL_MAX = 220;
