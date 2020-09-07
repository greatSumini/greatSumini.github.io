import React from 'react';
import styled from 'styled-components';

import GNB from 'components/organisms/GNB';
import GFooter from 'components/organisms/GFooter';
import theme from 'styles/theme';

declare const __PATH_PREFIX__;

export default function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`;

  const isMain = location.pathname === rootPath;
  return (
    <Wrapper>
      <GNB isMain={isMain} />
      <Main>{children}</Main>
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
  max-width: 1160px;
  margin: 0 auto;
`;
