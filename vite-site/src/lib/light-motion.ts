import {
  Fragment,
  createElement,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

type MotionTarget = Record<string, unknown>
type MotionTransition = {
  [key: string]: unknown
  delay?: number
  duration?: number
  ease?: unknown
  type?: string
}

type MotionLikeProps = {
  animate?: MotionTarget | string | boolean
  children?: ReactNode
  className?: string
  exit?: MotionTarget
  initial?: MotionTarget | string | boolean
  layout?: boolean
  layoutId?: string
  mode?: string
  style?: CSSProperties
  transition?: MotionTransition
  variants?: Record<string, MotionTarget>
  viewport?: {
    margin?: string
    once?: boolean
    amount?: number | 'some' | 'all'
  }
  whileInView?: MotionTarget | string
}

const MOTION_PROPS = new Set([
  'animate',
  'exit',
  'initial',
  'layout',
  'layoutId',
  'mode',
  'transition',
  'variants',
  'viewport',
  'whileInView',
])

const formatLength = (value: unknown) => {
  if (typeof value === 'number') {
    return `${value}px`
  }

  if (Array.isArray(value)) {
    return formatLength(value.at(-1))
  }

  return String(value)
}

const finalValue = (value: unknown) => (Array.isArray(value) ? value.at(-1) : value)

const resolveVariant = (
  value: MotionLikeProps['animate'] | MotionLikeProps['whileInView'],
  variants?: Record<string, MotionTarget>,
) => {
  if (typeof value === 'string') {
    return variants?.[value]
  }

  if (value && typeof value === 'object') {
    return value
  }

  return undefined
}

const targetToStyle = (target?: MotionTarget): CSSProperties => {
  if (!target) {
    return {}
  }

  const style: CSSProperties = {}
  const transforms: string[] = []
  const opacity = finalValue(target.opacity)
  const filter = finalValue(target.filter)
  const x = finalValue(target.x)
  const y = finalValue(target.y)
  const scale = finalValue(target.scale)
  const scaleX = finalValue(target.scaleX)
  const scaleY = finalValue(target.scaleY)
  const rotate = finalValue(target.rotate)

  if (opacity !== undefined) {
    style.opacity = Number(opacity)
  }

  if (typeof filter === 'string') {
    style.filter = filter
  }

  if (x !== undefined) {
    transforms.push(`translateX(${formatLength(x)})`)
  }

  if (y !== undefined) {
    transforms.push(`translateY(${formatLength(y)})`)
  }

  if (scale !== undefined) {
    transforms.push(`scale(${scale})`)
  }

  if (scaleX !== undefined) {
    transforms.push(`scaleX(${scaleX})`)
  }

  if (scaleY !== undefined) {
    transforms.push(`scaleY(${scaleY})`)
  }

  if (rotate !== undefined) {
    transforms.push(`rotate(${typeof rotate === 'number' ? `${rotate}deg` : rotate})`)
  }

  if (transforms.length) {
    style.transform = transforms.join(' ')
    style.transformOrigin = String(target.transformOrigin ?? 'center')
  }

  return style
}

const transitionToStyle = (transition?: MotionTransition): CSSProperties => {
  if (!transition) {
    return {}
  }

  const duration = Math.max(0.16, transition.duration ?? (transition.type === 'spring' ? 0.42 : 0.28))
  const delay = Math.max(0, transition.delay ?? 0)
  return {
    transitionDelay: `${delay}s`,
    transitionDuration: `${duration}s`,
    transitionProperty: 'opacity, transform, filter',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  }
}

function useLiteInView(
  node: Element | null,
  viewport?: MotionLikeProps['viewport'],
  enabled = true,
) {
  const [inView, setInView] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    if (!node || typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setInView(true))
      return () => cancelAnimationFrame(frame)
    }

    const amount = viewport?.amount
    const threshold = amount === 'all' ? 1 : amount === 'some' || amount === undefined ? 0.16 : amount
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setInView(visible)
        if (visible && viewport?.once !== false) {
          observer.disconnect()
        }
      },
      {
        rootMargin: viewport?.margin,
        threshold,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, node, viewport?.amount, viewport?.margin, viewport?.once])

  return inView
}

const createMotionComponent = (tag: ElementType) => {
  function MotionLite(props: MotionLikeProps & Record<string, unknown>) {
    const {
      animate,
      children,
      className,
      initial,
      style,
      transition,
      variants,
      viewport,
      whileInView,
      ...rest
    } = props
    const [node, setNode] = useState<HTMLElement | null>(null)
    const [mounted, setMounted] = useState(initial === false)
    const shouldTrackInView = Boolean(whileInView)
    const inView = useLiteInView(node, viewport, shouldTrackInView)

    useEffect(() => {
      if (initial === false) {
        return undefined
      }

      const frame = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(frame)
    }, [initial])

    const resolvedTarget = useMemo(() => {
      if (shouldTrackInView) {
        return inView
          ? resolveVariant(whileInView, variants)
          : resolveVariant(initial, variants)
      }

      if (mounted) {
        return resolveVariant(animate, variants) ?? resolveVariant(whileInView, variants)
      }

      return resolveVariant(initial, variants)
    }, [animate, initial, inView, mounted, shouldTrackInView, variants, whileInView])

    const domProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => !MOTION_PROPS.has(key)),
    )

    return createElement(
      tag,
      {
        ...domProps,
        ref: setNode,
        className,
        style: {
          ...style,
          ...transitionToStyle(transition),
          ...targetToStyle(resolvedTarget),
        },
      },
      children,
    )
  }

  return MotionLite
}

export function AnimatePresence({ children }: { children?: ReactNode } & Record<string, unknown>) {
  return createElement(Fragment, null, children)
}

export function useInView(
  ref: { current: Element | null },
  options: { amount?: number | 'some' | 'all'; once?: boolean; margin?: string } = {},
) {
  const [node, setNode] = useState<Element | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setNode(ref.current))
    return () => cancelAnimationFrame(frame)
  }, [ref])

  return useLiteInView(node, options, true)
}

export const motion = {
  article: createMotionComponent('article'),
  aside: createMotionComponent('aside'),
  div: createMotionComponent('div'),
  h1: createMotionComponent('h1'),
  img: createMotionComponent('img'),
  p: createMotionComponent('p'),
  span: createMotionComponent('span'),
}
