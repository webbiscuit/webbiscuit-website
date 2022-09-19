import * as React from "react";
import { Box, Container, HStack, Text } from "@chakra-ui/react";
import { Link } from "gatsby";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <HStack
        as="header"
        bg="yellow.200"
        color={"yellow.800"}
        borderWidth={4}
        borderStyle="solid"
        borderColor={"yellow.900"}
      >
        <Text
          paddingX={2}
          fontSize="6xl"
          fontWeight={900}
          bg={"yellow.700"}
          color={"yellow.200"}
        >
          Web Biscuit
        </Text>
        <Text>Blog</Text>
        <Text>About</Text>
        {/* <Link>Blog</Link> */}
      </HStack>
      <Container
        as="main"
        maxW="7xl"
        backgroundColor="yellow.50"
        color={"yellow.900"}
        // my={10}
        mb={10}
        mt={0}
        pb={4}
      >
        {/* <h1 className={heading}>{pageTitle}</h1> */}
        {children}
      </Container>
    </>
  );
};

export default Layout;
