// poodle mascot, pose: 'sit' | 'run'. Animation classes live in index.css
const S = '#2a1710', F = '#f3c26b', D = '#e2a550', C = '#fbe7bd'
const Fluff = ({ items, fill = F }) => (
  <>
    {items.map(([x, y, r], i) => <circle key={'s' + i} cx={x} cy={y} r={r} fill={fill} stroke={S} strokeWidth="6" />)}
    {items.map(([x, y, r], i) => <circle key={'f' + i} cx={x} cy={y} r={r} fill={fill} />)}
  </>
)
const ring = (cx, cy, R, r, n) => Array.from({ length: n }, (_, i) => [cx + R * Math.cos((i / n) * 6.283), cy + R * Math.sin((i / n) * 6.283), r])
const Leg = ({ x, y, cls, h = 30 }) => (
  <g className={cls} style={{ transformOrigin: `${x + 6}px ${y}px` }}>
    <rect x={x} y={y} width="12" height={h} rx="6" fill={F} stroke={S} strokeWidth="4" />
    <path d={`M${x + 2} ${y + h - 3} h8`} stroke={S} strokeWidth="2" />
  </g>
)

export default function Dog({ pose = 'sit', className = 'w-28', flip = false, moving = true }) {
  const run = pose === 'run', still = !moving && run
  const head = run ? 'translate(34 6)' : ''
  return (
    <svg viewBox="0 0 200 190" className={`${className} ${still ? 'dog-still' : ''} overflow-visible`} style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <ellipse cx="100" cy="182" rx={run ? 62 : 44} ry="5" fill="#000" opacity=".12" />
      {run ? (
        <g className="dog-bounce">
          <g className="dog-tail" style={{ transformOrigin: '60px 120px' }}><Fluff items={[[34, 112, 13], [26, 104, 8], [42, 104, 8]]} /></g>
          <Leg x={60} y={132} cls="dog-legB" /><Leg x={112} y={132} cls="dog-legA" />
          <Fluff items={[[84, 126, 26], [108, 128, 26], [96, 118, 24], [70, 134, 18]]} />
          <Leg x={74} y={138} cls="dog-legA" /><Leg x={124} y={138} cls="dog-legB" />
        </g>
      ) : (
        <g>
          <g className="dog-tail" style={{ transformOrigin: '58px 150px' }}><Fluff items={[[36, 134, 13], [28, 126, 8], [44, 126, 8]]} /></g>
          <Fluff items={[[98, 140, 30], [80, 152, 24], [120, 152, 22], [100, 126, 24]]} />
          <Fluff items={[[70, 152, 22], [74, 140, 18]]} />
          <rect x="86" y="140" width="13" height="38" rx="6" fill={F} stroke={S} strokeWidth="4" />
          <rect x="104" y="140" width="13" height="38" rx="6" fill={F} stroke={S} strokeWidth="4" />
          <path d="M86 172 h12 M104 172 h12" stroke={S} strokeWidth="2" />
        </g>
      )}
      <g transform={head} className={run ? 'dog-head' : 'dog-sway'}>
        <ellipse cx="58" cy="86" rx="13" ry="24" transform="rotate(14 58 86)" fill={D} stroke={S} strokeWidth="5" />
        <ellipse cx="142" cy="86" rx="13" ry="24" transform="rotate(-14 142 86)" fill={D} stroke={S} strokeWidth="5" />
        <Fluff items={[[100, 24, 13], [90, 28, 8], [110, 28, 8], [100, 17, 8]]} />
        <Fluff items={[[100, 72, 32], ...ring(100, 72, 32, 13, 10)]} />
        <ellipse cx="100" cy="90" rx="23" ry="18" fill={C} />
        <circle cx="72" cy="88" r="8" fill="#f2998f" opacity=".6" /><circle cx="128" cy="88" r="8" fill="#f2998f" opacity=".6" />
        <g className="dog-blink"><g className="dog-eyes">
          <circle cx="85" cy="72" r="6.5" fill={S} /><circle cx="115" cy="72" r="6.5" fill={S} />
          <circle cx="87" cy="70" r="2.2" fill="#fff" /><circle cx="117" cy="70" r="2.2" fill="#fff" />
        </g></g>
        <ellipse cx="100" cy="83" rx="6" ry="4" fill={S} />
        <path d="M93 90 q7 8 14 0" stroke={S} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M97 94 q3 6 6 0" fill="#f08a8a" />
        <path d="M70 110 Q100 124 130 110" stroke="#8a3b17" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M95 118 l5 5 l5 -5 q-3 -5 -5 -1 q-2 -4 -5 1z" fill={C} stroke={S} strokeWidth="1.5" />
      </g>
    </svg>
  )
}
