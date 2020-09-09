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
  siteTitle,
  siteUrl,
}) => [
  {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    url,
    name: title,
    alternateName: siteTitle,
  },
  {
    '@context': 'https://khalilstemmler.com',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': url,
          name: title,
          image,
        },
      },
    ],
  },
  {
    '@context': 'https://khalilstemmler.com',
    '@type': 'BlogPosting',
    url,
    name: title,
    alternateName: siteTitle,
    headline: title,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    description,
    author: {
      '@type': 'Person',
      name: 'Choi su min',
    },
    publisher: {
      '@type': 'Organization',
      url: 'https://khalilstemmler.com',
      logo: 'https://greatsumini.github.io/images/profile.png',
      name: 'Choi su min',
    },
    mainEntityOfPage: {
      '@type': 'WebSite',
      '@id': siteUrl,
    },
    datePublished,
  },
];

export default SEO;
