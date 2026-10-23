import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import Dog from "../components/Dog";
import useTitle from "../components/useTitle";
import { FAMILIES } from "../data";

const TILT = [-2.5, 1.8, -1, 2.4, -1.8, 1.2, 2.2, -1.4];
const TAPE = ["#f1d9a0", "#f4c9c2", "#cfe2ee", "#e3e8c4"];
const PAGE = 12;

function Polaroid({ f, i, onOpen }) {
  const [ready, setReady] = useState(false);
  return (
    <li
      className="break-inside-avoid mb-9"
      style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${f.cap}`}
        className="group relative block w-full bg-white p-2.5 pb-3 shadow-[0_8px_18px_rgba(90,50,20,.25)] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0 focus-visible:outline focus-visible:outline-4 focus-visible:outline-rust/50"
      >
        <i
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rotate-2 opacity-90"
          style={{ background: TAPE[i % TAPE.length] }}
          aria-hidden="true"
        />
        <div className="bg-[#efe3cc]">
          <img
            src={f.src}
            alt={f.cap}
            loading="lazy"
            onLoad={() => setReady(true)}
            className={`block w-full h-auto transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
            style={{ minHeight: ready ? 0 : 180 }}
          />
        </div>
        <p className="mt-2.5 px-1 text-center font-hand font-bold text-base leading-snug text-choco">
          {f.cap}
        </p>
      </button>
    </li>
  );
}

function Lightbox({ list, idx, setIdx }) {
  const f = list[idx];
  useEffect(() => {
    const key = (e) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((idx + 1) % list.length);
      if (e.key === "ArrowLeft") setIdx((idx - 1 + list.length) % list.length);
    };
    addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [idx, list.length, setIdx]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[90] grid place-items-center bg-choco/90 p-4"
      onClick={() => setIdx(null)}
    >
      <figure
        className="relative max-w-3xl max-h-full bg-white p-3 pb-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={f.big}
          alt={f.cap}
          className="block max-h-[75vh] w-auto mx-auto"
        />
        <figcaption className="mt-3 text-center font-hand font-bold text-xl">
          {f.cap}
        </figcaption>
      </figure>
      <button
        type="button"
        aria-label="Close"
        onClick={() => setIdx(null)}
        className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full bg-cream text-choco"
      >
        <X />
      </button>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          setIdx((idx - 1 + list.length) % list.length);
        }}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-cream text-choco"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          setIdx((idx + 1) % list.length);
        }}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-cream text-choco"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default function HappyFamilies() {
  useTitle("Happy families");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState(null);
  const list = FAMILIES;
  const visible = list.slice(0, shown);

  return (
    <div className="page-in bg-[#fdebcf] pt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <header className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
          <div>
            <p className="font-hand font-bold text-lg text-rust">
              our wall of happy endings
            </p>
            <h1 className="h-display text-[clamp(3.2rem,9vw,6rem)] flex items-center gap-4">
              Happy families{" "}
              <Heart
                className="text-rust shrink-0 w-7 h-7 md:w-9 md:h-9"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </h1>
            <p className="mt-5 max-w-lg text-lg text-choco/80 leading-relaxed">
              Nothing makes us happier than seeing our puppies in loving homes!
              Here are some beautiful moments shared by our amazing clients
              after welcoming their furry friends.
            </p>
            <p className="mt-4 font-hand font-bold text-lg text-rust">
              {list.length} moments and counting
            </p>
          </div>
          <figure className="relative rotate-2 bg-[#fffaf0] p-5 shadow-[0_8px_18px_rgba(90,50,20,.22)] lg:mt-2">
            <i
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#cfe2ee]/90 -rotate-1"
              aria-hidden="true"
            />
            <blockquote className="font-display font-bold text-base leading-snug text-choco">
              “TeddyPups truly made our dream a reality. They supported us at
              every step of the import journey. Our Maltipoo arrived healthy,
              cheerful, and absolutely perfect. Having 24/7 support throughout
              the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="mt-3 font-hand font-bold text-sm text-rust">
              Sarah M., Dubai, UAE
            </figcaption>
          </figure>
        </header>

        <ul className="mt-14 columns-2 md:columns-3 lg:columns-4 gap-6 md:gap-8">
          {visible.map((f, i) => (
            <Polaroid key={f.src} f={f} i={i} onOpen={() => setOpen(i)} />
          ))}
        </ul>

        {shown < list.length && (
          <div className="mt-4 text-center">
            <button
              type="button"
              className="btn btn-rust !text-base !px-8 !py-3"
              onClick={() => setShown(shown + PAGE)}
            >
              Show more moments
            </button>
          </div>
        )}
      </div>

<section className="relative mt-24 overflow-hidden bg-[#f7e0b8]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 118px, rgba(155,65,27,.07) 118px 120px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-28 md:pb-32 flex flex-wrap items-end justify-center gap-6 text-center">
          <Dog className="w-20 md:w-28" />
          <p className="font-hand font-bold text-lg md:text-2xl text-choco/90 pb-4">every one of them was a Teddy Pup once</p>
        </div>
        <svg className="absolute inset-x-0 bottom-0 w-full h-20 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 70 C240 120 480 125 720 105 C960 85 1200 40 1440 30 L1440 120 L0 120Z" fill="#2a1710" />
        </svg>
      </section>

      {open !== null && <Lightbox list={list} idx={open} setIdx={setOpen} />}
    </div>
  );
}
