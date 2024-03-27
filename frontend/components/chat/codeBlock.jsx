import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ value }) {
  return (
    <SyntaxHighlighter language='plaintext' style={dracula}>
      {value}
    </SyntaxHighlighter>
  );
}
