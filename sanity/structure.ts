import { StructureResolver } from 'sanity/structure';

// Custom Sanity Studio structure
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Blog Grouping
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog Items')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ]),
        ),

      S.divider(), // Divider for clarity

      // Portfolio Grouping
      S.listItem()
        .title('Portfolio')
        .child(
          S.list()
            .title('Portfolio Items')
            .items(
              S.documentTypeListItems().filter(
                (item) =>
                  item.getId() &&
                  !['post', 'category', 'author'].includes(item.getId()!),
              ),
            ),
        ),
    ]);
