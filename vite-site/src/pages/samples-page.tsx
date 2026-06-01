import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { downloadUrl } from '@/data/site-content'
import { ArrowRight, BadgeCheck, Download, FileText, MonitorPlay, Sparkles } from 'lucide-react'

const screenGallery = [
  {
    title: 'URL入力から記事候補を取得',
    body: '対応サイトやスレッドURLを入れ、動画化する候補を一覧で確認します。',
    image: '/product_get_script.webp',
    alt: 'URL入力から記事候補を取得する実アプリ画面',
    tags: ['URL取得', '候補比較', '対応サイト'],
  },
  {
    title: '台本下地を編集する',
    body: '不要行を削り、役割、感情、読み上げ向けの文量を見ながら整えます。',
    image: '/product_edit_script.webp',
    alt: '取得した台本下地を編集する実アプリ画面',
    tags: ['台本編集', '感情補助', '読み上げ調整'],
  },
  {
    title: 'YMM4前準備を確認する',
    body: 'CSV、キャラ設定、立ち絵パス、保存先を確認してからYMM4側の編集へ移れます。',
    image: '/product_keyword_material.webp',
    alt: 'YMM4前準備と素材整理を確認する実アプリ画面',
    tags: ['CSV', '.ymmp', '素材パス'],
  },
  {
    title: 'AI台本生成を使う',
    body: '13キャラの掛け合い補助を使い、取得素材を会話形式へ寄せます。',
    image: '/product_ai_script.webp',
    alt: 'AI台本生成とキャラ指定の実アプリ画面',
    tags: ['AI補助', '13キャラ', '掛け合い'],
  },
  {
    title: 'YouTube分析で題材を見る',
    body: '候補動画、コメント、比較情報を確認し、次に作る題材の判断材料にします。',
    image: '/product_youtube_info.webp',
    alt: 'YouTube分析と候補比較の実アプリ画面',
    tags: ['YouTube分析', 'コメント', '題材選定'],
  },
  {
    title: 'フォーマットを追加する',
    body: 'CSV/.ymmpに渡しやすい形を残し、次の動画でも手順を再利用しやすくします。',
    image: '/product_format_list.webp',
    alt: 'フォーマット管理とYMM4前準備の実アプリ画面',
    tags: ['フォーマット', '再利用', '制作手順'],
  },
] as const

const beforeAfterItems = [
  {
    title: 'URL探しとコピペ',
    before: ['URLを開く', '本文をコピー', '使う行を手で選ぶ'],
    after: ['URLを入力', '候補を一覧化', '台本下地へ進む'],
  },
  {
    title: '台本整理',
    before: ['不要行を探す', '会話の順番を直す', '読み上げ量を調整する'],
    after: ['台本画面で編集', '役割と感情を確認', 'CSV/.ymmp前準備へ進む'],
  },
  {
    title: 'YMM4へ渡す前',
    before: ['保存先を探す', '立ち絵パスを確認', 'キャラ設定を見直す'],
    after: ['保存先を固定', '素材パスを確認', 'YMM4で開く前に揃える'],
  },
] as const

const sampleOutputs = [
  {
    title: '反応集・コメント解説',
    body: 'コメント束や反応を整理し、賛否や論点を台本下地へ落とす構成見本です。',
    image: '/samples/sample-reaction-digest-thumbnail.png',
    alt: '反応集・コメント解説のサンプル構成画像',
    tags: ['反応集', 'コメント', '横型'],
  },
  {
    title: 'ゆっくり掛け合い解説',
    body: '霊夢と魔理沙の会話に寄せ、疑問から分解までを作る構成見本です。',
    image: '/samples/sample-yukkuri-dialogue-thumbnail.png',
    alt: 'ゆっくり掛け合い解説のサンプル構成画像',
    tags: ['掛け合い', '解説', '横型'],
  },
  {
    title: '縦型ショートドラマ',
    body: '短い導入と反転を使い、ショート動画向けの台本にする構成見本です。',
    image: '/samples/sample-short-drama-thumbnail.png',
    alt: '縦型ショートドラマのサンプル構成画像',
    tags: ['ショート', '縦型', '台本構成'],
  },
] as const

const samplesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '実画面・サンプル',
  description:
    'ゆっくりまとめプロセッサーの実アプリ画面、Before/After、動画化サンプル構成をまとめたギャラリーページです。',
}

