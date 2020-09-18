import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import moment from 'moment';
import { DiscussionEmbed } from 'disqus-react';

import Layout from '../components/templates/layout';
import SEO, { getSchemaOrgJSONLD } from '../components/templates/seo';
import ContextPostCard from 'components/molecules/PostCard/context';
import { MIDDLE_GREY } from 'components/atoms/colors';
import theme from 'styles/theme';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const { excerpt } = post;
  const { slug } = post.fields;
  const { title, date, thumbnail } = post.frontmatter;
  const url = `${data.site.siteMetadata.siteUrl}${slug}`;
  const image = thumbnail.childImageSharp.fluid.src;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title,
    image,
    description: excerpt,
    datePublished: date,
    siteTitle,
    siteUrl: data.site.siteMetadata.siteUrl,
  });

  return (
    <Layout location={location} title={siteTitle} isBlog>
      <SEO
        title={title}
        description={post.frontmatter.description || post.excerpt}
        meta={[
          { name: 'image', content: image },
          { name: 'og:image', content: image },
          { name: 'og:type', content: 'article' },
          { name: 'og:url', content: url },
        ]}
      >
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </SEO>
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
              width: '70%',
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
      <DiscussionEmbed
        shortname={process.env.DISQUS_NAME}
        config={{ identifier: slug, title }}
      />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
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
  ${theme.media.phone`
  font-size: 1.8rem;
  `}
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
  border-bottom: 1px solid grey;
  margin-bottom: 20px;
`;
