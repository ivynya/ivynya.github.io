import tinycolor from "tinycolor2";
import { currentLightingConditions } from "./time";
import { writable } from "svelte/store";
import type { LightingConditions } from "$lib/schema/lighting";

export const isLight = writable<boolean>(false);
export const stylesheet = writable<string>();
currentLightingConditions.subscribe((l) => {
  isLight.set(l.isLight);
  stylesheet.set(generateStylesheet(l));
});

export function generateStylesheet(l: LightingConditions): string {
  const // mirrors along l.vertical axis
  vx = -l.v;
  const // mirrors along horizontal axis
  wx = -l.w;

  // Generate scrollbar colors based on light/dark
  const scrollbar = l.isLight
    ? `
		--scrollbar-lightest: ${tinycolor(l.color).darken(10).toHexString()};
		--scrollbar-light: ${tinycolor(l.color).darken(10).toHexString()};
		--scrollbar-dark: ${tinycolor(l.color).darken(15).toHexString()};
		--scrollbar-darkest: ${tinycolor(l.color).darken(10).toHexString()};
	`
    : `
		--scrollbar-lightest: ${tinycolor(l.color).lighten(10).toHexString()};
		--scrollbar-light: ${tinycolor(l.color).lighten(10).toHexString()};
		--scrollbar-dark: ${tinycolor(l.color).lighten(15).toHexString()};
		--scrollbar-darkest: ${tinycolor(l.color).lighten(10).toHexString()};
	`;
  // Generate color l.variations based on gil.ven color
  return `
		--background: ${tinycolor(l.color).toHexString()};
		--background-transparent: ${tinycolor(l.color).toHexString()}00;
		--background-lighter: ${tinycolor(l.color).lighten(4).toHexString()};
		--background-darker: ${tinycolor(l.color).darken(12).toHexString()};

		--border-primary: ${tinycolor(l.color).lighten(5).toHexString()};
		--border-secondary: ${tinycolor(l.color).lighten(2).toHexString()};

		${scrollbar}

		--nm-shadow-md-primary: ${
    shadow(vx, wx, 6, "md")
  } var(--background-lighter);
		--nm-shadow-md-secondary: ${
    shadow(l.v, l.w, 6, "md")
  } var(--background-darker);
	
		--nm-shadow-sm-primary: ${
    shadow(vx, wx, 3, "sm")
  } var(--background-lighter);
		--nm-shadow-sm-secondary: ${
    shadow(l.v, l.w, 3, "sm")
  } var(--background-darker);

		--text-color: ${l.isLight ? "#555" : "#f8f8f2"};
		--text-muted: ${
    l.isLight
      ? tinycolor(l.color).darken(25).toHexString()
      : tinycolor(l.color).lighten(45).toHexString()
  };
		--text-accent: ${
    l.isLight
      ? tinycolor(l.color).darken(25).toHexString()
      : tinycolor(l.color).lighten(30).toHexString()
  };
		
		--border-radius: 10px;
		--border-radius-sm: 5px;
	`;
}

function shadow(v: number, w: number, m: number, sz: "md" | "sm") {
  return `${v * m}px ${w * m}px var(--nm-spread-${sz})`;
}
