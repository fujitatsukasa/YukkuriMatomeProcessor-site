import { PageIntro, PageMeta, Section } from '@/components/ui'
import { media } from '@/data/assets'
import { legal, supportChannels } from '@/data/site-content'
import { LegalLinksBlock } from '@/pages/shared'

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="お問い合わせ"
        description="連絡手段、問い合わせ時に必要な情報、対応目安、法務情報をまとめたお問い合わせページです。"
        keywords="お問い合わせ, サポート, 導入相談, 不具合報告, 特商法"
        image={media.workspaceComputer}
        path="/contact/"
      />
      <PageIntro
        kicker="お問い合わせ"
        title="お問い合わせ窓口"
        lead="メール・X・Discord・Chatworkで受け付けています"
      />

      <Section>
        <div className="brand-shell content-page">
          <h2>サポートチャンネル</h2>
          <ul className="brand-list">
            {supportChannels.map((channel) => (
              <li key={channel.name}>
                <strong>{channel.name}:</strong>{' '}
                <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {channel.href.replace(/^mailto:/, '')}
                </a> - {channel.description}
              </li>
            ))}
          </ul>

          <div className="content-page__grid-2" style={{ marginTop: '4rem' }}>
            <div>
              <h2>不具合報告時に必要な情報</h2>
              <ul className="brand-list">
                <li>利用OSとバージョン</li>
                <li>再現手順（時系列）</li>
                <li>エラーメッセージ全文</li>
                <li>発生頻度と回避可否</li>
              </ul>
            </div>
            <div>
              <h2>対応目安</h2>
              <ul className="brand-list">
                <li>受付時間: {legal.support.operationHours}</li>
                <li>一次回答: {legal.support.firstResponseSla}</li>
                <li>休業日の問い合わせは翌営業日以降に順次対応</li>
              </ul>
            </div>
          </div>

          <h2 style={{ marginTop: '4rem' }}>法務情報の確認</h2>
          <p>購入前に確認すべき契約条件、返金条件は以下をご参照ください。</p>
          <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px' }}>
            <LegalLinksBlock />
          </div>
        </div>
      </Section>
    </>
  )
}
