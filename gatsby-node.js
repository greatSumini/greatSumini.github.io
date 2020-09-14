const path = require(`path`);
const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
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

  if (result.errors) {
    throw result.errors;
  }

  const articles = result.data.allMarkdownRemark.edges;

  // Create blog posts pages.
  const posts = articles.filter(
    (acticle) => acticle.node.frontmatter.layout === 'post'
  );

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
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
