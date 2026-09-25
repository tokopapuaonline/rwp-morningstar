# Ruang West Papua (RWP) — v12

Platform kajian **Marxisme Ilmiah** dan **Sosialisme Ilmiah** dengan analisis struktural mendalam atas **West Papua**.

## Baru di v34 — Materi Tiga Hukum Dialektika yang Diperluas (`marxisme.html`)

Bagian **4. Tiga Hukum Dialektika** di `marxisme.html` dikembangkan dari **1.985 karakter menjadi 51.394 karakter** — kira-kira **26 kali** lebih panjang — menjadi bagian tersendiri yang dapat dipakai untuk belajar mandiri.

**Yang baru.** Sebelumnya bagian 4 hanya tiga paragraf singkat. Sekarang ia menjadi tujuh subbagian:

| Subbagian | Isi |
|---|---|
| **4.1 Hukum I** — Kesatuan dan Perjuangan Dua Pihak yang Berlawanan | Konsep; asal-usul Hegel, Marx, Engels, Lenin, Mao; contoh umum; lima kesalahan tafsir; kaitannya dengan hukum lain |
| **4.2 Hukum II** — Perubahan Kuantitas Menjadi Kualitas | Struktur yang sama, termasuk pembedaan **perbaikan** dari **perubahan jenis** |
| **4.3 Hukum III** — Negasi atas Negasi | Struktur yang sama, termasuk contoh biji Engels dan pola ekspropriasi Marx |
| **4.4 Penerapan pada West Papua** | Analisis khusus dalam kerangka **Hak Menentukan Nasib Sendiri** |
| **4.5 Tabel Ringkas** | Enam kolom: hukum, pertanyaan yang dijawab, inti rumusan, karya rujukan, contoh umum, penerapan pada Papua |
| **4.6 Daftar Istilah Kunci** | 15 istilah, masing-masing bertaut ke definisi lengkap di `glosarium.html` |
| **4.7 Pertanyaan Refleksi** | 9 pertanyaan berkelompok: menemukan pertentangan, menakar lompatan, membaca arah |

**Penerapan pada Papua** (4.4) dibagi tiga bagian yang mengikuti ketiga hukum:

- **Kontradiksi utama dan kontradiksi non-antagonis di Papua** — tabel yang memisahkan pertentangan **antagonis** dari **non-antagonis** beserta cara penyelesaiannya masing-masing, dengan penekanan pada ajaran Mao: kesalahan terbesar gerakan adalah memperlakukan calon sekutu sebagai musuh.
- **Akumulasi kuantitatif menuju lompatan kualitatif** — tabel empat jalur penumpukan (kesadaran, pengalaman organisasi, kondisi material, ketidakseimbangan pembangunan), dengan catatan Lenin bahwa **kemarahan saja tidak cukup** bila organisasi belum siap.
- **Pola negasi atas negasi** — tabel tiga tahap sejarah perjuangan: hak kolektif atas tanah, pengambilalihan kewenangan dari luar, lalu tuntutan penentuan nasib sendiri yang memulihkan **isi** tahap awal pada tingkat yang lebih tinggi.

**Catatan metodologis yang dicantumkan di dalam halaman.** Bagian 4.4 dibuka dengan peringatan bahwa analisis itu bergerak pada tingkat **kerangka**, bukan hasil penelitian lapangan — dan bahwa setiap penggunaan praktis tetap menuntut analisis konkret atas situasi konkret, agar tidak berubah menjadi pemaksaan skema.

**Konsistensi gaya & teknis.** Blok baru dibungkus penanda `div.rwp-dj`, dan **seluruh** aturan CSS v34 bersarang di dalamnya, sehingga **tidak ada halaman lain yang tersentuh**. Warna memakai token `:root` yang sudah ada, jadi mode terang, mode gelap manual, dan mode Otomatis ikut berubah sendiri. Anotasi glosarium otomatis tetap bekerja: 74 istilah pada bagian ini ditandai `span.rwp-term` dengan **slug yang sudah ada di glosarium** — tidak ada slug baru yang dikarang. Sidik jari baru yang mudah diperiksa: **kata `rwp-dj` 1×** pada `marxisme.html`, **1×** tampil di HTML, **0×** di 14 halaman lain; **tabel** pada bagian ini naik dari 0 menjadi **5**; total `<h3>` di halaman naik menjadi **68**; cache-buster menjadi **`?v=34`** (63 referensi, sisa `?v=33` = 0). Diverifikasi di Chromium: **60 kombinasi** (15 halaman × 4 viewport: 390×844, 844×390, 1024×600, 1440×900) **tanpa gulir mendatar dan tanpa galat halaman**; kontras **0 gagal dari 371 baris** di kedua mode tema; tooltip glosarium, tombol "Jelajahi glosarium", rail zona, tema tiga-mode, varian landscape v31/v32, dan `prefers-reduced-motion` semuanya tetap bekerja; `js/*.js` dan `css/style.css` **byte-identik dengan v33**.

### Tiga cacat nyata yang ditemukan &amp; diperbaiki pada v34

1. **Butir daftar di dalam kotak merah tidak terbaca (mode terang).** Butir pada kotak "callout" berwarna merah mewarisi warna teks situs `#3a3a42` di atas gradien merah — kontras terukur **1,18**, jauh di bawah ambang 4,5. Ini mengenai **9 butir pertanyaan refleksi**. Diperbaiki dengan memakai warna teks yang sama seperti `.article .callout p` bawaan situs (`#f3d9d4`) dan penanda butir emas. Hasil: **0 dari 371 baris teks gagal** di mode terang dan gelap.
2. **Tautan rujukan glosarium di bawah ambang.** Warna `--red` (`#c0392b`) di atas latar krem menghasilkan kontras **4,29**. Diperbaiki menjadi `#b32b1f` (**5,05**), dengan sorot emas saat hover.
3. **Tautan jangkar tertutup header sticky.** Situs sudah memberi `scroll-margin-top` untuk zona, tetapi **tidak** untuk judul bagian: membuka `marxisme.html#hukum-1` menempatkan judul tepat di `top=0` sementara header menempati 0–55 px (ponsel) / 0–193 px (desktop). Ditambahkan `scroll-margin-top` khusus judul di dalam `.rwp-dj` (200 px desktop, 80 px pada lebar ≤900 px). Terukur: delapan jangkar baru mendarat di **top=200** pada 390 px **dan** 1440 px, dan **jangkar lama terukur identik dengan v33** (`#sumber` 0→0, `#zona-artikel` 96→96) — nol regresi.

## Baru di v32 — Varian Landscape Tablet Mendatar (15 halaman)

Varian **ketiga** dari keluarga tata letak mendatar. Kalau v31 melayani **ponsel yang dimiringkan** (≤ 900px), v32 melayani **tablet mendatar** — terutama **1024×600** dan jendela pendek-melebar lain di rentang **901–1180px**.

**Kapan bentuk ini dipakai.** Ketiganya harus benar: **lebar 901–1180px**, **orientasi mendatar**, dan **tinggi pandang ≤ 640px**. Tiga rambu penting:

- **Varian ponsel v31 tidak diubah sama sekali.** Aturan v32 dibungkus `@media(min-width:901px)`, jadi secara struktural tidak mungkin menyentuh layar ≤ 900px. Penanda `.land-lebar` (v31) dan `.land-tab` (v32) juga punya spektrum lebar yang terpisah, sehingga keduanya tidak pernah menyala bersamaan.
- **Desktop (1440px) tidak tersentuh** — sebaliknya, aturan v28 desktop juga dibungkus `min-width:1181px`, jadi tidak ada tabrakan di batas 1180/1181px.
- **Ponsel tegak 390×844 tetap menumpuk** — syarat orientasi & tinggi menjaga hal itu.
- Ambang tinggi sengaja **640px**, bukan 560px seperti v31: pada tablet 1024×600 peramban menyisakan 24–64px, sehingga tinggi pandangnya nyata-nyata jatuh di bawah 600px. Dengan ambang 560px varian ini nyaris tidak pernah menyala.

**Yang berubah saat bentuk ini aktif** (semua **diukur**, bukan diklaim — mode ON vs OFF pada 1024×600):

| Bagian | Sebelum | Sesudah |
|---|---|---|
| **Hero/karusel** (`index.html`) | 560px | **300px** |
| **Magazine Widget Area** (901–1140px) | 2 kolom | **3 kolom** (@1180px sudah 4 kolom, dibiarkan) |
| **Rail peta zona (Zona 4a)** | 7 baris, `overflow-x: visible` | **1 baris chip**, `overflow-x: auto` |
| **Sidebar Tab Area (Zona 4b)** | 4 baris (@1180px) | **1 baris** (`overflow-x: auto`) |
| **Kerangka `.z3col`** | menumpuk | artikel kiri + panel tab kanan (292px) |
| **Rel kartu pendamping** (901–1060px) | kolom 3 kartu bertumpuk | **rel mendatar** |

Tinggi dokumen `index.html` turun dari 72.342px → **70.675px** pada 1024×600.

**Yang TIDAK diubah:** isi artikel (15/15 halaman byte-identik), anotasi glosarium otomatis (tooltip istilah), tombol "Jelajahi glosarium" + penyaringan kategori, rail peta zona + sorotan bergulir otomatis, panel mega menu "Tata Letak", kontrol tema tiga-mode, dan tautan footer.

**Berkas yang disentuh:**
- `css/magazine.css` — blok **v32** (32.1–32.14), **aditif** di akhir berkas: rel chip rail, panel tab mendatar, rel kartu pendamping, hero pendek, grid 3–4 kolom, mode gelap (atribut + Otomatis), `prefers-reduced-motion`, cetak, plus dua perbaikan warisan (`.split` track implisit & `.check-list` yang tak bisa menyusut) yang **hanya** berlaku di dalam cakupan ini.
- `js/magazine.js` — blok **v32**: satu `matchMedia("(min-width: 901px) and (max-width: 1180px) and (orientation: landscape) and (max-height: 640px)")` yang menyalakan penanda `.land-tab` **+ chip petunjuk "⇄ geser mendatar"**. Tanpa timer, tanpa menulis gaya apa pun, tidak menyentuh `prefers-reduced-motion`. Mengekspos `window.RWPLandTab` untuk pengujian.
- **15 halaman HTML** — cache-buster `?v=32`.
- `sitemap.xml` — `lastmod` **2026-09-24**.

**Verifikasi (15 halaman × 9 viewport).** Tanpa gulir mendatar **dan** tanpa elemen melampaui layar di **390×844, 640×360, 844×390, 900×600, 1024×600, 1024×640, 1024×700, 1180×600, 1440×900**. Penanda `.land-tab` / `.land-lebar` benar di seluruh 9 viewport × 15 halaman. Sorotan rail terbukti **tepat di ketujuh zona** pada `analisa-papua.html`, `marxisme.html`, dan `sosialisme.html`. `prefers-reduced-motion`: transisi **0s**, bentuk mendatar & sorotan tetap jalan. Tanpa JavaScript: teks utuh, rail & tautan tetap tampil, tanpa hiasan.

## Baru di v33 — Lima Perbaikan Prioritas Hasil Audit (15 halaman)

Lima perbaikan yang paling berdampak dari audit situs live, dikerjakan sekaligus. **Isi artikel tidak disentuh sama sekali** — 15/15 halaman **byte-identik** dengan v32 setelah blok v33 dinormalisasi.

### 1. `canonical` di seluruh 15 halaman
Sebelumnya **0/15** halaman punya `canonical`. Kini setiap halaman menunjuk ke URL absolutnya sendiri di origin live `https://tokopapuaonline.github.io/rwp-morningstar/` (ditambah `og:url`). Terverifikasi: **15 nilai canonical unik untuk 15 halaman**, masing-masing `1×` per halaman.

