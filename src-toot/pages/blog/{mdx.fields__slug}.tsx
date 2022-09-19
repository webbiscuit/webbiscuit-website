import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPost = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image);

  console.log(data.mdx.frontmatter.hero_image);

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      <GatsbyImage image={image} alt={data.mdx.frontmatter.hero_image_alt} />
      <p>
        {data.mdx.frontmatter.hero_image_alt} - Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_link}>
          {data.mdx.frontmatter.hero_image_credit}
        </a>
      </p>
      {children}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit
        hero_image_credit_link
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />;

export default BlogPost;
