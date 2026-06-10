# Huygen Studios — Sequence Frame Reference

> **DEFINITIVE VISUAL MAP** of all 794 frames in `/public/huygen-sequence/`
> Created from direct frame-by-frame inspection on 2026-05-02.
> This file is the single source of truth for beat timing in `HuygenScroll.tsx`.

---

## Quick Reference

| Frame Range | Visual Content | File Size Signature | Notes |
|---|---|---|---|
| **001** | Pure black | ~33 KB | Opening darkness |
| **002–010** | Crystal fading in (tiny, center) | 75–135 KB | Purple crystal emerges from black |
| **011–030** | Small purple crystal, growing | 90–106 KB | Crystal rotates, particles appear |
| **031–070** | Medium crystal with pink/red particles | 91–136 KB | Grows bigger, sparkles intensify |
| **071–097** | Large crystal, starfield visible | 132–178 KB | Crystal fully formed, cosmic backdrop |
| **098–124** | Peak crystal — largest, most detailed | 203–325 KB | **Maximum visual intensity** — biggest file sizes |
| **125–131** | Crystal fading out / dissolving to black | 295→33 KB | Rapid fadeout over ~6 frames |
| **131–137** | **PURE BLACK** | ~33 KB | First black gap |
| **138–153** | Tiny crystal re-emerging (bottom-left) | 33→47 KB | New crystal fades in slowly |
| **154–165** | Small crystal, bottom-left position | ~47–50 KB | Stable small crystal |
| **166–209** | Crystal moves to LEFT side, rotating | 51–55 KB | Crystal positioned LEFT, **right side is clear for text** |
| **210–229** | Crystal shrinking, fading | 53→35 KB | Crystal dissolving |
| **230–252** | Very small crystal fragments | 34–44 KB | Minimal visual, transitioning |
| **253–275** | **GOLDEN crystal** appears (left), smaller | 47–56 KB | Color shift: purple → bronze/gold |
| **276–294** | Crystal growing, warm tones | 57–72 KB | Building up to trio reveal |
| **295–309** | **THREE CRYSTALS** — bronze, silver, gold | ~75 KB (stable) | Key moment: trio spread horizontally |
| **310–329** | Three crystals fading/shrinking | 75→60 KB | Trio dissolving out |
| **330–627** | **PURE BLACK** | ~33 KB | **MASSIVE 298-frame black gap** |
| **628** | Moon emerges from darkness | 137 KB | First moon frame — sudden appearance |
| **629–651** | Moon approach with asteroid debris | 157→228 KB | Moon gets closer, asteroids float around it |
| **652–730** | **MOON STATIC** — close-up with asteroids | 249 KB (identical) | **79 identical frames** — moon is frozen in place |
| **731–740** | Moon pulling back, Earth horizon appears | 256→303 KB | Transition: moon receding, Earth enters bottom |
| **741–752** | Moon + Earth together, asteroids between | 350→364 KB | Both celestial bodies visible |
| **753–789** | **EARTH CLOSE-UP** — voxel-style city lights | 364→803 KB | **Final visual climax** — massive file sizes |
| **790–794** | Earth final frame (static) | ~794 KB (identical) | **5 identical frames** — Earth holds |

---

## Visual Acts (Detailed)

### ACT 1: Crystal Genesis (Frames 1–131)

**The Story:** A single purple crystal materializes from pure darkness, grows to full size with particle effects and a cosmic starfield backdrop, then dissolves back to black.

#### Key Frames:
- **Frame 001**: Pure black (33 KB). The void.
- **Frame 005**: First hint of purple glow (134 KB).
- **Frame 020**: Small crystal visible, no particles (91 KB).
- **Frame 030**: Crystal growing, first pink particles appear (104 KB).
- **Frame 050**: Medium crystal, pink/red sparkle particles around it (108 KB).
- **Frame 070**: Large crystal, particles and distant stars visible (130 KB).
- **Frame 085**: Crystal near peak size, purple glow dominant (168 KB).
- **Frame 100**: **PEAK CRYSTAL** — largest, most detailed, bright pink edges (216 KB).
- **Frame 110**: Crystal at maximum, particles flying outward (279 KB).
- **Frame 120**: Crystal still large but starting to contract (321 KB).
- **Frame 125**: Fade begins — crystal dims (296 KB).
- **Frame 128**: Rapid dissolve (199 KB).
- **Frame 130**: Nearly gone (98 KB).
- **Frame 131**: **BLACK** (33 KB). Crystal sequence complete.

#### ⚠️ Text Placement Warning:
The crystal is **always centered** in this act. Place text:
- **Center** works for frames 1–15 (crystal is tiny or invisible)
- **Avoid center** for frames 30–130 (crystal dominates center screen)

---

### ACT 2: Crystal Orbit (Frames 138–329)

