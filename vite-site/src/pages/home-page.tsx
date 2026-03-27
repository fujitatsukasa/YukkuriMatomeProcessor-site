import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl, legal, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'
import { HomeHeroStage, ProductDemoTabs } from '@/pages/shared'
import React, { useEffect, useRef, useState } from 'react'

function useInView(options = { threshold: 0.1 }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  
  return { ref, isInView }
}

function AnimatedNumber({ value, active, suffix = '' }: { value: number; active: boolean; suffix?: string }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1600
    const t0 = performance.now()
    function tick(now: number) {
      const elapsed = now - t0
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, value])
  return <span className="animated-number">{display}{suffix}</span>
}

const flowSteps = [
  { 
    label: 'ネタ収集', 
    icon: media.iconStep1, 
    desc: '複数サイトから情報を収集・抽出。ワンクリックでストックへ。',
    stat: '速度 +400%'
  },
  { 
    label: '台本作成', 
    icon: media.iconStep2, 
    desc: '集めたネタのノイズを除去し、一本の自然な文章へ強力に再構築。',
    stat: '精度 98.5%'
  },
  { 
    label: '会話台本', 
    icon: media.iconStep3, 
    desc: '説明役と補足役の掛け合い形式へ自動変換。キャラ設定を即反映。',
    stat: '自動配役化'
  },
  { 
    label: '素材整理', 
    icon: media.iconStep4, 
    desc: '立ち絵の表情指定や音声トーン指示をセリフと紐付けて完全一元管理。',
    stat: 'ミス率 0%'
  },
  { 
    label: 'YMM4準備', 
    icon: media.iconStep5, 
    desc: 'ゆっくりムービーメーカー4へそのまま読み込める形式で即出力。',
    stat: '直結出力'
  },
] as const

const timeReduction = {
  manualMinutes: 120,
  productMinutes: 6,
  reductionRate: 95,
} as const

const timeBreakdown = [
  { label: 'ネタ探し', manual: '30分', product: '2分', desc: '複数サイトからの手動コピペを自動収集へと置き換え' },
  { label: '台本整理', manual: '35分', product: '2分', desc: '不要なノイズの除去と会話台本形式への一括テキスト変換' },
  { label: 'YMM4前調整', manual: '55分', product: '2分', desc: '立ち絵の表情指定からタイムライン配置への読み込み定義' },
] as const

const useCaseCards = [
  {
    title: '反応集',
    body: '記事や話題を拾って、そのまま会話台本へ。',
    image: media.usecaseReaction,
  },
  {
    title: 'ゆっくり解説',
    body: '説明役と補足役を分けて、YMM4向けに整理。',
    image: media.usecaseYukkuri,
  },
  {
    title: 'ショート動画',
    body: '短い尺でも、見せ場と順番を先に固める。',
    image: media.usecaseShorts,
  },
  {
    title: '会話形式の解説',
    body: '誰が何を話すかを先に決めて、字幕と読み上げを揃える。',
    image: media.usecaseConversation,
  },
] as const

type FAQItem = { question: string; answer: string }
type FAQCategory = { categoryName: string; items: FAQItem[] }

