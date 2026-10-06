"use client"
import { useState } from "react"

export function Marquee({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false)
  return (
    <div className="folio-marquee" aria-label="Areas I work in">
      <div className="folio-marquee-track" style={{ animationPlayState: paused ? "paused" : "running" }}>
        {[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1 || undefined}>{items.map(item => <span key={item}>{item}<span aria-hidden="true">✳</span></span>)}</div>)}
      </div>
      <button onClick={() => setPaused(value => !value)} aria-label={paused ? "Play scrolling text" : "Pause scrolling text"}>{paused ? "Play" : "Pause"}</button>
    </div>
  )
}
