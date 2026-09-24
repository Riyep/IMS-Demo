# 🔧 Riyep Inventory Management System — Demo

> **Demo UI/UX** untuk sistem manajemen inventaris suku cadang motor menggunakan React.js.  
> Proyek ini adalah prototype antarmuka yang akan dikembangkan menjadi aplikasi full-stack dengan Laravel.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Deskripsi

**Riyep Inventory Management System** adalah sistem manajemen inventaris yang dirancang khusus untuk toko dan distributor suku cadang motor di Indonesia. Demo ini mencakup seluruh antarmuka pengguna (UI/UX) dengan data dummy untuk menunjukkan alur kerja dan fitur yang akan tersedia di versi produksi.

### Fitur Utama

- 📊 **Dashboard** — Ringkasan total item, stok rendah, supplier aktif, dan nilai stok. Dilengkapi grafik interaktif.
- 📦 **Manajemen Item** — CRUD lengkap untuk suku cadang dengan SKU, ESBN, part number, brand, kategori, dan harga.
- 👥 **Manajemen Supplier** — Daftar supplier dengan informasi kontak dan item yang disuplai.
- 🏭 **Manajemen Stok** — Monitoring stok per gudang dengan indikator status (OK, Low, Critical, Overstock).
- 🔄 **Retur Barang** — Pencatatan retur untuk barang rusak, cacat, atau salah kirim dengan tracking status.
- 🔧 **Kompatibilitas** — Pencarian suku cadang berdasarkan merek, model, dan tahun kendaraan.
- 📄 **Laporan** — Halaman unduh laporan (Stok, Katalog Item, Retur) dalam format PDF/Excel.

