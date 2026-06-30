import { useEffect, useRef, useState, useCallback } from 'react'
import './ForestCanopy.css'

// ─── Leaf shapes — botanically-inspired, organic, asymmetric ──────────────────
const SHAPES = [
  {
    // Ovate serrated – like basil / stevia, asymmetric teeth
    body: `M0,-66
      C9,-66 21,-56 27,-42
      Q30,-35 26,-28 Q30,-21 25,-14
      Q28,-6 22,4
      C18,22 12,44 4,56 Q2,62 0,64
      C-2,60 -6,54 -10,44
      Q-13,38 -11,30
      C-15,16 -19,-2 -19,-18
      Q-23,-26 -18,-34
      Q-22,-42 -17,-48
      C-13,-58 -6,-66 0,-66Z`,
    mid: `M0,-66 C-3,-24 3,20 0,64`,
    petiole: `M0,64 C0.5,74 -0.5,84 0,94`,
    veins: [
      `M1,-50 C8,-40 18,-26 22,-10`,
      `M1,-30 C7,-20 14,-6 17,10`,
      `M1,-10 C5,0 9,14 10,28`,
      `M1,12  C3,20 5,32 5,44`,
      `M1,-58 C4,-52 8,-44 10,-34`,
      `M-1,-50 C-9,-40 -17,-26 -19,-10`,
      `M-1,-30 C-8,-20 -13,-4 -14,12`,
      `M-1,-10 C-5,2 -8,16 -9,30`,
      `M-1,12  C-3,21 -5,33 -4,44`,
      `M-1,-58 C-4,-52 -7,-44 -9,-34`,
    ],
    w: 54, h: 130,
  },
  {
    // Broad elliptic – tropical, smooth wavy margin
    body: `M0,-55
      C20,-55 42,-40 50,-18
      Q52,-8 48,0 Q52,10 46,20
      C38,42 20,60 0,66
      C-20,58 -38,40 -46,18
      Q-52,8 -48,-2 Q-52,-10 -46,-22
      C-36,-44 -18,-55 0,-55Z`,
    mid: `M0,-55 C-3,-12 3,22 0,66`,
    petiole: `M0,66 C0,76 0,86 0,96`,
    veins: [
      `M1,-40 C12,-28 30,-12 38,6`,
      `M1,-18 C9,-6 22,10 28,26`,
      `M1,8   C6,18 12,32 14,48`,
      `M1,-50 C7,-42 16,-30 20,-18`,
      `M-1,-40 C-12,-28 -30,-12 -38,6`,
      `M-1,-18 C-9,-6 -22,10 -28,26`,
      `M-1,8   C-6,18 -12,32 -14,48`,
      `M-1,-50 C-7,-42 -16,-30 -20,-18`,
    ],
    w: 100, h: 121,
  },
  {
    // Lanceolate narrow – willow-like, slim flowing edges
    body: `M0,-74
      C5,-74 9,-66 11,-54
      Q14,-46 10,-40 Q13,-32 10,-24
      Q12,-16 9,-8
      C7,10 4,36 1,60 Q0,66 0,70
      Q0,65 -1,58
      C-4,34 -7,10 -9,-8
      Q-12,-16 -9,-24 Q-12,-32 -9,-40
      Q-13,-48 -9,-56
      C-7,-68 -3,-74 0,-74Z`,
    mid: `M0,-74 C-1,-28 1,22 0,70`,
    petiole: `M0,70 C0,80 0,90 0,100`,
    veins: [
      `M1,-58 C5,-50 9,-40 11,-28`,
      `M1,-38 C4,-30 8,-18 9,-6`,
      `M1,-18 C3,-8 6,6 7,18`,
      `M1,4   C3,12 5,24 5,36`,
      `M1,26  C2,32 3,42 3,52`,
      `M-1,-58 C-4,-50 -8,-40 -10,-28`,
      `M-1,-38 C-4,-30 -7,-18 -8,-6`,
      `M-1,-18 C-3,-8 -5,6 -6,18`,
      `M-1,4   C-2,12 -4,24 -4,36`,
      `M-1,26  C-2,32 -3,42 -3,52`,
    ],
    w: 28, h: 144,
  },
  {
    // Lobed – fig / mulberry style, organic undulating lobes
    body: `M0,-60
      C7,-60 15,-54 19,-44
      Q25,-34 17,-26
      Q27,-15 18,-7
      Q26,4 17,12
      Q24,26 13,34
      Q18,48 6,54 Q3,58 0,60
      Q-3,58 -6,54
      Q-18,48 -13,34
      Q-24,26 -17,12
      Q-26,4 -18,-7
      Q-27,-15 -18,-26
      Q-25,-34 -19,-44
      C-15,-54 -7,-60 0,-60Z`,
    mid: `M0,-60 C-2,-18 2,20 0,60`,
    petiole: `M0,60 C0,70 0,80 0,90`,
    veins: [
      `M1,-46 C7,-36 14,-22 17,-6`,
      `M1,-20 C6,-10 12,4 14,20`,
      `M1,10  C4,20 7,34 8,48`,
      `M-1,-46 C-7,-36 -14,-22 -17,-6`,
      `M-1,-20 C-6,-10 -12,4 -14,20`,
      `M-1,10  C-4,20 -7,34 -8,48`,
      `M1,-54  C4,-46 8,-38 10,-28`,
      `M-1,-54 C-4,-46 -8,-38 -10,-28`,
    ],
    w: 58, h: 120,
  },
  {
    // Cordate – morning-glory / sweet-potato, heart-lobed base
    body: `M0,-54
      C9,-54 19,-46 23,-32
      Q27,-22 23,-14 Q27,-4 22,6
      C17,24 9,42 0,58
      C-9,40 -17,22 -22,4
      Q-27,-6 -23,-16 Q-27,-24 -23,-34
      C-19,-46 -9,-54 0,-54
      M0,-54 C-3,-64 -15,-62 -15,-54 C-15,-46 -7,-48 0,-54
      M0,-54 C3,-64  15,-62  15,-54 C15,-46  7,-48  0,-54Z`,
    mid: `M0,-54 C-2,-16 2,18 0,58`,
    petiole: `M0,58 C0,68 0,78 0,88`,
    veins: [
      `M1,-38 C8,-28 16,-14 19,4`,
      `M1,-16 C6,-6 12,10 14,26`,
      `M1,10  C4,20 6,32 6,46`,
      `M-1,-38 C-8,-28 -16,-14 -19,4`,
      `M-1,-16 C-6,-6 -12,10 -14,26`,
      `M-1,10  C-4,20 -6,32 -6,46`,
      `M1,-48  C4,-40 8,-30 10,-20`,
      `M-1,-48 C-4,-40 -8,-30 -10,-20`,
    ],
    w: 48, h: 122,
  },
]

