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
                反応集・
                <br />
                ゆっくり解説の
                <br />
                ネタ収集、台本作成、
                <br />
                YMM4準備を1つに。
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
            <h2 className="animate-slide-up">制作フローを統合する、5つのプロセス。</h2>
            <p className="animate-slide-up" style={{ animationDelay: '0.1s' }}>複数ツールを行き来する無駄を排除し、情報収集から出力までを美しい一本のパイプラインに。</p>
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

        <Section alt className="home-compact-section home-compact-process-section">
          <div className="home-compact-section-head">
            <h2>準備時間を、120分から6分へ圧倒的短縮。</h2>
            <p>95%削減の根拠を、ネタ探し・台本整理・YMM4前調整の時間差で可視化します。</p>
          </div>

          <div 
            ref={chartAnimation.ref}
            className="home-compact-time-detail-board" 
            role="img" 
            aria-label="手作業120分と本ツール6分の時間内訳比較"
            style={{ 
              backgroundImage: `url(${media.timeCompressionBg})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(10, 9, 12, 0.85)'
            }}
          >
            <div className={`home-compact-time-detail-board__summary ${chartAnimation.isInView ? 'animate-slide-up' : ''}`} style={{ opacity: chartAnimation.isInView ? undefined : 0 }}>
              <div className="home-compact-time-detail-board__hero">
                <span>Time Saved</span>
                <strong>{timeReduction.reductionRate}%削減</strong>
                <p>{timeReduction.manualMinutes}分かかっていた準備を、圧倒的な{timeReduction.productMinutes}分まで圧縮。</p>
              </div>

              <div className="home-compact-time-detail-board__totals">
                <div>
                  <span>手作業</span>
                  <strong>{timeReduction.manualMinutes}分</strong>
                </div>
                <div>
                  <span>本ツール</span>
                  <strong>{timeReduction.productMinutes}分</strong>
                </div>
              </div>
            </div>

            <div className="home-compact-time-detail-board__rows">
              {timeBreakdown.map((item, index) => {
                const manual = Number.parseInt(item.manual, 10)
                const product = Number.parseInt(item.product, 10)
                const saved = manual - product

                return (
                  <div 
                    key={item.label} 
                    className={`home-compact-time-detail-board__row ${chartAnimation.isInView ? 'animate-slide-up' : ''}`} 
                    style={{ animationDelay: `${0.1 + (index * 0.15)}s`, opacity: chartAnimation.isInView ? undefined : 0 }}
                  >
                    <div className="home-compact-time-detail-board__label">
                      <strong>{item.label}</strong>
                      <span className="delta-glow">{saved}分短縮</span>
                      <small className="chart-subtext">{item.desc}</small>
                    </div>

                    <div className="home-compact-time-detail-board__chart">
                      <div className="home-compact-time-detail-board__lane">
                        <span>手作業 {item.manual}</span>
                        <div className="home-compact-time-detail-board__track">
                          <div 
                            className={`home-compact-time-detail-board__fill home-compact-time-detail-board__fill--manual ${chartAnimation.isInView ? 'fill-active' : ''}`} 
                            style={{ '--bar-width': `${(manual / timeReduction.manualMinutes) * 100}%` } as React.CSSProperties} 
                          />
                        </div>
                      </div>

                      <div className="home-compact-time-detail-board__lane">
                        <span>本ツール {item.product}</span>
                        <div className="home-compact-time-detail-board__track">
                          <div 
                            className={`home-compact-time-detail-board__fill home-compact-time-detail-board__fill--product ${chartAnimation.isInView ? 'fill-active' : ''}`} 
                            style={{ '--bar-width': `${(product / timeReduction.manualMinutes) * 100}%` } as React.CSSProperties} 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="home-compact-time-detail-board__delta">-{saved}分</div>
                  </div>
                )
              })}
            </div>
          </div>
        </Section>

        <Section id="demo" className="home-compact-section home-compact-demo-section">
          <div className="home-compact-section-head">
            <h2>実画面で分かる、ネタ収集からYMM4準備まで</h2>
            <p>ネタ一覧、会話台本、YMM4準備の3枚で、どこまで進められるかを見せます。</p>
          </div>

          <ProductDemoTabs className="home-compact-demo" />
        </Section>

        <Section alt className="home-compact-section home-compact-usecase-section">
          <div className="home-compact-section-head">
            <h2>反応集・ゆっくり解説・ショート動画に対応</h2>
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
            <h2>作業の無駄を削ぎ落とし、動画の純度を高める。</h2>
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
            <h2>反応集・ゆっくり解説の制作前工程を、ひとつに。</h2>
            <p>
              ネタ収集、台本作成、会話台本、素材整理、YMM4準備まで。
              手作業で分断しがちな工程を、1つの流れにまとめます。
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
