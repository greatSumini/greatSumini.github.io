import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/templates/layout';
import SEO from '../components/templates/seo';
import TagsSection from 'components/organisms/TagsSection';
import PostCard from 'components/molecules/PostCard';

import theme from 'styles/theme';
import { useQueryParams } from 'hooks/route';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostsPage({ data, location }: PageProps<any>) {
  const siteTitle = data?.site.siteMetadata.title;
  const posts = data?.allMarkdownRemark.edges;
  const tags = data?.allMarkdownRemark.group;

  const [tag, setTag] = useState('');
  const { tag: paramTag } = useQueryParams();

  useEffect(() => {
    if (paramTag && paramTag !== 'all') {
      setTag(paramTag);
    }
  }, [paramTag]);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="posts" />
      <Wrapper>
        <PageTitle>Posts</PageTitle>
        <TagsSection
          tags={[{ tag: 'all', totalCount: posts.length }, ...tags]}
          selectedTag={tag}
          selectTag={setTag}
        />
        <PostsWrapper>
          {posts
            .filter(
              tag
                ? (post) => post.node.frontmatter.tags.includes(tag)
                : () => true
            )
            .concat([...Array(4)])
            .map((post) => (
              <PostCard
                key={post?.node.fields.slug}
                {...post?.node}
                thumbnail={
                  post?.node.frontmatter.thumbnail.childImageSharp.fluid
                }
              />
            ))}
        </PostsWrapper>
      </Wrapper>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PostsPageQuery {
    site {
      siteMetadata {
        title
      }
    }
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
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 0;
  width: 100%;
`;

const PageTitle = styled.p`
  margin: 0;
  margin-left: 16px;
  margin-bottom: 2rem;
  font-size: 4rem;
  font-weight: 700;
  ${theme.media.phone`
    font-size: 3rem;
    margin-bottom: 1rem;
  `}
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: flex-start;
  width: 100%;
`;
