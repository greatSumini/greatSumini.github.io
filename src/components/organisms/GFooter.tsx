import React from 'react';
import styled from 'styled-components';

import { LIGHT_GREY } from 'components/atoms/colors';
import { Img } from 'components/atoms';

const ICONS = [
  {
    href: 'https://github.com/greatSumini',
    src: '/images/icon/github-light.png',
    alt: 'github-icon',
  },
  {
    href: 'mailto:greatSumini@gmail.com',
    src: '/images/icon/email.svg',
    alt: 'mail-icon',
  },
  {
    href: 'https://greatsumini.github.io/rss.xml',
    src: '/images/icon/rss.svg',
    alt: 'rss-icon',
  },
];

export default function GFooter() {
  return (
    <StyledFooter>
      <MiddleWrapper>
        <Row>
          <Img
            src="/images/profile.png"
            width={32}
            height={32}
            alt="profile-image"
            style={{
              marginRight: '8px',
            }}
          />
          <StyledP>Choi su min</StyledP>
        </Row>
        <Description>Sogang Univ.</Description>
        <Description>CTO in thinking-muggles</Description>
        <Description>Anyang, Gyeong-gi, Republic of Korea</Description>
        <Row>
          {ICONS.map(({ href, src, alt }) => (
            <a href={href}>
              <IconImg {...{ src, alt }} />
            </a>
          ))}
        </Row>
      </MiddleWrapper>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  width: 100vw;
  background-color: ${LIGHT_GREY};
  padding: 40px;
  @media only screen and (max-width: 828px) {
    padding: 16px;
  }
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

const StyledP = styled.p`
  margin: 0;
  font-size: 1.4rem;
`;

const Description = styled(StyledP)`
  && {
    font-size: 0.8rem;
    margin-bottom: 8px;
  }
`;

const IconImg = styled(Img).attrs(() => ({
  width: 20,
  height: 20,
}))`
  margin-top: 8px;
  margin-right: 20px;
  margin-bottom: -20px;
`;
