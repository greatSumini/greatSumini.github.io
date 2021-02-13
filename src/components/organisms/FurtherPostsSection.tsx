import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import ChevronRightIcon from 'components/atoms/icons/chevron/right';
import { BLACK } from 'components/atoms/colors';

export type FurtherPostsSectionProps = {
  tag: string;
  exceptSlug: string;
};

function FurtherPostsSection({ tag, exceptSlug }: FurtherPostsSectionProps) {
  const data = useStaticQuery(PostsQuery);

  const posts = data.allMarkdownRemark.edges
    .filter((edge) => edge.node.frontmatter.tags.includes(tag))
    .map((edge) => edge.node)
    .filter((node) => node.fields.slug !== exceptSlug);

  if (!posts.length) {
    return null;
  }

  console.log(posts);

  return (
    <Wrapper to={`/posts/?tag=${tag}`}>
      <Title>
        <Strong>{tag.toUpperCase()}</Strong> 글 {posts.length}개 더보기
        <ChevronRightIcon style={{ marginLeft: '8px' }} />
      </Title>
    </Wrapper>
  );
}

export default FurtherPostsSection;

export const PostsQuery = graphql`
  query PostsQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { layout: { eq: "post" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;

  padding: 12px;
  margin: 0 12px 0 auto;

  color: ${BLACK};
  text-decoration: none;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.4rem;
`;

const Strong = styled.strong``;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
