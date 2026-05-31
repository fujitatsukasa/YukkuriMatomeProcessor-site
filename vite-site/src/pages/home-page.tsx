import { Link } from 'react-router-dom'
import { PageMeta, Section } from '@/components/ui'
import { PricingCards } from '@/components/PricingCards'
import { media } from '@/data/assets'
import { changeLogUrl, downloadUrl, latestReleaseUrl, legal, newsPosts, siteOrigin, siteSubtitle, siteTitle } from '@/data/site-content'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView as useMotionInView, AnimatePresence } from '@/lib/light-motion'
import { MessageSquare, Smartphone, Users, Download, CheckCircle2, TrendingUp, HelpCircle, Monitor, CreditCard, ArrowRight, Sparkles, Play, FileSearch, PencilLine, Bot, Settings2, Send, BookOpen, BadgeCheck } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const SECTION_HEAD_VARIANTS = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 20 } },
}

const shouldLimitAmbientMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px)').matches

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
    images: ['/product_get_script.webp'],
    charImage: '/nodoka/step1.webp',
    Icon: FileSearch,
  },
  {
    label: 'テンプレート運用',
    sub: '`.ymmp` とフォーマットを動画の型として蓄積',
    desc: 'このソフトの中心は、単発の台本取得ではなくテンプレート運用です。動画ごとの構成、字幕、立ち絵、演出の型を増やしながら、継続投稿向けの運用を作れます。',
    proof: '動画の型を増やして継続投稿しやすい',
    highlights: ['`.ymmp` からフォーマット追加', '既存テンプレートを流用して横展開', '反応集・ショート・解説・独自フォーマットへ寄せやすい'],
    images: ['/product_format_list.webp'],
    charImage: '/nodoka/編集.webp',
    Icon: Settings2,
  },
  {
    label: '台本編集と役割整理',
    sub: 'メインボードで会話テンポと役割を微調整',
    desc: '生成後の台本は、本文を見ながらその場で整形。役割テンプレや感情指定も合わせて触れるので、別画面を往復せずに会話の流れを詰められます。',
    proof: '本文・感情・配役を崩さず同時に詰める',
    highlights: ['不要な文を即削除・差し替え', '役割テンプレで掛け合いを揃えやすい', '感情ボードを見ながらテンポ調整'],
    images: ['/product_edit_script.webp', '/product_board_emotion.webp'],
    charImage: '/nodoka/サブウインドウ.webp',
    Icon: PencilLine,
  },
  {
    label: '13キャラAI台本',
    sub: '役割テンプレと性格プリセットで掛け合い化',
    desc: '集めたネタをそのまま流すのではなく、13キャラ対応のAI台本生成で会話形式へ再構築。役割テンプレ、性格プリセット、補助タグ調整で語り口を揃えられます。',
    proof: '13キャラ対応のAI台本生成',
    highlights: ['ゆっくり霊夢から紲星あかりまで対応', '役割テンプレと性格プリセット', '補助タグで掛け合いの温度感を調整'],
    images: ['/product_ai_script.webp'],
    charImage: '/nodoka/AI.webp',
    Icon: Bot,
  },
  {
    label: 'YMM4前準備',
    sub: 'CSV・キャラ設定・立ち絵パスを前工程で整理',
    desc: 'YMM4に入ってから詰まりやすい準備を前工程へ寄せています。CSVからのプロジェクト作成、キャラクター集保存、立ち絵パス一括変更、読み方監査までまとめて処理できます。',
    proof: 'YMM4に入る前の面倒を前工程で片付ける',
    highlights: ['CSVからプロジェクト作成', 'YMM4キャラクター集の保存', '立ち絵パス一括変更と読み方監査'],
    images: ['/product_keyword_material.webp', '/product_board_emotion.webp'],
    charImage: '/nodoka/サブウインドウ.webp',
    Icon: Send,
  },
  {
    label: 'YouTube分析',
    sub: '検索条件と差分比較で題材選定を補助',
    desc: 'YouTube分析は、動画化するテーマを勘だけで決めないための導線です。検索条件や除外フィルタ、コメント取得、履歴比較、差分レポートまで一画面で追えます。',
    proof: '検索条件・履歴比較・差分レポートまで整理',
    highlights: ['URL一括入力と詳細取得に対応', 'コメント取得で反応の質を確認', 'CSV / TSV / JSON 出力とクォータ管理'],
    images: ['/product_youtube_info.webp'],
    charImage: '/nodoka/step3.webp',
    Icon: TrendingUp,
  },
  {
    label: '内蔵操作ガイド',
    sub: '初回導入から継続運用まで止まりにくい',
    desc: 'どの画面からでも呼び出せる詳細ガイドを内蔵。インストールだけでなく、テンプレート運用やYMM4連携で迷いがちなポイントを制作途中で確認できます。',
    proof: '初見導入でも流れを見失いにくい',
    highlights: ['画面ごとに必要な説明へ飛べる', '問い合わせ前に自己解決しやすい', '継続運用時の手順も見返しやすい'],
    images: ['/product_guide.webp'],
    charImage: '/nodoka/ガイド.webp',
    Icon: BookOpen,
  },
] as const

const socialProofStats = [
  { value: '20+', label: '対応サイト・掲示板', Icon: FileSearch },
  { value: '13', label: 'AI台本対応キャラ', Icon: Users },
  { value: 'YMM4', label: '前準備を一括整理', Icon: Send },
] as const



const timeReduction = {
  manualMinutes: 90,
  productMinutes: 28,
  reductionRate: 69,
} as const

const timeBreakdown = [
  { label: 'ネタ探し', manual: '25分', product: '8分', saved: '約17', desc: '対応サイト取得や履歴比較で候補を絞りやすくする' },
  { label: '台本整理・生成', manual: '20分', product: '7分', saved: '約13', desc: '文章整形、改行補助、役割テンプレで下地を整える' },
  { label: '感情・配役設定', manual: '15分', product: '5分', saved: '約10', desc: '感情分析やプリセットを起点に毎回の入力を減らす' },
  { label: 'YMM4前調整', manual: '30分', product: '8分', saved: '約22', desc: 'CSV生成、キャラ設定保存、立ち絵パス変更を前工程に寄せる' },
] as const

