const blogQuery = '*[_type == "post"] | order(publishedAt desc)';
const firstPostQuery = '*[_type == "post"] | order(publishedAt desc)[0]';

export { blogQuery };