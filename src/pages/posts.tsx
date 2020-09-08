import React from 'react';
import styled from 'styled-components';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/templates/layout';
import SEO from '../components/templates/seo';
import PostCard from 'components/molecules/PostCard';

import theme from 'styles/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostsPage({ data, location }: PageProps<any>) {
  const siteTitle = data?.site.siteMetadata.title;
  const posts = data?.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="posts" />
      <Wrapper>
        <PageTitle>Posts</PageTitle>
        <PostsWrapper>
          {posts.concat([...Array(4)]).map((post) => (
            <PostCard
              {...post?.node}
              thumbnail={post?.node.frontmatter.thumbnail.childImageSharp.fluid}
            />
          ))}
        </PostsWrapper>
      </Wrapper>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 0;
`;

const PageTitle = styled.p`
  margin: 0;
  margin-left: 16px;
  margin-bottom: 2rem;
  font-size: 4rem;
  font-weight: 700;
  ${theme.media.phone`
    font-size: 3rem;
  `}
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`;
