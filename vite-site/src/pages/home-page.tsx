import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from 'react'
import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  FileCheck2,
  Focus,
  MonitorPlay,
  Play,
  ShieldCheck,
  X,
} from 'lucide-react'
import {
  beforeAfterRows,
  comparisonRows,
  demoTimeline,
  downloadTrustItems,
  freeChecks,
  heroContent,
  homeAssets,
  homeFacts,
  homeFaqs,
  premiumFit,
  premiumMismatch,
  productFeatures,
  purchaseConditionRows,
  requirementRows,
  responsibilityItems,
  sampleItems,
  userResponsibilityItems,
  workflowSteps,
  workflowSummary,
  type ProductFeature,
  type SampleItem,
} from './home-content'
import './home-page.css'

type CtaLocation =
  | 'hero'
  | 'workflow'
  | 'free_section'
  | 'pricing_free'
  | 'pricing_premium'
  | 'mobile_sticky'
  | 'final'

type LightboxImage = {
  src: string
  alt: string
  title: string
}

const primaryCtaLabel = heroContent.primaryCta

const metaDescription =
  '記事URL・スレッドURL・下書きから、本文・コメント取得、話者割り当て、台本整形、AI台本生成、素材確認、YMM4反映まで。Windows 10 / 11対応。Free版あり、Premiumは39,800円（税込）の買い切り。'

const visibleHomeFaqs = homeFaqs.slice(0, 10)

function getCommonParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    viewport: window.matchMedia('(max-width: 760px)').matches ? 'mobile' : 'desktop',
    utm_source: params.get('utm_source') || 'direct',
    utm_medium: params.get('utm_medium') || 'none',
    utm_campaign: params.get('utm_campaign') || 'none',
  }
}

function trackHomeEvent(name: string, payload: Record<string, string | number | boolean | undefined> = {}) {
  trackEvent(name, { ...getCommonParams(), ...payload })
}

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: homeFacts.productName,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: homeFacts.os.join(', '),
  softwareRequirements: `${homeFacts.osLabel}、YMM4必須`,
  url: `${homeFacts.siteOrigin}/`,
  downloadUrl: homeFacts.downloadUrl,
  image: `${homeFacts.siteOrigin}${homeAssets.hero}`,
  description: metaDescription,
  offers: [
    {
      '@type': 'Offer',
      name: 'Free',
      price: '0',
      priceCurrency: homeFacts.currency,
      url: `${homeFacts.siteOrigin}/download/`,
    },
    {
      '@type': 'Offer',
      name: 'Premium',
      price: homeFacts.premiumPriceValue,
      priceCurrency: homeFacts.currency,
      url: `${homeFacts.siteOrigin}/purchase/`,
    },
  ],
  publisher: {
    '@type': 'Organization',
    name: homeFacts.publisherName,
    url: homeFacts.siteOrigin,
  },
}

const faqPageLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: visibleHomeFaqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

function useHomeViewTracking() {
  useEffect(() => {
    trackHomeEvent('home_view', { location: 'home' })
  }, [])
}

function SectionHead({
  kicker,
  title,
  body,
  align = 'split',
}: {
  kicker: string
  title: string
  body?: string
  align?: 'split' | 'center'
}) {
  return (
    <div className={`home-lp-section-head home-lp-section-head--${align}`}>
      <div>
        <p className="home-lp-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {body ? <p>{body}</p> : null}
    </div>
  )
}

function HomeCta({
  href,
  label,
  location,
  variant = 'primary',
  external = false,
  children,
  id,
}: {
  href: string
  label: string
  location: CtaLocation
  variant?: 'primary' | 'secondary' | 'text'
  external?: boolean
  children?: ReactNode
  id?: string
}) {
  const handleClick = () => {
    if (href === homeFacts.downloadUrl) {
      trackHomeEvent('home_free_click', { location, label })
    }

    if (href.includes('/purchase/')) {
      trackHomeEvent('home_premium_click', { location, label })
    }
  }

  const className = `home-lp-btn home-lp-btn--${variant}`
  const content = children ?? label

  if (external || href.startsWith('http')) {
    return (
      <a
        id={id}
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {content}
      </a>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a id={id} className={className} href={href} onClick={handleClick}>
        {content}
      </a>
    )
  }

  return (
    <Link id={id} className={className} to={href} discover="none" onClick={handleClick}>
      {content}
    </Link>
  )
}

