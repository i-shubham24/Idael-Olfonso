let cached

/**
 * True when WebGL runs on the CPU (hardware acceleration off, some VMs and
 * remote desktops). We then drop the grain layer so scrolling stays smooth.
 */
export function isSoftwareGL() {
  if (cached !== undefined) return cached
  cached = false
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl')
    if (!gl) return (cached = true)
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : ''
    cached = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(String(renderer))
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }
  return cached
}

export const canvasDpr = () => (isSoftwareGL() ? 0.75 : [1, 1.3])
