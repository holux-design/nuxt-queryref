import { useRoute } from 'nuxt/app'

declare const ref, watch

type QueryParamType = 'string' | 'string[]' | 'number' | 'number[]' | 'boolean' | 'boolean[]' | 'object' | 'object[]'

export const queryRef = <T>(key: string, defaultValue: T = null) => {
  const type = getType(defaultValue)

  const loadedValue = loadQueryParamFromURL(key, type)

  const queryRef = ref(loadedValue || defaultValue)

  watch(
    queryRef,
    async (newVal) => {
      updateQueryParamInURL(key, newVal, defaultValue, type)
    },
    { deep: true },
  )

  return queryRef as { value: T }
}

function updateQueryParamInURL(key, value, defaultValue, type: QueryParamType) {
  if (typeof window == 'undefined') return

  if (['string[]', 'number[]', 'boolean[]'].includes(type)) value = value.join(',')
  if (['object', 'object[]'].includes(type)) value = JSON.stringify(value)

  const url = new URL(window.location.href)
  if (value != defaultValue) {
    url.searchParams.set(key, value.toString())
  }
  else {
    url.searchParams.delete(key)
  }
  url.search = decodeURIComponent(url.search)
  window.history.pushState(null, '', url.toString())
}

function loadQueryParamFromURL(key: string, type: QueryParamType) {
  const loadedString = useRoute()?.query?.[key]?.toString()
  if (!loadedString) return

  if (type == 'number') return +loadedString
  if (type == 'number[]') return loadedString.split(',').map(n => +n)
  if (type == 'string[]') return loadedString.split(',')
  if (type == 'boolean') return loadedString == 'true'
  if (type == 'boolean[]') return loadedString.split(',').map(n => n == 'true')
  if (['object', 'object[]'].includes(type)) return JSON.parse(loadedString)
  return loadedString
}

function getType(defaultValue: any): QueryParamType {
  let _type: any = typeof defaultValue
  if (_type == 'object' && defaultValue?.length) _type = `${typeof defaultValue[0]}[]`

  return _type
}
