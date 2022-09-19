import { Heading, Text } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import React, { ReactNode } from "react";

const MyH1 = (props) => (
  <Heading
    as="h1"
    bg={"yellow.700"}
    color={"yellow.200"}
    paddingX={2}
    {...props}
  />
);
const MyH2 = (props) => <Heading as="h2" color="green.900" {...props} />;
const MyParagraph = (props) => (
  <Text lineHeight={1.5} paddingY={3} {...props} />
);

const components = {
  h1: MyH1,
  h2: MyH2,
  p: MyParagraph,
};

export const MdxWrapper = ({ children }: { children: ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
