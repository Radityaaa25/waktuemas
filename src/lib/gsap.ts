"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function registerGsap(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  registered = true;
}

registerGsap();

export { gsap, ScrollTrigger, SplitText, useGSAP };
