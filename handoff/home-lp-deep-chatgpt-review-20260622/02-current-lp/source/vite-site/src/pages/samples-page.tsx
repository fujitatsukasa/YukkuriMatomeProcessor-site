import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { downloadUrl } from '@/data/site-content'
import { ArrowRight, BadgeCheck, ClipboardCheck, Download, FileText, MonitorPlay, Sparkles } from 'lucide-react'

const screenGallery = [
  {
    title: 'URLを貼って候補を見る',
    body: '対応サイトやスレッドURLを貼り、動画化する候補を一覧で確認します。',
    goal: '候補一覧にタイトル、URL、サムネイルが並ぶ',
    next: '使う候補を選び、台本下地へ進む',
    image: '/product_get_script.webp',
    alt: 'URL入力から記事候補を取得する実アプリ画面',
    tags: ['URL取得', '候補比較', '対応サイト'],
  },
  {
    title: '台本下地を編集する',
    body: '不要行を削り、役割、感情、読み上げ向けの文量を見ながら整えます。',
    goal: '読み上げ前に確認できる台本下地になる',
    next: 'CSV/.ymmp前準備へ渡す内容を確定する',
    image: '/product_edit_script.webp',
    alt: '取得した台本下地を編集する実アプリ画面',
    tags: ['台本編集', '感情補助', '読み上げ調整'],
  },
  {
    title: 'YMM4前準備を確認する',
    body: 'CSV、キャラ設定、立ち絵パス、保存先を確認してからYMM4側の編集へ移れます。',
    goal: '素材パスと保存先を確認し、編集前の不整合を減らす',
    next: 'YMM4側で音声、字幕、立ち絵を確認する',
    image: '/product_keyword_material.webp',
    alt: 'YMM4前準備と素材整理を確認する実アプリ画面',
    tags: ['CSV', '.ymmp', '素材パス'],
  },
  {
    title: 'AI台本生成を使う',
    body: '13キャラの掛け合い補助を使い、取得素材を会話形式へ寄せます。',
    goal: 'AI出力を下書きとして作り、人が内容確認できる状態にする',
    next: '事実確認、引用、言い回しを修正する',
    image: '/product_ai_script.webp',
    alt: 'AI台本生成とキャラ指定の実アプリ画面',
    tags: ['AI補助', '13キャラ', '掛け合い'],
  },
  {
    title: 'YouTube分析で題材を見る',
    body: '候補動画、コメント、比較情報を確認し、次に作る題材の判断材料にします。',
    goal: '題材候補の比較材料を集める',
    next: '使う題材を選び、URL取得か台本作成へ戻る',
    image: '/product_youtube_info.webp',
    alt: 'YouTube分析と候補比較の実アプリ画面',
    tags: ['YouTube分析', 'コメント', '題材選定'],
  },
  {
    title: 'フォーマットを追加する',
    body: 'CSV/.ymmpに渡しやすい形を残し、次の動画でも同じ流れを使いやすくします。',
    goal: '形式と命名ルールを再利用できる状態にする',
    next: '次回の動画でも同じ前工程を使う',
    image: '/product_format_list.webp',
    alt: 'フォーマット管理とYMM4前準備の実アプリ画面',
    tags: ['フォーマット', '再利用', '前工程'],
  },
] as const

const sampleGoalCards = [
  {
    title: 'URL取得の成功',
    body: '対応URLを入れて、候補一覧に使える素材が並ぶかを確認します。',
    checks: ['少数URLで取得確認', '対応外URLを切り分け', '候補から題材を選ぶ'],
  },
  {
    title: '台本下地の成功',
    body: 'AI補助を使う場合も、公開前に人が確認できる台本へ整えます。',
    checks: ['不要行を削除', '役割と感情を確認', '長い行を分割'],
  },
  {
    title: 'YMM4前準備の成功',
    body: 'CSV/.ymmp、保存先、素材パスを確認して、YMM4側の編集に入れる状態にします。',
    checks: ['保存先を固定', '素材パスを確認', 'YMM4側で最終編集'],
  },
] as const

const sampleDecisionCards = [
  {
    title: '実アプリ画面で確認',
    body: 'URL取得、台本編集、YMM4前準備の画面が手元の題材に合うかを確認します。',
    link: '#sample-screen-gallery',
    linkLabel: '画面を見る',
    Icon: MonitorPlay,
  },
  {
    title: '実動画プレビューで確認',
    body: '短い実動画で、字幕、画面の流れ、YMM4側で調整する余白を確認します。',
    link: '#sample-video-gallery',
    linkLabel: '動画を見る',
    Icon: Sparkles,
  },
  {
    title: 'Freeで動作確認',
    body: '見た後は少数URLで、候補取得、保存先、CSV/.ymmp前準備まで実際に通します。',
    link: '/download/',
    linkLabel: '配布物を確認',
    Icon: Download,
  },
] as const

