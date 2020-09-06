import React from 'react';

export type ImgProps = {
  src: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
  over?: boolean;
  border?: boolean;
  alt: string;
  cover?: boolean;
} & React.HTMLAttributes<HTMLImageElement>;

function Img({
  className,
  src,
  onClick,
  style,
  children,
  alt,
  width,
  circle,
  over,
  height,
  border,
  cover = false,
}: ImgProps) {
  const imgStyle: React.CSSProperties = {
    width: width || '100%',
    borderRadius: circle && '50%',
    boxSizing: 'border-box',
    objectFit: cover ? 'cover' : undefined,
  };

  const overStyle: React.CSSProperties = over
    ? {
        height: 'auto',
        maxHeight: height || '100%',
        overflow: 'hidden',
        objectFit: 'cover',
        objectPosition: 'top',
      }
    : { height: height || '100%' };

  const borderStyle = border
    ? {
        border: '0.1rem solid #f0f0f0',
      }
    : {};

  return (
    <img
      style={{
        ...imgStyle,
        ...overStyle,
        ...borderStyle,
        ...style,
      }}
      {...{ className, src, onClick, alt }}
    >
      {children}
    </img>
  );
}

export default React.memo(Img);
