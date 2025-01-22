import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-queryref',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugin'))

    addImports({
      name: 'useQueryRef',
      as: 'useQueryRef',
      from: resolver.resolve('runtime/composables/useQueryRef'), // load composable from plugin
    })
  },
})