function ProductScreenshot({
  image,
  onZoom,
  priority = false,
}: {
  image: ProductFeature['images'][number]
  onZoom: (image: LightboxImage) => void
  priority?: boolean
}) {
  return (
    <button
      className="home-lp-screenshot"
      type="button"
      onClick={() => {
        trackHomeEvent('home_screenshot_zoom', { location: 'product', label: image.title })
        onZoom({ src: image.src, alt: image.alt, title: image.title })
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
      {image.annotations.map((annotation) => (
        <span
          key={`${image.title}-${annotation.label}`}
          className="home-lp-annotation"
          style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
        >
          {annotation.label}
        </span>
      ))}
      <span className="home-lp-zoom-cue">
        <Focus size={16} aria-hidden="true" />
        拡大
      </span>
    </button>
  )
}

function ImageLightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!image) {
      return undefined
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>('button, [href], img[tabindex]'),
      ).filter((node) => !node.hasAttribute('disabled'))

      if (!focusable.length) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [image, onClose])

  if (!image) {
    return null
  }

  return (
    <div className="home-lp-lightbox" role="dialog" aria-modal="true" aria-label={`${image.title}を拡大表示`}>
      <button className="home-lp-lightbox__backdrop" type="button" aria-label="閉じる" onClick={onClose} />
      <div className="home-lp-lightbox__panel" ref={panelRef}>
        <div className="home-lp-lightbox__head">
          <strong>{image.title}</strong>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="拡大表示を閉じる">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <img src={image.src} alt={image.alt} tabIndex={-1} />
      </div>
    </div>
  )
}

