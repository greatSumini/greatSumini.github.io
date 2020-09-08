import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import moment from 'moment';

import Layout from '../components/templates/layout';
import SEO from '../components/templates/seo';
import ContextPostCard from 'components/molecules/PostCard/context';
import { MIDDLE_GREY } from 'components/atoms/colors';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const { title, date, thumbnail } = post.frontmatter;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Article>
        <header>
          <Title>{title}</Title>
          <Date
            style={{
              display: `block`,
            }}
          >
            {moment(date).format('YYYY.MM.DD')}
          </Date>
          <Image
            fluid={thumbnail.childImageSharp.fluid}
            style={{
              width: '60%',
              height: 'auto',
              objectFit: 'cover',
              margin: '0 auto',
              boxShadow: '0 4px 12px 4px rgba(0, 0, 0, 0.24)',
              borderRadius: '8px',
            }}
          />
        </header>
        <PostContents
          className="postContents"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr style={{}} />
      </Article>
      <ListLink to="/posts">Back to list</ListLink>
      <ContextPostsWrapper>
        {previous ? <ContextPostCard {...previous} type="previous" /> : <div />}
        {next && <ContextPostCard {...next} type="next" />}
      </ContextPostsWrapper>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        tags
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const Article = styled.article`
  padding: 0 12px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
`;

const Date = styled.p`
  margin-bottom: 1.45rem;
  color: ${MIDDLE_GREY};
`;

const PostContents = styled.section`
  padding: 2rem 0;
`;

const ListLink = styled(Link)`
  margin-left: auto;
  margin-right: 1rem;
  color: rgb(73, 80, 87);
`;

const ContextPostsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
