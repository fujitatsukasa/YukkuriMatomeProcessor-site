import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl, legal, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView as useMotionInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { MessageSquare, Smartphone, Users, Download, Zap, Star, ShieldCheck, Clock, CheckCircle2, TrendingUp, HelpCircle, Monitor, CreditCard, ArrowRight, Sparkles, Play, ChevronDown } from 'lucide-react'
import { CustomCursorGlow } from '@/components/CustomCursorGlow'

const SECTION_HEAD_VARIANTS = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 20 } },
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

// ━━━[ Core AI Features (Benefit & SEO Optimized) ]━━━
// ━━━[ Core AI Features (7 Step Pitch Deck) ]━━━
const presentationSlides = [
  { label: '台本取得', sub: 'WEBから即時ストック', desc: 'YouTubeや5ch等のURLから必要な情報を瞬時に抽出し、ワンクリックでストック・一元管理します。', images: ['/product_get_script.png'], charImage: '/nodoka/step1.png' },
  { label: '台本編集', sub: 'メインボードでサクッと調整', desc: '生成された台本は直感的なメインエディターですぐに微調整可能。ボードを出さずとも手軽にテキストを整えられます。', images: ['/product_edit_script.png'], charImage: '/nodoka/編集.png' },
  { label: 'AI台本生成', sub: '高度な自動構築', desc: '集めたネタから不要なノイズを削ぎ落とし、設定したテンプレートに従って自然な掛け合い台本へと一気に再構築します。', images: ['/product_ai_script.png'], charImage: '/nodoka/AI.png' },
  { label: 'Youtube分析', sub: 'トレンドを見逃さない', desc: '再生可能な動画データやトレンドを分析し、ヒットの確率を最大限まで高めるトピック選定を助けます。', images: ['/product_youtube_info.png'], charImage: '/nodoka/step3.png' },
  { label: 'サブウインドウ一括管理', sub: '感情ボード・フォーマット', desc: '詳細な感情指定や配役、フォーマットなどは、独立した専用のサブウィンドウで柔軟かつ直感的に一括管理できます。', images: ['/product_edit_script.png', '/product_board_emotion.png'], charImage: '/nodoka/サブウインドウ.png' },
  { label: 'YMM4直結出力', sub: '編集上部からワンクリック', desc: '編集が完了したら、台本編集画面の上部ボタンを一つ押すだけ。立ち絵や音声トーンを紐付け、そのままYMM4で読み込める形に完全出力します。', images: ['/product_edit_script.png'], charImage: '/nodoka/step6.png' },
  { label: '内蔵操作ガイド', sub: '初心者も安心のフルサポート', desc: 'どの画面からでも即座に呼び出せる詳細なマニュアルを搭載。インストールから動画化までの手順をいつでも確認できます。', images: ['/product_guide.png'], charImage: '/nodoka/ガイド.png' },
] as const

const socialProofStats = [
  { value: '2,400+', label: 'ダウンロード数', Icon: Download },
  { value: '95%', label: '作業時間の削減率', Icon: Zap },
  { value: '4.8', label: 'ユーザー満足度 / 5.0', Icon: Star },
] as const



const timeReduction = {
  manualMinutes: 120,
  productMinutes: 1,
  reductionRate: 99,
} as const

const timeBreakdown = [
  { label: 'ネタ探し', manual: '30分', product: '10秒', saved: '約30', desc: '複数サイトからの手動コピペを自動収集へと置き換え' },
  { label: '台本整理・生成', manual: '25分', product: '20秒', saved: '約25', desc: 'ノイズ除去と会話台本形式への一括テキスト変換をAIで自動化' },
  { label: '感情・配役設定', manual: '10分', product: '10秒', saved: '約10', desc: '立ち絵の表情・声色マッピングをテンプレートで一括適用' },
  { label: 'YMM4前調整', manual: '55分', product: '20秒', saved: '約55', desc: 'タイムライン配置・読み込み定義を自動出力' },
] as const

