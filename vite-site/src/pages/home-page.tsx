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
  productMinutes: 6,
  reductionRate: 95,
} as const

const timeBreakdown = [
  { label: 'ネタ探し', manual: '30分', product: '2分', desc: '複数サイトからの手動コピペを自動収集へと置き換え' },
  { label: '台本整理・生成', manual: '25分', product: '1分', desc: 'ノイズ除去と会話台本形式への一括テキスト変換をAIで自動化' },
  { label: '感情・配役設定', manual: '10分', product: '1分', desc: '立ち絵の表情・声色マッピングをテンプレートで一括適用' },
  { label: 'YMM4前調整', manual: '55分', product: '2分', desc: 'タイムライン配置・読み込み定義を自動出力' },
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
    avatarImg: "/avatars_premium.png",
    avatarPos: "0% 0%",
  },
  {
    quote: "「外注に頼っていた反応集まとめを内製化できました。コピペ作業の属人性が排除され、完全な自動パイプラインが完成しました。」",
    author: "2ch反応集チャンネル運営",
    authorDetail: "月間再生数300万回 ｜ 導入歴4ヶ月",
    roi: "外注費 約15万円/月の削減",
    avatarImg: "/avatars_premium.png",
    avatarPos: "50% 0%",
  },
  {
    quote: "「YMM4への出力がワンクリックなのが最大の魅力。細かい立ち絵の表情指定も事前にまとめて設定できるためミスが激減しました。」",
    author: "複数チャンネル運営ディレクター",
    authorDetail: "3チャンネル同時運営 ｜ 導入歴8ヶ月",
    roi: "修正・確認時間の 80%削減",
    avatarImg: "/avatars_premium.png",
    avatarPos: "100% 0%",
  },
  {
    quote: "「ショート動画を量産するために導入。テンプレートを一度組めば、あとはURLを入れるだけで台本が出来上がるので楽すぎます。」",
    author: "ショート動画特化クリエイター",
    authorDetail: "TikTok フォロワー8万 ｜ 導入歴3ヶ月",
    roi: "月間投稿本数が3倍に",
    avatarImg: "/avatars_premium.png",
    avatarPos: "0% 50%",
  },
  {
    quote: "「副業で始めたゆっくり解説チャンネルが、このツールのおかげで本業の収入を超えました。準備の手間が消えたのが大きいです。」",
    author: "副業系ゆっくりクリエイター",
    authorDetail: "登録者3万人 ｜ 導入歴5ヶ月",
    roi: "副業収入が月20万円を突破",
    avatarImg: "/avatars_premium.png",
    avatarPos: "50% 50%",
  },
  {
    quote: "「法人として複数チャンネルの運用を効率化するために導入。属人化を排除でき、スタッフの教育コストも大幅に削減できました。」",
    author: "動画制作会社 COO",
    authorDetail: "法人5チャンネル運用 ｜ 導入歴10ヶ月",
    roi: "スタッフ教育コスト 70%削減",
    avatarImg: "/avatars_premium.png",
    avatarPos: "100% 50%",
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
  const browserRotateX = useTransform(scrollY, [0, 600], [3, 0])
  const browserScale = useTransform(scrollY, [0, 600], [0.97, 1])

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
                  overflow: 'hidden',
                  minHeight: 'clamp(450px, 60svh, 600px)'
                }}
              >
              
                {/* Left: Guide Character & Text */}
                <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem)', zIndex: 10, position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`desc-${activeSlide}`}
                      initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                    >
                      {/* Character Avatar alongside Title inside the card */}
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ flexShrink: 0, width: '120px', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: '0.5rem' }}>
                          <img 
                            src={presentationSlides[activeSlide]?.charImage || '/nodoka/通常.png'} 
                            alt={`STEP ${activeSlide + 1}: ${presentationSlides[activeSlide]?.label}を案内するガイドキャラクターのどか`}
                            style={{ width: 'auto', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.6))' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <span style={{ fontSize: '1rem', color: '#e0c184', fontWeight: 800, letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 12px #4CAF50' }} />
                            STEP 0{activeSlide + 1}
                          </span>
                          <h3 style={{ fontSize: '2rem', color: '#fff', margin: 0, fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{presentationSlides[activeSlide]?.label}</h3>
                        </div>
                      </div>
                      
                      {/* Description below */}
                      <div style={{ minHeight: '90px' }}>
                        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{presentationSlides[activeSlide]?.desc}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right: Full bleeding Screenshot Area */}
                <div style={{ flex: '1.5 1 500px', position: 'relative', background: 'rgba(0,0,0,0.4)', borderLeft: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`slide-${activeSlide}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    >
                    {presentationSlides[activeSlide]?.images.map((imgSrc, imgIndex) => {
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
                              MaskImage: imgIndex > 0 ? 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0))' : 'none',
                              WebkitMaskImage: imgIndex > 0 ? 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0))' : 'none',
                              transform: imgIndex > 0 ? 'translate(10%, 10%) scale(0.95)' : 'none'
                            }}
                          />
                        </motion.div>
                      )
                    })}
                    </motion.div>
                  </AnimatePresence>

                  {/* Inner Corner Gradient for blending */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26, 25, 30, 0.95) 0%, rgba(26, 25, 30, 0) 15%)', zIndex: 5, pointerEvents: 'none' }} />

                  {/* Prev/Next Hotspots */}
                  <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '16px', zIndex: 10 }}>
                      <button onClick={() => handleSlideChange((activeSlide - 1 + presentationSlides.length) % presentationSlides.length)} style={{ width: 48, height: 48, borderRadius: 24, background: 'rgba(20,18,15,0.7)', border: '1px solid rgba(224,193,132,0.4)', color: '#e0c184', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', transition: 'all 0.2s', fontSize: '1.2rem' }}>&larr;</button>
                      <button onClick={() => handleSlideChange((activeSlide + 1) % presentationSlides.length)} style={{ width: 48, height: 48, borderRadius: 24, background: 'linear-gradient(135deg, #e0c184, #b08d51)', border: 'none', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 8px 24px rgba(224,193,132,0.4)' }}>&rarr;</button>
                  </div>
                </div>

              </div>
              
              {/* Dots Navi relocated to bottom */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {presentationSlides.map((slide, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSlideChange(idx)}
                    style={{
                      height: 6, width: activeSlide === idx ? 48 : 16,
                      background: activeSlide === idx ? '#e0c184' : 'rgba(255,255,255,0.2)',
                      borderRadius: 3, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'
                    }}
                    title={slide.label}
                  />
                ))}
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
            <p className="brand-kicker">圧倒的時短</p>
            <h2>準備時間を、<span className="text-glow-gold">120分から6分</span>へ<span className="text-glow-green">圧倒的短縮</span>。</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              1本あたり約114分の短縮は、月30本の投稿で<span className="text-glow-gold">約57時間</span>に相当。<br/>
              <strong className="text-glow-muted">95%削減</strong>の根拠を、工程ごとの比較データで可視化します。
            </p>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', marginTop: '0.5rem' }}>※ 30分動画1本あたりの準備工程を当社環境にて実測・比較した結果に基づく</p>
          </motion.div>

          <motion.div 
            ref={chartRef}
            className="chart-dashboard" 
            role="img" 
            aria-label="手作業120分と本ツール6分の時間内訳比較"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }}
            viewport={{ once: true, margin: "-10%" }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div className="chart-dashboard__inner">
              {/* ── Hero Stats Row ── */}
              <div className={`chart-dashboard__hero ${isChartInView ? 'is-visible' : ''}`}>
                <div className="chart-dashboard__ring-wrap">
                  <svg className="chart-dashboard__ring" viewBox="0 0 120 120">
                    <circle className="chart-dashboard__ring-bg" cx="60" cy="60" r="52" />
                    <circle
                      className={`chart-dashboard__ring-fill ${isChartInView ? 'is-active' : ''}`}
                      cx="60" cy="60" r="52"
                      style={{ '--ring-pct': `${timeReduction.reductionRate}` } as React.CSSProperties}
                    />
                  </svg>
                  <div className="chart-dashboard__ring-label">
                    <AnimatedNumber value={timeReduction.reductionRate} active={isChartInView} suffix="%" />
                    <span>削減</span>
                  </div>
                </div>

                <div className="chart-dashboard__kpi-group">
                  <div className="chart-dashboard__kpi chart-dashboard__kpi--before">
                    <span className="chart-dashboard__kpi-tag">Before</span>
                    <div className="kpi-giant-wrap">
                      <AnimatedNumber value={timeReduction.manualMinutes} active={isChartInView} />
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
                      <AnimatedNumber value={timeReduction.productMinutes} active={isChartInView} />
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
                    <motion.div
                      key={item.label}
                      className="chart-dashboard__row"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isChartInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                      transition={{ 
                        type: 'spring', 
                        stiffness: 100, 
                        damping: 15,
                        delay: 0.3 + index * 0.15 
                      }}
                      style={{ background: 'rgba(255,255,255,0.08)', padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      <div className="chart-dashboard__row-info">
                        <strong className="chart-dashboard__row-title" style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '8px', display: 'block' }}>{item.label}</strong>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>{item.desc}</p>
                      </div>

                      <div className="chart-dashboard__row-stats">
                        <div className="chart-dashboard__stat-box chart-dashboard__stat-box--manual" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.3)' }}>
                          <small style={{ color: '#fff', opacity: 0.9 }}>手作業</small>
                          <span style={{ fontSize: '1.25rem', color: '#fff' }}>{item.manual}</span>
                        </div>
                        <div className="chart-dashboard__stat-arrow-sm" aria-hidden="true" style={{ color: 'rgba(224,193,132,0.9)' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div className="chart-dashboard__stat-box chart-dashboard__stat-box--product" style={{ background: 'rgba(224,193,132,0.2)', border: '1px solid rgba(224,193,132,0.6)' }}>
                          <small style={{ color: '#e0c184', fontWeight: 'bold' }}>本ツール</small>
                          <span style={{ fontSize: '1.25rem', color: '#fff' }}>{item.product}</span>
                        </div>
                      </div>

                      <div className="chart-dashboard__row-badge">
                        <span className="chart-dashboard__row-saved" style={{ background: '#4CAF50', color: '#fff', fontWeight: 800, padding: '8px 16px', fontSize: '1.15rem', border: '1px solid #66BB6A' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 11V3M4 6l3-3 3 3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {saved}分
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </Section>


        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />

        <Section alt className="home-compact-section home-compact-usecase-section">
          {/* Parallax & Animated Section Background — rotation removed for premium feel */}
          <div className="page-bg-bleed">
            <motion.img 
              src="/bg_usecases_master.webp"
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.55, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
              animate={{
                scale: [1.02, 1.06, 1.02],
              }}
              transition={{
                duration: 25,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </div>

          <motion.div 
            className="home-compact-section-head" 
            variants={SECTION_HEAD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <p className="brand-kicker">対応ジャンル</p>
            <h2><span className="text-glow-green">反応集・ゆっくり解説</span>・ショート動画に対応</h2>
            <p>あらゆる形式の解説・まとめ動画に対応し、スタイルに合わせた最適なフォーマットで出力します。</p>
          </motion.div>

          <div className="home-compact-usecase-grid" role="list" style={{ position: 'relative', zIndex: 1 }}>
            {useCasesData.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                style={{ height: '100%' }}
              >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.02}
                style={{ height: '100%' }}
              >
                <article 
                  className="home-compact-usecase-card--pure magnetic-card" 
                  role="listitem"
                  style={{ 
                    height: '100%', 
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                    padding: 'clamp(2rem, 4vh, 3rem)',
                    borderRadius: '24px',
                    border: `1px solid ${item.iconColor}80`,
                    background: 'rgba(32,30,36,0.95)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 2px ${item.iconColor}`
                    e.currentTarget.style.background = 'rgba(40,38,45,1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = ''
                    e.currentTarget.style.background = 'rgba(32,30,36,0.95)'
                  }}
                >
                  {/* Large icon with glow */}
                  <div style={{ 
                    width: 64, height: 64, borderRadius: '18px', 
                    background: item.gradient, 
                    border: `2px solid ${item.iconColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    marginBottom: '1.5rem',
                    boxShadow: `0 8px 30px ${item.borderColor}`,
                  }}>
                    <item.Icon size={32} color={item.iconColor} strokeWidth={2} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', letterSpacing: '0.02em', lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, flexGrow: 1 }}>{item.body}</p>
                  {/* Subtle gradient glow in corner */}
                  <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '60%', height: '60%', background: `radial-gradient(circle, ${item.borderColor}, transparent 70%)`, opacity: 0.15, pointerEvents: 'none' }} />
                </article>
              </Tilt>
              </motion.div>
            ))}
          </div>
        </Section>



        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />

        <Section alt className="home-compact-section testimonials-section-wrap">
          {/* subtle radial gradient for testimonials */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '120vw', height: '120%', background: 'radial-gradient(ellipse at center, rgba(30,25,18,0.4) 0%, transparent 60%)', transform: 'translate(-50%, -50%)', zIndex: 0 }} />
          
          <motion.div 
            className="home-compact-section-head" 
            variants={SECTION_HEAD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <p className="brand-kicker">お客様の声</p>
            <h2>導入クリエイターの<span className="text-glow-gold">圧倒的成果</span></h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              ジャンルも規模もさまざまなクリエイターが、<br/>
              当プロセッサーで制作フローを<strong className="text-glow-gold">劇的に効率化</strong>しています。
            </p>
          </motion.div>

          {/* Horizontal Scroll Carousel */}
          <div className="testimonials-carousel" style={{ position: 'relative', zIndex: 1, width: '100%', overflow: 'hidden', padding: '1rem 0 2rem' }}>
            <button onClick={() => scrollTestimonials('left')} className="carousel-nav-btn carousel-nav-btn--left" aria-label="左にスクロール">←</button>
            <button onClick={() => scrollTestimonials('right')} className="carousel-nav-btn carousel-nav-btn--right" aria-label="右にスクロール">→</button>

            <div 
              ref={testimonialsRef}
              className="testimonials-carousel__track"
              style={{ display: 'flex', gap: '1.5rem', paddingLeft: 'max(3.5rem, calc((100vw - 1200px) / 2))', paddingRight: '3.5rem', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((t, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="testimonial-card"
                  style={{ minWidth: '360px', maxWidth: '400px', flex: '0 0 auto', scrollSnapAlign: 'start', padding: 'clamp(1.5rem, 3vh, 2.5rem)', gap: '0' }}
                >
                  {/* Star rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1.2rem' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#e0c184" color="#e0c184" />)}
                  </div>
                  {/* Quote */}
                  <p style={{ fontSize: '1.02rem', lineHeight: 1.75, color: 'rgba(245,241,233,0.92)', flex: 1, marginBottom: '1.5rem', fontWeight: 500, letterSpacing: '0.01em' }}>{t.quote}</p>
                  {/* Author with improved layout */}
                  <div style={{ marginTop: 'auto', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Avatar with glow ring */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <div style={{ 
                        width: 52, height: 52, borderRadius: '50%',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 0 20px rgba(224,193,132,0.15)', 
                        border: '2px solid rgba(224,193,132,0.4)',
                        backgroundImage: `url(${t.avatarImg})`, backgroundSize: '300% 200%', backgroundPosition: t.avatarPos 
                      }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: '0.95rem', color: '#f5f1e9', marginBottom: '0.15rem', fontWeight: 700 }}>{t.author}</p>
                      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', marginBottom: '0.3rem' }}>{t.authorDetail}</p>
                      <p style={{ fontSize: '0.88rem', color: '#e0c184', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <TrendingUp size={14} />
                        {t.roi}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="carousel-hint" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', marginTop: '1rem' }}>← スワイプまたは矢印ボタンで閲覧 →</p>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: '0.4rem' }}>※ 利用者の声を元に再構成した内容です</p>
          </div>
        </Section>

        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />

        <Section className="home-compact-section home-compact-price-section">
          {/* Parallax & Animated Section Background */}
          <div className="page-bg-bleed">
            <motion.img 
              src="/bg_pricing_master.webp"
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.65, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
              animate={{
                scale: [1.02, 1.1, 1.02],
                objectPosition: ['50% 50%', '52% 48%', '50% 50%']
              }}
              transition={{
                duration: 25,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
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
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>まずは無料で始めて、必要に応じてアップグレード。<br/>すべてのプランで<strong className="text-glow-muted">基本機能をフル活用</strong>できます。</p>
          </motion.div>

          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Free Plan */}
            <InteractiveCard className="home-compact-price-card-rich" style={{ paddingTop: '2rem' }}>
              <div className="home-compact-price-card-rich__top">
                <h3 style={{ color: '#4CAF50' }}>Free</h3>
                <div className="home-compact-price-card-rich__price">
                  <strong style={{ color: '#4CAF50' }}>¥0</strong>
                  <span>ずっと無料</span>
                </div>
                <p>まずは気軽に体験。基本的な編集・出力機能を無料でお使いいただけます。</p>
              </div>
              <ul className="home-compact-price-card-rich__features" aria-label="搭載機能">
                <li><span className="check-icon">✓</span> 自動動画編集</li>
                <li><span className="check-icon">✓</span> YMM4タイムライン出力</li>
                <li><span className="check-icon">✓</span> ローカル分析</li>
                <li><span className="check-icon">✓</span> 内蔵操作ガイド</li>
                <li><span className="check-icon">✓</span> 無償アップデート</li>
                <li><span className="check-icon" style={{ opacity: 0.3 }}>—</span> <span style={{ opacity: 0.4 }}>高度な台本取得・AI生成</span></li>
              </ul>
              <div className="home-compact-price-card-rich__action" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <Link to="/download/" className="brand-btn brand-btn--ghost home-compact-price-btn" style={{ justifyContent: 'center' }}>
                  無料で始める
                </Link>
              </div>
            </InteractiveCard>

            {/* Standard Plan */}
            <InteractiveCard className="home-compact-price-card-rich" style={{ borderColor: 'rgba(224, 193, 132, 0.6)', boxShadow: '0 0 40px rgba(224, 193, 132, 0.15)', position: 'relative', zIndex: 2, paddingTop: '2rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: 'linear-gradient(135deg, #e0c184, #b08d51)', color: '#000', padding: '6px 20px', borderRadius: '0 0 12px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  🏆 おすすめ
                </div>
              </div>
              <div className="home-compact-price-card-rich__top">
                <h3 style={{ color: '#e0c184' }}>Standard</h3>
                <div className="home-compact-price-card-rich__price">
                  <strong>月額 5,000円</strong>
                  <span>(税込 5,500円)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>1日あたり約183円 — コーヒー1杯以下</p>
                <p>個人クリエイター向け。AI台本生成でさらに制作を加速させる人気プラン。</p>
              </div>
              <ul className="home-compact-price-card-rich__features" aria-label="搭載機能">
                <li><span className="check-icon">✓</span> 自動動画編集・YMM4出力・ローカル分析</li>
                <li><span className="check-icon" style={{ color: '#e0c184' }}>✓</span> <strong>高度な台本取得・AI生成</strong></li>
                <li><span className="check-icon" style={{ color: '#e0c184' }}>✓</span> <strong>高度なYMM4出力設定</strong></li>
                <li><span className="check-icon">✓</span> 無償アップデート</li>
                <li><span className="check-icon" style={{ opacity: 0.3 }}>—</span> <span style={{ opacity: 0.4 }}>優先専用サポート</span></li>
              </ul>
              <div className="home-compact-price-card-rich__action" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <Link to="/purchase/" className="brand-btn brand-btn--primary home-compact-price-btn" style={{ justifyContent: 'center' }}>
                  スタンダードで始める
                </Link>
                <p className="home-compact-price-card-rich__note" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                  クレジットカード・銀行振込に対応
                </p>
              </div>
            </InteractiveCard>

            {/* Pro Plan */}
            <InteractiveCard className="home-compact-price-card-rich" style={{ position: 'relative', paddingTop: '2rem' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '6px 20px', borderRadius: '0 0 12px 12px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.15)', borderTop: 'none' }}>
                  法人・プロ向け
                </div>
              </div>
              <div className="home-compact-price-card-rich__top">
                <h3 style={{ color: '#fff' }}>Pro</h3>
                <div className="home-compact-price-card-rich__price" style={{ whiteSpace: 'nowrap' }}>
                  <strong style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>月額 10,000円</strong>
                  <span style={{ fontSize: '0.85rem', fontWeight: 400, marginLeft: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>(税込 11,000円)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>1日あたり約367円 — 外注費の1/10以下</p>
                <p>複数チャンネル運営や完全自動化を目指すプロ・法人向け。</p>
              </div>
              <ul className="home-compact-price-card-rich__features" aria-label="搭載機能">
                <li><span className="check-icon">✓</span> Standard版の全機能</li>
                <li><span className="check-icon" style={{ color: '#e0c184' }}>✓</span> <strong>複数サイトからのネタ自動収集</strong></li>
                <li><span className="check-icon" style={{ color: '#e0c184' }}>✓</span> <strong>API連携・高度な自動処理</strong></li>
                <li><span className="check-icon" style={{ color: '#e0c184' }}>✓</span> <strong>優先専用サポート</strong></li>
              </ul>
              <div className="home-compact-price-card-rich__action" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <Link to="/purchase/" className="brand-btn brand-btn--ghost home-compact-price-btn" style={{ justifyContent: 'center' }}>
                  プロプランで始める
                </Link>
                <p className="home-compact-price-card-rich__note" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                  クレジットカード・銀行振込に対応
                </p>
              </div>
            </InteractiveCard>
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
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(16,17,20,0.9)', backgroundImage: 'url(/avatars_premium.png)', backgroundSize: '300% 200%', backgroundPosition: `${i * 50}% 0%`, marginLeft: i > 0 ? '-8px' : 0 }} />
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
