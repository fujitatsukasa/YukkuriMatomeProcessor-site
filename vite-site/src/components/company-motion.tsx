import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

type Vector = [number, number, number]
const tau = Math.PI * 2
const unit = (v: Vector): Vector => { const n = Math.hypot(...v); return v.map((x) => x / n) as Vector }
const cross = (a: Vector, b: Vector): Vector => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const center = (u: number): Vector => [(1.7 + .58 * Math.cos(3 * u)) * Math.cos(2 * u), (1.7 + .58 * Math.cos(3 * u)) * Math.sin(2 * u), .88 * Math.sin(3 * u)]

function ribbonGeometry(segments: number) {
  const vertices: number[] = []
  const indices: number[] = []
  const sides = 12
  for (let i = 0; i <= segments; i++) {
    const u = i / segments * tau
    const c = center(u), next = center(u + .001), previous = center(u - .001)
    const tangent = unit(next.map((v, j) => v - previous[j]) as Vector)
    const n = unit(cross(tangent, [0, 0, 1])), b = unit(cross(tangent, n))
    const twist = .3 * Math.sin(u * 3)
    const normal = n.map((v, j) => v * Math.cos(twist) + b[j] * Math.sin(twist)) as Vector
    const binormal = b.map((v, j) => v * Math.cos(twist) - n[j] * Math.sin(twist)) as Vector
    for (let j = 0; j <= sides; j++) {
      const v = j / sides * tau, x = .43 * Math.cos(v), y = .13 * Math.sin(v)
      const position = c.map((value, k) => value + normal[k] * x + binormal[k] * y)
      const surface = unit(normal.map((value, k) => value * Math.cos(v) / .43 + binormal[k] * Math.sin(v) / .13) as Vector)
      vertices.push(...position, ...surface, i / segments)
      if (i < segments && j < sides) { const a = i * (sides + 1) + j; indices.push(a, a + sides + 1, a + 1, a + 1, a + sides + 1, a + sides + 2) }
    }
  }
  return { vertices: new Float32Array(vertices), indices: new Uint16Array(indices) }
}

const vertexSource = `
attribute vec3 position;
attribute vec3 normal;
attribute float track;
uniform vec2 rotation;
uniform float time;
uniform float aspect;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTrack;
vec3 rotate(vec3 p) {
  float a=rotation.x, b=rotation.y;
  p=vec3(p.x*cos(a)+p.z*sin(a),p.y,-p.x*sin(a)+p.z*cos(a));
  p=vec3(p.x,p.y*cos(b)-p.z*sin(b),p.y*sin(b)+p.z*cos(b));
  float c=-.32;
  return vec3(p.x*cos(c)-p.y*sin(c),p.x*sin(c)+p.y*cos(c),p.z);
}
void main() {
  vec3 p=rotate(position);
  p.y+=.08*sin(time*.7);
  vPosition=p; vNormal=rotate(normal); vTrack=track;
  float lens=7.5/(7.5-p.z);
  gl_Position=vec4(p.x*.295*lens/aspect,p.y*.295*lens,-p.z*.1,1.);
}`

const fragmentSource = `
precision highp float;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTrack;
void main() {
  vec3 n=normalize(vNormal), eye=normalize(vec3(0.,0.,7.5)-vPosition);
  if(!gl_FrontFacing) n=-n;
  vec3 r=reflect(-eye,n);
  float sky=smoothstep(-.5,.75,r.y);
  float softbox=pow(max(dot(r,normalize(vec3(-.6,.8,1.))),0.),18.);
  float window=(smoothstep(.32,.38,r.x)-smoothstep(.68,.74,r.x))*smoothstep(-.4,.2,r.y);
  float edge=pow(1.-max(dot(n,eye),0.),3.);
  vec3 chrome=vec3(.12,.14,.13)+vec3(.57,.59,.56)*sky+vec3(.72)*softbox+vec3(.65)*window+vec3(.18)*edge;
  float paint=smoothstep(.68,.69,vTrack)*(1.-smoothstep(.84,.85,vTrack));
  float diffuse=.7+.3*max(dot(n,normalize(vec3(-.5,.8,1.))),0.);
  vec3 acid=vec3(.79,.94,.13)*diffuse+vec3(.4)*softbox;
  vec3 color=mix(chrome,acid,paint);
  gl_FragColor=vec4(pow(color,vec3(.88)),1.);
}`

