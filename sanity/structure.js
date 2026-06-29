// https://www.sanity.io/docs/structure-builder-cheat-sheet
const SINGLETONS = ['teamPageSettings', 'aboutPageSettings']

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Our Staff — Page Settings')
        .id('teamPageSettings')
        .child(
          S.document()
            .schemaType('teamPageSettings')
            .documentId('teamPageSettings')
        ),
      S.listItem()
        .title('About Page — Hero Carousel')
        .id('aboutPageSettings')
        .child(
          S.document()
            .schemaType('aboutPageSettings')
            .documentId('aboutPageSettings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId())
      ),
    ])
