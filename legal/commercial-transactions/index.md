---
layout: brand-page
title: 特定商取引法に基づく表記
subtitle: 通信販売に関する重要表示
permalink: /legal/commercial-transactions/
schema_type: legal
seo_title: 特定商取引法に基づく表記 | ゆっくりまとめプロセッサー
seo_description: ゆっくりまとめプロセッサーの販売事業者情報、価格、支払時期、提供時期、返金条件を掲載しています。
seo_keywords: 特定商取引法, 通信販売, 事業者情報, 返金条件
seo_image: /assets/showcase/aurora/lobby-1.jpg
---

{% assign legal = site.data.legal %}
{% assign org = legal.organization %}

<section class="brand-section">
  <div class="brand-shell legal-page">
    <p class="brand-kicker">Legal Notice</p>
    <h1>特定商取引法に基づく表記</h1>
    <p class="brand-lead">通信販売に必要な表示事項です。購入前に必ず確認してください。</p>
    <p class="legal-updated">最終更新日: {{ legal.meta.legal_last_updated }}</p>
  </div>
</section>

<section class="brand-section brand-section--alt">
  <div class="brand-shell legal-page">
    <div class="legal-table-wrap">
      <table class="legal-table">
        <tbody>
          <tr>
            <th scope="row">販売事業者</th>
            <td>{{ org.seller_name }}</td>
          </tr>
          <tr>
            <th scope="row">運営統括責任者</th>
            <td>{{ org.operator_name }}</td>
          </tr>
          <tr>
            <th scope="row">所在地</th>
            <td>{{ org.postal_code }} {{ org.address_line }}</td>
          </tr>
          <tr>
            <th scope="row">電話番号</th>
            <td>{{ org.phone }}</td>
          </tr>
          <tr>
            <th scope="row">メールアドレス</th>
            <td><a href="mailto:{{ org.email }}">{{ org.email }}</a></td>
          </tr>
          <tr>
            <th scope="row">販売価格</th>
            <td>{{ legal.pricing.product_name }}: {{ legal.pricing.amount_including_tax }}</td>
          </tr>
          <tr>
            <th scope="row">商品代金以外の必要料金</th>
            <td>{{ legal.pricing.additional_fees }}</td>
          </tr>
          <tr>
            <th scope="row">支払方法</th>
            <td>
              {% for method in legal.payment.methods %}{{ method }}{% unless forloop.last %}, {% endunless %}{% endfor %}
              <br>{{ legal.payment.note_online }}
              <br>{{ legal.payment.note_bank_paypal }}
            </td>
          </tr>
          <tr>
            <th scope="row">支払時期</th>
            <td>{{ legal.payment.timing }}</td>
          </tr>
          <tr>
            <th scope="row">支払期限（方法ごと）</th>
            <td>
              {% for item in legal.payment.deadline_rules %}
              {{ item.method }}: {{ item.limit }}{% unless forloop.last %}<br>{% endunless %}
              {% endfor %}
            </td>
          </tr>
          <tr>
            <th scope="row">未払い時の扱い</th>
            <td>{{ legal.payment.unpaid_policy }}</td>
          </tr>
          <tr>
            <th scope="row">商品引渡時期</th>
            <td>{{ legal.delivery.timing }}</td>
          </tr>
          <tr>
            <th scope="row">商品引渡方法</th>
            <td>{{ legal.delivery.method }}</td>
          </tr>
          <tr>
            <th scope="row">返品・交換・キャンセル</th>
            <td>
              {{ legal.refund.summary }}<br>
              {{ legal.refund.defective_response }}<br>
              {{ legal.refund.defect_claim_deadline }}<br>
              {{ legal.refund.remedy_policy }}<br>
              {{ legal.refund.refund_method }}<br>
              {{ legal.refund.refund_fee_burden }}
            </td>
          </tr>
          <tr>
            <th scope="row">解約条件</th>
            <td>{{ legal.cancellation.subscription }}</td>
          </tr>
          <tr>
            <th scope="row">銀行振込先の開示方針</th>
            <td>{{ legal.payment.bank_account_policy }}</td>
          </tr>
          <tr>
            <th scope="row">問い合わせ窓口の運用</th>
            <td>{{ legal.support.operation_hours }}<br>{{ legal.support.first_response_sla }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {% include legal-links.html title="関連ポリシー" compact=true %}
  </div>
</section>