export function CompanyMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const elapsed = useRef(0)
  const pausedRef = useRef(false)
  const updateRef = useRef<(() => void) | null>(null)
  const [paused, setPaused] = useState(false)
  const [generation, setGeneration] = useState(0)

  useEffect(() => {
    pausedRef.current = paused
    const site = sceneRef.current?.closest<HTMLElement>('.company-site')
    if (site) site.dataset.motionPaused = String(paused)
    updateRef.current?.()
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current, scene = sceneRef.current
    if (!canvas || !scene) return
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, preserveDrawingBuffer: false })
    scene.dataset.renderer = 'fallback'
    if (!gl) return
    const shaders: WebGLShader[] = []
    const shader = (type: number, source: string) => {
      const item = gl.createShader(type)!
      shaders.push(item); gl.shaderSource(item, source); gl.compileShader(item)
      if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error('Graphic shader unavailable')
      return item
    }
    const program = gl.createProgram()!
    try {
      gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource)); gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource)); gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Graphic program unavailable')
    } catch {
      shaders.forEach((item) => gl.deleteShader(item)); gl.deleteProgram(program); return
    }
    const geometry = ribbonGeometry(innerWidth < 800 ? 180 : 280)
    const vertexBuffer = gl.createBuffer(), indexBuffer = gl.createBuffer()
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); gl.bufferData(gl.ARRAY_BUFFER, geometry.vertices, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW)
    for (const [name, size, offset] of [['position', 3, 0], ['normal', 3, 12], ['track', 1, 24]] as const) {
      const attribute = gl.getAttribLocation(program, name)
      gl.enableVertexAttribArray(attribute); gl.vertexAttribPointer(attribute, size, gl.FLOAT, false, 28, offset)
    }
    gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0)
    const rotation = gl.getUniformLocation(program, 'rotation'), time = gl.getUniformLocation(program, 'time'), aspect = gl.getUniformLocation(program, 'aspect')
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0, last = 0, painted = 0, visible = true, lost = false
    const target = { x: 0, y: 0 }, pointer = { x: 0, y: 0 }
    const draw = () => {
      if (lost) return
      scene.dataset.motion = preference.matches ? 'reduced' : pausedRef.current ? 'paused' : 'playing'
      const seconds = preference.matches ? 0 : elapsed.current / 1000
      gl.viewport(0, 0, canvas.width, canvas.height); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.uniform1f(aspect, canvas.width / canvas.height); gl.uniform1f(time, seconds)
      gl.uniform2f(rotation, .65 + seconds * .12 + pointer.x * .2, -.45 + Math.sin(seconds * .18) * .15 + pointer.y * .15)
      gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0)
      canvas.dataset.rendered = 'true'; scene.dataset.renderer = 'webgl'; scene.dataset.frame = String(++painted)
    }
    const tick = (now: number) => {
      frame = 0
      if (now - last >= (innerWidth < 800 ? 48 : 32)) {
        elapsed.current += Math.min(now - last, 60); last = now
        pointer.x += (target.x - pointer.x) * .07; pointer.y += (target.y - pointer.y) * .07
        draw()
      }
      if (visible && !document.hidden && !pausedRef.current && !preference.matches && !lost) frame = requestAnimationFrame(tick)
    }
    const schedule = () => {
      cancelAnimationFrame(frame); frame = 0; last = performance.now(); draw()
      if (visible && !document.hidden && !pausedRef.current && !preference.matches && !lost) frame = requestAnimationFrame(tick)
    }
    const resize = () => {
      const rect = scene.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1, innerWidth < 800 ? 1.25 : 1.5)
      canvas.width = Math.max(1, Math.round(rect.width * ratio)); canvas.height = Math.max(1, Math.round(rect.height * ratio)); draw()
    }
    const move = (event: PointerEvent) => { const rect = scene.getBoundingClientRect(); target.x = (event.clientX - rect.left) / rect.width - .5; target.y = (event.clientY - rect.top) / rect.height - .5 }
    const leave = () => { target.x = 0; target.y = 0 }
    const contextLost = (event: Event) => { event.preventDefault(); lost = true; scene.dataset.renderer = 'fallback'; cancelAnimationFrame(frame) }
    const restored = () => setGeneration((value) => value + 1)
    const resizeObserver = new ResizeObserver(resize)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule() })
    resizeObserver.observe(scene); observer.observe(scene)
    scene.addEventListener('pointermove', move); scene.addEventListener('pointerleave', leave)
    canvas.addEventListener('webglcontextlost', contextLost); canvas.addEventListener('webglcontextrestored', restored)
    document.addEventListener('visibilitychange', schedule); preference.addEventListener('change', schedule)
    updateRef.current = schedule
    resize(); schedule()
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect(); updateRef.current = null
      scene.removeEventListener('pointermove', move); scene.removeEventListener('pointerleave', leave)
      canvas.removeEventListener('webglcontextlost', contextLost); canvas.removeEventListener('webglcontextrestored', restored)
      document.removeEventListener('visibilitychange', schedule); preference.removeEventListener('change', schedule)
      gl.deleteBuffer(vertexBuffer); gl.deleteBuffer(indexBuffer); shaders.forEach((item) => gl.deleteShader(item)); gl.deleteProgram(program)
    }
  }, [generation])

  return <div className="company-motion-wrap">
    <div className="company-motion-scene" ref={sceneRef} aria-hidden="true">
      <div className="company-motion-shadow" />
      <svg className="company-motion-fallback" viewBox="0 0 600 600" fill="none"><path d="M140 270C100 90 450 65 450 280S110 500 135 300 440 110 445 310 115 480 140 270" stroke="#b1b6a9" strokeWidth="48" /><path d="M140 270C100 90 450 65 450 280S110 500 135 300 440 110 445 310 115 480 140 270" stroke="#3b443a" strokeWidth="24" /><path d="M448 252C465 395 275 480 182 399" stroke="#d7fa43" strokeWidth="25" /></svg>
      <canvas ref={canvasRef} className="company-motion-canvas" />
      <span className="company-motion-coordinate">FORM 01 — CONTINUOUS THINKING</span><span className="company-motion-note">CHANGE YOUR PERSPECTIVE ↗</span>
    </div>
    <div className="company-motion-caption"><span><i /> MADE OF POSSIBILITIES</span><button type="button" className="company-motion-toggle" aria-label={paused ? 'モーショングラフィックを再生' : 'モーショングラフィックを停止'} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? 'PLAY' : 'PAUSE'}</span></button></div>
  </div>
}

