import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { Text, Heading, Box, VStack, HStack } from "@chakra-ui/react";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

type BlogPostQuery = {
  readonly mdx: {
    readonly frontmatter: {
      readonly title: string | null;
      readonly description: string | null;
      readonly date: string | null;
      readonly hero_image_alt: string | null;
      readonly hero_image_credit: string | null;
      readonly hero_image_credit_link: string | null;
      readonly hero_image: {
        readonly childImageSharp: {
          gatsbyImageData: ImageDataLike | null;
        };
      } | null;
    } | null;
  } | null;
};

const BlogPost = ({
  data,
  children,
}: {
  data: BlogPostQuery;
  children: React.ReactNode | React.ReactNode[];
}) => {
  const image = getImage(data.mdx?.frontmatter?.hero_image as ImageDataLike);

  return (
    <Layout>
      <Heading size="xl" fontWeight={600}>
        {data.mdx?.frontmatter?.title}
      </Heading>
      {image && (
        <GatsbyImage
          image={image}
          alt={data.mdx?.frontmatter?.hero_image_alt ?? "An image"}
        />
      )}
      {children}
    </Layout>
  );
  // const image = getImage(data.mdx.frontmatter.hero_image)

  // console.log(data.mdx.frontmatter.hero_image);

  // return (
  //   <Layout pageTitle={data.mdx.frontmatter.title}>
  //     <p>Posted: {data.mdx.frontmatter.date}</p>
  //     <GatsbyImage
  //       image={image}
  //       alt={data.mdx.frontmatter.hero_image_alt}
  //     />
  //     <p>
  //       {data.mdx.frontmatter.hero_image_alt} -
  //       Photo Credit:{" "}
  //       <a href={data.mdx.frontmatter.hero_image_credit_link}>
  //         {data.mdx.frontmatter.hero_image_credit}
  //       </a>
  //     </p>
  //     {children}
  //   </Layout>
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
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

export const Head = ({ data }: { data: BlogPostQuery }) => (
  <Seo
    title={data.mdx?.frontmatter?.title ?? "Untitled"}
    description={data.mdx?.frontmatter?.description ?? undefined}
  />
);

export default BlogPost;
