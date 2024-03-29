import React from 'react';
import styled from 'styled-components';

import ChipLink, { ChipLinkProps } from 'components/molecules/ChipLink';
import { TRUE_BLACK } from 'components/atoms/colors';

import theme from 'styles/theme';

const CHIPS: ChipLinkProps[] = [
  {
    label: 'GitHub',
    src: '/images/icon/github-dark.png',
    backgroundColor: TRUE_BLACK,
    href: 'https://github.com/greatSumini',
  },
  {
    label: 'maplestory',
    src: '/images/icon/maplestory.png',
    backgroundColor: '#7B5D0F',
    href: 'https://maple.gg/u/%EB%82%B4%EC%9D%B4%EB%A6%84%EC%B5%9C%EC%88%98%EB%AF%BC',
  },
];

export default function ProfileSection() {
  return (
    <>
      <Wrapper>
        <DescriptionWrapper>
          <Name>sumin choi,</Name>
          <Role>full stack developer</Role>
          <Company>
            in <a href="https://awesome.dev">AWESOME.DEV</a>
          </Company>
        </DescriptionWrapper>
        <ProfileImage src="/images/profile.png" />
      </Wrapper>
      <div style={{ position: 'relative' }}>
        <ChipWrapper>
          {CHIPS.map((chip) => (
            <ChipLink key={chip.label} {...chip} />
          ))}
        </ChipWrapper>
      </div>
    </>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 60px;
  padding-bottom: 212px;
  ${theme.media.phone`
    flex-direction: column;
    padding: 16px 24px;
  `}
`;

const DescriptionWrapper = styled.div`
  padding-top: 16px;
`;

const StyledP = styled.p`
  margin: 0;
`;

const Name = styled(StyledP)`
  font-size: 4rem;
  font-weight: 700;
  ${theme.media.phone`
    font-size: 3rem;
  `}
`;

const Role = styled(StyledP)`
  font-size: 3rem;
  font-weight: 500;
  ${theme.media.phone`
    font-size: 2rem;
  `}
`;

const Company = styled(StyledP)`
  font-size: 3rem;
  font-weight: 300;
  ${theme.media.phone`
    font-size: 2rem;
  `}

  a {
    color: black;
    font-weight: 600;
    transition: all 0.5s;

    &:hover {
      color: skyblue;
    }
  }
`;

const ProfileImage = styled.img`
  width: 320px;
  height: 333px;

  ${theme.media.tablet`
  width: 242px;
  height: 253px;
  margin-right: -16px;
  `}

  ${theme.media.phone`
  width: 172px;
  height: 179px;
  margin-left: auto;
  margin-right: -16px;
  `}
`;

const ChipWrapper = styled.div`
  position: absolute;
  left: 60px;
  bottom: 200px;
  display: flex;
  flex-direction: row;
  ${theme.media.phone`
    flex-direction: column;
    left: 24px;
    bottom: 105px;
  `}
`;
