import { Link } from 'react-router-dom'
import { PageMeta, Section } from '@/components/ui'
import { PricingCards } from '@/components/PricingCards'
import { media } from '@/data/assets'
import { downloadUrl, legal, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView as useMotionInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { MessageSquare, Smartphone, Users, Download, Zap, Star, CheckCircle2, TrendingUp, HelpCircle, Monitor, CreditCard, ArrowRight, Sparkles, Play, ChevronDown, FileSearch, PencilLine, Bot, Settings2, Send, BookOpen, BadgeCheck } from 'lucide-react'
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
  {
    label: '対応サイト取得',
    sub: 'まとめサイトとスレッドを起点に素材を集約',
    desc: 'あにまん、5ch、ふたばなどの対応元から、動画化したい話題を回収。記事取得から台本反映まで、前工程を途中で切らずに進められます。',
    proof: '20以上の対応サイト・掲示板からネタ収集',
    highlights: ['記事取得から台本反映まで続けやすい', 'スレッドベースで候補比較しやすい', 'ネタ探しのコピペ作業を圧縮'],
    images: ['/product_get_script.png'],
    charImage: '/nodoka/step1.png',
    Icon: FileSearch,
  },
  {
    label: 'テンプレート運用',
    sub: '`.ymmp` とフォーマットを動画の型として蓄積',
    desc: 'このソフトの中心は、単発の台本取得ではなくテンプレート運用です。動画ごとの構成、字幕、立ち絵、演出の型を増やしながら、継続投稿向けの運用を作れます。',
    proof: '動画の型を増やして継続投稿しやすい',
    highlights: ['`.ymmp` からフォーマット追加', '既存テンプレートを流用して横展開', '反応集・ショート・解説・独自フォーマットへ寄せやすい'],
    images: ['/product_format_list.png'],
    charImage: '/nodoka/編集.png',
    Icon: Settings2,
  },
  {
    label: '台本編集と役割整理',
    sub: 'メインボードで会話テンポと役割を微調整',
    desc: '生成後の台本は、本文を見ながらその場で整形。役割テンプレや感情指定も合わせて触れるので、別画面を往復せずに会話の流れを詰められます。',
    proof: '本文・感情・配役を崩さず同時に詰める',
    highlights: ['不要な文を即削除・差し替え', '役割テンプレで掛け合いを揃えやすい', '感情ボードを見ながらテンポ調整'],
    images: ['/product_edit_script.png', '/product_board_emotion.png'],
    charImage: '/nodoka/サブウインドウ.png',
    Icon: PencilLine,
  },
  {
    label: '13キャラAI台本',
    sub: '役割テンプレと性格プリセットで掛け合い化',
    desc: '集めたネタをそのまま流すのではなく、13キャラ対応のAI台本生成で会話形式へ再構築。役割テンプレ、性格プリセット、補助タグ調整で語り口を揃えられます。',
    proof: '13キャラ対応のAI台本生成',
    highlights: ['ゆっくり霊夢から紲星あかりまで対応', '役割テンプレと性格プリセット', '補助タグで掛け合いの温度感を調整'],
    images: ['/product_ai_script.png'],
    charImage: '/nodoka/AI.png',
    Icon: Bot,
  },
  {
    label: 'YMM4前準備',
    sub: 'CSV・キャラ設定・立ち絵パスを前工程で整理',
    desc: 'YMM4に入ってから詰まりやすい準備を前工程へ寄せています。CSVからのプロジェクト作成、キャラクター集保存、立ち絵パス一括変更、読み方監査までまとめて処理できます。',
    proof: 'YMM4に入る前の面倒を前工程で片付ける',
    highlights: ['CSVからプロジェクト作成', 'YMM4キャラクター集の保存', '立ち絵パス一括変更と読み方監査'],
    images: ['/product_keyword_material.png', '/product_board_emotion.png'],
    charImage: '/nodoka/サブウインドウ.png',
    Icon: Send,
  },
  {
    label: 'YouTube分析',
    sub: '検索条件と差分比較で題材選定を補助',
    desc: 'YouTube分析は、動画化するテーマを勘だけで決めないための導線です。検索条件や除外フィルタ、コメント取得、履歴比較、差分レポートまで一画面で追えます。',
    proof: '検索条件・履歴比較・差分レポートまで整理',
    highlights: ['URL一括入力と詳細取得に対応', 'コメント取得で反応の質を確認', 'CSV / TSV / JSON 出力とクォータ管理'],
    images: ['/product_youtube_info.png'],
    charImage: '/nodoka/step3.png',
    Icon: TrendingUp,
  },
  {
    label: '内蔵操作ガイド',
    sub: '初回導入から継続運用まで止まりにくい',
    desc: 'どの画面からでも呼び出せる詳細ガイドを内蔵。インストールだけでなく、テンプレート運用やYMM4連携で迷いがちなポイントを制作途中で確認できます。',
    proof: '初見導入でも流れを見失いにくい',
    highlights: ['画面ごとに必要な説明へ飛べる', '問い合わせ前に自己解決しやすい', '継続運用時の手順も見返しやすい'],
    images: ['/product_guide.png'],
    charImage: '/nodoka/ガイド.png',
    Icon: BookOpen,
  },
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
    title: '5ch / 反応集運用',
    body: '複数スレッドやまとめ記事から面白いレスを拾い、掛け合い台本とYMM4前準備まで一直線で進めます。',
    eyebrow: '定番の量産導線',
    metric: '記事取得 → 台本化 → YMM4前準備まで一本化',
    highlights: ['複数スレッドをまとめて比較', '不要レスを除外して会話用に整形', '反応集の定番工程をテンプレート化しやすい'],
    result: '反応集の下書きから編集準備までを継続投稿向けに回しやすい',
    image: '/product_get_script.png',
    Icon: Users,
    gradient: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(34, 197, 94, 0.05))',
    borderColor: 'rgba(74, 222, 128, 0.3)',
    iconColor: '#4ade80',
  },
  {
    title: 'ゆっくり解説・掛け合い解説',
    body: '解説役と聞き役の役割を分け、テンプレートと感情指定で自然な掛け合いの下地をそろえます。',
    eyebrow: '説明系コンテンツ向け',
    metric: '役割テンプレと感情指定で話し方を揃える',
    highlights: ['聞き役と解説役の役割を分離', '13キャラ対応のAI台本へ繋げやすい', 'YMM4前の調整を先に終えやすい'],
    result: '構成と掛け合いの再現性を上げて、編集前の迷いを削減',
    image: '/product_board_emotion.png',
    Icon: MessageSquare,
    gradient: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(59, 130, 246, 0.05))',
    borderColor: 'rgba(96, 165, 250, 0.3)',
    iconColor: '#60a5fa',
  },
  {
    title: 'ショート動画・縦型テンプレート',
    body: '短尺向けの導入、展開、字幕の型を持たせて、縦型動画の試行回数を増やしやすくします。',
    eyebrow: '短尺量産にも対応',
    metric: '短い構成をテンプレートとして再利用',
    highlights: ['短尺向けの導入と展開を整えやすい', '縦型向けテンポで台本化しやすい', 'ショート用テンプレートを量産導線へ組み込みやすい'],
    result: '短尺の投稿本数を増やしつつ、構成のブレを抑えやすい',
    image: '/product_ai_script.png',
    Icon: Smartphone,
    gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.15), rgba(236, 72, 153, 0.05))',
    borderColor: 'rgba(244, 114, 182, 0.3)',
    iconColor: '#f472b6',
  },
  {
    title: '独自フォーマット・複数運用',
    body: '独自の動画構成や素材ルールをテンプレート化し、複数チャンネルやチーム運用へ横展開しやすくします。',
    eyebrow: '内製化・チーム運用向け',
    metric: '動画の型を増やして複数ラインに展開',
    highlights: ['`.ymmp` 由来の型を増やして運用', '担当者ごとの差を減らしやすい', '外注頼みの前工程を内製へ寄せやすい'],
    result: 'テンプレート運用で継続投稿の再現性を高める',
    image: '/product_format_list.png',
    Icon: Monitor,
    gradient: 'linear-gradient(135deg, rgba(255, 215, 112, 0.15), rgba(224, 193, 132, 0.05))',
    borderColor: 'rgba(255, 215, 112, 0.3)',
    iconColor: '#ffd770',
  },
] as const

