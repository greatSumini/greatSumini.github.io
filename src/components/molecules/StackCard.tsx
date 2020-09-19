import React from 'react';
import styled from 'styled-components';

export type StackCardProps = {
  label: string;
};

export default function StackCard({ label }: StackCardProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  background-color: #eff1ff;
  text-decoration: none;
  margin: 5px;
  padding: 12px 16px;
  border-radius: 9999px;
`;

const Label = styled.p`
  color: #2d50ff;
  font-size: 22px;
  font-size: 700;
  font-weight: 400;
`;
