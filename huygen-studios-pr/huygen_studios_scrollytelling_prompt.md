# Production-Ready AI Coding Prompt: Huygen Studios Scrollytelling Website

```txt
ACT AS:
You are a world-class Creative Developer and senior frontend engineer specializing in Awwwards-level websites, Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui structure, Framer Motion, cinematic scrollytelling, HTML5 Canvas animation, and premium 3D-inspired digital experiences.

PROJECT CONTEXT:
Build a complete production-ready frontend for Huygen Studios.

Brand metadata:
- Brand name: Huygen Studios
- Established: April 25, 2026
- Email: hello@huygenstudios.com
- Website: huygenstudios.com
- Phone: 9262102440
- Business type: Full-stack automation and creative agency

Brand positioning:
Huygen Studios is a premium automation and creative studio that helps businesses transform operational bottlenecks into intelligent systems and cinematic digital experiences.

Core brand idea:
“Automation with imagination.”

The website should not feel like a generic SaaS agency page. It should feel like a cinematic digital launch experience for a futuristic studio that builds AI systems, automation, websites, voice agents, chatbots, SEO/GEO systems, and creative brand experiences.

THE MAIN TASK:
Build a high-end scrollytelling landing page for Huygen Studios.

The core interaction is a scroll-linked HTML5 Canvas image-sequence animation showing a moon rock / cosmic artifact / voxel-lunar service module evolving as the user scrolls. This replaces the headphone concept completely.

Instead of headphones exploding/disassembling, the visual story should show a Huygen Studios “service artifact” transforming through stages:
1. A mysterious dark moon rock / cosmic block appears.
2. It activates with subtle purple-red energy.
3. It opens or expands to reveal internal automation systems.
4. Service modules orbit or separate around it.
5. It reassembles into a refined Huygen Studios core symbol / launch-ready system.

This should match the existing Huygen Studios visual direction: dark space, moon rocks, voxel/cubic forms, glowing purple and coral energy, cinematic website frames, no excessive particles unless subtle, and no random generic tech stock imagery.

IMPORTANT:
Use the uploaded files and pasted component specs as context. Integrate the relevant requirements from the uploaded files, especially:
- shadcn-compatible project structure
- Tailwind CSS + TypeScript support
- reusable components inside `/components/ui`
- loader component integration
- Framer Motion usage
- lucide-react icons where useful
- `cn` utility from `@/lib/utils`
- setup instructions if the project does not already support shadcn, Tailwind, or TypeScript

The final output must be able to generate the whole frontend in one go.

TECH STACK:
- Framework: Next.js 14 App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Animation: Framer Motion
- Rendering: HTML5 Canvas for the image-sequence scrollytelling section
- UI structure: shadcn-compatible folder conventions
- Icons: lucide-react
- Utility: clsx + tailwind-merge
- Optional animation CSS: tw-animate-css

DEPENDENCIES:
Install these:
```bash
npm install framer-motion lucide-react clsx tailwind-merge tw-animate-css
```

If optional uploaded UI components are used later, these may also be needed:
```bash
npm install uuid react-use-measure
```

If the project is not already created, provide these setup commands:
```bash
npx create-next-app@latest huygen-studios --typescript --tailwind --eslint --app --src-dir false --import-alias "@/*"
cd huygen-studios
npx shadcn@latest init
npm install framer-motion lucide-react clsx tailwind-merge tw-animate-css
```

SHADCN PROJECT STRUCTURE REQUIREMENTS:
Use this file structure:
```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  HuygenScroll.tsx
  SiteNav.tsx
  ServiceCard.tsx
  FinalCTA.tsx
  ui/
    ai-loader.tsx
    shiny-button.tsx optional
lib/
  utils.ts
public/
  huygen-sequence/
    frame_000_delay-0.04s.webp
    frame_001_delay-0.04s.webp
    ...
```

Use `/components/ui` as the default folder for reusable UI components. If this folder does not exist, create it. This matters because shadcn-generated components and many UI imports expect `@/components/ui/...`. Keeping this convention prevents broken imports and makes future shadcn additions easier.

BRAND SERVICES TO REPRESENT:
The website should clearly communicate Huygen Studios’ core service categories.

Primary service categories:
1. AI & Automation
   - WhatsApp Business Automation
   - AI Lead Qualification
   - Appointment Booking Automation
   - Follow-up Sequence Automation
   - Cart Abandonment Recovery
   - Invoice & Payment Reminder
   - Internal Workflow Automation
   - Custom AI & Automation

2. AI Voice
   - Inbound AI Voice Agent
   - Outbound AI Voice Agent
   - Custom Voice Agent

3. Web & Conversion Systems
   - Business Website
   - Landing Page
   - Conversion-focused web experiences

4. Audit & Strategy
   - Automation audits
   - Growth workflow audits
   - AI implementation strategy

5. Creative Systems
   - Branding support
   - Motion-first web storytelling
   - Visual identity systems
   - Interactive digital experiences

Do not show all services equally in the hero. Prioritize clarity:
- Main focus: AI Automation, AI Voice Agents, Web Experiences
- Secondary focus: audits, strategy, creative systems

VISUAL DIRECTION:
The site must feel like a premium futuristic studio website.

Core visual language:
- Dark cinematic space theme
- Moon rock / lunar terrain
- Voxel/cubic forms
- Subtle 3D Gaussian Splatting-inspired depth
- Purple cubic rocks
- Coral Red energy: `#f63a39`
- Muted Purple energy: `#7c4e9b`
- Near-black background: `#050505`
- Soft glow, not neon overload
- Clean typography
- Large whitespace
- Premium restraint