export function ServiceGraphic({ variant }: { variant: number }) {
  return <svg className={`company-service-graphic company-service-graphic--${variant}`} viewBox="0 0 320 190" fill="none" aria-hidden="true">
    {variant === 0 && <>{[0, 1, 2, 3, 4].map((level) => <path key={level} d={`M50 ${70 + level * 15} 157 ${22 + level * 15} 270 ${70 + level * 15} 161 ${120 + level * 15}Z`} className={level === 2 ? 'company-graphic-accent' : 'company-graphic-outline'} />)}<path d="M50 100 157 52 270 100 161 150Z" className="company-graphic-signal" /></>}
    {variant === 1 && <>{Array.from({ length: 16 }, (_, row) => <path key={row} d={`M25 ${25 + row * 9}C100 ${170 - row * 6} 210 ${-20 + row * 11} 295 ${25 + row * 9}`} className={row === 8 ? 'company-graphic-accent' : 'company-graphic-outline'} />)}<path d="M25 97C100 122 210 68 295 97" className="company-graphic-signal" /></>}
    {variant === 2 && <>{Array.from({ length: 9 }, (_, i) => <rect key={i} x={75 + i * 8} y={12 + i * 8} width={165 - i * 16} height={165 - i * 16} transform={`rotate(${i * 5} 157 95)`} className={i === 4 ? 'company-graphic-accent' : 'company-graphic-outline'} />)}<circle cx="157" cy="95" r="5" className="company-graphic-dot" /></>}
  </svg>
}
