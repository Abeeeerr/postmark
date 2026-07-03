import { openDB } from 'idb'

const DB_NAME = 'postmark'
const STORE = 'entries'

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE, { keyPath: 'id' })
  },
})

export async function getAllEntries() {
  const db = await dbPromise
  const entries = await db.getAll(STORE)
  return entries.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt - a.createdAt)
}

export async function saveEntry(entry) {
  const db = await dbPromise
  await db.put(STORE, entry)
}

export async function deleteEntry(id) {
  const db = await dbPromise
  await db.delete(STORE, id)
}

export async function exportJSON() {
  const entries = await getAllEntries()
  const blob = new Blob(
    [JSON.stringify({ app: 'postmark', version: 1, exportedAt: new Date().toISOString(), entries }, null, 2)],
    { type: 'application/json' }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `postmark-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importJSON(file) {
  const text = await file.text()
  const data = JSON.parse(text)
  if (!Array.isArray(data.entries)) throw new Error('Not a Postmark export')
  const db = await dbPromise
  const tx = db.transaction(STORE, 'readwrite')
  await Promise.all(data.entries.map((e) => tx.store.put(e)))
  await tx.done
  return data.entries.length
}