Colors:
- Page background: `#050505`
- Canvas/image sequence background must blend seamlessly into `#050505`
- Heading text: `text-white/90`
- Body text: `text-white/60`
- Borders: `border-white/10`
- Muted panels: `bg-white/[0.03]`
- Accent coral: `#f63a39`
- Accent purple: `#7c4e9b`
- Avoid generic blue SaaS gradients

Typography:
- Inter or system San Francisco stack
- Minimal, clean, tracking-tight
- Large cinematic headings
- Body copy should be concise and sharp

Motion style:
- Slow cinematic movement
- Fade, blur, slight y transitions
- Scroll-linked image sequence
- No cheap bounce animations
- No overdone parallax
- Avoid clutter

GENERAL UX RULES:
- The website must be responsive.
- The canvas must work on mobile.
- The visual should blend into the background with no visible rectangular image edges.
- Use real HTML text overlays; do not put important text inside the canvas.
- Use reduced-motion handling.
- Use accessible buttons, labels, and focus states.
- Keep performance clean.

CORE COMPONENT: `components/HuygenScroll.tsx`

Create a client component:
```tsx
"use client";
```

Component name:
```tsx
export function HuygenScroll() {}
```

Core mechanic:
- A sticky full-screen canvas inside a tall scroll section.
- The scroll controls an image sequence of a Huygen Studios cosmic service artifact transforming.

Container:
```tsx
<section ref={containerRef} className="relative h-[420vh] bg-[#050505]">
  <div className="sticky top-0 h-screen w-full overflow-hidden">
    <canvas />
    overlays...
  </div>
</section>
```

Canvas requirements:
- Sticky
- Full viewport
- Centered
- Responsive
- Uses contain-fit drawing
- Uses devicePixelRatio
- Fills background with `#050505` before drawing image
- Avoids canvas blur on high-DPI displays
- Redraws on resize
- Does not crop the visual on mobile

Image sequence path:
```txt
/public/huygen-sequence/frame_000_delay-0.04s.webp
/public/huygen-sequence/frame_001_delay-0.04s.webp
...
```

Use:
```ts
const FRAME_COUNT = 120;
const FRAME_PATH = "/huygen-sequence";
```

Add a clear comment:
“Place your generated Huygen Studios moon-rock/service-artifact frames in `/public/huygen-sequence/`. If your sequence has 192 frames, change `FRAME_COUNT` to 192.”

Frame naming helper:
Support zero-padded naming:
```ts
frame_000_delay-0.04s.webp
```

