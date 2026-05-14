import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  basePath: '/acewebsite-backend',
  name: 'acewebsite',
  title: 'ACE Uganda Content Studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
