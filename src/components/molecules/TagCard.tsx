import React from 'react';
import styled from 'styled-components';

export type TagCardProps = {
  label: string;
};

export default function TagCard({ label }: TagCardProps) {
  return (
    <Wrapper href={`/tag/${label}`}>
      <Label>#{label}</Label>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  padding: 4px;
  background-color: #eff1ff;
  text-decoration: none;
`;

const Label = styled.p`
  color: #2d50ff;
  font-size: 12px;
  font-weight: 400;
`;
