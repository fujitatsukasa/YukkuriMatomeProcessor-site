import { Link } from 'react-router-dom'
import { PageMeta } from '@/components/ui'
import { downloadUrl, legal, siteOrigin, siteTitle } from '@/data/site-content'
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Download,
  FileSearch,
  HelpCircle,
  Monitor,
  PencilLine,
} from 'lucide-react'

const painCards = [
  {
    title: 'ネタ探しと候補整理で止まる',
    body: '5chスレ、まとめ記事、参考動画を行き来しているうちに、制作前の調査だけで時間が溶けていく。',
  },
  {
    title: '台本化のコピペ整形が重い',
    body: '不要行を消し、発話を分け、読み上げ向けに整える作業が毎回バラバラになりやすい。',
  },
  {
    title: '素材確認とYMM4前準備が散らかる',
    body: '画像候補、キーワード、保存先、CSV/.ymmp準備を別々に進めるほど、確認漏れが起きやすい。',
  },
] as const

const deliverableCards = [
  {
    label: '作れるもの 01',
    title: '読み上げ台本の下地',
    body: '5chスレ・まとめ記事のURLから本文候補を拾い、ゆっくり反応集で使う掛け合い台本へ整理します。',
    image: '/product_edit_script.webp',
    alt: '読み上げ台本の下地を編集する実アプリ画面',
    points: ['本文候補', '役割', '感情'],
  },
  {
    label: '作れるもの 02',
    title: '素材候補とサムネ候補',
    body: '画像候補、キーワード素材、YouTube情報を同じ流れで確認し、素材探しの起点を作ります。',
    image: '/product_keyword_material.webp',
    alt: '素材候補とキーワード素材を確認する実アプリ画面',
    points: ['画像候補', 'キーワード', 'YouTube情報'],
  },
  {
    label: '作れるもの 03',
    title: 'CSV / .ymmp前準備',
    body: 'YMM4で仕上げる前に、台本形式、保存先、素材パス、CSV/.ymmp前準備を確認できます。',
    image: '/product_format_list.webp',
    alt: 'CSVとymmp前準備の形式を確認する実アプリ画面',
    points: ['CSV', '.ymmp前準備', '保存先'],
  },
] as const

const valueCards = [
  {
    title: 'URL起点で制作を始める',
    body: '記事URL・スレッドURLから候補を取得し、使う題材だけを選んで前工程へ進めます。',
    Icon: FileSearch,
  },
  {
    title: '台本編集を前倒しする',
    body: 'YMM4を開く前に、役割、感情、不要行を整理し、読み上げ台本の下地を整えます。',
    Icon: PencilLine,
  },
  {
    title: '素材確認を同じ流れに集約',
    body: '画像候補、キーワード素材、YouTube情報を確認し、素材探しの往復を減らします。',
    Icon: Monitor,
  },
  {
    title: 'Freeで試してから判断',
    body: '無料で流れを確認し、投稿本数を増やしたい段階でPremiumの制限解除を検討できます。',
    Icon: CreditCard,
  },
] as const

const workflowSteps = [
  {
    step: '1',
    title: 'URLを入れる',
    body: '5chスレ、あにまん、まとめ記事などのURLを入力し、動画化候補を一覧で確認します。',
    image: '/product_get_script.webp',
    alt: '記事URLから候補を取得する実アプリ画面',
    Icon: FileSearch,
  },
  {
    step: '2',
    title: '台本下地を整える',
    body: '不要行、役割、感情、読み上げ向けの区切りを見ながら、AI台本補助で使える下書きに寄せます。',
    image: '/product_edit_script.webp',
    alt: '台本を編集してYMM4向けに整える実アプリ画面',
    Icon: PencilLine,
  },
  {
    step: '3',
    title: 'YMM4前準備を確認する',
    body: 'CSV、.ymmp前準備、キャラ設定、立ち絵パス、保存先を確認してからYMM4で仕上げます。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4前準備と素材整理の実アプリ画面',
    Icon: Monitor,
  },
] as const

