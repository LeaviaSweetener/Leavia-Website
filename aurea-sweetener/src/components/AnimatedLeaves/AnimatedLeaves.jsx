import { useMemo, useEffect, useRef } from 'react'
import { useScrollY } from '../../hooks/useScrollAnimation'
import './AnimatedLeaves.css'

// Premium botanical leaf shapes — viewBox 0 0 100 100
const LEAF_DEFS = [
  {
    // Ovate serrated — stevia / herb leaf with natural teeth on margin
    body: `M50,6 C57,6 66,11 70,19 Q73,23 69,27 Q73,31 68,36
      Q71,41 65,46 C60,56 55,70 51,82 Q50.5,87 50,91
      Q49.5,87 49,82 C45,70 40,56 35,46
      Q29,41 32,36 Q27,31 32,27 Q27,23 30,19
      C34,11 43,6 50,6Z`,
    mid: `M50,6 C49,32 51,60 50,91`,
    veins: [
      `M50,20 C57,24 64,30 68,41`, `M50,34 C56,38 62,45 65,55`,
      `M50,49 C54,53 58,61 60,70`, `M50,63 C53,67 56,73 57,81`,
      `M50,20 C43,24 36,30 32,41`, `M50,34 C44,38 38,45 35,55`,
      `M50,49 C46,53 42,61 40,70`, `M50,63 C47,67 44,73 43,81`,
    ],
    shine: `M38,13 C36,20 37,34 41,43 C38,32 40,18 46,14Z`,
  },
  {
    // Broad elliptic — smooth tropical, rounded base
    body: `M50,8 C63,8 79,20 85,36 Q88,44 85,54
      Q89,64 83,72 C74,86 62,94 50,96
      C38,94 26,86 17,72 Q11,64 15,54
      Q11,44 15,36 C21,20 37,8 50,8Z`,
    mid: `M50,8 C46,40 54,66 50,96`,
    veins: [
      `M50,22 C60,28 72,38 78,52`, `M50,42 C58,48 67,56 71,68`,
      `M50,62 C56,67 62,74 64,84`,
      `M50,22 C40,28 28,38 22,52`, `M50,42 C42,48 33,56 29,68`,
      `M50,62 C44,67 38,74 36,84`,
    ],
    shine: `M36,16 C33,24 35,40 40,50 C37,38 38,24 44,18Z`,
  },
  {
    // Lanceolate narrow — willow / eucalyptus, slim flowing edges
    body: `M50,4 C53,4 57,9 58,17 Q60,23 57,29 Q61,35 57,41
      Q60,48 56,55 Q59,62 55,70 Q53,78 50,85
      Q47,78 45,70 Q41,62 44,55 Q40,48 43,41
      Q39,35 43,29 Q40,23 42,17 C43,9 47,4 50,4Z`,
    mid: `M50,4 C49,36 51,60 50,85`,
    veins: [
      `M50,16 C54,20 57,27 58,36`, `M50,30 C53,34 56,41 57,50`,
      `M50,45 C53,49 55,56 55,64`, `M50,59 C52,63 53,69 53,76`,
      `M50,16 C46,20 43,27 42,36`, `M50,30 C47,34 44,41 43,50`,
      `M50,45 C47,49 45,56 45,64`, `M50,59 C48,63 47,69 47,76`,
    ],
    shine: `M44,10 C42,16 43,30 46,40 C44,28 45,14 49,11Z`,
  },
  {
    // Lobed organic — mulberry / fig, undulating lobes
    body: `M50,6 C55,6 63,10 66,18 Q72,12 74,22 Q80,20 77,31
      Q82,30 79,41 Q81,48 75,52 Q73,61 64,66
      Q58,70 50,71 Q42,70 36,66 Q27,61 25,52
      Q19,48 21,41 Q18,30 23,31 Q20,20 26,22
      Q28,12 34,18 C37,10 45,6 50,6Z`,
    mid: `M50,6 C47,28 53,50 50,71`,
    veins: [
      `M50,16 C57,21 65,30 70,43`, `M50,32 C56,37 63,45 66,56`,
      `M50,16 C43,21 35,30 30,43`, `M50,32 C44,37 37,45 34,56`,
    ],
    shine: `M38,14 C36,20 38,34 42,43 C40,31 40,18 46,15Z`,
  },
  {
    // Cordate — heart-notched base, elegant curve
    body: `M50,9 C55,9 64,14 69,23 Q75,14 81,23
      C83,32 79,43 73,54 C65,67 57,78 50,87
      C43,78 35,67 27,54 C21,43 17,32 19,23
      Q25,14 31,23 C36,14 45,9 50,9Z`,
    mid: `M50,9 C47,38 53,62 50,87`,
    veins: [
      `M50,22 C58,28 66,38 70,52`, `M50,42 C57,48 63,56 65,68`,
      `M50,22 C42,28 34,38 30,52`, `M50,42 C43,48 37,56 35,68`,
    ],
    shine: `M38,16 C36,22 37,36 42,46 C39,34 40,20 46,17Z`,
  },
  {
    // Obovate — wider at apex, spade silhouette
    body: `M50,10 C58,10 70,18 76,30 Q82,38 80,48
      Q84,58 77,66 C70,78 60,90 50,94
      C40,90 30,78 23,66 Q16,58 20,48
      Q18,38 24,30 C30,18 42,10 50,10Z`,
    mid: `M50,10 C46,42 54,68 50,94`,
    veins: [
      `M50,24 C59,30 70,40 75,54`, `M50,44 C57,50 65,58 68,70`,
      `M50,64 C55,69 60,76 62,84`,
      `M50,24 C41,30 30,40 25,54`, `M50,44 C43,50 35,58 32,70`,
      `M50,64 C45,69 40,76 38,84`,
    ],
    shine: `M37,18 C35,26 36,42 41,52 C38,40 39,24 45,19Z`,
  },
]

