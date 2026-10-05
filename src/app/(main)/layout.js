import Header from '@/Components/layout/Header'
import Footer from '@/Components/layout/Footer'
import { Analytics } from '@/lib/analytics'

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <Analytics />
    </>
  )
}
