import React from 'react';
import styled from 'styled-components';

import { LIGHT_GREY } from 'components/atoms/colors';
import { Img, P } from 'components/atoms';

export default function GFooter() {
  return (
    <StyledFooter>
      <MiddleWrapper>
        <Row>
          <Img
            src="/images/profile.png"
            width={40}
            height={40}
            alt="profile-image"
            style={{
              marginRight: '8px',
            }}
          />
          <P level={3}>Choi su min</P>
        </Row>
        <Description>Sogang Univ.</Description>
        <Description>CTO in thinking-muggles</Description>
        <Description>Anyang, Gyeong-gi, Republic of Korea</Description>
        <Row>
          <a href="https://github.com/greatSumini">
            <IconImg src="images/icon/github-light.png" alt="github-icon" />
          </a>
          <a href="https://github.com/greatSumini">
            <IconImg src="images/icon/email.svg" alt="github-icon" />
          </a>
          <a href="https://github.com/greatSumini">
            <IconImg src="images/icon/rss.svg" alt="github-icon" />
          </a>
        </Row>
      </MiddleWrapper>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100vw;
  background-color: ${LIGHT_GREY};
  padding: 40px;
`;

const MiddleWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1160px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Description = styled(P).attrs(() => ({}))`
  && {
    margin-bottom: 8px;
  }
`;

const IconImg = styled(Img).attrs(() => ({
  width: 32,
  height: 32,
}))`
  margin-top: 8px;
  margin-right: 20px;
  margin-bottom: -20px;
`;