// ─── Colour palettes — natural leaf greens with realistic light/shadow ─────────
const PALETTES = [
  // Fresh sunlit leaf — light yellow-green centre fading to rich green
  { cx: '42%', cy: '16%', c0: '#c2e87e', c1: '#64c050', c2: '#1D783B', c3: '#0d3818',
    vein: 'rgba(228,255,195,0.40)', surf: 'rgba(255,255,255,0.26)' },
  // Deep mature forest green
  { cx: '38%', cy: '22%', c0: '#56b468', c1: '#2a7840', c2: '#14542A', c3: '#071c0e',
    vein: 'rgba(178,234,178,0.28)', surf: 'rgba(255,255,255,0.16)' },
  // Bright emerald — vivid midday light
  { cx: '34%', cy: '18%', c0: '#82d88c', c1: '#3caa52', c2: '#1D783B', c3: '#0c3420',
    vein: 'rgba(210,255,215,0.34)', surf: 'rgba(255,255,255,0.22)' },
  // Shadow/background — dark, muted, depth layer
  { cx: '40%', cy: '26%', c0: '#2e5e3a', c1: '#1a3e26', c2: '#0e2c18', c3: '#060f08',
    vein: 'rgba(128,184,128,0.20)', surf: 'rgba(255,255,255,0.08)' },
  // Yellow-green — sunlight filtering through canopy
  { cx: '36%', cy: '14%', c0: '#b4e854', c1: '#70ae2e', c2: '#3c7c1e', c3: '#173808',
    vein: 'rgba(234,255,172,0.30)', surf: 'rgba(255,255,245,0.22)' },
  // Warm autumn amber — seasonal accent leaves
  { cx: '44%', cy: '18%', c0: '#e8b84a', c1: '#c98020', c2: '#8b5514', c3: '#3c1e06',
    vein: 'rgba(255,225,130,0.38)', surf: 'rgba(255,240,180,0.22)' },
]

