import { useState } from 'react'
import { compressImage } from '../lib/image'
import { drinkTone } from '../lib/tone'
import { LeafRatingInput } from './LeafRating'

const today = () => new Date().toISOString().slice(0, 10)

const field = 'w-full rounded-lg border border-line bg-white/60 px-3 py-2.5 text-[15px] outline-none focus:border-cactus'
const label = 'block text-xs font-medium tracking-[0.14em] uppercase text-ink-soft mb-1.5'

function Toggle({ options, value, onChange }) {
  return (
    <div className="flex rounded-lg border border-line overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 px-2 py-2.5 text-sm transition-colors ${
            value === opt.value ? 'bg-cactus text-white font-medium' : 'bg-white/60 text-ink-soft'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function EntryForm({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState(today())
  const [photo, setPhoto] = useState(null)
  const [drink, setDrink] = useState('')
  const [drinkRating, setDrinkRating] = useState(0)
  const [ambience, setAmbience] = useState(0)
  const [noise, setNoise] = useState(null)
  const [wifi, setWifi] = useState(null)
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  async function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (file) setPhoto(await compressImage(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !city.trim() || saving) return
    setSaving(true)
    await onSave({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      name: name.trim(),
      city: city.trim(),
      date,
      photo,
      drink: drink.trim(),
      drinkRating,
      ambience,
      noise,
      wifi,
      note: note.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md px-5 pb-24 pt-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">New stamp</h1>
        <button type="button" onClick={onCancel} className="text-sm text-ink-soft underline underline-offset-2">
          Cancel
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className={label}>Café name *</label>
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Kissa Kissa" required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>City / area *</label>
            <input className={field} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Bandra" required />
          </div>
          <div>
            <label className={label}>Date</label>
            <input type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} max={today()} />
          </div>
        </div>

        <div>
          <label className={label}>Photo</label>
          <label className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-line bg-white/40">
            {photo ? (
              <img src={photo} alt="café" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-ink-soft">Tap to add a photo</span>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </label>
        </div>

        <div>
          <label className={label}>Drink ordered</label>
          <input className={field} value={drink} onChange={(e) => setDrink(e.target.value)} placeholder="iced matcha latte" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Drink rating</label>
            <LeafRatingInput value={drinkRating} onChange={setDrinkRating} tone={drinkTone(drink)} />
          </div>
          <div>
            <label className={label}>Ambience</label>
            <LeafRatingInput value={ambience} onChange={setAmbience} />
          </div>
        </div>

        <div>
          <label className={label}>Noise level</label>
          <Toggle
            value={noise}
            onChange={setNoise}
            options={[
              { value: 'quiet', label: 'Quiet' },
              { value: 'hum', label: 'Hum' },
              { value: 'loud', label: 'Loud' },
            ]}
          />
        </div>

        <div>
          <label className={label}>Wifi</label>
          <Toggle
            value={wifi}
            onChange={setWifi}
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
              { value: 'unknown', label: "Didn't check" },
            ]}
          />
        </div>

        <div>
          <label className={label}>One-line note</label>
          <input
            className={`${field} font-display italic`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={140}
            placeholder="the window seat gets golden hour just right"
          />
          <p className="mt-1 text-right text-xs text-ink-soft">{note.length}/140</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-8 w-full rounded-xl bg-chocolate py-3.5 font-medium text-white transition-colors active:bg-chocolate-deep disabled:opacity-60"
      >
        {saving ? 'Stamping…' : 'Stamp it'}
      </button>
    </form>
  )
}
