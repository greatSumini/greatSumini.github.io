import React from 'react';
import styled from 'styled-components';

export type TagCardProps = {
  label: string;
  size: 'small' | 'large';
};

export default function TagCard({ label, size }: TagCardProps) {
  return (
    <Wrapper href={`/tag/${label}`} size={size}>
      <Label size={size}>#{label}</Label>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  background-color: #eff1ff;
  text-decoration: none;
  ${(props: { size }) => ` 
    padding: ${props.size === 'small' ? 4 : 8}px;
    margin: ${props.size === 'small' ? 5 : 10}px;
  `}
  &:hover {
    background-color: #d5dcff;
  }
`;

const Label = styled.p`
  color: #2d50ff;
  ${(props: { size }) => ` 
  font-size: ${props.size === 'small' ? 12 : 18}px;
  `}
  font-weight: 400;
`;
