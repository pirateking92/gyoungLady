import { type SchemaTypeDefinition } from 'sanity'
import about from './about'
import cv from './cv'
import project from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, cv, project],
}
