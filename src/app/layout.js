import { Montserrat, Open_Sans } from 'next/font/google'
import Header from '@/Components/layout/Header'
import Footer from '@/Components/layout/Footer'
import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'ACE Uganda - African Center of Excellence in Bioinformatics',
  description: 'ACE-Uganda is dedicated to advancing health outcomes through innovative High-Performance Computing (HPC), Bioinformatics, Visualization, and Data Science.',
  keywords: ['bioinformatics', 'HPC', 'data science', 'Uganda', 'research', 'genomics', 'cancer research', 'AMR'],
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable}`} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}