### 2. `og:image` + Twitter Card lengkap
Sebelumnya **0/15** halaman punya `og:image` maupun Twitter Card. Kini setiap halaman memakai **gambar hero yang benar-benar ada di `images/`** (bukan URL karangan) — dalam format **JPEG/PNG asli**, bukan WebP, karena dukungan Open Graph untuk WebP belum merata di semua platform pratinjau — lengkap dengan dimensi:

`og:image`, `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale`, `og:site_name`, `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`.

Semua `og:image` **terverifikasi merujuk berkas lokal yang ada** (15/15), dengan `og:image:type` sesuai (`image/jpeg` / `image/png`).

### 3. `sitemap.xml` & `robots.txt` diperbaiki
Seluruh **15 `<loc>`** yang tadinya menunjuk domain mati `https://ruang-west-papua.netlify.app/` (**HTTP 404**) kini menunjuk origin live yang benar — **0 sisa domain mati**. `robots.txt` yang tadinya menulis sitemap relatif (`Sitemap: /sitemap.xml`, tidak sah menurut spesifikasi) kini menunjuk URL absolut yang valid.

### 4. Kartu unggulan terjepit — diperbaiki
**Cacat nyata, dan lebih luas daripada dugaan awal.** Pada `analisa-papua.html` (dan halaman ber-`mf-grid wide` lain), kolom teks `.mf-card` hanya **32–71px** (≈4–8 karakter per baris, judul jadi 4–5 baris — persis "±35px / ±5 karakter" pada laporan audit). Cacat ini **bukan** di `1041–1140px` seperti dugaan awal, melainkan bertahan hingga **760px**.

Penyebabnya: baris 286 `.mf-grid.wide .mf-side{grid-template-columns:repeat(3,1fr)}` berspesifisitas **(0,3,0)** dan berada **di luar media query**, sedangkan `@media(max-width:680px){.mf-side{...1fr}}` hanya **(0,1,0)** — dan **media query tidak menambah spesifisitas**. Jadi kartu tetap 3 kolom sampai 560px ke bawah.

Perbaikan: `repeat(auto-fit,minmax(268px,1fr))` dengan spesifisitas lebih tinggi **tanpa `!important`**, ditambah `.mf-thumb{flex-shrink:1;min-width:0}` (thumbnail dulu dipaku `flex-shrink:0`). Karena v31/v32 menyetel `display:flex` + `!important` pada `.mf-side`, **kedua varian mendatar itu tidak berubah sama sekali** — aturan baru hanya berlaku saat `.mf-side` benar-benar masih grid.

### 5. Optimasi gambar WebP + preload hero
- **12 gambar raster dikonversi ke WebP kualitas 80**: `2.638.918 → 1.676.588 byte` (**−36,5%**, hemat **940 KB**). Terbesar: `marx.jpg` **−60,9%**, `grasberg.jpg` **−46,0%**, `galeri_pendidikan.jpg` **−45,3%**.
- Setiap `<img>` raster lokal dibungkus **`<picture><source type="image/webp">`** — **73 pembungkus** di 15 halaman. Berkas `.jpg`/`.png` **tetap ada** sebagai fallback, jadi tanpa dukungan WebP pun halaman tetap utuh (diverifikasi: **tanpa JavaScript**, dan `.jpg` masih tersedia).
- **`preload` hero** (`rel="preload" as="image" type="image/webp" fetchpriority="high"`) ditambahkan tepat **1×** per halaman.
- `.rwp-pic{display:contents}` menjaga pembungkus `<picture>` tidak mengubah tata letak.

**Rasio gambar tertunda (deferred-load) beranda:** dari **716.488 → 395.036 byte** (**−44,9%**).

**Ukuran halaman (HTML + CSS + JS + semua raster lokal yang direferensikan) — diukur dari baseline v32:**

| Halaman | Sebelum | Sesudah | Turun |
|---|---:|---:|---:|
| **index.html** (beranda) | **1.241.108 B** (≈1.212 KB) | **921.890 B** (≈900 KB) | **−25,7%** · hemat **312 KB** · HTTP **−37** permintaan |
| **analisa-papua.html** | 1.119.484 B | 848.285 B | −24,2% · hemat 265 KB · **−41** permintaan |
| marxisme.html | 785.128 B | 586.686 B | −25,3% · hemat 194 KB · **−41** permintaan |
| sosialisme.html | 1.025.946 B | 769.464 B | −25,0% · hemat 250 KB · **−41** permintaan |
| glosarium.html | 1.099.085 B | 857.214 B | −22,0% · hemat 236 KB · **−41** permintaan |

Rincian beranda: HTML 211.326 → 213.560 B (+2.234 B — tambahan `canonical`/`og`/Twitter + pembungkus `<picture>`, `og:image` URL ditulis panjang), CSS+JS tetap 312.792 B, gambar termuat **716.488 → 395.036 B** (**−321.452 B**).

**Catatan jujur soal ukuran:** angka "1.059–1.354 KB" pada laporan audit saya berasal dari **pemuatan jaringan penuh** — termasuk 5 thumbnail YouTube pihak ketiga (`i.ytimg.com` ×5, **252.516 B**, di luar kendali kami) dan berkas `.jpg` yang tidak lagi dipakai browser karena `<source type="image/webp">` dipakai lebih dulu. Yang **tidak berubah**: HTML murni tetap ~211 KB karena separuh isinya adalah **penanda anotasi glosarium `.rwp-term` (821 span)** dari v29 yang memang tidak boleh dihapus.

**Prioritas #2 & #3 tidak berdiri sendiri karena sudah tercakup #1 dan #3:**

**#2 — Satu domain kanonik, tidak lagi tersebar.** Sebelumnya `sitemap.xml` menunjuk domain mati (404) sementara situs hidup di GitHub Pages. Kini `canonical`, `og:url`, dan seluruh 15 `<loc>` menunjuk **satu origin yang sama** — tidak ada lagi halaman yang "menunjuk ke tempat lain".

**#3 — Google Search Console siap.** `robots.txt` kini menunjuk sitemap **absolut** yang valid, dan sitemap itu berisi 15 URL yang **semuanya live (HTTP 200)**. Langkah tersisa hanya mengirimkan sitemap di Search Console (tidak ada yang bisa saya lakukan dari sisi berkas).

**Yang TIDAK diubah:** isi artikel (15/15 halaman byte-identik), anotasi glosarium otomatis (tooltip istilah), tombol "Jelajahi glosarium" + penyaringan kategori di `glosarium.html`, rail peta zona + sorotan bergulir otomatis, panel mega menu "Tata Letak", kontrol tema tiga-mode, tautan footer, varian landscape ponsel (v31), dan varian landscape tablet mendatar (v32).

### 6. Bonus — domain mati di blok cetak
Audit menemukan teks "Sumber: …" pada blok cetak tiap halaman (`.ph-meta` > `[data-print-url]`) masih menampilkan domain mati `https://ruang-west-papua.netlify.app/` — jadi bila pembaca mencetak/menyimpan halaman ke PDF, alamat yang tercetak mengarah ke tempat yang salah. Ke-15 halaman kini menampilkan origin yang benar. (Ini **bukan** tautan — 0 dari 15 berada di dalam `href` — melainkan teks, sehingga tidak pernah muncul sebagai tautan menggantung di audit mana pun.) Komentar `sitemap.xml` juga dibersihkan dari contoh domain mati.

**Berkas yang disentuh:**
- **15 halaman HTML** — blok `<!-- RWP-SEO v33 -->` (canonical/og/twitter), pembungkus `<picture>` (73 total), `preload` hero, perbaikan alamat di blok cetak, cache-buster `?v=34`. Isi artikel tidak tersentuh.
- `css/magazine.css` — blok **v33** (33.1–33.5), aditif di akhir berkas.
- `sitemap.xml` — 15 `<loc>` diperbaiki, `lastmod` **2026-09-24**.
- `robots.txt` — sitemap absolut.
- `images/*.webp` — 12 berkas baru (`.jpg`/`.png` dipertahankan sebagai fallback).

**Verifikasi.** Tag HTML seimbang (`unclosed=[]`, `bad=[]`, `dup=[]`) di **15/15**; kurung CSS **style.css 771/771 · magazine.css 1161/1161**; `node --check` bersih untuk `main.js` & `magazine.js`; **0 tautan internal menggantung** dari **5.669 referensi** (query string dibuang lebih dulu); `canonical` / `og:image` / `twitter:card` / meta AdSense masing-masing tepat **1×** di **15/15**; skrip AdSense tepat **1×** dengan `ins` seimbang `push({})`; **0 sisa `?v=32`** di HTML/CSS/JS; Chromium **390×844, 844×390, 1024×600, 1440×900** tanpa gulir mendatar; tooltip glosarium, tombol "Jelajahi glosarium" + penyaring kategori, rail zona, kontrol tema tiga-mode, dan `prefers-reduced-motion` tetap berfungsi.

## Baru di v31 — Gaya Landscape Mobile (15 halaman)

Seluruh 15 halaman kini punya **tata letak khusus untuk layar genggam yang mendatar** — bukan sekadar menumpuk satu kolom, melainkan memanfaatkan lebar layar secara mendatar.

**Kapan bentuk ini dipakai.** Satu syarat tunggal yang dipakai bersama: **lebar ≤ 900px**, **orientasi mendatar**, dan **tinggi pandang ≤ 560px** (ponsel dimiringkan seperti 844×390 atau 640×360, atau jendela yang pendek & melebar). Tiga rambu penting:

- Halaman **desktop (1440px) tidak pernah tersentuh** — syarat lebar ≤ 900px menjaga hal itu.
- Ponsel **tegak 390×844 tetap satu kolom** seperti sebelumnya — syarat orientasi menjaga hal itu.
- **Tablet mendatar (mis. 1024×600)** tetap memakai tata letak desktop yang sudah ada, bukan bentuk genggam yang sempit — syarat tinggi ≤ 560px menjaga hal itu.

**Apa yang berubah saat bentuk mendatar aktif.**

| Bagian | Bentuk mendatar |
|---|---|
| **Top Featured Area** (Zona 2) | kartu sorotan menjadi **rel mendatar** yang dapat digulir mendatar; kartu samping diletakkan sebaris (setiap kartu ± 300px, gulir mendatar) |
| **Magazine Widget Area** (Zona 3) | widget menjadi **rel mendatar** (± 320px per kartu) |
| **Rail peta zona** (Zona 4a) | berhenti menjadi kolom yang menempel, menjadi **SATU BARIS chip mendatar** yang dapat digulir mendatar; chip aktif tetap merah–emas dengan nomor zona |
| **Sidebar Tab Area** (Zona 4b) | panel **chip tab mendatar** yang dapat digulir mendatar |
| **Hero / karusel** | **lebih pendek & lebar** (tinggi dikunci satu nilai), isi di tengah, jarak dirapatkan |
| **Galeri** | kartu galeri **3 kolom rapat** |
| **Tipografi & jarak** | dirapatkan agar nyaman dibaca mendatar; footer 2 kolom |

**Di mana aturannya diletakkan.** Seluruh aturan tampilan berada di **satu tempat** — blok `v31` pada `css/magazine.css` (bagian 31.1–31.13), semuanya di dalam `@media(max-width:900px)` sehingga tata letak desktop tidak berubah sama sekali. Blok `v31` pada `js/magazine.js` **hanya menyalakan penanda** `land-lebar` pada `<html>` berdasarkan satu `matchMedia()`; ia tidak menulis gaya apa pun dan **tidak memakai timer**. Jadi tidak ada aturan yang ditulis dua kali dan tidak ada risiko putaran ukur-ulang.

