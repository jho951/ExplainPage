'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import clsx from 'clsx';

import type { ImageProps } from './Image.types';

import { BLUR_DATA_URL, FALL_BACK_IMAGE } from '@/constants/image';

import styles from '@/components/atoms/image/Image.module.css';

function Image({
  src,
  alt,
  className,
  fill,
  width,
  height,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  sizes,
  priority = false,
  unoptimized = false,
  fallbackSrc = FALL_BACK_IMAGE,
  containerClassName,
  containerStyle,
  aspectRatio,
  showSkeleton = true,
  onLoad,
  onError,
  ...rest
}: ImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const finalSrc = !src || hasError ? fallbackSrc : src;
  const shouldFill = Boolean(fill || !width || !height);
  const resolvedAspectRatio = aspectRatio ?? (width && height ? `${width}/${height}` : '16/9');

  const handleError: NonNullable<ImageProps['onError']> = event => {
    if (!hasError && finalSrc !== fallbackSrc) {
      setHasError(true);
      setIsLoaded(false);
    }
    onError?.(event);
  };

  const handleLoad: NonNullable<ImageProps['onLoad']> = event => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  return (
    <figure
      className={clsx(
        styles.imageContainer,
        showSkeleton && !isLoaded && styles.skeleton,
        containerClassName,
      )}
      style={shouldFill ? { aspectRatio: resolvedAspectRatio, ...containerStyle } : containerStyle}
    >
      <NextImage
        className={clsx(styles.image, isLoaded && styles.loaded, className)}
        src={finalSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? (blurDataURL ?? BLUR_DATA_URL) : undefined}
        loading={loading}
        unoptimized={unoptimized}
        sizes={sizes ?? (shouldFill ? '100vw' : undefined)}
        priority={priority}
        {...(shouldFill ? { fill: true } : { width, height })}
        {...rest}
      />
    </figure>
  );
}

export { Image };
