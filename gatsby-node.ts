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
      allMdx(filter: { fields: { source: { eq: "mdxPages" } } }) {
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

  // you'll call `createPage` for each result
  pages.forEach((node) => {
    console.log(node);

    const slug = node.fields.slug ?? "";

    console.log(slug);

    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: slug,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${pageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });

  // const blogResult = await graphql(`
  //   query {
  //     allMdx(filter: { fields: { source: { eq: "blog" } } }) {
  //       nodes {
  //         id
  //         fields {
  //           slug
  //         }
  //         internal {
  //           contentFilePath
  //         }
  //       }
  //     }
  //   }
  // `);

  // if (blogResult.errors) {
  //   reporter.panicOnBuild("Error loading MDX result", blogResult.errors);
  // }

  // // Create blog post pages.
  // const blogs = blogResult.data.allMdx.nodes;
  // const blogTemplate = path.resolve(`./src/templates/blog.tsx`);

  // blogs.forEach((node) => {
  //   console.log(node);

  //   const slug = node.fields.slug ?? "";

  //   console.log(slug);

  //   createPage({
  //     path: `blog${slug}/`,
  //     component: `${blogTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
  //     context: { id: node.id },
  //   });
  // });
};
