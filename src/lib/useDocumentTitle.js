import { useEffect } from 'react'
import { useContent } from './i18n'

export function useDocumentTitle(title) {
  const { brand, t } = useContent()
  useEffect(() => {
    document.title = title ? `${title} | ${brand.name}` : t.meta.title
  }, [title, brand.name, t])
}