// Color palettes: c1=rim highlight, c2=midtone, c3=base, c4=deep shadow
const PALETTES = [
  { c1:'#a8d46e', c2:'#4ea83a', c3:'#1D783B', c4:'#0e3c1c',
    vein:'rgba(210,255,185,0.42)', spec:'rgba(255,255,255,0.24)' },
  { c1:'#4a9e58', c2:'#2d6e3a', c3:'#14542A', c4:'#081c0e',
    vein:'rgba(170,220,160,0.28)', spec:'rgba(255,255,255,0.14)' },
  { c1:'#72ca82', c2:'#38a050', c3:'#1D783B', c4:'#0a2e18',
    vein:'rgba(195,245,195,0.36)', spec:'rgba(255,255,255,0.20)' },
  { c1:'#8a9e48', c2:'#5a7030', c3:'#3a4e1c', c4:'#141c08',
    vein:'rgba(180,210,120,0.24)', spec:'rgba(255,255,220,0.12)' },
  { c1:'#e8b84a', c2:'#c98020', c3:'#8b5514', c4:'#3c1e06',
    vein:'rgba(255,225,130,0.38)', spec:'rgba(255,240,180,0.22)' },
]

const LEAF_COUNT = 22

function generateLeaves() {
  return Array.from({ length: LEAF_COUNT }, (_, i) => {
    const isAutumn = i === 5 || i === 13
    const palIdx = isAutumn ? 4 : Math.floor(Math.random() * 4)
    const depth = 0.3 + Math.random() * 0.7
    return {
      id: i,
      leafIdx: i % LEAF_DEFS.length,
      palIdx,
      size: (20 + Math.random() * 42) * (0.5 + depth * 0.6),
      x: Math.random() * 96 + 2,
      dur: 14 + Math.random() * 18,
      delay: Math.random() * 22,
      swayDur: 5 + Math.random() * 7,
      swayDelay: Math.random() * 5,
      opacity: 0.28 + Math.random() * 0.52,
      depth,
      rotation: Math.random() * 360,
      animIdx: (i % 4) + 1,
    }
  })
}

