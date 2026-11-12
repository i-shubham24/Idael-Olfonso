import { Suspense, lazy, useEffect } from 'react'
import { Outlet, createBrowserRouter } from 'react-router'
import { ScrollProvider } from './lib/scroll'
import { TransitionProvider } from './lib/transition'
import { LocaleProvider } from './lib/i18n'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Grain from './components/Grain'
import Newsletter from './components/Newsletter'
import Home from './pages/Home'
// Only the home page ships in the first download; the rest load when visited.
const About = lazy(() => import('./pages/About'))
const Service = lazy(() => import('./pages/Service'))
const Book = lazy(() => import('./pages/Book'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

/*
  z-index scale (kept small on purpose):
  0 grain, 1 footer, 2 page content (so dropdowns can open over the footer),
  50 nav, 60 mobile menu, 70 skip link, 80 updates pop-up
*/
function RootLayout() {
  // Fetch the other pages quietly once the home page has settled, so moving between pages never waits.
  useEffect(() => {
    const id = setTimeout(() => {
      import('./pages/About')
      import('./pages/Service')
      import('./pages/Book')
    }, 3000)
    return () => clearTimeout(id)
  }, [])

  return (
    <LocaleProvider>
      <ScrollProvider>
        <TransitionProvider>
          <Grain />
          <Nav />
          <main id="main" tabIndex={-1} className="relative z-[2] outline-none">
            <Suspense fallback={<div className="min-h-[100svh]" />}>
              <Outlet />
            </Suspense>
          </main>
          <div className="relative z-[1]">
            <Footer />
          </div>
          <Newsletter />
        </TransitionProvider>
      </ScrollProvider>
    </LocaleProvider>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services/:slug', element: <Service /> },
      { path: 'book', element: <Book /> },
      { path: 'privacy', element: <Legal page="privacy" /> },
      { path: 'imprint', element: <Legal page="imprint" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
