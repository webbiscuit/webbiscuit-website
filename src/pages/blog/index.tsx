import { Text, Heading, Box } from '@chakra-ui/react'
import { graphql, PageProps } from 'gatsby'
import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPreview = ({title, date, description}: {title?: string, date?: string, description?: string}) => {
    return (
      <Box as="article" borderStyle={'solid'} borderColor="yellow.900" borderWidth={4} borderBottom={0} padding={2}
        _last={{
          borderBottom: "4px"
        }}>
        <Heading size="xl" fontWeight={600}>{title}</Heading>
        {date && <Text as="time" fontSize={"xs"} dateTime={date}>{date}</Text>}
        <Text>{description}</Text>
      </Box>
    )
}

const BlogPage = ({data} : PageProps<Queries.BlogPageQuery>) => {
    
    return (
      <Layout>
        <Box as="section">
          <Box as="header">
            <Heading as="h1" size="4xl" fontWeight={900}>An Occasional Blog</Heading>
            <Text>Writing about technology, one bite at a time</Text>
          </Box>
          <Box boxShadow='2xl' p='6' rounded='md' bg='yellow.50'>
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