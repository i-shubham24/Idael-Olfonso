import { useEffect } from 'react'
import { brand } from '../content/site'

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${brand.name}` : `${brand.name} | Private training in ${brand.region}`
  }, [title])
}
