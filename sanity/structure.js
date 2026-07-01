// https://www.sanity.io/docs/structure-builder-cheat-sheet
const SINGLETONS = ['teamPageSettings', 'aboutPageSettings', 'eventsPageSettings']

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
      S.listItem()
        .title('Events Page — Hero Carousel')
        .id('eventsPageSettings')
        .child(
          S.document()
            .schemaType('eventsPageSettings')
            .documentId('eventsPageSettings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId())
      ),
    ])