---

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|-----------|-----------|
| [React 18](https://react.dev/) | Library UI |
| [Vite 6](https://vitejs.dev/) | Build tool |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | Komponen UI (Button, Card, Dialog, Table, dll.) |
| [Recharts](https://recharts.org/) | Grafik dan chart interaktif |
| [Lucide React](https://lucide.dev/) | Ikon |
| [React Router 6](https://reactrouter.com/) | Client-side routing |

---

## 📁 Struktur Proyek

```
spareparts-demo/
├── public/
│   └── favicon.svg                      # Logo aplikasi
├── src/
│   ├── App.jsx                          # Setup routing
│   ├── main.jsx                         # Entry point
│   ├── index.css                        # Tailwind + tema warna
│   ├── lib/
│   │   └── utils.js                     # Helper: cn(), formatCurrency(), formatDate()
│   ├── data/
│   │   └── mock.js                      # Data dummy (30 item, 8 supplier, dll.)
│   ├── components/
│   │   ├── ui/                          # 11 komponen shadcn/ui
│   │   ├── layout/                      # Sidebar, Topbar, AppLayout
│   │   └── shared/                      # DataTable, PageHeader, StatCard, StatusBadge
│   └── pages/
│       ├── Dashboard.jsx                # Halaman dashboard
│       ├── items/                       # ItemList, ItemDetail, ItemForm
│       ├── suppliers/                   # SupplierList, SupplierDetail
│       ├── stock/                       # StockOverview
│       ├── returns/                     # ReturList
│       ├── compatibility/               # CompatibilityBrowser
│       └── reports/                     # ReportPage
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🗄️ Skema Database (Rencana Produksi)

Berikut skema tabel yang akan diimplementasikan di Laravel:

### `items`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | bigint | Primary key |
| sku | varchar | Stock Keeping Unit |
| esbn | varchar | Kode ESBN |
| part_number | varchar | Nomor part |
| name | varchar | Nama item |
| brand_id | bigint | FK ke tabel brands |
| category_id | bigint | FK ke tabel categories |
| type | enum | OEM / Aftermarket / Racing |
| size | varchar | Ukuran |
| unit | varchar | Satuan (Pcs, Set, Botol, dll.) |
| product_type | enum | Sparepart / Consumable / Accessories |
| description | text | Deskripsi item |
| barcode | varchar | Kode barcode |
| weight | decimal | Berat (kg) |
| status | enum | active / inactive |
| created_at | timestamp | |
| updated_at | timestamp | |

### `item_prices`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | bigint | Primary key |
| item_id | bigint | FK ke items |
| cost_price | decimal | Harga modal |
| retail_price | decimal | Harga jual eceran |
| wholesale_price | decimal | Harga grosir |
| effective_date | date | Tanggal berlaku |

### `suppliers`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | bigint | Primary key |
| supplier_code | varchar | Kode supplier |
| supplier_name | varchar | Nama supplier |
| phone | varchar | Nomor telepon |
| email | varchar | Alamat email |
| address | text | Alamat lengkap |
| status | enum | active / inactive |

### `stocks`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | bigint | Primary key |
| item_id | bigint | FK ke items |
| warehouse_id | bigint | FK ke warehouses |
| location_id | bigint | FK ke locations |
| quantity | integer | Jumlah stok |
| minimum_stock | integer | Batas minimum |
| maximum_stock | integer | Batas maksimum |

### `item_compatibilities`
| Kolom | Tipe | Keterangan |
|-------|------|-----------|
| id | bigint | Primary key |
| item_id | bigint | FK ke items |
| motor_brand | varchar | Merek motor (Honda, Yamaha, dll.) |
| motor_model | varchar | Model motor (Beat, NMAX, dll.) |
| motor_type | varchar | Tipe (Matic, Bebek, Sport, Trail) |
| year_from | integer | Tahun mulai kompatibel |
| year_to | integer | Tahun akhir kompatibel |

---

## 🚀 Cara Menjalankan

### Prasyarat

- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- npm (sudah termasuk dalam Node.js)

### Instalasi

```bash
# Clone repository
git clone https://github.com/username/spareparts-demo.git
cd spareparts-demo

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka **http://localhost:5173/** di browser.

### Build untuk Produksi

```bash
npm run build
```

Hasil build akan tersedia di folder `dist/`.

---

## 📸 Halaman yang Tersedia

| Halaman | URL | Deskripsi |
|---------|-----|-----------|
| Dashboard | `/` | Ringkasan inventaris dengan grafik |
| Daftar Item | `/items` | Tabel item dengan filter dan pencarian |
| Detail Item | `/items/:id` | Info lengkap + tab Harga, Stok, Kompatibilitas |
| Tambah/Edit Item | `/items/create`, `/items/:id/edit` | Form CRUD item |
| Daftar Supplier | `/suppliers` | Tabel supplier dengan dialog tambah |
| Detail Supplier | `/suppliers/:id` | Info kontak + item yang disuplai |
| Manajemen Stok | `/stock` | Monitor stok per gudang |
| Retur | `/returns` | Pencatatan retur barang |
| Kompatibilitas | `/compatibility` | Cari part berdasarkan kendaraan |
| Laporan | `/reports` | Unduh laporan PDF/Excel |

---

## 📝 Data Dummy

Aplikasi demo ini menggunakan data dummy dengan nuansa Indonesia:

- **30 item** suku cadang motor (Kampas Rem, Busi, Rantai, V-Belt, Knalpot, dll.)
- **8 supplier** (PT Sumber Jaya Motor, CV Maju Bersama, UD Teknik Sentosa, dll.)
- **8 brand** (AHM, KGP, YGP, Indoparts, Federal, Aspira, TDR, Daytona)
- **8 kategori** (Mesin, Kelistrikan, Body, Suspensi, Rem, Transmisi, Knalpot, Ban & Velg)
- **5 gudang** (Jakarta, Surabaya, Bandung, Semarang, Medan)
- **15 data retur** dengan berbagai status
- Kompatibilitas untuk motor Honda, Yamaha, Kawasaki, Suzuki

---

## 🗺️ Roadmap

- [x] UI/UX Demo (React.js)
- [ ] Backend API (Laravel)
- [ ] Autentikasi & Role Management
- [ ] Integrasi Database (MySQL)
- [ ] Modul POS (Point of Sale)
- [ ] Cetak Barcode & Label
- [ ] Notifikasi Stok Rendah (Email/WhatsApp)
- [ ] Export Laporan PDF/Excel
- [ ] Deployment

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 👤 Kontak

**Riyep**  
🌐 [www.riyep.com](https://www.riyep.com)

---

> ⚠️ **Catatan:** Ini adalah demo UI/UX saja. Semua data bersifat dummy/hardcoded. Tidak ada koneksi ke backend atau database. Aksi CRUD (tambah, edit, hapus) akan menampilkan alert "Demo only".
# IMS-Demo
