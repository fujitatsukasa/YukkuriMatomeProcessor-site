import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '@/components/site-layout'
import { CompanyPage } from '@/pages/company-page'
import { CompanyAboutPage, CompanyServicesPage, CompanyPortfolioPage, CompanyWorkPage, CompanyInquiryPage, CompanyPrivacyPage } from '@/pages/company-documents'
import { companyWorks } from '@/data/company'
import { normalizePath, newsPosts } from '@/data/site-content'

const HomePage = lazy(() => import('@/pages/home-page').then((module) => ({ default: module.HomePage })))
const DownloadPage = lazy(() => import('@/pages/download-page').then((module) => ({ default: module.DownloadPage })))
const InstructionsPage = lazy(() =>
  import('@/pages/download-page').then((module) => ({ default: module.InstructionsPage })),
)
const FaqPage = lazy(() => import('@/pages/faq-page').then((module) => ({ default: module.FaqPage })))
const PurchasePage = lazy(() => import('@/pages/purchase-page').then((module) => ({ default: module.PurchasePage })))
const ContactPage = lazy(() => import('@/pages/contact-page').then((module) => ({ default: module.ContactPage })))
const NewsPage = lazy(() => import('@/pages/news-page').then((module) => ({ default: module.NewsPage })))
const UpdatePage = lazy(() => import('@/pages/update-page').then((module) => ({ default: module.UpdatePage })))
const SamplesPage = lazy(() => import('@/pages/samples-page').then((module) => ({ default: module.SamplesPage })))
const NewsPostPage = lazy(() => import('@/pages/news-post-page').then((module) => ({ default: module.NewsPostPage })))
const BlogIndex = lazy(() => import('@/pages/blog-index').then((module) => ({ default: module.BlogIndex })))
const BlogPost = lazy(() => import('@/pages/blog-post').then((module) => ({ default: module.BlogPost })))
const NotFoundPage = lazy(() => import('@/pages/system-pages').then((module) => ({ default: module.NotFoundPage })))
const AccountReturnPage = lazy(() =>
  import('@/pages/system-pages').then((module) => ({ default: module.AccountReturnPage })),
)
const BillingSuccessPage = lazy(() =>
  import('@/pages/system-pages').then((module) => ({ default: module.BillingSuccessPage })),
)
const BillingCancelPage = lazy(() =>
  import('@/pages/system-pages').then((module) => ({ default: module.BillingCancelPage })),
)
const TermsPage = lazy(() => import('@/pages/legal-pages').then((module) => ({ default: module.TermsPage })))
const PrivacyPolicyPage = lazy(() =>
  import('@/pages/legal-pages').then((module) => ({ default: module.PrivacyPolicyPage })),
)
const RefundPolicyPage = lazy(() =>
  import('@/pages/legal-pages').then((module) => ({ default: module.RefundPolicyPage })),
)
const CommercialTransactionsPage = lazy(() =>
  import('@/pages/legal-pages').then((module) => ({ default: module.CommercialTransactionsPage })),
)

function App() {
  const location = useLocation()

  useEffect(() => {
    const path = normalizePath(location.pathname)
    document.documentElement.lang = 'ja'
    document.body.classList.add('brand-body')
    const isHome = path === '/products/ymp/'
    document.body.classList.toggle('brand-home', isHome)
    document.documentElement.classList.toggle('brand-home', isHome)
  }, [location.pathname])

  return (
    <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
    <Routes>
      <Route path="/" element={<CompanyPage />} />
      <Route path="/about/" element={<CompanyAboutPage />} />
      <Route path="/services/" element={<CompanyServicesPage />} />
      <Route path="/portfolio/" element={<CompanyPortfolioPage />} />
      {companyWorks.map((work) => <Route key={work.slug} path={`/portfolio/${work.slug}/`} element={<CompanyWorkPage slug={work.slug} />} />)}
      <Route path="/inquiry/" element={<CompanyInquiryPage />} />
      <Route path="/privacy/" element={<CompanyPrivacyPage />} />
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

      <Route element={<SiteLayout />}>
        <Route path="products/ymp" element={<HomePage />} />
        <Route path="products/ymp/" element={<HomePage />} />
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
        <Route path="samples" element={<SamplesPage />} />
        <Route path="samples/" element={<SamplesPage />} />
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
    </Suspense>
  )
}

export default App
