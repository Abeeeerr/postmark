import { LeafRating } from './LeafRating'
import { NoiseIcon, WifiIcon } from './MetaIcons'
import { IcedCup } from './Illustrations'
import { drinkTone } from '../lib/tone'
import Stamp from './Stamp'

function formatDate(date) {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function countMatchas(entries) {
  return entries.filter((e) => e.drink?.toLowerCase().includes('matcha')).length
}

function StampCard({ entry, isNew, onOpen }) {
  return (
    <button onClick={onOpen} className="text-left transition-transform active:scale-[0.98]">
      <div className="stamp-frame" style={{ '--hole': '5px' }}>
        <div className="grain relative border border-cactus/70 bg-paper-deep">
          {entry.photo ? (
            <img src={entry.photo} alt={entry.name} className="aspect-square w-full object-cover" />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center">
              <IcedCup className="h-24 w-auto opacity-90" />
            </div>
          )}
          <div className="relative px-2.5 pb-2.5 pt-1">
            <div className="absolute -top-16 right-1 text-[9px]">
              <Stamp date={entry.date} city={entry.city} animate={isNew} />
            </div>
            <h3 className="font-display text-[16px] font-semibold leading-snug">{entry.name}</h3>
            <p className="mt-0.5 text-[11px] text-ink-soft">
              {entry.city} · {formatDate(entry.date)}
            </p>
            <div className="mt-1.5 flex items-center justify-between text-ink-soft">
              <LeafRating value={entry.drinkRating} size={13} tone={drinkTone(entry.drink)} />
              <div className="flex gap-1.5">
                <NoiseIcon level={entry.noise} />
                <WifiIcon status={entry.wifi} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function PassportGrid({ entries, newEntryId, onOpen, onAdd, onExport, onImport }) {
  const cities = new Set(entries.map((e) => e.city.toLowerCase())).size
  const matchas = countMatchas(entries)

  return (
    <div className="mx-auto max-w-2xl px-5 pb-28 pt-8">
      <header className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-terracotta">Postmark</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">My stamps</h1>
        {entries.length > 0 && (
          <p className="mt-2 text-sm text-ink-soft">
            {entries.length} café{entries.length === 1 ? '' : 's'} · {cities} {cities === 1 ? 'city' : 'cities'} · {matchas} matcha{matchas === 1 ? '' : 's'}
          </p>
        )}
      </header>

      {entries.length === 0 ? (
        <div className="grain rounded-2xl border border-dashed border-line bg-paper-deep/60 px-8 py-20 text-center">
          <p className="font-display text-xl italic text-ink-soft">No stamps yet —</p>
          <p className="mt-1 font-display text-xl italic text-ink-soft">go find a café ☕</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {entries.map((e) => (
            <StampCard key={e.id} entry={e} isNew={e.id === newEntryId} onOpen={() => onOpen(e)} />
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center gap-6 text-xs text-ink-soft">
        <button onClick={onExport} className="underline underline-offset-2">Export JSON</button>
        <label className="cursor-pointer underline underline-offset-2">
          Import JSON
          <input type="file" accept="application/json" className="hidden" onChange={onImport} />
        </label>
      </div>

      <button
        onClick={onAdd}
        aria-label="Add café"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-cactus text-3xl font-light text-white shadow-lg transition-transform active:scale-90"
      >
        +
      </button>
    </div>
  )
}
