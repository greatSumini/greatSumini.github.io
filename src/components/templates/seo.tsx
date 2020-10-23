/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode, ReactNodeArray } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export type SEOProps = {
  description?: string;
  lang?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: any[];
  title: string;
  children?: ReactNode | ReactNodeArray;
};

const SEO = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
  children,
}: SEOProps) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
      ].concat(meta)}
    >
      {children}
    </Helmet>
  );
};

export const getSchemaOrgJSONLD = ({
  url,
  title,
  image,
  description,
  datePublished,
}) => ({
  '@context': 'http://schema.org',
  '@type': 'BlogPosting',
  image: {
    '@type': 'ImageObject',
    url: image,
  },
  url,
  dateCreated: datePublished,
  datePublished,
  dateModified: datePublished,
  headline: `${title} | 최수민 개발 블로그`,
  name: `${title} | 최수민 개발 블로그`,
  description,
  keywords: [
    'Lite:true',
    'Elevated:false',
    'LockedPostSource:LOCKED_POST_SOURCE_NONE',
    'LayerCake:0',
  ],
  author: {
    '@type': 'Person',
    name: 'Choi su min',
    url: 'https://sumini.dev',
  },
  creator: ['Choi su min'],
  publisher: {
    '@type': 'Person',
    url: 'https://sumini.dev',
    logo: 'https://sumini.dev/images/profile.png',
    name: 'Choi su min',
  },
  mainEntityOfPage: url,
});

export default SEO;