export default function AnimatedLeaves({ intensity = 1 }) {
  const leaves = useMemo(() => generateLeaves(), [])
  const containerRef = useRef(null)
  const { scrollY, scrollVelocity } = useScrollY()

  useEffect(() => {
    if (!containerRef.current) return
    const leafEls = containerRef.current.querySelectorAll('.leaf')
    const velocityFactor = Math.min(Math.abs(scrollVelocity) * 0.5, 15)
    leafEls.forEach((el, i) => {
      const leaf = leaves[i]
      if (!leaf) return
      const offset = scrollY * leaf.depth * 0.04 * intensity
      const skew = scrollVelocity * leaf.depth * 0.12
      el.style.transform = `translateY(${-offset}px) skewX(${skew}deg)`
      el.style.animationPlayState = velocityFactor > 8 ? 'paused' : 'running'
    })
  }, [scrollY, scrollVelocity, leaves, intensity])

  return (
    <div ref={containerRef} className="animated-leaves" aria-hidden="true">
      {leaves.map((leaf) => {
        const def = LEAF_DEFS[leaf.leafIdx]
        const pal = PALETTES[leaf.palIdx]
        const gid = `al-g-${leaf.id}`
        const sid = `al-s-${leaf.id}`
        return (
          <div
            key={leaf.id}
            className="leaf"
            style={{
              left: `${leaf.x}%`,
              animationName: `alFloat${leaf.animIdx}`,
              animationDuration: `${leaf.dur}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <svg
              width={leaf.size}
              height={leaf.size}
              viewBox="0 0 100 100"
              style={{
                animation: `alWiggle ${leaf.swayDur}s ease-in-out ${leaf.swayDelay}s infinite`,
                filter: `drop-shadow(0 3px 8px rgba(0,0,0,0.18))`,
                transform: `rotate(${leaf.rotation}deg)`,
              }}
            >
              <defs>
                <radialGradient id={gid} cx="38%" cy="22%" r="72%">
                  <stop offset="0%"   stopColor={pal.c1} stopOpacity="0.62" />
                  <stop offset="28%"  stopColor={pal.c2} stopOpacity="0.94" />
                  <stop offset="68%"  stopColor={pal.c3} stopOpacity="0.98" />
                  <stop offset="100%" stopColor={pal.c4} stopOpacity="1" />
                </radialGradient>
                <linearGradient id={sid} x1="18%" y1="8%" x2="82%" y2="92%">
                  <stop offset="0%"   stopColor={pal.spec} />
                  <stop offset="45%"  stopColor="rgba(255,255,255,0)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.10)" />
                </linearGradient>
              </defs>

              {/* Leaf body */}
              <path d={def.body} fill={`url(#${gid})`} opacity={leaf.opacity * intensity} />
              {/* Surface sheen */}
              <path d={def.body} fill={`url(#${sid})`} opacity={leaf.opacity * intensity * 0.7} />
              {/* Midrib shadow — depth */}
              <path d={def.mid} stroke="rgba(0,0,0,0.16)" strokeWidth="2.2"
                fill="none" strokeLinecap="round" opacity={leaf.opacity * intensity} />
              {/* Midrib light */}
              <path d={def.mid} stroke={pal.vein} strokeWidth="1.4"
                fill="none" strokeLinecap="round" strokeOpacity="0.9"
                opacity={leaf.opacity * intensity} />
              {/* Secondary veins */}
              {def.veins.map((v, vi) => (
                <path key={vi} d={v} stroke={pal.vein} strokeWidth="0.65"
                  fill="none" strokeLinecap="round" strokeOpacity="0.55"
                  opacity={leaf.opacity * intensity} />
              ))}
              {/* Specular shine */}
              <path d={def.shine} fill="rgba(255,255,255,0.09)"
                opacity={leaf.opacity * intensity} />
              {/* Rim light */}
              <path d={def.body} fill="none"
                stroke="rgba(255,255,255,0.07)" strokeWidth="1.4"
                opacity={leaf.opacity * intensity} />
            </svg>
          </div>
        )
      })}

      {/* Static decorative corner accents */}
      <div className="leaf leaf--static leaf--corner-tl">
        <svg viewBox="0 0 140 140" width="140" height="140">
          <defs>
            <radialGradient id="al-ctl" cx="35%" cy="20%" r="70%">
              <stop offset="0%" stopColor="#4a9e58" stopOpacity="0.72"/>
              <stop offset="100%" stopColor="#0b2e15" stopOpacity="0.90"/>
            </radialGradient>
          </defs>
          <path d="M4,136 C4,136 84,118 102,4 C102,4 10,36 4,136Z" fill="url(#al-ctl)"/>
          <path d="M4,136 L102,4" stroke="#c9a84c" strokeWidth="1.2"
            strokeDasharray="3,5" opacity="0.36" fill="none"/>
          {[22, 44, 66].map((t, i) => {
            const x = 4 + 98 * t / 100
            const y = 136 - 132 * t / 100
            const len = 20 - i * 5
            return <line key={i} x1={x} y1={y} x2={x + len * 0.65} y2={y - len}
              stroke="rgba(168,212,110,0.32)" strokeWidth="1.1" strokeLinecap="round"/>
          })}
        </svg>
      </div>
      <div className="leaf leaf--static leaf--corner-br">
        <svg viewBox="0 0 120 120" width="120" height="120">
          <defs>
            <radialGradient id="al-cbr" cx="65%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#4a9e58" stopOpacity="0.65"/>
              <stop offset="100%" stopColor="#0b2e15" stopOpacity="0.88"/>
            </radialGradient>
          </defs>
          <path d="M116,4 C116,4 28,30 10,116 C10,116 96,90 116,4Z" fill="url(#al-cbr)"/>
          <path d="M116,4 L10,116" stroke="#c9a84c" strokeWidth="1.2"
            strokeDasharray="3,5" opacity="0.30" fill="none"/>
          {[25, 55].map((t, i) => {
            const x = 116 - 106 * t / 100
            const y = 4 + 112 * t / 100
            return <line key={i} x1={x} y1={y} x2={x - 16 + i * 5} y2={y + 16 - i * 5}
              stroke="rgba(168,212,110,0.28)" strokeWidth="1.1" strokeLinecap="round"/>
          })}
        </svg>
      </div>
    </div>
  )
}
