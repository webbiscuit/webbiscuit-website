import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import { MdxWrapper } from "../components/mdx-wrapper";
import Layout from "../components/layout";

// const shortcodes = { Link }; // Provide common components here

export default function PageTemplate({ data, children }) {
  return (
    <>
      <Layout>
        <MdxWrapper>{children}</MdxWrapper>
      </Layout>
    </>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