**Tanpa JavaScript** kelas penanda tidak pernah dipasang, sehingga halaman tampil normal satu kolom — teks utuh dan semua tautan tetap dapat diklik.

**Tidak merusak fitur yang sudah ada.** Bentuk mendatar tetap menghormati `prefers-reduced-motion` (seluruh transisi/animasi dan gulir-halus dimatikan, susunan mendatar tetap dipakai), mode gelap terang, dan aturan cetak (bentuk mendatar dilepas, halaman kembali satu kolom). Rail zona, panel mega menu "Tata Letak", anotasi glosarium otomatis, tombol "Jelajahi glosarium", penyaring kategori, kontrol tema tiga-mode, dan tautan footer semuanya tetap bekerja.

## Baru di v30 — Tombol "Jelajahi Glosarium" & Glosarium Tersaring per Kategori

- **Tombol "Jelajahi glosarium" kini ada di akhir tiap artikel**, tepat **setelah isi artikel selesai dan sebelum blok Artikel Terkait** (`15 halaman`, termasuk `index.html`, `faq.html`, `forum.html`, dan `galeri-foto.html`). Tombol menautkan ke `glosarium.html?kategori=<kode>#filter` sehingga pembaca **langsung tiba di kategori yang relevan** dengan halaman yang baru saja dibaca.
- **Kategori ditentukan dari isi artikel, bukan ditebak.** Seluruh 94 istilah glosarium dipetakan ke 7 kategori (A–G) dari `glosarium.html`, lalu kemunculan setiap istilah dihitung pada teks artikel tiap halaman (header, footer, sidebar, dan skrip dikecualikan):

  | Halaman | Kategori tombol | Entri kategori |
  |---|---|---:|
  | `index.html` | E · Kelas & Ekonomi | 17 |
  | `analisa-papua.html` | E · Kelas & Ekonomi | 17 |
  | `marxisme.html` | E · Kelas & Ekonomi | 17 |
  | `sosialisme.html` | E · Kelas & Ekonomi | 17 |
  | `sosialisme-papua.html` | E · Kelas & Ekonomi | 17 |
  | `sosialisme-ilmiah.html` | E · Kelas & Ekonomi | 17 |
  | `anti-seksisme-patriarki.html` | E · Kelas & Ekonomi | 17 |
  | `faq.html` | E · Kelas & Ekonomi | 17 |
  | `forum.html` | E · Kelas & Ekonomi | 17 |
  | `partai-organisasi-revolusioner.html` | A · Partai | 21 |
  | `front-taktis-strategis.html` | C · Front & Aliansi | 10 |
  | `analisa-marxisme-papua.html` | B · Organisasi | 15 |
  | `hak-menentukan-nasib-sendiri-papua.html` | G · Nasional & Kolonial | 10 |
  | `galeri-foto.html` | G · Nasional & Kolonial | 10 |
  | `glosarium.html` | indeks 7 kategori (A–G) | 94 |

- **Catatan pembanding otomatis**: bila ada kategori lain yang juga menonjol di halaman itu, tombol menampilkan baris kedua — mis. *"Setelah kategori utama di atas, istilah kategori Nasional & Kolonial paling banyak muncul di halaman ini: 10 kemunculan pada teks artikel."* **Catatan hanya muncul bila peringkat pertama dan kedua tidak seri**, supaya klaimnya selalu dapat dipertanggungjawabkan.
- **Sisi `glosarium.html` menerima parameter URL**: `?kategori=E`, `?kategori=partai`, atau `#kategori-partai` semuanya dikenali. Halaman lalu **menyaring kategori itu**, menggulir ke panel cari & saring, mengganti judul panel menjadi *"Glosarium — kategori E. Kelas & Ekonomi"*, dan menampilkan catatan berisi tautan **"Tampilkan semua istilah"**. **Tanpa parameter, halaman glosarium tampil persis seperti sebelumnya** (perilaku bawaan situs tidak berubah).
- **Penyaring asli tidak digantikan.** Blok v30 **memanggil chip kategori yang sudah ada** dari blok v24, jadi hitungan istilah, keadaan aktif chip, `Escape`, dan tombol "Tampilkan semua" bawaan tetap bekerja apa adanya.
- **Halaman `glosarium.html` mendapat bentuk khusus**: bukan tombol satu kategori, melainkan **indeks 7 kategori** (A Partai 21 · B Organisasi 15 · C Front & Aliansi 10 · D Strategi & Taktik 13 · E Kelas & Ekonomi 17 · F Negara & Revolusi 8 · G Nasional & Kolonial 10) plus tautan ke panel saring dan tabel istilah ↔ halaman.
- **Gaya aman**: palet merah–hitam–emas, kartu gradien dengan aksen tepi emas, **mode terang & gelap**, responsif (3 kolom → 2 kolom di ≤980 px → 1 kolom di ≤680 px), tanpa animasi saat `prefers-reduced-motion`, dan **tidak ikut tercetak** (`@media print`). **Tanpa JavaScript** tombol tetap berfungsi sebagai tautan biasa — hanya penyaringan otomatisnya yang tidak jalan.
- **Verifikasi**: tombol **terbukti membuka glosarium tersaring** di Chromium — `?kategori=E` → chip **E** aktif dengan **17 istilah** tampil; `?kategori=partai` → **A** aktif dengan **21 istilah**; `?kategori=c` → **C** aktif dengan **10 istilah**; tanpa parameter → **94 istilah** dan tanpa catatan. Kontras diukur pada latar gradien sebenarnya dan lulus di kedua mode.
- **Satu cacat kontras nyata ditemukan & diperbaiki saat pengujian**: aturan situs `[data-theme=dark] a` mewarnai **setiap** tautan dengan merah-terang dan spesifisitasnya mengalahkan warna dasar tombol CTA, sehingga teks tombol emas menjadi merah di atas emas (**kontras 1,37 — gagal**). Ditambahkan aturan pengunci warna khusus elemen ini. Sesudahnya tombol emas **10,51** dan tombol hantu **9,86** di mode gelap.
- **Semua warna diukur pada latar piksel sebenarnya** (potret kartu dengan teks dibuat transparan, sehingga gradien ikut terhitung): **86 baris teks × 2 mode → 86 LULUS, 0 di bawah 4,5.** Warna `.gc-note` juga dinaikkan `#c3b8ae → #d9cfc6` (7,43).
- **Cache-buster dinaikkan ke `?v=31`** di seluruh 15 halaman, tanpa sisa `?v=29`.

## Baru di v29 — Anotasi Glosarium Otomatis (Tooltip Istilah)

- **Kata istilah glosarium kini ditandai otomatis di dalam prosa artikel** dan memunculkan **tooltip** berisi istilah, padanan asing, kategori, dan definisi ringkas yang **diambil dari halaman `glosarium.html`** — sumber data yang sama, jadi definisi tooltip tidak pernah menyimpang dari glosarium.
- **Sumber data**: 94 istilah glosarium (7 kategori) diekstrak langsung dari `glosarium.html` dan disimpan sebagai data terkompak di `js/magazine.js`; tooltip tidak memuat berkas tambahan.
- **Pemicu**: kursor mendekati kata dengan jeda singkat 120 ms (tidak berkedip), **fokus keyboard** (Tab) untuk aksesibilitas, serta **ketuk** pada layar sentuh untuk membuka/menutup. Escape atau klik di luar menutup tooltip.
- **Aman untuk teks**: anotasi bekerja pada token berbasis tag, sehingga **seluruh byte asli dipertahankan** dan hanya ada penyisipan `<span>`; teks artikel terbukti identik sebelum dan sesudah anotasi. Istilah **tidak pernah** ditandai di dalam judul, tautan, kode, tabel, tombol, glosarium, iklan, atau blok navigasi — hanya di dalam paragraf, butir daftar, kutipan, dan keterangan gambar.
- **Batas wajar**: satu istilah hanya dianotasi sekali per blok, maksimum 3 anotasi per blok dan 420 per halaman, supaya prosa tetap enak dibaca.
- **Tepi layar**: kartu tooltip diukur ulang setiap kali dibuka/digulir dan digeser agar tidak terpotong, dan dibalik ke atas bila ruang bawah tidak cukup.
- **`prefers-reduced-motion`**: tanpa animasi muncul/hilang, dan perubahan preferensi diikuti tanpa memuat ulang.
- **Tanpa JavaScript**: kata istilah tetap tampil sebagai teks biasa dengan garis bawah titik-titik — tidak ada konten yang hilang, tidak ada kotak kosong (tooltip dibuat sepenuhnya oleh JS).
- **Mode terang & gelap** didukung penuh; tooltip tidak ikut tercetak (aturan `@media print`).
- **Cache-buster dinaikkan ke `?v=29`** di seluruh halaman, tanpa sisa `?v=28`.

## Baru di v28 — Rail Peta Zona pada `marxisme.html` & `sosialisme.html`

- **Kartu "Peta Zona" kini juga ada di rail kiri (Zona 4a) `marxisme.html` dan `sosialisme.html`** — tujuh tautan zona berjangkar nyata di masing-masing halaman: `#zona-top-featured`, `#zona-artikel`, `#terkait`, `#zona-sidebar`, `#zona-widgets`, `#zona-author`, `#zona-footer`. Perilakunya **identik** dengan rail di `analisa-papua.html`: tautan aktif ditandai merah–emas dengan nomor dan keterangan "Zona N dari 7", dan rail otomatis menggulir agar tautan aktif selalu terlihat.
- **Daftar Isi dipindah ke rail kiri.** Sebelumnya daftar isi 21–25 bab berada di sidebar kanan di dalam wadah berbatas tinggi, sehingga bab-bab bawah hanya bisa dicapai dengan menggulir sidebar. Kini daftar isi menjadi scrollspy rail (yang disorot = bab yang sedang dibaca), sama seperti `analisa-papua.html`. Markup `<nav data-side-toc>` tidak diubah, jadi blok daftar isi lama tetap bekerja — hanya warna sorotannya yang disesuaikan (`#fff1ec`, 4,93:1).
- **Klik entri daftar isi memilih zona, bukan menggulir ke dasar halaman.** Karena anchor entri kini berada di dalam rail (di puncak dokumen), perilaku anchor bawaan akan melompat jauh ke bawah — klik "1. Dasar-Dasar Marxisme" mendarat di ≈36.000 px. Aturan v28b mengarahkannya ke **Artikel Utama** (atau **Artikel Terkait** untuk entri terakhir) sambil menandai zona itu di rail. `href` setiap entri **tidak diubah**, jadi perilaku tanpa JavaScript dan "buka di tab baru" tetap utuh.
- **Yang bergulir adalah wadah rail** (`scrollTop`), **bukan posisi gulir halaman**; gulir rail hanya dipicu saat zona aktif benar-benar berpindah, dan gestur gulir manual pengunjung (< 300 ms) dihormati.
- **`prefers-reduced-motion`**: gulir rail instan, denyut dimatikan, sorotan tetap bekerja. **Tanpa JavaScript**: kartu rail tetap tampil dan ketujuh tautan tetap dapat diklik.
- **Empat bug nyata ditemukan & diperbaiki saat verifikasi**:
  1. **Pembungkus `.z3col` sempat berada di bawah bagian unggulan** sehingga rail dan artikel jatuh ke baris berikutnya — rail 110 px sementara konten 341 px (seharusnya 644 px). Setelah pembungkus dipindah, geometri desktop menjadi **rail 110 / konten 644 / sidebar 320**.
  2. **`scrollIntoView` ganda**: rail menggulir ke bab 1 sedangkan sidebar kanan menggulir ke bab dasar — dua wadah bergerak berlawanan dan salah satunya mengambil kendali gulir. Satu elemen kini hanya punya satu wadah yang dikendalikan.
  3. **Modul v27 tidak dapat mengukur zona di halaman teori** (rail kiri dan sidebar kanan keduanya sticky pada jalur zona, sehingga posisinya bertumpuk dan zona 5–7 tidak pernah tersorot). Kartu bertanda `data-srail-engine="mz"` diserahkan ke modul v28 yang mengukur lewat `offsetTop` — kebal efek sticky dan wadah bergulir.
  4. **Halaman tidak pernah selesai render (bug performa)**: `IntersectionObserver` memantau 7 zona sepanjang ±36.000 px dan setiap perubahan kecil tata letak memicunya lagi sehingga putaran `callback → rAF → DOM → callback` berjalan tanpa henti (`getComputedStyle` ribuan kali per bingkai). Pengamat itu dibuang — listener gulir ber-rAF-throttle sudah cukup — dan pembaruan kini dibatasi pada perubahan posisi gulir.
