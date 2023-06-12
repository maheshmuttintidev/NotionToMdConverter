"use client";
import { useState, ChangeEvent, FormEvent } from "react";
const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
import NotionToMDConverter from "./notion-to-md-converter";

const NotionRequirements: React.FC = () => {
  const [token, setToken] = useState("");
  const [pageId, setPageId] = useState("");
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [markdown, setMarkdown] = useState("");

  const handlePageIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPageId(event.target.value);
  };

  const handleTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setDisabled(true);
      console.log("token: ", token);
      console.log("pageId: ", pageId);
      const notion = new Client({
        auth: token,
      });

      const n2m = new NotionToMarkdown({ notionClient: notion });
      console.log("n2m: ", n2m);

      const mdblocks = await n2m.pageToMarkdown(`${pageId}`);
      console.log("mdblocks: ", mdblocks);
      const mdString = n2m.toMarkdownString(mdblocks);
      console.log("mdString: ", mdString);
      console.log("mdString.parent===>", mdString.parent);
      setMarkdown(mdString.parent);
      setIsSuccess(true);
      setError(false);
      setDisabled(false);
    } catch (error) {
      console.log("error: ", error);
      setError(true);
      setIsSuccess(false);
      setDisabled(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
        <div className="mb-4">
          <label
            htmlFor="notion-integration-token"
            className="block text-sm font-medium text-slate-100"
          >
            Notion Integration Token:
          </label>
          <input
            id="notion-integration-token"
            type="text"
            value={token}
            onChange={handleTokenChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="target-page-id"
            className="block text-sm font-medium text-slate-100"
          >
            Target Page ID:
          </label>
          <input
            id="target-page-id"
            type="text"
            value={pageId}
            onChange={handlePageIdChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 text-black"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
          }`}
          disabled={disabled}
        >
          {disabled ? "Processing..." : "Submit"}
        </button>
      </form>

      {error ? (
        <>
          <div className="flex flex-col items-center justify-center mt-10">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              Oops! Something went wrong.
            </h2>
            <p className="text-slate-100">
              We apologize for the inconvenience. Please try again later.
            </p>
          </div>
        </>
      ) : isSuccess ? (
        <>
          <h2 className="text-2xl">Result</h2>
          <div>
            {/* @ts-ignore */}
            <NotionToMDConverter markdown={markdown} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default NotionRequirements;
