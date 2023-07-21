import type { RouterOptions } from "vue-router";
const routes: RouterOptions["routes"] = [
  { path: "/", redirect: "/gsap" },
  { path: "/gsap", component: () => import("@/views/GsapView.vue") },
  { path: "/flip", component: () => import("@/views/FlipView.vue") },
  { path: "/scrollTrigger", component: () => import("@/views/ScrollTriggerView.vue") },
  { path: "/observer", component: () => import("@/views/ObserverView.vue") },
  { path: "/splitText", component: () => import("@/views/SplitTextView.vue") },
];
export default routes; 