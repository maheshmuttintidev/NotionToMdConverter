/* eslint-disable react/no-children-prop */
"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NotionToMDConverter: React.FC = ({ markdown }: any) => {
  return <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />;
};

export default NotionToMDConverter;
