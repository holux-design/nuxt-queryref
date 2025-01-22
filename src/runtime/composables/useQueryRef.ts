import { useRoute } from 'nuxt/app'

declare const ref, watch

export const useQueryRef = (key: string, defaultValue: any = null): any => {
  const loadedValue = loadQueryParamFromURL(key)

  const queryRef = ref(loadedValue || defaultValue)

  watch(
    queryRef,
    async (newVal) => {
      updateQueryParamInURL(key, newVal, defaultValue)
    },
    { deep: true },
  )

  return queryRef
}

function updateQueryParamInURL(key, value, defaultValue) {
  if (typeof window == 'undefined') return

  const url = new URL(window.location.href)

  if (value == defaultValue) {
    url.searchParams.delete(key)
  } else {
    url.searchParams.set(key, value)
  }

  url.search = decodeURIComponent(url.search)
  window.history.pushState(null, '', url.toString())
}

function loadQueryParamFromURL(key: string): string | undefined {
  return useRoute()?.query?.[key]?.toString()
}
