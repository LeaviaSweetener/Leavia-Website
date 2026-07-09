import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, Environment, PerspectiveCamera, OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useSmoothMousePosition } from '../../hooks/useMousePosition'
import { useLanguage } from '../../context/LanguageContext'
import './Product3D.css'

/* ============================================================
   CUBE FACE IMAGES — replace each path with your own image.
   Set any face to null to use the built-in canvas artwork instead.
   ============================================================ */
const CUBE_FACE_IMAGES = {
  front:  '/mockups/FrontAr.png',
  back:   '/mockups/FrontEn.png',
  right:  '/mockups/detailsAr.png',
  left:   '/mockups/detailsEn.png',
  top:    '/product/top-of-product.png',
  bottom: null,
}

/* ============================================================
   BRAND PALETTE
   ============================================================ */
const G_DARK  = '#14542A'
const G_MID   = '#1D783B'
const G_LIGHT = '#2d8a4e'
const GOLD    = '#c9a84c'
const GOLD_BR = '#f0d060'

/* ============================================================
   HELPERS
   ============================================================ */
function addGrain(ctx, w, h, n = 5000, a = 0.012) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * a})`
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
  }
}

function leaf(ctx, x, y, angle, size, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.bezierCurveTo(size * 0.54, -size * 0.28, size * 0.54, size * 0.28, 0, size * 0.22)
  ctx.bezierCurveTo(-size * 0.54, size * 0.28, -size * 0.54, -size * 0.28, 0, -size)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.26)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.lineTo(0, size * 0.22)
  ctx.stroke()
  ctx.restore()
}

function diamond(ctx, x, y, size, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  ctx.moveTo(0, -size); ctx.lineTo(size, 0); ctx.lineTo(0, size); ctx.lineTo(-size, 0)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
}

function gradLine(ctx, x1, x2, y, color) {
  const c = color || GOLD
  const g = ctx.createLinearGradient(x1, 0, x2, 0)
  g.addColorStop(0, 'transparent')
  g.addColorStop(0.18, c)
  g.addColorStop(0.82, c)
  g.addColorStop(1, 'transparent')
  ctx.strokeStyle = g
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke()
}

/* ---- Realistic scalloped stevia plant (matches reference photo) ---- */
function drawStevia(ctx, x, y, size) {
  ctx.save()
  ctx.translate(x, y)

  // Single scalloped leaf with gradient + veins
  function sLeaf(lx, ly, lw, lh, angle) {
    ctx.save()
    ctx.translate(lx, ly)
    ctx.rotate(angle)

    const g = ctx.createRadialGradient(-lw * 0.18, -lh * 0.28, 0, -lw * 0.08, -lh * 0.1, Math.max(lw, lh) * 1.15)
    g.addColorStop(0,   '#6aaa62')
    g.addColorStop(0.25, '#3d8040')
    g.addColorStop(0.55, '#205c28')
    g.addColorStop(0.80, '#133d1a')
    g.addColorStop(1,   '#0a2410')

    const nB = 7
    ctx.beginPath()
    ctx.moveTo(0, -lh)
    for (let i = 1; i <= nB; i++) {
      const t    = i / nB
      const tMid = (i - 0.5) / nB
      const r  = (tt) => Math.sin(tt * Math.PI * 0.94) * lw
      const yy = (tt) => -lh + tt * lh * 2.0
      const bump = lw * 0.13 * Math.sin(tMid * Math.PI)
      ctx.quadraticCurveTo(r(tMid) + bump, yy(tMid), r(t), yy(t))
    }
    ctx.bezierCurveTo(lw * 0.35, lh * 0.95, -lw * 0.35, lh * 0.95, 0, lh * 0.95)
    for (let i = nB; i >= 1; i--) {
      const t    = i / nB
      const tMid = (i - 0.5) / nB
      const r  = (tt) => -Math.sin(tt * Math.PI * 0.94) * lw
      const yy = (tt) => -lh + tt * lh * 2.0
      const bump = lw * 0.13 * Math.sin(tMid * Math.PI)
      ctx.quadraticCurveTo(r(tMid) - bump, yy(tMid), r(t), yy(t))
    }
    ctx.closePath()
    ctx.fillStyle = g
    ctx.fill()

    // Dark outline
    ctx.strokeStyle = 'rgba(5,18,8,0.50)'
    ctx.lineWidth = 0.8
    ctx.stroke()

    // Central vein
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(255,255,255,0.20)'
    ctx.lineWidth = 1.6
    ctx.moveTo(0, -lh * 0.88)
    ctx.quadraticCurveTo(0, 0, 0, lh * 0.55)
    ctx.stroke()

    // Side veins
    for (let v = 1; v <= 5; v++) {
      const vy   = -lh * 0.72 + v * lh * 0.28
      const maxW = Math.sin(((vy + lh) / (lh * 2)) * Math.PI) * lw * 0.88
      ;[-1, 1].forEach(side => {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255,255,255,0.11)'
        ctx.lineWidth = 0.7
        ctx.moveTo(0, vy)
        ctx.bezierCurveTo(side * maxW * 0.32, vy + lh * 0.032,
                          side * maxW * 0.92, vy + lh * 0.058,
                          side * maxW,        vy + lh * 0.068)
        ctx.stroke()
      })
    }
    ctx.restore()
  }

  const s = size
  ctx.lineCap = 'round'

  // Stems
  ctx.strokeStyle = '#1a4824'
  ctx.lineWidth = s * 0.044
  ctx.beginPath()
  ctx.moveTo(0, s * 0.58); ctx.bezierCurveTo(0, s * 0.38, 0, s * 0.12, 0, 0)
  ctx.stroke()

  ctx.lineWidth = s * 0.030
  ctx.beginPath()
  ctx.moveTo(0, s * 0.05); ctx.bezierCurveTo(-s*0.08, -s*0.10, -s*0.22, -s*0.24, -s*0.33, -s*0.42)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(0, s * 0.05); ctx.bezierCurveTo( s*0.08, -s*0.10,  s*0.22, -s*0.24,  s*0.33, -s*0.42)
  ctx.stroke()

  ctx.lineWidth = s * 0.020
  ctx.beginPath()
  ctx.moveTo(-s*0.19, -s*0.24); ctx.bezierCurveTo(-s*0.24, -s*0.32, -s*0.27, -s*0.38, -s*0.24, -s*0.46)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo( s*0.19, -s*0.24); ctx.bezierCurveTo( s*0.24, -s*0.32,  s*0.27, -s*0.38,  s*0.24, -s*0.46)
  ctx.stroke()

  // Leaves — back to front
  sLeaf(-s*0.44,  s*0.20, s*0.31, s*0.41, -0.90)
  sLeaf( s*0.44,  s*0.20, s*0.31, s*0.41,  0.90)
  sLeaf(-s*0.41, -s*0.02, s*0.28, s*0.37, -0.68)
  sLeaf( s*0.41, -s*0.02, s*0.28, s*0.37,  0.68)
  sLeaf(-s*0.33, -s*0.24, s*0.25, s*0.33, -0.48)
  sLeaf( s*0.33, -s*0.24, s*0.25, s*0.33,  0.48)
  sLeaf(-s*0.20, -s*0.42, s*0.20, s*0.28, -0.27)
  sLeaf( s*0.20, -s*0.42, s*0.20, s*0.28,  0.27)
  sLeaf(      0, -s*0.54, s*0.18, s*0.25,  0.00)

  ctx.restore()
}

// Draws a stevia-style multi-leaf sprig — mirrors the logo icon
function plantSprig(ctx, x, y, size, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.fillStyle = color
  ctx.strokeStyle = color

  // Main stem
  ctx.lineWidth = Math.max(1.5, size * 0.055)
  ctx.beginPath()
  ctx.moveTo(0, size * 0.5)
  ctx.lineTo(0, -size * 0.52)
  ctx.stroke()

  // Leaf pairs (bottom → top) + lone tip leaf
  const pairs = [
    { offset: size * 0.21, y: size * 0.20, angle: 0.60, w: size * 0.38, h: size * 0.60 },
    { offset: size * 0.22, y: -size * 0.01, angle: 0.55, w: size * 0.36, h: size * 0.58 },
    { offset: size * 0.19, y: -size * 0.22, angle: 0.48, w: size * 0.32, h: size * 0.52 },
  ]
  pairs.forEach(({ offset, y: ly, angle, w, h }) => {
    [-1, 1].forEach(side => {
      ctx.save()
      ctx.translate(side * offset * 0.5, ly)
      ctx.rotate(side * angle)
      ctx.beginPath()
      ctx.ellipse(0, -h * 0.44, w * 0.5, h * 0.56, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
  })

  // Tip leaf
  ctx.beginPath()
  ctx.ellipse(0, -size * 0.66, size * 0.18, size * 0.30, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

/* ============================================================
   FRONT / BACK FACE  (1024 x 1594 — matches 1.8 : 2.8 ratio)
   ============================================================ */
function createFrontTexture() {
  const S = 2                              // 2× pixel density → 2048 × 3188
  const W = 1024, H = 1594
  const cv = document.createElement('canvas')
  cv.width = W * S; cv.height = H * S
  const ctx = cv.getContext('2d')
  ctx.scale(S, S)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  const BG   = '#e8f5e3'   // light sage
  const TXT  = '#14542A'   // dark green text
  const MID  = '#2d7a3d'   // mid green
  const LITE = '#9acca8'   // soft green for dividers

  // ── BACKGROUND ────────────────────────────────────────────
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)
  addGrain(ctx, W, H, 3000, 0.006)

  // ── CORNER LEAF DECORATIONS ───────────────────────────────
  ctx.save(); ctx.globalAlpha = 0.13
  leaf(ctx, W - 30, 30, 0.5, 230, TXT)
  ctx.restore()
  ctx.save(); ctx.globalAlpha = 0.10
  leaf(ctx, 30, H - 100, -0.4, 200, TXT)
  ctx.restore()

  // ── LOGO ROW: small leaf icon + LEAVIA ───────────────────
  ctx.save(); ctx.globalAlpha = 1
  leaf(ctx, 82, 118, -0.25, 36, MID)
  ctx.restore()

  ctx.fillStyle = TXT
  ctx.font = 'bold 138px Georgia, serif'
  ctx.textAlign = 'left'
  ctx.fillText('LEAVIA', 118, 175)

  // ── SUBTITLE ──────────────────────────────────────────────
  ctx.fillStyle = TXT
  ctx.font = 'bold 42px Arial, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('% 100 natural sweetener', 60, 240)

  ctx.fillStyle = MID
  ctx.font = '400 27px Arial, sans-serif'
  ctx.fillText('with a taste similar to sugar , with no bitterness', 60, 282)

  // Thin divider
  ctx.strokeStyle = LITE; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(60, 308); ctx.lineTo(W - 60, 308); ctx.stroke()

  // ── DESCRIPTION ───────────────────────────────────────────
  ctx.fillStyle = TXT
  ctx.font = '400 25px Arial, sans-serif'
  ctx.textAlign = 'left'
  const desc = [
    'A 100% natural sweetener extracted only from stevia leaves , offering',
    'a balanced sweetness similar to sugar , free from bitterness and with',
    'zero calories - making it the perfect healthy choice for everyday use',
  ]
  desc.forEach((line, i) => ctx.fillText(line, 60, 356 + i * 37))

  // Thin divider
  ctx.strokeStyle = LITE; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(60, 472); ctx.lineTo(W - 60, 472); ctx.stroke()

  // ── SUITABLE FOR PANEL ────────────────────────────────────
  const sfX = 60, sfY = 492, sfW = 558, sfH = 200
  ctx.strokeStyle = TXT; ctx.lineWidth = 1.5
  ctx.strokeRect(sfX, sfY, sfW, sfH)

  ctx.fillStyle = TXT
  ctx.fillRect(sfX, sfY, sfW, 38)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 20px Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('SUITABLE FOR', sfX + sfW / 2, sfY + 25)

  const cols = ['Cooking', 'Baking', 'Beverages']
  const subs = ['Heat Resistance', 'Heat Resistance', 'Hot & Cold']
  const icons = [
    (cx, cy) => { // pot
      ctx.beginPath(); ctx.arc(cx, cy - 14, 24, 0, Math.PI * 2)
      ctx.strokeStyle = TXT; ctx.lineWidth = 2; ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx - 30, cy - 14); ctx.lineTo(cx - 30, cy + 10); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx + 30, cy - 14); ctx.lineTo(cx + 30, cy + 10); ctx.stroke()
    },
    (cx, cy) => { // bread
      ctx.beginPath()
      ctx.ellipse(cx, cy - 10, 26, 18, 0, Math.PI, 0)
      ctx.strokeStyle = TXT; ctx.lineWidth = 2; ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx - 26, cy - 10); ctx.lineTo(cx - 26, cy + 10); ctx.lineTo(cx + 26, cy + 10); ctx.lineTo(cx + 26, cy - 10)
      ctx.stroke()
    },
    (cx, cy) => { // cup
      ctx.beginPath()
      ctx.moveTo(cx - 18, cy - 22); ctx.lineTo(cx - 22, cy + 10); ctx.lineTo(cx + 22, cy + 10); ctx.lineTo(cx + 18, cy - 22)
      ctx.strokeStyle = TXT; ctx.lineWidth = 2; ctx.stroke()
      ctx.beginPath(); ctx.arc(cx + 22, cy - 6, 12, -0.5, 0.5)
      ctx.stroke()
    },
  ]
  const colW = sfW / 3
  cols.forEach((label, i) => {
    const cx = sfX + colW * i + colW / 2
    if (i > 0) {
      ctx.strokeStyle = TXT; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(sfX + colW * i, sfY + 38); ctx.lineTo(sfX + colW * i, sfY + sfH); ctx.stroke()
    }
    icons[i](cx, sfY + 100)
    ctx.fillStyle = TXT; ctx.font = 'bold 24px Arial, sans-serif'; ctx.textAlign = 'center'
    ctx.fillText(label, cx, sfY + 150)
    ctx.fillStyle = MID; ctx.font = '400 18px Arial, sans-serif'
    ctx.fillText(subs[i], cx, sfY + 176)
  })

  // ── HALAL BADGE ───────────────────────────────────────────
  const hx = 820, hy = 560, hr = 60
  ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2)
  ctx.strokeStyle = TXT; ctx.lineWidth = 3; ctx.stroke()
  ctx.beginPath(); ctx.arc(hx, hy, hr - 7, 0, Math.PI * 2)
  ctx.lineWidth = 1; ctx.stroke()
  ctx.fillStyle = TXT; ctx.font = 'bold 26px Cairo, serif'; ctx.textAlign = 'center'
  ctx.fillText('حلال', hx, hy - 4)
  ctx.font = 'bold 18px Arial, sans-serif'
  ctx.fillText('HALAL', hx, hy + 22)

  // ── INGREDIENTS + MADE IN ─────────────────────────────────
  ctx.textAlign = 'left'
  ctx.fillStyle = TXT; ctx.font = 'bold 40px Georgia, serif'
  ctx.fillText('Ingredients', 640, 720)
  ctx.fillStyle = MID; ctx.font = '400 24px Arial, sans-serif'
  ctx.fillText('Erythritol &', 640, 758)
  ctx.fillText('Steviol Glycosides', 640, 790)
  ctx.fillStyle = TXT; ctx.font = 'bold 32px Arial, sans-serif'
  ctx.fillText('Made in China', 640, 850)

  // ── STEVIA PLANT ILLUSTRATION (bottom-right) ──────────────
  drawStevia(ctx, 790, 1170, 280)

  // ── NUTRITION TABLE ───────────────────────────────────────
  const nutRows = [
    ['Calories',        '0 Kcal', '0.0%'],
    ['Total Fat',       '0 g',    '0.0%'],
    ['Saturated Fat',   '0 g',    '0.0%'],
    ['Trans Fat',       '0 g',    '0.0%'],
    ['Monounsaturated', '0 g',    '0.0%'],
    ['Polyunsaturated', '0 g',    '0.0%'],
    ['Cholesterol',     '0 mg',   '0.0%'],
    ['Sodium',          '0 mg',   '0.0%'],
    ['Carbohydrate',    '7 g',    '3%'  ],
    ['Sugars',          '0 g',    '0.0%'],
    ['Added Sugar',     '0 g',    '0.0%'],
    ['Protein',         '0 g',    '0.0%'],
  ]
  const NUT_X = 50, NUT_Y = 910, NUT_W = 480, ROW_H = 32
  const NUT_H = 58 + nutRows.length * ROW_H
  const DIV_X = NUT_X + NUT_W / 2

  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.fillRect(NUT_X, NUT_Y, NUT_W, NUT_H)
  ctx.strokeStyle = '#b8d8b8'; ctx.lineWidth = 1
  ctx.strokeRect(NUT_X, NUT_Y, NUT_W, NUT_H)

  ctx.fillStyle = TXT; ctx.font = 'bold 20px Arial, sans-serif'; ctx.textAlign = 'center'
  ctx.fillText('Nutrition Facts', NUT_X + NUT_W / 2, NUT_Y + 24)
  ctx.fillStyle = '#556655'; ctx.font = '400 14px Arial, sans-serif'
  ctx.fillText('Per Serving  /  لكل حصة', NUT_X + NUT_W / 2, NUT_Y + 44)

  ctx.strokeStyle = TXT; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(NUT_X, NUT_Y + 58); ctx.lineTo(NUT_X + NUT_W, NUT_Y + 58); ctx.stroke()

  ctx.fillStyle = '#1a3a22'; ctx.font = 'bold 13px Arial, sans-serif'; ctx.textAlign = 'center'
  ctx.fillText('Daily Value', DIV_X + (NUT_X + NUT_W - DIV_X) / 2, NUT_Y + 53)

  ctx.font = '400 15px Arial, sans-serif'
  nutRows.forEach(([label, val, dv], i) => {
    const ry = NUT_Y + 58 + i * ROW_H
    ctx.fillStyle = i % 2 === 0 ? 'rgba(200,235,205,0.40)' : 'rgba(255,255,255,0)'
    ctx.fillRect(NUT_X + 1, ry, NUT_W - 2, ROW_H)
    ctx.fillStyle = '#1a3a22'; ctx.textAlign = 'left'
    ctx.fillText(label, NUT_X + 10, ry + ROW_H * 0.68)
    ctx.fillStyle = TXT; ctx.textAlign = 'right'
    ctx.fillText(val, DIV_X - 8, ry + ROW_H * 0.68)
    ctx.fillStyle = TXT; ctx.textAlign = 'center'
    ctx.fillText(dv, DIV_X + (NUT_X + NUT_W - DIV_X) / 2, ry + ROW_H * 0.68)
    ctx.strokeStyle = '#cde8cd'; ctx.lineWidth = 0.5
    ctx.beginPath(); ctx.moveTo(NUT_X + 1, ry + ROW_H); ctx.lineTo(NUT_X + NUT_W - 1, ry + ROW_H); ctx.stroke()
  })

  ctx.strokeStyle = 'rgba(0,0,0,0.15)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(DIV_X, NUT_Y + 58); ctx.lineTo(DIV_X, NUT_Y + NUT_H); ctx.stroke()

  // ── BOTTOM DARK GREEN BAND ────────────────────────────────
  ctx.fillStyle = G_DARK
  ctx.fillRect(0, H - 195, W, 195)

  // Net Weight
  ctx.fillStyle = '#d4eed8'; ctx.font = '400 28px Arial, sans-serif'; ctx.textAlign = 'left'
  ctx.fillText('Net Weight', 58, H - 140)
  ctx.fillStyle = '#ffffff';  ctx.font = 'bold 64px Arial, sans-serif'
  ctx.fillText('500 g', 58, H - 68)

  // ZERO CALORIE seal
  const sx = W - 128, sy = H - 100, sr = 82
  ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2)
  ctx.fillStyle = '#7a6830'; ctx.fill()
  ctx.beginPath(); ctx.arc(sx, sy, sr - 5, 0, Math.PI * 2)
  ctx.fillStyle = '#9a8840'; ctx.fill()
  ctx.beginPath(); ctx.arc(sx, sy, sr - 12, 0, Math.PI * 2)
  ctx.strokeStyle = '#c8b860'; ctx.lineWidth = 1.5; ctx.stroke()

  ctx.fillStyle = '#fff8d8'; ctx.font = 'bold 19px Arial, sans-serif'; ctx.textAlign = 'center'
  ctx.fillText('ZERO', sx, sy - 10)
  ctx.fillText('CALORIE', sx, sy + 16)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    ctx.fillStyle = '#c8b860'; ctx.font = '11px sans-serif'
    ctx.fillText('★', sx + Math.cos(a) * (sr - 20), sy + Math.sin(a) * (sr - 20) + 4)
  }

  return new THREE.CanvasTexture(cv)
}

/* ============================================================
   SIDE FACE  (640 x 1792 — matches 1.0 : 2.8 ratio)
   ============================================================ */
function createSideTexture() {
  const S = 2                              // 1280 × 3584
  const W = 640, H = 1792
  const cv = document.createElement('canvas')
  cv.width = W * S; cv.height = H * S
  const ctx = cv.getContext('2d')
  ctx.scale(S, S)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  ctx.fillStyle = '#e8f5e3'
  ctx.fillRect(0, 0, W, H)
  addGrain(ctx, W, H, 4000, 0.008)

  // Vertical green border strips
  ctx.fillStyle = G_DARK; ctx.fillRect(0, 0, 30, H); ctx.fillRect(W - 30, 0, 30, H)
  ctx.fillStyle = G_MID;  ctx.fillRect(30, 0, 9, H);  ctx.fillRect(W - 39, 0, 9, H)

  // Top & bottom caps
  ctx.fillStyle = G_DARK
  ctx.fillRect(0, 0, W, 118)
  ctx.fillRect(0, H - 118, W, 118)

  ctx.strokeStyle = GOLD; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(39, 130); ctx.lineTo(W - 39, 130); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(39, H - 130); ctx.lineTo(W - 39, H - 130); ctx.stroke()

  // Logo — sprigs
  plantSprig(ctx, W / 2 - 76, H / 2 - 148, 54, G_DARK)
  plantSprig(ctx, W / 2 + 76, H / 2 - 148, 54, G_DARK)

  ctx.fillStyle = G_DARK
  ctx.font = 'bold 68px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('LEAVIA', W / 2, H / 2 - 24)

  ctx.fillStyle = G_MID
  ctx.font = '400 26px Arial, sans-serif'
  ctx.fillText('100% Natural Sweetener', W / 2, H / 2 + 24)

  ctx.fillStyle = '#9a9a9a'
  ctx.font = '400 24px Arial, sans-serif'
  ctx.fillText('300g', W / 2, H / 2 + 92)

  return new THREE.CanvasTexture(cv)
}

/* ============================================================
   TOP FACE  (1024 x 568 — matches 1.8 : 1.0 ratio)
   ============================================================ */
function createTopTexture() {
  const S = 2                              // 2048 × 1136
  const W = 1024, H = 568
  const cv = document.createElement('canvas')
  cv.width = W * S; cv.height = H * S
  const ctx = cv.getContext('2d')
  ctx.scale(S, S)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  ctx.fillStyle = G_DARK
  ctx.fillRect(0, 0, W, H)

  const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 360)
  grad.addColorStop(0, 'rgba(29,120,59,0.70)')
  grad.addColorStop(1, 'rgba(0,0,0,0.12)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)
  addGrain(ctx, W, H, 4000, 0.02)

  ctx.strokeStyle = G_MID;  ctx.lineWidth = 8
  ctx.strokeRect(22, 22, W - 44, H - 44)
  ctx.strokeStyle = 'rgba(201,168,76,0.48)'; ctx.lineWidth = 2
  ctx.strokeRect(36, 36, W - 72, H - 72)

  drawStevia(ctx, W / 2, H / 2 - 30, 130)

  ctx.fillStyle = '#d4eed8'
  ctx.font = 'bold 50px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('LEAVIA', W / 2, H / 2 + 106)

  return new THREE.CanvasTexture(cv)
}

/* ============================================================
   BOTTOM FACE
   ============================================================ */
function createBottomTexture() {
  const S = 2                              // 2048 × 1136
  const W = 1024, H = 568
  const cv = document.createElement('canvas')
  cv.width = W * S; cv.height = H * S
  const ctx = cv.getContext('2d')
  ctx.scale(S, S)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.fillStyle = '#f2f2f2'
  ctx.fillRect(0, 0, W, H)
  addGrain(ctx, W, H, 2000, 0.01)
  ctx.strokeStyle = G_DARK; ctx.lineWidth = 22
  ctx.strokeRect(15, 15, W - 30, H - 30)
  ctx.strokeStyle = G_MID; ctx.lineWidth = 5
  ctx.strokeRect(40, 40, W - 80, H - 80)
  return new THREE.CanvasTexture(cv)
}

/* ============================================================
   IMAGE TEXTURE LOADER
   Loads a URL into a THREE.Texture; returns null until ready.
   Automatically sets encoding, repeat, and disposes on unmount.
   ============================================================ */
function useImageTexture(url) {
  const [tex, setTex] = useState(null)

  useEffect(() => {
    if (!url) { setTex(null); return }
    let alive = true

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      if (!alive) return
      // Flatten onto a white canvas so RGBA PNGs with transparent backgrounds
      // never bleed the 3-D environment colour through the face.
      const cv = document.createElement('canvas')
      cv.width  = img.naturalWidth
      cv.height = img.naturalHeight
      const ctx = cv.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality  = 'high'
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, cv.width, cv.height)
      ctx.drawImage(img, 0, 0)

      const t = new THREE.CanvasTexture(cv)
      t.colorSpace    = THREE.SRGBColorSpace
      t.wrapS         = THREE.ClampToEdgeWrapping
      t.wrapT         = THREE.ClampToEdgeWrapping
      t.minFilter     = THREE.LinearMipmapLinearFilter
      t.magFilter     = THREE.LinearFilter
      t.anisotropy    = 16
      t.generateMipmaps = true
      t.needsUpdate   = true
      setTex(t)
    }

    img.onerror = () => { if (alive) setTex(null) }
    img.src = url

    return () => { alive = false }
  }, [url])

  return tex
}

/* ============================================================
   CARDBOARD BOX MESH
   ============================================================ */
function ProductBox({ mousePosition, onBoxClick }) {
  const groupRef   = useRef()
  const autoRot    = useRef(0)
  const pointerDown = useRef(null)
  const { gl } = useThree()

  // Canvas fallback textures (always created; used when no image is supplied)
  const frontCanvasTex = useMemo(() => createFrontTexture(), [])
  const sideCanvasTex  = useMemo(() => createSideTexture(),  [])
  const topCanvasTex   = useMemo(() => createTopTexture(),   [])
  const botCanvasTex   = useMemo(() => createBottomTexture(),[])

  // Image textures — each resolves to null when CUBE_FACE_IMAGES[face] is null
  const frontImgTex  = useImageTexture(CUBE_FACE_IMAGES.front)
  const backImgTex   = useImageTexture(CUBE_FACE_IMAGES.back)
  const rightImgTex  = useImageTexture(CUBE_FACE_IMAGES.right)
  const leftImgTex   = useImageTexture(CUBE_FACE_IMAGES.left)
  const topImgTex    = useImageTexture(CUBE_FACE_IMAGES.top)
  const bottomImgTex = useImageTexture(CUBE_FACE_IMAGES.bottom)

  // Resolve: image tex wins over canvas fallback
  const frontTex  = frontImgTex  ?? frontCanvasTex
  const backTex   = backImgTex   ?? frontCanvasTex  // back uses front canvas by default
  const rightTex  = rightImgTex  ?? sideCanvasTex
  const leftTex   = leftImgTex   ?? sideCanvasTex
  const topTex    = topImgTex    ?? topCanvasTex
  const bottomTex = bottomImgTex ?? botCanvasTex

  const boxGeo = useMemo(() => new THREE.BoxGeometry(1.8, 2.8, 1.0, 1, 1, 1), [])

  // Per-face colors — shown when no image is assigned to that face
  const FACE_COLORS = {
    right:  '#14542A', // forest green
    left:   '#1D783B', // mid green
    top:    '#c9a84c', // gold
    bottom: '#0b2e15', // deep dark green
    front:  '#2d8a4e', // light green
    back:   '#a07830', // warm amber
  }

  // BoxGeometry material slots: +X(right), -X(left), +Y(top), -Y(bottom), +Z(front), -Z(back)
  const mats = useMemo(() => {
    const p = { roughness: 0.55, metalness: 0.08 }
    const make = (imgTex, color) =>
      imgTex
        ? new THREE.MeshStandardMaterial({ map: imgTex, ...p })
        : new THREE.MeshStandardMaterial({ color, ...p })
    return [
      make(rightImgTex,  FACE_COLORS.right),
      make(leftImgTex,   FACE_COLORS.left),
      make(topTex,       FACE_COLORS.top),
      make(bottomImgTex, FACE_COLORS.bottom),
      make(frontImgTex,  FACE_COLORS.front),
      make(backImgTex,   FACE_COLORS.back),
    ]
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frontImgTex, backImgTex, rightImgTex, leftImgTex, topTex, bottomImgTex])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    autoRot.current += delta * 0.22
    const tx = mousePosition.y * 0.30
    const ty = autoRot.current + mousePosition.x * 0.45
    groupRef.current.rotation.y += (ty - groupRef.current.rotation.y) * 0.06
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.06
  })

  const handlePointerDown = (e) => {
    pointerDown.current = { x: e.clientX, y: e.clientY }
  }
  const handlePointerUp = (e) => {
    if (!pointerDown.current) return
    const dx = Math.abs(e.clientX - pointerDown.current.x)
    const dy = Math.abs(e.clientY - pointerDown.current.y)
    if (dx < 6 && dy < 6) onBoxClick()
    pointerDown.current = null
  }

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={() => { gl.domElement.style.cursor = 'pointer' }}
      onPointerOut={() => { gl.domElement.style.cursor = 'grab' }}
    >
      <mesh castShadow receiveShadow geometry={boxGeo}>
        {mats.map((m, i) => (
          <primitive key={i} object={m} attach={`material-${i}`} />
        ))}
      </mesh>

      {/* Crisp dark-green bottom edge */}
      <mesh position={[0, -1.415, 0]}>
        <boxGeometry args={[1.82, 0.025, 1.02]} />
        <meshStandardMaterial color={G_DARK} roughness={0.62} />
      </mesh>

      <Text position={[0, -1.402, 0]} fontSize={0.16} color="white" anchorX="center" anchorY="middle" rotation={[Math.PI / 2, 0, 0]}>BOTTOM</Text>
    </group>
  )
}

/* ============================================================
   SCENE – LIGHTING + ENVIRONMENT
   ============================================================ */
function Scene({ mousePosition, onBoxClick }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.2, 7.2]} fov={26} />
      <Environment preset="forest" background={false} />

      <ambientLight intensity={0.75} color="#f4f8f4" />

      <directionalLight
        position={[4, 9, 5]}
        intensity={3.0}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <pointLight position={[-5, 2, -2]} intensity={1.3} color="#c8e6c9" />
      <pointLight position={[0, 3, -7]}  intensity={1.5} color="#f0d060" />
      <pointLight position={[0, -3, 2]}  intensity={0.7} color={G_MID} />

      <Float speed={1.6} rotationIntensity={0.10} floatIntensity={0.45} floatingRange={[-0.05, 0.05]}>
        <ProductBox mousePosition={mousePosition} onBoxClick={onBoxClick} />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.12}
        rotateSpeed={0.65}
        autoRotate
        autoRotateSpeed={0.9}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.8}
      />

      <Sparkles count={55} scale={[5, 6, 5]} size={0.5} speed={0.20} opacity={0.50} color="#d4af37" />
      <Sparkles count={30} scale={[6, 7, 6]} size={0.3} speed={0.12} opacity={0.22} color={G_MID} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={0.22} />
      </mesh>
    </>
  )
}

/* ============================================================
   LOADING FALLBACK
   ============================================================ */
function ProductLoader() {
  return (
    <div className="product3d__loader">
      <div className="product3d__loader-ring" />
      <p>Loading 3D Product</p>
    </div>
  )
}

/* ============================================================
   PACKAGING DATA
   ============================================================ */
const EN_DATA = {
  name: 'LEAVIA',
  subtitle: '100% Natural Sweetener',
  description: 'Extracted from stevia leaves — balanced sweetness similar to sugar, free from bitterness, zero calories.',
  weight: '500 g',
  ingredients: 'Erythritol & Steviol Glycosides',
  madeIn: 'China',
  certifications: ['Halal', 'Zero Calorie', '100% Natural'],
  suitableFor: [
    { label: 'Cooking',   sub: 'Heat Resistant' },
    { label: 'Baking',    sub: 'Heat Resistant' },
    { label: 'Beverages', sub: 'Hot & Cold' },
  ],
  nutrition: [
    { label: 'Calories',        value: '0 Kcal', dv: '0.0%' },
    { label: 'Total Fat',       value: '0 g',    dv: '0.0%' },
    { label: 'Saturated Fat',   value: '0 g',    dv: '0.0%' },
    { label: 'Trans Fat',       value: '0 g',    dv: '0.0%' },
    { label: 'Monounsaturated', value: '0 g',    dv: '0.0%' },
    { label: 'Polyunsaturated', value: '0 g',    dv: '0.0%' },
    { label: 'Cholesterol',     value: '0 mg',   dv: '0.0%' },
    { label: 'Sodium',          value: '0 mg',   dv: '0.0%' },
    { label: 'Carbohydrate',    value: '7 g',    dv: '3%'   },
    { label: 'Sugars',          value: '0 g',    dv: '0.0%' },
    { label: 'Added Sugar',     value: '0 g',    dv: '0.0%' },
    { label: 'Protein',         value: '0 g',    dv: '0.0%' },
  ],
  perLabel: 'Per Serving',
  dvLabel: 'Daily Value',
  ingredientsLabel: 'Ingredients',
  weightLabel: 'Net Weight',
  madeInLabel: 'Made in',
  suitableLabel: 'Suitable For',
  certLabel: 'Certifications',
  nutritionLabel: 'Nutrition Facts',
  closeLabel: 'Close',
}

const AR_DATA = {
  name: 'ليفيا',
  subtitle: 'محلي طبيعي ١٠٠٪',
  description: 'مستخلص من أوراق الستيفيا — حلاوة متوازنة مشابهة للسكر، خالٍ من المرارة، صفر سعرات حرارية.',
  weight: '٥٠٠ جم',
  ingredients: 'إريثريتول وجليكوسيدات الستيفيول',
  madeIn: 'الصين',
  certifications: ['حلال', 'صفر سعرات', '١٠٠٪ طبيعي'],
  suitableFor: [
    { label: 'الطبخ',    sub: 'مقاوم للحرارة' },
    { label: 'الخبز',    sub: 'مقاوم للحرارة' },
    { label: 'المشروبات',sub: 'ساخن وبارد' },
  ],
  nutrition: [
    { label: 'السعرات الحرارية', value: '٠ كيلوكالوري', dv: '0.0%' },
    { label: 'الدهون الكلية',    value: '٠ جم',         dv: '0.0%' },
    { label: 'الدهون المشبعة',   value: '٠ جم',         dv: '0.0%' },
    { label: 'الدهون المتحولة',  value: '٠ جم',         dv: '0.0%' },
    { label: 'أحادية غير مشبعة', value: '٠ جم',         dv: '0.0%' },
    { label: 'متعددة غير مشبعة', value: '٠ جم',         dv: '0.0%' },
    { label: 'الكوليسترول',      value: '٠ ملجم',       dv: '0.0%' },
    { label: 'الصوديوم',         value: '٠ ملجم',       dv: '0.0%' },
    { label: 'الكربوهيدرات',     value: '٧ جم',         dv: '3%'   },
    { label: 'السكريات',         value: '٠ جم',         dv: '0.0%' },
    { label: 'سكر مضاف',         value: '٠ جم',         dv: '0.0%' },
    { label: 'البروتين',         value: '٠ جم',         dv: '0.0%' },
  ],
  perLabel: 'لكل حصة',
  dvLabel: 'القيمة اليومية',
  ingredientsLabel: 'المكونات',
  weightLabel: 'الوزن الصافي',
  madeInLabel: 'بلد المنشأ',
  suitableLabel: 'مناسب لـ',
  certLabel: 'الاعتمادات',
  nutritionLabel: 'القيم الغذائية',
  closeLabel: 'إغلاق',
}

/* ============================================================
   MAIN EXPORT
   ============================================================ */
export default function Product3D({ className = '' }) {
  const mousePosition = useSmoothMousePosition(0.04)
  const [isLoaded, setIsLoaded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const d = isAr ? AR_DATA : EN_DATA

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModalOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  useEffect(() => {
    if (!modalOpen) return
    const close = () => setModalOpen(false)
    const timer = setTimeout(() => window.addEventListener('click', close), 0)
    return () => { clearTimeout(timer); window.removeEventListener('click', close) }
  }, [modalOpen])

  return (
    <div className={`product3d ${className}`}>
      {!isLoaded && <ProductLoader />}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
          precision: 'highp',
        }}
        onCreated={() => setIsLoaded(true)}
        className="product3d__canvas"
      >
        <Suspense fallback={null}>
          <Scene mousePosition={mousePosition} onBoxClick={() => setModalOpen(true)} />
        </Suspense>
      </Canvas>

      <div className="product3d__glow" />
      <div className="product3d__glow product3d__glow--green" />

      {isLoaded && !modalOpen && (
        <div className="product3d__hint" dir={isAr ? 'rtl' : 'ltr'}>
          <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
            <path d="M10 2a4 4 0 00-4 4v2H5a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1V9a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" fill="currentColor"/>
          </svg>
          {isAr ? 'انقر على العبوة للتفاصيل' : 'Click box for details'}
        </div>
      )}

      {modalOpen && (
        <div className="product3d__backdrop">
          <div
            className="product3d__modal"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="product3d__modal-header">
              <div>
                <h2 className="product3d__modal-name">{d.name}</h2>
                <p className="product3d__modal-sub">{d.subtitle}</p>
              </div>
              <button className="product3d__modal-close" onClick={() => setModalOpen(false)} aria-label={d.closeLabel}>
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <p className="product3d__modal-desc">{d.description}</p>

            <div className="product3d__modal-body">
              {/* Nutrition Facts */}
              <div className="product3d__nutrition">
                <h3 className="product3d__section-title">{d.nutritionLabel}</h3>
                <p className="product3d__per">{d.perLabel}</p>
                <div className="product3d__nutrition-table">
                  <div className="product3d__nutrition-dv-header">
                    <span className="product3d__nutrition-col-spacer" />
                    <div className="product3d__nutrition-vline" />
                    <span className="product3d__nutrition-dv-title">{d.dvLabel}</span>
                  </div>
                  {d.nutrition.map((row, i) => (
                    <div key={i} className={`product3d__nutrition-row ${i % 2 === 0 ? 'product3d__nutrition-row--alt' : ''}`}>
                      <div className="product3d__nutrition-left">
                        <span className="product3d__nutrition-name">{row.label}</span>
                        <span className="product3d__nutrition-val">{row.value}</span>
                      </div>
                      <div className="product3d__nutrition-vline" />
                      <span className="product3d__nutrition-dv">{row.dv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="product3d__details">
                <h3 className="product3d__section-title">{d.ingredientsLabel}</h3>
                <p className="product3d__detail-value">{d.ingredients}</p>

                <div className="product3d__detail-row">
                  <span className="product3d__detail-label">{d.weightLabel}</span>
                  <span className="product3d__detail-value">{d.weight}</span>
                </div>
                <div className="product3d__detail-row">
                  <span className="product3d__detail-label">{d.madeInLabel}</span>
                  <span className="product3d__detail-value">{d.madeIn}</span>
                </div>

                <h3 className="product3d__section-title" style={{ marginTop: '1.25rem' }}>{d.certLabel}</h3>
                <div className="product3d__certs">
                  {d.certifications.map((c, i) => (
                    <span key={i} className="product3d__cert-badge">{c}</span>
                  ))}
                </div>

                <h3 className="product3d__section-title" style={{ marginTop: '1.25rem' }}>{d.suitableLabel}</h3>
                <div className="product3d__suitable">
                  {d.suitableFor.map((s, i) => (
                    <div key={i} className="product3d__suitable-item">
                      <strong>{s.label}</strong>
                      <span>{s.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
