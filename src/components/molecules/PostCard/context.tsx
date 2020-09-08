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
    tags: string[];
  };
};

export default function ContextPostCard({
  type,
  fields,
  frontmatter,
}: ContextPostCardProps) {
  const { slug } = fields;
  const { title, tags } = frontmatter;

  const [margin, alignItems, textAlign]: [
    CSSProperties['margin'],
    CSSProperties['alignItems'],
    CSSProperties['textAlign']
  ] =
    type === 'previous'
      ? ['0 auto 0 0', 'flex-start', 'left']
      : ['0 0 0 auto', 'flex-end', 'right'];

  return (
    <Wrapper style={{ margin }} to={slug}>
      <TitleWrapper style={{ alignItems }}>
        <Type>{type}</Type>
        <Title style={{ textAlign }}>{title}</Title>
        <Row>
          {tags.map((tag) => (
            <Tag to={`/tag/${tag}`} key={tag}>
              {tag}
            </Tag>
          ))}
        </Row>
      </TitleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Type = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: rgb(73, 80, 87);
`;

const Title = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(73, 80, 87);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tag = styled(Link)`
  font-size: 0.9rem;
  color: rgb(73, 80, 87);
  margin-right: 4px;
  text-decoration: none;
`;
