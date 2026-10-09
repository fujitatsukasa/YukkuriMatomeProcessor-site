import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

type Point = { x: number; y: number; z: number }
const TAU = Math.PI * 2
const mix = (a: number, b: number, amount: number) => a + (b - a) * amount
const smooth = (value: number) => value * value * (3 - 2 * value)

// A single mesh becomes a field of ideas, a connected system, then a finished form.
function formPoint(u: number, v: number, phase: number): Point {
  const ring = { x: (1.45 + .56 * Math.cos(v)) * Math.cos(u), y: (1.45 + .56 * Math.cos(v)) * Math.sin(u), z: .56 * Math.sin(v) }
  const sphere = { x: 1.8 * Math.sin(v / 2) * Math.cos(u), y: 1.8 * Math.sin(v / 2) * Math.sin(u), z: 1.8 * Math.cos(v / 2) }
  const field = { x: ring.x * (1 + .28 * Math.sin(u * 3)), y: ring.y * (1 + .25 * Math.cos(v * 2)), z: ring.z + .55 * Math.sin(u * 2 + v) }
  const forms = [field, sphere, ring, field]
  const index = Math.floor(phase)
  const amount = smooth(phase - index)
  return { x: mix(forms[index].x, forms[index + 1].x, amount), y: mix(forms[index].y, forms[index + 1].y, amount), z: mix(forms[index].z, forms[index + 1].z, amount) }
}

