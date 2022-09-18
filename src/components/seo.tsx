import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Seo = ({ title, description }: { title: string, description?: string}) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const seo = {
    title: `${title} | ${data.site.siteMetadata.title}`,
    description: description,
  }

  return (
    <>
      <title>{seo.title}</title>
      {description && <meta name="description" content={seo.description} />}
    </>
  )
}

export default Seo