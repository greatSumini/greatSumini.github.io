import React from 'react';
import styled from 'styled-components';

import theme from 'styles/theme';

const SKILLS = [
  ['react.png', 'django.png', 'express.svg'],
  ['git.png', 'aws.png', 'circleci.png', 'notion.png'],
  ['figma.png', 'photoshop.png', 'illustrator.png'],
];

export default function SkillSection() {
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Things>things</Things>
          <ICanDo>i can do</ICanDo>
        </TitleWrapper>
        {SKILLS.map((skillRow) => (
          <Row>
            {skillRow.map((skill) => (
              <SkillImgWrapper>
                <SkillImg src={`/images/icon/skills/${skill}`} />
              </SkillImgWrapper>
            ))}
          </Row>
        ))}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  margin-top: 40px;
  padding: 60px;
  padding-bottom: 212px;
  ${theme.media.phone`
    padding: 16px 24px;
    padding-bottom: 140px;
  `}
`;

const TitleWrapper = styled.div`
  padding-top: 16px;
`;

const StyledP = styled.p`
  margin: 0;
`;

const Things = styled(StyledP)`
  font-size: 3rem;
  font-weight: 300;
  ${theme.media.phone`
    font-size: 2rem;
  `}
`;

const ICanDo = styled(StyledP)`
  font-size: 4rem;
  font-weight: 700;
  ${theme.media.phone`
    font-size: 3rem;
  `}
`;

const Row = styled.div`
  width: 960px;
  height: 170px;
  margin-top: 70px;
  display: flex;
  flex-direction: row;
  ${theme.media.tablet`
    width: 630px;
    height: 70px;
  `}
  ${theme.media.phone`
    width: 328px;
    height: 50px;
    margin-top: 30px;
  `}
`;

const SkillImgWrapper = styled.div`
  width: fit-content;
  min-width: 164px;
  ${theme.media.tablet`
    min-width: 132px;
  `}
  ${theme.media.phone`
    min-width: 72px;
  `}
`;

const SkillImg = styled.img`
  height: 96px;
  ${theme.media.tablet`
    height: 80px;
  `}
  ${theme.media.phone`
  height: 40px;
  `}
`;
