import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';

import StackCard from '../StackCard';
import { LIGHT_GREY } from 'components/atoms/colors';

import theme from 'styles/theme';

export type ProjectCardProps = {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    name: string;
    stacks: string[];
    url: string;
  };
  thumbnail: FluidObject;
};

export default function ProjectCard({
  excerpt,
  fields,
  frontmatter,
  thumbnail,
}: ProjectCardProps) {
  if (!frontmatter) {
    return <Wrapper to={null} />;
  }

  const { slug } = fields;
  const { name, stacks, url } = frontmatter;

  return (
    <Wrapper to={url}>
      <Img
        fluid={thumbnail}
        style={{
          width: '48%',
          height: '372px',
          objectFit: 'cover',
          backgroundColor: '#fff',
        }}
      />
      <DescriptionWrapper>
        <Title>{name}</Title>
        <Excerpt>{excerpt}</Excerpt>
        {stacks && (
          <StackWrapper>
            {stacks?.map((tag) => (
              <StackCard label={tag} />
            ))}
          </StackWrapper>
        )}
      </DescriptionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0 16px;
  margin-bottom: 40px;
  text-decoration: none;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);

  transform: translateY(0);
  -webkit-transform: translateY(0);
  -webkit-transition-property: right width height margin box-shadow;
  transition-property: right width height margin box-shadow;
  -webkit-transition-duration: 300ms;
  transition-duration: 300ms;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;

  &:hover {
    -webkit-transform: translateY(-2%) rotate3d(0, 10, -5, -10deg);
    transform: translateY(-2%) rotate3d(0, 10, -5, -10deg);
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 16px 0;
  border-top: 1px solid ${LIGHT_GREY};
`;

const StyledP = styled.p`
  margin: 0;
  color: black;
`;

const Title = styled(StyledP)`
  font-size: 44px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 10px;
`;

const Excerpt = styled(StyledP)`
  font-size: 20px;
  font-weight: 400;
  color: #555;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 1.4em;
  height: 4.2em;
  ${theme.media.tablet`
    width: 230px;
  `}
  ${theme.media.phone`
    width: calc(100vw - 20px);
    height: auto;
    max-height: 4.2em;
  `}
`;

const StackWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-top: auto;
`;