Use helper:
```ts
const getFrameSrc = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PATH}/frame_${padded}_delay-0.04s.webp`;
};
```

Scroll logic:
- Use Framer Motion `useScroll`
- Use `useMotionValueEvent`
- Map scroll progress from 0 to 1 into frame index 0 to `FRAME_COUNT - 1`
- Use `requestAnimationFrame` to draw the frame
- Do not update React state on every scroll frame
- Store current frame in refs
- Draw only when the frame changes

Example logic:
```ts
const nextFrame = Math.min(
  FRAME_COUNT - 1,
  Math.floor(latest * (FRAME_COUNT - 1))
);
```

Preloading:
- Preload all images at mount
- Track loaded count
- Track error count
- Do not crash if one image fails
- Show loader until the first frame is ready and ideally until all frames are preloaded
- If some frames fail, still draw the nearest loaded frame
- Prevent flickering

Loading state:
Use `components/ui/ai-loader.tsx`.
Show it centered over the canvas while frames load:
- label: “Loading Huygen System”
- also show percentage if possible

Overlay story beats:
Overlay text sections that fade in and out as the artifact transforms.
Use Framer Motion `useTransform` opacity ranges.

Beat 1: 0% scroll
Position: centered
Heading:
“Huygen Studios”
Subheading:
“Automation with imagination.”
Body:
“AI systems, voice agents, and cinematic web experiences built to remove business bottlenecks.”

Beat 2: 25–30% scroll
Position: left aligned on desktop, centered on mobile
Heading:
“Systems that wake up.”
Body:
“WhatsApp flows, lead qualification, reminders, booking, and follow-ups begin working as one connected engine.”
Visual implication:
The rock/core starts glowing and activating.

Beat 3: 50–60% scroll
Position: right aligned on desktop, centered on mobile
Heading:
“Voice. Web. Automation.”
Body:
“Inbound agents, outbound calling, conversion pages, and internal workflows separate into specialized modules.”
Visual implication:
The artifact opens and service modules orbit around the core.

Beat 4: 80–90% scroll
Position: centered
Heading:
“Launch the system.”
Body:
“From first audit to deployed automation, Huygen Studios builds the operating layer your business was missing.”
CTA:
“Start a project”
Secondary:
“hello@huygenstudios.com”

Text overlay styling:
- `pointer-events-none` on text groups
- CTA wrapper can use `pointer-events-auto`
- `max-w-xl`
- headings: `text-4xl md:text-7xl font-semibold tracking-[-0.06em] text-white/90`
- body: `text-sm md:text-lg text-white/60 leading-relaxed`
- add subtle backdrop only if needed, not heavy cards

PAGE STRUCTURE: `app/page.tsx`

Build a complete landing page:

1. Navigation
- Fixed top nav
- Left wordmark: Huygen Studios
- Right nav links:
  - Systems
  - Voice
  - Web
  - Strategy
  - Contact
- CTA button: “Start a project”
- Mobile: hide extra links, keep wordmark and CTA
- Style:
  - `fixed top-4 left-1/2 -translate-x-1/2 z-50`
  - glass panel
  - `bg-black/30 backdrop-blur-xl border border-white/10 rounded-full`

2. Opening hero
- Dark full-screen section before scrollytelling
- Headline:
  “Build the business system behind the brand.”
- Subheadline:
  “Huygen Studios designs AI automations, voice agents, web experiences, and operational workflows that turn scattered tasks into intelligent systems.”
- Small eyebrow:
  “Established 2026 · Automation & Creative Studio”
- CTA buttons:
  - Primary: “Explore the system” scrolls to scrollytelling section
  - Secondary: “Contact Huygen” mailto link
- Add subtle cosmic background gradients:
  - coral glow
  - purple glow
  - no bright stock imagery
- Add service chips:
  - AI Automation
  - AI Voice Agents
  - Conversion Websites
  - Strategy Audits

3. Scrollytelling section
- Render `<HuygenScroll />`
- This is the centerpiece.

4. Core services section
- Heading:
  “Drop-in systems for immediate ROI.”
- Body:
  “Each solution targets one bottleneck and turns it into a repeatable operating system.”
- Grid cards by category:
  - AI & Automation
  - AI Voice
  - Web & Conversion
  - Audit & Strategy
- Each card should list 3–5 key services only.
- Use icons from lucide-react such as Bot, Mic, Globe, Workflow, Calendar, MessageSquare, PhoneCall, Search.
- Keep the cards premium:
  - `bg-white/[0.03]`
  - `border-white/10`
  - hover border accent subtle

5. Process section
- Heading:
  “From bottleneck to launch.”
- Four steps:
  1. Audit the workflow
  2. Design the system
  3. Build the automation
  4. Launch and optimize
- Each step should be concise.

6. Final CTA section
- Large centered headline:
  “Ready to automate the work that slows you down?”
- Body:
  “Tell Huygen Studios where your operation leaks time. We’ll map the system that fixes it.”
- CTA:
  “Start a project” linking to `mailto:hello@huygenstudios.com`
- Show contact metadata:
  - hello@huygenstudios.com
  - huygenstudios.com
  - 9262102440

COMPONENT: `components/ui/ai-loader.tsx`

Use the uploaded ai-loader idea, but fix it for production.
The originally provided JSX uses invalid `class` attributes. Use `className`.
Do not keep unused state.
Do not import `useState` unless needed.

Create:
```tsx
"use client";

import { cn } from "@/lib/utils";

type AILoaderProps = {
  label?: string;
  className?: string;
};