const faqCategories: FAQCategory[] = [
  {
    categoryName: '用途・対応ジャンルについて',
    items: [
      {
        question: '反応集やまとめ動画にも使えますか？',
        answer: 'はい、使えます。2ch/5ch等の記事や話題を集めて、そのまま掛け合い形式の会話台本へ整理しやすい専用の構成になっています。',
      },
      {
        question: 'ショート動画にも使えますか？',
        answer: 'はい、使えます。短い尺でも「どこを見せ場にするか」の構成と順番を先に固めることができるため、短尺向けの台本作成に最適です。',
      },
      {
        question: 'YMM4専用ですか？他の編集ソフトでも使えますか？',
        answer: '出力形式は基本的にYMM4（ゆっくりムービーメーカー4）向けのタイムライン・立ち絵情報込みのフォーマットですが、テキスト台本としてコピーすることも可能なため、Premiere ProやAviUtlでの制作の下準備としてもご利用いただけます。',
      },
    ]
  },
  {
    categoryName: 'システム・動作環境について',
    items: [
      {
        question: 'AIが全部自動で作るツールですか？',
        answer: 'いいえ、動画を「全自動生成」するツールではありません。クリエイター自身がこだわりたい「ネタ収集」から「会話台本」「素材整理」までを繋ぎ、めんどうなコピペや設定作業をスキップするための「制作支援」ツールです。',
      },
      {
        question: 'Mac環境（macOS）でも利用できますか？',
        answer: '本ツールはWindows専用のデスクトップアプリケーションとなります。Mac環境では動作保証外となりますのでご注意ください。',
      },
    ]
  },
  {
    categoryName: 'ご購入・ライセンスについて',
    items: [
      {
        question: '月額料金（サブスクリプション）はかかりますか？',
        answer: 'いいえ、完全買い切り型のライセンスです。月額費用や制作本数に応じた従量課金は一切発生せず、永続的にご利用いただけます。',
      },
      {
        question: '購入後のアップデートは無料ですか？',
        answer: 'はい、機能追加や不具合修正などのマイナーアップデートは無償でご提供いたします。ツール内から直接最新版をダウンロード可能です。',
      },
    ]
  }
]

const faqItems: FAQItem[] = faqCategories.flatMap(c => c.items)

const closingBadges = ['買い切り', 'Windows対応', 'YMM4向け', legal.support.firstResponseSla] as const

const homeMetaDescription =
  '反応集・ゆっくり解説・ショート動画向けに、ネタ収集、台本作成、会話台本、立ち絵・画像・音声の素材整理、YMM4前の準備までまとめて進められる動画制作支援ツール。'

const homeStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    alternateName: siteSubtitle,
    url: siteOrigin,
    inLanguage: 'ja-JP',
    description: homeMetaDescription,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: legal.organization.legalName,
    brand: siteTitle,
    url: siteOrigin,
    logo: `${siteOrigin}/favicon.ico`,
    email: legal.organization.email,
    telephone: legal.organization.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: legal.organization.addressLine,
      postalCode: legal.organization.postalCode.replace(/^〒/, ''),
      addressCountry: 'JP',
    },
    sameAs: ['https://x.com/OTM_corp'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteTitle,
    alternateName: siteSubtitle,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Windows',
    description: homeMetaDescription,
    url: siteOrigin,
    downloadUrl,
    image: media.productImage2,
    screenshot: [media.productImage2, media.settingsShot, media.productImage1],
    offers: {
      '@type': 'Offer',
      price: legal.pricing.unitPrice,
      priceCurrency: legal.pricing.currency,
      url: `${siteOrigin}/purchase/`,
      availability: 'https://schema.org/InStock',
    },
    publisher: {
      '@type': 'Organization',
      name: legal.organization.legalName,
      url: siteOrigin,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  },
]

