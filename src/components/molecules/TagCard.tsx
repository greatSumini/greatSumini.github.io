import React from 'react';
import styled from 'styled-components';

export type TagCardProps = {
  label: string;
  size: 'small' | 'large';
  count?: number;
  routing?: boolean;
  selected?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
};

export default function TagCard({
  label,
  size,
  count,
  routing = true,
  selected = false,
  onClick,
}: TagCardProps) {
  return (
    <Wrapper
      href={routing ? `/posts?tag=${label}` : null}
      size={size}
      selected={selected}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
        if (!routing) {
          history.replaceState(null, null, `/posts?tag=${label}`);
        }
      }}
    >
      <Label size={size}>
        #{label} {count}
      </Label>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  background-color: #eff1ff;
  text-decoration: none;
  margin: 5px;
  ${(props: { size; selected }) => ` 
    padding: ${props.size === 'small' ? 4 : 8}px;
    ${props.selected && 'background-color: #d5dcff;'}
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
