import { useEffect, useState } from 'react'
import { getAllEntries, saveEntry, deleteEntry, exportJSON, importJSON } from './lib/db'
import PassportGrid from './components/PassportGrid'
import EntryForm from './components/EntryForm'
import ShareCard from './components/ShareCard'

export default function App() {
  const [entries, setEntries] = useState([])
  const [view, setView] = useState('home') // 'home' | 'add'
  const [openEntry, setOpenEntry] = useState(null)
  const [newEntryId, setNewEntryId] = useState(null)

  useEffect(() => {
    getAllEntries().then(setEntries)
  }, [])

  async function refresh() {
    setEntries(await getAllEntries())
  }

  async function handleSave(entry) {
    await saveEntry(entry)
    setNewEntryId(entry.id)
    await refresh()
    setView('home')
  }

  async function handleDelete(id) {
    await deleteEntry(id)
    setOpenEntry(null)
    await refresh()
  }

  async function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const n = await importJSON(file)
      await refresh()
      alert(`Imported ${n} entr${n === 1 ? 'y' : 'ies'}.`)
    } catch (err) {
      alert(err.message)
    }
    e.target.value = ''
  }

  if (view === 'add') {
    return <EntryForm onSave={handleSave} onCancel={() => setView('home')} />
  }

  return (
    <>
      <PassportGrid
        entries={entries}
        newEntryId={newEntryId}
        onOpen={setOpenEntry}
        onAdd={() => setView('add')}
        onExport={exportJSON}
        onImport={handleImport}
      />
      {openEntry && <ShareCard entry={openEntry} onClose={() => setOpenEntry(null)} onDelete={handleDelete} />}
    </>
  )
}
