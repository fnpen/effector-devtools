import { useStore } from "effector-react";
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import stringifyObject from "stringify-object";
import { $selectedMessage } from "../store/details";

export const Json = ({ data }) => {
  if (!data) {
    return null;
  }

  const content = stringifyObject(data, {
    indent: "  ",
    singleQuotes: false,
  });

  return (
    <SyntaxHighlighter language="json" style={vs}>
      {content}
    </SyntaxHighlighter>
    // <pre>
    //   {content}
    // </pre>
  );
};

export const DetailsBodyPayload = () => {
  const selectedMessage = useStore($selectedMessage);

  return selectedMessage ? (
    <div className="ed-details-body-payload">
      <Json data={selectedMessage.payloadData} />
    </div>
  ) : null;
};
