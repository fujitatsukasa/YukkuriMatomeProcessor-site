import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { downloadUrl, legal, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView as useMotionInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { MessageSquare, Smartphone, Users, Download, Zap, Star } from 'lucide-react'
import { ParticlesBackground } from '@/components/ParticlesBackground'
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
  { label: '台本整理', manual: '35分', product: '2分', desc: '不要なノイズの除去と会話台本形式への一括テキスト変換' },
  { label: 'YMM4前調整', manual: '55分', product: '2分', desc: '立ち絵の表情指定からタイムライン配置への読み込み定義' },
] as const

const useCasesData = [
  {
    title: '5ch/2ch 反応集動画',
    body: '複数スレッドから面白いレスだけを自動抽出し、瞬時に掛け合い台本へ。',
    image: '/product_get_script.png',
    Icon: Users,
  },
  {
    title: 'YouTube ゆっくり解説',
    body: '解説役と聞き役への自動配役と、YMM4での自然な間合い作りをAIで完全支援。',
    image: '/product_board_emotion.png',
    Icon: MessageSquare,
  },
  {
    title: 'TikTok / YouTube Shorts',
    body: '短尺特有のテンポの良い構成を見える化。縦型動画の台本作成にも完全対応。',
    image: '/product_ai_script.png',
    Icon: Smartphone,
  },
  {
    title: '自動化による収益化量産',
    body: '属人性を排除したパイプラインで動画制作を仕組み化。外注からの内製化にも最適。',
    image: '/product_youtube_info.png',
    Icon: Zap,
  },
] as const

const testimonials = [
  {
    quote: "「毎日2時間かかっていた台本制作が、わずか5分で完了するように。浮いた時間で動画の投稿頻度を2倍に増やせました。」",
    author: "登録者15万人 ｜ ゆっくり解説系クリエイター",
    roi: "月間60時間の削減に成功",
  },
  {
    quote: "「外注に頼っていた反応集まとめを内製化できました。コピペ作業の属人性が排除され、完全な自動パイプラインが完成しました。」",
    author: "月間再生数300万回 ｜ 2ch反応集チャンネル運営",
    roi: "外注費 約15万円/月の削減",
  },
  {
    quote: "「YMM4への出力がワンクリックなのが最大の魅力。細かい立ち絵の表情指定も事前にまとめて設定できるためミスが激減しました。」",
    author: "複数チャンネル運営 ｜ ディレクター",
    roi: "修正・確認時間の 80%削減",
  }
]

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
        question: '価格・プランについて教えてください。',
        answer: 'ご自身の利用用途に合わせた月額サブスクリプション制となります。スタンダードプラン（5,500円/月）と、さらに機能が充実したプロプラン（11,000円/月）をご用意しております。制作本数等の従量課金はありません。',
      },
      {
        question: '購入後のアップデートは無料ですか？',
        answer: 'はい、機能追加や不具合修正などのマイナーアップデートは無償でご提供いたします。ツール内から直接最新版をダウンロード可能です。',
      },
    ]
  }
]

const faqItems: FAQItem[] = faqCategories.flatMap(c => c.items)

