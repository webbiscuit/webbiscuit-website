import { Text, Heading, Box } from '@chakra-ui/react'
import * as React from 'react'
import Seo from '../../components/seo'

const BlogPreview = () => {
    return (
      <Box as="article">
        <Heading as="h2" size="lg">Some header</Heading>
        <Text>Some preview...</Text>
      </Box>
    )
}

const BlogPage = () => {
    return (
      <Box as="section">
        <Box as="header">
          <Heading as="h1">An occasional Blog</Heading>
          <Text>Writing about technology, one bite at a time</Text>
        </Box>
        <BlogPreview />
        <BlogPreview />
        <BlogPreview />
      </Box>
    )
  }

export const Head = () => <Seo title="Blog" />

export default BlogPage