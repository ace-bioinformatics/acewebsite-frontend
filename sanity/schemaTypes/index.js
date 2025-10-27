// Page Schemas
import homePage from './homePage'
import aboutPage from './aboutPage'
import hpcPage from './hpcPage'
import contactPage from './contactPage'

// Collection Schemas
import person from './person'
import project from './project'
import academicProgram from './academicProgram'
import event from './event'
import publication from './publication'
import eventHighlight from './eventHighlight'
import heroSlide from './heroSlide'

// Site Settings
import settings from './settings'

export const schema = {
  types: [
    // Site-wide settings
    settings,

    // Page configurations
    homePage,
    aboutPage,
    hpcPage,
    contactPage,

    // Content types
    person,
    project,
    academicProgram,
    event,
    publication,
    eventHighlight,
    heroSlide
  ],
}
