import { css } from 'styled-components';

const sizes = {
  desktop: 1167,
  tablet: 778,
  phone: 576,
};

// Iterate through the sizes and create a media template
const media = {
  desktop: (...args) => undefined,
  tablet: (...args) => undefined,
  phone: (...args) => undefined,
};

Object.keys(sizes).reduce((acc, label: string) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(args.shift(), ...args)}
    }
  `;
  return acc;
}, media);

const color = {
  TRUE_BLACK: '#000',
  BLACK: '#222',
  SEMI_MIDDLE_GREY: '#5D5D5D',
  MIDDLE_GREY: '#AAA',
  HOLDER_GREY: '#C0C0C0',
  REGULAR_GREY: '#d8d8d8',
  SEMI_LIGHT_GREY: 'E8E8E8',
  LIGHT_GREY: '#F2F2F2',
  SALE_RED: '#EA4C4C',
  SUCCESS_BLUE: '#5577f5',
  WHITE: '#FFF',
  BACKGROUND_BLACK: '#00020B',
  BORDER_GREY: '#e1e1e1',
  HIGHLIGHT_PRIMARY: '#6937A1',
  DELIVERY_BLUE: '#8fc9e3',
};

const theme = {
  color,
  media,
};

export type Theme = typeof theme;
export default theme;
