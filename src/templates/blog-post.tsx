import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import moment from 'moment';
import { DiscussionEmbed } from 'disqus-react';

import Layout from '../components/templates/layout';
import SEO, { getSchemaOrgJSONLD } from '../components/templates/seo';
import Bio from 'components/molecules/bio';
import TagCard from 'components/molecules/TagCard';
import ContextPostCard from 'components/molecules/PostCard/context';
import FurtherPostsSection from 'components/organisms/FurtherPostsSection';
import ChevronRightIcon from 'components/atoms/icons/chevron/right';

import { MIDDLE_GREY } from 'components/atoms/colors';

import theme from 'styles/theme';

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const { excerpt } = post;
  const { slug } = post.fields;
  const { title, date, thumbnail, tags } = post.frontmatter;
  const url = `${data.site.siteMetadata.siteUrl}${slug}`;
  const image = thumbnail.childImageSharp.fluid.src;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    url,
    title,
    image,
    description: excerpt,
    datePublished: date,
  });

  return (
    <Layout location={location} title={siteTitle} isBlog>
      <SEO
        title={title}
        description={post.frontmatter.description || post.excerpt}
        keywords={tags}
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
          <Bio />
          <DateTagRow>
            <Date
              style={{
                display: `block`,
              }}
            >
              {moment(date).format('YYYY.MM.DD')}
            </Date>
            {tags?.map((tag) => (
              <TagCard label={tag} size="large" />
            ))}
          </DateTagRow>
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
      {tags.map((tag) => (
        <FurtherPostsSection tag={tag} exceptSlug={slug} />
      ))}
      <ListLink to="/posts">
        모든 글 보기
        <ChevronRightIcon style={{ marginLeft: '8px' }} />
      </ListLink>
      <ContextPostsWrapper>
        {previous ? <ContextPostCard {...previous} type="previous" /> : <div />}
        {next && <ContextPostCard {...next} type="next" />}
      </ContextPostsWrapper>
      <DisqusWrapper>
        <DiscussionEmbed
          shortname={process.env.DISQUS_NAME}
          config={{ identifier: slug, title }}
        />
      </DisqusWrapper>
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
      tableOfContents
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

const DateTagRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  ${theme.media.phone`
    font-size: 1.65rem;
  `}
`;

const Date = styled.p`
  font-size: 24px;
  color: ${MIDDLE_GREY};
  margin-right: 20px;
  ${theme.media.phone`
    font-size: 16px;
  `}
`;

const PostContents = styled.section`
  padding: 6rem 0 4rem;
`;

const ListLink = styled(Link)`
  font-size: 1.4rem;
  color: rgb(73, 80, 87);
  text-decoration: none;

  padding: 12px;
  margin-left: auto;
  margin-right: 12px;
`;

const ContextPostsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  border-bottom: 1px solid grey;
  padding: 12px;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const DisqusWrapper = styled.div`
  width: 100%;
  ${theme.media.phone`
    width: 90%;
    margin: 0 auto;
  `}
`;