const beforeAfterRows = [
  { work: 'ネタ探し', before: 'サイトや参考情報を別々に確認', after: 'URLから候補を取得して選択' },
  { work: '台本化', before: 'コピペ後に手作業で整形', after: '読み上げ台本の下地を作成' },
  { work: '不要行・役割整理', before: '目視で削除しながら発話を整理', after: '編集画面で役割・感情まで確認' },
  { work: '素材探し', before: '別タブで画像やキーワードを検索', after: '画像候補・キーワード素材を確認' },
  { work: 'YMM4前準備', before: 'CSVや素材パスを個別に整理', after: 'CSV/.ymmp前準備と保存先を確認' },
] as const

const scopeCards = [
  {
    title: 'このソフトで短縮すること',
    body: 'URL取得、題材選択、台本下地、AI台本補助、素材候補確認、CSV/.ymmp前準備までを支援します。',
  },
  {
    title: 'YMM4で仕上げること',
    body: '最終的な音声、字幕、立ち絵、間合い調整、完成動画の書き出しはYMM4側で行います。',
  },
  {
    title: '投稿前に確認すること',
    body: '生成内容、引用、著作権、各サイトや投稿プラットフォームの規約は、投稿前に必ず確認してください。',
  },
] as const

const planCards = [
  {
    name: 'Free',
    price: '¥0',
    title: 'まず無料で動作確認',
    body: '対応URLの取得、台本編集、YMM4前準備の流れが自分の制作手順に合うか確認できます。',
    cta: '無料でダウンロード',
    href: downloadUrl,
    external: true,
  },
  {
    name: 'Premium',
    price: '¥39,800',
    title: '買い切りで制限解除',
    body: '台本取得とAI台本生成の利用制限を解除します。月額自動更新はありません。',
    cta: '料金を見る',
    href: '/purchase/',
    external: false,
  },
] as const

const faqPreview = [
  {
    question: '完成動画まで自動で作れますか？',
    answer: 'いいえ。YMM4で仕上げる前の下準備を効率化するツールです。',
  },
  {
    question: 'YMM4は必要ですか？',
    answer: 'はい。仕上げにはYMM4を使用します。音声、字幕、立ち絵、間合い、書き出しはYMM4側で調整してください。',
  },
  {
    question: 'Premiumで何が解除されますか？',
    answer: '台本取得とAI台本生成の利用制限を解除します。購入はアプリ内のStripe Checkoutから行います。',
  },
] as const

const finalRouteCards = [
  {
    title: '配布物を確認',
    body: '最新版インストーラー、ポータブルZIP、ファイル情報、初回起動、導入完了チェックを確認します。',
    href: '/download/',
    Icon: Download,
  },
  {
    title: '使い方を見る',
    body: '自分のURLで試す前に、設定と操作手順を順番に確認します。',
    href: '/instructions/',
    Icon: PencilLine,
  },
] as const

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteTitle,
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows 10, Windows 11',
  url: `${siteOrigin}/`,
  downloadUrl: `${siteOrigin}/download/`,
  description:
    '5chスレ・まとめ記事のURLから、反応集の台本下地、素材候補、CSV、.ymmp、YMM4前準備を整えるWindows向け制作支援ツールです。',
  offers: {
    '@type': 'Offer',
    price: legal.pricing.unitPrice,
    priceCurrency: legal.pricing.currency,
    availability: 'https://schema.org/InStock',
  },
  publisher: {
    '@type': 'Organization',
    name: legal.organization.legalName,
    url: siteOrigin,
  },
}

