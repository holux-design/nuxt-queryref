import { useRoute } from 'nuxt/app'

declare const ref, watch

type QueryParamType = 'string' | 'string[]' | 'number' | 'number[]' | 'Object'

export const useQueryRef = (key: string, defaultValue: any = null, type: QueryParamType = 'string') => {
  const loadedValue = loadQueryParamFromURL(key, type)

  const queryRef = ref(loadedValue || defaultValue)

  watch(
    queryRef,
    async (newVal) => {
      updateQueryParamInURL(key, newVal, type)
    },
    { deep: true },
  )

  return queryRef
}

function updateQueryParamInURL(key, value, type: QueryParamType) {
  if (typeof window == 'undefined') return

  if (['number[]', 'string[]'].includes(type)) value = value.join(',')
  if (type == 'Object') value = JSON.stringify(value)

  const url = new URL(window.location.href)
  url.searchParams.set(key, value)
  url.search = decodeURIComponent(url.search)
  window.history.pushState(null, '', url.toString())
}

function loadQueryParamFromURL(key: string, type: QueryParamType) {
  const loadedString = useRoute()?.query?.[key]?.toString() || ''
  if (!loadedString) return

  if (type == 'number') return +loadedString
  if (type == 'number[]') return loadedString.split(',').map((n) => +n)
  if (type == 'string[]') return loadedString.split(',')
  if (type == 'Object') return JSON.parse(loadedString)
  return loadedString
}
