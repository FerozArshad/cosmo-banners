'use client';
import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════
  COSMO COSMETICS — PRODUCTION BUILD
  Local assets · Responsive · Category pages
   Hero: 70vh desktop / 85vh mobile+tablet
   ══════════════════════════════════════════════════════════ */

const BANNERS = {
  botanix: "/assets/banners/desktop/botanix.jpg",
  delicious: "/assets/banners/desktop/delicious.jpg",
  glutathione: "/assets/banners/desktop/glutathione.jpg",
  hair: "/assets/banners/desktop/hair.jpg",
  hijab: "/assets/banners/desktop/hijab.jpg",
  q10: "/assets/banners/desktop/q10.jpg",
  shea: "/assets/banners/desktop/shea.jpg",
  sunCare: "/assets/banners/desktop/suncare.jpg",
  urea: "/assets/banners/desktop/urea.jpg",
  antiPerspirant: "/assets/banners/desktop/anti.jpg",
  men: "/assets/banners/desktop/anti.jpg",
};
const MOBILE_BANNERS = {
  botanix: "/assets/banners/mobile/botanix.jpg",
  delicious: "/assets/banners/mobile/delicious.jpg",
  glutathione: "/assets/banners/mobile/glutathione.jpg",
  hair: "/assets/banners/mobile/hair.jpg",
  hijab: "/assets/banners/mobile/hijab.jpg",
  q10: "/assets/banners/mobile/q10.jpg",
  shea: "/assets/banners/mobile/shea.jpg",
  sunCare: "/assets/banners/mobile/suncare.jpg",
  urea: "/assets/banners/mobile/urea.jpg",
  antiPerspirant: "/assets/banners/mobile/men.jpg",
  men: "/assets/banners/mobile/men.jpg",
};
const THUMBS = {
  botanix: "/assets/thumbs/botanix.jpg",
  delicious: "/assets/thumbs/delicious.jpg",
  glutathione: "/assets/thumbs/glutathione.jpg",
  hair: "/assets/thumbs/hair.jpg",
  hijab: "/assets/thumbs/hijab.jpg",
  q10: "/assets/thumbs/q10.jpg",
  shea: "/assets/thumbs/shea.jpg",
  sunCare: "/assets/thumbs/suncare.jpg",
  urea: "/assets/thumbs/urea.jpg",
  men: "/assets/thumbs/men.jpg",
};
const bannerByDevice = (key, isMobileLike) => (
  isMobileLike ? (MOBILE_BANNERS[key] || BANNERS[key]) : BANNERS[key]
);
const LOGO = "/assets/logos/cosmo-main.png";
const AR = { desktop: 1530 / 410, mobile: 430 / 480 };
const bannerBoxStyle = (isMobileLike) => ({
  position: "relative",
  borderRadius: isMobileLike ? 12 : 20,
  overflow: "hidden",
  width: "100%",
  aspectRatio: isMobileLike ? `${430} / ${480}` : `${1530} / ${410}`,
  background: "#F2F0ED",
  boxShadow: "0 4px 24px rgba(0,0,0,.08)",
});
const bannerImgStyle = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  objectPosition: "center",
  display: "block",
};

const C = {
  brand: "#2E2A6E", brandDark: "#1E1A50", brandLight: "#4842A8",
  brandFaint: "#EEEDFA", brandMist: "#F6F5FF",
  accent: "#E25D78", accentLight: "#FFF0F3",
  gold: "#C9A44C", cream: "#FFFBF7",
  white: "#FFF", off: "#FAFAF8",
  g50: "#F9F8F6", g100: "#F2F0ED", g200: "#E4E1DC",
  g300: "#CCC8C2", g400: "#9B968E", g500: "#7A756E",
  g600: "#5C5850", g700: "#3E3B35", g800: "#2A2722",
  footerBg: "#2A2722", footerTxt: "#A09B94",
  green: "#2D6B4F", greenL: "#E8F5EE",
  pink: "#E25D78", pinkL: "#FFF0F3",
  orange: "#E8972A", orangeL: "#FFF8E6",
  blue: "#2E5B8A", blueL: "#EBF2FA",
  teal: "#1B7A6A", tealL: "#E6F7F4",
  purple: "#8B5EA0", purpleL: "#F3E8FF",
};

const useVP = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  useEffect(() => { const h = () => setW(window.innerWidth); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h); }, []);
  return { w, mob: w < 768, tab: w >= 768 && w < 1024, desk: w >= 1024 };
};

const currencies = [
  { code: "AED", sym: "د.إ", flag: "🇦🇪" },
  { code: "USD", sym: "$", flag: "🇺🇸" },
  { code: "MYR", sym: "RM", flag: "🇲🇾" },
  { code: "SGD", sym: "S$", flag: "🇸🇬" },
  { code: "JPY", sym: "¥", flag: "🇯🇵" },
];
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "zh", name: "简体中文", flag: "🇨🇳" },
];