**The Story:** A second crystal re-materializes, this time positioned on the LEFT side of frame. It rotates and shifts colors from purple → bronze/gold. Eventually three crystals appear spread horizontally (bronze, silver, gold), then fade to black.

#### Key Frames:
- **Frame 138**: First pixel of new crystal emerging (33 KB + slight increase).
- **Frame 145**: Crystal tip visible at **bottom-left corner** (39 KB).
- **Frame 155**: Small crystal settled on **left side** of screen (48 KB).
- **Frame 170**: Crystal clearly on **LEFT**, purple tint, medium size (55 KB). **Right side completely clear.**
- **Frame 200**: Crystal still left-positioned, starting to shrink (50 KB).
- **Frame 210**: Crystal fading, moving up-left (53 KB).
- **Frame 230**: Nearly gone, very dim (34 KB).
- **Frame 250**: Tiny golden crystal fragment appearing (43 KB).
- **Frame 260**: **Bronze/gold crystal** solidifying on left (49 KB).
- **Frame 280**: Crystal growing with warm tones (65 KB).
- **Frame 295**: **THREE CRYSTALS appear** — bronze (left), silver/white (center), gold (right) (75 KB).
- **Frame 300**: Trio stable, equal spacing (75 KB).
- **Frame 310**: Trio beginning to fade (75 KB).
- **Frame 320**: Fading faster (69 KB).
- **Frame 329**: Nearly gone (60 KB).
- **Frame 330**: **BLACK** (33 KB). Crystal orbit complete.

#### ⚠️ Text Placement Warning:
- Frames 145–210: Crystal is on **LEFT** side → place text on **RIGHT**
- Frames 295–329: Three crystals span the full width → place text **above or below**, or use **right side** (gold crystal is small)

---

### ACT 3: The Void (Frames 330–627)

**The Story:** Pure darkness. 298 frames of black. This is a dramatic pause — the "space between worlds."

#### Key Frames:
- **Frame 330**: First black frame (33 KB).
- **Frame 400**: Still black (33 KB).
- **Frame 500**: Still black (33 KB).
- **Frame 550**: Still black (33 KB). Slight byte variation (~33,267).
- **Frame 627**: **LAST black frame** before moon (33 KB).

#### ⚠️ Design Decision:
This gap is **37.5% of all frames** (298/794). In the scrollytelling engine:
- Progress 0.42 → 0.79 maps to pure black
- This is where "transition" text beats should go
- The darkness IS the content — it builds anticipation

---

### ACT 4: Moon & Asteroids (Frames 628–730)

**The Story:** A rocky, cratered moon suddenly appears from darkness with asteroid debris floating around it. Camera orbits close to the moon's surface. The view then holds static.

#### Key Frames:
- **Frame 628**: Moon **APPEARS** — first visible content after 298 black frames (137 KB). Dramatic reveal.
- **Frame 630**: Moon close-up, dark side, asteroid debris visible to the left (172 KB).
- **Frame 635**: Moon surface detail visible, purple-tinted asteroids (178 KB).
- **Frame 640**: Moon closer, asteroids orbiting. Surface craters visible (183 KB).
- **Frame 645**: Camera pulling closer to moon (211 KB).
- **Frame 650**: Moon filling ~60% of frame, asteroids prominently visible (218 KB).
- **Frame 652**: **STATIC HOLD BEGINS** — moon with asteroids, close-up (249 KB).
- **Frame 652–730**: **79 IDENTICAL FRAMES** (all 249,283 bytes). Moon frozen in position. Left side has space/stars, right side has moon surface with purple asteroid clusters.

#### ⚠️ Text Placement Warning:
- Moon occupies the **RIGHT side** of the frame
- Asteroids cluster around **center and right**
- **LEFT side** has clear space (stars) — safe for text
- **Center** text works but may overlap with floating asteroids

---

### ACT 5: Earth Arrival (Frames 731–794)

**The Story:** The camera pulls back from the moon revealing Earth's horizon below. Then transitions to an extreme close-up of a voxel-style Earth with glowing city lights and a sun/crystal rising on the horizon.

#### Key Frames:
- **Frame 731**: Moon begins to change, slight motion (257 KB). Static hold breaking.
- **Frame 735**: Moon pulling back, Earth's blue atmosphere rim visible at bottom (264 KB).
- **Frame 740**: Moon + Earth both visible, asteroids between them. **KEY TRANSITION FRAME** (303 KB).
- **Frame 745**: Earth growing, moon receding (360 KB).
- **Frame 750**: Earth dominant, moon + asteroids in upper portion. Earth atmosphere and clouds visible (297 KB).
- **Frame 755**: Earth close-up begins, voxel/cube texture visible (422 KB).
- **Frame 760**: **EARTH CLOSE-UP** — voxel terrain, atmosphere edge, space above (462 KB).
- **Frame 770**: Earth surface fills frame, golden city lights visible, sunrise glow (640 KB).
- **Frame 780**: **PEAK EARTH** — Africa/India visible in voxel style, glowing city networks (720 KB).
- **Frame 785**: Earth surface extreme close-up with golden crystal/sun on horizon (775 KB).
- **Frame 789**: Maximum detail earth (797 KB).
- **Frame 790**: **STATIC HOLD** — final Earth frame (794 KB).
- **Frame 790–794**: **5 IDENTICAL FRAMES** (all 793,705 bytes). Final hold.

