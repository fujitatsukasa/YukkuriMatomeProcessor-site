import { Link } from 'react-router-dom'
import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
import { legal, siteOrigin, siteTitle, supportChannels } from '@/data/site-content'
import { LegalLinksBlock } from '@/pages/shared'
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Bug,
  Clock3,
  CreditCard,
  FileText,
  Mail,
  MessageCircle,
} from 'lucide-react'

const channelIcons = {
  メール: Mail,
  'X (Twitter)': MessageCircle,
  Discord: MessageCircle,
  Chatwork: MessageCircle,
} as const

const channelPriority = {
  メール: {
    label: '最優先',
    use: '契約、請求、返金、不具合、長文の状況共有',
    note: '記録を残したい問い合わせはメール推奨です。',
  },
  'X (Twitter)': {
    label: '告知確認',
    use: '短い質問、更新告知、公開情報の確認',
    note: '個人情報や決済情報を含む内容はメールへ送ってください。',
  },
  Discord: {
    label: '相談',
    use: '画面共有前提の相談、状況確認、やり取りが多い内容',
    note: '不具合報告は最終的にメールで記録を残すと安全です。',
  },
  Chatwork: {
    label: '業務連絡',
    use: '法人・チーム導入、継続的な連絡、請求まわりの確認',
    note: '契約条件の確定や返金相談はメールも併用してください。',
  },
} as const

const supportFacts = [
  { label: '受付時間', value: legal.support.operationHours },
  { label: '一次回答', value: legal.support.firstResponseSla },
  { label: '運営会社', value: legal.organization.legalName },
] as const

const intakeItems = [
  {
    title: '不具合・起動しない',
    body: 'OS、アプリのバージョン、再現手順、エラー全文、対象URLを添えてください。',
    Icon: Bug,
  },
  {
    title: '購入・請求・返金',
    body: '購入日、Googleログインのメールアドレス、決済状況、返金希望理由を記録に残る形で送ってください。',
    Icon: CreditCard,
  },
  {
    title: '導入前の確認',
    body: 'Windows環境、YMM4の有無、作りたい動画形式、試したいURLの種類をまとめると判断が速くなります。',
    Icon: BadgeCheck,
  },
] as const

const requiredInfo = [
  '利用OSとバージョン',
  'ゆっくりまとめプロセッサーのバージョン',
  'YMM4のバージョンとYMM4.exeのパス',
  '対象URL、対象サイト名、実行した操作',
  'エラーメッセージ全文またはスクリーンショット',
  '発生頻度、再現できるか、回避できるか',
] as const

const mailTemplateItems = [
  {
    title: '起動しない・エラーが出る',
    subject: '【不具合】ゆっくりまとめプロセッサーが起動しない/エラー',
    description: '起動、画面表示、保存、YMM4連携などで止まる場合はこちらを使ってください。',
    fields: [
      '利用OS:',
      'アプリバージョン:',
      'YMM4バージョン:',
      '発生した画面:',
      'エラー全文:',
      '再現手順:',
      '回避できるか:',
    ],
  },
  {
    title: 'URL取得できない',
    subject: '【URL取得】対象URLで取得できない',
    description: '記事URL・スレッドURLを入れても候補が出ない、取得が途中で止まる場合はこちらです。',
    fields: [
      '対象URL:',
      '対象サイト名:',
      '取得したい内容:',
      '押したボタン/操作:',
      '表示されたエラー:',
      '別URLでは取得できるか:',
    ],
  },
  {
    title: '購入・権限・返金',
    subject: '【購入/権限】Premium購入・権限同期・返金相談',
    description: 'Premium購入、Googleアカウント権限、Stripe決済、返金相談は記録が残るメール推奨です。',
    fields: [
      '問い合わせ内容:',
      '購入日:',
      'Googleログインのメールアドレス:',
      '決済完了メールの有無:',
      'アプリ内で見えるプラン:',
      '返金希望理由:',
    ],
  },
  {
    title: '導入前相談',
    subject: '【導入相談】利用環境と制作内容の確認',
    description: '自分の環境や作りたい動画に合うか、購入前に確認したい場合に使えます。',
    fields: [
      '利用予定OS:',
      'YMM4の利用有無:',
      '作りたい動画形式:',
      '試したいURLの種類:',
      '無料版で確認済みの範囲:',
      '相談したいこと:',
    ],
  },
] as const

