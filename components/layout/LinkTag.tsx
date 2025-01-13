import { ReactNode } from "react";
interface LinkTagProps {
  children: ReactNode;
}
const LinkTag = ({ children }: LinkTagProps) => {
  // <link> 태그를 <a> 태그로 변경
  const linkText = (children as string)
    .replace("<link>", "")
    .replace("</link>", "");
    const url = linkText.startsWith("http://") || linkText.startsWith("https://")
    ? linkText
    : `https://${linkText}`;
  return (
    <a
      href={url}
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
