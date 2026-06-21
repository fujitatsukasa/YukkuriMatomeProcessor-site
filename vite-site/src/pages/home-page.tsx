import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type SyntheticEvent,
} from 'react'
import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui'
import { trackEvent } from '@/lib/analytics'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  FileCheck2,
  Focus,
  MousePointer2,
  Play,
  ShieldCheck,
  TableProperties,
  X,
} from 'lucide-react'
import {
  comparisonRows,
  demoOutline,
  downloadTrustItems,
  fitItems,
  freeChecks,
  heroContent,
  homeFacts,
  homeFaqs,
  premiumFit,
  premiumMismatch,
  problemItems,
  productTourItems,
  requirementRows,
  responsibilityItems,
  sampleItems,
  workflowSteps,
  type ProductTourItem,
  type SampleItem,
} from './home-content'
import './home-page.css'

type CtaLocation =
  | 'hero'
  | 'flow'
  | 'free'
  | 'pricing_free'
  | 'pricing_premium'
  | 'sticky_mobile'
  | 'final'

type LightboxImage = {
  src: string
  alt: string
  title: string
}

const primaryCtaLabel = heroContent.primaryCta

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: homeFacts.productName,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: homeFacts.os.join(', '),
  softwareRequirements: `${homeFacts.osLabel}、YMM4必須`,
  url: `${homeFacts.siteOrigin}/`,
  downloadUrl: homeFacts.downloadUrl,
  image: `${homeFacts.siteOrigin}/lp/screen-main-script-edit-v2.webp`,
  description:
    '記事URL・スレッドURL・下書きから、台本取得、AI台本生成、素材配置の確認、YMM4反映までを支援するWindows 10 / 11向けソフト。',
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
    name: homeFacts.productName,
    url: homeFacts.siteOrigin,
  },
}

const faqPageLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeFaqs.map((item) => ({
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
    const params = new URLSearchParams(window.location.search)
    const device = window.matchMedia('(max-width: 760px)').matches ? 'mobile' : 'desktop'
    trackEvent('lp_view', {
      source: params.get('utm_source') || 'direct',
      medium: params.get('utm_medium') || 'none',
      campaign: params.get('utm_campaign') || 'none',
      device,
    })
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
    trackEvent('lp_cta_click', { location, label, destination: href })

    if (href === homeFacts.downloadUrl) {
      trackEvent('lp_download_click', { location, url: href })
    }

    if (href.includes('/purchase/')) {
      trackEvent('lp_purchase_click', { location, price: homeFacts.premiumPriceValue })
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

function AnnotatedImage({
  item,
  onZoom,
  priority = false,
}: {
  item: ProductTourItem
  onZoom: (image: LightboxImage) => void
  priority?: boolean
}) {
  return (
    <button
      className="home-lp-annotated-image"
      type="button"
      onClick={() => {
        trackEvent('lp_image_zoom', { image_name: item.id })
        onZoom({ src: item.image, alt: item.alt, title: item.title })
      }}
    >
      <img
        src={item.image}
        alt={item.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
      {item.annotations.map((annotation) => (
        <span
          key={`${item.id}-${annotation.label}`}
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
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!image) {
      return undefined
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [image, onClose])

  if (!image) {
    return null
  }

  return (
    <div className="home-lp-lightbox" role="dialog" aria-modal="true" aria-label={`${image.title}を拡大表示`}>
      <button className="home-lp-lightbox__backdrop" type="button" aria-label="閉じる" onClick={onClose} />
      <div className="home-lp-lightbox__panel">
        <div className="home-lp-lightbox__head">
          <strong>{image.title}</strong>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="拡大表示を閉じる">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>
  )
}

function ProductTour({ onZoom }: { onZoom: (image: LightboxImage) => void }) {
  const [activeId, setActiveId] = useState(productTourItems[0].id)
  const activeItem = useMemo(
    () => productTourItems.find((item) => item.id === activeId) ?? productTourItems[0],
    [activeId],
  )

  const activateTab = (item: ProductTourItem) => {
    setActiveId(item.id)
    trackEvent('lp_product_tab', { tab_name: item.id })
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return
    }

    event.preventDefault()
    const index = productTourItems.findIndex((item) => item.id === activeId)
    const nextIndex =
      event.key === 'ArrowRight'
        ? (index + 1) % productTourItems.length
        : (index - 1 + productTourItems.length) % productTourItems.length
    const nextItem = productTourItems[nextIndex]
    setActiveId(nextItem.id)
    document.getElementById(`home-tour-tab-${nextItem.id}`)?.focus()
    trackEvent('lp_product_tab', { tab_name: nextItem.id })
  }

  return (
    <div className="home-lp-tour" data-reveal>
      <div
        className="home-lp-tour__tabs"
        role="tablist"
        aria-label="実画面プロダクトツアー"
        onKeyDown={handleTabKeyDown}
      >
        {productTourItems.map((item) => (
          <button
            id={`home-tour-tab-${item.id}`}
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === activeId}
            aria-controls={`home-tour-panel-${item.id}`}
            tabIndex={item.id === activeId ? 0 : -1}
            onClick={() => activateTab(item)}
          >
            <span>{item.label}</span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>

      <div
        id={`home-tour-panel-${activeItem.id}`}
        className="home-lp-tour__panel"
        role="tabpanel"
        aria-labelledby={`home-tour-tab-${activeItem.id}`}
      >
        <div className="home-lp-tour__copy">
          <span>{activeItem.label}</span>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.body}</p>
        </div>
        <AnnotatedImage item={activeItem} onZoom={onZoom} />
      </div>
    </div>
  )
}

function LazyVideo({ item }: { item: SampleItem }) {
  const [active, setActive] = useState(false)
  const [progressMarks, setProgressMarks] = useState<number[]>([])

  const handlePlay = () => {
    setActive(true)
    trackEvent('lp_sample_play', { sample_type: item.id })
  }

  const handleProgress = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (!video.duration) {
      return
    }

    const percent = Math.floor((video.currentTime / video.duration) * 100)
    const mark = [25, 50, 75, 100].find((value) => percent >= value && !progressMarks.includes(value))

    if (!mark) {
      return
    }

    setProgressMarks((current) => {
      if (current.includes(mark)) {
        return current
      }
      trackEvent('lp_demo_progress', { percent: mark })
      return [...current, mark]
    })
  }

  return (
    <div className="home-lp-video-shell">
      {active ? (
        <video controls playsInline preload="none" poster={item.poster} onTimeUpdate={handleProgress}>
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

function MobileStickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroCta = document.getElementById('home-hero-primary-cta')
    const finalCta = document.getElementById('home-final-cta')
    const mobileQuery = window.matchMedia('(max-width: 760px)')

    if (!heroCta || !finalCta || !('IntersectionObserver' in window)) {
      return undefined
    }

    const state = { heroVisible: true, finalVisible: false, mobile: mobileQuery.matches }
    const update = () => setVisible(state.mobile && !state.heroVisible && !state.finalVisible)

    const heroObserver = new IntersectionObserver(([entry]) => {
      state.heroVisible = entry.isIntersecting
      update()
    })

    const finalObserver = new IntersectionObserver(([entry]) => {
      state.finalVisible = entry.isIntersecting
      update()
    })

    const handleMediaChange = (event: MediaQueryListEvent) => {
      state.mobile = event.matches
      update()
    }

    heroObserver.observe(heroCta)
    finalObserver.observe(finalCta)
    mobileQuery.addEventListener('change', handleMediaChange)

    return () => {
      heroObserver.disconnect()
      finalObserver.disconnect()
      mobileQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <div className="home-lp-sticky-cta" data-visible={visible}>
      <HomeCta href={homeFacts.downloadUrl} label="無料版で確認" location="sticky_mobile" external>
        <Download size={18} aria-hidden="true" />
        無料版で確認
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
          trackEvent('lp_pricing_view')
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
                <span>{heroContent.titleLine1}</span>
                <span>台本と素材を整えて</span>
                <span>YMM4へ。</span>
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
              <p className="home-lp-hero__microcopy">{heroContent.microcopy}</p>
            </div>

            <div className="home-lp-hero__visual" data-reveal>
              <div className="home-lp-product-window" aria-label="実アプリ画面">
                <div className="home-lp-product-window__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <strong>台本編集 / 素材確認</strong>
                </div>
                <img
                  src="/lp/screen-main-script-edit-v2.webp"
                  alt="台本編集と素材配置を確認するゆっくりまとめプロセッサーの実アプリ画面"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
                <span className="home-lp-hero-note home-lp-hero-note--input">入力 / URL・下書き・素材メモ</span>
                <span className="home-lp-hero-note home-lp-hero-note--organize">整理 / 台本・字幕量・素材配置</span>
                <span className="home-lp-hero-note home-lp-hero-note--handoff">反映 / YMM4で最終確認</span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-lp-fit" aria-label="導入前に確認する条件">
          <div className="home-lp-container home-lp-fit__grid">
            {fitItems.map((item) => (
              <div className="home-lp-fit__item" key={item.label} data-reveal>
                <strong>{item.label}</strong>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="home-lp-section home-lp-problem" aria-labelledby="home-problem-heading">
          <div className="home-lp-container home-lp-problem__grid">
            <div data-reveal>
              <p className="home-lp-kicker">YMM4前の下ごしらえ</p>
              <h2 id="home-problem-heading">毎回、編集を始める前の作業で止まっていませんか。</h2>
              <p>
                ネタを集め、会話順に整理し、字幕量を整え、素材の保存先を確認してから、YMM4で並べ始める。
                ゆっくりまとめプロセッサーは、この繰り返しを一つの流れにまとめます。
              </p>
              <div className="home-lp-positioning">
                <strong>完成を丸投げするソフトではありません。</strong>
                <span>YMM4で仕上げる前の台本・素材準備を短くするソフトです。</span>
              </div>
            </div>

            <div className="home-lp-problem__board" data-reveal>
              <ul className="home-lp-problem-list">
                {problemItems.map((item) => (
                  <li key={item.title}>
                    <span />
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="home-lp-flow-diagram" aria-label="下ごしらえが一つにつながる流れ">
                <span>URL / メモ</span>
                <ChevronRight size={18} aria-hidden="true" />
                <span>台本</span>
                <ChevronRight size={18} aria-hidden="true" />
                <span>素材</span>
                <ChevronRight size={18} aria-hidden="true" />
                <span>YMM4</span>
              </div>
            </div>
          </div>
        </section>

        <section id="flow" className="home-lp-section" aria-labelledby="home-flow-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="入力から出力まで"
              title="何を入れると、どこまで進むのか。"
              body="入力、アプリ内の処理、YMM4での仕上げを分けて表示します。自動化の範囲と、自分で確認する範囲を曖昧にしません。"
            />
            <div className="home-lp-workflow">
              {workflowSteps.map((step, index) => (
                <article className="home-lp-workflow-card" key={step.id} data-reveal>
                  <div className="home-lp-workflow-card__copy">
                    <span>{step.step}</span>
                    <p>{step.label}</p>
                    <h3>{step.title}</h3>
                    <ul>
                      {step.items.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={15} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <small>{step.note}</small>
                  </div>
                  <img src={step.image} alt={step.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                </article>
              ))}
            </div>
            <div className="home-lp-section-cta">
              <HomeCta href={homeFacts.downloadUrl} label="Freeでこの流れを確認する" location="flow" external>
                <Download size={18} aria-hidden="true" />
                Freeでこの流れを確認する
              </HomeCta>
            </div>
          </div>
        </section>

        <section id="samples" className="home-lp-section home-lp-section--muted" aria-labelledby="home-samples-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="完成イメージ"
              title="反応集・解説・ショート。実際の作例で確かめる。"
              body="サイト内の実動画プレビューで、どこまでアプリが進め、どこを自分で仕上げたかを確認できます。"
            />
            <div className="home-lp-samples">
              {sampleItems.map((item) => (
                <article className="home-lp-sample-card" key={item.id} data-reveal>
                  <LazyVideo item={item} />
                  <div className="home-lp-sample-card__body">
                    <h3>{item.title}</h3>
                    <dl>
                      <div>
                        <dt>入力</dt>
                        <dd>{item.input}</dd>
                      </div>
                      <div>
                        <dt>本ソフト</dt>
                        <dd>{item.supportScope}</dd>
                      </div>
                      <div>
                        <dt>ユーザー / YMM4</dt>
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

        <section id="product" className="home-lp-section" aria-labelledby="home-product-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="実画面"
              title="機能名より、画面を見れば分かる。"
              body="実際に触る画面だけを使い、入力からYMM4へ渡す前の確認までを順番に見られます。"
            />
            <ProductTour onZoom={setLightboxImage} />
          </div>
        </section>

        <section id="demo" className="home-lp-section home-lp-demo" aria-labelledby="home-demo-heading">
          <div className="home-lp-container home-lp-demo__grid">
            <div data-reveal>
              <p className="home-lp-kicker">実機デモ</p>
              <h2 id="home-demo-heading">入力からYMM4反映までの確認ポイントを見る。</h2>
              <p>
                古い抽象デモ動画ではなく、現行ページでは実画面ツアーとサンプル動画で操作理解を補強します。
                実操作デモ動画は、実アプリと実YMM4の収録素材に差し替える前提です。
              </p>
            </div>
            <div className="home-lp-demo__panel" data-reveal>
              <div className="home-lp-demo__poster">
                <img src="/lp/screen-main-script-edit-v2.webp" alt="台本編集からYMM4へ渡す前の確認画面" loading="lazy" decoding="async" />
                <span>
                  <MousePointer2 size={16} aria-hidden="true" />
                  実画面で確認
                </span>
              </div>
              <ol>
                {demoOutline.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="free" className="home-lp-section home-lp-section--muted" aria-labelledby="home-free-heading">
          <div className="home-lp-container home-lp-free__grid">
            <div data-reveal>
              <p className="home-lp-kicker">購入前に</p>
              <h2 id="home-free-heading">まずFreeで、自分のPCとYMM4環境を確認。</h2>
              <p>
                Premiumを購入する前に、起動、ログイン、台本編集、動画作成導線、YMM4連携の前提を確認できます。
              </p>
              <div className="home-lp-free__actions">
                <HomeCta href={homeFacts.downloadUrl} label="Free版をダウンロード" location="free" external>
                  <Download size={18} aria-hidden="true" />
                  Free版をダウンロード
                </HomeCta>
                <span>{homeFacts.osLabel}専用・YMM4必須</span>
              </div>
            </div>
            <div className="home-lp-free__checks" data-reveal>
              {freeChecks.map((item) => (
                <div key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
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
              kicker="料金"
              title={`Premiumは${homeFacts.premiumPrice}の買い切り。`}
              body="月額料金はありません。Freeで自分の環境を確認し、継続して使うと決めてから購入できます。"
              align="center"
            />

            <div className="home-lp-plan-grid" aria-label="FreeとPremiumの概要">
              <article className="home-lp-plan-card" data-reveal>
                <span>購入前の動作確認</span>
                <h3>Free</h3>
                <strong>0円</strong>
                <p>自分のPCとYMM4環境に合うか、実際の画面で確認します。</p>
                <HomeCta href={homeFacts.downloadUrl} label="Free版をダウンロード" location="pricing_free" external>
                  <Download size={18} aria-hidden="true" />
                  Free版をダウンロード
                </HomeCta>
              </article>
              <article className="home-lp-plan-card home-lp-plan-card--premium" data-reveal>
                <span>買い切り・月額なし</span>
                <h3>Premium</h3>
                <strong>{homeFacts.premiumPrice}</strong>
                <p>YMM4動画を継続制作し、台本取得・AI台本生成・動画作成の制限を解除したい方へ。</p>
                <HomeCta href={homeFacts.purchaseUrl} label="Premiumを購入する" location="pricing_premium" variant="secondary">
                  <ExternalLink size={18} aria-hidden="true" />
                  Premiumを購入する
                </HomeCta>
              </article>
            </div>

            <div className="home-lp-comparison" data-reveal>
              <div className="home-lp-comparison__head">
                <TableProperties size={18} aria-hidden="true" />
                <h3>Free / Premium 比較</h3>
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

            <div className="home-lp-fit-matrix" data-reveal>
              <div>
                <h3>Premiumが向いている方</h3>
                <ul>
                  {premiumFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>購入前にご確認ください</h3>
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

        <section id="requirements" className="home-lp-section home-lp-section--muted" aria-labelledby="home-requirements-heading">
          <div className="home-lp-container">
            <SectionHead
              kicker="導入条件"
              title="買う前に、必要な環境と責任範囲を確認。"
              body="Windows、YMM4、通信、ライセンス、サポート、権利確認など、購入前に必要な情報をまとめます。"
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
              <div className="home-lp-responsibility" data-reveal>
                <h3>責任範囲</h3>
                <ul>
                  {responsibilityItems.map((item) => (
                    <li key={item}>
                      <ShieldCheck size={16} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
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
              body="Freeで何ができるか、Premiumで何が解除されるか、YMM4が必要かを短く確認できます。"
              align="center"
            />
            <div className="home-lp-faq-list">
              {homeFaqs.map((item) => (
                <details
                  id={`faq-${item.id}`}
                  className="home-lp-faq-item"
                  key={item.id}
                  onToggle={(event) => {
                    if (event.currentTarget.open) {
                      trackEvent('lp_faq_open', { question_id: item.id })
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
              <p className="home-lp-kicker">まずはFreeから</p>
              <h2 id="home-final-heading">自分のネタとYMM4環境で、実際の流れを確かめてください。</h2>
              <p>
                台本編集、動画作成導線、YMM4連携の前提をFreeで確認できます。
                自分の制作に合うと分かってから、Premiumを選べます。
              </p>
              <span>{heroContent.microcopy}</span>
            </div>
            <div className="home-lp-final__actions">
              <HomeCta id="home-final-cta" href={homeFacts.downloadUrl} label={primaryCtaLabel} location="final" external>
                <Download size={19} aria-hidden="true" />
                {primaryCtaLabel}
              </HomeCta>
              <HomeCta href={homeFacts.purchaseUrl} label="Premiumの料金と条件を見る" location="final" variant="secondary">
                <FileCheck2 size={18} aria-hidden="true" />
                Premiumの料金と条件を見る
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
        title="YMM4前の台本・素材準備を効率化｜ゆっくりまとめプロセッサー"
        description="記事URL・スレッドURL・下書きから、台本取得、AI台本生成、素材配置の確認、YMM4反映までを支援するWindows 10 / 11向けソフト。Freeで動作確認。Premiumは39,800円（税込）の買い切り・月額なし。"
        keywords="ゆっくりまとめプロセッサー,YMM4,台本,素材準備,反応集,解説動画,ショート動画,Windows,Free,Premium"
        image="/lp/screen-main-script-edit-v2.webp"
        path="/"
        structuredData={[softwareApplicationLd, faqPageLd]}
      />
      <HomePageContent />
    </>
  )
}