export function SamplesPage() {
  return (
    <>
      <PageMeta
        title="実画面・サンプル｜操作画面とBefore/After"
        description="ゆっくりまとめプロセッサーの実アプリ画面、URL入力から台本整理、YMM4前準備までのBefore/After、動画化サンプル構成を確認できます。"
        keywords="実画面, サンプル, Before After, YMM4, 台本作成, ゆっくりまとめプロセッサー"
        image="/product_edit_script.webp"
        path="/samples/"
        structuredData={samplesStructuredData}
      />

      <main className="brand-shell">
        <PageIntro
          kicker="実画面・サンプル"
          title="どの画面で何ができるか、先に見て判断する"
          lead="URL入力、台本編集、AI補助、CSV/.ymmp前準備まで。雰囲気画像ではなく、実アプリ画面と具体的なBefore/Afterで確認できます。"
          actions={[
            { label: '無料でダウンロード', href: downloadUrl, variant: 'primary', external: true },
            { label: '使い方を見る', href: '/instructions/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '料金を見る', href: '/purchase/' },
            { label: 'FAQを見る', href: '/faq/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass">
              <img
                className="page-visual-card__image"
                src="/product_edit_script.webp"
                alt="台本編集とYMM4前準備を確認する実アプリ画面"
              />
              <div className="page-visual-card__meta">
                <strong>実アプリ画面を中心に、導入前の不安を減らす</strong>
                <span>まず無料で触り、画面の流れが自分の制作手順に合うか確認してください。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <div className="subpage-section-head sample-gallery-head">
            <p>実アプリ画面</p>
            <h2>URL取得からYMM4前準備までを画面で見る</h2>
          </div>

          <div className="sample-screen-grid">
            {screenGallery.map((item) => (
              <InteractiveCard key={item.title} className="sample-screen-card premium-glass">
                <figure>
                  <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                </figure>
                <div className="sample-screen-card__body">
                  <span>
                    <MonitorPlay size={16} />
                    実画面
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="sample-chip-row">
                    {item.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section alt>
          <div className="subpage-section-head sample-gallery-head">
            <p>Before / After</p>
            <h2>手作業で散らばりやすい部分を、確認しやすい順番へ戻す</h2>
          </div>

          <div className="sample-before-after-grid">
            {beforeAfterItems.map((item) => (
              <InteractiveCard key={item.title} className="sample-before-after-card premium-glass">
                <h3>{item.title}</h3>
                <div className="sample-before-after-card__columns">
                  <div>
                    <span>Before</span>
                    <ul>
                      {item.before.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>After</span>
                    <ul>
                      {item.after.map((point) => (
                        <li key={point}>
                          <BadgeCheck size={15} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section>
          <div className="subpage-section-head sample-gallery-head">
            <p>動画化サンプル構成</p>
            <h2>作れる動画の方向性を、構成見本で確認する</h2>
          </div>

          <div className="actual-sample-grid sample-output-grid">
            {sampleOutputs.map((item) => (
              <article key={item.title} className="actual-sample-card sample-output-card">
                <div className="actual-sample-card__media">
                  <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
                  <span className="actual-sample-card__play" aria-hidden="true">
                    <Sparkles size={17} />
                  </span>
                </div>
                <div className="actual-sample-card__copy">
                  <span>構成見本</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <div className="actual-sample-card__tags">
                    {item.tags.map((tag) => (
                      <small key={tag}>{tag}</small>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section alt>
          <InteractiveCard className="sample-final-cta premium-glass">
            <div>
              <span className="subpage-card__eyebrow">次にやること</span>
              <h2>自分のURLで、実画面と同じ流れを確認する</h2>
              <p>
                まずはFreeで起動し、URL取得、台本整理、YMM4前準備まで進めてください。
                Premiumが必要かは、実際の制作手順に合うと分かってから判断できます。
              </p>
            </div>
            <div className="subpage-support-callout__actions">
              <a className="brand-btn brand-btn--primary" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <Download size={18} />
                無料でダウンロード
              </a>
              <Link className="brand-btn brand-btn--ghost" to="/download/">
                <FileText size={18} />
                配布物を確認する
              </Link>
              <Link className="brand-btn brand-btn--ghost" to="/purchase/">
                料金を見る
                <ArrowRight size={16} />
              </Link>
            </div>
          </InteractiveCard>
        </Section>
      </main>
    </>
  )
}