const workflowProofStats = [
  { value: '20+', label: '対応サイト・掲示板', detail: 'あにまん、5ch、ふたばなどの既定対応を起点にネタ探しを短縮', Icon: FileSearch },
  { value: '13', label: 'AI台本対応キャラ', detail: 'ゆっくり系から VOICEROID / CeVIO 系まで掛け合い化を補助', Icon: Users },
  { value: 'YMM4', label: '前準備を一括整理', detail: '`.ymmp` 追加、CSV生成、キャラ設定保存、立ち絵パス変更を前工程へ集約', Icon: Send },
] as const

const workflowPillars = [
  {
    title: 'テンプレート運用が主役',
    body: '単発の台本取得ではなく、動画の型を持って継続投稿を回す設計です。',
    points: ['`.ymmp` からフォーマット追加', '既存テンプレートを複製して横展開'],
  },
  {
    title: 'YMM4に入る前の面倒を前工程へ',
    body: 'YMM4を開いてからの調整ではなく、編集前準備をまとめて済ませやすくしています。',
    points: ['CSVからプロジェクト作成', 'YMM4キャラクター集保存と立ち絵パス一括変更'],
  },
  {
    title: 'AI補助は掛け合い品質の再現に使う',
    body: '文章整形、感情分析、改行補助、13キャラ台本で、語り口のばらつきを抑えます。',
    points: ['役割テンプレと性格プリセット', 'タイトル案・サムネ文案の提案'],
  },
  {
    title: '分析で次の一本を決めやすい',
    body: '検索条件、除外フィルタ、コメント取得、履歴比較でテーマ選定を勘任せにしません。',
    points: ['URL一括入力と差分レポート', 'CSV / TSV / JSON 出力とクォータ管理'],
  },
] as const