// ─── Leaf groups — left side, hanging from top edge ───────────────────────────
// No branches — leaves emerge directly from the screen edge (cx near 0, cy near 0)
const LEFT_GROUPS = [
  // Corner burst — large leaves spilling from top-left
  {
    cx: 55, cy: 30,
    swDur: 6.5, swDelay: 0,
    leaves: [
      { dx: -10, dy:  20, rot: -40, scale: 2.9,  shape: 0, pal: 0 },
      { dx:  30, dy:  10, rot:  10, scale: 2.5,  shape: 1, pal: 2 },
      { dx:  70, dy:  30, rot:  45, scale: 2.1,  shape: 2, pal: 1 },
      { dx: -20, dy:  60, rot: -70, scale: 2.4,  shape: 3, pal: 0 },
      { dx:  50, dy:  70, rot:  25, scale: 2.7,  shape: 0, pal: 3 },
      { dx: 110, dy:  55, rot:  65, scale: 2.0,  shape: 1, pal: 2 },
      { dx:  20, dy: 110, rot: -20, scale: 2.2,  shape: 2, pal: 4 },
    ],
  },
  // Second cluster — mid upper-left
  {
    cx: 200, cy: 15,
    swDur: 7.8, swDelay: 1.2,
    leaves: [
      { dx: -30, dy:  35, rot: -55, scale: 2.6,  shape: 1, pal: 1 },
      { dx:  20, dy:  20, rot:  15, scale: 3.0,  shape: 0, pal: 0 },
      { dx:  70, dy:  45, rot:  50, scale: 2.3,  shape: 3, pal: 2 },
      { dx: -55, dy:  80, rot: -85, scale: 2.1,  shape: 2, pal: 3 },
      { dx:  40, dy:  90, rot:  30, scale: 2.5,  shape: 1, pal: 4 },
      { dx: 100, dy:  70, rot:  72, scale: 1.9,  shape: 0, pal: 1 },
    ],
  },
  // Third cluster — spreads toward centre
  {
    cx: 370, cy: 25,
    swDur: 5.9, swDelay: 2.4,
    leaves: [
      { dx: -40, dy:  40, rot: -60, scale: 2.4,  shape: 0, pal: 2 },
      { dx:  15, dy:  25, rot:   5, scale: 2.8,  shape: 3, pal: 0 },
      { dx:  60, dy:  55, rot:  42, scale: 2.2,  shape: 1, pal: 1 },
      { dx: -20, dy:  90, rot: -30, scale: 2.0,  shape: 2, pal: 4 },
      { dx:  45, dy: 100, rot:  60, scale: 2.3,  shape: 0, pal: 3 },
    ],
  },
  // Fourth cluster — slightly deeper, creates layering depth
  {
    cx: 130, cy: 120,
    swDur: 8.4, swDelay: 3.6,
    leaves: [
      { dx: -35, dy:  20, rot: -65, scale: 2.3,  shape: 2, pal: 1 },
      { dx:  25, dy:  10, rot:  20, scale: 2.6,  shape: 0, pal: 3 },
      { dx:  70, dy:  35, rot:  55, scale: 2.1,  shape: 3, pal: 2 },
      { dx: -60, dy:  60, rot: -95, scale: 1.9,  shape: 1, pal: 0 },
      { dx:  40, dy:  75, rot:  35, scale: 2.2,  shape: 2, pal: 4 },
    ],
  },
]