const useCasesData = [
  {
    title: '5ch/2ch 反応集動画',
    body: '複数スレッドから面白いレスだけを自動抽出し、瞬時に掛け合い台本へ。',
    image: '/product_get_script.png',
    Icon: Users,
    gradient: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.05))',
    borderColor: 'rgba(74, 222, 128, 0.3)',
    iconColor: '#4ade80',
  },
  {
    title: 'YouTube ゆっくり解説',
    body: '解説役と聞き役への自動配役と、YMM4での自然な間合い作りをAIで完全支援。',
    image: '/product_board_emotion.png',
    Icon: MessageSquare,
    gradient: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(59, 130, 246, 0.05))',
    borderColor: 'rgba(96, 165, 250, 0.3)',
    iconColor: '#60a5fa',
  },
  {
    title: 'TikTok / YouTube Shorts',
    body: '短尺特有のテンポの良い構成を見える化。縦型動画の台本作成にも完全対応。',
    image: '/product_ai_script.png',
    Icon: Smartphone,
    gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(236, 72, 153, 0.05))',
    borderColor: 'rgba(244, 114, 182, 0.3)',
    iconColor: '#f472b6',
  },
  {
    title: '自動化による収益化量産',
    body: 'テンプレート＋AI台本で属人性を排除。外注の内製化に最適。',
    image: '/product_board_emotion.png',
    Icon: Zap,
    gradient: 'linear-gradient(135deg, rgba(255, 215, 112, 0.15), rgba(224, 193, 132, 0.05))',
    borderColor: 'rgba(255, 215, 112, 0.3)',
    iconColor: '#ffd770',
  },
] as const

const testimonials = [
  {
    quote: "「毎日2時間かかっていた台本制作が、わずか5分で完了するように。浮いた時間で動画の投稿頻度を2倍に増やせました。」",
    author: "ゆっくり解説系クリエイター",
    authorDetail: "登録者15万人 ｜ 導入歴6ヶ月",
    roi: "月間60時間の削減に成功",
    avatarImg: "/avatars_real/1.png",
  },
  {
    quote: "「外注に頼っていた反応集まとめを内製化できました。コピペ作業の属人性が排除され、完全な自動パイプラインが完成しました。」",
    author: "2ch反応集チャンネル運営",
    authorDetail: "月間再生数300万回 ｜ 導入歴4ヶ月",
    roi: "外注費 約15万円/月の削減",
    avatarImg: "/avatars_real/2.png",
  },
  {
    quote: "「YMM4への出力がワンクリックなのが最大の魅力。細かい立ち絵の表情指定も事前にまとめて設定できるためミスが激減しました。」",
    author: "複数チャンネル運営ディレクター",
    authorDetail: "3チャンネル同時運営 ｜ 導入歴8ヶ月",
    roi: "修正・確認時間の 80%削減",
    avatarImg: "/avatars_real/3.png",
  },
  {
    quote: "「ショート動画を量産するために導入。テンプレートを一度組めば、あとはURLを入れるだけで台本が出来上がるので楽すぎます。」",
    author: "ショート動画特化クリエイター",
    authorDetail: "TikTok フォロワー8万 ｜ 導入歴3ヶ月",
    roi: "月間投稿本数が3倍に",
    avatarImg: "/avatars_real/4.png",
  },
  {
    quote: "「副業で始めたゆっくり解説チャンネルが、このツールのおかげで本業の収入を超えました。準備の手間が消えたのが大きいです。」",
    author: "副業系ゆっくりクリエイター",
    authorDetail: "登録者3万人 ｜ 導入歴5ヶ月",
    roi: "副業収入が月20万円を突破",
    avatarImg: "/avatars_real/5.png",
  },
  {
    quote: "「法人として複数チャンネルの運用を効率化するために導入。属人化を排除でき、スタッフの教育コストも大幅に削減できました。」",
    author: "動画制作会社 COO",
    authorDetail: "法人5チャンネル運用 ｜ 導入歴10ヶ月",
    roi: "スタッフ教育コスト 70%削減",
    avatarImg: "/avatars_real/6.png",
  },
]