#### ⚠️ Text Placement Warning:
- Frames 731–750: Mixed celestial elements → **CENTER text** works (space is in upper portion)
- Frames 755–794: Earth fills entire frame → text needs good contrast
- The golden glow is strongest at **TOP CENTER** → avoid placing text there
- **CENTER** with dark semi-transparent backdrop recommended for CTA text

---

## File Size Fingerprint Analysis

The file sizes reveal the exact structure without needing to view images:

```
33 KB  = Pure black frame (void/gap)
35–55 KB = Small crystal, minimal detail
55–80 KB = Medium crystal or trio of small crystals
80–180 KB = Large crystal with particles/starfield
200–325 KB = Peak crystal intensity OR moon approach
249 KB = Moon static hold (79 identical frames)
250–400 KB = Moon-Earth transition
400–800 KB = Earth close-up (bigger = more detail)
794 KB = Final Earth hold (5 identical frames)
```

### Black Frame Ranges (all ~33 KB):
1. Frame 001 (opening)
2. Frames 131–137 (post-crystal gap)
3. Frames 330–627 (THE VOID — 298 frames!)

### Static Hold Ranges (identical bytes):
1. Frames 652–730: Moon hold (79 frames, 249,283 bytes each)
2. Frames 790–794: Earth hold (5 frames, 793,705 bytes each)

---

## Current STORY_BEATS Mapping (from HuygenScroll.tsx)

| Beat | Text | Position | Progress Range | Frame Range | Visual Behind |
|---|---|---|---|---|---|
| 0 | "Huygen Studios" | center | 0.00–0.09 | 1–72 | Black → Small crystal |
| 1 | "Systems that wake up." | right | 0.11–0.26 | 88–207 | Crystal full → orbit left |
| 2 | "Voice. Web. Automation." | right | 0.28–0.43 | 223–342 | Three crystals → black |
| 3 | "Beyond the atmosphere." | center | 0.70–0.88 | 556–699 | Black → Moon static |
| 4 | "Launch the system." | center | 0.90–1.0 | 714–794 | Moon end → Earth |

### ⚠️ Potential Issues with Current Mapping:

1. **Beat 3 starts at progress 0.70 (frame 556)** — this is still PURE BLACK. The moon doesn't appear until frame 628 (progress ~0.79). Text shows over darkness for a long time before any visual.
2. **Beat 4 starts at progress 0.90 (frame 714)** — this is during the moon static hold, not the Earth. Earth transition begins at frame 731 (progress ~0.92).

### Recommended Revised Mapping:

| Beat | Progress Range | Frame Range | Rationale |
|---|---|---|---|
| 0 | 0.00–0.09 | 1–72 | ✅ Good — crystal is small enough for center text |
| 1 | 0.11–0.26 | 88–207 | ✅ Good — crystal on left, text on right |
| 2 | 0.28–0.43 | 223–342 | ✅ Good — trio visible, text on right |
| 3 | 0.65–0.85 | 516–675 | ⬆️ Start earlier in void, hold through moon reveal |
| 4 | 0.88–1.0 | 699–794 | ⬆️ Start at end of moon hold, carry through Earth |

---

## Frame-to-Progress Conversion

```
progress = frame / FRAME_COUNT = frame / 794

Frame 1    → 0.001
Frame 100  → 0.126
Frame 131  → 0.165 (first black gap)
Frame 200  → 0.252
Frame 295  → 0.372 (three crystals)
Frame 330  → 0.416 (void begins)
Frame 500  → 0.630 (mid-void)
Frame 628  → 0.791 (moon appears!)
Frame 652  → 0.821 (moon static begins)
Frame 730  → 0.919 (moon static ends)
Frame 740  → 0.932 (moon + earth)
Frame 755  → 0.951 (earth close-up)
Frame 790  → 0.995 (earth static)
Frame 794  → 1.000
```

---

## Color Palette by Act

| Act | Dominant Colors | Background |
|---|---|---|
| 1 (Crystal) | Purple, pink, magenta, red particles | Pure black |
| 2 (Orbit) | Purple → Bronze → Gold, White, Silver | Pure black |
| 3 (Void) | None | Pure black |
| 4 (Moon) | Grey, purple-tinted asteroids, dark moon surface | Black space with stars |
| 5 (Earth) | Blue atmosphere, golden city lights, green/teal oceans | Black space |

---

*Last updated: 2026-05-02 01:01 IST*
*Total frames analyzed: 794*
*Total sequence size: ~117 MB*
