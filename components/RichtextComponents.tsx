
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Light theme
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Dark theme

export const RichtextComponents = {
  types: {
    // Handling image rendering with proper alt text and lazy loading
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return <p>Image not available</p>;

      return (
        <div className="relative w-full h-72 md:h-96 m-6 mx-auto">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog Post Image"}
            className="object-contain"
            fill
            loading="lazy"
          />
        </div>
      );
    },

    // Code block with dynamic theme switching for dark and light mode
    code: ({ value }: any) => {
      const { language = "javascript", code } = value || {};

      if (!code) return <p className="text-red-500">Code block is empty</p>;

      const isDarkMode = typeof window !== "undefined" && 
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      return (
        <SyntaxHighlighter
          language={language}
          style={isDarkMode ? monokai : docco} // Switch theme dynamically
          showLineNumbers
          wrapLines
          className="rounded-md overflow-hidden p-4 transition-colors 
            bg-gray-900 text-white dark:bg-gray-800"
        >
          {code.trim()} {/* Trimming to avoid trailing spaces */}
        </SyntaxHighlighter>
      );
    },
  },

  block: {
    // Text and headings with dark mode support
    normal: ({ children }: any) => (
      <p className="mb-5 text-gray-900 dark:text-gray-300">{children}</p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mb-5 mt-4 text-gray-900 dark:text-blue-500">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mb-4 mt-3 text-gray-900 dark:text-blue-500">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mb-3 mt-3 text-gray-900 dark:text-blue-500">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mb-2 mt-2 text-gray-900 dark:text-blue-500">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-6 list-disc space-y-2 text-gray-900 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="ml-6 list-decimal space-y-2 text-gray-900 dark:text-gray-300">
        {children}
      </ol>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-900 dark:text-gray-300">{children}</em>
    ),
    underline: ({ children }: any) => (
      <span className="underline text-gray-900 dark:text-gray-300">
        {children}
      </span>
    ),
    strikeThrough: ({ children }: any) => (
      <span className="line-through text-gray-900 dark:text-gray-300">
        {children}
      </span>
    ),

    // Link rendering with target and rel handling
    link: ({ value, children }: any) => {
      const { href, openInNewTab } = value;
      const target = openInNewTab ? "_blank" : "_self";
      const rel = openInNewTab ? "noopener noreferrer" : undefined;

      return (
        <Link
          href={href}
          target={target}
          rel={rel}
          className="text-blue-600 dark:text-blue-400 underline"
          aria-label={`Link to ${href}`}
        >
          {children}
        </Link>
      );
    },
  },
};