const useCasesData = [
  {
    title: '5ch / 反応集運用',
    body: '複数スレッドやまとめ記事から面白いレスを拾い、掛け合い台本とYMM4前準備まで一直線で進めます。',
    eyebrow: '定番の量産導線',
    metric: '記事取得 → 台本化 → YMM4前準備まで一本化',
    highlights: ['複数スレッドをまとめて比較', '不要レスを除外して会話用に整形', '反応集の定番工程をテンプレート化しやすい'],
    result: '反応集の下書きから編集準備までを継続投稿向けに回しやすい',
    image: '/product_get_script.webp',
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
    image: '/product_board_emotion.webp',
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
    image: '/product_ai_script.webp',
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
    image: '/product_format_list.webp',
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

const trustEvidenceStats = [
  {
    value: '20+',
    label: '対応サイト・掲示板',
    detail: 'あにまん、5ch、ふたばなど、継続投稿で使いやすい定番導線を先に押さえています。',
    Icon: FileSearch,
  },
  {
    value: '13',
    label: 'AI台本対応キャラ',
    detail: 'ゆっくり系から VOICEROID / CeVIO 系まで、掛け合い台本の土台を揃えやすい構成です。',
    Icon: Users,
  },
  {
    value: 'YMM4',
    label: '前準備を一括整理',
    detail: '`.ymmp` 追加、CSV生成、キャラ設定保存、立ち絵パス変更を前工程に集約しています。',
    Icon: Send,
  },
] as const

const trustSpecGroups = [
  {
    title: '現行仕様を基準に案内',
    body: '追加予定と混ぜず、今すぐ使える範囲を主軸に見せています。',
    items: ['テンプレート運用が中心', 'Windows専用 / YMM4前提', '追加予定は別枠で掲載'],
  },
  {
    title: '事前に知っておく条件',
    body: '導入後に詰まりやすいポイントを、購入前に先出ししています。',
    items: ['YouTube分析は API キー設定が必要', 'CSV生成 / YMM4キャラクター集保存に対応', '立ち絵パス一括変更と読み方監査を搭載'],
  },
  {
    title: '契約とサポートの導線',
    body: '判断材料をUIと同じ粒度で整理し、契約後の不安を減らします。',
    items: ['Free → Standard → Pro の使い分けを明記', 'Stripe Checkout / Customer Portal 対応', '2営業日以内を目安に一次回答'],
  },
] as const

const trustDecisionCards = [
  {
    badge: '導入前',
    title: 'Freeで入口確認',
    body: '対応サイト取得、基本編集、YMM4出力まで、自分の制作フローに合うかを先に判断できます。',
    points: ['対応サイト取得', '基本編集', 'YMM4出力の流れ'],
    Icon: Download,
  },
  {
    badge: '継続投稿',
    title: 'Standardで運用を固める',
    body: 'テンプレート運用、台本作成、AI補助、YouTube分析までをまとめて回す主力ラインです。',
    points: ['テンプレート運用', 'AI台本補助', 'YouTube分析'],
    Icon: Settings2,
  },
  {
    badge: '内製化',
    title: 'Proで個別運用まで詰める',
    body: '13キャラAI台本、個別テンプレート、契約期間中サポートまで欲しい運用に向いています。',
    points: ['13キャラAI台本', '個別テンプレート', '契約期間中サポート'],
    Icon: BadgeCheck,
  },
] as const

const publicProofRoutes = [
  {
    eyebrow: 'GUIDE',
    title: '機能と使い方',
    href: '/instructions/',
    body: '導入手順、主要機能、テンプレート運用から YMM4 前準備までの流れを公開しています。',
    meta: '導入前に制作フローを確認',
  },
  {
    eyebrow: 'PRICING',
    title: '料金とプラン差分',
    href: '/purchase/',
    body: 'Free / Standard / Pro の違いを、用途と向いている人まで含めて公開しています。',
    meta: '月額と用途の違いを確認',
  },
  {
    eyebrow: 'FAQ',
    title: 'FAQ',
    href: '/faq/',
    body: '設定、購入、トラブル、導入前提をカテゴリ別に整理して確認できます。',
    meta: '導入前の疑問を短時間で確認',
  },
  {
    eyebrow: 'LEGAL',
    title: '特商法と返金条件',
    href: '/legal/commercial-transactions/',
    body: '事業者情報、価格、支払時期、返金条件を公開しています。',
    meta: `特商法更新 ${legal.meta.legalLastUpdated}`,
  },
  {
    eyebrow: 'RELEASE',
    title: '最新リリース',
    href: latestReleaseUrl,
    external: true,
    body: '配布中の最新版を GitHub Releases で確認できます。',
    meta: '配布物の公開先を確認',
  },
  {
    eyebrow: 'CHANGELOG',
    title: '更新履歴',
    href: changeLogUrl,
    external: true,
    body: '変更内容を GitHub の changelog で追えます。',
    meta: '更新の積み上げを確認',
  },
] as const

const publicNewsEntries = [...newsPosts].reverse().slice(0, 3)

const heroShowcaseScenes = [
  {
    eyebrow: 'STEP 01',
    title: '対応サイト / スレッドから素材を集める',
    body: '反応集や解説の前工程で、ネタ探しと台本の下地づくりを一箇所へ寄せます。',
    caption: '対応サイト 20+ / スレッド処理',
    image: '/product_get_script.webp',
    Icon: FileSearch,
  },
  {
    eyebrow: 'STEP 02',
    title: 'AI台本と役割テンプレで会話を整える',
    body: '13キャラ対応のAI台本、役割テンプレ、性格プリセットで会話の型を作りやすくしています。',
    caption: '13キャラAI / 役割テンプレ',
    image: '/product_ai_script.webp',
    Icon: Bot,
  },
  {
    eyebrow: 'STEP 03',
    title: '編集前に文章整形と読みやすさを揃える',
    body: '文章整形、感情分析、テロップ改行補助を前工程で済ませて、YMM4へ入る前の手戻りを減らします。',
    caption: '文章整形 / 改行補助 / 感情分析',
    image: '/product_edit_script.webp',
    Icon: PencilLine,
  },
] as const

const heroDeliverableChips = [
  '台本ドラフト',
  'AI補助',
  '`.ymmp` 追加',
  'CSV / YMM4前準備',
] as const

const outcomeStories = [
  {
    key: 'reaction',
    tabLabel: '5ch / 反応集',
    eyebrow: 'OUTPUT 01',
    title: '最初の1本を、前工程ごと一本の導線で組み立てやすい',
    body: '反応集や 5ch まとめで、ネタ収集からテンプレ整理、タイトルの叩き台、YMM4 前準備までを一本の制作線として見せます。',
    source: useCasesData[0],
    artifact: '/blog_thumb_2ch_v1.webp',
    artifactLabel: 'FINISH IMAGE',
    artifactTitle: '反応集のサムネと見せ方の叩き台まで、一画面で判断',
    artifactBody: '台本取得だけで終わらせず、タイトル案や見せ方の叩き台まで同じ判断線に乗せます。',
    deliverables: ['記事 URL 一括入力', '台本ドラフト', '`.ymmp` 追加', 'タイトル整理'],
    points: [
      '記事取得 -> 台本化 -> 自動動画作成の一本導線で、前工程のどこで止まるかが見えやすい',
      '複数スレッド比較と自動取得をまとめて見せるので、運用の入口が分かりやすい',
      '最初の1本の流れを掴んだあと、そのまま量産導線へ寄せやすい',
    ],
    metricLabel: '見えるようになること',
    metricValue: '1本目の流れが掴みやすい',
    metricBody: '「結局どう回すソフトか」が一画面で伝わり、導入判断のズレを減らします。',
  },
  {
    key: 'explain',
    tabLabel: '解説 / ショート',
    eyebrow: 'OUTPUT 02',
    title: '掛け合いと場面転換まで、一本の画面で整理しやすい',
    body: '感情、改行、話者、役割テンプレの軸を一箇所で整えることで、解説やショートでも使い回せる掛け合いの下地を作りやすくします。',
    source: useCasesData[1],
    artifact: '/blog_thumb_script_v1.webp',
    artifactLabel: 'STORY SAMPLE',
    artifactTitle: '解説動画の画面密度と掛け合いの型を同時に揃える',
    artifactBody: '誰が喋るか、どこで感情を切り替えるか、どの場面で字幕を折るかを前工程で揃えます。',
    deliverables: ['役割テンプレ', '13キャラAI台本', '感情 / 改行補助', 'YMM4前準備'],
    points: [
      '解説と聞き役の役割を崩さず、掛け合いの型を前工程で揃えやすい',
      'AI 補助だけに頼らず、役割テンプレと感情補助を混ぜて整えられる',
      '編集前に台詞の流れを詰めるので、後から直す違和感を減らせる',
    ],
    metricLabel: '見えるようになること',
    metricValue: '解説と掛け合いの型が揃う',
    metricBody: '感情線と役割を揃えてから編集へ渡せるので、後工程の迷いを減らします。',
  },
  {
    key: 'template',
    tabLabel: 'テンプレ運用',
    eyebrow: 'OUTPUT 03',
    title: '`.ymmp` と CSV で、次のテンプレートへ増やしやすい',
    body: 'このソフトで本当に強いのは、単発の一本より、テンプレと YMM4 前準備の型を増やしながら継続投稿へ繋げられることです。',
    source: useCasesData[3],
    artifact: '/blog_thumb_automation_v1.webp',
    artifactLabel: 'FORMAT EXPANSION',
    artifactTitle: '運用の型を増やして、次の量産導線のみに集中できる',
    artifactBody: '単発の一本で終わらせず、`.ymmp` や CSV を積み上げて次の型へ横展開しやすくします。',
    deliverables: ['`.ymmp` 追加', 'CSV プロジェクト', 'YMM4 設定メモ', '台本蓄積'],
    points: [
      '運用の型を増やしながら、次に作る動画を同じ導線へ寄せられる',
      '既存テンプレートと YMM4 設定の使い回しを前提に、量産時の判断を軽くできる',
      '次の企画に迷わず入れるので、継続投稿の再現性を上げやすい',
    ],
    metricLabel: '見えるようになること',
    metricValue: '1本から次の型へ増やしやすい',
    metricBody: 'テンプレの型を積み上げて回せるので、継続投稿の再現性を作りやすくします。',
  },
] as const

const beforeAfterProofCards = [
  {
    eyebrow: 'BEFORE',
    title: '取得前の材料を、候補のまま一気に集める',
    body: '対応サイトやスレッドごとに散っているネタをまとめて拾い、どこから台本化を始めるかをひと目で決められる状態にします。',
    result: 'URL・候補・ベース台本の土台がそろう',
    image: '/product_get_script.webp',
    audience: '反応集 / 5ch / まとめ向け',
    chips: ['対応サイト 20+', 'スレッド取得', '候補を一覧化'],
    Icon: FileSearch,
  },
  {
    eyebrow: 'STRUCTURED',
    title: '整形後は、読みやすい台本ベースまで持っていく',
    body: 'AI補助、テンプレート、感情や話者の整理を使って、読み上げ用に崩れにくい本文へ寄せます。ここで人が最終判断しやすくなります。',
    result: 'そのまま調整できる台本ベースが残る',
    image: '/product_edit_script.webp',
    audience: '解説 / ショート / 口調調整向け',
    chips: ['AI台本補助', 'テンプレ適用', '感情・話者整理'],
    Icon: PencilLine,
  },
  {
    eyebrow: 'READY FOR YMM4',
    title: 'YMM4に入れる直前までを前工程で整える',
    body: '`.ymmp` 生成、CSV出力、キャラ設定や立ち絵パス変更までを前もって処理し、編集開始時点の散らかりを減らします。',
    result: 'YMM4前準備がそろった状態で次工程へ渡せる',
    image: '/product_format_list.webp',
    audience: '継続運用 / テンプレ量産向け',
    chips: ['`.ymmp` 出力', 'CSV / YMM4前準備', '立ち絵パス変更'],
    Icon: Send,
  },
] as const

const proofJourneyUsecases = [
  {
    title: '反応集向け',
    body: 'スレッド取得からベース台本作成、YMM4前準備までを一本化して、毎回の拾い直しを減らします。',
  },
  {
    title: '解説向け',
    body: '話者・感情・テンプレの整理を先に済ませて、読み上げや修正の判断を軽くします。',
  },
  {
    title: 'ショート向け',
    body: '速報ネタや素材候補を短尺テンプレへ寄せて、初速重視の制作フローに合わせやすくします。',
  },
] as const

const homeStoryChapters = [
  {
    key: 'hero',
    index: '00',
    label: 'Promise',
    title: '前工程をひとつの運用線にまとめる',
    body: 'ヒーローで約束しているのは、ネタ探しからYMM4前準備までを分断させないことです。',
    selector: '.home-compact-hero',
    orbitPrimary: { x: -460, y: -180, scale: 1.05, opacity: 0.2 },
    orbitSecondary: { x: 520, y: -40, scale: 1.12, opacity: 0.16 },
  },
  {
    key: 'usecases',
    index: '01',
    label: 'Outputs',
    title: '成果物の形をユースケース別に切り替える',
    body: '反応集、解説、ショートで何が残るのかを見せ、テンプレ運用の出口を先に理解させます。',
    selector: '.home-compact-usecase-section',
    orbitPrimary: { x: -520, y: 140, scale: 1.1, opacity: 0.18 },
    orbitSecondary: { x: 500, y: 90, scale: 1.02, opacity: 0.14 },
  },
  {
    key: 'proof_journey',
    index: '02',
    label: 'Proof',
    title: '取得前からYMM4前準備までを実画面で追う',
    body: '新しく足した3段証拠で、どこまで整うのかを主張ではなく画面で確認できる状態にしています。',
    selector: '.home-proof-journey-section',
    orbitPrimary: { x: -400, y: 220, scale: 1.14, opacity: 0.22 },
    orbitSecondary: { x: 540, y: 210, scale: 1.08, opacity: 0.15 },
  },
  {
    key: 'template_ops',
    index: '03',
    label: 'System',
    title: 'テンプレ運用を主役にして、工程を一画面で把握する',
    body: '個別機能ではなく、継続投稿のための運用基盤として読むフェーズです。',
    selector: '.home-compact-template-section',
    orbitPrimary: { x: -540, y: 340, scale: 1.16, opacity: 0.18 },
    orbitSecondary: { x: 460, y: 320, scale: 1.18, opacity: 0.16 },
  },
  {
    key: 'pricing',
    index: '04',
    label: 'Decision',
    title: 'Free / Standard / Pro の判断を短い視線で終える',
    body: '価格ではなく導入判断として読ませる章です。ここで無料導線に戻る理由を固めます。',
    selector: '.home-compact-price-section',
    orbitPrimary: { x: -500, y: 420, scale: 1.08, opacity: 0.16 },
    orbitSecondary: { x: 520, y: 420, scale: 1.1, opacity: 0.18 },
  },
  {
    key: 'public_proof',
    index: '05',
    label: 'Public',
    title: '公開情報と最終CTAで安心して着地させる',
    body: '使い方、FAQ、料金、更新履歴まで見える状態で、最後の導線へ渡します。',
    selector: '.home-public-proof-section',
    orbitPrimary: { x: -440, y: 520, scale: 1.02, opacity: 0.14 },
    orbitSecondary: { x: 500, y: 520, scale: 1.14, opacity: 0.16 },
  },
] as const

const operationBoundary = {
  automated: {
    eyebrow: 'SOFTWARE DOES',
    title: 'ソフトが前工程でまとめること',
    body: '素材集め、台本の下地、AI補助、YMM4前準備、改善のための分析までを、ひとつの運用線に寄せています。',
    items: [
      '対応サイト / スレッドから素材と台本の下地を集める',
      '文章整形、感情分析、テロップ改行補助を前工程で回す',
      '`.ymmp`、CSV、キャラ設定、立ち絵パスをまとめて整える',
      'タイトル案、サムネ文案、コメント取得、差分比較まで補助する',
    ],
  },
  human: {
    eyebrow: 'YOU DECIDE',
    title: '最後に人が判断すること',
    body: '最終的な見せ方や公開判断は残しつつ、繰り返し発生する前工程を圧縮する構成です。',
    items: [
      '動画ごとの見せ場、抑揚、例外ケースの扱いを決める',
      'サムネの最終表現や公開文のニュアンスを仕上げる',
      '投稿タイミングや優先順位をチャンネル方針に合わせて選ぶ',
      '反応を見ながら、次のテンプレートにどこを反映するか判断する',
    ],
  },
} as const

const operationStageCards = [
  {
    eyebrow: 'DAY 1',
    title: '最初の1本を通して流れを掴む',
    body: '対応サイト取得、スレッド処理、台本反映、AI補助までを一度通して、自分の制作フローに合うかを短時間で判断できます。',
    points: [
      '記事取得 -> 台本反映 -> 自動動画作成の一括導線',
      'Free で導入相性と初回の流れを確認しやすい',
      '文章整形 / 感情分析 / 改行補助も前工程で触れる',
    ],
    image: '/product_get_script.webp',
    Icon: FileSearch,
  },
  {
    eyebrow: 'TEMPLATE OPS',
    title: '動画の型を増やして継続投稿へ寄せる',
    body: '単発で終わらせず、`.ymmp` 追加、CSVからのプロジェクト作成、キャラ設定保存を積み上げて、チャンネルの型を増やしていけます。',
    points: [
      '`.ymmp` からフォーマット追加して横展開しやすい',
      'YMM4 キャラ設定保存 / 立ち絵パス一括変更まで前工程に寄せる',
      '反応集、5chまとめ、ショート、解説へテンプレートで広げやすい',
    ],
    image: '/product_format_list.webp',
    Icon: Settings2,
  },
  {
    eyebrow: 'OPTIMIZE',
    title: '分析を回して次の投稿へ改善を返す',
    body: 'YouTube 分析、コメント取得、履歴比較、差分レポートまで繋げて、投稿後の改善を次のテンプレートへ戻しやすくしています。',
    points: [
      'URL 一括入力、コメント取得、履歴比較をまとめて扱える',
      'CSV / TSV / JSON 出力で手元の分析や整理にも回しやすい',
      'タイトル案 / サムネ文案と組み合わせて次の企画精度を上げる',
    ],
    image: '/product_youtube_info.webp',
    Icon: TrendingUp,
  },
] as const

const operationOutputChips = [
  '対応サイト 20+',
  'AI台本 13キャラ',
  '`.ymmp` 追加',
  'CSVからプロジェクト作成',
  'YMM4キャラ設定保存',
  '立ち絵パス一括変更',
  'コメント取得',
  '差分比較 / レポート',
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
  'ゆっくりまとめプロセッサーは、対応サイト取得、台本作成、AI補助、YMM4前準備、YouTube分析までまとめて進められるWindows向け動画制作支援ツールです。'

const homePreviewImage = `${siteOrigin}/product_get_script.webp`
const homePreviewScreenshots = [
  `${siteOrigin}/product_get_script.webp`,
  `${siteOrigin}/product_format_list.webp`,
  `${siteOrigin}/product_ai_script.webp`,
]

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
    image: homePreviewImage,
    screenshot: homePreviewScreenshots,
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
  const outcomesRef = useRef<HTMLDivElement>(null)
  const isOutcomesInView = useMotionInView(outcomesRef, { amount: 0.25 })
    
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeHeroScene, setActiveHeroScene] = useState(0)
  const [activeOutcomeStory, setActiveOutcomeStory] = useState(0)
  const [activeOperationStage, setActiveOperationStage] = useState(0)
  const [activeStoryChapter, setActiveStoryChapter] = useState<(typeof homeStoryChapters)[number]['key']>('hero')
  const isAutoPlayingRef = useRef(true)

  // ━━━[ Floating CTA visibility ]━━━
  const [showFloatingCta, setShowFloatingCta] = useState(false)
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)')
    const heroNode = document.querySelector('.home-compact-hero')
    const ctaNode = document.querySelector('.home-compact-cta-section')
    const sectionNodes = [
      '.home-compact-process-section',
      '.home-compact-usecase-section',
      '.home-proof-journey-section',
      '.home-internal-proof-section',
      '.testimonials-section-wrap',
      '.home-compact-price-section',
      '.home-public-proof-section',
      '.home-compact-closing-section',
    ]
      .map((selector) => document.querySelector(selector))
      .filter((node): node is Element => node !== null)
    let frame = 0

    const updateVisibility = () => {
      frame = 0
      if (mobileQuery.matches) {
        setShowFloatingCta(false)
        return
      }

      const heroEnd = heroNode?.getBoundingClientRect()
      const ctaSection = ctaNode?.getBoundingClientRect()

      if (!heroEnd || !ctaSection) {
        setShowFloatingCta(false)
        return
      }

      const viewportHeight = window.innerHeight
      const pastHero = heroEnd.bottom < viewportHeight * 0.28
      const reachedCta = ctaSection.top < viewportHeight * 0.92
      const overlapsContent = sectionNodes.some((node) => {
        const rect = node.getBoundingClientRect()
        return rect.top < viewportHeight * 0.85 && rect.bottom > viewportHeight * 0.15
      })

      setShowFloatingCta(
        pastHero &&
        !reachedCta &&
        !overlapsContent,
      )
    }

    const requestUpdate = () => {
      if (frame) {
        return
      }
      frame = window.requestAnimationFrame(updateVisibility)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    mobileQuery.addEventListener('change', requestUpdate)
    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      mobileQuery.removeEventListener('change', requestUpdate)
    }
  }, [])

  // ━━━[ Auto Carousel Logic ]━━━
  useEffect(() => {
    if (!isAutoPlayingRef.current || !isFlowInView) return
    if (shouldLimitAmbientMotion()) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % presentationSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [activeSlide, isFlowInView])

  useEffect(() => {
    if (shouldLimitAmbientMotion()) return
    const timer = window.setInterval(() => {
      setActiveHeroScene((prev) => (prev + 1) % heroShowcaseScenes.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (shouldLimitAmbientMotion()) return
    const timer = window.setInterval(() => {
      setActiveOperationStage((prev) => (prev + 1) % operationStageCards.length)
    }, 4300)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isOutcomesInView) return
    if (shouldLimitAmbientMotion()) return
    const timer = window.setInterval(() => {
      setActiveOutcomeStory((prev) => (prev + 1) % outcomeStories.length)
    }, 5600)
    return () => window.clearInterval(timer)
  }, [isOutcomesInView])

  useEffect(() => {
    const seenSections = new Set<string>()
    const trackedSections = [
      { selector: '.home-compact-hero', name: 'hero' },
      { selector: '.home-compact-usecase-section', name: 'usecases' },
      { selector: '.home-proof-journey-section', name: 'proof_journey' },
      { selector: '.home-compact-template-section', name: 'template_ops' },
      { selector: '.home-compact-price-section', name: 'pricing' },
      { selector: '.home-public-proof-section', name: 'public_proof' },
      { selector: '.home-compact-cta-section', name: 'final_cta' },
    ] as const

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          const sectionName = entry.target.getAttribute('data-analytics-section')
          if (!sectionName || seenSections.has(sectionName)) {
            return
          }

          seenSections.add(sectionName)
          trackEvent('section_view', {
            page: 'home',
            section: sectionName,
          })
        })
      },
      { threshold: 0.08 },
    )

    trackedSections.forEach(({ selector, name }) => {
      const node = document.querySelector(selector)
      if (!node) {
        return
      }

      node.setAttribute('data-analytics-section', name)
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)')
    const chapterNodes = homeStoryChapters
      .map((chapter) => ({
        chapter,
        node: document.querySelector(chapter.selector),
      }))
      .filter((entry): entry is { chapter: (typeof homeStoryChapters)[number]; node: Element } => entry.node !== null)
    let frame = 0

    const updateActiveChapter = () => {
      frame = 0
      if (mobileQuery.matches) {
        setActiveStoryChapter('hero')
        return
      }

      const anchor = window.innerHeight * 0.32 + 96
      const ranked = chapterNodes
        .map(({ chapter, node }) => {
          const rect = node.getBoundingClientRect()
          const distance =
            rect.top <= anchor && rect.bottom >= anchor
              ? 0
              : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor))

          return { key: chapter.key, distance }
        })
        .sort((a, b) => a.distance - b.distance)

      if (ranked[0]) {
        setActiveStoryChapter(ranked[0].key)
      }
    }

    const requestUpdate = () => {
      if (frame) {
        return
      }
      frame = window.requestAnimationFrame(updateActiveChapter)
    }

    requestUpdate()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    mobileQuery.addEventListener('change', requestUpdate)
    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      mobileQuery.removeEventListener('change', requestUpdate)
    }
  }, [])

  const handleSlideChange = (index: number) => {
    isAutoPlayingRef.current = false
    setActiveSlide(index)
  }

  const trackHomeCta = (placement: string, target: string, label: string) => {
    trackEvent('cta_click', {
      page: 'home',
      placement,
      target,
      label,
    })
  }

  const handleHeroSceneSelect = (index: number) => {
    setActiveHeroScene(index)
    trackEvent('hero_scene_select', {
      page: 'home',
      scene: heroShowcaseScenes[index]?.eyebrow,
      title: heroShowcaseScenes[index]?.title,
    })
  }

  const handleOutcomeStorySelect = (index: number) => {
    setActiveOutcomeStory(index)
    trackEvent('usecase_select', {
      page: 'home',
      usecase: outcomeStories[index]?.key,
      label: outcomeStories[index]?.tabLabel,
    })
  }

  const handleStoryChapterJump = (chapterKey: (typeof homeStoryChapters)[number]['key']) => {
    const chapter = homeStoryChapters.find((item) => item.key === chapterKey)
    if (!chapter) {
      return
    }

    const target = document.querySelector(chapter.selector)
    if (!target) {
      return
    }

    const offsetTop = target.getBoundingClientRect().top + window.scrollY - 108
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    setActiveStoryChapter(chapter.key)
    trackEvent('story_chapter_jump', {
      page: 'home',
      chapter: chapter.key,
      label: chapter.title,
    })
  }

  const activePresentationSlide = presentationSlides[activeSlide]
  const ActiveSlideIcon = activePresentationSlide.Icon
  const activeHeroShowcase = heroShowcaseScenes[activeHeroScene]
  const heroPreviewScenes = heroShowcaseScenes.filter((_, index) => index !== activeHeroScene)
  const activeOutcomePanel = outcomeStories[activeOutcomeStory]
  const ActiveOutcomeIcon = activeOutcomePanel.source.Icon
  const activeStoryChapterMeta =
    homeStoryChapters.find((chapter) => chapter.key === activeStoryChapter) ?? homeStoryChapters[0]
  const activeStoryChapterIndex = homeStoryChapters.findIndex((chapter) => chapter.key === activeStoryChapter)

  return (
    <>
      <PageMeta
        title={`${siteTitle} | YMM4向け動画制作支援ツール`}
        description={homeMetaDescription}
        keywords="YMM4,テンプレート運用,ゆっくり解説,反応集,ショート動画,動画制作支援"
        image={homePreviewImage}
        path="/"
        structuredData={homeStructuredData}
      />
      <div className="home-compact-shell" style={{ position: 'relative' }}>
        <div className="home-story-rail-wrap" aria-label="ホームの章立て">
          <nav className="home-story-rail">
            <div className="home-story-rail__track">
              {homeStoryChapters.map((chapter) => (
                <button
                  key={chapter.key}
                  type="button"
                  className={`home-story-rail__item${chapter.key === activeStoryChapter ? ' is-active' : ''}`}
                  onClick={() => handleStoryChapterJump(chapter.key)}
                  aria-pressed={chapter.key === activeStoryChapter}
                >
                  <span className="home-story-rail__index">{chapter.index}</span>
                  <span className="home-story-rail__label">{chapter.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="home-story-system" aria-hidden="true">
          <motion.div
            className="home-story-orbit home-story-orbit--primary"
            animate={activeStoryChapterMeta.orbitPrimary}
            transition={{ type: 'spring', stiffness: 42, damping: 22, mass: 1.1 }}
          />
          <motion.div
            className="home-story-orbit home-story-orbit--secondary"
            animate={activeStoryChapterMeta.orbitSecondary}
            transition={{ type: 'spring', stiffness: 38, damping: 24, mass: 1.15 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {activeStoryChapter !== 'hero' ? (
            <motion.aside
              key={activeStoryChapterMeta.key}
              className="home-story-banner"
              initial={{ opacity: 0, x: 18, y: -6, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 14, y: -4, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="home-story-banner__eyebrow">
                {activeStoryChapterMeta.index} / {activeStoryChapterMeta.label}
              </span>
              <strong>{activeStoryChapterMeta.title}</strong>
              <p>{activeStoryChapterMeta.body}</p>
              <div className="home-story-banner__meter">
                <motion.span
                  className="home-story-banner__meter-fill"
                  animate={{ scaleX: (activeStoryChapterIndex + 1) / homeStoryChapters.length }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.aside>
          ) : null}
        </AnimatePresence>

        <div className="home-parallax-layer" aria-hidden="true" />
        <section className="home-compact-hero homepage-hero">
          <img
            className="home-compact-hero__media-bg"
            src={media.heroPoster}
            alt=""
            fetchPriority="high"
            decoding="async"
            aria-hidden="true"
          />

          {/* Dark overlay for the static hero media */}
          <div className="hero-media-overlay" aria-hidden="true" />

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
              無料プランあり / ネタ探しから YMM4 前準備まで
            </motion.div>

            {/* ヒーローの一撃を狭くして、何のソフトかを即座に伝える */}
            <motion.h1 
              className="hero-massive-title hero-title-v2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero-title-lead">動画制作の前工程を</span>
              <br />
              <span className="text-glow-gold hero-title-focus">ひとつの運用線</span>
              <span className="hero-title-static">にまとめる</span>
            </motion.h1>

            {/* サブコピー — 説明ではなく導入後の価値に寄せる */}
            <motion.p
              className="hero-subtitle-v2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              対応サイト取得、台本整理、AI補助、`.ymmp` / CSV整理までを一本化。
              <span className="hero-subtitle-v2__sub">無料で導入相性を確認し、必要になった工程だけ有料プランで広げられます。</span>
            </motion.p>

            <div className="hero-value-strip" aria-label="ファーストビューの要点">
              <article>
                <span>できること</span>
                <strong>素材取得からYMM4前準備まで</strong>
              </article>
              <article>
                <span>無料で試す</span>
                <strong>導入相性と基本動作を確認</strong>
              </article>
              <article>
                <span>有料で増える</span>
                <strong>AI補助、分析、個別運用</strong>
              </article>
            </div>

            {/* CTA ボタン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="brand-inline-actions home-compact-hero__actions home-v1-hero__actions hero-cta-row"
            >
              <Link
                className="brand-btn brand-btn--primary hero-cta-primary"
                to="/download/"
                onClick={() => trackHomeCta('hero_primary', '/download/', '無料プランを試す')}
              >
                無料プランを試す
              </Link>
              <Link
                className="brand-btn brand-btn--ghost"
                to="/instructions/"
                style={{ gap: '6px' }}
                onClick={() => trackHomeCta('hero_secondary', '/instructions/', '使い方を見る')}
              >
                <Play size={16} />
                使い方を見る
              </Link>
            </motion.div>

            {/* 製品ショーケース — 下部に配置 */}
            <motion.div
              className="hero-product-showcase"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-live-command-shell">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroShowcase.title}
                    className="hero-live-command"
                    initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                    transition={{ duration: 0.35 }}
                  >
                    <span>{activeHeroShowcase.eyebrow}</span>
                    <strong>{activeHeroShowcase.title}</strong>
                    <p>{activeHeroShowcase.body}</p>
                    <div className="hero-live-command__proof" role="list" aria-label="導入判断の材料">
                      {socialProofStats.map((stat) => (
                        <div key={stat.label} className="hero-live-command__proof-item" role="listitem">
                          <span className="hero-live-command__proof-icon" aria-hidden="true">
                            <stat.Icon size={15} />
                          </span>
                          <strong>{stat.value}</strong>
                          <small>{stat.label}</small>
                        </div>
                      ))}
                    </div>
                    <ul className="hero-live-command__deliverables" role="list" aria-label="このソフトで残る主な成果物">
                      {heroDeliverableChips.map((chip) => (
                        <li key={chip} role="listitem">{chip}</li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                <div className="hero-live-steps" role="tablist" aria-label="ヒーローのライブプレビュー">
                  {heroShowcaseScenes.map((scene, index) => {
                    const SceneIcon = scene.Icon
                    const isActive = index === activeHeroScene
                    return (
                      <button
                        type="button"
                        key={scene.title}
                        className={`hero-live-step${isActive ? ' is-active' : ''}`}
                        onClick={() => handleHeroSceneSelect(index)}
                        aria-pressed={isActive}
                      >
                        <span className="hero-live-step__eyebrow">{scene.eyebrow}</span>
                        <span className="hero-live-step__body">
                          <span className="hero-live-step__icon" aria-hidden="true">
                            <SceneIcon size={16} />
                          </span>
                          <span>
                            <strong>{scene.title}</strong>
                            <small>{scene.caption}</small>
                          </span>
                        </span>
                        <span className="hero-live-step__progress" aria-hidden="true" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="hero-product-tilt-wrap">
                <div className="hero-product-stack hero-product-stack--v2">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeHeroShowcase.image}
                      src={activeHeroShowcase.image}
                      alt={activeHeroShowcase.title}
                      fetchPriority="high"
                      className="hero-product-stack__main hero-product-stack__main--live"
                      initial={{ opacity: 0, scale: 1.03, y: 24 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -24 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </AnimatePresence>

                  {heroPreviewScenes.map((scene, index) => (
                    <img
                      key={scene.title}
                      src={scene.image}
                      alt={scene.title}
                      className={`hero-product-stack__sub hero-product-stack__sub--${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}

                  <div className="hero-product-stack__live-badge" aria-hidden="true">
                    <span>{activeHeroShowcase.caption}</span>
                    <strong>LIVE PREVIEW</strong>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

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
                        src={activePresentationSlide.charImage || '/nodoka/通常.webp'}
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
                      <motion.div
                        className="home-flow-visual-card__scan"
                        aria-hidden="true"
                        initial={{ x: '-35%' }}
                        animate={{ x: '115%' }}
                        transition={{ duration: 1.8, ease: 'easeOut' }}
                      />
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
                        <span className="home-flow-step__progress" aria-hidden="true" />
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
            <img
              src="/bg_speed_master.webp"
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.65, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
              }}
            />
          </div>

          <div className="bg-marquee-container" aria-hidden="true" style={{ zIndex: 0 }}>
            <div className="bg-marquee__track">
              <span>テンプレ運用 - AI補助 - YMM4前準備 - YouTube分析 - 継続投稿の再現性を支援 - </span>
              <span>テンプレ運用 - AI補助 - YMM4前準備 - YouTube分析 - 継続投稿の再現性を支援 - </span>
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
            <p className="brand-kicker" style={{ justifyContent: 'center' }}>モデルケース</p>
            <h2 style={{ textAlign: 'center' }}>前工程を、<span className="text-glow-gold">90分から28分</span>へ整理</h2>
            <p style={{ margin: '0 auto 0.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              テンプレートが整った継続運用を想定した目安です。<br/>
              ネタ探しから YMM4 前準備まで、どこを前工程へ寄せられるかを工程別に見える化しています。
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: 0 }}>※ 反応集 / 解説の前工程を例にしたモデルケースです。編集、書き出し、公開作業は含みません。</p>
          </motion.div>

          <motion.div 
            ref={chartRef}
            className="chart-dashboard" 
            role="img" 
            aria-label="手作業90分とツール活用28分の時間内訳比較"
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
                      <span className="chart-dashboard__kpi-desc">手作業ベースの目安</span>
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
                      <span className="chart-dashboard__kpi-desc">ツール活用時の目安</span>
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
            <img
              src="/bg_usecases_master.webp"
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.55, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
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

          <div
            ref={outcomesRef}
            className="usecase-switcher"
            style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1080px', margin: '0 auto' }}
          >
            <div className="usecase-switcher__tabs" role="tablist" aria-label="成果イメージの切り替え">
              {outcomeStories.map((story, index) => (
                <button
                  key={story.key}
                  type="button"
                  role="tab"
                  aria-selected={activeOutcomeStory === index}
                  className={activeOutcomeStory === index ? 'is-active' : ''}
                  onClick={() => handleOutcomeStorySelect(index)}
                >
                  {story.tabLabel}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeOutcomePanel.key}
                className="usecase-switcher__panel usecase-switcher__panel--story"
                initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="usecase-switcher__content">
                  <div className="usecase-switcher__intro">
                    <span>{activeOutcomePanel.eyebrow}</span>
                    <strong>{activeOutcomePanel.title}</strong>
                    <p>{activeOutcomePanel.body}</p>
                  </div>

                  <div className="usecase-switcher__metric">
                    <span>{activeOutcomePanel.metricLabel}</span>
                    <strong>{activeOutcomePanel.metricValue}</strong>
                    <p>{activeOutcomePanel.metricBody}</p>
                  </div>

                  <div className="usecase-switcher__deliverables" role="list" aria-label="このケースで整えやすい成果物">
                    {activeOutcomePanel.deliverables.map((deliverable) => (
                      <div key={deliverable} role="listitem" className="usecase-switcher__deliverable">
                        <BadgeCheck size={15} />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>

                  <ul className="usecase-switcher__points">
                    {activeOutcomePanel.points.map((point) => (
                      <li key={point}>
                        <span className="usecase-switcher__points-dot" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="usecase-switcher__sample">
                  <span>{activeOutcomePanel.source.eyebrow}</span>
                  <div className="usecase-switcher__sample-head">
                    <div className="usecase-switcher__sample-icon" aria-hidden="true">
                      <ActiveOutcomeIcon size={18} />
                    </div>
                    <div>
                      <strong>{activeOutcomePanel.source.title}</strong>
                      <p>{activeOutcomePanel.source.metric}</p>
                    </div>
                  </div>

                  <div className="usecase-switcher__screen">
                    <img
                      src={activeOutcomePanel.source.image}
                      alt={`${activeOutcomePanel.source.title}の実画面`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <article className="usecase-switcher__artifact">
                    <div className="usecase-switcher__artifact-copy">
                      <span>{activeOutcomePanel.artifactLabel}</span>
                      <strong>{activeOutcomePanel.artifactTitle}</strong>
                      <p>{activeOutcomePanel.artifactBody}</p>
                    </div>
                    <div className="usecase-switcher__artifact-thumb">
                      <img
                        src={activeOutcomePanel.artifact}
                        alt={`${activeOutcomePanel.tabLabel}の成果イメージ`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </article>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Section>



        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />

        <Section className="home-compact-section home-proof-journey-section">
          <motion.div
            className="home-compact-section-head"
            variants={SECTION_HEAD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            style={{ position: 'relative', zIndex: 1, marginBottom: '2.5rem' }}
          >
            <p className="brand-kicker">実画面で見る変化</p>
            <h2>
              取得前の散らばりから
              <span className="text-glow-gold"> YMM4前準備 </span>
              までを
              <span className="text-glow-green">3画面で確認</span>
            </h2>
            <p>
              何がどこまで整うのかを、実際の画面で区切って見せます。LP上で主張するだけでなく、
              取得前→整形後→YMM4前準備後の流れをそのまま追える構成です。
            </p>
          </motion.div>

          <div className="proof-journey-grid">
            {beforeAfterProofCards.map((card, index) => {
              const CardIcon = card.Icon
              return (
                <motion.article
                  key={card.title}
                  className="proof-journey-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="proof-journey-card__visual">
                    <img src={card.image} alt={card.title} loading="lazy" decoding="async" />
                    <span className="proof-journey-card__stage">{card.eyebrow}</span>
                  </div>

                  <div className="proof-journey-card__copy">
                    <div className="proof-journey-card__head">
                      <span className="proof-journey-card__icon" aria-hidden="true">
                        <CardIcon size={16} />
                      </span>
                      <div>
                        <strong>{card.title}</strong>
                        <small>{card.audience}</small>
                      </div>
                    </div>

                    <p>{card.body}</p>

                    <div className="proof-journey-card__chips" role="list" aria-label={`${card.title}の要点`}>
                      {card.chips.map((chip) => (
                        <span key={chip} role="listitem">{chip}</span>
                      ))}
                    </div>

                    <div className="proof-journey-card__result">
                      <span>この段階で残るもの</span>
                      <strong>{card.result}</strong>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="proof-journey-focus" aria-label="ユースケース別の刺さりどころ">
            {proofJourneyUsecases.map((item) => (
              <article key={item.title} className="proof-journey-focus__item">
                <span>{item.title}</span>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="proof-journey-actions">
            <Link
              className="brand-btn brand-btn--primary"
              to="/download/"
              onClick={() => trackHomeCta('proof_journey', '/download/', '無料プランを試す')}
            >
              <ArrowRight size={16} />
              無料プランで画面を確認する
            </Link>
            <Link
              className="brand-btn brand-btn--ghost"
              to="/instructions/"
              onClick={() => trackHomeCta('proof_journey', '/instructions/', '使い方を見る')}
            >
              <Play size={16} />
              手順を先に見る
            </Link>
          </div>
        </Section>

        <Section className="home-compact-section home-compact-template-section">
          <div className="page-bg-bleed">
            <img
              src="/bg_demo_master.webp"
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.55, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
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
                src="/generated/template-ops-studio-v1.webp"
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
                    src="/product_format_list.webp"
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

        <Section className="home-compact-section home-internal-proof-section">
          <motion.div
            className="home-compact-section-head"
            variants={SECTION_HEAD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <p className="brand-kicker">導入後の流れ</p>
            <h2><span className="text-glow-gold">任せる工程</span>と<span className="text-glow-green">自分で仕上げる工程</span>を分けて見せる</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto' }}>
              「全部自動」と見せるより、どこまで前工程をまとめ、どこから自分で握るのかが分かるほうが導入後のズレは減ります。
              1本目、継続投稿、改善の3段で、何を触るソフトなのかを整理しています。
            </p>
          </motion.div>

          <div className="home-internal-proof__stage-nav" role="tablist" aria-label="導入後の流れの段階">
            {operationStageCards.map((card, index) => {
              const isActive = index === activeOperationStage
              return (
                <button
                  type="button"
                  key={card.title}
                  className={`home-internal-proof__stage-tab${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveOperationStage(index)}
                  aria-pressed={isActive}
                >
                  <span>{card.eyebrow}</span>
                  <strong>{card.title}</strong>
                </button>
              )
            })}
          </div>

          <div className="home-v1-proof" style={{ position: 'relative', zIndex: 1, width: 'min(1180px, calc(100% - 48px))', margin: '0 auto' }}>
            <motion.div
              className="home-v1-before-after"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="home-v1-before-after__column home-v1-before-after__column--accent home-internal-proof__column">
                <span>{operationBoundary.automated.eyebrow}</span>
                <strong className="home-internal-proof__column-title">{operationBoundary.automated.title}</strong>
                <p className="home-internal-proof__column-caption">{operationBoundary.automated.body}</p>
                <ul>
                  {operationBoundary.automated.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="home-v1-before-after__divider" aria-hidden="true">
                <span>→</span>
              </div>

              <div className="home-v1-before-after__column home-internal-proof__column">
                <span>{operationBoundary.human.eyebrow}</span>
                <strong className="home-internal-proof__column-title">{operationBoundary.human.title}</strong>
                <p className="home-internal-proof__column-caption">{operationBoundary.human.body}</p>
                <ul>
                  {operationBoundary.human.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="home-v1-proof__notes"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            >
              {operationStageCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  className={`home-v1-proof-card home-internal-proof-card${index === activeOperationStage ? ' is-active' : ''}`}
                  animate={index === activeOperationStage ? { y: -8, scale: 1.01 } : { y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="home-internal-proof-card__top">
                    <div>
                      <span>{card.eyebrow}</span>
                      <h3>{card.title}</h3>
                    </div>
                    <div className="home-internal-proof-card__icon" aria-hidden="true">
                      <card.Icon size={18} />
                    </div>
                  </div>

                  <div className="workflow-visual__screen home-internal-proof-card__screen">
                    <motion.img
                      src={card.image}
                      alt={`${card.title}の実画面`}
                      loading="lazy"
                      decoding="async"
                      animate={index === activeOperationStage ? { scale: 1.035, y: -10 } : { scale: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="home-internal-proof-card__scan"
                      aria-hidden="true"
                      animate={index === activeOperationStage ? { x: ['-45%', '120%'] } : { x: '-45%' }}
                      transition={index === activeOperationStage ? { duration: 1.7, ease: 'easeOut' } : { duration: 0.2 }}
                    />
                  </div>

                  <p>{card.body}</p>

                  <ul className="trust-spec-card__list">
                    {card.points.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={16} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, width: 'min(1180px, calc(100% - 48px))', margin: '1rem auto 0' }}>
            <div className="trust-supported-sites" role="list" aria-label="前工程でまとめて扱える代表要素">
              {operationOutputChips.map((chip) => (
                <span key={chip} role="listitem">{chip}</span>
              ))}
            </div>
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
            <p className="brand-kicker">導入判断</p>
            <h2>誇張より先に、<span className="text-glow-gold">現仕様の証拠</span>を確認</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              画面、契約導線、サポート条件、主な使いどころを先に見せています。<br/>
              導入前に知りたい前提を<strong className="text-glow-gold">一箇所で確認</strong>できます。
            </p>
          </motion.div>

          <div className="trust-layers" style={{ position: 'relative', zIndex: 1 }}>
            <motion.article
              className="trust-layer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="trust-layer__head">
                <span className="trust-layer__eyebrow">実績</span>
                <strong>現在公開している中核機能</strong>
                <p>テンプレート運用、13キャラAI台本、YMM4前準備を、実画面と数値で確認できる構成にしています。</p>
              </div>

              <div className="testimonials-proof-grid">
                <div className="testimonials-proof-visual">
                  <img
                    src="/product_format_list.webp"
                    alt="テンプレート一覧とフォーマット管理の実画面"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="testimonials-proof-visual__overlay">
                    <span>REAL PRODUCT SCREEN</span>
                    <strong>テンプレートを増やしながら、YMM4前準備まで同じ導線で管理できる</strong>
                  </div>
                </div>

                <div className="testimonials-proof-board">
                  <div className="workflow-proof-board__intro">
                    <h3>台本取得だけでなく、前工程の型を増やせる</h3>
                    <p>`.ymmp` 追加、フォーマット管理、CSV生成、立ち絵パス変更までを、ひとつの運用フローに載せています。</p>
                  </div>
                  <div className="testimonials-proof-board__stats">
                    {trustEvidenceStats.map((stat) => (
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
                </div>
              </div>

              <div className="trust-supported-sites" role="list" aria-label="対応サイト例">
                {supportedSiteChips.map((chip) => (
                  <span key={chip} role="listitem">{chip}</span>
                ))}
              </div>
            </motion.article>

            <motion.article
              className="trust-layer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.04, ease: 'easeOut' }}
            >
              <div className="trust-layer__head">
                <span className="trust-layer__eyebrow">仕様</span>
                <strong>導入前に知っておくべき前提</strong>
                <p>制約や連携条件を後出しにせず、現在の公開仕様に寄せて整理しています。</p>
              </div>

              <div className="trust-spec-grid">
                {trustSpecGroups.map((group, index) => (
                  <article key={group.title} className="trust-spec-card">
                    <div className="trust-spec-card__header">
                      <span>{index === 0 ? 'CURRENT' : index === 1 ? 'CONDITION' : 'SUPPORT'}</span>
                      <strong>{group.title}</strong>
                    </div>
                    <p>{group.body}</p>
                    <ul className="trust-spec-card__list">
                      {group.items.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={16} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.article>

            <motion.article
              className="trust-layer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
            >
              <div className="trust-layer__head">
                <span className="trust-layer__eyebrow">導入判断</span>
                <strong>どのラインから始めると無理がないか</strong>
                <p>まず無料で相性確認、次に継続投稿、最後に個別運用という順で判断できるようにしています。</p>
              </div>

              <div className="trust-decision-grid">
                {trustDecisionCards.map((card) => (
                  <article key={card.title} className="trust-decision-card">
                    <div className="trust-decision-card__top">
                      <span className="trust-decision-card__badge">{card.badge}</span>
                      <div className="trust-decision-card__icon" aria-hidden="true">
                        <card.Icon size={18} />
                      </div>
                    </div>
                    <strong>{card.title}</strong>
                    <p>{card.body}</p>
                    <ul className="trust-decision-card__list">
                      {card.points.map((point) => (
                        <li key={point}>
                          <ArrowRight size={16} aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.article>
          </div>
        </Section>

        {/* ━━━[ Section Glow Divider ]━━━ */}
        <div className="section-glow-divider" />

        <Section className="home-compact-section home-compact-price-section">
          {/* Parallax & Animated Section Background */}
          <div className="page-bg-bleed">
            <img
              src="/bg_pricing_master.webp"
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.65, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
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
                src="/generated/pricing-plan-visual-v1.webp"
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
            <img
              src="/bg_faq_master.webp"
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.55, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
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

        <Section className="home-compact-section home-public-proof-section">
          <motion.div
            className="home-compact-section-head home-public-proof-head"
            variants={SECTION_HEAD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
          >
            <p className="brand-kicker">公開情報</p>
            <h2>導入前に、<span className="text-glow-gold">ブラウザ上で確認できる証拠</span>を置いています</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              外部レビューを盛る代わりに、使い方、FAQ、料金、特商法、返金条件、更新履歴、最新リリースを
              事前に辿れる構成にしています。
            </p>
          </motion.div>

          <div className="lp-proofstream" style={{ position: 'relative', zIndex: 1, width: 'min(1180px, calc(100% - 48px))', margin: '0 auto' }}>
            <div className="lp-proofstream__copy">
              <h2>確認可能性をそのまま信用に変える</h2>
              <p>
                「本当に今の仕様なのか」「契約条件はどこまで明記されているか」「更新が止まっていないか」を、
                導入前に自分で確認できるようにしています。
              </p>

              <div className="lp-proofstream__routes">
                {publicProofRoutes.map((route) => (
                  <article key={route.title} className="lp-proofstream__route">
                    <span>{route.eyebrow}</span>
                    <h3>
                      {'external' in route && route.external ? (
                        <a
                          href={route.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => trackHomeCta('public_proof', route.href, route.title)}
                        >
                          {route.title}
                        </a>
                      ) : (
                        <Link
                          to={route.href}
                          onClick={() => trackHomeCta('public_proof', route.href, route.title)}
                        >
                          {route.title}
                        </Link>
                      )}
                    </h3>
                    <p>{route.body}</p>
                    <p className="lp-proofstream__route-meta">{route.meta}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="lp-proofstream__aside">
              <h3>最近の公開更新</h3>
              <ul className="lp-proofstream__news">
                {publicNewsEntries.map((entry) => (
                  <li key={entry.path}>
                    <time dateTime={entry.date}>{entry.dateLabel}</time>
                    <Link to={entry.path}>{entry.title}</Link>
                  </li>
                ))}
              </ul>
              <p className="lp-proofstream__aside-copy">
                特商法 / 利用規約 / 返金ポリシーの最終更新日は <strong>{legal.meta.legalLastUpdated}</strong>、
                プライバシーポリシーは <strong>{legal.meta.privacyLastUpdated}</strong> です。
              </p>
            </aside>
          </div>
        </Section>

        <Section className="home-compact-section home-compact-cta-section home-cta-no-bottom-pad">
          {/* Parallax & Animated Section Background */}
          <div className="page-bg-bleed">
            <img
              src="/bg_cta_master.webp"
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.7, mixBlendMode: 'screen',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%, transparent 100%)'
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
                  <span className="text-gradient-animated" style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}>無料プランで導入を確認</span><br />
                  しませんか？
                </h2>
              </div>

              <p style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: 1.7 }}>
                対応サイト取得、テンプレート運用、AI補助、YMM4前準備が、あなたの制作フローに合うかを<strong style={{ color: '#fff' }}>無料プラン</strong>で先に確認できます。<br />
                継続投稿向けに強い導線かどうかを、実画面ベースで判断してください。
              </p>

              {/* Giant CTA */}
              <div className="brand-inline-actions home-compact-cta__actions" style={{ justifyContent: 'center' }}>
                <Link
                  className="brand-btn brand-btn--primary"
                  to="/download/"
                  style={{ fontSize: '1.25rem', padding: '1.2rem 3.2rem', gap: '10px' }}
                  onClick={() => trackHomeCta('final_cta', '/download/', '無料プランを試す')}
                >
                  <ArrowRight size={22} />
                  無料プランを試す
                </Link>
              </div>

              {/* Trust signals in clean grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '0.8rem 2rem', justifyContent: 'center', fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#4CAF50" /> 無料プランあり</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#4CAF50" /> Windows専用</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#4CAF50" /> Stripe決済</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={16} color="#e0c184" /> 2営業日以内に一次回答</span>
              </div>

              <div style={{ marginTop: '0.5rem', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', maxWidth: '500px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="testimonial-card__icon-shell" style={{ width: 42, height: 42, flexShrink: 0 }}>
                  <FileSearch size={18} />
                </div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  <strong style={{ color: '#e0c184' }}>20+</strong>の対応サイト取得、<strong style={{ color: '#e0c184' }}>13キャラAI台本</strong>、
                  <strong style={{ color: '#e0c184' }}>YMM4前準備</strong>まで無料で相性を確認できます。
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
            className="floating-cta"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="floating-cta__panel">
              <div className="floating-cta__copy">
                <span className="floating-cta__eyebrow">FREE PLAN</span>
                <strong>まずは導入相性を確認</strong>
                <p>対応サイト取得から YMM4 前準備まで、無料で流れを試せます。</p>
              </div>
              <Link
                className="brand-btn brand-btn--primary floating-cta__button"
                to="/download/"
                style={{ gap: '6px' }}
                onClick={() => trackHomeCta('floating_cta', '/download/', '無料プランを試す')}
              >
                無料プランを試す
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