export function HomePage() {
  const flowAnimation = useInView({ threshold: 0.2 })
  const chartAnimation = useInView({ threshold: 0.2 })

  return (
    <>
      <PageMeta
        title={`${siteTitle} | ${siteSubtitle}`}
        description="ネタ収集からゆっくりムービーメーカー4(YMM4)の台本準備までを一本化し、作業時間を約95%短縮する2ch/5ch反応集・ゆっくり解説対応のWindows向け動画制作支援ツール。"
        keywords="ゆっくり解説,反応集,YMM4,台本自動生成,ショート動画,2chまとめ"
        image={media.productImage2}
        path="/"
        structuredData={homeStructuredData}
      />

      <div className="home-compact-shell">
        <section className="home-compact-hero homepage-hero">
          <video
            className="home-compact-hero__video-bg"
            src={media.heroSaasBg}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div className="home-compact-hero__layout">
            <div className="home-compact-hero__copy">
              <h1 className="brand-title">
                <span className="text-rotator text-glow-green">
                  <span className="text-rotator__inner">
                    <span>【 反応集 】</span>
                    <span>【 ゆっくり解説 】</span>
                    <span>【 ショート動画 】</span>
                    <span aria-hidden="true">【 反応集 】</span>
                  </span>
                </span>
                <br />
                のネタ収集、台本作成、
                <br />
                <span className="text-gradient-animated">YMM4準備</span>を1つに。
              </h1>
              <p className="brand-lead">
                記事や話題を集めて、会話台本・立ち絵・素材整理までまとめて進められる、
                YMM4向けの動画制作支援ツールです。
              </p>

              <div className="brand-inline-actions home-compact-hero__actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  無料で開始する！
                </Link>
                <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                  使い方を見る
                </Link>
              </div>

            </div>

            <div className="home-compact-hero__media">
              <HomeHeroStage />
            </div>
          </div>
        </section>

        <Section className="home-compact-section home-compact-flow-section">
          <div className="home-compact-section-head">
            <h2 className="animate-slide-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.2rem' }}>
              <span className="reveal-mask"><span className="reveal-mask__inner" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>制作フローを</span></span>
              <span className="reveal-mask"><span className="reveal-mask__inner" style={{ '--reveal-delay': '0.2s' } as React.CSSProperties}>統合する、</span></span>
              <span className="reveal-mask"><span className="reveal-mask__inner" style={{ '--reveal-delay': '0.3s' } as React.CSSProperties}><span className="text-glow-gold">5つのプロセス。</span></span></span>
            </h2>
            <p className="animate-slide-up" style={{ animationDelay: '0.4s' }}>複数ツールを行き来する無駄を排除し、情報収集から出力までを美しい一本のパイプラインに。</p>
          </div>

          <div className="home-compact-flow" ref={flowAnimation.ref}>
            <ul className="home-compact-flow__list-detailed" aria-label="制作フロー詳細">
              {flowSteps.map((item, index) => (
                <li 
                  key={item.label} 
                  className={`home-compact-flow__card ${flowAnimation.isInView ? 'animate-slide-up' : ''}`} 
                  style={{ animationDelay: `${0.2 + (index * 0.15)}s`, opacity: flowAnimation.isInView ? undefined : 0 }}
                >
                  <div className="home-compact-flow__card-glow" />
                  <div className="home-compact-flow__step-num layout-flex-center">0{index + 1}</div>
                  <div className="home-compact-flow__icon-wrap">
                    <img src={item.icon} alt="" className="home-compact-flow__icon" loading="lazy" />
                  </div>
                  <div className="home-compact-flow__card-content">
                    <h3>{item.label}</h3>
                    <p>{item.desc}</p>
                    <span className="home-compact-flow__badge">{item.stat}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section alt className="home-compact-section home-compact-process-section bg-marquee-wrap">
          <div className="bg-marquee-container" aria-hidden="true">
            <div className="bg-marquee__track">
              <span>95% TIME REDUCTION FOR YMM4 - PREPARATION REVOLUTION - MASSIVE EFFICIENCY - </span>
              <span>95% TIME REDUCTION FOR YMM4 - PREPARATION REVOLUTION - MASSIVE EFFICIENCY - </span>
            </div>
          </div>
          <div className="home-compact-section-head">
            <h2>準備時間を、<span className="text-glow-gold">120分から6分</span>へ<span className="text-glow-green">圧倒的短縮</span>。</h2>
            <p><strong className="text-glow-muted">95%削減</strong>の根拠を、<span className="text-glow-muted">ネタ探し・台本整理・YMM4前調整</span>の時間差で可視化します。</p>
          </div>

          <div 
            ref={chartAnimation.ref}
            className="chart-dashboard" 
            role="img" 
            aria-label="手作業120分と本ツール6分の時間内訳比較"
          >
            <div className="chart-dashboard__inner">
              {/* ── Hero Stats Row ── */}
              <div className={`chart-dashboard__hero ${chartAnimation.isInView ? 'is-visible' : ''}`}>
                <div className="chart-dashboard__ring-wrap">
                  <svg className="chart-dashboard__ring" viewBox="0 0 120 120">
                    <circle className="chart-dashboard__ring-bg" cx="60" cy="60" r="52" />
                    <circle
                      className={`chart-dashboard__ring-fill ${chartAnimation.isInView ? 'is-active' : ''}`}
                      cx="60" cy="60" r="52"
                      style={{ '--ring-pct': `${timeReduction.reductionRate}` } as React.CSSProperties}
                    />
                  </svg>
                  <div className="chart-dashboard__ring-label">
                    <AnimatedNumber value={timeReduction.reductionRate} active={chartAnimation.isInView} suffix="%" />
                    <span>削減</span>
                  </div>
                </div>

                <div className="chart-dashboard__kpi-group">
                  <div className="chart-dashboard__kpi chart-dashboard__kpi--before">
                    <span className="chart-dashboard__kpi-tag">Before</span>
                    <div className="kpi-giant-wrap">
                      <AnimatedNumber value={timeReduction.manualMinutes} active={chartAnimation.isInView} />
                      <small>分</small>
                    </div>
                    <span className="chart-dashboard__kpi-desc">手作業による準備</span>
                  </div>
                  <div className="chart-dashboard__kpi-arrow" aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 40 40"><path d="M8 20h20M22 13l8 7-8 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="chart-dashboard__kpi chart-dashboard__kpi--after">
                    <span className="chart-dashboard__kpi-tag">After</span>
                    <div className="kpi-giant-wrap">
                      <AnimatedNumber value={timeReduction.productMinutes} active={chartAnimation.isInView} />
                      <small>分</small>
                    </div>
                    <span className="chart-dashboard__kpi-desc">本ツールで完了</span>
                  </div>
                </div>
              </div>

              {/* ── Breakdown Rows ── */}
              <div className="chart-dashboard__rows">
                {timeBreakdown.map((item, index) => {
                  const manual = Number.parseInt(item.manual, 10)
                  const product = Number.parseInt(item.product, 10)
                  const saved = manual - product

                  return (
                    <div
                      key={item.label}
                      className={`chart-dashboard__row ${chartAnimation.isInView ? 'is-visible' : ''}`}
                      style={{ '--row-delay': `${0.3 + index * 0.15}s` } as React.CSSProperties}
                    >
                      <div className="chart-dashboard__row-info">
                        <strong className="chart-dashboard__row-title">{item.label}</strong>
                        <p>{item.desc}</p>
                      </div>

                      <div className="chart-dashboard__row-stats">
                        <div className="chart-dashboard__stat-box chart-dashboard__stat-box--manual">
                          <small>手作業</small>
                          <span>{item.manual}</span>
                        </div>
                        <div className="chart-dashboard__stat-arrow-sm" aria-hidden="true">
                          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div className="chart-dashboard__stat-box chart-dashboard__stat-box--product">
                          <small>本ツール</small>
                          <span>{item.product}</span>
                        </div>
                      </div>

                      <div className="chart-dashboard__row-badge">
                        <span className="chart-dashboard__row-saved">
                          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 11V3M4 6l3-3 3 3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {saved}分
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Section>

        <Section id="demo" className="home-compact-section home-compact-demo-section">
          <div className="home-compact-section-head">
            <h2><span className="text-glow-gold">実画面</span>で分かる、ネタ収集から<span className="text-glow-green">YMM4準備</span>まで</h2>
            <p>ネタ一覧、会話台本、YMM4準備の3枚で、どこまで進められるかを見せます。</p>
          </div>

          <ProductDemoTabs className="home-compact-demo" />
        </Section>

        <Section alt className="home-compact-section home-compact-usecase-section">
          <div className="home-compact-section-head">
            <h2><span className="text-glow-green">反応集・ゆっくり解説</span>・ショート動画に対応</h2>
          </div>

          <div className="home-compact-usecase-grid" role="list">
            {useCaseCards.map((item) => (
              <article 
                key={item.title} 
                className="home-compact-usecase-card" 
                role="listitem"
              >
                <div 
                  className="home-compact-usecase-card__bg" 
                  style={{ backgroundImage: `url(${item.image})` }} 
                  aria-hidden="true" 
                />
                <div className="home-compact-usecase-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>



        <Section className="home-compact-section home-compact-price-section">
          <div className="home-compact-section-head">
            <h2>作業の無駄を削ぎ落とし、動画の<span className="text-glow-gold">純度を高める。</span></h2>
            <p>ゆっくりまとめプロセッサーは買い切り型。毎月のランニングコストを気にせず、動画制作のルーチンを即座に効率化できます。</p>
          </div>

          <div className="home-compact-price-layout">
            <div className="home-compact-price-visual">
              <div className="home-compact-price-visual__img">
                <img src={media.workspaceComputer} alt="" loading="lazy" />
                <div className="home-compact-price-visual__overlay" />
              </div>
              <div className="home-compact-price-floating-badge">
                <div className="pulse-ring"></div>
                <span>買い切り<br/>ライセンス</span>
              </div>
            </div>

            <InteractiveCard className="home-compact-price-card-rich">
              <div className="home-compact-price-card-rich__top">
                <h3>Standard License</h3>
                <div className="home-compact-price-card-rich__price">
                  <strong>{legal.pricing.amountIncludingTax}</strong>
                  <span>(1ライセンス/PC1台)</span>
                </div>
                <p>追加費用なしで永続利用可能なWindows向けデスクトップツールです。</p>
              </div>

              <ul className="home-compact-price-card-rich__features" aria-label="搭載機能">
                <li><span className="check-icon">✓</span> 複数サイトからのネタ自動収集</li>
                <li><span className="check-icon">✓</span> 対話形式への台本自動コンバート</li>
                <li><span className="check-icon">✓</span> YMM4用タイムライン・キャラ立ち絵出力</li>
                <li><span className="check-icon">✓</span> 永続的なローカル動作と無償アップデート</li>
              </ul>

              <div className="home-compact-price-card-rich__action">
                <Link to="/purchase/" className="brand-btn brand-btn--primary home-compact-price-btn">
                  ご購入ページへ進む
                </Link>
                <p className="home-compact-price-card-rich__note">
                  ※クレジットカード・銀行振込に対応しています。
                </p>
              </div>

              <ul className="home-compact-price-card__badges" aria-label="導入条件">
                {closingBadges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InteractiveCard>
          </div>
        </Section>

        <Section alt className="home-compact-section home-compact-closing-section">
          <div className="home-compact-faq">
            <div className="home-compact-section-head">
              <h2>よくある質問</h2>
              <p>
                導入前によくある確認事項だけを短くまとめています。
                <Link to="/faq/">FAQページ</Link>ではさらに詳しく確認できます。
              </p>
            </div>

            <div className="home-compact-faq__list">
              {faqCategories.map((category) => (
                <div key={category.categoryName} className="home-compact-faq__category">
                  <h3 className="home-compact-faq__category-title">{category.categoryName}</h3>
                  <div className="home-compact-faq__category-items">
                    {category.items.map((item) => (
                      <details key={item.question} className="home-compact-faq__item">
                        <summary>{item.question}</summary>
                        <p>{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section className="home-compact-section home-compact-cta-section">
          <InteractiveCard className="home-compact-cta-card">
            <h2><span className="text-glow-green">反応集・ゆっくり解説</span>の制作前工程を、<span className="text-glow-gold">ひとつに。</span></h2>
            <p>
              ネタ収集、台本作成、会話台本、素材整理、YMM4準備まで。
              手作業で分断しがちな工程を、<strong className="text-glow-gold">1つの流れ</strong>にまとめます。
            </p>

            <div className="brand-inline-actions home-compact-cta__actions">
              <Link className="brand-btn brand-btn--primary" to="/download/">
                無料で開始する！
              </Link>
              <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                使い方を見る
              </Link>
            </div>

            <ul className="home-compact-cta__badges" aria-label="補足情報">
              {closingBadges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </InteractiveCard>
        </Section>
      </div>
    </>
  )
}
