import React from 'react';
import styled from 'styled-components';

import ChipLink, { ChipLinkProps } from 'components/molecules/ChipLink';
import { TRUE_BLACK } from 'components/atoms/colors';

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
    href: 'https://maple.gg/u/%EC%9D%BC%EB%B0%98%EB%AC%BC%EB%A6%AC%ED%95%99ii',
  },
];

export default function ProfileSection() {
  return (
    <>
      <Wrapper>
        <DescriptionWrapper>
          <Name>sumin choi,</Name>
          <Role>full stack developer</Role>
          <Company>in thinking-muggles</Company>
        </DescriptionWrapper>
        <ProfileImg src="/images/profile.png" />
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 60px;
  padding-bottom: 212px;
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
`;

const Role = styled(StyledP)`
  font-size: 3rem;
  font-weight: 500;
`;

const Company = styled(StyledP)`
  font-size: 3rem;
  font-weight: 300;
`;

const ProfileImg = styled.img`
  width: 320px;
  height: 333px;
`;

const ChipWrapper = styled.div`
  position: absolute;
  left: 60px;
  bottom: 240px;
  display: flex;
  flex-direction: row;
`;