function DemoVideo() {
  const [active, setActive] = useState(false)
  const [marks, setMarks] = useState<number[]>([])

  const handlePlayClick = () => {
    setActive(true)
    trackHomeEvent('home_demo_play', { location: 'demo', label: 'home-demo-60s' })
  }

  const handleProgress = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (!video.duration) {
      return
    }

    const percent = Math.floor((video.currentTime / video.duration) * 100)
    const mark = [50, 90].find((value) => percent >= value && !marks.includes(value))
    if (!mark) {
      return
    }

    setMarks((current) => {
      if (current.includes(mark)) {
        return current
      }
      trackHomeEvent(mark === 50 ? 'home_demo_50' : 'home_demo_90', { location: 'demo', label: 'home-demo-60s' })
      return [...current, mark]
    })
  }

  return (
    <div className="home-lp-demo-card" data-reveal>
      <div className="home-lp-demo-card__media">
        {active ? (
          <video controls playsInline autoPlay preload="none" poster={homeAssets.hero} onTimeUpdate={handleProgress}>
            <source src="/lp/home-demo-60s.mp4" type="video/mp4" />
            <track kind="captions" src="/lp/home-demo-60s.vtt" srcLang="ja" label="日本語" default />
            <a href="/lp/home-demo-60s.mp4">制作フロー動画を開く</a>
          </video>
        ) : (
          <button className="home-lp-demo-poster" type="button" onClick={handlePlayClick}>
            <img src={homeAssets.hero} alt="URLからYMM4前準備までの制作フローポスター" loading="lazy" decoding="async" />
            <span>
              <Play size={20} aria-hidden="true" />
              制作フローを再生
            </span>
          </button>
        )}
        <a className="home-lp-video-fallback" href="/lp/home-demo-60s.mp4" target="_blank" rel="noopener noreferrer">
          動画を別タブで開く
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
      <ol className="home-lp-demo-timeline">
        {demoTimeline.map((item) => (
          <li key={item.time}>
            <time>{item.time}</time>
            <strong>{item.screen}</strong>
            <span>{item.caption}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function LazySampleVideo({ item }: { item: SampleItem }) {
  const [active, setActive] = useState(false)

  const handlePlay = () => {
    setActive(true)
    trackHomeEvent('home_sample_play', { location: 'samples', label: item.id })
  }

  return (
    <div className="home-lp-video-shell">
      {active ? (
        <video controls playsInline preload="none" poster={item.poster}>
          <source src={item.video} type="video/mp4" />
          <a href={item.video}>動画ファイルを開く</a>
        </video>
      ) : (
        <button className="home-lp-video-poster" type="button" onClick={handlePlay} aria-label={`${item.title}の動画を再生`}>
          <img src={item.poster} alt={`${item.title}のサンプル動画ポスター`} loading="lazy" decoding="async" />
          <span>
            <Play size={20} aria-hidden="true" />
            再生
          </span>
        </button>
      )}
      <a className="home-lp-video-fallback" href={item.video} target="_blank" rel="noopener noreferrer">
        動画を別タブで開く
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </div>
  )
}

function ProductFeatureBlock({
  feature,
  index,
  onZoom,
}: {
  feature: ProductFeature
  index: number
  onZoom: (image: LightboxImage) => void
}) {
  const featureRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const target = featureRef.current
    if (!target || !('IntersectionObserver' in window)) {
      return undefined
    }

    let tracked = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45 && !tracked) {
          tracked = true
          trackHomeEvent('home_product_tab', { location: 'product', label: feature.id })
          observer.disconnect()
        }
      },
      { threshold: [0.45] },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [feature.id])

  return (
    <article ref={featureRef} className="home-lp-feature" data-reverse={index % 2 === 1} data-reveal>
      <div className="home-lp-feature__copy">
        <p className="home-lp-kicker">{feature.eyebrow}</p>
        <h2>{feature.title}</h2>
        <p>{feature.body}</p>
        <ul>
          {feature.bullets.map((item) => (
            <li key={item}>
              <CheckCircle2 size={16} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="home-lp-feature__screens">
        {feature.images.map((image, imageIndex) => (
          <ProductScreenshot key={image.title} image={image} onZoom={onZoom} priority={index === 0 && imageIndex === 0} />
        ))}
      </div>
    </article>
  )
}

function MobileStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const guardedIds = [
      'home-hero-primary-cta',
      'home-workflow-primary-cta',
      'home-free-primary-cta',
      'home-pricing-free-cta',
      'home-pricing-premium-cta',
      'home-final-cta',
    ]
    const guardedNodes = guardedIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    const mobileQuery = window.matchMedia('(max-width: 760px)')

    if (!guardedNodes.length || !('IntersectionObserver' in window)) {
      return undefined
    }

    const state = {
      mobile: mobileQuery.matches,
      inlineVisible: new Map(guardedNodes.map((node) => [node.id, false])),
    }
    const update = () => {
      const hasInlineCta = Array.from(state.inlineVisible.values()).some(Boolean)
      setVisible(state.mobile && !hasInlineCta)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target instanceof HTMLElement) {
            state.inlineVisible.set(entry.target.id, entry.isIntersecting)
          }
        }
        update()
      },
      { threshold: 0.1 },
    )

    const handleMediaChange = (event: MediaQueryListEvent) => {
      state.mobile = event.matches
      update()
    }

    guardedNodes.forEach((node) => observer.observe(node))
    mobileQuery.addEventListener('change', handleMediaChange)
    update()

    return () => {
      observer.disconnect()
      mobileQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  if (!visible) {
    return null
  }

  return (
    <div className="home-lp-sticky-cta">
      <HomeCta href={homeFacts.downloadUrl} label="Free版を試す" location="mobile_sticky" external>
        <Download size={18} aria-hidden="true" />
        Free版を試す
      </HomeCta>
    </div>
  )
}

function HomePageContent() {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null)
  const closeLightbox = useCallback(() => setLightboxImage(null), [])
  const pricingRef = useRef<HTMLElement | null>(null)

  useHomeViewTracking()

  useEffect(() => {
    const target = pricingRef.current
    if (!target || !('IntersectionObserver' in window)) {
      return undefined
    }

    let tracked = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !tracked) {
          tracked = true
          trackHomeEvent('home_pricing_view', { location: 'pricing' })
          observer.disconnect()
        }
      },
      { threshold: [0.5] },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="home-lp">
        <section className="home-lp-hero" aria-labelledby="home-hero-heading">
          <div className="home-lp-container home-lp-hero__grid">
            <div className="home-lp-hero__copy" data-reveal>
              <p className="home-lp-kicker">{heroContent.kicker}</p>
              <h1 id="home-hero-heading">
                <span>記事・スレッドから、</span>
                <span>YMM4のタイムラインまで。</span>
              </h1>
              <p className="home-lp-hero__lead">{heroContent.lead}</p>
              <div className="home-lp-hero__actions">
                <HomeCta
                  id="home-hero-primary-cta"
                  href={homeFacts.downloadUrl}
                  label={primaryCtaLabel}
                  location="hero"
                  external
                >
                  <Download size={19} aria-hidden="true" />
                  {primaryCtaLabel}
                </HomeCta>
                <HomeCta href="#demo" label={heroContent.secondaryCta} location="hero" variant="secondary">
                  <Play size={18} aria-hidden="true" />
                  {heroContent.secondaryCta}
                </HomeCta>
              </div>
            </div>

            <div className="home-lp-hero__visual" data-reveal>
              <ProductScreenshot
                image={{
                  src: homeAssets.hero,
                  alt: '台本編集と素材確認の画面例',
                  title: '台本編集と素材確認の画面例',
                  annotations: [
                    { x: 15, y: 20, label: 'URL / 下書きから開始' },
                    { x: 48, y: 39, label: '話者・台本・素材を整える' },
                    { x: 82, y: 11, label: 'YMM4へ反映' },
                  ],
                }}
                onZoom={setLightboxImage}
                priority
              />
            </div>

            <div className="home-lp-hero__facts" data-reveal>
              <p className="home-lp-hero__microcopy">{heroContent.microcopy}</p>
              <div className="home-lp-hero__scope" aria-label="本製品とYMM4の役割分担">
                <p>{heroContent.productScope}</p>
                <p>{heroContent.yymm4Scope}</p>
              </div>
              <p className="home-lp-hero__trust">{heroContent.trustNote}</p>
            </div>
          </div>

          <div className="home-lp-container">
            <div className="home-lp-flow-strip" aria-label="制作フロー要約" data-reveal>
              {workflowSummary.map((item, index) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  {index < workflowSummary.length - 1 ? <ArrowRight size={18} aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-lp-section home-lp-before-after" aria-labelledby="home-before-after-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="BEFORE / AFTER"
              title="コピペ、話者分け、改行直し。一本ごとの繰り返しを減らす。"
              body="コメントを拾う。不要な部分を外す。話者を割り当てる。改行と文字量を整える。素材の場所を確認する。最後にYMM4でもう一度組み直す。ゆっくりまとめプロセッサーは、この繰り返しを一つの制作データとしてつなぎます。"
            />
            <div className="home-lp-change-table" data-reveal>
              <div className="home-lp-change-table__head">
                <span>手作業</span>
                <span>本製品を使うと</span>
              </div>
              {beforeAfterRows.map((row) => (
                <div className="home-lp-change-table__row" key={row.before}>
                  <p>{row.before}</p>
                  <ArrowRight size={18} aria-hidden="true" />
                  <p>{row.after}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="home-lp-section home-lp-section--muted" aria-labelledby="home-workflow-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="WORKFLOW"
              title="URL・下書きから、台本と素材を整えてYMM4へ。"
              body="どこをアプリに任せ、どこを自分で確認するかが分かる流れです。AIに丸投げせず、最後の品質は自分で決められます。"
            />
            <div className="home-lp-steps">
              {workflowSteps.map((step, index) => (
                <article className="home-lp-step" key={step.id} data-reveal>
                  <div className="home-lp-step__copy">
                    <span>{step.step}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <ul>
                      {step.points.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <ProductScreenshot
                    image={{ src: step.image, alt: step.alt, title: step.title, annotations: [] }}
                    onZoom={setLightboxImage}
                    priority={index === 0}
                  />
                </article>
              ))}
            </div>
            <div className="home-lp-section-cta">
              <HomeCta
                id="home-workflow-primary-cta"
                href={homeFacts.downloadUrl}
                label="Free版でこの流れを試す"
                location="workflow"
                external
              >
                <Download size={18} aria-hidden="true" />
                Free版でこの流れを試す
              </HomeCta>
            </div>
          </div>
        </section>

        <section id="product" className="home-lp-section" aria-label="実画面で見る3つの価値">
          <div className="home-lp-container home-lp-feature-stack">
            {productFeatures.map((feature, index) => (
              <ProductFeatureBlock key={feature.id} feature={feature} index={index} onZoom={setLightboxImage} />
            ))}
          </div>
        </section>

        <section id="demo" className="home-lp-section home-lp-section--muted home-lp-demo" aria-labelledby="home-demo-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="LIVE DEMO"
              title="画面で見る制作フロー"
              body="現在の動画は、連続した操作記録ではなく制作フローの解説です。YMM4反映後のタイムラインを含む実記録は、撮影でき次第差し替えます。"
            />
            <DemoVideo />
          </div>
        </section>

        <section id="samples" className="home-lp-section" aria-labelledby="home-samples-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="USE CASES"
              title="動画の型に合わせて、台本の作り方を変える。"
              body="反応集、解説、ショート。それぞれで入力、台本ルール、YMM4で仕上げる箇所が違います。掲載中の動画は用途説明用のサンプルで、完成映像の証拠としては扱いません。"
            />
            <div className="home-lp-samples">
              {sampleItems.map((item) => (
                <article className="home-lp-sample-card" key={item.id} data-reveal>
                  <LazySampleVideo item={item} />
                  <div className="home-lp-sample-card__body">
                    <h3>{item.title}</h3>
                    <dl>
                      <div>
                        <dt>入力</dt>
                        <dd>{item.input}</dd>
                      </div>
                      <div>
                        <dt>本製品</dt>
                        <dd>{item.supportScope}</dd>
                      </div>
                      <div>
                        <dt>YMM4</dt>
                        <dd>{item.userScope}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
            <div className="home-lp-section-cta">
              <Link className="home-lp-text-link" to={homeFacts.samplesUrl} discover="none">
                作例と制作手順をもっと見る
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section id="free" className="home-lp-section home-lp-section--muted" aria-labelledby="home-free-heading">
          <div className="home-lp-container home-lp-free__grid">
            <div className="home-lp-free__copy" data-reveal>
              <p className="home-lp-kicker">TRY FREE</p>
              <h2 id="home-free-heading">買う前に、自分の制作フローで確かめる。</h2>
              <p>
                Free版では、起動、ログイン、台本編集、素材確認、YMM4連携の流れを確認できます。
                起動確認だけで終わらせず、台本編集とYMM4連携が自分の環境で使えるかを実際に確認してください。
              </p>
              <div className="home-lp-free__actions">
                <HomeCta
                  id="home-free-primary-cta"
                  href={homeFacts.downloadUrl}
                  label={primaryCtaLabel}
                  location="free_section"
                  external
                >
                  <Download size={18} aria-hidden="true" />
                  {primaryCtaLabel}
                </HomeCta>
                <span>{homeFacts.osLabel}｜YMM4必須｜約{homeFacts.setupSizeMb}</span>
              </div>
            </div>
            <div className="home-lp-free__panel" data-reveal>
              <ProductScreenshot
                image={{
                  src: homeAssets.free,
                  alt: 'Free状態と更新確認を表示する画面',
                  title: 'Free状態と配布確認の画面',
                  annotations: [],
                }}
                onZoom={setLightboxImage}
              />
              <div className="home-lp-free__checks">
                <h3>Freeで確かめる3つ</h3>
                {freeChecks.map((item) => (
                  <div key={item}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          ref={pricingRef}
          className="home-lp-section home-lp-pricing"
          aria-labelledby="home-pricing-heading"
        >
          <div className="home-lp-container">
            <SectionHead
              kicker="PRICING"
              title="Premiumは39,800円（税込）。月額なしの買い切りです。"
              body="Freeで動作とYMM4連携を確かめ、継続利用が必要になったらPremiumへ。公開済みの条件と、購入前に確認すべき条件を分けて表示します。"
              align="center"
            />

            <div className="home-lp-plan-grid" aria-label="FreeとPremiumの概要">
              <article className="home-lp-plan-card" data-reveal>
                <span>まず制作フローを試す</span>
                <h3>Free</h3>
                <strong>0円</strong>
                <p>自分のWindowsとYMM4環境で、台本編集と連携の流れを確認するための無料版です。</p>
                <HomeCta
                  id="home-pricing-free-cta"
                  href={homeFacts.downloadUrl}
                  label={primaryCtaLabel}
                  location="pricing_free"
                  external
                >
                  <Download size={18} aria-hidden="true" />
                  {primaryCtaLabel}
                </HomeCta>
              </article>
              <article className="home-lp-plan-card home-lp-plan-card--premium" data-reveal>
                <span>買い切り・月額なし</span>
                <h3>Premium</h3>
                <strong>{homeFacts.premiumPrice}</strong>
                <p>URL取得、AI台本案、プロジェクト保存、YMM4前準備を、購入前に確認した条件で継続利用したい方向けです。</p>
                <HomeCta
                  id="home-pricing-premium-cta"
                  href={homeFacts.purchaseUrl}
                  label="Premiumの詳細を見る"
                  location="pricing_premium"
                  variant="secondary"
                >
                  <FileCheck2 size={18} aria-hidden="true" />
                  Premiumの詳細を見る
                </HomeCta>
              </article>
            </div>

            <div className="home-lp-comparison" data-reveal>
              <div className="home-lp-comparison__head">
                <MonitorPlay size={18} aria-hidden="true" />
                <h3>Free / Premium 料金比較</h3>
              </div>
              <div className="home-lp-comparison__table">
                <div className="home-lp-comparison__row home-lp-comparison__row--head">
                  <span>項目</span>
                  <span>Free</span>
                  <span>Premium</span>
                </div>
                {comparisonRows.map((row) => (
                  <div className="home-lp-comparison__row" key={row.id}>
                    <strong>{row.label}</strong>
                    <span>{row.free}</span>
                    <span>{row.premium}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-lp-condition-panel" data-reveal>
              <div>
                <p className="home-lp-kicker">購入前確認</p>
                <h3>39,800円を判断するために、未確認の条件は残さず確認してください。</h3>
                <p>このLPでは、確認できていない数値を無制限や確定条件として表示しません。</p>
              </div>
              <dl>
                {purchaseConditionRows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="home-lp-fit-matrix" data-reveal>
              <div>
                <h3>Premiumが向くのは、こんな人です。</h3>
                <ul>
                  {premiumFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>次に当てはまる場合は、購入前に仕様をご確認ください。</h3>
                <ul>
                  {premiumMismatch.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <nav className="home-lp-legal-links" aria-label="購入前に確認する法務リンク">
              <Link to={homeFacts.termsUrl}>利用規約</Link>
              <Link to={homeFacts.privacyUrl}>プライバシーポリシー</Link>
              <Link to={homeFacts.commercialTransactionsUrl}>特定商取引法に基づく表記</Link>
              <Link to={homeFacts.refundUrl}>返金・キャンセル条件</Link>
            </nav>
          </div>
        </section>

        <section id="specs" className="home-lp-section home-lp-section--muted" aria-labelledby="home-specs-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="SPECS"
              title="使える環境と、アプリがやらないこと。"
              body="使える環境、YMM4との関係、AI出力や素材確認の扱いを購入前に確認できます。"
            />
            <div className="home-lp-requirements">
              <div className="home-lp-requirements__table" data-reveal>
                {requirementRows.map((row) => (
                  <div key={row.label}>
                    <strong>{row.label}</strong>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="home-lp-scope-grid" data-reveal>
                <div>
                  <h3>本製品</h3>
                  <ul>
                    {responsibilityItems.map((item) => (
                      <li key={item}>
                        <ShieldCheck size={16} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>利用者 / YMM4</h3>
                  <ul>
                    {userResponsibilityItems.map((item) => (
                      <li key={item}>
                        <ShieldCheck size={16} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="home-lp-download-trust" data-reveal>
              <div>
                <p className="home-lp-kicker">配布確認情報</p>
                <h3>ファイル名・サイズ・SHA-256を確認できます。</h3>
                <p>{homeFacts.trustNote}</p>
              </div>
              <dl>
                {downloadTrustItems.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="home-lp-trademark-note">
              YMM4等の製品名・サービス名は各権利者の商標または登録商標です。本製品は連携対象を示すもので、公式提携・推奨を意味するものではありません。
            </p>
          </div>
        </section>

        <section id="faq" className="home-lp-section" aria-labelledby="home-faq-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="FAQ"
              title="料金と条件は、購入前に確認。"
              body="Freeで何ができるか、Premiumで何が変わるか、YMM4が必要かを短く確認できます。"
              align="center"
            />
            <div className="home-lp-faq-list">
              {visibleHomeFaqs.map((item) => (
                <details
                  id={`faq-${item.id}`}
                  className="home-lp-faq-item"
                  key={item.id}
                  onToggle={(event) => {
                    if (event.currentTarget.open) {
                      trackHomeEvent('home_faq_open', { location: 'faq', label: item.id })
                    }
                  }}
                  data-reveal
                >
                  <summary>
                    <span>{item.question}</span>
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
            <div className="home-lp-section-cta">
              <Link className="home-lp-text-link" to={homeFacts.faqUrl} discover="none">
                FAQをすべて見る
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="home-lp-final" aria-labelledby="home-final-heading">
          <div className="home-lp-container home-lp-final__grid">
            <div>
              <p className="home-lp-kicker">NEXT VIDEO</p>
              <h2 id="home-final-heading">次の一本は、台本のコピペから始めない。</h2>
              <p>Free版で、記事・スレッドまたは下書きから、台本編集、素材確認、YMM4連携までの流れを確かめてください。</p>
              <span>{heroContent.microcopy}</span>
            </div>
            <div className="home-lp-final__actions">
              <HomeCta id="home-final-cta" href={homeFacts.downloadUrl} label={primaryCtaLabel} location="final" external>
                <Download size={19} aria-hidden="true" />
                {primaryCtaLabel}
              </HomeCta>
              <HomeCta href="#pricing" label="Premiumの料金を見る" location="final" variant="secondary">
                <FileCheck2 size={18} aria-hidden="true" />
                Premiumの料金を見る
              </HomeCta>
            </div>
          </div>
        </section>

        <MobileStickyCta />
      </div>
      <ImageLightbox image={lightboxImage} onClose={closeLightbox} />
    </>
  )
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー｜YMM4向け台本・素材準備ツール"
        description={metaDescription}
        keywords="ゆっくりまとめプロセッサー,YMM4,台本,素材,記事URL,スレッドURL,反応集,解説動画,ショート動画,Windows,Free,Premium"
        image={homeAssets.hero}
        path="/"
        structuredData={[softwareApplicationLd, faqPageLd]}
      />
      <HomePageContent />
    </>
  )
}
