import { InteractiveCard, PageMeta, Section } from '@/components/ui'
import { legal } from '@/data/site-content'
import { media } from '@/data/assets'
import { LegalLinksBlock } from '@/pages/shared'

function LegalIntro({
  kicker,
  title,
  lead,
  updatedAt,
  narrow = false,
}: {
  kicker: string
  title: string
  lead: string
  updatedAt: string
  narrow?: boolean
}) {
  return (
    <Section>
      <div className={`brand-shell legal-page${narrow ? ' legal-page--narrow' : ''}`}>
        <p className="brand-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="brand-lead">{lead}</p>
        <p className="legal-updated">最終更新日: {updatedAt}</p>
      </div>
    </Section>
  )
}

export function TermsPage() {
  return (
    <>
      <PageMeta
        title="利用規約"
        description="ゆっくりまとめプロセッサーの利用条件、禁止事項、免責、準拠法・管轄を定める利用規約です。"
        keywords="利用規約, サービス利用条件, 免責, 準拠法"
        image={media.hallway}
        path="/legal/terms/"
      />
      <LegalIntro kicker="利用規約" title="利用規約" lead="本規約は、ゆっくりまとめプロセッサーの利用条件を定めるものです。" updatedAt={legal.meta.termsLastUpdated} narrow />
      <Section>
        <div className="brand-shell legal-page legal-page--narrow">
          <h2>第1条（適用）</h2>
          <p>本規約は、当社が提供する本サービスの利用に関する一切の関係に適用されます。</p>
          <h2>第2条（利用許諾）</h2>
          <p>利用者は、購入またはトライアル開始時点で本規約に同意したものとみなします。許諾範囲は当社が明示する利用形態に限られます。</p>
          <h2>第3条（禁止事項）</h2>
          <ul className="brand-list">
            <li>法令または公序良俗に反する行為</li>
            <li>本サービスのリバースエンジニアリング、再配布、無断転載</li>
            <li>不正アクセス、システムに過度な負荷を与える行為</li>
            <li>第三者の権利・利益を侵害する行為</li>
          </ul>
          <h2>第4条（サービス停止・変更）</h2>
          <p>当社は、保守、障害対応、法令対応などのため、事前通知のうえ、または緊急時には通知なくサービス内容を変更・停止することがあります。</p>
          <h2>第5条（免責）</h2>
          <p>当社は、本サービスの中断、停止、データ消失等によって利用者に生じた損害について、法令上許される範囲で責任を負いません。ただし当社の故意または重過失による場合を除きます。</p>
          <h2>第6条（規約変更）</h2>
          <p>当社は、必要に応じて本規約を変更できます。変更後の規約は、本ページへの掲載時点から効力を生じます。</p>
          <h2>第7条（準拠法・管轄）</h2>
          <p>本規約の準拠法は{legal.terms.governingLaw}とし、本サービスに関して紛争が生じた場合は{legal.terms.jurisdiction}とします。</p>
          <LegalLinksBlock />
        </div>
      </Section>
    </>
  )
}

export function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title="プライバシーポリシー"
        description="ゆっくりまとめプロセッサーにおける個人情報の取得、利用、第三者提供、管理方法を掲載しています。"
        keywords="プライバシーポリシー, 個人情報保護, Cookie, 解析ツール"
        image={media.workstationDark}
        path="/legal/privacy/"
      />
      <LegalIntro kicker="個人情報保護" title="プライバシーポリシー" lead="当社は、利用者の個人情報を関連法令と社内規程に基づいて適切に取り扱います。" updatedAt={legal.meta.privacyLastUpdated} narrow />
      <Section>
        <div className="brand-shell legal-page legal-page--narrow">
          <h2>1. 取得する情報</h2>
          <ul className="brand-list">
            <li>問い合わせ時に提供される氏名、メールアドレス、連絡内容</li>
            <li>決済代行会社により処理される決済関連情報</li>
            <li>アクセス解析により収集される閲覧履歴、端末情報、Cookie情報</li>
          </ul>
          <h2>2. 利用目的</h2>
          <ul className="brand-list">
            <li>サービス提供、本人確認、問い合わせ対応</li>
            <li>障害対応、品質改善、新機能の検討</li>
            <li>法令・規約違反行為への対応</li>
          </ul>
          <h2>3. 第三者提供・委託</h2>
          <p>当社は、法令で認められる場合を除き、本人の同意なく個人情報を第三者へ提供しません。決済処理や解析を外部事業者へ委託する場合は、適切に管理します。</p>
          <h2>4. 安全管理措置</h2>
          <p>当社は、個人情報への不正アクセス、漏えい、改ざん、滅失を防止するため、必要かつ適切な安全管理措置を講じます。</p>
          <h2>5. Cookie・解析ツール</h2>
          <p>当サイトでは、利便性向上および利用状況分析のためCookieを利用します。主な解析ツールは以下です。</p>
          <ul className="brand-list">
            {legal.privacy.analyticsTools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
          <h2>6. 開示・訂正・利用停止等</h2>
          <p>個人情報の開示、訂正、利用停止などの請求は、下記窓口へご連絡ください。本人確認のうえ、法令に基づき対応します。</p>
          <ul className="brand-list">
            <li>メール: <a href={`mailto:${legal.organization.email}`}>{legal.organization.email}</a></li>
            <li>電話: {legal.organization.phone}</li>
            <li>受付時間: {legal.organization.businessHours}</li>
          </ul>
          <LegalLinksBlock />
        </div>
      </Section>
    </>
  )
}