export function HomePage() {
  return (
    <>
      <PageMeta
        title="ゆっくりまとめプロセッサー｜反応集の下準備をURLからYMM4前準備まで"
        description="5chスレ・まとめ記事のURLから、反応集の台本下地、AI台本補助、素材候補、CSV/.ymmp前準備までを効率化。YMM4で仕上げる前の面倒な下準備を短縮できるWindowsソフトです。無料プランあり。"
        keywords="ゆっくりまとめプロセッサー,YMM4,台本作成,CSV,.ymmp,反応集,5ch,あにまん,ゆっくり解説"
        path="/"
        structuredData={softwareApplicationLd}
      />

      <div className="home-focus">
        <section className="home-focus-hero" aria-labelledby="home-focus-heading">
          <div className="home-focus-hero__copy">
            <h1 id="home-focus-heading">
              <span>反応集の下準備を、</span>
              <span>URLから</span>
              <span>YMM4前準備まで。</span>
            </h1>
            <p className="home-focus-hero__statement">
              5chスレ・まとめ記事から、台本下地・素材確認・CSV/.ymmp前準備を短縮。
            </p>
            <p className="home-focus-lead">
              完成動画はYMM4で仕上げる前提。ゆっくりまとめプロセッサーは、
              YMM4に入る前の台本化・素材確認・出力準備だけを速くする制作支援ツールです。
            </p>

            <div className="home-focus-actions">
              <a className="home-focus-btn home-focus-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download size={18} />
                無料でダウンロード
              </a>
            </div>

          </div>

          <figure className="home-focus-visual">
            <div className="home-focus-visual__bar" aria-hidden="true">
              <span>実アプリ画面</span>
              <strong>URL入力 → 候補選択 → 台本下地 → CSV/.ymmp前準備</strong>
            </div>
            <img
              src="/product_get_script.webp"
              alt="記事URLから台本候補を取得する実アプリ画面"
              loading="eager"
              decoding="async"
            />
            <figcaption>
              <strong>取得候補を選ぶ画面</strong>
              <span>URL起点で台本下地、素材確認、YMM4前準備へ進みます</span>
            </figcaption>
          </figure>

        </section>

        <section className="home-focus-section home-focus-pain" aria-labelledby="home-pain-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">制作前に疲れる作業</p>
            <h2 id="home-pain-heading">反応集制作、毎回この下準備に時間を取られていませんか？</h2>
            <p>
              投稿本数を増やしたいのに、YMM4を開く前の調査、台本化、素材整理で手が止まる。
              その前工程をURL起点でひとつの流れにまとめます。
            </p>
          </div>
          <div className="home-focus-pain__grid">
            {painCards.map((item) => (
              <article key={item.title} className="home-focus-pain-card">
                <span aria-hidden="true">!</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-focus-io home-focus-io--deliverables" aria-labelledby="home-io-heading">
          <div className="home-focus-section__head home-focus-section__head--left">
            <p className="home-focus-kicker">何が作れるか</p>
            <h2 id="home-io-heading">URLから、YMM4で仕上げる前の準備をまとめて進める</h2>
            <p>
              文章だけで説明しません。実アプリ画面で、台本下地、素材候補、CSV/.ymmp前準備を先に見せます。
            </p>
          </div>
          <div className="home-focus-io__grid">
            {deliverableCards.map((item) => (
              <article key={item.label} className="home-focus-io__card">
                <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 size={15} />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="home-focus-section home-focus-value" aria-labelledby="home-value-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">制作ペースを上げる土台</p>
            <h2 id="home-value-heading">YMM4での仕上げと投稿に集中できる前工程へ</h2>
            <p>
              台本が作れるだけではなく、ネタ選定、素材確認、出力準備までを同じ導線に集めることで、
              反応集制作の立ち上がりを速くします。
            </p>
          </div>
          <div className="home-focus-value__grid">
            {valueCards.map((item) => {
              const ValueIcon = item.Icon
              return (
                <article key={item.title} className="home-focus-value-card">
                  <span aria-hidden="true">
                    <ValueIcon size={18} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="home-focus-section" aria-labelledby="home-flow-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">実画面で流れを見る</p>
            <h2 id="home-flow-heading">URLを入れて、選んで、YMM4で仕上げるだけ</h2>
            <p>
              下準備はソフトで短縮し、完成動画の品質調整はYMM4で行う。役割を分けることで、作業範囲がはっきりします。
            </p>
          </div>

          <div className="home-focus-screen-grid">
            {workflowSteps.map((step) => {
              const StepIcon = step.Icon
              return (
                <article key={step.step} className="home-focus-screen-card">
                  <img src={step.image} alt={step.alt} loading="eager" decoding="async" />
                  <div>
                    <span>
                      <StepIcon size={16} />
                      STEP {step.step}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="home-focus-section home-focus-beforeafter" aria-labelledby="home-beforeafter-heading">
          <div className="home-focus-section__head home-focus-section__head--left">
            <p className="home-focus-kicker">Before / After</p>
            <h2 id="home-beforeafter-heading">手作業でバラバラだった前準備を、URL起点で一気に</h2>
            <p>
              実測値を盛らずに、制作フローの変化を正直に見せます。短縮するのは、完成動画ではなくYMM4へ入る前の準備です。
            </p>
          </div>
          <div className="home-focus-comparison" role="region" aria-label="手作業とツール使用後の比較" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">作業</th>
                  <th scope="col">手作業の場合</th>
                  <th scope="col">ツール使用後</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfterRows.map((row) => (
                  <tr key={row.work}>
                    <th scope="row">{row.work}</th>
                    <td>{row.before}</td>
                    <td>{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="home-focus-section home-focus-scope" aria-labelledby="home-scope-heading">
          <div className="home-focus-section__head">
            <p className="home-focus-kicker">対応範囲</p>
            <h2 id="home-scope-heading">完成動画まで自動生成するソフトではありません</h2>
            <p>
              ここを曖昧にしないことで、導入後の期待値ズレを防ぎます。
              ゆっくりまとめプロセッサーは、YMM4で動画を仕上げる前の準備作業を短縮する制作支援ツールです。
            </p>
          </div>
          <div className="home-focus-scope__grid">
            {scopeCards.map((item) => (
              <article key={item.title} className="home-focus-scope-card">
                <CheckCircle2 size={18} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-focus-section home-focus-section--decision" aria-labelledby="home-decision-heading">
          <div className="home-focus-section__head home-focus-section__head--left">
            <p className="home-focus-kicker">料金と前提確認</p>
            <h2 id="home-decision-heading">Freeで試して、必要になったら買い切りPremiumへ</h2>
            <p>
              先に無料で起動、URL取得、台本下地、YMM4前準備の流れを確認できます。
              Premiumでは台本取得とAI台本生成の利用制限を解除します。
            </p>
          </div>

          <div className="home-focus-plans">
            {planCards.map((plan) => (
              <article key={plan.name} className={`home-focus-plan home-focus-plan--${plan.name.toLowerCase()}`}>
                <span>{plan.name}</span>
                <strong>{plan.price}</strong>
                <h3>{plan.title}</h3>
                <p>{plan.body}</p>
                {plan.external ? (
                  <a href={plan.href} target="_blank" rel="noopener noreferrer">
                    {plan.cta}
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <Link to={plan.href}>
                    {plan.cta}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </article>
            ))}
          </div>

          <aside className="home-focus-faq" aria-labelledby="home-faq-heading">
            <div className="home-focus-faq__head">
              <HelpCircle size={18} />
              <h2 id="home-faq-heading">導入前の確認</h2>
            </div>
            {faqPreview.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
            <Link to="/faq/">
              FAQを見る
              <ArrowRight size={16} />
            </Link>
          </aside>
        </section>

        <section className="home-focus-final" aria-labelledby="home-final-heading">
          <div className="home-focus-final__copy">
            <p className="home-focus-kicker">まずは無料で確認</p>
            <h2 id="home-final-heading">反応集制作の下準備を、今日から短縮しませんか？</h2>
            <p>
              ネタ探し、台本化、素材確認、YMM4前準備に時間を取られているなら、
              まずはFree版で実際の作業感を確認してください。
            </p>
          </div>

          <div className="home-focus-final__routes" aria-label="次に確認するページ">
            {finalRouteCards.map((route) => {
              const RouteIcon = route.Icon
              return (
                <Link key={route.title} to={route.href}>
                  <span aria-hidden="true">
                    <RouteIcon size={17} />
                  </span>
                  <strong>{route.title}</strong>
                  <small>{route.body}</small>
                </Link>
              )
            })}
          </div>

          <div className="home-focus-actions">
            <a className="home-focus-btn home-focus-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download size={18} />
              無料でダウンロード
            </a>
            <Link className="home-focus-btn home-focus-btn--ghost" to="/purchase/">
              <CreditCard size={18} />
              料金を見る
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
