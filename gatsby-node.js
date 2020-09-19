const path = require(`path`);
const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const createLayoutPages = async (layout, query) => {
    const {
      data: {
        allMarkdownRemark: { edges },
      },
    } = await graphql(query);
    if (edges.errors) {
      throw edges.errors;
    }

    const component = path.resolve(`./src/templates/blog-${layout}.tsx`);

    edges.forEach((edge, index) => {
      const previous =
        index === edges.length - 1 ? null : edges[index + 1].node;
      const next = index === 0 ? null : edges[index - 1].node;

      createPage({
        path: edge.node.fields.slug,
        component,
        context: {
          slug: edge.node.fields.slug,
          previous,
          next,
        },
      });
    });
  };

  await createLayoutPages(
    'post',
    `
    {
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { layout: { eq: "post" } } }
        limit: 1000
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date
              title
              tags
              layout
            }
          }
        }
      }
    }
    `
  );
  await createLayoutPages(
    'project',
    `
    {
      allMarkdownRemark(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { layout: { eq: "project" } } }
        limit: 1000
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
              layout
              url
              repoUrl
            }
          }
        }
      }
    }
    `
  );
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  // Allow process.env.MY_WHITELIST_PREFIX_* environment variables
  fs.readFile('.env', 'utf8', (_err, data) => {
    const definePlugin = config.plugins.find((p) => p.definitions);
    for (const [k, v] of Object.entries(process.env)) {
      if (data.includes(k)) {
        definePlugin.definitions[`process.env.${k}`] = JSON.stringify(v);
      }
    }
  });

  actions.replaceWebpackConfig(config);
};
