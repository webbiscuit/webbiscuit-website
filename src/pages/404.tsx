import * as React from "react";
import { Link } from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/layout";
import { Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <>
      <Layout>
        <Text>Oops! Sorry, your biscuits are in a different biscuit tin! </Text>
        <Text>
          Take a look at the <Link to="/blog/">Blog</Link> maybe?
        </Text>
      </Layout>
    </>
  );
};

export default NotFoundPage;

export const Head = () => <Seo title="Oh noes..." />;