- **CSS baru bersifat aditif** (`css/magazine.css` bagian v28, hanya `.z3col` / `.mag-shell` / `.rail2` / `.srail`), termasuk mode gelap, aturan cetak (rail tidak dicetak), dan `prefers-reduced-motion`. **JS baru** (`js/magazine.js` blok v28) mengekspos `window.RWPRailMZ` untuk verifikasi.
- **Cache-buster dinaikkan ke `?v=28`** di seluruh 15 halaman, tanpa sisa `?v=27`.

## Baru di v27 — Sorotan Bergulir Otomatis pada Rail Zona 4a

- **Kartu "Peta Zona" baru di rail kiri (Zona 4a) `analisa-papua.html`** — tujuh tautan zona berjangkar nyata: `#zona-mega-links`, `#zona-top-featured`, `#zona-magazine-widgets`, `#zona-sidebar`, `#zona-sidebar-tab`, `#zona-author`, `#zona-footer`.
- **Sorotan mengikuti posisi gulir**: tautan zona yang sedang aktif ditandai merah–emas, bernomor, dan diberi keterangan "Zona N dari 7" plus penunjuk posisi vertikal; sublabel tiap tautan tetap terbaca di kedua mode tema.
- **Tautan aktif otomatis digulir ke dalam area rail** (`scrollIntoView`-setara dengan `scrollTo({block:'nearest'})`). Yang bergerak adalah **wadah rail** (`scrollTop`), **bukan posisi gulir halaman** — terbukti `pageY` tetap sama sebelum dan sesudah.
- **Tidak berkedip & tidak merebut kendali**: sorotan digerakkan `IntersectionObserver` + rAF-throttle, dan gulir rail **hanya dipicu saat zona aktif benar-benar berpindah** (`if (i === curIdx) return`), sehingga gulir manual pengunjung tidak dilawan (gestur < 300 ms dihormati).
- **Menghormati `prefers-reduced-motion`**: saat "kurangi gerakan" aktif, gulir rail **instan** (`behavior:'auto'`) dan denyut `rwpRailPulse` dimatikan, tetapi **sorotan tetap bekerja**. Perubahan pengaturan sistem diikuti tanpa reload lewat listener `matchMedia`.
- **Tetap berfungsi tanpa JavaScript**: kartu tetap tampil dan semua tautan tetap dapat diklik sebagai anchor biasa.
- **Rail kini wadah gulir sticky** (desktop ≥1181px): `position:sticky; top:96px; max-height:calc(100vh - 128px)`. Sebelumnya daftar zona berada di puncak halaman sehingga sudah jauh di atas layar saat pembaca tiba di zona berikutnya — sorotan tak akan pernah terlihat.
- **Bug v26 yang ditemukan & diperbaiki**: `#zona-sidebar-tab` (div `.stab`) tingginya **0 px** di desktop — flex item ber-`overflow:hidden` punya `min-height:auto` yang berlaku sebagai 0 dan dapat disusutkan sampai nol ketika induknya diberi `max-height` (aturan v26). Akibatnya **zona Sidebar Tab Area tidak terlihat sama sekali** di desktop. `flex:0 0 auto` mengembalikannya: **0 → 213 px (desktop) / 176 px (mobile)**, 10 tab utuh.
- **Perbaikan pengukuran posisi zona**: elemen `position:sticky` (rail & sidebar kanan) tergeser dari posisi tata letaknya saat menempel, dan pergeseran itu ikut terbaca `getBoundingClientRect()` — membuat ambang sorotan tertinggal. Posisi kini diukur dengan sticky dinetralkan sesaat (dipulihkan sebelum bingkai dilukis, tanpa kedipan), dengan **satu ambang yang sama di semua viewport** (120 px).
- **Kontras**: sublabel tautan aktif di atas latar merah diperbaiki `#ffe0d6` (4,37 — gagal) → `#fff1ec` (**4,93**) pada ukuran 9,76 px; judul 5,44.
- **CSS baru bersifat aditif** (`css/magazine.css` bagian v27) — hanya menyentuh `.z-rail` / `.srail` / `.z-side`, mode gelap manual & otomatis ikut ditangani. **JS baru** (`js/magazine.js` blok v27) mengekspos `window.RWPRail` untuk verifikasi.
- **Verifikasi**: 15/15 halaman tag seimbang, CSS `778/778` & `774/774`, `node --check` bersih untuk kedua JS, **5.540 referensi internal → 0 menggantung**, AdSense meta & skrip tepat **1×** di 15/15 halaman, Chromium **1440×900 & 390×844** tanpa scroll horizontal, **7/7 zona tersorot** di keempat kombinasi viewport × reduced-motion, tema tiga-mode utuh, tanpa `pageerror`.
- **Cache-buster dinaikkan ke `?v=27`** di seluruh 15 halaman (**63 referensi**, tanpa sisa `?v=26`).

## Baru di v26 — Panel Mega Menu "Tata Letak" (tautan ke tiap zona)

- **Panel mega menu ke-5 berlabel "Tata Letak"** ditambahkan di **seluruh 15 halaman** (tab `id="tab-tataletak"`, panel `id="panel-tataletak"`). Panel ini menautkan langsung ke **tiap zona tata letak** di `analisa-papua.html`.
- **Tujuh zona pada permintaan + satu zona tambahan** — semuanya memakai anchor yang benar-benar ada:
  | Tautan panel | Anchor | Elemen |
  |---|---|---|
  | Mega Menu Links Content | `#zona-mega-links` | band peta isi laporan (Zona 1) |
  | Top Featured Area | `#zona-top-featured` | band sorotan utama (Zona 2) |
  | Magazine Widget Area | `#zona-magazine-widgets` | band widget majalah (Zona 3) |
  | Sidebar Area | `#zona-sidebar` | rail kiri: label & daftar isi (Zona 4a) |
  | Sidebar Tab Area | `#zona-sidebar-tab` | panel 10 tab lompat bab (Zona 5) |
  | Sidebar Area · Widget Laporan | `#zona-sidebar-widgets` | sidebar kanan: artikel terkait & populer (Zona 4b) |
  | Footer Area | `#zona-footer` | kaki halaman (Zona 6) |
  | Author Profile Area | `#zona-author` | kartu profil penulis (Zona 7) |
- **Anchor zona ditambahkan ke `analisa-papua.html`** (`id="zona-*"` pada 8 elemen zona) **tanpa mengubah sedikit pun isi artikel** — tidak ada kata, bab, tabel, atau iklan yang bergeser.
- **Panel desktop, menu mobile, dan footer**: panel muncul lewat hover/klik seperti panel mega lain; ditambahkan juga grup akordeon **"Tata Letak"** di menu mobile (7 tautan) dan **baris tautan "Tata Letak" di footer seluruh 15 halaman** (`.footer-zn`, 7 chip tautan + tautan ke halaman laporan).
- **Tetap berfungsi tanpa JavaScript**: panel adalah markup biasa dan setiap tautan `#zona-*` berfungsi sebagai anchor normal; ditambah `scroll-margin-top: 96px` di CSS agar header sticky tidak menutupi judul zona.
- **CSS baru (`css/magazine.css` bagian v26, aditif murni)**: `scroll-margin-top` untuk 8 anchor zona, animasi `rwpZonePing` (penanda singkat saat zona dituju), aksen emas pada judul kolom panel `#panel-tataletak`, dan gaya `.footer-zn` — konsisten **merah–hitam–emas** di mode terang, gelap manual, dan gelap otomatis. `prefers-reduced-motion` mematikan animasi penanda.
- **JS baru (`js/magazine.js` bagian v26)**: blok `RWPZones` menambahkan offset gulir header sticky (96px desktop / 80px mobile), penanda zona, dan penyesuaian bila halaman dibuka langsung dengan hash `#zona-*`. **Tanpa JavaScript** tidak ada yang hilang.
- **Verifikasi**: 15/15 halaman tag seimbang, CSS `778/778` & `735/735`, `node --check` bersih untuk kedua berkas JS, **5.578 referensi lokal diperiksa → 0 tautan menggantung**, meta AdSense & skrip AdSense tepat **1×** di setiap halaman, seluruh **8 anchor `#zona-*`** pada tiap halaman resolut ke `id` nyata, dan tidak ada animasi/transisi baru yang mengabaikan `prefers-reduced-motion`.
- **Cache-buster dinaikkan ke `?v=26`** di seluruh 15 halaman (**63 referensi**, tanpa sisa `?v=25`).

## Baru di v25 — Tata Letak Berbasis Zona pada `analisa-papua.html`

- **`analisa-papua.html` disusun ulang mengikuti zonasi tata letak pada 4 gambar referensi** — bukan sekadar mirip, melainkan urutan zona yang sama:

  | Zona | Nama zona (sesuai referensi) | Isi |
  |---|---|---|
  | 1 | **Mega Links Konten** | band **4 kolom**: peta isi laporan khusus (20 bab + glosarium) |
  | 2 | **Top Featured Area** | band sorotan + kartu utama Grasberg + 3 kartu pendukung + chip lanjutan |
  | 3 | **Magazine Widget Area** | band penuh + baris 3 kartu gadget + grid 4 widget majalah |
  | 4 | **Sidebar Area (kiri & kanan)** | shell **3 kolom**: rail kiri sempit + kolom konten + sidebar kanan |
  | 5 | **Sidebar Tab Area** | tab lompat cepat ke 10 bab, di dalam sidebar kanan |
  | 6 | **Footer Area** | band + baris 4 kartu gadget + grid 4 kolom + baris bawah |
  | 7 | **Author Profile Area** | band + kartu profil penulis |

- **Seluruh isi artikel dipertahankan 100%**: teks artikel **identik kata-per-kata** dengan versi sebelumnya (**3.978 kata**, 20 bab termasuk subbab 11.1/11.2), seluruh **20 anchor `#`** halaman tetap utuh, dan seluruh **7 unit iklan AdSense** dipindahkan verbatim (tidak ada slot yang hilang).
- **CSS baru (`css/magazine.css` bagian v25)**: `.z3col` (grid 3 kolom `206px / 1fr / 320px`), `.zn-head--mega/--feat/--wid/--side/--tab/--foot/--auth` (tujuh varian band berwarna, tetap dalam keluarga **merah–hitam–emas**), `.mega-band` (grid 4 kolom), `.stab-tabs` (tab area), `.gadget` (kartu judul + label + tombol aksi) dan `.gadget-grid`, `.zn-foot-strip`, `.zn-body`. Responsif pada 1180/1040/900/680px; **mode gelap** (manual `[data-theme=dark]` dan otomatis `@media (prefers-color-scheme: dark)`) serta **aturan cetak** tersendiri; **`prefers-reduced-motion`** juga menonaktifkan transisi zona baru.
- **JS baru (`js/magazine.js` bagian v25)**: **Sidebar Tab Area** menyorot tab yang sesuai dengan posisi gulir dan mendukung navigasi papan tuts (panah, Home, End). **Tanpa JavaScript** seluruh tab tetap tampil dan tetap berfungsi sebagai tautan biasa.
- **Kontrol tema tiga-mode, mode gelap otomatis, `prefers-reduced-motion`, slider hero & YouTube, FAQ 30 pertanyaan, forum, galeri + lightbox, blok Artikel Terkait 6 kartu, widget sidebar 3 kartu, `ads.txt`, `netlify.toml`, `robots.txt`, dan `sitemap.xml` tetap berfungsi** pada halaman baru.
- **Cache-buster dinaikkan ke `?v=25`** di seluruh 15 halaman (tanpa sisa `?v=25`).

