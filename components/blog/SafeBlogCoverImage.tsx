"use client";

import { useState } from "react";

interface SafeBlogCoverImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function SafeBlogCoverImage({ src, alt, className, priority }: SafeBlogCoverImageProps) {
  const fallbackSrc = "/images/blog/default-cover.svg";
  
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (!src || typeof src !== "string" || src.includes("[object Object]") || src === "undefined" || src === "null") {
      return fallbackSrc;
    }
    return src;
  });
  
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt || "Blog cover image"}
      className={className}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
