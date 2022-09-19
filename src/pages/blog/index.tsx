import { Text, Heading, Box, VStack, HStack } from "@chakra-ui/react";
import { graphql, Link, PageProps } from "gatsby";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";
import * as React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const BlogLatestPreview = ({
  title,
  date,
  description,
}: {
  title?: string;
  date?: string;
  description?: string;
}) => {
  return (
    <Box
      as="article"
      borderStyle={"solid"}
      borderColor="yellow.900"
      borderWidth={4}
      padding={2}
      mb={4}
    >
      {/* <Text>Latest Post!</Text> */}
      <Heading size="xl" fontWeight={600}>
        {title}
      </Heading>
      {date && (
        <Text as="time" fontSize={"xs"} dateTime={date}>
          {date}
        </Text>
      )}
      <Text>{description}</Text>
    </Box>
  );
};

const BlogPreview = ({
  title,
  date,
  description,
  image,
  image_alt,
  slug,
}: {
  title?: string;
  date?: string;
  description?: string;
  image?: IGatsbyImageData;
  image_alt?: string;
  slug?: string;
}) => {
  return (
    <Box
      as="article"
      borderStyle={"solid"}
      borderColor="yellow.900"
      borderWidth={4}
      borderBottom={0}
      padding={2}
      _last={{
        borderBottom: "4px",
      }}
    >
      <HStack spacing="24px">
        <Link to={`/blog${slug}/`}>
          <Heading size="xl" fontWeight={600}>
            {title}
          </Heading>
        </Link>

        <VStack>
          {date && (
            <Text as="time" fontSize={"xs"} dateTime={date}>
              {date}
            </Text>
          )}
          <Text>{description}</Text>
        </VStack>
        {/* {image && <GatsbyImage 
            image={image}
            alt={image_alt ?? "A blog image"}
          />} */}
      </HStack>
    </Box>
  );
};

const BlogPage = ({ data }: PageProps<Queries.BlogPageQuery>) => {
  return (
    <Layout>
      <Box as="section">
        <Box as="header">
          <Heading as="h1" size="4xl" fontWeight={900}>
            An Occasional Blog
          </Heading>
          <Text>Writing about technology, one bite at a time</Text>
        </Box>
        <Box boxShadow="2xl" p="6" rounded="md" bg="yellow.50">
          {data.allMdx.nodes.map((node, ix, arr) => {
            const image = node.frontmatter?.hero_image
              ? getImage(node.frontmatter?.hero_image as ImageDataLike)
              : undefined;

            if (ix === 110) {
              return (
                <BlogLatestPreview
                  key={node.id}
                  title={node.frontmatter?.title ?? undefined}
                  date={node.frontmatter?.date ?? undefined}
                  description={node.frontmatter?.description ?? undefined}
                />
              );
            } else {
              return (
                <BlogPreview
                  key={node.id}
                  image={image}
                  title={node.frontmatter?.title ?? undefined}
                  date={node.frontmatter?.date ?? undefined}
                  description={node.frontmatter?.description ?? undefined}
                  slug={node.fields?.slug ?? undefined}
                />
              );
            }
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query BlogPage {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "Do MMM YYYY")
          title
          description
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData(height: 100)
            }
          }
        }
        fields {
          slug
        }
        id
        excerpt
      }
    }
  }
`;

export const Head = () => (
  <Seo
    title="An Occasional Blog"
    description="Dan writes a blog every now and again, mashing technology with something unexpected."
  />
);

export default BlogPage;