const closingBadges = ['月額制', 'Windows対応', 'YMM4向け', legal.support.firstResponseSla] as const

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

  const { scrollY } = useScroll()
  // Subtle parallax translation
  const parallaxY = useTransform(scrollY, [0, 8000], [0, 2000])

  const [activeSlide, setActiveSlide] = useState(0)
  const isAutoPlayingRef = useRef(true)

  // ━━━[ Auto Carousel Logic ]━━━
  useEffect(() => {
    if (!isAutoPlayingRef.current || !isFlowInView) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % presentationSlides.length)
    }, 6000)
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

          <ParticlesBackground />

          {/* 120pt Ambient Background */}
          <div className="hero-ambient-vortex">
            <div className="hero-ambient-orb orb-1" />
            <div className="hero-ambient-orb orb-2" />
            <div className="hero-ambient-grid" />
          </div>
          
          <div className="hero-massive-title-container">
            <h1 className="hero-massive-title">
              <span className="text-rotator">
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
          </div>

          <div className="home-compact-hero__layout">
            <div className="home-compact-hero__copy">
              <h2 className="brand-title" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}>
                ネタ収集から出力まで、
                <br />
                <span className="text-gradient-animated">圧倒的時短</span>で動画量産。
              </h2>
              <p className="brand-lead">
                使いたい記事などを集めるだけで、会話台本の編成からYMM4ファイルの書き出しまで全自動化。
                挫折しがちな「単純コピペ作業」から解放され、毎日の動画投稿を徹底アシストします。
              </p>

              <div className="brand-inline-actions home-compact-hero__actions">
                <Link className="brand-btn brand-btn--primary" to="/download/">
                  無料で開始する！
                </Link>
                <Link className="brand-btn brand-btn--ghost" to="/instructions/">
                  使い方を見る
                </Link>
              </div>
              <p className="hero-microcopy">7日間の無料トライアル・クレジットカード不要・即ダウンロード</p>

              <div className="hero-proof-bar" style={{ position: 'relative', zIndex: 1 }}>
                {socialProofStats.map((stat) => (
                  <div key={stat.label} className="hero-proof-bar__item">
                    <span className="hero-proof-bar__icon" aria-hidden="true">
                      <stat.Icon size={18} color="#e0c184" />
                    </span>
                    <span className="hero-proof-bar__value">{stat.value}</span>
                    <span className="hero-proof-bar__label">{stat.label}</span>
                  </div>
                ))}
              </div>

            </div>

            <div className="home-compact-hero__media" style={{ perspective: '1200px' }}>
              <motion.div
                initial={{ opacity: 0, rotateY: 15, rotateX: 5, y: 50 }}
                animate={{ opacity: 1, rotateY: -15, rotateX: 10, y: [0, -15, 0] }}
                transition={{
                  opacity: { duration: 0.8, ease: "easeOut" },
                  rotateY: { duration: 10, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  rotateX: { duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  y: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.8), 0 18px 36px -18px rgba(0,0,0,1), inset 0 0 0 1px rgba(255,255,255,0.2)',
                  overflow: 'hidden',
                  background: '#111',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 3D Glass overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.02) 100%)', zIndex: 2, pointerEvents: 'none' }} />
                
                {/* Real Product Video */}
                <video 
                  src={media.heroEditing} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', zIndex: 1, position: 'relative' }}
                />

                {/* Floating UI Elements for 3D depth */}
                <motion.div 
                   style={{
                     position: 'absolute', bottom: '-20px', right: '-20px', background: 'rgba(20,20,25,0.9)', 
                     backdropFilter: 'blur(10px)', border: '1px solid rgba(224, 193, 132, 0.4)', borderRadius: '12px',
                     padding: '12px 16px', color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', zIndex: 3,
                     boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', gap: '8px',
                     transform: 'translateZ(50px)'
                   }}
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1 }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 10px #4CAF50' }} />
                  AI Automatic Conversion
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        <section className="brand-section brand-section--alt home-compact-section home-presentation-deck" ref={flowRef} style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '0 max(1.5rem, 3vw)', position: 'relative', zIndex: 2 }}>
            
            {/* Header / Dots Navi */}
            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.5rem', gap: '4px' }}>
              <span className="home-section-kicker">全機能紹介</span>
              <h2 className="home-section-title" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', margin: 0 }}>収益化に向けた、<span className="gradient-text gradient-gold">全7プロセス完全網羅</span>。</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, textAlign: 'center' }}>
                当プロセッサーが提供する全ての主要機能をガイドキャラクターの「のどか」がご案内します。
              </p>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {presentationSlides.map((slide, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSlideChange(idx)}
                    style={{
                      height: 5, width: activeSlide === idx ? 48 : 16,
                      background: activeSlide === idx ? '#e0c184' : 'rgba(255,255,255,0.2)',
                      borderRadius: 4, border: 'none', cursor: 'pointer', transition: 'all 0.3s ease'
                    }}
                    title={slide.label}
                  />
                ))}
              </div>
            </div>

            {/* Main Stage */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ flex: '1 1 auto' }}
            >
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: 'flex', flex: '1 1 auto', flexWrap: 'wrap', gap: 'clamp(1rem, 2vw, 2rem)', alignItems: 'stretch' }}
              >
              
              {/* Left: Guide Character & Text */}
              <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={`desc-${activeSlide}`}
                    initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                    transition={{ duration: 0.4 }}
                    style={{ 
                      flex: '0 0 auto',
                      width: '100%', position: 'relative', zIndex: 10,
                      padding: '1.5rem 1.7rem 3.5rem 1.7rem', 
                      display: 'flex', flexDirection: 'column', gap: '0.8rem',
                      filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))',
                    }}
                  >
                    {/* High Quality SVG Speech Bubble Background */}
                    <svg preserveAspectRatio="none" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                      <defs>
                        <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="rgba(20, 25, 35, 0.95)" />
                          <stop offset="100%" stopColor="rgba(8, 10, 15, 0.95)" />
                        </linearGradient>
                        <filter id="glow-edge">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {(() => {
                        // 各スライドごとに、のどかの頭の位置（画像のエフェクトによる重心のズレ）を補正するためのしっぽX座標
                        const tailXMap = [180, 140, 170, 180, 170, 180, 200];
                        const tx = tailXMap[activeSlide] || 200;
                        const pathData = `M20,10 H380 A10,10 0 0,1 390,20 V165 A10,10 0 0,1 380,175 H${tx + 18} L${tx},195 L${tx - 18},175 H20 A10,10 0 0,1 10,165 V20 A10,10 0 0,1 20,10 Z`;
                        
                        return (
                          <path 
                            d={pathData}
                            fill="url(#bubbleGrad)" 
                            stroke="#e0c184" 
                            strokeWidth="1.5" 
                            strokeOpacity="0.8"
                            filter="url(#glow-edge)"
                          />
                        );
                      })()}
                    </svg>

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <span style={{ fontSize: '0.9rem', color: '#e0c184', fontWeight: 700, letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', boxShadow: '0 0 10px #4CAF50' }} />
                        STEP 0{activeSlide + 1}
                      </span>
                      <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0.3rem 0', fontWeight: 800 }}>{presentationSlides[activeSlide]?.label}</h3>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: 0 }}>{presentationSlides[activeSlide]?.desc}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Character */}
                <div style={{ flex: '1 1 auto', position: 'relative', minHeight: 'clamp(250px, 35svh, 400px)', width: '100%', marginTop: '0.5rem' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`char-${activeSlide}`}
                      initial={{ opacity: 0, scale: 0.95, y: 15, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, y: -15, filter: 'blur(3px)' }}
                      transition={{ duration: 0.4 }}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                    >
                      <motion.img 
                        src={presentationSlides[activeSlide]?.charImage || '/nodoka/通常.png'} 
                        alt="Guide Character Nodoka" 
                        animate={{ 
                          scaleY: [1, 1.025, 1],
                          scaleX: [1, 0.985, 1],
                          y: [0, -8, 0]
                        }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain', 
                          objectPosition: 'center bottom', 
                          transformOrigin: 'bottom center',
                          opacity: 0.95, 
                          filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.8))' 
                        }} 
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right: Screenshot Carousel Showcase */}
              <div style={{ flex: '1.5 1 500px', position: 'relative', minHeight: 'clamp(280px, 45svh, 500px)', perspective: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', inset: '1rem 0 3rem 0', width: '100%' }}>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={`slide-${activeSlide}`}
                        initial={{ opacity: 0, y: 100, rotateX: 10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -100, rotateX: -10 }}
                        transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                      >
                      {presentationSlides[activeSlide]?.images.map((imgSrc, imgIndex) => {
                        const isMain = imgIndex === 0;
                        const isYMM4Step = activeSlide === 5; // YMM4出力ステップ
                        return (
                          <motion.div 
                            key={`${activeSlide}-${imgIndex}`}
                            style={{ 
                              position: 'absolute', 
                              inset: 0, 
                              width: presentationSlides[activeSlide]?.images.length > 1 ? (isMain ? '80%' : '70%') : '100%', 
                              height: presentationSlides[activeSlide]?.images.length > 1 ? (isMain ? '100%' : '80%') : '100%', 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: imgIndex,
                            }}
                            initial={imgIndex > 0 ? { x: 80, y: 60, scale: 0.9 } : { x: 0, y: 0, scale: 1 }}
                            animate={imgIndex > 0 ? { x: 120, y: 80, scale: 1.05 } : { x: 0, y: 0, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
                          >
                            <img 
                              src={imgSrc}
                              alt={`${presentationSlides[activeSlide]?.label}の実画面 ${imgIndex + 1}`} 
                              style={{ 
                                width: isYMM4Step ? '100%' : 'auto',
                                height: isYMM4Step ? '100%' : 'auto',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: isYMM4Step ? 'cover' : 'contain', 
                                objectPosition: isYMM4Step ? 'top left' : 'center',
                                borderRadius: '12px',
                                boxShadow: imgIndex > 0 
                                  ? '-15px 30px 60px rgba(0,0,0,0.8), 0 0 20px rgba(224, 193, 132, 0.2)' 
                                  : '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(224, 193, 132, 0.35)',
                                border: '2px solid rgba(224, 193, 132, 0.5)',
                              }}
                            />
                          </motion.div>
                        )
                      })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Prev/Next Hotspots */}
                  <div style={{ position: 'absolute', bottom: '0', right: 0, display: 'flex', gap: '16px', zIndex: 10 }}>
                     <button onClick={() => handleSlideChange((activeSlide - 1 + presentationSlides.length) % presentationSlides.length)} style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&larr;</button>
                     <button onClick={() => handleSlideChange((activeSlide + 1) % presentationSlides.length)} style={{ width: 44, height: 44, borderRadius: 22, background: 'linear-gradient(135deg, #e0c184, #b08d51)', border: 'none', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>&rarr;</button>
                  </div>
              </div>

            </motion.div>
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
              <span>95% TIME REDUCTION FOR YMM4 - PREPARATION REVOLUTION - MASSIVE EFFICIENCY - </span>
              <span>95% TIME REDUCTION FOR YMM4 - PREPARATION REVOLUTION - MASSIVE EFFICIENCY - </span>
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
            <p><strong className="text-glow-muted">95%削減</strong>の根拠を可視化。1本あたり約114分の短縮は、月30本の投稿で<span className="text-glow-gold">約57時間（約15万円分以上の労働価値）</span>に相当します。</p>
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
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </Section>


        <Section alt className="home-compact-section home-compact-usecase-section">
          {/* Parallax & Animated Section Background */}
          <div className="page-bg-bleed">
            <motion.img 
              src="/bg_usecases_master.webp"
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.75, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
              animate={{
                rotateZ: [0, 2, -2, 0],
                scale: [1.08, 1.02, 1.08],
              }}
              transition={{
                duration: 30,
                ease: "linear",
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
            {useCasesData.map((item) => (
              <Tilt
                key={item.title}
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.02}
                style={{ height: '100%' }}
              >
                <article 
                  className="home-compact-usecase-card magnetic-card" 
                  role="listitem"
                  style={{ height: '100%' }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
                  }}
                >
                  <div className="magnetic-spotlight" />
                  <div className="magnetic-border" />
                  <img 
                    className="home-compact-usecase-card__bg-img" 
                    src={item.image}
                    alt={`${item.title}の活用イメージ`}
                    loading="lazy"
                  />
                  <div className="home-compact-usecase-card__overlay" />
                  <div className="home-compact-usecase-card__content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <item.Icon size={20} color="#e0c184" />
                      <h3>{item.title}</h3>
                    </div>
                    <p>{item.body}</p>
                  </div>
                </article>
              </Tilt>
            ))}
          </div>
        </Section>



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
            <p>すでに多くの動画クリエイターが、当プロセッサーにより作業時間を削減し、収益化のスピードを上げています。</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {testimonials.map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="testimonial-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                  <Star size={16} fill="#e0c184" color="#e0c184" />
                  <Star size={16} fill="#e0c184" color="#e0c184" />
                  <Star size={16} fill="#e0c184" color="#e0c184" />
                  <Star size={16} fill="#e0c184" color="#e0c184" />
                  <Star size={16} fill="#e0c184" color="#e0c184" />
                </div>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#f5f1e9', flex: 1, marginBottom: '1.5rem', fontWeight: 500 }}>{t.quote}</p>
                <div style={{ marginTop: 'auto', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem' }}>{t.author}</p>
                  <p style={{ fontSize: '0.95rem', color: '#e0c184', fontWeight: 700 }}>成果: {t.roi}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

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
            <h2>自身の規模に合わせた<span className="text-glow-gold">最適なプランを。</span></h2>
            <p>毎月の外注費用や、ご自身の労働時間と比較してください。<strong>導入初月で投資コストを容易に回収可能</strong>な圧倒的な時間対効果（ROI）を提供します。</p>
          </motion.div>

          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Standard Plan */}
            <InteractiveCard className="home-compact-price-card-rich">
              <div className="home-compact-price-card-rich__top">
                <h3>Standard Plan</h3>
                <div className="home-compact-price-card-rich__price">
                  <strong>月額 5,500円</strong>
                  <span>(税抜 5,000円)</span>
                </div>
                <p>個人クリエイター向け。毎月の制作にかかる膨大な時間を劇的に下げる基本プラン。</p>
              </div>

              <ul className="home-compact-price-card-rich__features" aria-label="搭載機能">
                <li><span className="check-icon">✓</span> AI台本自動コンバート</li>
                <li><span className="check-icon">✓</span> YMM4用タイムライン出力</li>
                <li><span className="check-icon">✓</span> 無償アップデート対応</li>
              </ul>

              <div className="home-compact-price-card-rich__action" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <Link to="/purchase/" className="brand-btn brand-btn--ghost home-compact-price-btn" style={{ justifyContent: 'center' }}>
                  スタンダードで開始する
                </Link>
              </div>
            </InteractiveCard>

            {/* Pro Plan */}
            <InteractiveCard className="home-compact-price-card-rich" style={{ borderColor: 'rgba(224, 193, 132, 0.6)', boxShadow: '0 0 40px rgba(224, 193, 132, 0.15)', transform: 'scale(1.02)' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(135deg, #e0c184, #b08d51)', color: '#000', padding: '4px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                おすすめ・法人向け
              </div>
              <div className="home-compact-price-card-rich__top">
                <h3 style={{ color: '#fff' }}>Pro Plan</h3>
                <div className="home-compact-price-card-rich__price">
                  <strong>月額 11,000円</strong>
                  <span>(税抜 10,000円)</span>
                </div>
                <p>複数チャンネル運営や、完全な自動パイプライン構築を目指すプロ事業者向け。</p>
              </div>

              <ul className="home-compact-price-card-rich__features" aria-label="搭載機能" style={{ marginTop: '1rem' }}>
                <li><span className="check-icon">✓</span> スタンダード版の全機能</li>
                <li><span className="check-icon">✓</span> 複数サイトからのネタ自動収集機能</li>
                <li><span className="check-icon">✓</span> API連携・高度な自動処理対応</li>
                <li><span className="check-icon">✓</span> 優先専用サポート</li>
              </ul>

              <div className="home-compact-price-card-rich__action" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <Link to="/purchase/" className="brand-btn brand-btn--primary home-compact-price-btn" style={{ justifyContent: 'center' }}>
                  プロプランで開始する
                </Link>
                <p className="home-compact-price-card-rich__note" style={{ textAlign: 'center' }}>
                  ※クレジットカード・銀行振込に対応
                </p>
              </div>
            </InteractiveCard>
          </div>
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
                rotateZ: [0, 1, -1, 0]
              }}
              transition={{
                duration: 15,
                ease: "linear",
                repeat: Infinity
              }}
            />
          </div>

          <InteractiveCard className="home-compact-cta-card" style={{ position: 'relative', zIndex: 1 }}>
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
            <p className="hero-microcopy">7日間の無料トライアル・クレジットカード不要・即ダウンロード</p>

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
