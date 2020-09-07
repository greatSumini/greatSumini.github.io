import React from 'react';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/templates/layout';
import SEO from '../components/templates/seo';
import ProfileSection from 'components/organisms/ProfileSection';
import SkillSection from 'components/organisms/SkillSection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage({ data, location }: PageProps<any>) {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
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
