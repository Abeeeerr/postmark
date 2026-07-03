import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { LeafRating } from './LeafRating'
import { NoiseIcon, WifiIcon } from './MetaIcons'
import { IcedCup } from './Illustrations'
import { drinkTone } from '../lib/tone'
import Stamp from './Stamp'

const EXPORT_WIDTH = 1080 // 4:5 → 1080×1350

export default function ShareCard({ entry, onClose, onDelete }) {
  const cardRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  async function download() {
    if (!cardRef.current || downloading) return
    setDownloading(true)
    try {
      const scale = EXPORT_WIDTH / cardRef.current.offsetWidth
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: scale,
        cacheBust: true,
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `${entry.name.toLowerCase().replace(/\s+/g, '-')}-stamp.png`
      a.click()
    } finally {
      setDownloading(false)
    }
  }

  const formattedDate = new Date(entry.date + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto bg-ink/80 p-5 backdrop-blur-sm">
      {/* The exported node — cream canvas so perforation holes stay cream
          on Instagram (alpha would flatten to black), stamp centered. */}
      {/* absolute inner wrapper so content can never stretch the 4:5 box */}
      <div ref={cardRef} className="relative w-full max-w-sm bg-paper" style={{ aspectRatio: '4 / 5' }}>
        <div className="absolute inset-0 p-6">
        <div className="stamp-frame h-full" style={{ '--hole': '9px' }}>
          <div className="grain relative flex h-full flex-col overflow-hidden border border-cactus/70 bg-paper-deep px-5 pb-5 pt-4">
            <p className="text-center text-[9px] font-medium uppercase tracking-[0.35em] text-ink-soft">
              Postmark
            </p>

            {entry.photo ? (
              <img src={entry.photo} alt={entry.name} className="mt-3 h-[52%] w-full object-cover" />
            ) : (
              <div className="flex min-h-0 flex-1 items-center justify-center py-4">
                <IcedCup className="h-full max-h-40 w-auto" />
              </div>
            )}

            <div className="relative mt-auto pt-3">
              <div className="absolute -top-16 right-0 text-[13px]">
                <Stamp date={entry.date} city={entry.city} />
              </div>
              {entry.note && (
                <p className="mb-2 max-w-[75%] font-display text-[14px] italic leading-snug">“{entry.note}”</p>
              )}
              <h2 className="font-display text-[22px] font-semibold leading-tight">{entry.name}</h2>
              <p className="mt-0.5 text-xs text-ink-soft">
                {entry.city} · {formattedDate}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <LeafRating value={entry.drinkRating} size={16} tone={drinkTone(entry.drink)} />
                  {entry.drink && <span className="text-[11px] text-ink-soft">{entry.drink}</span>}
                </div>
                <div className="flex gap-1.5 text-ink-soft">
                  <NoiseIcon level={entry.noise} />
                  <WifiIcon status={entry.wifi} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="mt-5 flex w-full max-w-sm items-center justify-between">
        <button onClick={onClose} className="text-sm text-paper/80 underline underline-offset-2">
          Close
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => { if (confirm('Remove this stamp?')) onDelete(entry.id) }}
            className="rounded-lg px-3 py-2.5 text-sm text-paper/60"
          >
            Delete
          </button>
          <button
            onClick={download}
            disabled={downloading}
            className="rounded-xl bg-cactus px-5 py-2.5 text-sm font-medium text-white active:bg-cactus-deep disabled:opacity-60"
          >
            {downloading ? 'Rendering…' : 'Download image'}
          </button>
        </div>
      </div>
    </div>
  )
}