## Baru di v24 — Halaman Glosarium: Partai, Organisasi & Front
- **Halaman baru: `glosarium.html` — Glosarium Istilah** berisi **94 entri** dalam **7 kategori**: **A. Partai** (21), **B. Organisasi** (10), **C. Front & Aliansi** (10), **D. Strategi & Taktik** (11), **E. Kelas & Ekonomi** (17), **F. Negara & Revolusi** (8), dan **G. Nasional & Kolonial** (10).
- **Setiap entri memuat empat hal**: (1) **istilah** Indonesia + padanan asing bila ada (mis. *sentralisme demokratis / democratic centralism*), (2) **definisi ringkas** 1–2 kalimat, (3) **penjelasan** 1–2 paragraf yang kritis, dan (4) **asal-usul/sumber teoretis** (Marx & Engels, Lenin, Rosa Luxemburg, Gramsci, Mao, Stalin) serta **rujukan silang** ke halaman materi di situs.
- **Seluruh istilah wajib dari permintaan tersedia**: sentralisme demokratis, vanguard (detasemen depan), blok historis, partai massa, partai kader, sel, komite, fraksi & hak minoritas, kritik-diri, kaderisasi, intelektual organik, hegemoni, pangeran modern, garis massa, spontanitas massa, kesadaran kelas (dalam diri vs untuk diri), kelas dalam diri / kelas untuk diri, front taktis, front strategis, front bersatu, front populer, front nasional-demokratik, aliansi kelas, kawan dan lawan, kontradiksi utama & sekunder, oportunisme, sektarianisme, revisionisme, reformisme, dogmatisme, birokratisasi & degenerasi partai, revolusi berkelanjutan, tahapan revolusi (demokratik vs sosialis), hak menentukan nasib sendiri, bangsa tertindas & bangsa penindas, kolonialisme internal, imperialisme, borjuasi komprador, surplus value (nilai lebih), mode produksi & formasi sosial, materialisme historis, materialisme dialektis, sosialisme ilmiah, sosialisme utopis, negara dan revolusi, diktatur proletariat, fase transisi, dan kerja reproduksi sosial — ditambah **istilah pelengkap** (kongres partai, kesadaran palsu, organisasi adat, aksi massal, tuntutan transisional, alat produksi, kelas pekerja, borjuasi nasional, kapitalisme ekstraktif, enklave ekstraktif, kelas menengah birokratik, aparatus represif, demokrasi borjuis, dewan (soviet), penghapusan negara, kriteria bangsa, nasionalisme revolusioner, referendum penentuan nasib sendiri, diskriminasi struktural, front buruh–tani, persatuan aksi, disiplin partai, kontrol dari bawah, perang rakyat, propaganda & agitasi, internasionalisme proletar, perjuangan kelas, basis & superstruktur).
- **Navigasi antar entri**: **Daftar Isi bertaut** di atas halaman (10 entri: filter, 7 kategori, tabel peta istilah), **kotak pencarian/filter JavaScript** yang menyaring entri **langsung saat mengetik** tanpa reload (plus chip 7 kategori, tombol *Tampilkan semua*, `aria-live` pada penghitung, `role="search"`), dan **tabel "Istilah ↔ Halaman Terkait"** berisi **27 baris** yang menautkan ke `partai-organisasi-revolusioner.html`, `front-taktis-strategis.html`, `sosialisme-ilmiah.html`, `hak-menentukan-nasib-sendiri-papua.html`, `analisa-marxisme-papua.html`, `marxisme.html`, `sosialisme.html`, dan `sosialisme-papua.html`.
- **Progresif tanpa JavaScript**: semua 94 entri **tetap tampil lengkap** di HTML — tidak ada satu pun yang disembunyikan; kotak filter hanya jalan pintas. Setiap istilah juga punya **tautan langsung** (`#entri-<slug>`, tombol `#` saat hover) agar dapat dirujuk.
- **Seluruh fitur situs dibawa utuh**: header + mega menu, menu mobile akordeon, **kontrol tema tiga-mode**, penghormatan `prefers-reduced-motion`, sidebar sticky (Daftar Isi + **widget Artikel Terkait 3 kartu** + Terbaru + iklan + Terpopuler + Kategori + Jelajahi Topik), **blok Artikel Terkait 6 kartu**, tombol berbagi & cetak, **5 unit iklan AdSense** (atas, sidebar, bawah, multiplex), profil penulis, dan footer multi-kolom.
- **Gaya glosarium baru di `css/magazine.css`**: kartu entri beraksen merah–emas, badge kategori, goresan `Sumber`/`Rujukan silang`, chip kategori, kotak filter, tabel peta istilah, **dukungan mode gelap** (manual `[data-theme=dark]` dan otomatis `@media (prefers-color-scheme: dark)` dengan `html:not([data-theme])`), responsif ≤680px, serta aturan cetak tersendiri.
- **Filter glosarium berbasis JavaScript** ditambahkan ke `js/magazine.js` (bagian v24) — dijalankan sendiri dan berhenti tanpa efek bila `#glosInput` tidak ada, sehingga halaman lain tidak terpengaruh.
- **Navigasi situs diperbarui di seluruh 15 halaman**: **mega menu** panel Teori & Metode + Analisis Papua masing-masing bertambah tautan glosarium, **menu mobile** bertambah 1 tautan, dan **footer** (kolom Navigasi + Sumber Belajar) bertambah 2 tautan.
- **Kartu glosarium ditambahkan** ke **widget Artikel Terkait sidebar (3 kartu)** dan **blok Artikel Terkait (6 kartu)** pada **7 halaman materi** (`partai-organisasi-revolusioner`, `front-taktis-strategis`, `sosialisme-ilmiah`, `hak-menentukan-nasib-sendiri-papua`, `analisa-marxisme-papua`, `marxisme`, `sosialisme`) — kartu terakhir digantikan kartu glosarium agar invarian **3 kartu sidebar / 6 kartu blok** tetap terjaga.
- **`sitemap.xml` diperbarui** menjadi **15 URL** dan **README ini** memuat daftar halaman baru.
- **Cache-buster dinaikkan ke `?v=25`** di seluruh 15 halaman (tanpa sisa `?v=23`).

## Baru di v23 — Lima Halaman Materi Teori Baru (Partai, Organisasi, Front, Sosialisme Ilmiah, Penentuan Nasib Sendiri)
Situs kini berisi **15 halaman** (9 lama + 5 baru + glosarium). Seluruh **tujuh materi** yang diminta tersedia lengkap dan saling tertaut:

| Halaman baru | Materi | Bagian (jangkauan isi) |
|---|---|---|
| `partai-organisasi-revolusioner.html` | **1. Partai Revolusioner** & **2. Organisasi Revolusioner** | 14 bagian: dari Manifesto Komunis & Liga Komunis, "Apa yang Harus Dilakukan?" (vanguard & kesadaran dari luar), sentralisme demokratis, sosial-demokrasi massa, spontanitas massa Rosa Luxemburg, partai sebagai "pangeran modern" Gramsci, partai dalam *Negara dan Revolusi*, garis massa Mao; bahaya birokratisasi, degenerasi partai, tanda-tanda peringatan, syarat tetap terhubung massa; bentuk organisasi (sel, komite, front, serikat, koperasi, organisasi massa), hak minoritas, hubungan partai–serikat–tani–pemuda–perempuan, legal vs bawah tanah, kaderisasi, pelajaran organisasi di negeri terjajah |
| `front-taktis-strategis.html` | **3. Front Taktis** & **4. Front Strategis** | 11 bagian: definisi & hakikat front taktis (aliansi jangka pendek, tujuan terbatas, kriteria masuk-keluar, batas kompromi), bahaya oportunisme vs sektarianisme, contoh historis (Front Populer 1935, front bersatu buruh-tani, aliansi anti-kolonial), cara menilai keberhasilan; lalu front strategis (aliansi jangka panjang berbasis kelas), blok historis Gramsci, front nasional-demokratik, tahapan revolusi & revolusi berkelanjutan, kriteria kelas, risiko koalisi menumpulkan perjuangan, dan tabel pembanding taktis vs strategis |
| `sosialisme-ilmiah.html` | **5. Sosialisme Ilmiah** | 8 bagian: dari sosialisme utopis (Saint-Simon, Fourier, Owen) ke sosialisme ilmiah Marx–Engels; materialisme historis & dialektis; analisis kelas dan nilai lebih; negara dan revolusi; fase transisi & Kritik Program Gotha; sosialisme di negeri terjajah; perdebatan kontemporer (sosialisme abad 21, pengalaman negara sosialis, kritik terhadap keduanya); tegas pada akhir: **sosialisme ilmiah adalah alat analisis, bukan dogma** |
| `hak-menentukan-nasib-sendiri-papua.html` | **6. Hak Menentukan Nasib Sendiri bagi West Papua** | 10 bagian: hak itu dalam Marxisme (Lenin *The Right of Nations to Self-Determination*, Stalin *Marxism and the National Question*), bangsa tertindas vs penindas, dukungan atas pembebasan nasional, kaitannya dengan revolusi sosialis, kriteria "bangsa" & penerapannya pada Papua, sejarah (Perjanjian New York 1962, PEPERA 1969, kritik), status hukum internasional (Resolusi MU PBB 1514 & 1541, Kovenan Sipil-Politik Pasal 1, pendapat hukum), dan posisi Marxis hari ini |
| `analisa-marxisme-papua.html` | **7. Analisa Marxisme Ilmiah sesuai Situasi West Papua** | 14 bagian: mode produksi & formasi sosial Papua, ekonomi ekstraktif (Grasberg/Freeport, migas, kayu, sawit), hubungan produksi & kepemilikan modal, surplus value yang dialihkan keluar, kelas-kelas di Papua (buruh tambang, petani, nelayan, pekerja informal, kelas menengah birokratik, borjuasi komprador), negara & militer, migrasi & demografi, kolonialisme internal & imperialisme, superstruktur (agama, pendidikan, bahasa, budaya), kontradiksi utama & sekunder, sampai strategi-taktik: siapa kawan–siapa lawan, bentuk organisasi, front taktis & strategis, tahapan menuju sosialisme Papua |