const safetyNotes = [
  'APIキー、パスワード、決済カード番号は送らないでください。',
  '返金や契約条件の相談は、記録が残るメールを優先してください。',
  '休業日の問い合わせは翌営業日以降に順次確認します。',
] as const

const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: legal.organization.legalName,
  url: siteOrigin,
  email: legal.organization.email,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: legal.organization.email,
    availableLanguage: ['Japanese'],
    hoursAvailable: legal.support.operationHours,
  },
  brand: {
    '@type': 'Brand',
    name: siteTitle,
  },
}

function formatChannelLabel(channel: (typeof supportChannels)[number]) {
  if (channel.name === 'メール') return 'メールで問い合わせる'
  if (channel.name === 'X (Twitter)') return 'Xで確認する'
  return `${channel.name}で連絡する`
}

function buildSupportMailto() {
  return buildTemplateMailto('ゆっくりまとめプロセッサー問い合わせ', [
    '問い合わせ種別:',
    '利用OS:',
    'アプリバージョン:',
    'YMM4バージョン:',
    '対象URL:',
    '発生している内容:',
    'エラー全文:',
    '再現手順:',
  ])
}

function buildTemplateMailto(subjectText: string, bodyLines: readonly string[]) {
  const subject = encodeURIComponent(subjectText)
  const body = encodeURIComponent(bodyLines.join('\n'))
  return `mailto:${legal.organization.email}?subject=${subject}&body=${body}`
}

