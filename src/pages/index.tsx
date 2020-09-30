import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '../components/templates/layout';
import SEO from '../components/templates/seo';
import ProfileSection from 'components/organisms/ProfileSection';
import SkillSection from 'components/organisms/SkillSection';
import styled from 'styled-components';

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
          { name: 'image', content: '/images/og.png' },
          {
            name: 'og:image',
            content: '/images/og.png',
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
      <SEO title="최수민 개발 블로그" />
      <Wrapper>
        <ProfileSection />
        <SkillSection />
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
  }
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
`;