// Background (darker, blurred) leaf groups
const LEFT_BG_GROUPS = [
  {
    cx: 80, cy: 45,
    swDur: 11.0, swDelay: 0,
    leaves: [
      { dx:  10, dy:  30, rot:  -35, scale: 2.2, shape: 1, pal: 3 },
      { dx:  60, dy:  20, rot:   20, scale: 1.9, shape: 0, pal: 3 },
      { dx: 120, dy:  50, rot:   58, scale: 2.0, shape: 2, pal: 3 },
      { dx:  -5, dy:  80, rot:  -60, scale: 1.8, shape: 3, pal: 3 },
    ],
  },
  {
    cx: 310, cy: 35,
    swDur: 9.5, swDelay: 1.8,
    leaves: [
      { dx: -25, dy:  30, rot: -52, scale: 2.0, shape: 0, pal: 3 },
      { dx:  30, dy:  15, rot:  12, scale: 2.3, shape: 2, pal: 3 },
      { dx:  75, dy:  45, rot:  48, scale: 1.85,shape: 1, pal: 3 },
      { dx: -10, dy:  75, rot: -25, scale: 1.95,shape: 3, pal: 3 },
    ],
  },
]

// ─── SVG defs ──────────────────────────────────────────────────────────────────
function CanopyDefs({ pfx }) {
  return (
    <defs>
      {PALETTES.map((p, i) => (
        <radialGradient key={i} id={`${pfx}-lg-${i}`}
          cx={p.cx} cy={p.cy} r="66%" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={p.c0} stopOpacity="0.55" />
          <stop offset="22%"  stopColor={p.c1} stopOpacity="0.92" />
          <stop offset="60%"  stopColor={p.c2} stopOpacity="0.97" />
          <stop offset="100%" stopColor={p.c3} stopOpacity="1"    />
        </radialGradient>
      ))}

      {PALETTES.map((p, i) => (
        <linearGradient key={i} id={`${pfx}-surf-${i}`}
          x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%"   stopColor={p.surf} />
          <stop offset="45%"  stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.14)" />
        </linearGradient>
      ))}

      <filter id={`${pfx}-leaf-shd`} x="-35%" y="-35%" width="170%" height="170%">
        <feDropShadow dx="2" dy="7" stdDeviation="5" floodColor="#061409" floodOpacity="0.50" />
      </filter>

      <filter id={`${pfx}-leaf-tex`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" seed="2" result="noise"/>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8"
          xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  )
}

