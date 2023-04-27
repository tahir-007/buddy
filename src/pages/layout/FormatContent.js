import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

// CodeBlock component to display code blocks
const CodeBlock = ({ value }) => {
  // Highlight the code using highlight.js
  const highlightedCode = hljs.highlightAuto(value).value;

  // Return the highlighted code within a pre and code tag
  return (
    <pre className="p-4 my-4 mx-2 rounded-lg bg-white border-gray-200 dark:border-gray-300 border-2 dark:bg-gray-300 whitespace-pre-wrap">
      <code
        className="text-xs lg:text-md text-gray-500"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </pre>
  );
};

// InlineCode component to display inline code
const InlineCode = ({ value }) => {
  // Return the value within a code tag
  return (
    <code className="px-1 rounded border-gray-500 border-2 bg-gray-100 dark:bg-gray-500 text-black  dark:text-gray-300">
      {value}
    </code>
  );
};

// FormatContent component to format content with code blocks and inline code
const FormatContent = ({ value }) => {
  // Split the value into segments based on code blocks
  const segments = value?.split(/(```[\s\S]*?```)/);

  // Return a div containing the formatted content
  return (
    <div>
      {segments?.map((segment, index) => {
        // If the segment is a code block, return a CodeBlock component
        if (segment?.startsWith("```") && segment.endsWith("```")) {
          const code = segment.slice(3, -3);
          return <CodeBlock key={index} value={code} />;
        } else {
          // Otherwise, split the segment into inline segments based on inline code
          const inlineSegments = segment?.split(/(`[\s\S]*?`)/);
          return (
            <p key={index}>
              {inlineSegments?.map((inlineSegment, inlineIndex) => {
                // If the inline segment is inline code, return an InlineCode component
                if (
                  inlineSegment.startsWith("`") &&
                  inlineSegment.endsWith("`")
                ) {
                  const code = inlineSegment.slice(1, -1);
                  return <InlineCode key={inlineIndex} value={code} />;
                } else {
                  // Otherwise, return the inline segment as is
                  return inlineSegment;
                }
              })}
            </p>
          );
        }
      })}
    </div>
  );
};

export default FormatContent;
