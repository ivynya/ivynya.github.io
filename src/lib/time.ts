import tinycolor from "tinycolor2";
import { writable } from "svelte/store";
import type { HSLColor } from "$lib/schema/hsl";
import type { LightingConditions } from "$lib/schema/lighting";

export const isLocked = writable(false); // prevents automatic updates to time
let _isLocked = false;
export const currentDayPercentage = writable<number>(getCurrentDayPercentage());
export const currentLightingConditions = writable<LightingConditions>();

currentDayPercentage.subscribe((p) => {
  currentLightingConditions.set(getLightingConditions(p));
});
isLocked.subscribe((isLocked) => _isLocked = isLocked);

function getLightingConditions(time: number): LightingConditions {
  const color = getBackgroundColorFromTime(time);
  const shadow = getShadowAngleFromTime(time);
  const isLight = tinycolor(color).isLight();
  return { color, isLight, v: shadow.v, w: shadow.w };
}

function getBackgroundColorFromTime(time: number): string {
  const index = Math.floor(time * 6);
  switch (index) {
    case 0:
      return averageColors(
        { h: 231, s: 15, l: 18 },
        { h: 231, s: 15, l: 18 },
        time * 6 - index,
      );
    case 1:
      return averageColors(
        { h: 38, s: 52, l: 83 },
        { h: 28, s: 47, l: 87 },
        time * 6 - index,
      );
    case 2:
      return averageColors(
        { h: 28, s: 47, l: 87 },
        { h: 0, s: 0, l: 88 },
        time * 6 - index,
      );
    case 3:
      return averageColors(
        { h: 0, s: 0, l: 88 },
        { h: 0, s: 0, l: 88 },
        time * 6 - index,
      );
    case 4:
      return averageColors(
        { h: 0, s: 0, l: 88 },
        { h: 33, s: 63, l: 90 },
        time * 6 - index,
      );
    case 5:
    case 6:
      return averageColors(
        { h: 231, s: 15, l: 18 },
        { h: 231, s: 15, l: 18 },
        time * 6 - index,
      );
    default:
      return "#e0e0e0";
  }
}

// Averages two HSL colors (better method than RGB)
function averageColors(c1: HSLColor, c2: HSLColor, percent: number): string {
  const newColor = {
    h: c1.h + (c2.h - c1.h) * percent,
    s: c1.s + (c2.s - c1.s) * percent,
    l: c1.l + (c2.l - c1.l) * percent,
  };
  return `hsl(${newColor.h}, ${newColor.s}%, ${newColor.l}%)`;
}

function getShadowAngleFromTime(time: number): { v: number; w: number } {
  return {
    v: Math.sin(time * Math.PI * 2),
    w: Math.cos(time * Math.PI * 2),
  };
}

// returns a percentage of the current elapsed time since 12am on the current day
function getCurrentDayPercentage(): number {
  let now = new Date();
  let midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  );
  let elapsed = now.getTime() - midnight.getTime();
  const percent = Math.round((elapsed / (1000 * 60 * 60 * 24)) * 1e3) / 1e3;
  console.log("[LOG] Current day percentage: " + percent);
  return percent;
}

// Automatically updates time, unless locked by user
export function updateCurrentDayPercentage() {
  if (_isLocked) return;
  currentDayPercentage.set(getCurrentDayPercentage());
}
