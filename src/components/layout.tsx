import * as React from 'react'
import { Box, Container } from '@chakra-ui/react'


const Layout = ({ children }) => {
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
      <Container as="main" maxW="7xl">
        {/* <h1 className={heading}>{pageTitle}</h1> */}
        {children}
      </Container>
    // </div>
  )
}

export default Layout