export function AILoader({ label = "Loading Huygen System", className }: AILoaderProps) {
  return (
    <div className={cn("loader-wrapper", className)} role="status" aria-live="polite">
      {label.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="loader-letter"
          style={{ animationDelay: `${index * 0.045}s` }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <div className="loader" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
```

COMPONENT: `components/ui/shiny-button.tsx` optional
If using a shiny CTA, keep it subtle and adapt it to Huygen colors.
Do not import Google Fonts inside the component if the app already uses Inter globally.
Avoid heavy blue styling; use coral and purple accents.

GLOBAL STYLES: `app/globals.css`

If Tailwind 4:
```css
@import "tailwindcss";
@import "tw-animate-css";
```

If Tailwind 3, provide fallback instructions:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add:
- body background #050505
- body text color white
- font smoothing
- selection color
- scroll behavior
- loader keyframes
- loader classes
- reduced-motion media query

Base CSS requirements:
```css
:root {
  --background: #050505;
  --foreground: #ededed;
  --huygen-coral: #f63a39;
  --huygen-purple: #7c4e9b;
}

html {
  background: var(--background);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}
```

Loader keyframes:
```css
@keyframes loader-rotate {
  0% {
    transform: rotate(90deg);
    box-shadow: 0 10px 20px 0 #fff inset,
      0 20px 30px 0 #ad5fff inset,
      0 60px 60px 0 #471eec inset;
  }
  50% {
    transform: rotate(270deg);
    box-shadow: 0 10px 20px 0 #fff inset,
      0 20px 10px 0 #d60a47 inset,
      0 40px 60px 0 #311e80 inset;
  }
  100% {
    transform: rotate(450deg);
    box-shadow: 0 10px 20px 0 #fff inset,
      0 20px 30px 0 #ad5fff inset,
      0 60px 60px 0 #471eec inset;
  }
}

@keyframes loader-letter-anim {
  0%,
  100% {
    opacity: 0.4;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
    transform: scale(1.15);
  }
  40% {
    opacity: 0.7;
    transform: translateY(0);
  }
}
```

Add loader classes:
```css
.loader-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.04rem;
  min-height: 84px;
  padding: 1rem 1.25rem;
  color: rgba(255, 255, 255, 0.72);
  letter-spacing: -0.04em;
}

.loader-letter {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 500;
  animation: loader-letter-anim 1.6s ease-in-out infinite;
}

.loader {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 34px;
  height: 34px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: #050505;
  animation: loader-rotate 2.4s linear infinite;
}
```

LIB UTILITY: `lib/utils.ts`

Create:
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

ACCESSIBILITY REQUIREMENTS:
- Use semantic sections.
- Canvas should have `aria-label="Huygen Studios service system animation"` or be wrapped with accessible text.
- Do not put key copy only in canvas.
- Buttons and links must have focus states.
- Respect `prefers-reduced-motion`.
- Maintain readable contrast.

PERFORMANCE REQUIREMENTS:
- Avoid React state updates on every scroll tick.
- Use refs for frame state.
- Use `requestAnimationFrame`.
- Preload images only once.
- Cleanup event listeners and animation frames.
- Avoid layout thrashing.
- Use `devicePixelRatio` carefully.
- Limit heavy blur effects.

SCROLLYTELLING IMAGE SEQUENCE ART DIRECTION:
If image frames need to be generated, tell the user or the image-generation model to create frames with this direction:

“A cinematic dark-space Huygen Studios service artifact, black moon-rock material, faceted cubic/voxel geometry, subtle purple cubic lunar rocks, coral red #f63a39 and muted purple #7c4e9b glowing seams, no text, no logos, centered object, pure #050505 background, premium product render, 16:9, consistent camera, object slowly transforming from closed rock core to activated automation system with separated modules, then reassembling into a clean core symbol, no random particles, seamless background edges.”

The generated sequence should be placed in:
```txt
public/huygen-sequence/
```

EXPECTED FILE OUTPUT ORDER:
Return the complete code in this order:
1. Setup commands
2. `lib/utils.ts`
3. `components/ui/ai-loader.tsx`
4. `components/SiteNav.tsx`
5. `components/ServiceCard.tsx`
6. `components/HuygenScroll.tsx`
7. `app/page.tsx`
8. `app/layout.tsx`
9. `app/globals.css`
10. Asset placement instructions
11. Testing checklist

TESTING CHECKLIST:
Include this checklist at the end:
- Confirm Huygen image sequence exists at `/public/huygen-sequence/`
- Confirm frame names match `frame_000_delay-0.04s.webp`
- Run `npm run dev`
- Open homepage
- Verify loader appears before the sequence is ready
- Verify canvas background blends into `#050505`
- Verify scroll progresses through artifact transformation frames
- Verify story text appears around 0%, 30%, 60%, and 90%
- Verify mobile canvas uses contain fit
- Verify no console errors
- Verify nav CTA works
- Verify email link works
- Verify reduced motion does not break the page

QUALITY BAR:
The final website should feel like a premium creative automation studio launch page, not a template.
It should combine:
- Apple-level restraint
- Awwwards-level scrollytelling
- Huygen Studios cosmic/voxel moon-rock identity
- Clear business messaging
- Production-ready code

FINAL RULES:
- Do not mention headphones anywhere.
- Do not use Zenith X anywhere.
- Do not create a gene