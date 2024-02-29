import { ReactNode } from "react";
interface LinkTagProps {
  children: ReactNode;
}
const LinkTag = ({ children }: LinkTagProps) => {
  // <link> 태그를 <a> 태그로 변경
  const linkText = (children as string)
    .replace("<link>", "")
    .replace("</link>", "");

  return (
    <a
      href={linkText}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        wordWrap: "break-word",
        overflowWrap: "break-word",
        overflow: "hidden",
      }}
    >
      {linkText}
    </a>
  );
};

export default LinkTag;
