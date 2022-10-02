import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Link } from "gatsby";
import { MdxWrapper } from "../components/mdx-wrapper";
import Layout from "../components/layout";
import Seo from "../components/seo";

type PageQuery = {
  readonly mdx: {
    readonly frontmatter: {
      readonly title: string | null;
      readonly description: string | null;
    } | null;
  } | null;
};

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
        description
      }
    }
  }
`;

export const Head = ({ data }: { data: PageQuery }) => (
  <Seo
    title={data.mdx?.frontmatter?.title ?? "Untitled"}
    description={data.mdx?.frontmatter?.description ?? undefined}
  />
);
