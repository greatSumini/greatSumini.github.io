import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import { BACKGROUND_BLACK, WHITE, BLACK, LIGHT_GREY } from '../atoms/colors';
import { P, Strong } from '../atoms';

import { useScrollY } from 'hooks/util';

export type GNBProps = {
  isMain: boolean;
};

export default function GNB({ isMain }: GNBProps) {
  const scrollY = useScrollY();
  const isScrolled = scrollY !== 0;

  return (
    <StyledHeader isScrolled={isScrolled}>
      <Title level={6} isScrolled={isScrolled}>
        <NavLink to={`/`} activeClassName="on" isScrolled={isScrolled}>
          {isMain ? (
            'ㅤ'
          ) : (
            <>
              sumin{' '}
              <StyledStrong level={6} isScrolled={isScrolled}>
                dev
              </StyledStrong>
            </>
          )}
        </NavLink>
      </Title>
      <NavLinkText level={6} isScrolled={isScrolled}>
        <NavLink to={`/posts`} activeClassName="on" isScrolled={isScrolled}>
          posts
        </NavLink>
      </NavLinkText>
      <NavLinkText level={6} isScrolled={isScrolled}>
        <NavLink
          to={`/projects`}
          className="logo"
          activeClassName="on"
          isScrolled={isScrolled}
        >
          projects
        </NavLink>
      </NavLinkText>
    </StyledHeader>
  );
}

const StyledHeader = React.memo(styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 74px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0 28px;
  background: transparent;
  transition: background 0.3s;
  ${(props: { isScrolled: boolean }) =>
    props.isScrolled &&
    `
    background: ${BACKGROUND_BLACK};
  `}
`);

const StyledP = styled(P)`
  && {
    font-family: Avant Garde;
    transition: color 0.3s;
    ${(props: { isScrolled: boolean }) =>
      props.isScrolled &&
      `
      color: ${WHITE};
    `}
  }
`;

const StyledStrong = styled(Strong)`
  && {
    transition: color 0.3s;
    ${(props: { isScrolled: boolean }) =>
      props.isScrolled &&
      `
      color: ${LIGHT_GREY};
    `}
  }
`;

const Title = styled(StyledP)`
  && {
    margin-right: auto;
  }
`;

const NavLinkText = styled(StyledP)`
  && {
    margin-left: 34px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  &:hover {
    ${(props: { isScrolled: boolean }) =>
      `
      color: ${props.isScrolled ? LIGHT_GREY : BLACK};
    `}
  }
  color: #444;
  &.on {
    color: #000;
    ${(props: { isScrolled: boolean }) =>
      props.isScrolled &&
      `
      color: ${LIGHT_GREY};
    `}
  }
  ${(props: { isScrolled: boolean }) =>
    props.isScrolled &&
    `
    color: ${WHITE};
  `}
`;
