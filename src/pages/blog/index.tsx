import { Text, Heading, Box } from '@chakra-ui/react'
import { graphql, PageProps } from 'gatsby'
import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPreview = ({title, date, description}: {title?: string, date?: string, description?: string}) => {
    return (
      <Box as="article">
        <Heading size="xl">{title}</Heading>
        {date && <Text as="time" dateTime={date}>{date}</Text>}
        <Text>{description}</Text>
      </Box>
    )
}

const BlogPage = ({data} : PageProps<Queries.BlogPageQuery>) => {
    
    return (
      <Layout>
        <Box as="section">
          <Box as="header">
            <Heading as="h1" size="4xl">An Occasional Blog</Heading>
            <Text>Writing about technology, one bite at a time</Text>
          </Box>
          {
            data.allMdx.nodes.map((node) => {
              return <BlogPreview 
                key={node.id}
                title={node?.frontmatter?.title ?? undefined} 
                date={node?.frontmatter?.date ?? undefined}
                description={node?.frontmatter?.description ?? undefined} />
            })
          }
        </Box>
      </Layout>
    )
  }

export const query = graphql`
  query BlogPage {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        frontmatter {
          date(formatString: "Do MMM YYYY")
          title
          description
        }
        fields {
          slug
        }
        id
        excerpt
      }
    }
  }`

export const Head = () => <Seo title="An Occasional Blog" description="Dan writes a blog every now and again, mashing technology with something unexpected." />

export default BlogPage