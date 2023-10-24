import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
// import js from 'react-syntax-highlighter/dist/cjs/styles/prism/javascript'

import CompanyHeader from "./CompanyHeader";
import classes from "./CompanyContent.module.css";

function CompanyContent(props) {
  const { company } = props;

  const imagePath = `/images/companies/${company.slug}/${company.image}`;

  const customRenderers = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${company.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph) {
      const { node } = paragraph;
  
        
      

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/companies/${company.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      <CompanyHeader title={company.title} image={imagePath} />
      <ReactMarkdown components={customRenderers} rehypePlugins={[rehypeRaw]}>
        {company.content}
      </ReactMarkdown>
    </article>
  );
}

export default CompanyContent;