- **Seluruh fitur situs dibawa utuh ke 5 halaman baru**: header + mega menu 4 panel, menu mobile akordeon, kontrol tema tiga-mode (Otomatis/Terang/Gelap), sidebar sticky dengan **Daftar Isi + widget Artikel Terkait 3 kartu**, **blok Artikel Terkait 6 kartu**, tombol berbagi & cetak (termasuk *Cetak artikel ini saja* dan *Cetak artikel terkait*), 6 unit iklan AdSense (auto, in-feed, multiplex), profil penulis, widget majalah, dan footer multi-kolom.
- **Navigasi situs diperbarui di seluruh halaman**: mega menu panel **Teori & Metode** bertambah *Partai Revolusioner* dan *Organisasi Revolusioner*; panel **Analisis Papua** bertambah *Hak Menentukan Nasib Sendiri* dan *Front Taktis & Strategis*; **menu mobile** bertambah 5 tautan baru; **footer kolom Navigasi** bertambah 5 halaman baru. **Widget Artikel Terkait sidebar (3 kartu)** dan **blok Artikel Terkait (6 kartu)** pada halaman lama juga ditambah kartu-kartu baru yang menunjuk ke lima halaman ini, sehingga seluruh materi baru terjangkau dari halaman mana pun.
- **Cache-buster dinaikkan ke `?v=23`** di seluruh 14 halaman (tanpa sisa `?v=22`).
- **`sitemap.xml` diperbarui** menjadi 14 URL dan **README ini** memuat daftar halaman baru.

## Baru di v22 — Hormati `prefers-reduced-motion` (slider hero & slider YouTube)
- **Autoplay slider hero dan slider YouTube berhenti otomatis** saat pengguna mengaktifkan **"Kurangi gerakan" / reduce motion** di sistem. Tidak ada tombol baru, tidak ada preferensi tersimpan — perilaku murni mengikuti pengaturan sistem.
- **Transisi perpindahan slide dibuat instan** (`transition:none`) pada mode tersebut — slide langsung pindah, tanpa animasi geser.
- **Navigasi manual tetap berfungsi penuh**: tombol prev/next, titik indikator, pemilihan slide YouTube, tombol putar, dan pemutaran video — semuanya tetap bisa dipakai.
- **Perubahan pengaturan sistem diikuti tanpa reload.** Listener `matchMedia('(prefers-reduced-motion: reduce)')` dipasang di `js/main.js` sebagai satu sumber kebenaran (`RWP_RM`): begitu pengguna menyalakan opsi tersebut, autoplay yang sedang berjalan **langsung berhenti**; begitu dimatikan, autoplay **langsung berjalan kembali** — termasuk saat slider sedang terlihat.
- **Animasi lain ikut dijinakkan**: animasi masuk `.reveal` langsung tampil (tanpa `IntersectionObserver` menunggu), transisi hover berat dinonaktifkan (nilai akhir visual tetap sama), dan `scroll-behavior` menjadi instan — **tanpa mengubah tampilan statis**.
- **Status dijelaskan pada UI**: label slider YouTube berbunyi *"Autoplay dimatikan — pengaturan sistem 'Kurangi gerakan' aktif"*, dan tombol putar hero menampilkan status dijeda (`aria-pressed="true"`).
- Penanda uji `data-reduced-motion="reduce|no-preference"` dipasang pada `<html>`.
- **Cache-buster dinaikkan ke `?v=22`** di seluruh halaman (tanpa sisa `?v=21`).
- Aturan reduced-motion ditulis di **kedua berkas CSS** (`style.css` dan `magazine.css`) agar perilaku tetap benar walau salah satu berkas masih tersimpan di cache lama.

## Baru di v18 — Widget "Artikel Terkait"
- **Blok "Artikel Terkait" di seluruh 9 halaman** (`index`, `marxisme`, `sosialisme`, `analisa-papua`, `sosialisme-papua`, `anti-seksisme-patriarki`, `galeri-foto`, `faq`, `forum`), ditempatkan **setelah seluruh isi artikel/konten utama dan sebelum iklan penutup** — 6 kartu per halaman (**54 kartu** total).
- **Rekomendasi mengikuti kategori halaman**, bukan template seragam: halaman teori merekomendasikan teori lain, halaman analisis merekomendasikan analisis lain, halaman perempuan merekomendasikan konten perempuan & sosial, halaman galeri merekomendasikan galeri & arsip visual.
- Setiap kartu memuat **badge kategori** (Teori, Analisis, Perempuan, Sejarah, Program, Praktik, Arsip, Kutipan, Etika, Rujukan, dll.), **judul**, **deskripsi singkat**, **meta waktu baca**, dan **tautan ke bagian yang benar-benar ada** di situs.
- Dilengkapi **9 chip kategori** (lintasan & indeks, teori & metode, sosialisme, analisis Papua, sosialisme Papua, perempuan & sosial, galeri, FAQ, forum) dan tautan "telusuri Materi Lengkap 52 Konsep".
- Gaya majalah konsisten dengan tata letak yang ada: kartu bergaris aksen merah–emas, grid **3 kolom di desktop → 2 kolom (≤1040px) → 1 kolom (≤680px)**, dukungan **mode gelap**, dan gaya cetak tersendiri.
- Kartu dirender dari penanda `[data-rel-item]` oleh `js/magazine.js` (blok 6), sehingga blok HTML di dalam halaman tetap menjadi **cadangan statis** saat JavaScript dimatikan. Menambah satu `<a data-rel-item data-href="…">` = satu kartu baru.
- **Entri baru "8. Artikel Terkait"** pada Daftar Isi sidebar tiap halaman (scrollspy ikut menandai bagian ini) dan **3 tombol cetak** di bilah berbagi: *Cetak halaman*, *Cetak artikel ini saja* (menyembunyikan blok terkait), dan *Cetak artikel terkait*.
- **Cache-buster dinaikkan ke `?v=18`** di seluruh halaman (tanpa sisa `?v=17`).
- Dua **bug tata letak dunia nyata** yang ditemukan & diperbaiki saat verifikasi: (a) aturan cetak mode "related" kalah spesifisitas sehingga blok terkait justru tersembunyi; (b) `sosialisme-papua.html` memakai kolom grid `1fr 332px` dengan sidebar di kiri sehingga kolom konten terkurung di **332px** — kini `332px minmax(0,1fr)` sehingga konten kembali normal (±846px).

## Baru di v19 — Widget Sidebar "Artikel Terkait" (versi ringkas)
- **Widget baru `.sw.sw-rel` berisi tepat 3 kartu** di dalam **Sidebar Area** pada seluruh 9 halaman, ditambahkan **tanpa** mengubah widget sidebar yang sudah ada (Daftar Isi, Terpopuler, Terbaru, Kategori, Kutipan, Jelajahi Topik, iklan sidebar), mega menu, area unggulan, footer, profil penulis, tombol berbagi/cetak, maupun blok **Artikel Terkait 6 kartu** di bawah artikel.
- Posisi widget: **setelah Daftar Isi Halaman dan sebelum widget pertama** tiap halaman — urutan widget tetap terbaca (`Daftar Isi → Artikel Terkait (ringkas) → [widget asli halaman] → Iklan → …`), sticky sidebar dan **scrollspy** tidak terganggu.
- **3 kartu per halaman = 27 kartu total**, dipilih agar **berbeda** dari 6 kartu blok besar (tidak ada duplikat), relevan dengan kategori halaman:
  | Halaman | 3 artikel sidebar |
  |---|---|
  | `index` | Peran Sumber Daya Alam dalam Ekonomi Papua (Analisis) · Prinsip-Prinsip Sosialisme Papua (Program) · Studi Kasus Perbandingan (Studi) |
  | `marxisme` | Tiga Hukum Dialektika (Teori) · Teori Krisis & Siklus Kapital (Teori) · Analisis Konkret: Metode Lima Langkah (Teori) |
  | `sosialisme` | Perencanaan Partisipatif (Teori) · Demokrasi Ekonomi & Kepemilikan Bersama (Teori) · Relevansi untuk Papua (Program) |
  | `analisa-papua` | Sumber Daya & Grasberg (Analisis) · Otonomi Khusus: Evaluasi 25 Tahun (Analisis) · Geopolitik Pasifik dan Aktor Eksternal (Analisis) |
  | `sosialisme-papua` | Peta Jalan Transisi Bertahap (Program) · Tata Kelola Adat & Demokrasi Kampung (Program) · Indikator Keberhasilan dan Pemantauan (Program) |
  | `anti-seksisme-patriarki` | Tokoh & Organisasi Perempuan Papua (Perempuan) · Kritik Seksisme dalam Praktik Gerakan (Perempuan) · Glosarium Istilah (Rujukan) |
  | `galeri-foto` | Galeri Foto Perjuangan Papua (Arsip) · Jelajahi Seluruh Ruang West Papua (Rujukan) · Sumber, Etika Visual & Bacaan Lanjutan (Etika) |
  | `faq` | Sosialisme Ilmiah (10 pertanyaan) (Teori) · Analisis West Papua (6 pertanyaan) (Analisis) · Praksis & Perjuangan (5 pertanyaan) (Praksis) |
  | `forum` | Tulis Diskusi Baru (Forum) · Video Terbaru — Papua Berbicara (Video) · Pertanyaan Diskusi per Bab (Rujukan) |
- Setiap kartu memuat **nomor urut** (garis luar emas/merah), **judul**, dan **badge kategori**; gaya kompak khas sidebar, palet merah–hitam–emas, dukungan **mode gelap**, serta `@supports` fallback agar nomor tetap terbaca bila `-webkit-text-stroke` tidak didukung.
- **Tidak menghitung tautan ganda**: `#terkait` tetap satu (blok besar), sehingga **tidak ada ID duplikat** dan tidak ada tautan internal menggantung.
- **Aturan cetak**: `.sw.sw-rel` disembunyikan saat dicetak (sidebar memang tidak dicetak), jadi gaya cetak selektif tetap rapi.
- **Cache-buster dinaikkan ke `?v=19`** di seluruh halaman (tanpa sisa `?v=18`).

## Baru di v21 — Kontrol Tema Tiga-Mode (Otomatis / Terang / Gelap)
- **Toggle dua-mode digantikan kontrol tiga-mode** di header seluruh 9 halaman: **segmented control** dengan tiga tombol — **🌗 Otomatis**, **☀️ Terang**, **🌙 Gelap**. Terlihat kompak di header (label teks; pada ≤1420px menyusut jadi ikon saja, dan pada ≤1040px bersembunyi karena header mobile memakai menu akordeon — pengaturan tema yang tersimpan tetap berlaku).
- **Bawaan untuk pengguna baru adalah "Otomatis"** — mengikuti `prefers-color-scheme` sistem, tanpa preferensi tersimpan yang memaksa terang/gelap. **"Terang"/"Gelap"** mengunci tema manual (dipasang sebagai atribut `data-theme` pada `<html>`, selalu menang atas sistem).
- **Kembali ke "Otomatis" menghapus preferensi tersimpan**, sehingga halaman langsung mengikuti sistem lagi — termasuk saat pengaturan sistem berubah **tanpa reload** (listener `matchMedia` dipasang di `<head>` *dan* di `js/main.js`).
- **Kompatibel & migrasi dari versi dua-mode:** kunci penyimpanan tetap **`rwp-theme`**; nilai lama `"light"`/`"dark"` tetap terbaca sebagai mode manual, nilai tak dikenal diabaikan (dianggap Otomatis).
- **Tanpa kedipan tema (pre-paint):** skrip kecil di `<head>` menetapkan tema + penanda `data-theme-set` (`manual`/`auto`) **sebelum** cat pertama; CSS hanya mengaktifkan mode gelap otomatis saat `html:not([data-theme])`, jadi tidak pernah ada flash terang→gelap.
- **Aksesibilitas:** `role="group"` + `aria-label` pada kontrol, `aria-pressed` akurat per tombol, tombol ber-`type="button"`, dan fokus keyboard dengan `:focus-visible` (garis emas).
- **Cache-buster dinaikkan ke `?v=21`** di seluruh halaman (tanpa sisa `?v=20`).

