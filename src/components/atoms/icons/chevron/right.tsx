import React from 'react';

import { IconProps } from '../icons';

import { SEMI_MIDDLE_GREY } from 'components/atoms/colors';

export default function ChevronRightIcon({
  style = {},
  fill = SEMI_MIDDLE_GREY,
}: Partial<IconProps>) {
  return (
    <svg
      style={{ width: '20px', height: '20px', ...style }}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <polygon points="5.09 20.02 4.05 18.95 13.21 10.01 4.05 1.07 5.09 0 15.36 10.01 5.09 20.02" />
    </svg>
  );
}