type FAQItem = { question: string; answer: string }
type FAQCategory = { categoryName: string; items: FAQItem[] }

const faqCategoryIcons: Record<string, typeof HelpCircle> = {
  'ご購入・ライセンスについて': CreditCard,
  '用途・対応ジャンルについて': HelpCircle,
  'システム・動作環境について': Monitor,
}

const faqCategories: FAQCategory[] = [
  {
    categoryName: 'ご購入・ライセンスについて',
    items: [
      {
        question: '価格・プランについて教えてください。',
        answer: '無料プラン、スタンダードプラン（月額5,000円/税込5,500円）、プロプラン（月額10,000円/税込11,000円）の3つのプランをご用意しています。まずは無料プランでお試しください。',
      },
      {
        question: '購入後のアップデートは無料ですか？',
        answer: 'はい、機能追加や不具合修正などのマイナーアップデートは無償でご提供いたします。ツール内から直接最新版をダウンロード可能です。',
      },
    ]
  },
  {
    categoryName: '用途・対応ジャンルについて',
    items: [
      {
        question: 'YMM4専用ですか？他の編集ソフトでも使えますか？',
        answer: '出力形式は基本的にYMM4（ゆっくりムービーメーカー4）向けですが、テキスト台本としてコピーすることも可能なため、Premiere ProやAviUtlでの制作の下準備としてもご利用いただけます。',
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
]

const faqItems: FAQItem[] = faqCategories.flatMap(c => c.items)



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
    logo: `${siteOrigin}/og-image.png`,
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
  const flowRef = useRef<HTMLDivElement>(null)
  const isFlowInView = useMotionInView(flowRef, { amount: 0.2, once: true })
  const chartRef = useRef<HTMLDivElement>(null)
  const isChartInView = useMotionInView(chartRef, { amount: 0.2, once: true })
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialsRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      testimonialsRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }

  const { scrollY } = useScroll()
  // Subtle parallax translation
  const parallaxY = useTransform(scrollY, [0, 8000], [0, 2000])
  // Browser frame 3D tilt on scroll
    
  const [activeSlide, setActiveSlide] = useState(0)
  const isAutoPlayingRef = useRef(true)

  // ━━━[ Floating CTA visibility ]━━━
  const [showFloatingCta, setShowFloatingCta] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const heroEnd = document.querySelector('.home-compact-hero')?.getBoundingClientRect()
      const ctaSection = document.querySelector('.home-compact-cta-section')?.getBoundingClientRect()
      if (heroEnd && ctaSection) {
        const pastHero = heroEnd.bottom < 0
        const reachedCta = ctaSection.top < window.innerHeight
        setShowFloatingCta(pastHero && !reachedCta)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ━━━[ Testimonial Auto-Scroll ]━━━
  useEffect(() => {
    const el = testimonialsRef.current
    if (!el) return
    const timer = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 400, behavior: 'smooth' })
      }
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // ━━━[ Auto Carousel Logic ]━━━
  useEffect(() => {
    if (!isAutoPlayingRef.current || !isFlowInView) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % presentationSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [activeSlide, isFlowInView])

  const handleSlideChange = (index: number) => {
    isAutoPlayingRef.current = false
    setActiveSlide(index)
  }


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
      <div className="home-compact-shell" style={{ position: 'relative' }}>
        <CustomCursorGlow />
        {/* Animated Parallax Background using generated asset */}
        <motion.div
          className="home-parallax-layer"
          style={{
            position: 'absolute',
            top: '0vh', /* Start from the very top */
            left: 0,
            width: '100%',
            height: '250vh',
            backgroundImage: "url('/bg_abstract_2.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.35,
            y: parallaxY,
            pointerEvents: 'none',
            zIndex: 0,
            maskImage: 'linear-gradient(to bottom, black 0%, black 15%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 15%, black 80%, transparent 100%)',
            mixBlendMode: 'screen'
          }}
        />
        <section className="home-compact-hero homepage-hero">
          <video
            className="home-compact-hero__video-bg"
            src={media.heroSaasBg}
            poster={media.heroPoster}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />

          {/* Refined ambient background — no particles for performance */}
          <div className="hero-ambient-vortex">
            <div className="hero-ambient-orb orb-1" />
            <div className="hero-ambient-orb orb-2" />
          </div>
          
          {/* Centered, minimal hero headline — Linear / Vercel style */}
          <div className="hero-grid-split" style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-grid-split__text">
              <motion.p 
                className="brand-kicker hero-eyebrow-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(224,193,132,0.3)', background: 'rgba(224,193,132,0.08)', marginBottom: 'clamp(0.8rem, 2vh, 1.5rem)', fontSize: '0.85rem' }}
              >
                <Sparkles size={14} color="#e0c184" />
                ゆっくり動画制作を、圧倒的に加速
              </motion.p>
              
              <h1 className="hero-massive-title">
                <span className="text-rotator" style={{ display: 'inline-block' }}>
                  <span className="text-rotator__inner">
                    <span className="text-glow-green">【反応集】</span>
                    <span className="text-glow-gold">【ゆっくり解説】</span>
                    <span className="text-glow-blue">【ショート動画】</span>
                    <span className="text-glow-green" aria-hidden="true">【反応集】</span>
                  </span>
                </span>
                <br />
                <span>の面倒な作業をゼロに。</span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ color: 'rgba(236,233,226,0.85)', fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', maxWidth: '600px', margin: 'clamp(0.8rem, 1.5vh, 1.2rem) 0', lineHeight: 1.7 }}
              >
                ネタ収集からYMM4出力まで、手作業の<strong className="text-glow-gold" style={{ fontWeight: 700 }}>95%を自動化</strong>。毎日の動画投稿を徹底アシストします。
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="brand-inline-actions home-compact-hero__actions" 
              >
                <Link className="brand-btn brand-btn--primary" to="/download/" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
                  無料で始める
                </Link>
                <Link className="brand-btn brand-btn--ghost" to="/instructions/" style={{ gap: '6px', padding: '14px 28px' }}>
                  <Play size={16} />
                  使い方を見る
                </Link>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="hero-microcopy" style={{ marginTop: '0.8rem', opacity: 0.7 }}
              >
                無料プランあり・Windows専用・クレカ不要
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="hero-proof-bar" 
                style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)', justifyContent: 'flex-start' }}
              >
                {socialProofStats.map((stat) => (
                  <div key={stat.label} className="hero-proof-bar__item">
                    <span className="hero-proof-bar__icon" aria-hidden="true">
                      <stat.Icon size={18} color="#e0c184" />
                    </span>
                    <span className="hero-proof-bar__value">{stat.value}</span>
                    <span className="hero-proof-bar__label">{stat.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div 
              className="hero-grid-split__media"
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img 
                src="/product_get_script.png"
                alt="ゆっくりまとめプロセッサーの実際の操作画面"
                fetchPriority="high"
                className="hero-product-image-clean"
              />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'clamp(1rem, 2vh, 2rem)', gap: '4px' }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} color="rgba(255,255,255,0.3)" />
            </motion.div>
          </motion.div>

        </section>

        {/* ━━━[ Compatibility / Ecosystem Bar ]━━━ */}
        <div className="compatibility-bar">
          <div className="compatibility-bar__inner">
            <span className="compatibility-bar__label">対応環境</span>
            <div className="compatibility-bar__items">
              <div className="compatibility-bar__item">
                <Monitor size={18} />
                <span>Windows 10 / 11</span>
              </div>
              <div className="compatibility-bar__item">
                <Sparkles size={18} color="#e0c184" />
                <span>YMM4 完全対応</span>
              </div>
              <div className="compatibility-bar__item">
                <Sparkles size={18} color="#e0c184" />
                <span>AI台本生成</span>
              </div>
              <div className="compatibility-bar__item">
                <Download size={18} />
                <span>オフライン動作</span>
              </div>
            </div>
          </div>
        </div>

        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />

        <section className="brand-section brand-section--alt home-compact-section home-presentation-deck" ref={flowRef} style={{ position: 'relative', zIndex: 1, minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: 1250, margin: '0 auto', display: 'flex', flexDirection: 'column', padding: 'clamp(3rem, 6vh, 6rem) max(1.5rem, 3vw)', position: 'relative', zIndex: 2 }}>
            
            {/* Header */}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem', gap: '8px' }}>
              <p className="brand-kicker" style={{ margin: 0 }}>全機能紹介</p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', margin: 0 }}>収益化に向けた、<span style={{ display: 'inline-block' }}><span className="text-glow-gold">全7プロセス</span><span className="text-glow-green">完全網羅</span>。</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 700, textAlign: 'center', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                ネタ収集からYMM4タイムライン出力まで、動画制作におけるあらゆる手作業を自動化する、一貫した制作ワークフローをご紹介します。
              </p>
            </div>

            {/* Main Stage */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ flex: '1 1 auto', width: '100%' }}
            >
              {/* Combined Giant Card wrapper */}
              <div 
                style={{ 
                  display: 'flex', flexWrap: 'wrap', alignItems: 'stretch',
                  background: 'linear-gradient(135deg, rgba(26, 25, 30, 0.95), rgba(16, 15, 20, 0.95))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(224, 193, 132, 0.4)',
                  borderRadius: '28px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)',
                  overflow: 'visible',
                  height: 'clamp(550px, 65vh, 700px)' /* Absolute fixed height to prevent jumps */
                }}
              >
              
                {/* Left: Guide Character & Text */}
                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)', zIndex: 10, position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`desc-${activeSlide}`}
                      initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', gap: '2rem' }}
                    >
                      {/* Text Section Top */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                          <span style={{ fontSize: '1.05rem', color: '#e0c184', fontWeight: 800, letterSpacing: '3px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 12px #4CAF50' }} />
                            STEP 0{activeSlide + 1}
                          </span>
                          <h3 style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)', color: '#fff', margin: 0, fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.01em', wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>{presentationSlides[activeSlide]?.label}</h3>
                        </div>
                        
                        {/* Description */}
                        <div>
                          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.75, margin: 0, fontWeight: 500 }}>{presentationSlides[activeSlide]?.desc}</p>
                        </div>
                      </div>
                      
                      {/* Character Avatar Bottom Center */}
                      <div style={{ flexShrink: 0, width: '100%', height: 'clamp(180px, 30vh, 260px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', marginTop: 'auto' }}>
                        <img 
                          src={presentationSlides[activeSlide]?.charImage || '/nodoka/通常.png'} 
                          alt={`STEP ${activeSlide + 1}: ${presentationSlides[activeSlide]?.label}を案内するガイドキャラクターのどか`}
                          style={{ width: 'auto', maxWidth: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom', filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.6))' }}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right: Floating UI Window Showcase Area */}
                <div style={{ flex: '1.5 1 500px', position: 'relative', overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`slide-${activeSlide}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                      style={{ position: 'absolute', inset: '1.5rem 1.5rem 3.5rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                    <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '16px', overflow: 'visible', boxShadow: '0 20px 50px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
                      {presentationSlides[activeSlide]?.images?.map((imgSrc, imgIndex) => {
                        return (
                          <motion.div 
                            key={`${activeSlide}-${imgIndex}`}
                            style={{ 
                              position: 'absolute', 
                              inset: 0,
                              width: '100%', 
                              height: '100%',
                              zIndex: imgIndex,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <img 
                              src={imgSrc}
                              alt={`${presentationSlides[activeSlide]?.label}の実画面 ${imgIndex + 1}`} 
                              loading="lazy"
                              decoding="async"
                              style={{ 
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover', 
                                objectPosition: 'left top',
                                filter: imgIndex > 0 ? 'drop-shadow(-20px 20px 30px rgba(0,0,0,0.8))' : 'none',
                                maskImage: imgIndex > 0 ? 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0))' : 'none',
                                WebkitMaskImage: imgIndex > 0 ? 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0))' : 'none',
                                transform: imgIndex > 0 ? 'translate(10%, 10%) scale(0.95)' : 'none'
                              }}
                            />
                          </motion.div>
                        )
                      })}
                    </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Refined Minimal Dots Navigation */}
                  <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 10 }}>
                    {presentationSlides.map((slide, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSlideChange(idx)}
                        style={{
                          height: 4, 
                          width: 40, // Constant width, no jumping size
                          background: activeSlide === idx ? '#e0c184' : 'rgba(255,255,255,0.25)',
                          borderRadius: 2, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
                          boxShadow: activeSlide === idx ? '0 0 10px rgba(224,193,132,0.6)' : 'none',
                          padding: 0
                        }}
                        title={slide.label}
                        onMouseOver={(e) => {
                          if(activeSlide !== idx) e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
                        }}
                        onMouseOut={(e) => {
                          if(activeSlide !== idx) e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                        }}
                      />
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        </section>



        <Section alt className="home-compact-section home-compact-process-section bg-marquee-wrap">
          {/* Parallax & Animated Section Background */}
          <div className="page-bg-bleed">
            <motion.img 
              src="/bg_speed_master.webp"
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.65, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
              animate={{
                scale: [1.05, 1.15, 1.05],
                objectPosition: ['50% 50%', '55% 55%', '45% 45%', '50% 50%']
              }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </div>

          <div className="bg-marquee-container" aria-hidden="true" style={{ zIndex: 0 }}>
            <div className="bg-marquee__track">
              <span>作業時間95%削減 - YMM4完全対応 - 動画制作を圧倒的に効率化 - ネタ収集から出力まで一本化 - </span>
              <span>作業時間95%削減 - YMM4完全対応 - 動画制作を圧倒的に効率化 - ネタ収集から出力まで一本化 - </span>
            </div>
          </div>
                    <motion.div 
            className="home-compact-section-head" 
            variants={SECTION_HEAD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <p className="brand-kicker">料金プラン</p>
            <h2>あなたの制作スタイルに合わせた<span className="text-glow-gold">3つのプラン</span></h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.7 }}>まずは無料で始めて、必要に応じてアップグレード。<br/>すべてのプランで基本機能をフル活用できます。</p>
          </motion.div>

          <div className="pricing-grid-container">
            {/* Free Plan */}
            <div className="pc-card pc-card--free">
              <div className="pc-plan-label">FREE</div>
              <div className="pc-price-block">
                <span className="pc-currency">¥</span>
                <span className="pc-amount">0</span>
              </div>
              <p className="pc-price-sub">ずっと無料</p>
              <div className="pc-divider" />
              <ul className="pc-features">
                <li><span className="pc-check pc-check--on">✓</span>自動動画編集</li>
                <li><span className="pc-check pc-check--on">✓</span>YMM4タイムライン出力</li>
                <li><span className="pc-check pc-check--on">✓</span>ローカル分析</li>
                <li><span className="pc-check pc-check--on">✓</span>内蔵操作ガイド</li>
                <li><span className="pc-check pc-check--on">✓</span>無償アップデート</li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>高度な台本取得・AI生成</li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>高度なYMM4出力設定</li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>複数サイト ネタ自動収集</li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>API連携・高度な自動処理</li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>優先専用サポート</li>
              </ul>
            </div>

            {/* Standard Plan */}
            <div className="pc-card pc-card--standard">
              <div className="pc-badge pc-badge--gold">個人クリエイター向け</div>
              <div className="pc-plan-label pc-plan-label--gold">STANDARD</div>
              <div className="pc-price-block">
                <span className="pc-currency pc-currency--gold">¥</span>
                <span className="pc-amount pc-amount--gold">5,000</span>
              </div>
              <p className="pc-price-sub">月額 / 税込 5,500円</p>
              <div className="pc-divider pc-divider--gold" />
              <ul className="pc-features">
                <li><span className="pc-check pc-check--on">✓</span>自動動画編集</li>
                <li><span className="pc-check pc-check--on">✓</span>YMM4タイムライン出力</li>
                <li><span className="pc-check pc-check--on">✓</span>ローカル分析</li>
                <li><span className="pc-check pc-check--on">✓</span>内蔵操作ガイド</li>
                <li><span className="pc-check pc-check--on">✓</span>無償アップデート</li>
                <li><span className="pc-check pc-check--gold">✦</span><strong className="pc-feat--gold">高度な台本取得・AI生成</strong></li>
                <li><span className="pc-check pc-check--gold">✦</span><strong className="pc-feat--gold">高度なYMM4出力設定</strong></li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>複数サイト ネタ自動収集</li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>API連携・高度な自動処理</li>
                <li className="pc-feature--off"><span className="pc-check pc-check--off">—</span>優先専用サポート</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="pc-card pc-card--pro">
              <div className="pc-badge pc-badge--pro">✦ 圧倒的おすすめ</div>
              <div className="pc-plan-label pc-plan-label--pro">PRO</div>
              <div className="pc-price-block">
                <span className="pc-currency pc-currency--pro">¥</span>
                <span className="pc-amount pc-amount--pro">10,000</span>
              </div>
              <p className="pc-price-sub">月額 / 税込 11,000円</p>
              <div className="pc-divider pc-divider--pro" />
              <ul className="pc-features">
                <li><span className="pc-check pc-check--on">✓</span>自動動画編集</li>
                <li><span className="pc-check pc-check--on">✓</span>YMM4タイムライン出力</li>
                <li><span className="pc-check pc-check--on">✓</span>ローカル分析</li>
                <li><span className="pc-check pc-check--on">✓</span>内蔵操作ガイド</li>
                <li><span className="pc-check pc-check--on">✓</span>無償アップデート</li>
                <li><span className="pc-check pc-check--gold">✦</span><strong className="pc-feat--gold">高度な台本取得・AI生成</strong></li>
                <li><span className="pc-check pc-check--gold">✦</span><strong className="pc-feat--gold">高度なYMM4出力設定</strong></li>
                <li><span className="pc-check pc-check--pro">◆</span><strong className="pc-feat--pro">複数サイト ネタ自動収集</strong></li>
                <li><span className="pc-check pc-check--pro">◆</span><strong className="pc-feat--pro">API連携・高度な自動処理</strong></li>
                <li><span className="pc-check pc-check--pro">◆</span><strong className="pc-feat--pro">優先専用サポート</strong></li>
              </ul>
              <div className="pc-pro-glow" />
            </div>
          </div>

          </div>

          {/* Trust Badges */}
          <motion.div
            className="trust-badge-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="trust-badge-bar__item">
              <ShieldCheck size={20} color="#4CAF50" />
              <span>SSL暗号化通信</span>
            </div>
            <div className="trust-badge-bar__item">
              <CheckCircle2 size={20} color="#4CAF50" />
              <span>無料プランあり</span>
            </div>
            <div className="trust-badge-bar__item">
              <Clock size={20} color="#e0c184" />
              <span>{legal.support.firstResponseSla}</span>
            </div>
            <div className="trust-badge-bar__item">
              <CreditCard size={20} color="#e0c184" />
              <span>安心の国内決済</span>
            </div>
          </motion.div>
        </Section>

        <Section alt className="home-compact-section home-compact-closing-section">
          {/* Parallax & Animated Section Background */}
          <div className="page-bg-bleed">
            <motion.img 
              src="/bg_faq_master.webp"
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.55, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
              animate={{
                scale: [1.0, 1.05, 1.0],
                opacity: [0.45, 0.65, 0.45]
              }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </div>

          <div className="home-compact-faq" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div 
              className="home-compact-section-head" 
              variants={SECTION_HEAD_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <p className="brand-kicker">FAQ</p>
              <h2>よくある質問</h2>
              <p>
                導入前によくある確認事項だけを短くまとめています。
                <Link to="/faq/">FAQページ</Link>ではさらに詳しく確認できます。
              </p>
            </motion.div>

            <div className="home-compact-faq__list">
              {faqCategories.map((category) => {
                const CategoryIcon = faqCategoryIcons[category.categoryName] || HelpCircle
                return (
                  <div key={category.categoryName} className="home-compact-faq__category">
                    <h3 className="home-compact-faq__category-title">
                      <CategoryIcon size={18} />
                      {category.categoryName}
                    </h3>
                    <div className="home-compact-faq__category-items">
                      {category.items.map((item) => (
                        <details key={item.question} className="home-compact-faq__item">
                          <summary>{item.question}</summary>
                          <p>{item.answer}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link className="brand-btn brand-btn--ghost" to="/contact/" style={{ gap: '8px' }}>
                <HelpCircle size={18} />
                FAQで解決しない場合はお問い合わせ
              </Link>
            </div>
          </div>
        </Section>

        <Section className="home-compact-section home-compact-cta-section home-cta-no-bottom-pad">
          {/* Parallax & Animated Section Background */}
          <div className="page-bg-bleed">
            <motion.img 
              src="/bg_cta_master.webp"
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.7, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%, transparent 100%)'
              }}
              animate={{
                scale: [1.02, 1.08, 1.02],
              }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </div>

          <div className="final-cta-hero" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(1rem, 2.5vh, 2rem)' }}
            >
              {/* Massive impact headline */}
              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: '0.85rem', color: '#e0c184', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.8rem' }}>Ready to start?</p>
                <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.15, fontWeight: 800, letterSpacing: '-0.02em' }}>
                  今日から、<br />
                  <span className="text-gradient-animated" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>作業時間95%削減</span><br />
                  を体感しませんか？
                </h2>
              </div>

              <p style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.7 }}>
                ネタ収集からYMM4出力まで、分断していた工程を<strong style={{ color: '#fff' }}>1つの流れ</strong>に統合。<br />
                まずは無料プランでお試しください。
              </p>

              {/* Giant CTA */}
              <div className="brand-inline-actions home-compact-cta__actions" style={{ justifyContent: 'center' }}>
                <Link className="brand-btn brand-btn--primary" to="/download/" style={{ fontSize: '1.25rem', padding: '1.2rem 3.2rem', gap: '10px' }}>
                  <ArrowRight size={22} />
                  無料で始める
                </Link>
              </div>

              {/* Trust signals in clean grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '0.8rem 2rem', justifyContent: 'center', fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#4CAF50" /> 無料プランあり</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#4CAF50" /> Windows専用</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#4CAF50" /> クレカ不要</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#e0c184" /> 2,400+DL突破</span>
              </div>

              {/* Subtle testimonial snippet for social proof */}
              <div style={{ marginTop: '0.5rem', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', maxWidth: '500px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '-4px', flexShrink: 0 }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(16,17,20,0.9)', backgroundImage: `url(/avatars_real/${i}.png)`, backgroundSize: 'cover', backgroundPosition: 'center', marginLeft: i > 1 ? '-8px' : 0 }} />
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  <strong style={{ color: '#e0c184' }}>2,400+人</strong>のクリエイターが導入済み
                </p>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>

      {/* ━━━[ Floating CTA ]━━━ */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            className="floating-cta floating-cta--nodoka"
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="nodoka-cta-container">
              {/* フワフワ浮かぶフキダシ */}
              <motion.div 
                className="nodoka-speech-bubble"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <p style={{ textAlign: 'center', lineHeight: '1.5', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                  毎日の動画編集お疲れ様です！☕<br/>
                  面倒な作業はツールにお任せして<br/>
                  <strong style={{color: '#00ffcc', textShadow: '0 0 10px rgba(0,255,204,0.4)'}}>約95%も時短</strong>しませんか？♪
                </p>
                <Link className="nodoka-animated-btn" style={{ margin: '0 auto' }} to="/download/">
                  <span className="nodoka-animated-btn__inner">無料で始める</span>
                </Link>
              </motion.div>
              
              {/* 黒枠から解放されたのどかちゃん */}
              <img src="/nodoka/通常.png" alt="案内役：のどか" className="nodoka-freestanding-avatar" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
