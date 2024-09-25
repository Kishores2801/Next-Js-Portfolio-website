// interfaces.ts

// Post interface representing the structure of a Post document in Sanity
export interface Post {
    _id: string;
    title: string;
    description?: string;
    slug: {
      _type: 'slug';
      current: string;
    };
    author: {
      _type: 'reference';
      _ref: string;
    };
    mainImage: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
      alt: string;
    };
    categories: Array<{
      _type: 'reference';
      _ref: string;
    }>;
    publishedAt: string; // ISO datetime format
    body: BlockContent[]; // Refers to rich text with formatting, images, and code blocks
    viewCount: number;
  }
  
  // BlockContent interface for different block types in Sanity
  export interface BlockContent {
    _key: string;
    _type: 'block' | 'image' | 'code'; // Type of block (rich text, image, or code)
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'; // For text blocks
    children?: Span[]; // For rich text blocks
    markDefs?: MarkDef[]; // Link annotations
    lists?: 'bullet' | 'number'; // Optional for lists
    alt?: string; // For images
    asset?: {
      _ref: string;
      _type: 'reference';
    }; // For images
    code?: string; // For code blocks
  }
  
  // Span interface representing individual text spans in rich text blocks
  export interface Span {
    _key: string;
    _type: 'span';
    marks: string[]; // References to decorators like bold, italic, etc.
    text: string; // The actual text content
  }
  
  // MarkDef interface for annotations (like links)
  export interface MarkDef {
    _key: string;
    _type: 'link';
    href: string; // URL for link annotations
    openInNewTab?: boolean; // Optional: whether the link opens in a new tab
  }
  