export function ContactPage() {
  const mailtoHref = buildSupportMailto()

  return (
    <>
      <PageMeta
        title="お問い合わせ｜サポート窓口"
        description="ゆっくりまとめプロセッサーの問い合わせ窓口。契約、請求、返金、不具合、導入相談で送るべき情報と連絡先を確認できます。"
        keywords="お問い合わせ, サポート, 導入相談, 不具合報告, 返金, 請求"
        path="/contact/"
        structuredData={contactStructuredData}
      />

      <main className="brand-shell">
        <PageIntro
          kicker="お問い合わせ"
          title="お問い合わせとサポート窓口"
          lead="契約、請求、返金、不具合、導入相談で使う窓口と、最初に送るべき情報をまとめています。記録を残したい内容はメールを優先してください。"
          actions={[
            { label: 'メールで問い合わせる', href: mailtoHref, variant: 'primary', external: true },
            { label: 'FAQを見る', href: '/faq/', variant: 'ghost' },
          ]}
          flowLinks={[
            { label: '使い方を見る', href: '/instructions/' },
            { label: '料金を見る', href: '/purchase/' },
            { label: '返金ポリシー', href: '/legal/refund-policy/' },
          ]}
          media={
            <InteractiveCard className="page-visual-card premium-glass contact-hero-card">
              <img
                className="page-visual-card__image"
                src="/product_edit_script.webp"
                alt="台本編集とYMM4前準備の実アプリ画面"
              />
              <div className="contact-hero-card__body">
                <strong>画面の状態が分かる情報があると切り分けが速くなります</strong>
                <div className="contact-quick-tags" aria-label="問い合わせ時にあると速い情報">
                  <span>OS</span>
                  <span>アプリ版</span>
                  <span>YMM4版</span>
                  <span>対象URL</span>
                  <span>エラー全文</span>
                </div>
              </div>
            </InteractiveCard>
          }
        />

        <Section>
          <div className="contact-status-grid" aria-label="サポート体制">
            {supportFacts.map((item) => (
              <InteractiveCard key={item.label} className="release-panel premium-glass contact-status-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section alt>
          <div className="subpage-section-head contact-section-head">
            <p>窓口の選び方</p>
            <h2>まずはメール、短い確認は各チャンネルへ</h2>
          </div>

          <div className="contact-channel-grid">
            {supportChannels.map((channel) => {
              const ChannelIcon = channelIcons[channel.name as keyof typeof channelIcons] ?? MessageCircle
              const priority = channelPriority[channel.name as keyof typeof channelPriority]
              return (
                <InteractiveCard key={channel.name} className="release-panel premium-glass contact-channel-card">
                  <div className="contact-channel-card__top">
                    <span className="contact-channel-card__icon" aria-hidden="true">
                      <ChannelIcon size={19} />
                    </span>
                    <div>
                      <span className="subpage-card__eyebrow">{priority?.label ?? '連絡先'}</span>
                      <h2>{channel.name}</h2>
                    </div>
                  </div>
                  <p>{priority?.use ?? channel.description}</p>
                  <small>{priority?.note ?? channel.description}</small>
                  <a
                    className="contact-channel-card__link"
                    href={channel.name === 'メール' ? mailtoHref : channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span>{formatChannelLabel(channel)}</span>
                    <ArrowRight size={16} />
                  </a>
                </InteractiveCard>
              )
            })}
          </div>
        </Section>

        <Section>
          <div className="contact-intake-layout">
            <div className="subpage-section-head contact-section-head">
              <p>問い合わせ種別</p>
              <h2>内容ごとに、最初に送る情報を変える</h2>
            </div>

            <div className="contact-intake-grid">
              {intakeItems.map((item) => {
                const IntakeIcon = item.Icon
                return (
                  <InteractiveCard key={item.title} className="release-panel premium-glass contact-intake-card">
                    <span className="contact-channel-card__icon" aria-hidden="true">
                      <IntakeIcon size={19} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </InteractiveCard>
                )
              })}
            </div>
          </div>
        </Section>

        <Section>
          <div className="subpage-section-head contact-section-head">
            <p>メールテンプレート</p>
            <h2>症状に近い入口から送る</h2>
            <p>
              何を書けばいいか迷う場合は、近いテンプレートを開いて空欄を埋めてください。
              カード番号、APIキー、パスワードは含めないでください。
            </p>
          </div>

          <div className="contact-template-grid">
            {mailTemplateItems.map((item) => (
              <InteractiveCard key={item.title} className="release-panel premium-glass contact-template-card">
                <div className="contact-template-card__head">
                  <span className="contact-channel-card__icon" aria-hidden="true">
                    <Mail size={19} />
                  </span>
                  <div>
                    <span className="subpage-card__eyebrow">メール</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="contact-template-card__body" aria-label={`${item.title}で送る項目`}>
                  {item.fields.map((field) => (
                    <span key={field}>{field}</span>
                  ))}
                </div>
                <a
                  className="contact-channel-card__link"
                  href={buildTemplateMailto(item.subject, item.fields)}
                >
                  <span>この内容でメールを開く</span>
                  <ArrowRight size={16} />
                </a>
              </InteractiveCard>
            ))}
          </div>
        </Section>

        <Section alt>
          <div className="contact-info-layout">
            <InteractiveCard className="release-panel premium-glass contact-info-card">
              <div className="contact-info-card__head">
                <FileText size={20} />
                <div>
                  <span className="subpage-card__eyebrow">不具合報告テンプレート</span>
                  <h2>これを添えると切り分けが速くなります</h2>
                </div>
              </div>
              <ul className="brand-list contact-info-list">
                {requiredInfo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </InteractiveCard>

            <InteractiveCard className="release-panel premium-glass contact-info-card contact-info-card--warning">
              <div className="contact-info-card__head">
                <AlertTriangle size={20} />
                <div>
                  <span className="subpage-card__eyebrow">送信前の注意</span>
                  <h2>秘密情報は送らないでください</h2>
                </div>
              </div>
              <ul className="brand-list contact-info-list">
                {safetyNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="contact-response-note">
                <Clock3 size={17} />
                <span>受付時間: {legal.support.operationHours} / 一次回答: {legal.support.firstResponseSla}</span>
              </div>
            </InteractiveCard>
          </div>
        </Section>

        <Section>
          <InteractiveCard className="release-panel premium-glass contact-legal-panel">
            <div>
              <span className="subpage-card__eyebrow">契約・返金・法務</span>
              <h2>購入前後の条件は、法務ページで確認できます</h2>
              <p>
                Premiumは買い切りライセンスです。返金条件、利用規約、特定商取引法に基づく表記は購入前に確認してください。
              </p>
            </div>
            <div className="contact-legal-panel__links">
              <LegalLinksBlock />
            </div>
            <div className="subpage-support-callout__actions">
              <Link className="brand-btn brand-btn--ghost" to="/purchase/">
                料金を見る
              </Link>
              <a className="brand-btn brand-btn--primary" href={mailtoHref}>
                メールで問い合わせる
              </a>
            </div>
          </InteractiveCard>
        </Section>
      </main>
    </>
  )
}