// ─── Single leaf ───────────────────────────────────────────────────────────────
function Leaf({ x, y, rot, scale = 1, shapeIdx, palIdx, pfx, microDur, microDelay, amp, ampNeg, isBg }) {
  const s   = SHAPES[shapeIdx % SHAPES.length]
  const p   = PALETTES[palIdx % PALETTES.length]
  const gid = `${pfx}-lg-${palIdx % PALETTES.length}`
  const sid = `${pfx}-surf-${palIdx % PALETTES.length}`
  const secondary = s.veins.slice(0, 8)
  const tertiary  = s.veins.slice(8)

  return (
    <g
      className="canopy-leaf"
      transform={`translate(${x},${y}) rotate(${rot}) scale(${scale})`}
      style={{
        '--rot':         `${rot}deg`,
        '--micro-dur':   `${microDur}s`,
        '--micro-delay': `${microDelay}s`,
        '--amp':         `${amp}deg`,
        '--amp-neg':     `${ampNeg}deg`,
      }}
    >
      {/* Petiole */}
      <path d={s.petiole} stroke="#2a1208" strokeWidth="2.2" fill="none"
        strokeLinecap="round" strokeOpacity="0.8" />

      {/* Leaf body — radial subsurface gradient */}
      <path d={s.body} fill={`url(#${gid})`}
        filter={isBg ? undefined : `url(#${pfx}-leaf-tex)`} />

      {/* Surface lighting — 3-D curl */}
      {!isBg && <path d={s.body} fill={`url(#${sid})`} />}

      {/* Midrib shadow underneath (gives raised vein illusion) */}
      {!isBg && (
        <path d={s.mid} stroke="rgba(0,0,0,0.18)" strokeWidth="2.8"
          fill="none" strokeLinecap="round" />
      )}

      {/* Midrib — primary vein */}
      <path d={s.mid} stroke={p.vein} strokeWidth="1.6" fill="none"
        strokeLinecap="round" strokeOpacity="0.9" />

      {/* Secondary veins */}
      {secondary.map((v, vi) => (
        <path key={vi} d={v} stroke={p.vein} strokeWidth="0.75" fill="none"
          strokeLinecap="round" strokeOpacity="0.62" />
      ))}

      {/* Tertiary vein reticulation */}
      {!isBg && tertiary.map((v, vi) => (
        <path key={vi} d={v} stroke={p.vein} strokeWidth="0.38" fill="none"
          strokeLinecap="round" strokeOpacity="0.34" />
      ))}

      {/* Specular glossy highlight */}
      <ellipse cx="-7" cy={-(s.h * 0.32)} rx={s.w * 0.14} ry={s.h * 0.17}
        fill="rgba(255,255,255,0.14)" transform="rotate(-26,-7,0)" />
      <ellipse cx="-3" cy={-(s.h * 0.44)} rx={s.w * 0.06} ry={s.h * 0.08}
        fill="rgba(255,255,255,0.09)" transform="rotate(-18,-3,0)" />

      {/* Rim light */}
      <path d={s.body} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.8" />

      {/* Drop shadow */}
      {!isBg && (
        <path d={s.body} fill="transparent" filter={`url(#${pfx}-leaf-shd)`} />
      )}
    </g>
  )
}

// ─── Leaf group ────────────────────────────────────────────────────────────────
function LeafGroup({ cx, cy, swDur, swDelay, leaves, pfx, isBg = false }) {
  return (
    <g
      className="leaf-cluster"
      style={{
        '--cluster-dur':   `${swDur}s`,
        '--cluster-delay': `${swDelay}s`,
        '--sw-pos':  `${2.8 + swDelay * 0.22}deg`,
        '--sw-neg':  `-${1.8 + swDelay * 0.16}deg`,
        '--sw-pos2': `2deg`,
        transformOrigin: `${cx}px ${cy}px`,
      }}
    >
      {leaves.map((lf, i) => (
        <Leaf
          key={i}
          x={cx + lf.dx}
          y={cy + lf.dy}
          rot={lf.rot}
          scale={isBg ? lf.scale * 0.85 : lf.scale}
          shapeIdx={lf.shape}
          palIdx={isBg ? 3 : lf.pal}
          pfx={pfx}
          microDur={2.8 + i * 0.38 + swDelay * 0.2}
          microDelay={i * 0.28 + swDelay * 0.5}
          amp={2.5 + Math.sin(i + swDelay) * 1.3}
          ampNeg={1.5 + Math.cos(i + swDelay) * 0.9}
          isBg={isBg}
        />
      ))}
    </g>
  )
}

// ─── Falling leaf ──────────────────────────────────────────────────────────────
const MAX_LEAVES = 12