export function CompanyMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const elapsedRef = useRef(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const scene = sceneRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !scene || !context) return
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastPaint = 0
    let time = elapsedRef.current
    let visible = true
    let width = 0
    let height = 0
    const columns = 52
    const rows = 20

    const draw = () => {
      context.fillStyle = '#121313'
      context.fillRect(0, 0, width, height)
      const phase = preference.matches ? 2 : (time / 7000 + 2) % 3
      scene.dataset.phase = String(Math.floor(phase))
      scene.dataset.motion = preference.matches ? 'reduced' : paused ? 'paused' : 'playing'
      const rotation = time / 21000 + .22
      const tilt = .75
      const scale = Math.min(width, height) * .19
      const points: (Point & { size: number })[] = []
      for (let column = 0; column <= columns; column++) {
        for (let row = 0; row <= rows; row++) {
          const point = formPoint(column / columns * TAU, row / rows * TAU, phase)
          const x = point.x * Math.cos(rotation) + point.z * Math.sin(rotation)
          const z = -point.x * Math.sin(rotation) + point.z * Math.cos(rotation)
          const y = point.y * Math.cos(tilt) - z * Math.sin(tilt)
          const depth = point.y * Math.sin(tilt) + z * Math.cos(tilt)
          const angle = -.3
          const perspective = 5.5 / (5.5 - depth)
          points.push({ x: width / 2 + (x * Math.cos(angle) - y * Math.sin(angle)) * scale * perspective, y: height / 2 + (x * Math.sin(angle) + y * Math.cos(angle)) * scale * perspective, z: depth, size: perspective })
        }
      }
      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          const index = column * (rows + 1) + row
          const point = points[index]
          const alpha = Math.max(.08, (point.z + 2.3) / 5.6)
          context.lineWidth = .6 * point.size
          context.strokeStyle = `rgba(230,231,224,${alpha * .52})`
          context.beginPath()
          context.moveTo(point.x, point.y)
          context.lineTo(points[index + 1].x, points[index + 1].y)
          context.moveTo(point.x, point.y)
          context.lineTo(points[index + rows + 1].x, points[index + rows + 1].y)
          context.stroke()
          if ((column + row) % 5 === 0) {
            context.fillStyle = `rgba(246,244,233,${alpha})`
            context.beginPath()
            context.arc(point.x, point.y, .9 * point.size, 0, TAU)
            context.fill()
          }
        }
      }
      // Two streams travel along the mesh rather than blinking randomly.
      for (const stream of [0, 1]) {
        const row = stream === 0 ? 4 : 14
        const head = Math.floor((time / 140 + stream * 26) % columns)
        for (let tail = 10; tail >= 0; tail--) {
          const column = (head - tail + columns) % columns
          const point = points[column * (rows + 1) + row]
          const next = points[(column + 1) * (rows + 1) + row]
          context.strokeStyle = `rgba(255,101,61,${(1 - tail / 11) * .9})`
          context.lineWidth = 1.9 * point.size
          context.beginPath()
          context.moveTo(point.x, point.y)
          context.lineTo(next.x, next.y)
          context.stroke()
        }
        const point = points[head * (rows + 1) + row]
        context.fillStyle = '#ff653d'
        context.shadowColor = '#ff653d'
        context.shadowBlur = 13
        context.beginPath()
        context.arc(point.x, point.y, 3.5 * point.size, 0, TAU)
        context.fill()
        context.shadowBlur = 0
      }
      canvas.dataset.rendered = 'true'
    }

    const resize = () => {
      const rect = scene.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const ratio = Math.min(devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw()
    }
    const tick = (now: number) => {
      if (visible && !document.hidden && !paused && !preference.matches && now - lastPaint > 32) {
        time += Math.min(now - lastPaint, 60)
        elapsedRef.current = time
        lastPaint = now
        draw()
      } else if (!visible || document.hidden || paused || preference.matches) {
        lastPaint = now
      }
      frame = requestAnimationFrame(tick)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(scene)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(scene)
    preference.addEventListener('change', draw)
    resize()
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      observer.disconnect()
      preference.removeEventListener('change', draw)
    }
  }, [paused])

  return (
    <div className="company-motion-wrap">
      <div className="company-motion-scene" ref={sceneRef} aria-hidden="true">
        <div className="company-motion-cross company-motion-cross--top" />
        <div className="company-motion-cross company-motion-cross--bottom" />
        <span className="company-motion-coordinate">OTM / FORM EXPLORATION</span>
        <svg className="company-motion-fallback" viewBox="0 0 500 500" fill="none"><ellipse cx="250" cy="250" rx="160" ry="90" stroke="#73746f" transform="rotate(-25 250 250)" /><ellipse cx="250" cy="250" rx="132" ry="70" stroke="#999a92" transform="rotate(-25 250 250)" /><ellipse cx="250" cy="250" rx="105" ry="52" stroke="#ff653d" transform="rotate(-25 250 250)" /></svg>
        <canvas ref={canvasRef} className="company-motion-canvas" />
        <span className="company-motion-note">ONE IDEA. MANY POSSIBILITIES.</span>
      </div>
      <div className="company-motion-caption">
        <span><i /> IDEAS IN MOTION</span>
        <button type="button" className="company-motion-toggle" aria-label={paused ? 'モーショングラフィックを再生' : 'モーショングラフィックを停止'} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? 'PLAY' : 'PAUSE'}</span></button>
      </div>
    </div>
  )
}

export function ServiceGraphic({ variant }: { variant: number }) {
  return (
    <svg className={`company-service-graphic company-service-graphic--${variant}`} viewBox="0 0 300 160" fill="none" aria-hidden="true">
      {variant === 0 && <><path d="M99 40 50 80l49 40M201 40l49 40-49 40" className="company-graphic-outline" /><path d="m167 24-34 112" className="company-graphic-accent" /><path d="M115 80h70" className="company-graphic-signal" /><circle cx="150" cy="80" r="4" className="company-graphic-dot" /></>}
      {variant === 1 && <><path d="M30 40h70l50 40 50-40h70M30 120h70l50-40 50 40h70" className="company-graphic-outline" /><rect x="127" y="57" width="46" height="46" rx="4" className="company-graphic-accent" /><path d="M30 40h70l50 40 50 40h70" className="company-graphic-signal" /><circle cx="150" cy="80" r="4" className="company-graphic-dot" /></>}
      {variant === 2 && <>{[0, 1, 2].map((row) => [0, 1, 2, 3, 4].map((column) => <rect key={`${row}-${column}`} x={54 + column * 40} y={24 + row * 40} width="30" height="30" rx="2" className={column === 2 && row === 1 ? 'company-graphic-accent' : 'company-graphic-outline'} />))}<path d="M69 79h160" className="company-graphic-signal" /></>}
    </svg>
  )
}