const sampleShowcaseItems = [
  {
    title: '反応集・コメント解説',
    body: '記事URLやコメント束を題材にし、賛否、論点、権利メモを見ながら台本下地へ落とす流れです。',
    appImage: '/product_get_script.webp',
    appAlt: '記事URLから反応集の候補を取得する実アプリ画面',
    sampleImage: '/samples/sample-reaction-digest-thumbnail.png',
    sampleAlt: '反応集・コメント解説の動画化サンプル構成',
    orientation: 'landscape',
    input: '記事URL / スレッドURL / コメント候補',
    output: 'タイトル候補、台本下地、引用確認メモ',
    beforeAfter: 'コピペで集める状態から、候補一覧で選ぶ状態へ',
    checks: ['候補タイトルが一覧に出る', '使うコメントを選べる', '引用元と権利メモを残す'],
  },
  {
    title: 'ゆっくり掛け合い解説',
    body: '霊夢と魔理沙の会話に寄せ、疑問、分解、結論の順で読み上げ前の下書きを整えます。',
    appImage: '/product_ai_script.webp',
    appAlt: 'AI台本生成で掛け合い台本を作る実アプリ画面',
    sampleImage: '/samples/sample-yukkuri-dialogue-thumbnail.png',
    sampleAlt: 'ゆっくり掛け合い解説の動画化サンプル構成',
    orientation: 'landscape',
    input: '題材メモ / 取得済み本文 / キャラ指定',
    output: '掛け合い台本、役割、感情メモ',
    beforeAfter: '単なる本文整理から、会話として確認できる下書きへ',
    checks: ['AI出力を人が確認する', '役割と感情を見直す', '長い行を読み上げ向けに分ける'],
  },
  {
    title: '縦型ショートドラマ',
    body: '短い導入、反転、締めを決め、ショート向けに余白とテンポを意識した台本下地にします。',
    appImage: '/product_format_list.webp',
    appAlt: 'フォーマット管理と出力形式を確認する実アプリ画面',
    sampleImage: '/samples/sample-short-drama-thumbnail.png',
    sampleAlt: '縦型ショートドラマの動画化サンプル構成',
    orientation: 'portrait',
    input: '短い題材 / セリフ案 / 出力形式',
    output: '縦型用の構成、短い台本、保存形式',
    beforeAfter: '長い説明文から、1本のショート構成へ',
    checks: ['冒頭の一言を決める', '反転ポイントを入れる', '保存形式を再利用できる'],
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

const videoSampleItems = [
  {
    title: 'ゆっくり掛け合い解説',
    body: '会話形式の下書きが、実際の動画テンポに近い見え方になるかを確認できます。',
    video: '/samples/sample-yukkuri-dialogue-preview.mp4',
    poster: '/samples/sample-yukkuri-dialogue-thumbnail.png',
    points: ['掛け合いのテンポ', '字幕と画面の読みやすさ', 'YMM4側で調整する余白'],
  },
  {
    title: '反応集・コメント解説',
    body: 'コメントや論点をまとめた構成が、動画の流れとして見えるかを確認できます。',
    video: '/samples/sample-reaction-digest-preview.mp4',
    poster: '/samples/sample-reaction-digest-thumbnail.png',
    points: ['コメントの見せ方', '論点の区切り', '引用元確認の残し方'],
  },
  {
    title: '縦型ショートドラマ',
    body: '短い導入から締めまで、縦型向けの構成と尺感を確認できます。',
    video: '/samples/sample-short-drama-preview.mp4',
    poster: '/samples/sample-short-drama-thumbnail.png',
    points: ['冒頭の入り', '縦画面の余白', '短尺の締め方'],
  },
] as const

const samplesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '実画面・サンプル',
  description:
    'ゆっくりまとめプロセッサーの実アプリ画面、Before/After、動画化サンプル構成を専用ギャラリーで確認できるページです。',
}

export function SamplesPage() {
  return (
    <>
      <PageMeta
        title="実画面・動画サンプル｜使う前の流れを確認"
        description="ゆっくりまとめプロセッサーの実アプリ画面、URLを貼ってから台本整理、YMM4前準備までのBefore/After、短い動画プレビューを専用ギャラリーで確認できます。"
        keywords="実画面, サンプル, Before After, YMM4, 台本作成, ゆっくりまとめプロセッサー"
        image="/product_edit_script.webp"
        path="/samples/"
        structuredData={samplesStructuredData}
      />

      <main className="brand-shell">
        <PageIntro
          kicker="実画面・サンプルギャラリー"
          title="実アプリ画面と動画サンプルで、使う前の流れを確認する"
          lead="URLを貼る、台本を直す、CSV/.ymmp前準備まで。実アプリ画面、Before/After、短い動画プレビューで、無料で試す前に流れを確認できます。"
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
                <strong>実アプリ画面を中心に、操作の流れを確認</strong>
                <span>まず画面で流れを見て、無料版で自分のURLを試してください。</span>
              </div>
            </InteractiveCard>
          }
        />

        <Section className="sample-decision-section">
          <div className="sample-decision-strip" aria-label="サンプルページで判断できること">
            {sampleDecisionCards.map((item) => {
              const DecisionIcon = item.Icon
              const content = (
                <>
                  <span className="sample-decision-card__icon" aria-hidden="true">
                    <DecisionIcon size={19} />
                  </span>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                  <small>
                    {item.linkLabel}
                    <ArrowRight size={14} />
                  </small>
                </>
              )

              return item.link.startsWith('#') ? (
                <a key={item.title} className="sample-decision-card premium-glass" href={item.link}>
                  {content}
                </a>
              ) : (
                <Link key={item.title} className="sample-decision-card premium-glass" to={item.link}>
                  {content}
                </Link>
              )
            })}
          </div>
        </Section>

        <Section>
          <div className="subpage-section-head sample-gallery-head">
            <p>専用ギャラリー</p>
            <h2>実画面、Before/After、動画化サンプルをまとめて見る</h2>
            <p>
              画像だけで判断しづらい部分を、貼るもの、できるもの、成功状態まで並べて確認できます。
              動画化サンプルは完成動画そのものではなく、作れる方向性を示す構成見本です。
            </p>
          </div>

          <div className="sample-showcase-grid">
            {sampleShowcaseItems.map((item) => (
              <InteractiveCard key={item.title} className="sample-showcase-card premium-glass">
                <div className="sample-showcase-card__media">
                  <figure className="sample-showcase-card__app">
                    <img src={item.appImage} alt={item.appAlt} loading="lazy" decoding="async" />
                    <figcaption>実アプリ画面</figcaption>
                  </figure>
                  <figure className={`sample-showcase-card__output is-${item.orientation}`}>
                    <img src={item.sampleImage} alt={item.sampleAlt} loading="lazy" decoding="async" />
                    <figcaption>動画化サンプル</figcaption>
                  </figure>
                </div>

                <div className="sample-showcase-card__copy">
                  <span>
                    <MonitorPlay size={16} />
                    サンプル
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>

                  <dl>
                    <div>
                      <dt>入力</dt>
                      <dd>{item.input}</dd>
                    </div>
                    <div>
                      <dt>成果物</dt>
                      <dd>{item.output}</dd>
                    </div>
                    <div>
                      <dt>Before/After</dt>
                      <dd>{item.beforeAfter}</dd>
                    </div>
                  </dl>

                  <ul>
                    {item.checks.map((check) => (
                      <li key={check}>
                        <BadgeCheck size={15} />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section>
          <div className="subpage-section-head sample-gallery-head">
            <p>機能別ゴール</p>
            <h2>実画面を見る前に、何ができれば成功かを決める</h2>
          </div>

          <div className="sample-goal-grid">
            {sampleGoalCards.map((goal) => (
              <InteractiveCard key={goal.title} className="sample-goal-card premium-glass">
                <span className="sample-goal-card__icon" aria-hidden="true">
                  <ClipboardCheck size={21} />
                </span>
                <h3>{goal.title}</h3>
                <p>{goal.body}</p>
                <ul>
                  {goal.checks.map((check) => (
                    <li key={check}>
                      <BadgeCheck size={15} />
                      {check}
                    </li>
                  ))}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section alt id="sample-screen-gallery">
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
                  <dl className="sample-screen-card__goal">
                    <div>
                      <dt>成功状態</dt>
                      <dd>{item.goal}</dd>
                    </div>
                    <div>
                      <dt>次にやること</dt>
                      <dd>{item.next}</dd>
                    </div>
                  </dl>
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

        <Section>
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

        <Section alt id="sample-output-gallery">
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

        <Section id="sample-video-gallery">
          <div className="subpage-section-head sample-gallery-head">
            <p>実動画プレビュー</p>
            <h2>短い動画で、画面の流れとテンポを確認する</h2>
            <p>
              ここでは軽量な実動画プレビューだけを載せています。完成品質を保証するものではなく、
              YMM4側で字幕、音声、立ち絵、間合いを調整する前提の確認用です。
            </p>
          </div>

          <div className="sample-video-grid">
            {videoSampleItems.map((item) => (
              <InteractiveCard key={item.title} className="sample-video-card premium-glass">
                <div className="sample-video-card__media">
                  <video
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    poster={item.poster}
                    aria-label={`${item.title}の実動画プレビュー`}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
                <div className="sample-video-card__body">
                  <span>
                    <MonitorPlay size={16} />
                    実動画
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>
                        <BadgeCheck size={15} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </InteractiveCard>
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
                Premiumが必要かは、実際の制作手順に合うと分かってから確認できます。
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