const supportedSiteChips = [
  'あにまん',
  'あにまん掲示板',
  '5ch',
  'ふたば',
  'あにこ便',
  'サカサカ10',
  'なんJスタジアム',
  'GANDAM.LOG',
  'わんこーる速報',
  'キニ速',
] as const

const testimonials = [
  {
    badge: 'ゆっくり解説',
    quote: "「毎日2時間かかっていた台本制作が、わずか5分で完了するように。浮いた時間で動画の投稿頻度を2倍に増やせました。」",
    author: "ゆっくり解説系クリエイター",
    authorDetail: "登録者15万人 ｜ 導入歴6ヶ月",
    roi: "月間60時間の削減に成功",
    avatarImg: "/avatars_real/1.png",
  },
  {
    badge: '反応集量産',
    quote: "「外注に頼っていた反応集まとめを内製化できました。コピペ作業の属人性が排除され、完全な自動パイプラインが完成しました。」",
    author: "2ch反応集チャンネル運営",
    authorDetail: "月間再生数300万回 ｜ 導入歴4ヶ月",
    roi: "外注費 約15万円/月の削減",
    avatarImg: "/avatars_real/2.png",
  },
  {
    badge: '複数運用',
    quote: "「YMM4への出力がワンクリックなのが最大の魅力。細かい立ち絵の表情指定も事前にまとめて設定できるためミスが激減しました。」",
    author: "複数チャンネル運営ディレクター",
    authorDetail: "3チャンネル同時運営 ｜ 導入歴8ヶ月",
    roi: "修正・確認時間の 80%削減",
    avatarImg: "/avatars_real/3.png",
  },
  {
    badge: 'ショート量産',
    quote: "「ショート動画を量産するために導入。テンプレートを一度組めば、あとはURLを入れるだけで台本が出来上がるので楽すぎます。」",
    author: "ショート動画特化クリエイター",
    authorDetail: "TikTok フォロワー8万 ｜ 導入歴3ヶ月",
    roi: "月間投稿本数が3倍に",
    avatarImg: "/avatars_real/4.png",
  },
  {
    badge: '副業拡大',
    quote: "「副業で始めたゆっくり解説チャンネルが、このツールのおかげで本業の収入を超えました。準備の手間が消えたのが大きいです。」",
    author: "副業系ゆっくりクリエイター",
    authorDetail: "登録者3万人 ｜ 導入歴5ヶ月",
    roi: "副業収入が月20万円を突破",
    avatarImg: "/avatars_real/5.png",
  },
  {
    badge: 'チーム運用',
    quote: "「法人として複数チャンネルの運用を効率化するために導入。属人化を排除でき、スタッフの教育コストも大幅に削減できました。」",
    author: "動画制作会社 COO",
    authorDetail: "法人5チャンネル運用 ｜ 導入歴10ヶ月",
    roi: "スタッフ教育コスト 70%削減",
    avatarImg: "/avatars_real/6.png",
  },
]

