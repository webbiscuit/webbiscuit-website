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
  <Heading as="h2" color="green.900" size="lg" {...props} />
);
const MyH3 = (props) => (
  <Heading as="h3" color="green.700" size="md" {...props} />
);
const MyH4 = (props) => (
  <Heading as="h4" color="green.500" size="sm" {...props} />
);
const MyParagraph = (props) => (
  <Text lineHeight={1.5} paddingY={3} {...props} />
);
const MyLi = (props) => <Box as="li" marginLeft={10} {...props} />;
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
  h3: MyH3,
  h4: MyH4,
  li: MyLi,
  p: MyParagraph,
  pre: CodeBlock,
  // div: MyDiv,
  // img: MyImg,
  // figcaption: MyFigCaption,
};

export const MdxWrapper = ({ children }: { children: ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
