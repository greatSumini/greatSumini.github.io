import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Link } from 'gatsby';

export type ContextType = 'previous' | 'next';

export type ContextPostCardProps = {
  type: ContextType;
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    thumbnail: {
      childImageSharp: {
        fluid: {
          originalImg: string;
        };
      };
    };
  };
};

export default function ContextPostCard({
  type,
  fields,
  frontmatter,
}: ContextPostCardProps) {
  const { slug } = fields;
  const { title } = frontmatter;

  const [margin, alignItems, textAlign]: [
    CSSProperties['margin'],
    CSSProperties['alignItems'],
    CSSProperties['textAlign']
  ] =
    type === 'previous'
      ? ['0 auto 16px 0', 'flex-start', 'left']
      : ['0 0 16px auto', 'flex-end', 'right'];

  return (
    <Wrapper style={{ margin, alignItems }} to={slug}>
      <Type>{type === 'previous' ? '이전 글' : '다음 글'}</Type>
      <img
        src={frontmatter.thumbnail.childImageSharp.fluid.originalImg}
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          backgroundColor: '#fff',
        }}
      />
      <TitleWrapper style={{ alignItems }}>
        <Title style={{ textAlign }}>{title}</Title>
      </TitleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;

  position: relative;
  width: 336px;
  margin-bottom: 12px;

  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.25);
  text-decoration: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 12px;

  border-top: 0.5px solid #eee;
`;

const Type = styled.p`
  position: absolute;

  font-size: 0.75rem;
  font-weight: 700;
  color: white;

  background-color: black;

  padding: 2px 4px;
`;

const Title = styled.p`
  width: 312px;

  font-size: 1rem;
  font-weight: 700;
  color: rgb(73, 80, 87);
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
`;
