import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Light theme
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Dark theme

export const RichtextComponents = {
  types: {
    // Image component with responsive scaling and lazy loading
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return <p>Image not available</p>;

      return (
        <div className="relative w-full h-56 sm:h-72 md:h-96 m-4 mx-auto">
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

    // Code block with responsive design and theme switching for dark mode
    code: ({ value }: any) => {
      const { language = "javascript", code } = value || {};

      if (!code) return <p className="text-red-500">Code block is empty</p>;

      const isDarkMode =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      return (
        <div className="overflow-x-auto my-4 rounded-md">
          <SyntaxHighlighter
            language={language}
            style={isDarkMode ? monokai : docco}
            showLineNumbers
            wrapLines
            className="rounded-md overflow-hidden p-4 bg-gray-900 text-white dark:bg-gray-800"
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      );
    },

    // Enhanced Table Rendering with horizontal scroll on mobile
    table: ({ value }: any) => (
      <div className="overflow-x-auto my-4">
        <table className="table-auto border-collapse border border-gray-300 dark:border-gray-600 w-full">
          <thead>
            <tr>
              {value?.columns?.map((column: string, index: number) => (
                <th
                  key={index}
                  className="border border-gray-300 dark:border-gray-600 p-2 text-left font-semibold text-gray-900 dark:text-gray-300 whitespace-nowrap"
                >
                  {column || "Header"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value?.rows?.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} className="border border-gray-300 dark:border-gray-600">
                {row?.cells?.map((cell: any, cellIndex: number) => (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 dark:border-gray-600 p-2 text-gray-900 dark:text-gray-300 whitespace-nowrap"
                  >
                    {cell || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },

  block: {
    // Responsive text and headings with dark mode support
    normal: ({ children }: any) => (
      <p className="mb-5 text-gray-900 dark:text-gray-300 text-sm sm:text-base">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-3xl sm:text-4xl font-bold mb-5 mt-4 text-gray-900 dark:text-blue-500">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-3 text-gray-900 dark:text-blue-500">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl sm:text-2xl font-bold mb-3 mt-3 text-gray-900 dark:text-blue-500">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg sm:text-xl font-bold mb-2 mt-2 text-gray-900 dark:text-blue-500">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic text-gray-600 dark:text-gray-400 text-sm sm:text-base">
        {children}
      </blockquote>
    ),
  },

  list: {
    // Responsive lists with dark mode support
    bullet: ({ children }: any) => (
      <ul className="ml-5 list-disc space-y-2 text-gray-900 dark:text-gray-300 text-sm sm:text-base">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="ml-5 list-decimal space-y-2 text-gray-900 dark:text-gray-300 text-sm sm:text-base">
        {children}
      </ol>
    ),
  },

  marks: {
    // Responsive text styles with dark mode support
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

    // Link rendering with responsive style and target handling
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
