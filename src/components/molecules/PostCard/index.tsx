import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import moment from 'moment';

import TagCard from '../TagCard';
import { BLACK, LIGHT_GREY } from 'components/atoms/colors';

import theme from 'styles/theme';

export type PostCardProps = {
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    date: string;
    title: string;
    tags: string[];
  };
  thumbnail: FluidObject;
};

export default function PostCard({
  excerpt,
  fields,
  frontmatter,
  thumbnail,
}: PostCardProps) {
  if (!frontmatter) {
    return <Wrapper to={null} />;
  }

  const { slug } = fields;
  const { title, date, tags } = frontmatter;

  return (
    <Wrapper to={slug}>
      <Img
        fluid={thumbnail}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          backgroundColor: '#fff',
        }}
      />
      <DescriptionWrapper>
        <Title>{title}</Title>
        <Excerpt>{excerpt}</Excerpt>
        {tags && (
          <TagWrapper>
            {tags?.slice(0, 3).map((tag) => (
              <TagCard label={tag} size="small" />
            ))}
          </TagWrapper>
        )}
        <Date>{moment(date).format('YYYY년 M월 D일')}</Date>
      </DescriptionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 24%;
  height: fit-content;
  border-radius: 8px;
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  color: ${BLACK};
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin-bottom: 24px;
  overflow: hidden;
  ${theme.media.desktop`
    width: 276px;
    margin-bottom: 18px;
  `}
  @media (max-width: 1105px) {
    width: 32.5%;
  }
  ${theme.media.tablet`
    width: 250px;
  `}
  @media (min-width: 577px) and (max-width: 755px) {
    width: 49.5%;
  }
  ${theme.media.phone`
    width: 100%;
    border-radius: 0;
    margin-bottom: 8px;
  `}
`;

const DescriptionWrapper = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${LIGHT_GREY};
`;

const StyledP = styled.p`
  margin: 0;
`;

const Title = styled(StyledP)`
  font-size: 18px;
  font-weight: 600;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
  ${theme.media.desktop`
    width: 276px;
  `}
  ${theme.media.tablet`
    width: 230px;
  `}
  ${theme.media.phone`
    width: calc(100vw - 20px);
  `}
`;

const Excerpt = styled(StyledP)`
  font-size: 14px;
  font-weight: 400;
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

const Date = styled(StyledP)`
  font-size: 14px;
  font-weight: 400;
  color: #888888;
`;
const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