// ─── Icons ───
const Ic = {
  Search: ({ s = 18, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  Bag: ({ s = 18, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>,
  User: ({ s = 18, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  Heart: ({ s = 18, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
  Star: ({ s = 12, f = true }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={f ? "#C9A44C" : "none"} stroke="#C9A44C" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  Arr: ({ s = 14, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  ChevD: ({ s = 12, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>,
  ChevL: ({ s = 18, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>,
  ChevR: ({ s = 18, c = "currentColor" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Back: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
  Truck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Leaf: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66L8 17c4-4 8.5-5.5 11-6 .5-4-1-8-2-10z" /></svg>,
  Award: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
  Globe: ({ s = 14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  Insta: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  Tt: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.4a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.28 6.34 6.34 0 009.49 21.62 6.34 6.34 0 0015.83 15.28V9.15a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.58z" /></svg>,
  Fb: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  Yt: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" /></svg>,
};
const Stars = ({ r, s = 11 }) => <span style={{ display: "inline-flex", gap: 1 }}>{[1, 2, 3, 4, 5].map(i => <Ic.Star key={i} s={s} f={i <= Math.round(r)} />)}</span>;

// ─── Concern SVG Icons ───
const CIc = {
  Drop: ({ s = 28, c }) => <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M32 8C32 8 16 24 16 38a16 16 0 0032 0C48 24 32 8 32 8z" /><path d="M28 38a4 4 0 004 4" opacity=".5" /></svg>,
  Pore: ({ s = 28, c }) => <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="32" cy="32" r="20" /><circle cx="32" cy="32" r="3" fill={c} stroke="none" /><circle cx="40" cy="26" r="2" fill={c} stroke="none" opacity=".6" /><circle cx="26" cy="38" r="2" fill={c} stroke="none" opacity=".4" /></svg>,
  Face: ({ s = 28, c }) => <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M32 12C22 12 16 20 16 32c0 12 6 20 16 20s16-8 16-20-6-20-16-20z" /><path d="M24 28q2-2 4 0M36 28q2-2 4 0" /><path d="M26 40q6 4 12 0" /></svg>,
  Hrt: ({ s = 28, c }) => <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M32 52C32 52 12 38 12 24c0-8 6-14 14-14 4 0 6 4 6 4s2-4 6-4c8 0 14 6 14 14 0 14-20 28-20 28z" /></svg>,
  Sun: ({ s = 28, c }) => <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><circle cx="32" cy="32" r="10" /><line x1="32" y1="8" x2="32" y2="14" /><line x1="32" y1="50" x2="32" y2="56" /><line x1="8" y1="32" x2="14" y2="32" /><line x1="50" y1="32" x2="56" y2="32" /><line x1="15" y1="15" x2="19" y2="19" /><line x1="45" y1="45" x2="49" y2="49" /><line x1="49" y1="15" x2="45" y2="19" /><line x1="19" y1="45" x2="15" y2="49" /></svg>,
  Hair: ({ s = 28, c }) => <svg width={s} height={s} viewBox="0 0 64 64" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M32 14C22 14 16 22 16 32v4M48 36v-4C48 22 42 14 32 14" /><path d="M20 28q-2 8-2 16M26 26q-2 10-2 20M38 26q2 10 2 20M44 28q2 8 2 16" opacity=".6" /></svg>,
};
const concerns = [
  { name: "Dryness", I: CIc.Drop, desc: "Deep hydration & barrier repair" },
  { name: "Oily Skin", I: CIc.Pore, desc: "Oil control & mattifying" },
  { name: "Anti-Aging", I: CIc.Face, desc: "Firming & collagen boost" },
  { name: "Sensitivity", I: CIc.Hrt, desc: "Gentle soothing formulas" },
  { name: "Brightening", I: CIc.Sun, desc: "Glow & even skin tone" },
  { name: "Hair Fall", I: CIc.Hair, desc: "Strengthen & nourish" },
];

// ─── Category Data ───
const CAT = {
  "hair": { name: "Hair Care", banner: "hair", thumb: THUMBS.hair, color: "#1A3050", sub: ["Shampoo", "Conditioner", "Hair Mask", "Hair Oil", "Hijab Care", "Keratin"], desc: "Premium quality hair care for all types" },
  "bath-body": { name: "Bath & Body", banner: "shea", thumb: THUMBS.shea, color: "#D46A2E", sub: ["Body Lotion", "Body Wash", "Scrubs", "Hand Cream", "Shower Gel"], desc: "Luxurious body care for every skin type" },
  "delicious": { name: "Delicious", banner: "delicious", thumb: THUMBS.delicious, color: C.pink, sub: ["Body Lotion", "Shower Gel", "Body Mist", "Hand Cream"], desc: "Gourmet skin treats crafted to care" },
  "botanix": { name: "Botanix", banner: "botanix", thumb: THUMBS.botanix, color: C.green, sub: ["Shampoo", "Face & Body Scrub", "Hair & Scalp Mask"], desc: "100% natural tea tree range" },
  "urea": { name: "Urea Advanced", banner: "urea", thumb: THUMBS.urea, color: C.blue, sub: ["Body Lotion", "Body Wash", "Face Cream", "Hand Cream"], desc: "5% urea repair for extremely dry skin" },
  "anti-perspirants": { name: "Anti-Perspirants", banner: "antiPerspirant", thumb: THUMBS.men, color: C.teal, sub: ["Invisible Dry", "Pure Sport", "Clean Comfort", "Fresh Natural", "Ice Dive"], desc: "48hr 6-in-1 protection" },
  "glutathione": { name: "Glutathione", banner: "glutathione", thumb: THUMBS.glutathione, color: C.purple, sub: ["Body Wash", "Body Cream", "Face Wash"], desc: "Bright & youthful with 10X Vitamin C" },
  "q10": { name: "Q10 Coenzyme", banner: "q10", thumb: THUMBS.q10, color: "#1A3A6B", sub: ["Body Milk", "Body Oil", "Hand Cream", "Body Cream"], desc: "Shine beyond with Coenzyme Q10" },
  "suncare": { name: "Sun Care", banner: "sunCare", thumb: THUMBS.sunCare, color: C.orange, sub: ["Sunscreen Cream", "Sunblock Lotion", "Sunscreen Spray", "Sport Sunblock"], desc: "Broad spectrum UVA + UVB protection" },
  "hijab": { name: "Hijab Care", banner: "hijab", thumb: THUMBS.hijab, color: C.g700, sub: ["Shampoo", "Conditioner", "Hair Mask"], desc: "Complete hair care under hijab" },
  "men": { name: "Men Advanced", banner: "men", thumb: THUMBS.men, color: C.teal, sub: ["Deodorant", "Body Spray", "Face Wash"], desc: "Stay fresh, feel confident" },
  "shea-scrub": { name: "Shea Sugar Scrub", banner: "shea", thumb: THUMBS.shea, color: "#D46A2E", sub: ["Papaya", "Vitamin C", "Dragon Fruit", "Blue Lagoon"], desc: "Scrub, smile, shine!" },
};

const PRODUCTS = [
  { id: 1, name: "Cherry Blossom Body Lotion", pr: { AED: 13, USD: 3.5, MYR: 16, SGD: 4.7, JPY: 530 }, rating: 4.8, rev: 342, badge: "Best Seller", cats: ["bath-body", "delicious"] },
  { id: 2, name: "5X Ceramide Barrier Moisturizer", pr: { AED: 19, USD: 5.2, MYR: 23, SGD: 7, JPY: 780 }, oldPr: { AED: 24, USD: 6.5, MYR: 29, SGD: 8.7, JPY: 975 }, rating: 4.9, rev: 567, badge: "Top Rated", cats: ["bath-body"] },
  { id: 3, name: "Tea Tree Clarifying Shampoo", pr: { AED: 15, USD: 4.1, MYR: 18, SGD: 5.5, JPY: 615 }, rating: 4.7, rev: 289, cats: ["hair", "botanix"] },
  { id: 4, name: "Glutathione Serum Body Wash", pr: { AED: 16, USD: 4.4, MYR: 19, SGD: 5.8, JPY: 656 }, rating: 4.6, rev: 198, badge: "New", cats: ["bath-body", "glutathione"] },
  { id: 5, name: "SPF 50+ Sunscreen Cream", pr: { AED: 18, USD: 4.9, MYR: 22, SGD: 6.5, JPY: 740 }, rating: 4.8, rev: 412, badge: "Best Seller", cats: ["suncare"] },
  { id: 6, name: "Dragon Fruit Shea Sugar Scrub", pr: { AED: 14, USD: 3.8, MYR: 17, SGD: 5.1, JPY: 574 }, rating: 4.7, rev: 256, cats: ["bath-body", "shea-scrub"] },
  { id: 7, name: "Urea 5% Repair Body Lotion", pr: { AED: 15, USD: 4.1, MYR: 18, SGD: 5.5, JPY: 615 }, rating: 4.8, rev: 312, badge: "Best Seller", cats: ["urea", "bath-body"] },
  { id: 8, name: "Invisible Dry 6-in-1 Spray", pr: { AED: 12, USD: 3.3, MYR: 14.5, SGD: 4.3, JPY: 492 }, rating: 4.5, rev: 178, cats: ["anti-perspirants", "men"] },
  { id: 9, name: "Keratin Anti-Hair Fall Shampoo", pr: { AED: 14, USD: 3.8, MYR: 17, SGD: 5.1, JPY: 574 }, rating: 4.6, rev: 245, cats: ["hair"] },
  { id: 10, name: "Hijab Complete Care Shampoo", pr: { AED: 13, USD: 3.5, MYR: 16, SGD: 4.7, JPY: 533 }, rating: 4.7, rev: 189, badge: "New", cats: ["hair", "hijab"] },
  { id: 11, name: "Q10 Body Milk Vitamin C + Collagen", pr: { AED: 15, USD: 4.1, MYR: 18, SGD: 5.5, JPY: 615 }, rating: 4.6, rev: 167, cats: ["q10", "bath-body"] },
  { id: 12, name: "Lavender Soothing Body Lotion", pr: { AED: 13, USD: 3.5, MYR: 16, SGD: 4.7, JPY: 533 }, rating: 4.5, rev: 298, cats: ["bath-body"] },
  { id: 13, name: "Cosmo Delicious Strawberry Treat", pr: { AED: 12, USD: 3.3, MYR: 14.5, SGD: 4.3, JPY: 492 }, rating: 4.8, rev: 321, badge: "Best Seller", cats: ["delicious", "bath-body"] },
  { id: 14, name: "Botanix Face & Body Scrub", pr: { AED: 16, USD: 4.4, MYR: 19, SGD: 5.8, JPY: 656 }, rating: 4.5, rev: 142, cats: ["botanix", "bath-body"] },
  { id: 15, name: "Protein Hair Mask Keratin", pr: { AED: 14, USD: 3.8, MYR: 17, SGD: 5.1, JPY: 574 }, rating: 4.7, rev: 201, cats: ["hair"] },
  { id: 16, name: "Sunscreen Spray SPF 50+", pr: { AED: 20, USD: 5.5, MYR: 24, SGD: 7.3, JPY: 820 }, rating: 4.6, rev: 156, cats: ["suncare"] },
];

const navItems = [
  { key: "all", label: "All Products" },
  { key: "hair", label: "Hair" },
  { key: "bath-body", label: "Bath & Body" },
  { key: "delicious", label: "Delicious" },
  { key: "botanix", label: "Botanix" },
  { key: "urea", label: "Urea" },
  { key: "best-sellers", label: "Best Sellers" },
  { key: "anti-perspirants", label: "Anti-Perspirants" },
];

const testimonials = [
  { name: "Sarah M.", loc: "Dubai", text: "The Urea Lotion transformed my dry skin — smooth and moisturized all day!", r: 5, prod: "Urea Repair", av: "S" },
  { name: "Fatima K.", loc: "Abu Dhabi", text: "Hijab hair care is a game-changer! Fresh and healthy hair always.", r: 5, prod: "Hijab Shampoo", av: "F" },
  { name: "Ahmed R.", loc: "Sharjah", text: "No white cast sunscreen. Lightweight, perfect for UAE climate.", r: 5, prod: "SPF 50+", av: "A" },
];

const font = "'Libre Franklin', system-ui, sans-serif";
const serif = "'Cormorant Garamond', Georgia, serif";
const wrap = (mob) => ({ maxWidth: 1380, margin: "0 auto", padding: mob ? "0 16px" : "0 28px" });

// ─── Dropdown ───
const DD = ({ trigger, items, open, toggle, close }) => {
  const ref = useRef(null);
  useEffect(() => { const h = e => { if (ref.current && !ref.current.contains(e.target)) close(); }; if (open) document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, [open, close]);
  return (<div ref={ref} style={{ position: "relative" }}>
    <button onClick={toggle} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, padding: 0, color: "inherit", fontFamily: font, fontSize: "inherit", fontWeight: "inherit" }}>{trigger}</button>
    {open && <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: C.white, borderRadius: 12, minWidth: 180, boxShadow: "0 12px 40px rgba(0,0,0,.12)", border: `1px solid ${C.g100}`, overflow: "hidden", zIndex: 200, animation: "fadeSlide .15s ease" }}>{items}</div>}
  </div>);
};

// ═══ TOP BAR ═══
const TopBar = ({ cur, setCur, lang, setLang }) => {
  const { mob } = useVP();
  const [co, setCo] = useState(false);
  const [lo, setLo] = useState(false);
  const [pi, setPi] = useState(0);
  const promos = ["🚚 Free GCC Delivery Over AED 99", "💝 Mother's Day — 20% Off", "✨ Buy 2 Get 5% · Buy 4 Get 10%"];
  useEffect(() => { const t = setInterval(() => setPi(i => (i + 1) % promos.length), 4000); return () => clearInterval(t); }, []);
  const cc = currencies.find(c => c.code === cur);
  const ll = languages.find(l => l.code === lang);

  if (mob) return <div style={{ background: C.brand, color: C.white, textAlign: "center", padding: "8px 16px", fontSize: 11.5, fontFamily: font, fontWeight: 600 }}>{promos[pi]}</div>;

  return (
    <div style={{ background: C.brand, color: C.white }}>
      <div style={{ ...wrap(false), display: "flex", alignItems: "center", justifyContent: "space-between", height: 36, fontSize: 12, fontFamily: font, fontWeight: 500 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <DD open={co} toggle={() => { setCo(!co); setLo(false); }} close={() => setCo(false)}
            trigger={<>{cc.flag} {cc.code} <Ic.ChevD s={10} c="rgba(255,255,255,.7)" /></>}
            items={<div style={{ padding: "4px 0" }}>{currencies.map(c => (
              <button key={c.code} onClick={() => { setCur(c.code); setCo(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 14px", border: "none", background: cur === c.code ? C.brandFaint : "transparent", cursor: "pointer", fontSize: 13, fontFamily: font, color: C.g800 }}>
                {c.flag} <b>{c.code}</b> <span style={{ color: C.g400 }}>({c.sym})</span>
                {cur === c.code && <span style={{ marginLeft: "auto", color: C.brand }}>✓</span>}
              </button>))}</div>} />
          <div style={{ width: 1, height: 12, background: "rgba(255,255,255,.2)" }} />
          <DD open={lo} toggle={() => { setLo(!lo); setCo(false); }} close={() => setLo(false)}
            trigger={<><Ic.Globe s={13} /> {ll.name} <Ic.ChevD s={10} c="rgba(255,255,255,.7)" /></>}
            items={<div style={{ padding: "4px 0" }}>{languages.map(l => (
              <button key={l.code} onClick={() => { setLang(l.code); setLo(false); }} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 14px", border: "none", background: lang === l.code ? C.brandFaint : "transparent", cursor: "pointer", fontSize: 13, fontFamily: font, color: C.g800 }}>
                {l.flag} <span style={{ fontWeight: lang === l.code ? 700 : 400 }}>{l.name}</span>
                {lang === l.code && <span style={{ marginLeft: "auto", color: C.brand }}>✓</span>}
              </button>))}</div>} />
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 600 }}>{promos[pi]}</div>
        <div style={{ display: "flex", gap: 18, fontSize: 11.5, color: "rgba(255,255,255,.7)" }}>
          {["Track Order", "Help", "Store Locator"].map(t => <a key={t} href="#" style={{ color: "inherit", textDecoration: "none" }}>{t}</a>)}
        </div>
      </div>
    </div>
  );
};

// ═══ HEADER ═══
const Header = ({ page, go }) => {
  const { mob, tab } = useVP();
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  const [hn, setHn] = useState(null);
  useEffect(() => { const h = () => setSc(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: sc ? "rgba(255,255,255,.98)" : C.white, backdropFilter: sc ? "blur(12px)" : "none", boxShadow: sc ? "0 2px 20px rgba(0,0,0,.06)" : "none", transition: "all .3s" }}>
      <div style={{ ...wrap(mob), display: "flex", alignItems: "center", justifyContent: "space-between", height: mob ? 56 : 64 }}>
        {mob && <button onClick={() => setMo(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: C.g700 }}><Ic.Menu /></button>}
        <a href="#" onClick={e => { e.preventDefault(); go("home"); }} style={{ textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Cosmo Cosmetics" style={{ height: mob ? 32 : 40, width: "auto" }} />
        </a>
        {!mob && (
          <div style={{ flex: 1, maxWidth: tab ? 300 : 460, margin: "0 32px", position: "relative" }}>
            <input type="text" placeholder="Search products, ranges..." style={{ width: "100%", padding: "10px 40px 10px 16px", border: `1.5px solid ${C.g200}`, borderRadius: 50, fontSize: 13, fontFamily: font, outline: "none", background: C.g50, boxSizing: "border-box" }}
              onFocus={e => { e.target.style.borderColor = C.brand; e.target.style.background = C.white; }}
              onBlur={e => { e.target.style.borderColor = C.g200; e.target.style.background = C.g50; }} />
            <button style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: C.g400 }}><Ic.Search s={16} /></button>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: mob ? 10 : 8 }}>
          {mob && <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: C.g700 }}><Ic.Search s={20} /></button>}
          {!mob && <>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center", gap: 5, color: C.g700, fontFamily: font, fontSize: 12.5, fontWeight: 500 }}><Ic.User s={18} />{!tab && "Account"}</button>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 8px", display: "flex", alignItems: "center", gap: 5, color: C.g700, fontFamily: font, fontSize: 12.5, fontWeight: 500 }}><Ic.Heart s={18} />{!tab && "Wishlist"}</button>
          </>}
          <button style={{ background: C.brand, border: "none", cursor: "pointer", padding: mob ? "7px 12px" : "8px 16px", display: "flex", alignItems: "center", gap: 6, color: C.white, fontFamily: font, fontSize: 12, fontWeight: 600, borderRadius: 50 }}>
            <Ic.Bag s={16} c={C.white} />{!mob && "Cart"}<span style={{ background: C.accent, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>2</span>
          </button>
        </div>
      </div>
      {!mob && (
        <nav style={{ ...wrap(false), display: "flex", alignItems: "center", borderTop: `1px solid ${C.g100}`, height: 42 }}>
          {navItems.map((ni, idx) => {
            const cat = CAT[ni.key];
            return (
              <div key={ni.key} style={{ position: "relative" }} onMouseEnter={() => setHn(idx)} onMouseLeave={() => setHn(null)}>
                <a href="#" onClick={e => { e.preventDefault(); go(ni.key); setHn(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 14px", height: 42, fontFamily: font, fontSize: 13, fontWeight: 600, color: hn === idx || page === ni.key ? C.brand : C.g700, textDecoration: "none", borderBottom: hn === idx || page === ni.key ? `2px solid ${C.brand}` : "2px solid transparent" }}>
                  {ni.label}{cat?.sub && <Ic.ChevD s={10} c={hn === idx ? C.brand : C.g400} />}
                </a>
                {cat?.sub && hn === idx && (
                  <div style={{ position: "absolute", top: 42, left: 0, background: C.white, borderRadius: "0 0 12px 12px", boxShadow: "0 12px 40px rgba(0,0,0,.1)", border: `1px solid ${C.g100}`, borderTop: `2px solid ${C.brand}`, width: tab ? 380 : 540, zIndex: 200, overflow: "hidden", display: "flex" }}>
                    <div style={{ flex: "0 0 180px", padding: "12px 0" }}>
                      {cat.sub.map(s => <a key={s} href="#" style={{ display: "block", padding: "8px 18px", fontFamily: font, fontSize: 13, color: C.g600, textDecoration: "none" }} onMouseEnter={e => { e.target.style.background = C.brandFaint; e.target.style.color = C.brand; }} onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.g600; }}>{s}</a>)}
                      <div style={{ padding: "8px 18px", marginTop: 4 }}>
                        <a href="#" onClick={e => { e.preventDefault(); go(ni.key); setHn(null); }} style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: C.brand, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>View All {ni.label} <Ic.Arr s={12} c={C.brand} /></a>
                      </div>
                    </div>
                    <div style={{ flex: 1, overflow: "hidden", background: "#F2F0ED" }}>
                      <img src={bannerByDevice(cat.banner, false)} alt={cat.name} style={bannerImgStyle} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}
      {mob && mo && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} onClick={() => setMo(false)} />
          <div style={{ position: "relative", width: 300, maxWidth: "85vw", background: C.white, height: "100%", overflowY: "auto", boxShadow: "4px 0 24px rgba(0,0,0,.1)", animation: "slideIn .2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${C.g100}` }}>
              <img src={LOGO} alt="Cosmo" style={{ height: 28 }} />
              <button onClick={() => setMo(false)} style={{ background: "none", border: "none", cursor: "pointer", color: C.g600 }}><Ic.X /></button>
            </div>
            <div style={{ padding: "12px 0" }}>
              {navItems.map(ni => (
                <a key={ni.key} href="#" onClick={e => { e.preventDefault(); go(ni.key); setMo(false); }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", fontFamily: font, fontSize: 15, fontWeight: 600, color: page === ni.key ? C.brand : C.g700, textDecoration: "none", borderLeft: page === ni.key ? `3px solid ${C.brand}` : "3px solid transparent", background: page === ni.key ? C.brandFaint : "transparent" }}>
                  {ni.label}<Ic.ChevR s={16} c={C.g300} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// ═══ HERO — full width, taller ═══
const Hero = () => {
  const { mob, tab } = useVP();
  const [c, setC] = useState(0);
  const isMobileLike = mob || tab;
  const slides = [
    { b: bannerByDevice("delicious", isMobileLike), n: "Delicious" },
    { b: bannerByDevice("botanix", isMobileLike), n: "Botanix" },
    { b: bannerByDevice("sunCare", isMobileLike), n: "Sun Care" },
    { b: bannerByDevice("glutathione", isMobileLike), n: "Glutathione" },
    { b: bannerByDevice("urea", isMobileLike), n: "Urea" },
  ];
  useEffect(() => { const t = setInterval(() => setC(i => (i + 1) % slides.length), 5000); return () => clearInterval(t); }, []);

  return (
    <section style={{ width: "100%" }}>
      <div style={{
        position: "relative",
        width: "100%",
        height: isMobileLike ? "78vh" : "62vh",
        maxHeight: isMobileLike ? 820 : 720,
        minHeight: isMobileLike ? 520 : 520,
        overflow: "hidden",
        background: C.g100,
      }}>
        <img src={slides[c].b} alt={slides[c].n} style={{ ...bannerImgStyle, transition: "opacity .5s" }} />
        {!mob && <>
          <button onClick={() => setC((c - 1 + slides.length) % slides.length)} style={{ position: "absolute", top: "50%", left: 20, transform: "translateY(-50%)", background: "rgba(255,255,255,.92)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.brand, boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}><Ic.ChevL s={22} /></button>
          <button onClick={() => setC((c + 1) % slides.length)} style={{ position: "absolute", top: "50%", right: 20, transform: "translateY(-50%)", background: "rgba(255,255,255,.92)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.brand, boxShadow: "0 4px 12px rgba(0,0,0,.1)" }}><Ic.ChevR s={22} /></button>
        </>}
        <div style={{ position: "absolute", bottom: mob ? 12 : 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, background: "rgba(255,255,255,.88)", padding: "7px 14px", borderRadius: 30 }}>
          {slides.map((_, i) => <button key={i} onClick={() => setC(i)} style={{ width: c === i ? 24 : 8, height: 8, borderRadius: 8, border: "none", background: c === i ? C.brand : C.g300, cursor: "pointer", transition: "all .3s" }} />)}
        </div>
      </div>
    </section>
  );
};

// ═══ TRUST BAR ═══
const TrustBar = () => {
  const { mob } = useVP();
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.g100}`, overflow: "auto" }}>
      <div style={{ ...wrap(mob), padding: mob ? "12px 16px" : "16px 28px", display: "flex", justifyContent: mob ? "flex-start" : "center", gap: mob ? 24 : 48, minWidth: mob ? "max-content" : "auto" }}>
        {[[<Ic.Truck />, "Free Shipping 99+"], [<Ic.Shield />, "Dermatologist Tested"], [<Ic.Leaf />, "Cruelty Free"], [<Ic.Award />, "170+ Countries"]].map(([ic, t], i) =>
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: font, fontSize: mob ? 11.5 : 12.5, fontWeight: 600, color: C.g500, whiteSpace: "nowrap" }}><span style={{ color: C.brand }}>{ic}</span>{t}</div>
        )}
      </div>
    </div>
  );
};

const SH = ({ label, title, sub }) => { const { mob } = useVP(); return (<div style={{ textAlign: "center", marginBottom: mob ? 24 : 40 }}>{label && <p style={{ fontFamily: font, fontSize: 11, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: C.accent, marginBottom: 8 }}>{label}</p>}<h2 style={{ fontFamily: serif, fontSize: mob ? 26 : 34, fontWeight: 700, color: C.brand, lineHeight: 1.15, marginBottom: sub ? 8 : 0 }}>{title}</h2>{sub && <p style={{ fontFamily: font, fontSize: mob ? 13 : 14, color: C.g400, maxWidth: 480, margin: "0 auto" }}>{sub}</p>}</div>); };

// ═══ PRODUCT CARD ═══
const PCard = ({ name, pr, oldPr, rating, rev, badge, cur }) => {
  const { mob } = useVP();
  const [hov, setHov] = useState(false);
  const cc = currencies.find(c => c.code === cur);
  const p = pr[cur] || pr.AED;
  const op = oldPr ? (oldPr[cur] || oldPr.AED) : null;
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: C.white, borderRadius: 12, overflow: "hidden", border: `1px solid ${hov ? C.brand + "28" : C.g100}`, transition: "all .3s", transform: hov && !mob ? "translateY(-4px)" : "none", boxShadow: hov && !mob ? `0 12px 36px ${C.brand}10` : "0 1px 4px rgba(0,0,0,.03)" }}>
      <div style={{ position: "relative", background: C.g50, height: mob ? 180 : 210, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ width: 80, height: 120, borderRadius: 8, background: `linear-gradient(145deg, ${C.brandFaint}, ${C.g100})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={LOGO} alt="COSMO" style={{ height: 20, opacity: .5 }} />
        </div>
        {badge && <span style={{ position: "absolute", top: 8, left: 8, background: badge === "New" ? C.green : badge === "Top Rated" ? C.gold : C.accent, color: C.white, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 30, fontFamily: font }}>{badge}</span>}
        <button style={{ position: "absolute", top: 8, right: 8, background: C.white, border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,.06)" }}><Ic.Heart s={13} c={C.g300} /></button>
        {!mob && <button style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: C.brand, color: C.white, border: "none", padding: "10px", fontSize: 11.5, fontWeight: 700, cursor: "pointer", fontFamily: font, letterSpacing: ".05em", transform: `translateY(${hov ? 0 : "100%"})`, transition: "transform .3s" }}>ADD TO CART</button>}
      </div>
      <div style={{ padding: mob ? "10px 12px 14px" : "12px 14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}><Stars r={rating} s={10} /><span style={{ fontFamily: font, fontSize: 10.5, color: C.g400 }}>({rev})</span></div>
        <h3 style={{ fontFamily: font, fontSize: mob ? 12.5 : 13, fontWeight: 600, color: C.g800, lineHeight: 1.35, marginBottom: 8, minHeight: mob ? 32 : 36 }}>{name}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontFamily: font, fontSize: mob ? 14 : 15, fontWeight: 700, color: C.brand }}>{cc.sym} {p.toFixed(2)}</span>
          {op && <span style={{ fontFamily: font, fontSize: 11.5, color: C.g400, textDecoration: "line-through" }}>{cc.sym} {op.toFixed(2)}</span>}
        </div>
        {mob && <button style={{ width: "100%", marginTop: 8, background: C.brand, color: C.white, border: "none", padding: "9px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: font }}>Add to Cart</button>}
      </div>
    </div>
  );
};

// ═══ BESTSELLERS ═══
const Bestsellers = ({ cur }) => { const { mob, tab } = useVP(); return (<section style={{ padding: mob ? "40px 0" : "64px 0", background: C.white }}><div style={wrap(mob)}><SH label="Most Loved" title="Bestsellers" sub="Trusted by 10M+ customers worldwide" /><div style={{ display: "grid", gridTemplateColumns: `repeat(${mob ? 2 : tab ? 3 : 4}, 1fr)`, gap: mob ? 10 : 20 }}>{PRODUCTS.slice(0, mob ? 4 : 8).map(p => <PCard key={p.id} {...p} cur={cur} />)}</div><div style={{ textAlign: "center", marginTop: mob ? 24 : 40 }}><button style={{ background: "transparent", border: `2px solid ${C.brand}`, color: C.brand, borderRadius: 50, padding: mob ? "11px 24px" : "12px 32px", fontSize: 13, fontWeight: 700, fontFamily: font, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>View All <Ic.Arr s={13} /></button></div></div></section>); };

// ═══ OUR BRANDS (compact) ═══
const BrandsSection = ({ go }) => {
  const { mob, tab } = useVP();
  const ranges = [
    { key: "botanix", name: "Botanix", color: C.green, thumb: THUMBS.botanix },
    { key: "delicious", name: "Delicious", color: C.pink, thumb: THUMBS.delicious },
    { key: "glutathione", name: "Glutathione", color: C.purple, thumb: THUMBS.glutathione },
    { key: "hair", name: "Hair Naturals", color: "#1A3050", thumb: THUMBS.hair },
    { key: "hijab", name: "Hijab Care", color: C.g700, thumb: THUMBS.hijab },
    { key: "q10", name: "Q10", color: "#1A3A6B", thumb: THUMBS.q10 },
    { key: "shea-scrub", name: "Shea Scrub", color: "#D46A2E", thumb: THUMBS.shea },
    { key: "suncare", name: "Sun Care", color: C.orange, thumb: THUMBS.sunCare },
    { key: "urea", name: "Urea", color: C.blue, thumb: THUMBS.urea },
    { key: "anti-perspirants", name: "Men", color: C.teal, thumb: THUMBS.men },
  ];
  return (
    <section style={{ padding: mob ? "40px 0" : "56px 0", background: C.off }}>
      <div style={wrap(mob)}>
        <SH label="Explore Our World" title="Our Brands" />
        {mob ? (
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, WebkitOverflowScrolling: "touch" }}>
            {ranges.map(r => (
              <a key={r.key} href="#" onClick={e => { e.preventDefault(); go(r.key); }} style={{ flex: "0 0 110px", textDecoration: "none", textAlign: "center" }}>
                <div style={{ width: 110, height: 110, borderRadius: 16, overflow: "hidden", border: `2px solid ${C.g100}`, marginBottom: 6 }}><img src={r.thumb} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                <span style={{ fontFamily: font, fontSize: 11.5, fontWeight: 600, color: r.color }}>{r.name}</span>
              </a>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
            {ranges.map(r => {
              const [hov, setHov] = useState(false);
              return (
                <a key={r.key} href="#" onClick={e => { e.preventDefault(); go(r.key); }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{ textDecoration: "none", borderRadius: 14, overflow: "hidden", background: C.white, border: `1px solid ${C.g100}`, transition: "all .3s", transform: hov ? "translateY(-4px)" : "none", boxShadow: hov ? `0 12px 32px ${r.color}20` : "none" }}>
                  <div style={{ height: tab ? 80 : 100, overflow: "hidden" }}><img src={r.thumb} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s", transform: hov ? "scale(1.06)" : "scale(1)" }} /></div>
                  <div style={{ padding: "10px 12px", textAlign: "center", borderTop: `3px solid ${r.color}` }}><span style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: r.color }}>{r.name}</span></div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

// ═══ CONCERNS ═══
const ConcernsSection = () => { const { mob } = useVP(); return (<section style={{ padding: mob ? "40px 0" : "64px 0", background: C.white }}><div style={wrap(mob)}><SH label="Targeted Solutions" title="Shop by Skin Concern" /><div style={{ display: "grid", gridTemplateColumns: `repeat(${mob ? 3 : 6}, 1fr)`, gap: mob ? 8 : 14 }}>{concerns.map((sc, i) => { const [hov, setHov] = useState(false); return (<a key={i} href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: hov && !mob ? C.brand : C.white, border: `1px solid ${hov && !mob ? C.brand : C.g200}`, borderRadius: mob ? 10 : 12, padding: mob ? "16px 8px" : "28px 14px 24px", textAlign: "center", cursor: "pointer", transition: "all .3s", transform: hov && !mob ? "translateY(-3px)" : "none", boxShadow: hov && !mob ? `0 10px 28px ${C.brand}20` : "none", textDecoration: "none", position: "relative", overflow: "hidden" }}><div style={{ width: mob ? 44 : 60, height: mob ? 44 : 60, borderRadius: "50%", background: hov && !mob ? "rgba(255,255,255,.12)" : C.brandFaint, margin: "0 auto", marginBottom: mob ? 8 : 16, display: "flex", alignItems: "center", justifyContent: "center" }}><sc.I s={mob ? 22 : 28} c={hov && !mob ? C.white : C.brand} /></div><div style={{ fontFamily: serif, fontSize: mob ? 13 : 17, fontWeight: 700, color: hov && !mob ? C.white : C.brand, marginBottom: 3 }}>{sc.name}</div>{!mob && <p style={{ fontFamily: font, fontSize: 11, color: hov ? "rgba(255,255,255,.7)" : C.g500, margin: 0 }}>{sc.desc}</p>}</a>); })}</div></div></section>); };

// ═══ TESTIMONIALS ═══
const TestimonialsSection = () => { const { mob } = useVP(); return (<section style={{ padding: mob ? "40px 0" : "64px 0", background: C.off }}><div style={wrap(mob)}><SH label="Real Reviews" title="Loved by Our Community" /><div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3, 1fr)", gap: mob ? 12 : 20 }}>{testimonials.map((t, i) => (<div key={i} style={{ background: C.white, borderRadius: 14, padding: mob ? "20px 16px" : "24px 22px", border: `1px solid ${C.g100}` }}><Stars r={t.r} s={12} /><p style={{ fontFamily: font, fontSize: 13.5, color: C.g700, lineHeight: 1.65, margin: "10px 0 14px", fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p><div style={{ borderTop: `1px solid ${C.g100}`, paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 32, height: 32, borderRadius: "50%", background: C.brandFaint, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: 14, fontWeight: 700, color: C.brand }}>{t.av}</div><div><div style={{ fontFamily: font, fontSize: 12, fontWeight: 700, color: C.brand }}>{t.name}</div><div style={{ fontFamily: font, fontSize: 10.5, color: C.g400 }}>{t.loc}</div></div></div><span style={{ fontFamily: font, fontSize: 10, color: C.accent, fontWeight: 600, background: C.accentLight, padding: "3px 8px", borderRadius: 20 }}>{t.prod}</span></div></div>))}</div></div></section>); };

// ═══ STATS ═══
const StatsBar = () => { const { mob } = useVP(); return (<section style={{ padding: mob ? "36px 0" : "48px 0", background: C.brand }}><div style={wrap(mob)}><p style={{ textAlign: "center", fontFamily: font, fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: 4 }}>Redefining Skincare Since 2006</p><h2 style={{ textAlign: "center", fontFamily: serif, fontSize: mob ? 22 : 28, fontWeight: 700, color: C.white, marginBottom: mob ? 24 : 32 }}>At Affordable Price</h2><div style={{ display: "grid", gridTemplateColumns: mob ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: mob ? 16 : 24 }}>{[["170+", "Countries"], ["500+", "Partnerships"], ["3,000+", "Products"], ["1,000+", "Research"]].map(([n, l], i) => (<div key={i} style={{ textAlign: "center" }}><div style={{ fontFamily: serif, fontSize: mob ? 32 : 42, fontWeight: 700, color: C.white }}>{n}</div><div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 4 }}>{l}</div></div>))}</div></div></section>); };

// ═══ NEWSLETTER ═══
const Newsletter = () => { const { mob } = useVP(); return (<section style={{ padding: mob ? "40px 0" : "56px 0", background: C.white }}><div style={{ ...wrap(mob), maxWidth: 520, textAlign: "center" }}><h2 style={{ fontFamily: serif, fontSize: mob ? 24 : 28, fontWeight: 700, color: C.brand, marginBottom: 8 }}>Get 10% Off Your First Order</h2><p style={{ fontFamily: font, fontSize: 13, color: C.g400, marginBottom: 20 }}>Join for exclusive offers & skincare tips</p><div style={{ display: "flex", gap: 8, flexDirection: mob ? "column" : "row" }}><input type="email" placeholder="Your email address" style={{ flex: 1, padding: "12px 16px", border: `2px solid ${C.g200}`, borderRadius: mob ? 10 : 50, fontSize: 13, fontFamily: font, outline: "none", boxSizing: "border-box" }} /><button style={{ background: C.brand, color: C.white, border: "none", borderRadius: mob ? 10 : 50, padding: "12px 24px", fontSize: 13, fontWeight: 700, fontFamily: font, cursor: "pointer" }}>Subscribe</button></div></div></section>); };

// ═══ FOOTER ═══
const Footer = ({ go }) => { const { mob } = useVP(); return (<footer style={{ background: C.footerBg, color: C.footerTxt, padding: mob ? "36px 0 0" : "48px 0 0" }}><div style={wrap(mob)}><div style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1.5fr 1fr 1fr 1fr", gap: mob ? 28 : 36, marginBottom: 36 }}><div><img src={LOGO} alt="Cosmo" style={{ height: 36, filter: "brightness(10)", marginBottom: 14 }} /><p style={{ fontSize: 12, lineHeight: 1.7, fontFamily: font, marginBottom: 14 }}>Redefining skincare since 2006. Trusted by 10M+ customers in 170+ countries.</p><div style={{ display: "flex", gap: 8 }}>{[Ic.Insta, Ic.Tt, Ic.Fb, Ic.Yt].map((II, i) => <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.5)", textDecoration: "none" }}><II /></a>)}</div></div>{[{ t: "Shop", ls: ["All Products", "Best Sellers", "New Arrivals", "Combos", "Gift Cards"] }, { t: "Categories", ls: ["Hair Care", "Bath & Body", "Delicious", "Botanix", "Urea", "Anti-Perspirants"] }, { t: "Support", ls: ["Contact Us", "FAQ", "Shipping", "Returns", "Track Order"] }].map((col, i) => (<div key={i}><h4 style={{ fontFamily: font, fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.white, marginBottom: 14 }}>{col.t}</h4>{col.ls.map(l => <a key={l} href="#" style={{ display: "block", fontFamily: font, fontSize: 12, color: C.footerTxt, textDecoration: "none", marginBottom: 8 }}>{l}</a>)}</div>))}</div><div style={{ borderTop: "1px solid rgba(255,255,255,.08)", padding: "14px 0", display: "flex", flexDirection: mob ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: 8 }}><p style={{ fontFamily: font, fontSize: 11, color: "rgba(255,255,255,.3)" }}>© 2026 Cosmo Cosmetics UAE</p><div style={{ display: "flex", gap: 16 }}>{["Privacy", "Terms", "Refund"].map(l => <a key={l} href="#" style={{ fontFamily: font, fontSize: 11, color: "rgba(255,255,255,.3)", textDecoration: "none" }}>{l}</a>)}</div></div></div></footer>); };

// ═══ CATEGORY PAGE ═══
const CategoryPage = ({ catKey, cur, go }) => {
  const { mob, tab } = useVP();
  const [filter, setFilter] = useState("All");
  const cat = CAT[catKey];

  if (!cat) {
    const isBest = catKey === "best-sellers";
    const items = isBest ? PRODUCTS.filter(p => p.badge === "Best Seller") : PRODUCTS;
    return (<section style={{ padding: mob ? "20px 0 40px" : "28px 0 64px" }}><div style={wrap(mob)}><button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: font, fontSize: 13, color: C.g500, marginBottom: 16, padding: 0 }}><Ic.Back /> Back to Home</button><h1 style={{ fontFamily: serif, fontSize: mob ? 28 : 38, fontWeight: 700, color: C.brand, marginBottom: 24 }}>{isBest ? "Best Sellers" : "All Products"}</h1><div style={{ display: "grid", gridTemplateColumns: `repeat(${mob ? 2 : tab ? 3 : 4}, 1fr)`, gap: mob ? 10 : 20 }}>{items.map(p => <PCard key={p.id} {...p} cur={cur} />)}</div></div></section>);
  }

  const prods = PRODUCTS.filter(p => p.cats.includes(catKey));
  const isMobileLike = mob || tab;

  return (
    <section style={{ background: C.white }}>
      <div style={{ padding: mob ? "8px 8px" : "16px 28px", maxWidth: 1380, margin: "0 auto" }}>
        <div style={{ ...bannerBoxStyle(isMobileLike), maxHeight: isMobileLike ? 420 : 420, margin: "0 auto" }}>
          <img src={bannerByDevice(cat.banner, isMobileLike)} alt={cat.name} style={bannerImgStyle} />
        </div>
      </div>
      <div style={{ ...wrap(mob), padding: mob ? "16px 16px 40px" : "24px 28px 64px" }}>
        <div style={{ marginBottom: mob ? 16 : 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <a href="#" onClick={e => { e.preventDefault(); go("home"); }} style={{ fontFamily: font, fontSize: 12, color: C.g400, textDecoration: "none" }}>Home</a>
            <span style={{ color: C.g300 }}>/</span>
            <span style={{ fontFamily: font, fontSize: 12, color: C.brand, fontWeight: 600 }}>{cat.name}</span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: mob ? 26 : 36, fontWeight: 700, color: C.brand, marginBottom: 4 }}>{cat.name}</h1>
          <p style={{ fontFamily: font, fontSize: 13.5, color: C.g500 }}>{cat.desc}</p>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: mob ? 16 : 28, flexWrap: "wrap" }}>
          {["All", ...cat.sub].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: font, fontSize: 12, fontWeight: 600, padding: "8px 18px", borderRadius: 40, cursor: "pointer", background: filter === f ? C.brand : C.white, color: filter === f ? C.white : C.g600, border: `1.5px solid ${filter === f ? C.brand : C.g200}`, transition: "all .2s" }}>{f}</button>
          ))}
        </div>
        <p style={{ fontFamily: font, fontSize: 13, color: C.g400, marginBottom: 16 }}>{prods.length > 0 ? prods.length : PRODUCTS.length} products</p>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${mob ? 2 : tab ? 3 : 4}, 1fr)`, gap: mob ? 10 : 20 }}>
          {(prods.length > 0 ? prods : PRODUCTS.slice(0, 8)).map(p => <PCard key={p.id} {...p} cur={cur} />)}
        </div>
      </div>
    </section>
  );
};

// ═══ MAIN ═══
export default function CosmoCosmetics() {
  const [cur, setCur] = useState("AED");
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("home");
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div style={{ minHeight: "100vh", background: C.white }}>
      <TopBar cur={cur} setCur={setCur} lang={lang} setLang={setLang} />
      <Header page={page} go={go} />
      {page === "home" ? <>
        <Hero />
        <TrustBar />
        <Bestsellers cur={cur} />
        <BrandsSection go={go} />
        <ConcernsSection />
        <TestimonialsSection />
        <StatsBar />
        <Newsletter />
      </> : <CategoryPage catKey={page} cur={cur} go={go} />}
      <Footer go={go} />
    </div>
  );
}
