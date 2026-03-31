import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '@/components/site-layout'
import { normalizePath, newsPosts } from '@/data/site-content'
import {
  AccountReturnPage,
  BillingCancelPage,
  BillingSuccessPage,
  CommercialTransactionsPage,
  ContactPage,
  DownloadPage,
  FaqPage,
  HomePage,
  InstructionsPage,
  NewsPage,
  NewsPostPage,
  NotFoundPage,
  PrivacyPolicyPage,
  PurchasePage,
  RefundPolicyPage,
  TermsPage,
  UpdatePage,
  BlogIndex,
  BlogPost,
} from '@/pages'

function App() {
  const location = useLocation()

  useEffect(() => {
    const path = normalizePath(location.pathname)
    document.documentElement.lang = 'ja'
    document.body.classList.add('brand-body')
    const isHome = path === '/'
    document.body.classList.toggle('brand-home', isHome)
    document.documentElement.classList.toggle('brand-home', isHome)
  }, [location.pathname])

  return (
    <Routes>
      <Route caseSensitive path="/Instructions" element={<Navigate to="/instructions/" replace />} />
      <Route caseSensitive path="/Instructions/" element={<Navigate to="/instructions/" replace />} />
      <Route caseSensitive path="/FAQ" element={<Navigate to="/faq/" replace />} />
      <Route caseSensitive path="/FAQ/" element={<Navigate to="/faq/" replace />} />

      <Route path="/account" element={<AccountReturnPage />} />
      <Route path="/account/" element={<AccountReturnPage />} />
      <Route path="/billing/success" element={<BillingSuccessPage />} />
      <Route path="/billing/success/" element={<BillingSuccessPage />} />
      <Route path="/billing/cancel" element={<BillingCancelPage />} />
      <Route path="/billing/cancel/" element={<BillingCancelPage />} />

      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="download" element={<DownloadPage />} />
        <Route path="download/" element={<DownloadPage />} />
        <Route path="instructions" element={<InstructionsPage />} />
        <Route path="instructions/" element={<InstructionsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="faq/" element={<FaqPage />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="blog/:slug/" element={<BlogPost />} />
        <Route path="purchase" element={<PurchasePage />} />
        <Route path="purchase/" element={<PurchasePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="contact/" element={<ContactPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/" element={<NewsPage />} />
        <Route path="update" element={<UpdatePage />} />
        <Route path="update/" element={<UpdatePage />} />
        <Route path="legal/commercial-transactions" element={<CommercialTransactionsPage />} />
        <Route path="legal/commercial-transactions/" element={<CommercialTransactionsPage />} />
        <Route path="legal/terms" element={<TermsPage />} />
        <Route path="legal/terms/" element={<TermsPage />} />
        <Route path="legal/privacy" element={<PrivacyPolicyPage />} />
        <Route path="legal/privacy/" element={<PrivacyPolicyPage />} />
        <Route path="legal/refund-policy" element={<RefundPolicyPage />} />
        <Route path="legal/refund-policy/" element={<RefundPolicyPage />} />
        <Route path="404.html" element={<NotFoundPage />} />
        {newsPosts.map((post) => (
          <Route
            key={post.path}
            path={post.path.replace(/^\/|\/$/g, '')}
            element={<NewsPostPage post={post} />}
          />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
