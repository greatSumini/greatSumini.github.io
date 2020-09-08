import React from 'react';
import styled from 'styled-components';
import Img, { FluidObject } from 'gatsby-image';
import moment from 'moment';

import TagCard from './TagCard';
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
    return <div style={{ width: '276px' }} />;
  }

  const { slug } = fields;
  const { title, date, tags } = frontmatter;

  return (
    <Wrapper href={slug}>
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
            {tags?.map((tag) => (
              <TagCard label={tag} size="small" />
            ))}
          </TagWrapper>
        )}
        <Date>{moment(date).format('YYYY년 M월 D일')}</Date>
      </DescriptionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 276px;
  height: fit-content;
  border-radius: 8px;
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.25);
  text-decoration: none;
  color: ${BLACK};
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin-bottom: 8px;
  ${theme.media.tablet`
    width: 250px;
  `}
  ${theme.media.phone`
    width: 100%;
    border-radius: 0;
  `}
`;

const DescriptionWrapper = styled.div`
  padding: 10px;
  border-top: 1px solid ${LIGHT_GREY};
`;

const StyledP = styled.p`
  margin: 0;
`;

const Title = styled(StyledP)`
  font-size: 18px;
  font-weight: 700;
  width: 256px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
  ${theme.media.tablet`
    width: 230px;
  `}
  ${theme.media.phone`
    width: 256px;
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
    width: auto;
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
