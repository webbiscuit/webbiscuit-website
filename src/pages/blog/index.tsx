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
          <Heading as="h1">An Occasional Blog</Heading>
          <Text>Writing about technology, one bite at a time</Text>
        </Box>
        <BlogPreview />
        <BlogPreview />
        <BlogPreview />
      </Box>
    )
  }

export const Head = () => <Seo title="An Occasional Blog" description="Dan writes a blog every now and again, mashing technology with something unexpected." />

export default BlogPage