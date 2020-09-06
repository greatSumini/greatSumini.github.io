import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../../utils/typography';
import GNB from '../organisms/GNB';
import styled from 'styled-components';

declare const __PATH_PREFIX__;

export default function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`;

  const isMain = location.pathname === rootPath;
  return (
    <Wrapper>
      <GNB isMain={isMain} />
      <Main>{children}</Main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 76px;
`;

const Main = styled.main`
  max-width: 1160px;
  margin: 0 auto;
  height: 2500px;
`;
