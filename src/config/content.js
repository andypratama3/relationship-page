export const content = {
  couple: {
    name1: "Nama Kamu",
    name2: "Nama Pasangan",
    startDate: "2023-02-13",
    photo: "",
  },
  hero: {
    title: "Untuk Kamu, {name2}",
    subtitle: "Setiap detik bersamamu adalah keajaiban yang tak pernah kuminta, tapi selalu kusyukuri.",
    subtitle2: "13 Februari 2023 — Sekarang & Selamanya",
    cta: "Mulai Perjalanan Kita",
  },
  letter: {
    greeting: "Sayangku, {name2}",
    body: `Kalau semesta bertanya apa hal terbaik yang pernah terjadi padaku,
aku akan menjawab namamu. Tanpa ragu. Tanpa jeda.

Kamu adalah alasan aku tersenyum tanpa alasan, alasan aku percaya
bahwa cinta itu nyata. Setiap hari bersamamu adalah hadiah yang
tidak pernah aku minta, tapi selalu aku syukuri.

Terima kasih sudah memilihku, setiap hari, setiap saat.

Aku mencintaimu. Kemarin, hari ini, dan selamanya.`,
    signature: "{name1}",
  },
  intro: [
    {
      title: "Halo Cantik 💖",
      body: "Eh… maksudku, halo {name2}. Aku bikin sesuatu khusus buat kamu.",
      cta: "Ketuk untuk lanjut",
    },
    {
      title: "Ketuk pelan-pelan ya ✨",
      body: "Setiap ketukan buka sedikit kejutan. Jangan buru-buru.",
      cta: "Ketuk lagi",
    },
    {
      title: "Siap-siap 🥰",
      body: "Isinya tentang kita — tawa, rindu, dan semua momen manis itu.",
      cta: "Satu ketukan lagi",
    },
    {
      title: "Buka dengan hati 💌",
      body: "Kalau sudah siap, ketuk tombol di bawah dan masuk ke dunia kita.",
      cta: "Masuk ke Cerita Kita 💗",
    },
  ],
  timeline: [
    {
      date: "2023-02-13",
      title: "Pertama Bertemu",
      desc: "Hari dimana duniamu dan duniaku bertabrakan, dan takdir memulai cerita kita.",
      image: "",
      icon: "💕"
    },
    {
      date: "2023-02-20",
      title: "Jadian",
      desc: "Kamu bilang iya, dan aku bahagia selamanya. Awal dari segalanya.",
      image: "",
      icon: "💍"
    },
    {
      date: "2023-03-05",
      title: "First Date",
      desc: "Kencan pertama, gugup tapi menyenangkan. Momen yang tak terlupakan.",
      image: "",
      icon: "🌹"
    },
    {
      date: "2023-06-15",
      title: "First Trip",
      desc: "Petualangan pertama kita bersama. Setiap sudut menjadi kenangan.",
      image: "/images/timeline/trip1.jpg",
      icon: "✈️"
    },
    {
      date: "2024-02-13",
      title: "Anniversary 1 Tahun",
      desc: "Setahun penuh cinta, dan masih bertambah setiap hari.",
      image: "/images/timeline/trip2.jpg",
      icon: "🎉"
    },
  ],
  reasons: [
    "Caramu tertawa saat aku bercanda jelek",
    "Kamu selalu tahu kapan aku butuh pelukan",
    "Matamu yang selalu bikin aku tenang",
    "Kamu sabar menghadapi aku yang menyebalkan",
    "Karena kamu, aku jadi versi terbaik diriku",
    "Caramu peduli pada hal-hal kecil",
    "Senyummu yang bisa mengubah hari burukku",
    "Kamu selalu mendukung mimpiku",
    "Caramu membuat aku merasa istimewa",
    "Karena bersamamu, rumah terasa di mana saja",
  ],
  gallery: [
    "/images/gallery/love1.jpg",
    "/images/gallery/love2.jpg",
    "/images/gallery/love3.jpg",
  ],
  playlist: [],
  theme: {
    palette: "dark-romantic",
  },
};

export const formatContent = (data) => {
  const formatted = { ...data };

  const replacePlaceholders = (text) => {
    if (typeof text !== 'string') return text || '';
    return text
      .replace(/{name1}/g, data.couple?.name1 || 'Nama Kamu')
      .replace(/{name2}/g, data.couple?.name2 || 'Nama Pasangan');
  };

  const cleanStr = (v) => (typeof v === 'string' ? v.trim() : '');

  formatted.hero = {
    ...(data.hero || {}),
    title: replacePlaceholders(data.hero?.title),
    subtitle: replacePlaceholders(data.hero?.subtitle),
    subtitle2: replacePlaceholders(data.hero?.subtitle2),
  };
  formatted.letter = {
    ...(data.letter || {}),
    greeting: replacePlaceholders(data.letter?.greeting),
    body: replacePlaceholders(data.letter?.body),
    signature: replacePlaceholders(data.letter?.signature),
  };

  // Sanitasi: buang string kosong agar tidak ada src="" yang lolos ke <img>/<audio>
  formatted.gallery = Array.isArray(data.gallery)
    ? data.gallery.map(cleanStr).filter(Boolean)
    : [];
  formatted.timeline = Array.isArray(data.timeline)
    ? data.timeline.map((item) => ({ ...item, image: cleanStr(item?.image) }))
    : [];
  formatted.playlist = Array.isArray(data.playlist)
    ? data.playlist.filter((t) => t && cleanStr(t.src))
    : [];
  formatted.couple = { ...(data.couple || {}), photo: cleanStr(data.couple?.photo) };
  formatted.intro = Array.isArray(data.intro)
    ? data.intro.map((s) => ({
        title: replacePlaceholders(s?.title || ''),
        body: replacePlaceholders(s?.body || ''),
        cta: replacePlaceholders(s?.cta || 'Lanjut'),
      }))
    : [];

  return formatted;
};
