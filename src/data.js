const img = (p, w = 640) => `https://puppy.instabizweb.com/_next/image?url=${encodeURIComponent('/media/' + p)}&w=${w}&q=75`
export const WA_NUMBER = '971541676733'
export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
export const WA = waLink("Hi TeddyPups! I'd love to know more about your puppies.")
export const CONTACT = {
  phone: '+971 54 167 6733',
  tel: '+971541676733',
  email: 'teddypupsadmin@gmail.com',
  address: 'Downtown Dubai, United Arab Emirates',
  socials: [
    ['Instagram', 'https://www.instagram.com/teddypups.worldwide/'],
    ['TikTok', 'https://www.tiktok.com/@teddypupsuae'],
    ['Facebook', 'https://www.facebook.com/profile.php?id=61567496944539'],
  ],
}
export const NAV = [
  ['Home', '/'], ['Puppies', '/puppies'], ['Happy families', '/happy-families'],
  ['How it works', '/how-it-works'], ['FAQ', '/faq'], ['Visit & contact', '/contact'],
]
const D = ['#a8451d', '#5b3424', '#d9923f', '#c4604f', '#7a3a22']
const P = [
  ['Max', 'Maltipoo, boy, 3 months, with video', 'Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp'],
  ['Korean Teacup Maltipoo', 'girl, 2 months, with video', 'gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg'],
  ['Korean Teacup Poodle', 'girl, 2 months', 'xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg'],
  ['Maltipoo & Cavapoo', 'boy, 3 months Maltipoo & 2 months Cavapoo, with video', 'YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg'],
  ['Toy Poodle', 'boy & girl, 2 months', 'vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg'],
  ['Maltipoo', 'girl, 3 months, with video', '3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg'],
  ['Pomeranian', 'girl, 3 months', '3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg'],
  ['Copper', 'Cavapoo, boy, 2 months', 'O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg'],
  ['Shih Tzu', 'girl, 2 months', 'qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg'],
  ['Shih Tzu', 'boy, 2 months', 'crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg'],
  ['Maltipoo', 'girl, 2.5 months', 'wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg'],
  ['Maltipoo', 'girl, 2 months', 'lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg'],
  ['Korean Teacup Pomeranian', 'girl, 2 months', 'EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg'],
  ['Korean Teacup Pomeranian', 'girl, 2 months', 'vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg'],
  ['Korean Teacup Pomeranian', 'boy, 2 months', 'nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg'],
]
export const BREEDS = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu']
export const keyOf = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')
const SLUGS = ['maltipoo-max-male', 'korean-teacup-maltipoo-female', 'korean-teacup-poodle-female', 'maltipoo-cavapoo-male', 'toy-poodle-male-female', 'maltipoo-female-2', 'pomeranian-female', 'copper-male', 'shitzu-female', 'shitzu-male', 'maltipoo-female-1', 'maltipoo-female', 'korean-teacup-pomeranian-1', 'korean-teacup-pomeranian', 'korean-teacup-pomeranian-male']
export const PUPS = P.map(([name, sub, p], i) => {
  const parts = sub.split(', ')
  const text = `${name} ${sub}`.toLowerCase()
  const korean = name.startsWith('Korean Teacup')
  return {
    name, sub, slug: SLUGS[i], photo: img(p), big: img(p, 1080), door: D[i % 5], paw: i % 3 === 0,
    video: parts.includes('with video'),
    meta: parts.filter((x) => x !== 'with video').join(' · '),
    breeds: BREEDS.filter((b) => text.includes(b.toLowerCase())),
    sex: ['boy', 'girl'].filter((x) => sub.includes(x)),
    // Korean Teacup puppies are treated as imported, everything else as local
    korean, imported: korean,
  }
})
export const SHOWROOM = img('FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg')
export const FAMILIES = [
  ['dI8Jv0KRTiLJ/d2d7e5375b/27b888_7d940ce5701f48d98327e4a242b53ac4-mv2.jpg'],
  ['TI-WtaFssfQt/c41fb2a387/27b888_15920f828b864dd1b44b98ec4e964c53-mv2.jpg'],
  ['j6T9eswP2eS8/59c6879a1d/27b888_bc27df54dcce410196c6016475364ff3-mv2.jpg'],
  ['HJgL4rRnmReV/533701358f/27b888_082e47dfd8144423a96dc70d966fa5b2-mv2.jpg'],
  ['uc5ANs5jm7r7/7160d8b7b1/27b888_f7f4966e59e94db591784d4ec546682f-mv2.jpg'],
  ['pRJubyqHw8p7/d58c4c07ee/27b888_b073c5815f7c4f92ad9a57741a653663-mv2.jpg'],
  ['4wOJk9azop_-/65ecf66bf0/27b888_cfe895dbcc2d4bff85f890be9b496543-mv2.jpg'],
  ['3h20rIasJCOa/10c307cb1c/27b888_a7e7ab6a931e4c79a798bab9927d396e-mv2.jpg'],
].map(([p, cap]) => ({ src: img(p), big: img(p, 1080), cap }))
export const FAQS = [
  ['Are your puppies vaccinated and health-checked?', 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.'],
  ['Can I meet a puppy before I decide?', 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.'],
  ['Can I take my puppy home the same day?', 'Local puppies are available immediately, so you can take your puppy home the same day.'],
]

export const STEPS = [
  ['Choose your breed', "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
  ['Get photos & details', 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.'],
  ['Secure & safe delivery', 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.'],
]
export const FAQ_ALL = [
  ...FAQS,
  ['Will I get photos and details before I decide?', 'Yes. Our team shares real photos, health details and all the information you need directly on WhatsApp before anything is confirmed.'],
  ['How does importing a puppy work?', "Tell us the breed you're looking for. We order from trusted, reputable breeders and handle the import and a safe, stress-free delivery to you. Exclusive Korean teacup puppies are available this way."],
  ['Do you deliver or ship?', "Yes. We deliver across the UAE and offer worldwide shipping. Message us on WhatsApp with your location and we'll guide you through the options."],
  ['Is there support after my puppy comes home?', "Yes. We're here to help, from choosing your puppy right through to post-delivery support, 24/7."],
  ['Where is your showroom?', 'Our showroom is in Downtown Dubai, United Arab Emirates. Message us on WhatsApp to arrange a visit.'],
]

export const FAQ_BOARD = [
  FAQS[0],
  FAQS[1],
  FAQS[2],
  ['Do you import puppies from abroad?', "Yes. Tell us the breed you're looking for and we order from trusted, reputable breeders. Exclusive Korean teacup puppies are available this way."],
  ['How does an imported puppy travel to Dubai?', "We handle the import and arrange a safe, stress-free delivery so your puppy reaches you comfortably. Message us on WhatsApp and we'll guide you through the details for your breed."],
  FAQ_ALL[3],
  ['Do you deliver?', "Yes. We deliver across the UAE and offer worldwide shipping. Message us on WhatsApp with your location and we'll guide you through the options."],
  ['Which breeds do you usually have?', "Mostly Maltipoo, Pomeranian, Poodle, Cavapoo and Shih Tzu, including Korean teacup Maltipoos, Poodles and Pomeranians. See the Puppies page for who is available right now."],
  FAQ_ALL[7],
]

export const GONE = [
  ['Ace', 'mihUKGFCatU3/0461cca56e/27b888_bac41adfadc44dce846a1c3fd0cdb0de-mv2.avif'],
  ['Leo', 'QgFG5s09n-ss/81af626d2d/27b888_5f9a7189bb21477d832047aae2040921-mv2.avif'],
  ['Mia', '4vu6_PGfL64H/537c367d85/27b888_747a4667fec640c69aad9bc045d61ac6-mv2.avif'],
  ['Sadie', '159oT4F46uhk/b66c2be87f/27b888_ea6e7e0fcd43447d854657b6de98d4cb-mv2.avif'],
  ['Pomeranian', 'bMSEHnYcBTFF/970fdc1ee6/27b888_5e612a215bf343328c08d99e0e9c5a37-mv2.avif'],
].map(([name, p]) => ({ name, src: img(p) }))