export function RefundPolicyPage() {
  return (
    <>
      <PageMeta
        title="返金・キャンセルポリシー"
        description="デジタル商品の返金、キャンセル、解約に関する条件と申請手順を掲載しています。"
        keywords="返金ポリシー, キャンセル, 解約, デジタル商品"
        image={media.colorGrade}
        path="/legal/refund-policy/"
      />
      <LegalIntro kicker="返金条件" title="返金・キャンセルポリシー" lead={`本ポリシーは、${legal.pricing.productName}の購入契約成立後に適用される返金・キャンセル条件を定めるものです。`} updatedAt={legal.meta.refundLastUpdated} narrow />
      <Section>
        <div className="brand-shell legal-page legal-page--narrow">
          <h2>1. 基本方針</h2>
          <p>{legal.refund.summary}</p>
          <h2>2. 例外的な返金対応</h2>
          <p>{legal.refund.defectiveResponse}</p>
          <p>{legal.refund.procedure}</p>
          <ul className="brand-list">
            <li>{legal.refund.defectClaimDeadline}</li>
            <li>{legal.refund.remedyPolicy}</li>
            <li>{legal.refund.refundMethod}</li>
            <li>{legal.refund.refundFeeBurden}</li>
          </ul>
          <h2>3. キャンセル・解約</h2>
          <p>{legal.cancellation.subscription}</p>
          <h2>4. 申請窓口</h2>
          <ul className="brand-list">
            <li>メール: <a href={`mailto:${legal.organization.email}`}>{legal.organization.email}</a></li>
            <li>電話: {legal.organization.phone}</li>
            <li>受付時間: {legal.organization.businessHours}</li>
          </ul>
          <InteractiveCard className="notice-box">
            <h2>重要事項</h2>
            <p>購入前に必ず「利用規約」「特定商取引法に基づく表記」を確認してください。購入手続き完了をもって、これらの内容に同意したものとみなされます。</p>
          </InteractiveCard>
          <LegalLinksBlock />
        </div>
      </Section>
    </>
  )
}

export function CommercialTransactionsPage() {
  return (
    <>
      <PageMeta
        title="特定商取引法に基づく表記"
        description="ゆっくりまとめプロセッサーの販売事業者情報、価格、支払時期、提供時期、返金条件を掲載しています。"
        keywords="特定商取引法, 通信販売, 事業者情報, 返金条件"
        image={media.lobby1}
        path="/legal/commercial-transactions/"
      />
      <LegalIntro kicker="特商法" title="特定商取引法に基づく表記" lead="通信販売に必要な表示事項です。購入前に必ず確認してください。" updatedAt={legal.meta.legalLastUpdated} />
      <Section alt>
        <div className="brand-shell legal-page">
          <div className="legal-table-wrap" data-reveal>
            <table className="legal-table">
              <tbody>
                <tr><th scope="row">販売事業者</th><td>{legal.organization.sellerName}</td></tr>
                <tr><th scope="row">運営統括責任者</th><td>{legal.organization.operatorName}</td></tr>
                <tr><th scope="row">所在地</th><td>{legal.organization.postalCode} {legal.organization.addressLine}</td></tr>
                <tr><th scope="row">電話番号</th><td>{legal.organization.phone}</td></tr>
                <tr><th scope="row">メールアドレス</th><td><a href={`mailto:${legal.organization.email}`}>{legal.organization.email}</a></td></tr>
                <tr><th scope="row">販売価格</th><td>{legal.pricing.plans.map(p => `${p.name}: ${p.price}（${p.priceTax}）/ ${p.term}`).join(' ｜ ')}</td></tr>
                <tr><th scope="row">商品代金以外の必要料金</th><td>{legal.pricing.additionalFees}</td></tr>
                <tr><th scope="row">支払方法</th><td>{legal.payment.methods.join(', ')}<br />{legal.payment.noteOnline}<br />{legal.payment.noteBankPaypal}</td></tr>
                <tr><th scope="row">支払時期</th><td>{legal.payment.timing}</td></tr>
                <tr><th scope="row">支払期限（方法ごと）</th><td>{legal.payment.deadlineRules.map((item) => `${item.method}: ${item.limit}`).join(' / ')}</td></tr>
                <tr><th scope="row">未払い時の扱い</th><td>{legal.payment.unpaidPolicy}</td></tr>
                <tr><th scope="row">商品引渡時期</th><td>{legal.delivery.timing}</td></tr>
                <tr><th scope="row">商品引渡方法</th><td>{legal.delivery.method}</td></tr>
                <tr><th scope="row">返品・交換・キャンセル</th><td>{legal.refund.summary}<br />{legal.refund.defectiveResponse}<br />{legal.refund.defectClaimDeadline}<br />{legal.refund.remedyPolicy}<br />{legal.refund.refundMethod}<br />{legal.refund.refundFeeBurden}</td></tr>
                <tr><th scope="row">解約条件</th><td>{legal.cancellation.subscription}</td></tr>
                <tr><th scope="row">銀行振込先の開示方針</th><td>{legal.payment.bankAccountPolicy}</td></tr>
                <tr><th scope="row">問い合わせ窓口の運用</th><td>{legal.support.operationHours}<br />{legal.support.firstResponseSla}</td></tr>
              </tbody>
            </table>
          </div>
          <LegalLinksBlock />
        </div>
      </Section>
    </>
  )
}