function FallingLeaf({ leaf }) {
  const s = SHAPES[leaf.shapeIdx]
  const p = PALETTES[leaf.palIdx] ?? PALETTES[0]
  const gid = `fl-g-${leaf.id}`

  return (
    <div
      className={`falling-leaf falling-leaf--${leaf.depth ?? 'mid'}`}
      style={{
        left: leaf.x,
        top: leaf.y,
        '--fall-dur':   `${leaf.dur}s`,
        '--fall-delay': '0s',
        '--fall':       `${leaf.fall ?? 900}px`,
        '--dx1': `${leaf.dx1}px`, '--dx2': `${leaf.dx2}px`,
        '--dx3': `${leaf.dx3}px`, '--dx4': `${leaf.dx4}px`,
        '--dx5': `${leaf.dx5 ?? 0}px`, '--dx6': `${leaf.dx6 ?? 0}px`,
        '--dx7': `${leaf.dx7 ?? 0}px`,
        '--r0': `${leaf.r0}deg`, '--r1': `${leaf.r1}deg`,
        '--r2': `${leaf.r2}deg`, '--r3': `${leaf.r3}deg`,
        '--r4': `${leaf.r4}deg`, '--r5': `${leaf.r5}deg`,
        '--r6': `${leaf.r6 ?? leaf.r5}deg`,
        '--r7': `${leaf.r7 ?? leaf.r5}deg`,
        '--leaf-op': leaf.op,
        filter: leaf.blur > 0 ? `blur(${leaf.blur}px)` : undefined,
      }}
    >
      <svg
        width={leaf.size} height={leaf.size * (s.h / s.w)}
        viewBox={`${-s.w/2-6} ${-s.h/2-6} ${s.w+12} ${s.h+12}`}
        overflow="visible"
      >
        <defs>
          <radialGradient id={gid} cx={p.cx} cy={p.cy} r="66%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={p.c0} stopOpacity="0.5" />
            <stop offset="22%"  stopColor={p.c1} />
            <stop offset="60%"  stopColor={p.c2} />
            <stop offset="100%" stopColor={p.c3} />
          </radialGradient>
        </defs>
        <path d={s.body} fill={`url(#${gid})`} />
        <path d={s.mid} stroke={p.vein} strokeWidth="1.4" fill="none"
          strokeLinecap="round" strokeOpacity="0.85" />
        {s.veins.slice(0, 8).map((v, i) => (
          <path key={i} d={v} stroke={p.vein} strokeWidth="0.65" fill="none"
            strokeLinecap="round" strokeOpacity="0.54" />
        ))}
        <ellipse cx="-7" cy={-(s.h * 0.28)} rx={s.w * 0.14} ry={s.h * 0.17}
          fill="rgba(255,255,255,0.13)" transform="rotate(-22,-7,0)" />
        <path d={s.body} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

// ─── One panel (left or right) ─────────────────────────────────────────────────
function CanopyPanel({ pfx, swayDur, swayDelay, swayDurBg, swayDelayBg }) {
  const isLeft = pfx === 'l'
  return (
    <svg
      className={`canopy-panel canopy-panel--${isLeft ? 'left' : 'right'}`}
      width="560" height="380"
      viewBox="0 0 560 380"
      overflow="visible"
    >
      <CanopyDefs pfx={pfx} />

      {/* Background layer */}
      <g className="canopy-layer--bg" opacity="0.44">
        <g className="branch-group branch-group--secondary"
          style={{ '--sway-dur': `${swayDurBg}s`, '--sway-delay': `${swayDelayBg}s` }}>
          {LEFT_BG_GROUPS.map((g, i) => (
            <LeafGroup key={i} {...g} pfx={pfx} isBg />
          ))}
        </g>
      </g>

      {/* Foreground layer */}
      <g className="canopy-layer--fg">
        <g className="branch-group"
          style={{ '--sway-dur': `${swayDur}s`, '--sway-delay': `${swayDelay}s` }}>
          {LEFT_GROUPS.map((g, i) => (
            <LeafGroup key={i} {...g} pfx={pfx} />
          ))}
        </g>
      </g>
    </svg>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function ForestCanopy() {
  const [fallingLeaves, setFallingLeaves] = useState([])
  const nextId = useRef(0)

  const spawnLeaf = useCallback(() => {
    const id = nextId.current++
    const r0 = Math.random() * 360
    const isAutumn = Math.random() < 0.18
    const rawDepth = Math.random()
    const depth = rawDepth < 0.25 ? 'near' : rawDepth < 0.68 ? 'mid' : 'far'

    const baseSize = depth === 'near' ? 54 + Math.random() * 28
                   : depth === 'mid'  ? 34 + Math.random() * 22
                   :                    18 + Math.random() * 16

    const blur = depth === 'near' ? Math.random() * 0.5
               : depth === 'mid'  ? 0
               :                    Math.random() * 0.4

    const baseDur = depth === 'near' ? 7 + Math.random() * 5
                  : depth === 'mid'  ? 10 + Math.random() * 7
                  :                    14 + Math.random() * 8

    const spin = (220 + Math.random() * 320) * (Math.random() < 0.5 ? 1 : -1)
    const r = (pct) => r0 + spin * pct
    const windDir = Math.random() < 0.5 ? 1 : -1
    const maxDrift = 40 + Math.random() * 70
    const d = (f) => windDir * maxDrift * f + (Math.random() - 0.5) * 18

    setFallingLeaves(prev => [
      ...prev.slice(-(MAX_LEAVES - 1)),
      {
        id,
        x: Math.random() * window.innerWidth,
        y: Math.random() * 100 - 50,
        size: baseSize,
        shapeIdx: Math.floor(Math.random() * SHAPES.length),
        palIdx: isAutumn ? PALETTES.length - 1 : Math.floor(Math.random() * (PALETTES.length - 1)),
        dur: baseDur,
        delay: 0,
        depth,
        blur,
        fall: window.innerHeight + 260,
        op: depth === 'far' ? 0.44 + Math.random() * 0.28 : 0.74 + Math.random() * 0.20,
        dx1: d(0.28), dx2: d(-0.12), dx3: d(0.52),
        dx4: d(0.18), dx5: d(0.64), dx6: d(0.38), dx7: d(0.52),
        r0: r0, r1: r(0.10), r2: r(0.22), r3: r(0.38),
        r4: r(0.55), r5: r(0.70), r6: r(0.84), r7: r(1.0),
      },
    ])
  }, [])

  useEffect(() => {
    let t
    const schedule = () => {
      t = setTimeout(() => { spawnLeaf(); schedule() }, 1800 + Math.random() * 2400)
    }
    // Pre-populate with staggered leaves so animation starts rich
    const initDelays = [500, 1400, 2800, 4500, 6500]
    initDelays.forEach(delay => setTimeout(spawnLeaf, delay))
    schedule()
    return () => clearTimeout(t)
  }, [spawnLeaf])

  useEffect(() => {
    if (!fallingLeaves.length) return
    const last = fallingLeaves[fallingLeaves.length - 1]
    const t = setTimeout(
      () => setFallingLeaves(p => p.filter(l => l.id !== last.id)),
      (last.dur + 1.5) * 1000
    )
    return () => clearTimeout(t)
  }, [fallingLeaves])

  return (
    <div className="forest-canopy" aria-hidden="true">
      <CanopyPanel pfx="l" swayDur={10}  swayDelay={0}    swayDurBg={13} swayDelayBg={-4}   />
      <CanopyPanel pfx="r" swayDur={11}  swayDelay={-2.2} swayDurBg={14} swayDelayBg={-1.5} />
      {fallingLeaves.map(leaf => <FallingLeaf key={leaf.id} leaf={leaf} />)}
    </div>
  )
}
