import React from 'react';
import styled from 'styled-components';

import GNB from 'components/organisms/GNB';
import GFooter from 'components/organisms/GFooter';
import theme from 'styles/theme';

declare const __PATH_PREFIX__;

export type LayoutProps = {
  isBlog?: boolean;
  location;
  title;
  children;
};

export default function Layout({
  location,
  title,
  children,
  isBlog,
}: LayoutProps) {
  const rootPath = `${__PATH_PREFIX__}/`;

  const isMain = location.pathname === rootPath;
  return (
    <Wrapper>
      <GNB isMain={isMain} />
      <Main isBlog={isBlog}>{children}</Main>
      <GFooter />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 76px;
  ${theme.media.tablet`
    padding-top: 55px;
  `}
`;

const Main = styled.main`
  width: 100vw;
  max-width: ${(props: { isBlog: boolean }) => (props.isBlog ? 900 : 1160)}px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
