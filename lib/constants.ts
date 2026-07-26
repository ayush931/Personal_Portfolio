export const SITE = {
  name: "Ayush",
  role: "Full Stack Engineer",
  location: "India",
  github: "https://github.com/ayush931",
} as const;

export const MOTION = {
  ease: {
    chrome: "power3.out",
    snap: "power4.inOut",
  },
  duration: {
    micro: 0.2,
    enter: 0.8,
    reveal: 1.1,
    scene: 1.6,
  },
  stagger: {
    characters: 0.024,
    items: 0.08,
  },
} as const;

export const SCENE = {
  camera: {
    fov: 38,
    near: 0.1,
    far: 100,
    position: [0, 0, 7] as [number, number, number],
  },
  dpr: {
    desktop: [1, 1.75] as [number, number],
    lowPower: 1,
  },
  performance: {
    lowPowerCores: 4,
    targetFps: 30,
  },
};
