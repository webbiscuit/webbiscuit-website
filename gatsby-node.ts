const path = require("path");
const slugify = require(`@sindresorhus/slugify`);

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField, createPages } = actions;
  if (node.internal.type === `Mdx`) {
    createNodeField({
      node,
      name: `slug`,
      value: node.frontmatter.slug ?? `/${slugify(node.frontmatter.title)}/`,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const pageResult = await graphql(`
    query {
      allMdx(filter: { fields: { source: { eq: "pages" } } }) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (pageResult.errors) {
    reporter.panicOnBuild("Error loading MDX result", pageResult.errors);
  }

  // Create blog post pages.
  const pages = pageResult.data.allMdx.nodes;
  const pageTemplate = path.resolve(`./src/templates/pages.tsx`);

  pages.forEach((node) => {
    // console.log(node);

    const slug = node.fields.slug ?? "";

    createPage({
      path: slug,
      component: `${pageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });

  const blogResult = await graphql(`
    query {
      allMdx(filter: { fields: { source: { eq: "blog" } } }) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (blogResult.errors) {
    reporter.panicOnBuild("Error loading MDX result", blogResult.errors);
  }

  // Create blog post pages.
  const blogs = blogResult.data.allMdx.nodes;
  const blogTemplate = path.resolve(`./src/templates/blog.tsx`);

  blogs.forEach((node) => {
    // console.log(node);

    const slug = node.fields.slug ?? "";

    createPage({
      path: `blog${slug}`,
      component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};
