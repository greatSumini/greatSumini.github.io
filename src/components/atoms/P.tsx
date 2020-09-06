import React from 'react';
import styled from 'styled-components';

import { BLACK } from './colors';

type PProps = {
  level?: number;
  color?: 'PRIMARY' | string;
  fontWeight?: number | FontWeight | string;
  width?: string;
  height?: string;
  textAlign?: string;
  ellipsis?: boolean;
  preWrap?: boolean;
  pxSize?: number;
  lineHeight?: number | string;
  numOfLines?: number;
  textDecoration?:
    | 'none'
    | 'line-through'
    | ' overline'
    | 'underline'
    | ' initial'
    | ' inherit';
} & React.HTMLAttributes<HTMLParagraphElement>;

const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

const SKETCH_LINE = [15, 18, 22, 24, 29];

function P(props: PProps) {
  const {
    width,
    height,
    style,
    children,
    onClick,
    textAlign,
    ellipsis,
    preWrap,
    className,
    level = 0,
    color = BLACK,
    fontWeight = 'regular',
    pxSize,
    lineHeight,
    numOfLines = 1,
    textDecoration = 'none',
  } = props;

  const _P = styled.p`
    padding: 0;
    margin: 0;
    font-size: ${pxSize ? `${pxSize}px` : `${1 + level * 0.2}rem`};
    color: ${color};
    font-weight: ${typeof fontWeight === 'number'
      ? fontWeight
      : FONT_WEIGHT[fontWeight]};
    width: ${width || 'fit-content'};
    height: ${height || 'fit-content'};
    text-align: ${textAlign || 'left'};
    text-decoration: ${textDecoration};
    line-height: ${lineHeight
      ? lineHeight
      : SKETCH_LINE[level] / (10 + level * 2)};
    letter-spacing: -0.56px;
    word-break: break-all;
    ${ellipsis &&
    `white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      overflow: hidden;
      height:auto;
    `}
    ${preWrap &&
    `
    white-space: pre-wrap; word-break: keep-all;
    `}
    ${numOfLines > 1 &&
    `
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${numOfLines};
      `}
  `;
  return (
    <_P className={className} style={style} onClick={onClick}>
      {children}
    </_P>
  );
}

export enum FontWeight {
  Light = 'light',
  Regular = 'regular',
  Medium = 'medium',
  SemiBold = 'semiBold',
  Bold = 'bold',
}
export default React.memo(P);
