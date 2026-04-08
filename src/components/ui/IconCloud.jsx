import React, { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export function IconCloud({ icons, images, size = 400 }) {
  const canvasRef = useRef(null)
  const [iconPositions, setIconPositions] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState(null)
  const animationFrameRef = useRef(0)
  const rotationRef = useRef({ x: 0, y: 0 })
  const iconCanvasesRef = useRef([])
  const imagesLoadedRef = useRef([])
  const radius = size * 0.25

  useEffect(() => {
    if (!icons && !images) return

    const items = icons ?? images ?? []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 60
      offscreen.height = 60
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        if (images) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index]
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.beginPath()
            offCtx.arc(30, 30, 30, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()
            offCtx.drawImage(img, 0, 0, 60, 60)
            imagesLoadedRef.current[index] = true
          }
        } else {
          offCtx.scale(0.4, 0.4)
          const svgString = renderToString(item)
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(svgString)
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0)
            imagesLoadedRef.current[index] = true
          }
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [icons, images])

  useEffect(() => {
    const items = icons ?? images ?? []
    const newIcons = []
    const numIcons = items.length || 20
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment
      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r
      newIcons.push({ x: x * radius, y: y * radius, z: z * radius, scale: 1, opacity: 1, id: i })
    }
    setIconPositions(newIcons)
  }, [icons, images])

  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)
      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX
      const screenX = canvasRef.current.width / 2 + rotatedX
      const screenY = canvasRef.current.height / 2 + rotatedY
      const scale = (rotatedZ + radius * 2) / (radius * 3)
      const iconRadius = 30 * scale
      const dx = x - screenX
      const dy = y - screenY

      if (dx * dx + dy * dy < iconRadius * iconRadius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z))
        const targetY = Math.atan2(icon.x, icon.z)
        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2))
        const duration = Math.min(2000, Math.max(800, distance * 1000))
        setTargetRotation({ x: targetX, y: targetY, startX: currentX, startY: currentY, distance, startTime: performance.now(), duration })
        return
      }
    })

    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }
      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (canvas && ctx) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
        const dx = mousePos.x - centerX
        const dy = mousePos.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const speed = 0.003 + (distance / maxDistance) * 0.01

        if (targetRotation) {
          const elapsed = performance.now() - targetRotation.startTime
          const progress = Math.min(1, elapsed / targetRotation.duration)
          const easedProgress = easeOutCubic(progress)
          rotationRef.current = {
            x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
            y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress,
          }
          if (progress >= 1) setTargetRotation(null)
        } else if (!isDragging) {
          rotationRef.current = {
            x: rotationRef.current.x + (dy / canvas.height) * speed,
            y: rotationRef.current.y + (dx / canvas.width) * speed,
          }
        }

        iconPositions.forEach((icon, index) => {
          const cosX = Math.cos(rotationRef.current.x)
          const sinX = Math.sin(rotationRef.current.x)
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)
          const rotatedX = icon.x * cosY - icon.z * sinY
          const rotatedZ = icon.x * sinY + icon.z * cosY
          const rotatedY = icon.y * cosX + rotatedZ * sinX
          const scale = (rotatedZ + radius * 2) / (radius * 3)
          const opacity = Math.max(0.2, Math.min(1, (rotatedZ + radius * 1.5) / (radius * 2)))

          ctx.save()
          ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
          ctx.scale(scale, scale)
          ctx.globalAlpha = opacity

          if (icons || images) {
            if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
              ctx.drawImage(iconCanvasesRef.current[index], -30, -30, 60, 60)
            }
          } else {
            ctx.beginPath()
            ctx.arc(0, 0, 20, 0, Math.PI * 2)
            ctx.fillStyle = "#00BBFF"
            ctx.fill()
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = "16px Arial"
            ctx.fillText(`${icon.id + 1}`, 0, 0)
          }
          ctx.restore()
        })
        animationFrameRef.current = requestAnimationFrame(animate)
      }
      animate()
    }
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-lg cursor-grab active:cursor-grabbing w-full max-w-full"
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  )
}
