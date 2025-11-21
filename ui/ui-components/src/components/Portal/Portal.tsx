import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children: React.ReactNode
  containerId?: string
}

export const Portal: React.FC<PortalProps> = ({ children, containerId = 'portal-root' }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let portalContainer = document.getElementById(containerId)

    if (!portalContainer) {
      portalContainer = document.createElement('div')
      portalContainer.id = containerId
      document.body.appendChild(portalContainer)
    }

    setContainer(portalContainer)

    return () => {
      if (portalContainer && portalContainer.childNodes.length === 0) {
        portalContainer.remove()
      }
    }
  }, [containerId])

  if (!container) return null

  return createPortal(children, container)
}

Portal.displayName = 'Portal'

