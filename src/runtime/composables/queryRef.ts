import { useRoute } from 'nuxt/app'
import { ref, watch } from '#imports'
import type { Ref } from '#imports'

type QueryParamType = 'string' | 'string[]' | 'number' | 'number[]' | 'boolean' | 'boolean[]' | 'object' | 'object[]'

export const queryRef = <T>(key: string, defaultValue: T | null = null) => {
  const type = getType(defaultValue)
  const fixedDefaultValue = JSON.parse(JSON.stringify(defaultValue))

  const loadedValue = loadQueryParamFromURL(key, type)

  const queryRef = ref(loadedValue || defaultValue)

  watch(
    queryRef,
    async (newVal) => {
      updateQueryParamInURL(key, newVal, fixedDefaultValue, type)
    },
    { deep: true },
  )

  return queryRef as Ref<T>
}

function updateQueryParamInURL(key, value, defaultValue, type: QueryParamType) {
  if (typeof window == 'undefined') return

  value = valueToString(value, type)
  defaultValue = valueToString(defaultValue, type)

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

function valueToString(value, type): string {
  if (['string[]', 'number[]', 'boolean[]'].includes(type)) value = value.join(',')
  if (['object', 'object[]'].includes(type)) value = JSON.stringify(value)

  return value
}
