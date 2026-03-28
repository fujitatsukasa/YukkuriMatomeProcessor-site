import { InteractiveCard, PageIntro, PageMeta, Section } from '@/components/ui'
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
        lead="連絡先はメールとXを中心に、Discord・Chatworkでも受け付けています。先に必要情報を添えると、回答までの時間を短縮できます。"
        flowLinks={[
          { label: '先にダウンロードする', href: '/download/' },
          { label: '次: 使い方を確認', href: '/instructions/' },
          { label: '次: FAQを確認', href: '/faq/' },
          { label: '次: 購入条件を確認', href: '/purchase/' },
          { label: '法務情報を確認', href: '/legal/commercial-transactions/' },
        ]}
      />

      <Section>
        <div className="brand-shell contact-channels contact-channels--cards">
          {supportChannels.map((channel) => (
            <InteractiveCard key={channel.name} className="channel premium-glass">
              <h2>{channel.name}</h2>
              <p>
                <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {channel.href.replace(/^mailto:/, '')}
                </a>
              </p>
              <p>{channel.description}</p>
            </InteractiveCard>
          ))}
        </div>
      </Section>

      <Section alt>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="notice-box">
            <h2>問い合わせ時に必要な情報</h2>
            <ul className="brand-list">
              <li>利用OSとバージョン</li>
              <li>再現手順（時系列）</li>
              <li>エラーメッセージ全文</li>
              <li>発生頻度と回避可否</li>
            </ul>
          </InteractiveCard>
          <InteractiveCard className="notice-box">
            <h2>対応目安</h2>
            <ul className="brand-list">
              <li>受付時間: {legal.support.operationHours}</li>
              <li>一次回答: {legal.support.firstResponseSla}</li>
              <li>休業日の問い合わせは翌営業日以降に順次対応</li>
            </ul>
          </InteractiveCard>
        </div>
      </Section>

      <Section>
        <div className="brand-shell brand-grid brand-grid--2">
          <InteractiveCard className="notice-box">
            <h2>法務情報の確認</h2>
            <p>購入前に確認すべき契約条件、返金条件、個人情報の取り扱いをまとめています。</p>
            <LegalLinksBlock />
          </InteractiveCard>
          <InteractiveCard className="notice-box">
            <h2>法務問い合わせ</h2>
            <ul className="brand-list">
              <li>契約条件・請求に関する問い合わせ: メール推奨</li>
              <li>銀行振込・PayPal購入希望: メールで個別案内</li>
              <li>{legal.payment.bankAccountPolicy}</li>
            </ul>
          </InteractiveCard>
        </div>
      </Section>
    </>
  )
}
