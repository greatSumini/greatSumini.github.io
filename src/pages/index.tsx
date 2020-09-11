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
        script={[]}
      >
        <script
          data-ad-client={process.env.ADSENSE_PUBLISHER_ID}
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
      </Helmet>
      <SEO title="최수민 데브로그" />
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
