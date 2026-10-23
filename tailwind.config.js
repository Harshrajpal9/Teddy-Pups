export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { cream: '#fffdf8', choco: '#2a1710', rust: '#9b411b', wa: '#218a52', gold: '#f4d08a' },
    fontFamily: { display: ['Fraunces', 'serif'], body: ['Figtree', 'sans-serif'], hand: ['Gaegu', 'cursive'] },
    keyframes: {
      bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      walk: { '0%': { left: '2%' }, '100%': { left: '88%' } },
      twinkle: { '0%,100%': { opacity: .2 }, '50%': { opacity: 1 } },
      fly: { '0%,100%': { transform: 'translate(0,0) rotate(-4deg)' }, '50%': { transform: 'translate(14px,-10px) rotate(3deg)' } },
    },
    animation: { bob: 'bob 2.4s ease-in-out infinite', walk: 'walk 18s linear infinite alternate',
      twinkle: 'twinkle 2.5s ease-in-out infinite', fly: 'fly 5s ease-in-out infinite' },
  } },
}
