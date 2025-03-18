"use client"

import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { useState } from "react"

interface CustomImageProps extends NextImageProps {
  fallbackSrc?: string
}

export default function CustomImage({ fallbackSrc = "/placeholder.svg", ...props }: CustomImageProps) {
  const [src, setSrc] = useState(props.src)
  const [error, setError] = useState(false)

  const handleError = () => {
    if (!error) {
      setSrc(fallbackSrc)
      setError(true)
    }
  }

  return <NextImage {...props} src={src} onError={handleError} />
}

