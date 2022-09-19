import * as React from "react";
import { Box, Container } from "@chakra-ui/react";

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
    // <div className={container}>
    <Container
      as="main"
      maxW="7xl"
      backgroundColor="yellow.50"
      color={"yellow.900"}
      my={10}
      pb={4}
    >
      {/* <h1 className={heading}>{pageTitle}</h1> */}
      {children}
    </Container>
    // </div>
  );
};

export default Layout;
