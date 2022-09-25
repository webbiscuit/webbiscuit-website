import { Heading, Text, Image, Box } from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";
import React, { ReactNode } from "react";
import CodeBlock from "./codeblock";

const MyH1 = (props) => (
  <Heading
    as="h1"
    bg={"yellow.700"}
    color={"yellow.200"}
    paddingX={2}
    {...props}
  />
);
const MyH2 = (props) => (
  <Heading as="h2" color="green.900" size="md" {...props} />
);
const MyParagraph = (props) => (
  <Text lineHeight={1.5} paddingY={3} {...props} />
);
// const MyImg = (props) => {
//   console.log(props);
//   return <Image src={props.src} alt={props.alt} />;
//   // return <Image w="100px" {...props} />;
// };

// const MyFigCaption = (props) => (
//   <Text as="figcaption" size="xsm" color={"red"} {...props} />
// );

// const MyDiv = (props) => <Box as="div" {...props} />;

const components = {
  h1: MyH1,
  h2: MyH2,
  p: MyParagraph,
  pre: CodeBlock,
  // div: MyDiv,
  // img: MyImg,
  // figcaption: MyFigCaption,
};

export const MdxWrapper = ({ children }: { children: ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
