import type { ImageProps as NextImageProps } from 'next/image';
import type { CSSProperties } from 'react';

type ImageSrc = NonNullable<NextImageProps['src']>;

type ImageProps = Omit<NextImageProps, 'src'> & {
  src?: ImageSrc | null;
  fallbackSrc?: ImageSrc;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  aspectRatio?: CSSProperties['aspectRatio'];
  showSkeleton?: boolean;
};

export type { ImageProps };
