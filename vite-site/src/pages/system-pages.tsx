import { Link } from 'react-router-dom'
import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { MicroStatusPage } from '@/pages/shared'

export function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="404"
        description="指定したページが見つかりません。主要ページから目的の情報へ戻れます。"
        path="/404.html"
        noindex
      />
      <Section className="brand-404">
        <div className="brand-shell">
          <p className="brand-kicker">404</p>
          <h1>ページが見つかりません</h1>
          <p>URLが変更されたか、公開が終了している可能性があります。以下の主要ページから目的の情報へ戻ってください。</p>
          <div className="brand-grid brand-grid--2" style={{ textAlign: 'left', marginTop: '1rem' }}>
            <InteractiveCard className="brand-card premium-glass">
              <h2>よく使うページ</h2>
              <ul className="brand-list">
                <li><Link to="/">ホーム</Link></li>
                <li><Link to="/download/">ダウンロード</Link></li>
                <li><Link to="/instructions/">使い方</Link></li>
                <li><Link to="/faq/">FAQ</Link></li>
              </ul>
            </InteractiveCard>
            <InteractiveCard className="brand-card premium-glass">
              <h2>サポートページ</h2>
              <p>必要ページが見つからない場合はお問い合わせから直接ご連絡ください。</p>
              <div className="brand-inline-actions">
                <Link className="brand-btn brand-btn--ghost" to="/news/">お知らせ</Link>
                <Link className="brand-btn brand-btn--ghost" to="/contact/">お問い合わせ</Link>
              </div>
            </InteractiveCard>
          </div>
          <div className="brand-inline-actions" style={{ justifyContent: 'center', marginTop: '1.1rem' }}>
            <Link className="brand-btn brand-btn--primary" to="/">ホームへ戻る</Link>
            <Link className="brand-btn brand-btn--ghost" to="/download/">ダウンロードを見る</Link>
          </div>
        </div>
      </Section>
    </>
  )
}

export function AccountReturnPage() {
  return (
    <MicroStatusPage
      title="課金管理から戻りました"
      description="課金管理から戻りました。このタブを閉じてアプリに戻ってください。"
    />
  )
}

export function BillingSuccessPage() {
  return (
    <MicroStatusPage
      title="決済が完了しました"
      description="決済が完了しました。このタブを閉じてアプリに戻ってください。"
    />
  )
}

export function BillingCancelPage() {
  return (
    <MicroStatusPage
      title="決済はキャンセルされました"
      description="決済はキャンセルされました。このタブを閉じてアプリに戻ってください。"
    />
  )
}
