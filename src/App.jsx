import { Outlet, createBrowserRouter, useLocation } from 'react-router'
import { ScrollProvider } from './lib/scroll'
import { TransitionProvider } from './lib/transition'
import { LocaleProvider } from './lib/i18n'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Grain from './components/Grain'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import About from './pages/About'
import Service from './pages/Service'
import Book from './pages/Book'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

/*
  z-index scale (kept small on purpose):
  0 grain (behind everything), 1 footer, 2 page content (so dropdowns can open over
  the footer), 50 nav, 60 mobile menu, 70 skip link,
  90 route transition, 95 loader, 100 cursor
*/
function RootLayout() {
  const { pathname } = useLocation()
  return (
    <LocaleProvider>
      <ScrollProvider>
        <TransitionProvider>
          <Grain />
          <Loader />
          <Nav />
          <main id="main" tabIndex={-1} className="relative z-[2] outline-none">
            <Outlet />
          </main>
          <div className="relative z-[1]">
            <Footer cta={!pathname.startsWith('/book')} />
          </div>
          <Cursor />
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
