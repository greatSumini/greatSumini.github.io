import React from 'react';
import styled from 'styled-components';
import { graphql, PageProps } from 'gatsby';

import Layout from '../components/templates/layout';
import SEO from '../components/templates/seo';
import ProjectCard from 'components/molecules/ProjectCard';

import theme from 'styles/theme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectsPage({ data, location }: PageProps<any>) {
  const siteTitle = data?.site.siteMetadata.title;
  const projects = data?.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="projects" />
      <Wrapper>
        <PageTitle>Projects</PageTitle>
      </Wrapper>
      <ProjectsWrapper>
        {projects.map((project) => (
          <ProjectCard
            {...project?.node}
            thumbnail={
              project?.node.frontmatter.thumbnail.childImageSharp.fluid
            }
          />
        ))}
      </ProjectsWrapper>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ProjectsPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { layout: { eq: "project" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            name
            stacks
            url
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 0;
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

const ProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
`;
