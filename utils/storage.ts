let storage: Storage | null = null
if (typeof window !== 'undefined') {
  storage = window.localStorage
}

export function load(key: string): any | null {
  if (!storage) {
    return null
  }
  const data = storage.getItem(key)
  if (!data) {
    return null
  }
  return JSON.parse(data)
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key: string, value: any): void {
  if (!storage) {
    return
  }
  storage.setItem(key, JSON.stringify(value))
}

export function remove(key: string): void {
  if (!storage) {
    return
  }
  storage.removeItem(key)
}

export function clear(): void {
  if (!storage) {
    return
  }
  storage.clear()
}
