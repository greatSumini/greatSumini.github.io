import React from 'react';
import styled from 'styled-components';
import { Img } from 'components/atoms';
import { WHITE } from 'components/atoms/colors';

export type ChipLinkProps = {
  src: string;
  href: string;
  label: string;
  backgroundColor: string;
};

export default function ChipLink({
  src,
  href,
  label,
  backgroundColor,
}: ChipLinkProps) {
  return (
    <Wrapper style={{ backgroundColor }} href={href}>
      <Img src={src} alt={label} width={20} height={20} />
      <StyledP>{label}</StyledP>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  height: 28px;
  padding: 8px;
  margin-right: 12px;
  border-radius: 9999px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
`;

const StyledP = styled.p`
  margin: 0;
  margin-left: 6px;
  font-weight: 400;
  font-size: 16px;
  color: ${WHITE};
`;