const testimonialProofStats = [
  { value: '2倍', label: '投稿頻度を伸ばしたケース', detail: '制作時間を短縮して配信本数へ再投資', Icon: TrendingUp },
  { value: '15万円', label: '外注費削減の実例', detail: '反応集の内製化で月額コストを圧縮', Icon: CreditCard },
  { value: '80%', label: '修正・確認時間の削減', detail: '複数チャンネル運用でも確認工数を軽量化', Icon: Zap },
] as const

const pricingDecisionPoints = [
  {
    title: 'Freeで初回導入を確認',
    body: 'まずは対応サイト取得、基本編集、YMM4出力の流れを見て、自分の制作フローに合うかを入口で判断できます。',
  },
  {
    title: 'Standardで継続投稿を回す',
    body: 'テンプレート運用、台本作成、AI補助、YouTube分析までまとめて回し、個人の継続投稿ラインを安定させる主力です。',
  },
  {
    title: 'Proで内製化と相談導線を強化',
    body: '13キャラAI台本、個別テンプレート、動画内容の相談、契約期間中サポートまで欲しいなら最上位が向いています。',
  },
] as const

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
  'テンプレート運用を軸に、対応サイト取得、台本作成、AI補助、YMM4前準備、YouTube分析までまとめて進められる動画制作支援ツール。'

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

  const activePresentationSlide = presentationSlides[activeSlide]
  const ActiveSlideIcon = activePresentationSlide.Icon


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

          {/* Dark overlay to mask SAAS watermark in video */}
          <div className="hero-video-overlay" aria-hidden="true" />

          {/* Refined ambient background */}
          <div className="hero-ambient-vortex">
            <div className="hero-ambient-orb orb-1" />
            <div className="hero-ambient-orb orb-2" />
            <div className="hero-ambient-orb orb-3" />
          </div>
          
          {/* ── Hero: Centered Stage — title DOMINATES ── */}
          <div className="hero-center-stage" style={{ position: 'relative', zIndex: 1 }}>
            {/* 無料強調バッジ */}
            <motion.div
              className="hero-badge-pill"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sparkles size={14} color="#e0c184" />
              ずっと無料で使えるAI動画制作ツール
            </motion.div>

            {/* 巨大タイトル — 画面の主役 */}
            <motion.h1 
              className="hero-massive-title hero-title-v2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-rotator" style={{ display: 'inline-block' }}>
                <span className="text-rotator__inner">
                  <span className="text-glow-green">【反応集】</span>
                  <span className="text-glow-gold">【ゆっくり解説】</span>
                  <span className="text-glow-blue">【ショート動画】</span>
                  <span className="text-glow-green" aria-hidden="true">【反応集】</span>
                </span>
              </span>
              <br />
              <span className="hero-title-static">の面倒な作業をゼロに</span>
            </motion.h1>

            {/* サブコピー — ベネフィット訴求 */}
            <motion.p
              className="hero-subtitle-v2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              毎回2時間かかる台本作業を、<strong className="text-glow-gold" style={{ fontWeight: 700 }}>たった5分</strong>で完了。
              <span className="hero-subtitle-v2__sub">ネタ収集からYMM4出力まで手作業の95%をAIで自動化</span>
            </motion.p>

            {/* 対応環境バー — ヒーロー内に統合 */}
            <motion.div
              className="hero-compat-inline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              <div className="hero-compat-inline__item">
                <Monitor size={15} />
                <span>Windows 10 / 11</span>
              </div>
              <div className="hero-compat-inline__sep" />
              <div className="hero-compat-inline__item">
                <Sparkles size={15} color="#e0c184" />
                <span>YMM4 完全対応</span>
              </div>
              <div className="hero-compat-inline__sep" />
              <div className="hero-compat-inline__item">
                <Sparkles size={15} color="#e0c184" />
                <span>AI台本生成</span>
              </div>
              <div className="hero-compat-inline__sep" />
              <div className="hero-compat-inline__item">
                <Download size={15} />
                <span>オフライン動作</span>
              </div>
            </motion.div>

            {/* CTA ボタン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="brand-inline-actions home-compact-hero__actions hero-cta-row"
            >
              <Link className="brand-btn brand-btn--primary hero-cta-primary" to="/download/">
                無料で始める
              </Link>
              <Link className="brand-btn brand-btn--ghost" to="/instructions/" style={{ gap: '6px' }}>
                <Play size={16} />
                使い方を見る
              </Link>
            </motion.div>

            {/* Social Proof — 大きく目立つバー */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="hero-proof-bar hero-proof-bar--v2"
            >
              {socialProofStats.map((stat) => (
                <div key={stat.label} className="hero-proof-bar__item">
                  <span className="hero-proof-bar__icon" aria-hidden="true">
                    <stat.Icon size={20} color="#e0c184" />
                  </span>
                  <span className="hero-proof-bar__value">{stat.value}</span>
                  <span className="hero-proof-bar__label">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* 製品ショーケース — 下部に配置 */}
            <motion.div
              className="hero-product-showcase"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt
                tiltMaxAngleX={3}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.08}
                glareColor="#e0c184"
                glarePosition="all"
                glareBorderRadius="16px"
                perspective={1200}
                className="hero-product-tilt-wrap"
              >
                <div className="hero-product-stack hero-product-stack--v2">
                  <img
                    src="/product_get_script.png"
                    alt="台本取得画面"
                    fetchPriority="high"
                    className="hero-product-stack__main"
                  />
                  <img
                    src="/product_ai_script.png"
                    alt="AI台本自動生成画面"
                    className="hero-product-stack__sub hero-product-stack__sub--1"
                  />
                  <img
                    src="/product_edit_script.png"
                    alt="台本編集画面"
                    className="hero-product-stack__sub hero-product-stack__sub--2"
                  />
                </div>
              </Tilt>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="hero-scroll-hint"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={22} color="rgba(255,255,255,0.35)" />
            </motion.div>
          </motion.div>

        </section>

        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />


        <section className="brand-section brand-section--alt home-compact-section home-presentation-deck" ref={flowRef}>
          <div className="home-flow-shell">
            <motion.div
              className="home-flow-head"
              variants={SECTION_HEAD_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <p className="brand-kicker" style={{ margin: 0, justifyContent: 'center' }}>全機能紹介</p>
              <h2 style={{ margin: 0 }}>台本取得だけで終わらない、<span className="text-glow-gold">継続運用の7機能</span>を<span className="text-glow-green">一画面で把握</span></h2>
              <p>
                現仕様で強く出せるのは、対応サイト取得、テンプレート運用、AI補助、YMM4前準備、YouTube分析までの一続きの運用です。
                工程・実画面・効能が同時に伝わるよう、台本取得ツールではなく継続投稿向けの運用基盤として見せています。
              </p>
              <div className="home-flow-head__chips" role="list" aria-label="制作フローの特徴">
                <span role="listitem">テンプレート運用を主役にした構成</span>
                <span role="listitem">YMM4に入る前の準備をまとめて整理</span>
                <span role="listitem">初心者でも流れを追いやすい内蔵ガイド付き</span>
              </div>
            </motion.div>

            <motion.div
              className="home-flow-stage"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${activeSlide}`}
                  className="home-flow-stage__copy"
                  initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="home-flow-stage__eyebrow">
                    <span className="home-flow-stage__step">STEP 0{activeSlide + 1}</span>
                    <span className="home-flow-stage__proof">{activePresentationSlide.proof}</span>
                  </div>

                  <div className="home-flow-stage__title">
                    <div className="home-flow-stage__icon" aria-hidden="true">
                      <ActiveSlideIcon size={22} />
                    </div>
                    <div>
                      <p>{activePresentationSlide.sub}</p>
                      <h3>{activePresentationSlide.label}</h3>
                    </div>
                  </div>

                  <p className="home-flow-stage__desc">{activePresentationSlide.desc}</p>

                  <ul className="home-flow-stage__highlights">
                    {activePresentationSlide.highlights.map((highlight) => (
                      <li key={highlight}>
                        <BadgeCheck size={16} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="home-flow-stage__guide">
                    <div className="home-flow-stage__guide-avatar">
                      <img
                        src={activePresentationSlide.charImage || '/nodoka/通常.png'}
                        alt={`STEP ${activeSlide + 1}: ${activePresentationSlide.label}を案内するガイドキャラクターのどか`}
                      />
                    </div>
                    <div>
                      <strong>操作が止まりにくい導線</strong>
                      <p>今の工程で何が終わるのか、次にどこを触るのかを短く示し、初見でも流れを見失いにくくしています。</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="home-flow-stage__visual">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`visual-${activeSlide}`}
                    className="home-flow-visual-card"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <div className="home-flow-visual-card__topline">
                      <span>PRODUCT SCREEN</span>
                      <strong>{activePresentationSlide.proof}</strong>
                    </div>
                    <div className="home-flow-visual-card__screen">
                      {activePresentationSlide.images.map((imgSrc, imgIndex) => (
                        <motion.div
                          key={`${activeSlide}-${imgIndex}`}
                          className={`home-flow-visual-card__shot${imgIndex > 0 ? ' is-secondary' : ''}`}
                          initial={{ opacity: 0, y: imgIndex > 0 ? 20 : 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.08 * imgIndex, duration: 0.35 }}
                        >
                          <img
                            src={imgSrc}
                            alt={`${activePresentationSlide.label}の実画面 ${imgIndex + 1}`}
                            loading="lazy"
                            decoding="async"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="home-flow-stage__nav" role="tablist" aria-label="制作フローのステップ一覧">
                  {presentationSlides.map((slide, idx) => {
                    const SlideIcon = slide.Icon
                    const isActive = idx === activeSlide
                    return (
                      <button
                        type="button"
                        key={slide.label}
                        className={`home-flow-step${isActive ? ' is-active' : ''}`}
                        onClick={() => handleSlideChange(idx)}
                        aria-pressed={isActive}
                        title={slide.label}
                      >
                        <span className="home-flow-step__count">0{idx + 1}</span>
                        <span className="home-flow-step__body">
                          <span className="home-flow-step__icon" aria-hidden="true">
                            <SlideIcon size={16} />
                          </span>
                          <span>
                            <strong>{slide.label}</strong>
                            <small>{slide.sub}</small>
                          </span>
                        </span>
                      </button>
                    )
                  })}
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
            style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '1.5rem' }}
          >
            <p className="brand-kicker" style={{ justifyContent: 'center' }}>圧倒的時短</p>
            <h2 style={{ textAlign: 'center' }}>準備時間を、<span className="text-glow-gold">120分から1分</span>へ<span className="text-glow-green">圧倒的短縮</span></h2>
            <p style={{ margin: '0 auto 0.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              1本あたり約119分の短縮は、月30本の投稿で<span className="text-glow-gold">約60時間</span>に相当。<br/>
              <strong className="text-glow-muted">99%削減</strong>の根拠を、工程ごとの比較データで可視化します。
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: 0 }}>※ 30分動画1本あたりの準備工程を当社環境にて実測・比較した結果に基づく</p>
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
              {/* ── Hero Stats Row (Symmetrical) ── */}
              <div className={`chart-dashboard__hero ${isChartInView ? 'is-visible' : ''}`}>
                <div className="chart-dashboard__kpi-group">
                  <div className="chart-dashboard__kpi chart-dashboard__kpi--before">
                    <span className="chart-dashboard__kpi-tag">Before</span>
                    <div className="kpi-giant-wrap">
                      <AnimatedNumber value={timeReduction.manualMinutes} active={isChartInView} />
                      <small>分</small>
                    </div>
                    <span className="chart-dashboard__kpi-desc">手作業による準備</span>
                  </div>

                  {/* Ring acting as the central arrow */}
                  <div className="chart-dashboard__ring-wrap" style={{ margin: '0 -0.5rem', zIndex: 2 }}>
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
                          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 11V3M4 6l3-3 3 3" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {item.saved}分
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
            style={{ position: 'relative', zIndex: 1, marginBottom: '2.5rem' }}
          >
            <p className="brand-kicker">対応ジャンル</p>
            <h2><span className="text-glow-green">反応集・ゆっくり解説</span>・ショート動画へ展開しやすい</h2>
            <p>どんな動画でもと言い切るより、テンプレート次第で多様な動画形式へ寄せやすいのが正確です。実際の運用イメージごとに、どこが効くかを整理しています。</p>
          </motion.div>

          <div className="home-compact-usecase-grid" role="list" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            {useCasesData.map((item, idx) => (
              <motion.article
                key={item.title}
                className="home-usecase-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                role="listitem"
                style={{
                  '--usecase-accent': item.iconColor,
                  '--usecase-border': item.borderColor,
                  '--usecase-gradient': item.gradient,
                } as React.CSSProperties}
              >
                <div className="home-usecase-card__media">
                  <img
                    src={item.image}
                    alt={`${item.title}の実画面イメージ`}
                    className="home-usecase-card__image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="home-usecase-card__veil" aria-hidden="true" />
                  <div className="home-usecase-card__badge">
                    <item.Icon size={16} color={item.iconColor} strokeWidth={2} />
                    <span>{item.eyebrow}</span>
                  </div>
                  <div className="home-usecase-card__metric">{item.metric}</div>
                </div>

                <div className="home-usecase-card__body">
                  <div className="home-usecase-card__title-row">
                    <div className="home-usecase-card__icon" aria-hidden="true">
                      <item.Icon size={24} color={item.iconColor} strokeWidth={2} />
                    </div>
                    <div>
                      <span>{item.eyebrow}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <p>{item.body}</p>
                  <ul className="home-usecase-card__highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>
                        <span className="home-usecase-card__highlights-dot" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="home-usecase-card__result">
                    <strong>向いている運用</strong>
                    <span>{item.result}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>



        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />

        <Section className="home-compact-section home-compact-template-section">
          <div className="page-bg-bleed">
            <motion.img
              src="/bg_demo_master.webp"
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.55, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
              animate={{
                scale: [1.03, 1.08, 1.03],
                objectPosition: ['50% 50%', '52% 48%', '50% 50%'],
              }}
              transition={{
                duration: 24,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </div>

          <motion.div
            className="home-compact-section-head"
            variants={SECTION_HEAD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            style={{ position: 'relative', zIndex: 1, marginBottom: '2.5rem' }}
          >
            <p className="brand-kicker">運用の中核</p>
            <h2>台本取得より強いのは、<span className="text-glow-gold">テンプレート運用</span>と<span className="text-glow-green">YMM4前準備</span></h2>
            <p>
              実機能ベースで強く出せるのは、動画の型を持って継続運用しやすいことです。
              現仕様の強みだけに絞り、どこが本当に工夫されているかを一段深く見せています。
            </p>
          </motion.div>

          <div className="workflow-proof-grid" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              className="workflow-proof-visual"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src="/generated/template-ops-studio-v1.png"
                alt="テンプレート運用、AI補助、YMM4前準備、分析を一つのワークフローへまとめたプレミアムなスタジオビジュアル"
                loading="lazy"
                decoding="async"
              />
              <div className="workflow-proof-visual__overlay">
                <span>TEMPLATE OPS</span>
                <strong>動画の型を増やしながら、AI補助とYMM4前準備を一つの運用へまとめる</strong>
              </div>
            </motion.div>

            <motion.div
              className="workflow-proof-board"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="workflow-proof-board__intro">
                <h3>現仕様で前面に出せる強みだけを整理</h3>
                <p>
                  反応集、5chまとめ、ショート、解説、独自フォーマットへ横展開しやすい理由は、
                  テンプレート運用とYMM4編集準備を前工程に寄せているからです。
                </p>
              </div>

              <div className="testimonials-proof-board__stats">
                {workflowProofStats.map((stat) => (
                  <article key={stat.label} className="testimonials-proof-stat">
                    <div className="testimonials-proof-stat__icon" aria-hidden="true">
                      <stat.Icon size={18} />
                    </div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    <p>{stat.detail}</p>
                  </article>
                ))}
              </div>

              <div className="workflow-proof-pillars">
                {workflowPillars.map((pillar) => (
                  <article key={pillar.title} className="workflow-proof-pillar">
                    <strong>{pillar.title}</strong>
                    <p>{pillar.body}</p>
                    <ul className="workflow-proof-pillar__points">
                      {pillar.points.map((point) => (
                        <li key={point}>
                          <BadgeCheck size={15} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="workflow-proof-board__mini">
                <div className="workflow-proof-board__mini-screen">
                  <img
                    src="/product_format_list.png"
                    alt=".ymmp からフォーマット追加を行う実画面"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="workflow-proof-board__mini-copy">
                  <strong>`.ymmp`、CSV、YMM4キャラ設定をまとめて動画の型へ落とし込める</strong>
                  <p>
                    実画面でもフォーマット追加とカテゴリ管理を確認できます。
                    ここがあるから、単発の取得ではなく継続運用の仕組みとして価値が立ちます。
                  </p>
                </div>
              </div>

              <div className="workflow-proof-board__chips" role="list" aria-label="代表的な対応サイト">
                {supportedSiteChips.map((chip) => (
                  <span key={chip} role="listitem">{chip}</span>
                ))}
              </div>
            </motion.div>
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

          <div className="testimonials-proof-grid" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              className="testimonials-proof-visual"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src="/generated/testimonials-creator-studio-v1.png"
                alt="夜のクリエイターワークスペース。複数モニターで編集画面と制作ダッシュボードを開いた様子"
                loading="lazy"
                decoding="async"
              />
              <div className="testimonials-proof-visual__overlay">
                <span>CREATOR WORKFLOW</span>
                <strong>制作ラインを止めずに、投稿本数と品質の両立を狙える運用へ</strong>
              </div>
            </motion.div>

            <motion.div
              className="testimonials-proof-board"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="testimonials-proof-board__stats">
                {testimonialProofStats.map((stat) => (
                  <article key={stat.label} className="testimonials-proof-stat">
                    <div className="testimonials-proof-stat__icon" aria-hidden="true">
                      <stat.Icon size={18} />
                    </div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                    <p>{stat.detail}</p>
                  </article>
                ))}
              </div>

              <div className="testimonials-proof-board__quote">
                <div className="testimonials-proof-board__stars" aria-hidden="true">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#e0c184" color="#e0c184" />)}
                </div>
                <p>
                  「外注に頼っていた反応集まとめを内製化できました。コピペ作業の属人性が排除され、
                  完全な自動パイプラインが完成しました。」
                </p>
                <div>
                  <strong>2ch反応集チャンネル運営</strong>
                  <span>月間再生数300万回 ｜ 導入歴4ヶ月</span>
                </div>
              </div>

              <div className="testimonials-proof-board__chips" role="list" aria-label="導入されている運用例">
                <span role="listitem">反応集量産</span>
                <span role="listitem">ゆっくり解説</span>
                <span role="listitem">ショート量産</span>
                <span role="listitem">複数チャンネル運用</span>
              </div>
            </motion.div>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="testimonials-carousel" style={{ position: 'relative', zIndex: 1, width: '100%', overflow: 'visible', padding: '1rem 0 2rem' }}>
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '1.2rem' }}>
                    <span className="testimonial-card__badge">{t.badge}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#e0c184" color="#e0c184" />)}
                    </div>
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
                        backgroundImage: `url(${t.avatarImg})`, backgroundSize: 'cover', backgroundPosition: 'center' 
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
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>まずは無料で始めて、必要に応じてアップグレード。<br/>基本導線を確認しながら、継続運用向け機能を段階的に広げられます。</p>
          </motion.div>

          <div className="pricing-decision-panel" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              className="pricing-decision-panel__visual"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src="/generated/pricing-plan-visual-v1.png"
                alt="3つのプラン階層をイメージしたダークトーンのプレミアムな比較ビジュアル"
                loading="lazy"
                decoding="async"
              />
              <div className="pricing-decision-panel__visual-copy">
                <span>PLAN DECISION</span>
                <strong>無料検証から量産運用、内製化まで一段ずつ引き上げられる料金設計</strong>
              </div>
            </motion.div>

            <motion.div
              className="pricing-decision-panel__content"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="pricing-decision-panel__intro">
                <h3>迷いにくい選び方を先に提示</h3>
                <p>
                  価格だけではなく、初回導入、継続投稿、個別テンプレートや相談までの
                  使い分けを先に見せて、比較の迷いを減らしています。
                </p>
              </div>

              <div className="pricing-decision-panel__steps">
                {pricingDecisionPoints.map((point, index) => (
                  <article key={point.title} className="pricing-decision-step">
                    <span className="pricing-decision-step__index">0{index + 1}</span>
                    <div>
                      <strong>{point.title}</strong>
                      <p>{point.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>

          <PricingCards />
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
                ネタ探し、テンプレート運用、AI補助、YMM4前準備まで、分断していた工程を<strong style={{ color: '#fff' }}>1つの流れ</strong>に統合。<br />
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
            <div className="floating-cta__mobile-dock">
              <div className="floating-cta__mobile-copy">
                <span>無料プランあり</span>
                <strong>テンプレ運用とYMM4準備を時短</strong>
              </div>
              <Link className="brand-btn brand-btn--primary floating-cta__mobile-btn" to="/download/">
                無料で始める
              </Link>
            </div>
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