## Baru di v20 — Mode Gelap Otomatis (prefers-color-scheme)
- **Seluruh 9 halaman otomatis mengikuti pengaturan tema sistem pengguna** lewat `@media (prefers-color-scheme: dark)` — tanpa perlu tombol dan tanpa menyimpan preferensi baru.
- **Atribut `<html data-theme="light">` yang sebelumnya di-hardcode dilepas.** Tema awal kini ditentukan preferensi sistem; **skrip pre-paint** kecil di `<head>` hanya *membaca* kunci `localStorage` yang sudah ada agar pilihan manual tidak berkedip saat halaman dimuat.
- **Toggle manual tetap berfungsi dan selalu menang atas preferensi sistem.** Blok otomatis dibatasi dengan `html:not([data-theme])`, sehingga: tanpa pilihan manual → ikut sistem; setelah menekan tombol → pilihan manual yang berlaku, di kedua arah. Ikon tombol mengikuti **tema efektif**, dan ikut diperbarui saat pengaturan sistem berubah (`matchMedia` listener).
- **Cakupan komponen:** header & top strip, main menu, dropdown, mega menu, area unggulan (Top Featured), kartu artikel, blok Artikel Terkait besar, widget sidebar termasuk widget ringkas 3 kartu, sidebar sticky, artikel (h2/h3/blockquote), tabel, glosarium, callout, kutipan, timeline, FAQ accordion, forum (form, post, chip, balasan), galeri + lightbox, footer, profil penulis, bilah berbagi & tombol cetak, serta unit iklan AdSense — semua berganti ke palet gelap merah–hitam–emas.
- **Kontras teks aksen diperbaiki:** seluruh warna teks yang memakai `var(--red)` (#c0392b) di latar gelap diganti aksen merah lebih terang **#ff7a63** (≈5,1:1). Ditambah restorasi otomatis untuk teks di atas permukaan merah/emas (tombol, `.nav a.active`, `.menu-item>a.menu-link.active`, chip aktif) agar tidak ikut tertimpa aturan `a{color:…}`, serta angka dekoratif `.card .num` yang kini memakai goresan `-webkit-text-stroke:1px #ff7a63`.
- **Hasil audit kontras WCAG di 9 halaman × 390px & 1440px: 0 pelanggaran** dari **16.489 node teks** (target ≥4,5:1 untuk teks isi). Mode gelap juga diuji tanpa scroll horizontal (390/1440px, plus sapuan 1024–1920px) dengan **0 page error**.
- **Cache-buster dinaikkan ke `?v=20`** di seluruh halaman (tanpa sisa `?v=19`).

## Baru di v12
- **Halaman baru: `galeri-foto.html`** — **Galeri Foto Perjuangan Papua** (7 bagian, 12 foto, ±46 KB) yang menata arsip visual perjuangan Papua ke dalam **enam kategori** (Sejarah, Demonstrasi, Perempuan, Tanah & Sumber Daya, Budaya, Pendidikan):
  1. **Mengapa arsip visual penting** — gambar sebagai metode, dan arsip sebagai medan kontestasi + kotak **Catatan Etika Visual**
  2. **Enam wajah perjuangan** — cara membaca galeri lewat enam lensa dalam kartu analisis
  3. **Grid galeri 12 foto** dengan kartu berisi **judul, keterangan, tahun, dan lokasi**
  4. **Lightbox** — klik foto untuk memperbesar, tombol **sebelumnya/berikutnya/tutup**, navigasi **tombol panah** dan **Esc** di papan tuntas, penghitung "X / 12"
  5. **Filter kategori** (6 tombol + "Semua") dengan penghitung "Menampilkan N dari 12 foto"
  6. **Kronologi perjuangan dalam gambar** — 9 tonggak (1961–2019), masing-masing dengan **tautan Perbesar** ke foto terkait
  7. **Kutipan**, **kartu jelajah 9 halaman**, **tabel status setiap gambar** (aset RWP vs **rekonstruksi ilustratif**), serta bacaan lanjutan
  - **8 foto baru** dibuat khusus (mama-mama & noken, kampung pegunungan, aksi damai, lembah tambang, sekolah, ukiran & tifa, nelayan, tani) sebagai **rekonstruksi ilustratif** — dilabeli jelas dan **tidak boleh dikutip sebagai bukti peristiwa**
  - Dilengkapi **JSON-LD** (`Article` + `ImageGallery` + `FAQPage`) dan unit AdSense **auto + in-feed + multiplex**
  - Tautan **nav desktop, mobile-nav, footer Navigasi, dan kotak Sumber Belajar di seluruh 9 halaman**; **entri baru di `sitemap.xml`**
- **Halaman baru: `anti-seksisme-patriarki.html`** — kajian mendalam **Anti Seksisme & Patriarki** (12 bagian, ±94 KB) yang menyatukan **kemerdekaan Papua** dengan **pembebasan perempuan** dalam kerangka sosialisme ilmiah:
  1. Mengapa seksisme & patriarki adalah persoalan **kelas**, bukan sekadar budaya — termasuk tabel bacaan kultural vs bacaan kelas dan **lima tiang patriarki**
  2. **Akar teori marxisme ilmiah** — Engels *Asal-Usul Keluarga, Kepemilikan Pribadi, dan Negara* (1884), rumah tangga sebagai **unit produksi**, **kerja reproduksi sosial** (3 lapis), **beban ganda / “dunia kedua”**, hubungan patriarki–kepemilikan–negara, dan **kritik atas sosialisme utopis** yang mengabaikan pembebasan perempuan; ditutup tabel perbandingan aliran (Engels, Zetkin/Kollontai, teori reproduksi sosial, feminisme radikal, feminisme liberal)
  3. **Perempuan & kolonialisme di West Papua** — tiga lapis penindasan, **tambang Grasberg** (relokasi, tailing, punggung perempuan), transmigrasi & militerisasi, kekerasan berbasis gender, kesehatan ibu dan anak, pendidikan, serta tabel **“satu hari kerja yang tak dihitung”**
  4. **Perempuan Papua dalam perjuangan kemerdekaan** — peran historis komunal, **gerakan mama-mama**, organisasi & keterwakilan resmi (MRP, gereja, koalisi anti-kekerasan, HAMAK), diplomasi internasional, keterkaitan dengan gerakan buruh dan tani, dan tabel perbandingan bentuk perjuangan menurut periode
  5. **Kartu tokoh** — Mama **Angganeta Manufandu** (Gerakan Koreri), Mama **Yosepha Alomang** (Goldman Prize 2001, HAMAK, somasi 2026), Mama **Orpa Nari** (MRP), mama-mama pasar & gereja, perempuan perantauan, generasi muda
  6. **Analisis kelas** — enam pihak yang diuntungkan patriarki kolonial, rantai pemanfaatan kerja tak berbayar, mengapa pekerja laki-laki juga dirugikan, dan mengapa kemerdekaan Papua harus sekaligus anti-patriarki
  7. **Program & tuntutan** — 10 tuntutan pokok, 4 tahap pelaksanaan, dan 4 uji kelayakan program
  8. **Kritik seksisme dalam praktik gerakan** — tabel gejala/bahaya/praktik pengganti + 7 prinsip gerakan setara
  9. **Kesimpulan** · 10. **Kronologi perjuangan perempuan Papua** (17 peristiwa) · 11. **Glosarium** 24 istilah · 12. **Daftar bacaan lanjutan**
  - Dilengkapi **JSON-LD** (`Article` + `FAQPage`), daftar isi, tabel, timeline, kartu tokoh, kutipan, dan unit AdSense
- **Sub-bab baru di `sosialisme-papua.html`: Bab 16 — Kerja Reproduksi Sosial** (10 sub-bagian, ±31 KB) — dimasukkan ke celah penomoran bab 16 yang sebelumnya kosong (15 → 17):
  1. **Definisi** kerja reproduksi sosial dan mengapa ia syarat berjalannya seluruh masyarakat
  2. **Mengapa ia menghasilkan nilai**, bukan sekadar "kerja rumah" — tenaga kerja sebagai komoditas khas, tabel "yang terlihat di pembukuan vs yang tersembunyi"
  3. **Engels**: rumah tangga sebagai **unit produksi**, keluarga monogami & kepemilikan, tiga pelajaran bagi Papua + kritik atas sosialisme yang setengah jalan
  4. **Kerja reproduksi di kampung Papua** — mama-mama, kebun, air, kayu bakar, pengasuhan, perawatan orang sakit/lansia, dan kerja adat/gereja (tabel sosialisasi yang dibutuhkan)
  5. **Tiga lapis** kerja reproduksi (harian, generasi, komunitas) dalam kartu visual
  6. **Beban ganda** perempuan Papua di bawah kolonialisme, **Grasberg**, transmigrasi, dan militerisasi — tabel kekuatan struktural vs beban tambahan
  7. **Sosialisasi kerja perawatan** — 4 pilar program (infrastruktur, pengasuhan, kesehatan publik, penghitungan kerja)
  8. **Timeline** kerangka Engels: 1884 · Zetkin & Kollontai · feminisme Marxis 1960-70an · teori reproduksi sosial 1990an · Federici · kini
  9. **Glosarium mini** 6 istilah (kerja reproduksi sosial, beban ganda, sosialisasi perawatan, subsidi tersembunyi, rumah tangga sebagai unit produksi, ekonomi perawatan)
  10. **Kutipan** Engels, Kollontai, dan tradisi teori reproduksi sosial
  - **Tautan silang dua arah** dengan `anti-seksisme-patriarki.html` (dari §3.7 dan kartu program #2), entri baru di **Daftar Isi** halaman, kotak navigasi **"Sumber Belajar"** di seluruh 8 halaman, dan **2 entri baru** di Indeks Tematik beranda (X + K)
- **Integrasi situs**: tautan halaman baru di **nav desktop, mobile-nav, dan footer 7 halaman lama**; tautan silang/kotak “bacaan lanjutan” di **marxisme, sosialisme, sosialisme-papua, analisa-papua**, CTA di beranda, dan 3 entri baru di Indeks Tematik beranda
- **`sitemap.xml`** diperbarui menjadi 9 halaman
- **Cache-buster `?v=16`** di seluruh halaman
- Semua fitur v11 tetap: hero slider, slider YouTube, AdSense, FAQ 30, forum lengkap

## Baru di v17 (tata letak majalah)
- **`css/magazine.css`** + **`js/magazine.js`** baru (berkas tambahan, dimuat setelah `style.css`/`main.js`) — tidak mengubah aturan lama
- **Main Menu**: menu utama di header dengan **dropdown** (Beranda, Perempuan, Forum) dan **penanda halaman aktif**; mendukung hover, klik, panah bawah, dan Escape
- **Mega Links Konten**: panel mega menu lebar dengan **4 tab** dan **16 kolom** berisi 100 tautan ke bab/bagian nyata; muncul saat menu di-hover/di-klik; di mobile berupa **nav akordeon bergrup**
- **Top Featured Area**: 1 berita utama besar + 3 kartu pendukung + chip “baca juga”, memakai konten halaman itu sendiri. Varian: `split` (berita besar di kiri) dan `wide` (berita besar penuh, 3 kartu sejajar)
- **Sidebar Area**: **sticky di desktop**, **turun di bawah konten saat <=1040px**. Isi berbeda per halaman: Daftar Isi Halaman (dengan **scrollspy**), Terpopuler, Terbaru, Kategori, Kutipan Pilihan, Jelajahi Topik, dan **unit iklan sidebar** (slot unik `rwp-*-sidebar`)
- **Magazine Widget Area**: strip widget 4 kartu di atas footer
- **Author Profile Area**: kotak profil dengan avatar, nama, peran, deskripsi, tautan sosial — Redaksi RWP / Tim Teori & Metode / Tim Analisis & Riset / Tim Media & Arsip
- **Share + Print**: WhatsApp, Facebook, X/Twitter, Telegram, LinkedIn, Salin tautan (`navigator.clipboard` + fallback), dan Cetak halaman (`window.print()`) di 9/9 halaman
- **Gaya cetak khusus** (`@media print`): menu, mega panel, sidebar, widget, iklan, tombol, dan bilah berbagi **tidak ikut tercetak**; muncul header cetak berisi judul dokumen + URL sumber
- **Footer multi-kolom**: Navigasi, Sumber Belajar, Redaksi & Kredit + kolom brand
- **Cache-buster `?v=17`** di seluruh halaman (tanpa sisa `?v=16`)
- Semua fitur lama utuh: hero slider, slider YouTube, forum, FAQ 30, Bab 16 Kerja Reproduksi Sosial, galeri lightbox + filter, unit AdSense (auto + in-feed + multiplex), `ads.txt`, `netlify.toml`, `robots.txt`, `sitemap.xml`

### Susunan area per halaman
| Halaman | Tema unggulan | Varian | Sidebar (urut) | Widget | Author profile |
|---|---|---|---|---|---|
| `index.html` | Beranda / laporan utama | split | Daftar Isi, Terpopuler, Iklan, Terbaru, Kategori | Terbaru, Kutipan, Jelajahi, Kategori | Redaksi RWP |
| `marxisme.html` | Teori & Metode | wide | Daftar Isi, Terbaru, Iklan, Kutipan, Jelajahi | Jelajahi, Terbaru, Terpopuler, Kategori | Tim Teori & Metode |
| `sosialisme.html` | Sosialisme (ekonomi perawatan) | split | Daftar Isi, Kutipan, Iklan, Terpopuler, Kategori | Terpopuler, Kategori, Terbaru, Kutipan | Tim Teori & Metode |
| `analisa-papua.html` | Laporan khusus Grasberg | wide | Daftar Isi, Terpopuler, Iklan, Terbaru, Jelajahi | Terpopuler, Terbaru, Jelajahi, Kategori | Tim Analisis & Riset |
| `sosialisme-papua.html` | Program (kerja reproduksi) | split, **sidebar kiri** | Daftar Isi, Kategori, Iklan, Terpopuler, Kutipan | Kategori, Terpopuler, Terbaru, Jelajahi | Tim Analisis & Riset |
| `anti-seksisme-patriarki.html` | Dossier perempuan Papua | wide | Daftar Isi, Jelajahi, Iklan, Terpopuler, Kutipan | Kutipan, Jelajahi, Terpopuler, Kategori | Tim Media & Arsip |
| `galeri-foto.html` | Galeri utama | split | Daftar Isi, Kategori, Iklan, Terbaru, Jelajahi | Kategori, Terbaru, Terpopuler, Jelajahi | Tim Media & Arsip |
| `faq.html` | Pusat bantuan 30 pertanyaan | wide | Daftar Isi, Terpopuler, Iklan, Kutipan, Jelajahi | Terpopuler, Kutipan, Terbaru, Jelajahi | Redaksi RWP |
| `forum.html` | Ruang publik diskusi | split | Daftar Isi, Terbaru, Iklan, Terpopuler, Kategori | Terbaru, Kategori, Terpopuler, Kutipan | Redaksi RWP |

### Verifikasi v17
- Uji tata letak majalah: mega menu 100 tautan tanpa tautan menggantung, sidebar menjadi kolom di desktop dan menumpuk di mobile, tombol berbagi (5 kanal + salin tautan), tombol cetak memicu `window.print()` dan gaya cetak menyembunyikan menu/sidebar/iklan/footer
- Tanpa scroll horizontal di 390px dan 1440px pada 9/9 halaman, dan pada sweep 1024–1920px

## Fitur
- Tema merah-hitam-emas dengan aksen pita Bintang Kejora
- **Kontrol tema tiga-mode** Otomatis / Terang / Gelap di header (bawaan Otomatis; manual menang atas sistem; tersimpan di localStorage `rwp-theme`)
- Slider hero (putar otomatis + jeda/putar manual) + slider YouTube Papua Berbicara
- Kotak pencarian (search modal) untuk seluruh bagian
- Desain responsif mobile-first (uji 390px & 1440px)
- Animasi reveal saat scroll, progress bar, tombol kembali ke atas
- **15 halaman**: Beranda, Marxisme, Sosialisme, **Anti Seksisme & Patriarki**, Analisa West Papua, Sosialisme Papua, **Galeri Foto Perjuangan**, FAQ (30 pertanyaan), Forum Diskusi — ditambah **5 halaman materi teori baru (v23)**: Partai & Organisasi Revolusioner, Front Taktis & Strategis, Sosialisme Ilmiah (Metode), Hak Menentukan Nasib Sendiri, dan Analisa Marxisme Papua — serta **halaman glosarium (v24)** dengan 94 istilah dalam 7 kategori
- **Galeri foto** dengan lightbox (tombol panah & Esc), filter 6 kategori, kronologi bergambar, dan tabel status gambar
- Forum dengan balasan, pencarian, filter tag, pengurutan (terbaru/terpopuler/terbanyak dibalas), penghitung tampilan, penanda tersemat, tombol dukung, dan ekspor JSON/CSV
- **Monetisasi Google AdSense** (Publisher ID `ca-pub-6557428036767230`)

## Struktur
```
ruang-west-papua_v12/
├── index.html                    ← Beranda
├── marxisme.html
├── sosialisme.html
├── anti-seksisme-patriarki.html  ← baru di v12
├── analisa-papua.html
├── sosialisme-papua.html
├── faq.html
├── forum.html
├── galeri-foto.html           ← baru di v12 (galeri foto perjuangan)
├── partai-organisasi-revolusioner.html      ← baru di v23 (materi 1–2)
├── front-taktis-strategis.html              ← baru di v23 (materi 3–4)
├── sosialisme-ilmiah.html                   ← baru di v23 (materi 5)
├── hak-menentukan-nasib-sendiri-papua.html  ← baru di v23 (materi 6)
├── analisa-marxisme-papua.html              ← baru di v23 (materi 7)
├── glosarium.html                           ← baru di v24 (94 istilah, 7 kategori)
├── ads.txt                       ← deklarasi penjual resmi AdSense
├── css/style.css
├── css/magazine.css             ← tata letak majalah (v17)
├── js/main.js
├── js/magazine.js              ← menu/berbagi/cetak/scrollspy (v17)
├── images/                       ← 16 aset (8 lama + 8 foto galeri baru)
├── netlify.toml
├── README.md
├── robots.txt
└── sitemap.xml                   ← 15 halaman
```

## Deploy ke Netlify (Drag & Drop)
1. Buka [app.netlify.com/drop](https://app.netlify.com/drop)
2. Seret **seluruh isi folder** `ruang-west-papua_v12/` (atau file ZIP-nya) ke halaman tersebut
3. Selesai — situs langsung live dengan HTTPS
4. Ganti domain placeholder di `sitemap.xml` dengan domain Netlify Anda

## Mengganti Video YouTube
Setiap slide video memakai pola berikut pada `index.html` / `forum.html`:

```html
<article class="yt-slide" data-yt-id="VIDEO_ID" data-yt-title="Judul Video — Papua Berbicara">
  <button class="yt-thumb" type="button" aria-label="Putar video: Judul Video">
    <img src="https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg" alt="Thumbnail video: Judul — kanal Papua Berbicara" width="480" height="360" loading="lazy" decoding="async">
    <span class="yt-play" aria-hidden="true">▶</span>
  </button>
  <div class="yt-frame" hidden></div>
  <div class="yt-meta">
    <h3><a class="yt-title" href="https://www.youtube.com/watch?v=VIDEO_ID" target="_blank" rel="noopener noreferrer">Judul Video</a></h3>
    <p class="yt-sub"><span>📺 Papua Berbicara</span><span>🗓️ TANGGAL</span></p>
  </div>
</article>
```

Ganti **`VIDEO_ID`** pada 3 tempat (`data-yt-id`, URL thumbnail, URL tonton) + judul/tanggal.
- Tambah slide → salin blok `<article class="yt-slide">` **dan** tambah satu `<button class="yt-dot" data-yt-dot="N">` yang sesuai (jumlah titik mengikuti jumlah slide).
- Ambil ID terbaru dari kanal: `https://www.youtube.com/feeds/videos.xml?channel_id=UC-CEAWtPR6ndn1z766nwS4g`.

## Google AdSense
- Meta verifikasi: `<meta name="google-adsense-account" content="ca-pub-6557428036767230">`
- Skrip AdSense dimuat asinkron di `<head>` seluruh halaman
- `ads.txt` di root berisi baris: `google.com, pub-6557428036767230, DIRECT, f08c47fec0942fa0`
- Unit iklan `data-ad-slot` memakai placeholder deskriptif (mis. `rwp-anti-seksisme-atas`); ganti dengan ID slot asli dari dasbor AdSense untuk tayang optimal
- Setelah deploy, verifikasi situs di dasbor AdSense (metode verifikasi sudah tertanam)

## Verifikasi Kualitas
- Tag HTML seimbang
- Kurung CSS seimbang
- Sintaks JS valid (`node --check`)
- Semua tautan internal tidak menggantung
- Skrip & meta AdSense tepat sekali di 9/9 halaman; `ads.txt` ada
- **Blok "Artikel Terkait" ada di 9/9 halaman** dengan **6 kartu** dan tautan yang valid (0 tautan menggantung, 0 ID duplikat)
- Uji browser (Chromium) pada mobile 390px & desktop 1440px: slider YouTube berjalan otomatis, tombol navigasi berfungsi, tanpa scroll horizontal (`scrollX=0` di 9/9 halaman; sapuan lebar 1024–1920px pada halaman nav terpanjang juga bersih)
- Uji galeri: filter kategori menyaring kartu, lightbox membuka/menutup dengan tombol, panah, dan Esc
- **v23**: meta & skrip AdSense tepat sekali di **14/14 halaman**; blok "Artikel Terkait" (6 kartu) dan widget sidebar (3 kartu) ada di **14/14 halaman** dengan tautan valid; tidak ada tautan internal menggantung; uji Chromium 390px & 1440px tanpa scroll horizontal; kontrol tema tiga-mode dan penghormatan `prefers-reduced-motion` terverifikasi pada halaman baru
- **v24**: meta & skrip AdSense tepat sekali di **15/15 halaman**; blok "Artikel Terkait" (6 kartu) dan widget sidebar (3 kartu) ada di **15/15 halaman**, dengan kartu glosarium pada 7 halaman materi; **94 entri glosarium** dalam 7 kategori dengan tautan langsung dan rujukan silang tanpa tautan menggantung; filter glosarium diuji (mengetik menyaring, menghapus memulihkan, kategori menyaring, tanpa JavaScript seluruh entri tetap tampil); uji Chromium 390px & 1440px tanpa scroll horizontal di seluruh halaman
- **v31**: gaya landscape mobile di **15/15 halaman**; tag HTML seimbang, kurung CSS seimbang, `node --check` bersih, tanpa tautan internal menggantung, meta & skrip AdSense tepat sekali di **15/15 halaman**; uji Chromium pada **390×844, 640×360, 844×390, dan 1440×900** tanpa scroll horizontal; susunan mendatar terverifikasi benar-benar mendatar (rel kartu unggulan & widget, rail zona satu baris, panel tab mendatar); tooltip glosarium, tombol "Jelajahi glosarium" + penyaring kategori, rail zona, kontrol tema tiga-mode, dan `prefers-reduced-motion` tetap berfungsi

© 2026 Ruang West Papua (RWP) — konten bebas disebarluaskan untuk pendidikan.
