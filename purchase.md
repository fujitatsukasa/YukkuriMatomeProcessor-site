---
layout: page
title: 購入ページ
permalink: /purchase/
---

<script async src="https://js.stripe.com/v3/buy-button.js"></script>
<style>
  body {
    background: #f9f9f9;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
  .container {
    width: 100%;
    max-width: 1200px; /* コンテナ横幅を1200pxに */
    margin: 50px auto;
    padding: 20px;
    text-align: center;
  }
  .stripe-card-container {
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }
  .stripe-card-container stripe-buy-button {
    width: 100%;
    display: block;
  }
</style>

<div class="container">
  <div class="stripe-card-container">
    <stripe-buy-button
      buy-button-id="buy_btn_1QshtOChh4Fm0GSYwfZLWVwC"
      publishable-key="pk_test_51QnFDQChh4Fm0GSYyQzyFlYjy6AhNb5M5oNX36bjZ9SBblVeWAnhr9REqhnyP4ZruBesYv1oczyAjHrt1YBKFdCG00b5H1m9GQ">
    </stripe-buy-button>
  </div>
</div>
