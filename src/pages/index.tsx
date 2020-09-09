import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '../components/templates/layout';
import SEO from '../components/templates/seo';
import ProfileSection from 'components/organisms/ProfileSection';
import SkillSection from 'components/organisms/SkillSection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage({ data, location }: PageProps<any>) {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet
        meta={[
          {
            name: 'google-site-verification',
            content: process.env.GOOGLE_VERIFICATION_CODE,
          },
          {
            name: 'naver-site-verification',
            content: process.env.NAVER_VERIFICATION_CODE,
          },
        ]}
      />
      <SEO title="main" />
      <ProfileSection />
      <SkillSection />
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
  }
`;
