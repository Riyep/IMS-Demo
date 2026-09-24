// Lookup data
export const brands = [
  { id: 1, name: 'AHM (Astra Honda Motor)' },
  { id: 2, name: 'KGP (Kawasaki Genuine Parts)' },
  { id: 3, name: 'YGP (Yamaha Genuine Parts)' },
  { id: 4, name: 'Indoparts' },
  { id: 5, name: 'Federal' },
  { id: 6, name: 'Aspira' },
  { id: 7, name: 'TDR' },
  { id: 8, name: 'Daytona' },
]

export const categories = [
  { id: 1, name: 'Mesin', icon: 'Cog' },
  { id: 2, name: 'Kelistrikan', icon: 'Zap' },
  { id: 3, name: 'Body', icon: 'Shield' },
  { id: 4, name: 'Suspensi', icon: 'ArrowUpDown' },
  { id: 5, name: 'Rem', icon: 'Disc' },
  { id: 6, name: 'Transmisi', icon: 'Link' },
  { id: 7, name: 'Knalpot', icon: 'Wind' },
  { id: 8, name: 'Ban & Velg', icon: 'Circle' },
]

export const warehouses = [
  { id: 1, name: 'Gudang Utama Jakarta' },
  { id: 2, name: 'Gudang Surabaya' },
  { id: 3, name: 'Gudang Bandung' },
  { id: 4, name: 'Gudang Semarang' },
  { id: 5, name: 'Gudang Medan' },
]

export const locations = [
  { id: 1, warehouse_id: 1, name: 'Rak A-01' },
  { id: 2, warehouse_id: 1, name: 'Rak A-02' },
  { id: 3, warehouse_id: 1, name: 'Rak B-01' },
  { id: 4, warehouse_id: 2, name: 'Rak A-01' },
  { id: 5, warehouse_id: 2, name: 'Rak B-01' },
  { id: 6, warehouse_id: 3, name: 'Rak A-01' },
  { id: 7, warehouse_id: 4, name: 'Rak A-01' },
  { id: 8, warehouse_id: 5, name: 'Rak A-01' },
]

// Generate 30 items with realistic motor parts data
export const items = [
  { id: 1, sku: 'SKU-0001', esbn: 'ESBN-10001', part_number: 'KVB-F2110', name: 'Kampas Rem Depan Honda Beat', brand_id: 1, category_id: 5, type: 'OEM', size: '-', unit: 'Set', product_type: 'Sparepart', description: 'Kampas rem depan original untuk Honda Beat FI, Beat Street, Scoopy', barcode: '8991011001', weight: 0.15, status: 'active', created_at: '2024-01-15', updated_at: '2024-06-20' },
  { id: 2, sku: 'SKU-0002', esbn: 'ESBN-10002', part_number: 'KYT-B300', name: 'Busi Iridium NGK CR7HIX', brand_id: 4, category_id: 1, type: 'Aftermarket', size: 'CR7HIX', unit: 'Pcs', product_type: 'Sparepart', description: 'Busi iridium performa tinggi untuk motor bebek dan matic', barcode: '8991011002', weight: 0.05, status: 'active', created_at: '2024-01-15', updated_at: '2024-06-20' },
  { id: 3, sku: 'SKU-0003', esbn: 'ESBN-10003', part_number: 'RNT-428H', name: 'Rantai 428H-118L', brand_id: 5, category_id: 6, type: 'Aftermarket', size: '428H-118L', unit: 'Pcs', product_type: 'Sparepart', description: 'Rantai motor 428H 118 mata untuk bebek dan sport 150cc', barcode: '8991011003', weight: 0.8, status: 'active', created_at: '2024-02-01', updated_at: '2024-07-15' },
  { id: 4, sku: 'SKU-0004', esbn: 'ESBN-10004', part_number: 'BRG-6301', name: 'Bearing Roda 6301-2RS', brand_id: 4, category_id: 4, type: 'Aftermarket', size: '6301-2RS', unit: 'Pcs', product_type: 'Sparepart', description: 'Bearing roda belakang untuk berbagai tipe motor', barcode: '8991011004', weight: 0.1, status: 'active', created_at: '2024-02-10', updated_at: '2024-05-30' },
  { id: 5, sku: 'SKU-0005', esbn: 'ESBN-10005', part_number: 'OLI-HM1L', name: 'Oli Mesin Honda MPX2 1L', brand_id: 1, category_id: 1, type: 'OEM', size: '1 Liter', unit: 'Botol', product_type: 'Consumable', description: 'Oli mesin 4T SAE 10W-30 untuk motor Honda matic', barcode: '8991011005', weight: 1.0, status: 'active', created_at: '2024-03-01', updated_at: '2024-08-10' },
  { id: 6, sku: 'SKU-0006', esbn: 'ESBN-10006', part_number: 'FLT-BEAT', name: 'Filter Udara Honda Beat FI', brand_id: 1, category_id: 1, type: 'OEM', size: '-', unit: 'Pcs', product_type: 'Sparepart', description: 'Saringan udara original Honda Beat FI ESP', barcode: '8991011006', weight: 0.08, status: 'active', created_at: '2024-03-05', updated_at: '2024-09-01' },
  { id: 7, sku: 'SKU-0007', esbn: 'ESBN-10007', part_number: 'GIR-D14', name: 'Gear Depan 14T 428', brand_id: 4, category_id: 6, type: 'Aftermarket', size: '14T', unit: 'Pcs', product_type: 'Sparepart', description: 'Gear depan 14 mata rantai 428 untuk motor sport 150cc', barcode: '8991011007', weight: 0.12, status: 'active', created_at: '2024-03-10', updated_at: '2024-07-20' },
  { id: 8, sku: 'SKU-0008', esbn: 'ESBN-10008', part_number: 'VBT-NMAX', name: 'V-Belt Yamaha NMAX Original', brand_id: 3, category_id: 6, type: 'OEM', size: '-', unit: 'Pcs', product_type: 'Sparepart', description: 'V-Belt original Yamaha untuk NMAX 155', barcode: '8991011008', weight: 0.25, status: 'active', created_at: '2024-03-15', updated_at: '2024-06-25' },
  { id: 9, sku: 'SKU-0009', esbn: 'ESBN-10009', part_number: 'CDI-BT25', name: 'CDI Racing BRT Powermax', brand_id: 8, category_id: 2, type: 'Racing', size: '-', unit: 'Pcs', product_type: 'Sparepart', description: 'CDI racing dual band untuk performa lebih', barcode: '8991011009', weight: 0.15, status: 'active', created_at: '2024-04-01', updated_at: '2024-08-15' },
  { id: 10, sku: 'SKU-0010', esbn: 'ESBN-10010', part_number: 'SHK-TB33', name: 'Shock Breaker Tabung YSS 330mm', brand_id: 7, category_id: 4, type: 'Aftermarket', size: '330mm', unit: 'Pcs', product_type: 'Sparepart', description: 'Shock belakang tabung YSS G-Series 330mm', barcode: '8991011010', weight: 2.5, status: 'active', created_at: '2024-04-10', updated_at: '2024-09-05' },
  { id: 11, sku: 'SKU-0011', esbn: 'ESBN-10011', part_number: 'KNP-R9', name: 'Knalpot R9 Misano Black', brand_id: 7, category_id: 7, type: 'Racing', size: '-', unit: 'Set', product_type: 'Sparepart', description: 'Knalpot racing R9 Misano full system', barcode: '8991011011', weight: 3.0, status: 'active', created_at: '2024-04-15', updated_at: '2024-07-30' },
  { id: 12, sku: 'SKU-0012', esbn: 'ESBN-10012', part_number: 'BAN-IRC80', name: 'Ban IRC NR83 80/90-17', brand_id: 4, category_id: 8, type: 'Aftermarket', size: '80/90-17', unit: 'Pcs', product_type: 'Sparepart', description: 'Ban luar tubetype untuk motor bebek', barcode: '8991011012', weight: 2.0, status: 'active', created_at: '2024-05-01', updated_at: '2024-08-20' },
  { id: 13, sku: 'SKU-0013', esbn: 'ESBN-10013', part_number: 'AKI-GTZ5', name: 'Aki GS Astra GTZ5S MF', brand_id: 4, category_id: 2, type: 'Aftermarket', size: 'GTZ5S', unit: 'Pcs', product_type: 'Sparepart', description: 'Aki maintenance free untuk motor matic', barcode: '8991011013', weight: 1.5, status: 'active', created_at: '2024-05-10', updated_at: '2024-09-10' },
  { id: 14, sku: 'SKU-0014', esbn: 'ESBN-10014', part_number: 'SPD-VIXN', name: 'Spakbor Depan Yamaha Vixion', brand_id: 3, category_id: 3, type: 'OEM', size: '-', unit: 'Pcs', product_type: 'Sparepart', description: 'Spakbor depan original Yamaha Vixion New', barcode: '8991011014', weight: 0.5, status: 'active', created_at: '2024-05-15', updated_at: '2024-07-25' },
  { id: 15, sku: 'SKU-0015', esbn: 'ESBN-10015', part_number: 'KPL-CBR', name: 'Kopling Set Honda CBR 150R', brand_id: 1, category_id: 1, type: 'OEM', size: '-', unit: 'Set', product_type: 'Sparepart', description: 'Kampas kopling set original untuk Honda CBR 150R', barcode: '8991011015', weight: 0.3, status: 'active', created_at: '2024-06-01', updated_at: '2024-09-15' },
  { id: 16, sku: 'SKU-0016', esbn: 'ESBN-10016', part_number: 'LAM-LED35', name: 'Lampu LED H4 35W Autovision', brand_id: 8, category_id: 2, type: 'Aftermarket', size: 'H4', unit: 'Pcs', product_type: 'Accessories', description: 'Lampu utama LED H4 35W putih terang', barcode: '8991011016', weight: 0.1, status: 'active', created_at: '2024-06-10', updated_at: '2024-08-30' },
  { id: 17, sku: 'SKU-0017', esbn: 'ESBN-10017', part_number: 'HLM-KYT', name: 'Helm KYT TT Course GP Race', brand_id: 8, category_id: 3, type: 'Aftermarket', size: 'L', unit: 'Pcs', product_type: 'Accessories', description: 'Helm full face KYT TT Course GP Race circuit', barcode: '8991011017', weight: 1.4, status: 'inactive', created_at: '2024-06-15', updated_at: '2024-09-01' },
  { id: 18, sku: 'SKU-0018', esbn: 'ESBN-10018', part_number: 'PST-KTC', name: 'Piston Kit Kawasaki KLX 150', brand_id: 2, category_id: 1, type: 'OEM', size: 'STD', unit: 'Set', product_type: 'Sparepart', description: 'Piston kit original Kawasaki KLX 150 standar', barcode: '8991011018', weight: 0.4, status: 'active', created_at: '2024-07-01', updated_at: '2024-09-20' },
  { id: 19, sku: 'SKU-0019', esbn: 'ESBN-10019', part_number: 'REM-BRMB', name: 'Master Rem Brembo Radial', brand_id: 7, category_id: 5, type: 'Racing', size: '19RCS', unit: 'Pcs', product_type: 'Sparepart', description: 'Master rem radial Brembo 19RCS untuk motor sport', barcode: '8991011019', weight: 0.6, status: 'active', created_at: '2024-07-10', updated_at: '2024-09-15' },
  { id: 20, sku: 'SKU-0020', esbn: 'ESBN-10020', part_number: 'GKT-BEAT', name: 'Gasket Set Honda Beat FI', brand_id: 1, category_id: 1, type: 'OEM', size: '-', unit: 'Set', product_type: 'Sparepart', description: 'Paking set lengkap untuk Honda Beat FI', barcode: '8991011020', weight: 0.08, status: 'active', created_at: '2024-07-15', updated_at: '2024-09-10' },
  { id: 21, sku: 'SKU-0021', esbn: 'ESBN-10021', part_number: 'STR-NMAX', name: 'Stang Jepit Yamaha NMAX', brand_id: 7, category_id: 3, type: 'Aftermarket', size: '-', unit: 'Set', product_type: 'Accessories', description: 'Stang jepit CNC untuk Yamaha NMAX 155', barcode: '8991011021', weight: 1.2, status: 'active', created_at: '2024-08-01', updated_at: '2024-09-20' },
  { id: 22, sku: 'SKU-0022', esbn: 'ESBN-10022', part_number: 'CVT-BEAT', name: 'Roller CVT Honda Beat 11g', brand_id: 6, category_id: 6, type: 'Aftermarket', size: '11g', unit: 'Set', product_type: 'Sparepart', description: 'Roller CVT Aspira 11 gram untuk Honda Beat', barcode: '8991011022', weight: 0.1, status: 'active', created_at: '2024-08-05', updated_at: '2024-09-18' },
  { id: 23, sku: 'SKU-0023', esbn: 'ESBN-10023', part_number: 'KBL-THR', name: 'Kabel Gas Throttle Vario 125', brand_id: 1, category_id: 1, type: 'OEM', size: '-', unit: 'Pcs', product_type: 'Sparepart', description: 'Kabel gas original Honda Vario 125 FI', barcode: '8991011023', weight: 0.05, status: 'active', created_at: '2024-08-10', updated_at: '2024-09-15' },
  { id: 24, sku: 'SKU-0024', esbn: 'ESBN-10024', part_number: 'KLH-SPD', name: 'Kaliper Rem Depan Nissin', brand_id: 7, category_id: 5, type: 'Racing', size: '2P', unit: 'Pcs', product_type: 'Sparepart', description: 'Kaliper rem depan Nissin 2 piston', barcode: '8991011024', weight: 0.8, status: 'active', created_at: '2024-08-15', updated_at: '2024-09-20' },
  { id: 25, sku: 'SKU-0025', esbn: 'ESBN-10025', part_number: 'SL-KTLN', name: 'Seal Klep Set Yamaha R15', brand_id: 3, category_id: 1, type: 'OEM', size: '-', unit: 'Set', product_type: 'Sparepart', description: 'Seal klep (valve seal) original Yamaha R15 V3', barcode: '8991011025', weight: 0.02, status: 'active', created_at: '2024-09-01', updated_at: '2024-09-20' },
  { id: 26, sku: 'SKU-0026', esbn: 'ESBN-10026', part_number: 'VLG-RCB', name: 'Velg Racing RCB SP522 14"', brand_id: 7, category_id: 8, type: 'Racing', size: '14 inch', unit: 'Set', product_type: 'Accessories', description: 'Velg racing RCB SP522 ring 14 untuk motor matic', barcode: '8991011026', weight: 4.0, status: 'active', created_at: '2024-09-05', updated_at: '2024-09-20' },
  { id: 27, sku: 'SKU-0027', esbn: 'ESBN-10027', part_number: 'JOK-MBT', name: 'Jok Motor MBtech Slim', brand_id: 8, category_id: 3, type: 'Aftermarket', size: '-', unit: 'Pcs', product_type: 'Accessories', description: 'Jok custom MBtech slim untuk motor matic', barcode: '8991011027', weight: 2.0, status: 'active', created_at: '2024-09-10', updated_at: '2024-09-20' },
  { id: 28, sku: 'SKU-0028', esbn: 'ESBN-10028', part_number: 'SPK-NGK', name: 'Koil Racing NGK Power Cable', brand_id: 4, category_id: 2, type: 'Racing', size: '-', unit: 'Pcs', product_type: 'Sparepart', description: 'Koil pengapian racing NGK Power Cable', barcode: '8991011028', weight: 0.15, status: 'active', created_at: '2024-09-12', updated_at: '2024-09-20' },
  { id: 29, sku: 'SKU-0029', esbn: 'ESBN-10029', part_number: 'FLT-OLI', name: 'Filter Oli Yamaha NMAX', brand_id: 3, category_id: 1, type: 'OEM', size: '-', unit: 'Pcs', product_type: 'Consumable', description: 'Saringan oli original Yamaha NMAX 155', barcode: '8991011029', weight: 0.05, status: 'active', created_at: '2024-09-14', updated_at: '2024-09-20' },
  { id: 30, sku: 'SKU-0030', esbn: 'ESBN-10030', part_number: 'KNP-CLD', name: 'Knalpot CLD Racing C3 Oval', brand_id: 7, category_id: 7, type: 'Racing', size: '-', unit: 'Set', product_type: 'Sparepart', description: 'Knalpot racing CLD C3 Oval untuk motor 150cc', barcode: '8991011030', weight: 2.8, status: 'inactive', created_at: '2024-09-16', updated_at: '2024-09-20' },
]

// Suppliers
export const suppliers = [
  { id: 1, supplier_code: 'SUP-001', supplier_name: 'PT Sumber Jaya Motor', phone: '021-55501234', email: 'info@sumberjayamotor.co.id', address: 'Jl. Raya Kalimalang No. 45, Bekasi, Jawa Barat 17148', status: 'active' },
  { id: 2, supplier_code: 'SUP-002', supplier_name: 'CV Maju Bersama Parts', phone: '031-88712345', email: 'sales@majubersama.com', address: 'Jl. Tunjungan No. 88, Surabaya, Jawa Timur 60271', status: 'active' },
  { id: 3, supplier_code: 'SUP-003', supplier_name: 'UD Teknik Sentosa', phone: '022-77234567', email: 'tekniksentosa@gmail.com', address: 'Jl. Soekarno-Hatta No. 120, Bandung, Jawa Barat 40223', status: 'active' },
  { id: 4, supplier_code: 'SUP-004', supplier_name: 'PT Indo Spare Parts', phone: '021-43567890', email: 'order@indospareparts.co.id', address: 'Jl. Mangga Dua Raya No. 15, Jakarta Utara, DKI Jakarta 10730', status: 'active' },
  { id: 5, supplier_code: 'SUP-005', supplier_name: 'CV Berkah Motor', phone: '024-76543210', email: 'berkahmotor@yahoo.co.id', address: 'Jl. MT Haryono No. 67, Semarang, Jawa Tengah 50242', status: 'active' },
  { id: 6, supplier_code: 'SUP-006', supplier_name: 'PT Racing Parts Indonesia', phone: '021-55098765', email: 'info@racingparts.id', address: 'Jl. Daan Mogot KM 12 No. 8, Tangerang, Banten 15122', status: 'active' },
  { id: 7, supplier_code: 'SUP-007', supplier_name: 'UD Makmur Jaya', phone: '061-88234567', email: 'makmurjaya.parts@gmail.com', address: 'Jl. Gatot Subroto No. 200, Medan, Sumatera Utara 20123', status: 'inactive' },
  { id: 8, supplier_code: 'SUP-008', supplier_name: 'CV Global Otomotif', phone: '0341-5567890', email: 'globaloto@gmail.com', address: 'Jl. Ijen No. 55, Malang, Jawa Timur 65119', status: 'active' },
]

// Item prices (multiple prices per item, showing history)
export const itemPrices = [
  { id: 1, item_id: 1, cost_price: 25000, retail_price: 45000, wholesale_price: 35000, effective_date: '2024-01-15' },
  { id: 2, item_id: 1, cost_price: 27000, retail_price: 48000, wholesale_price: 37000, effective_date: '2024-07-01' },
  { id: 3, item_id: 2, cost_price: 35000, retail_price: 65000, wholesale_price: 50000, effective_date: '2024-01-15' },
  { id: 4, item_id: 2, cost_price: 38000, retail_price: 70000, wholesale_price: 55000, effective_date: '2024-06-01' },
  { id: 5, item_id: 3, cost_price: 55000, retail_price: 95000, wholesale_price: 75000, effective_date: '2024-02-01' },
  { id: 6, item_id: 4, cost_price: 15000, retail_price: 30000, wholesale_price: 22000, effective_date: '2024-02-10' },
  { id: 7, item_id: 5, cost_price: 28000, retail_price: 48000, wholesale_price: 38000, effective_date: '2024-03-01' },
  { id: 8, item_id: 5, cost_price: 30000, retail_price: 52000, wholesale_price: 42000, effective_date: '2024-08-01' },
  { id: 9, item_id: 6, cost_price: 18000, retail_price: 35000, wholesale_price: 25000, effective_date: '2024-03-05' },
  { id: 10, item_id: 7, cost_price: 20000, retail_price: 38000, wholesale_price: 28000, effective_date: '2024-03-10' },
  { id: 11, item_id: 8, cost_price: 120000, retail_price: 195000, wholesale_price: 155000, effective_date: '2024-03-15' },
  { id: 12, item_id: 9, cost_price: 180000, retail_price: 320000, wholesale_price: 260000, effective_date: '2024-04-01' },
  { id: 13, item_id: 10, cost_price: 450000, retail_price: 750000, wholesale_price: 600000, effective_date: '2024-04-10' },
  { id: 14, item_id: 11, cost_price: 850000, retail_price: 1450000, wholesale_price: 1150000, effective_date: '2024-04-15' },
  { id: 15, item_id: 12, cost_price: 85000, retail_price: 145000, wholesale_price: 115000, effective_date: '2024-05-01' },
  { id: 16, item_id: 13, cost_price: 65000, retail_price: 110000, wholesale_price: 85000, effective_date: '2024-05-10' },
  { id: 17, item_id: 14, cost_price: 75000, retail_price: 130000, wholesale_price: 100000, effective_date: '2024-05-15' },
  { id: 18, item_id: 15, cost_price: 95000, retail_price: 165000, wholesale_price: 130000, effective_date: '2024-06-01' },
  { id: 19, item_id: 16, cost_price: 55000, retail_price: 98000, wholesale_price: 75000, effective_date: '2024-06-10' },
  { id: 20, item_id: 17, cost_price: 350000, retail_price: 580000, wholesale_price: 450000, effective_date: '2024-06-15' },
  { id: 21, item_id: 18, cost_price: 250000, retail_price: 420000, wholesale_price: 340000, effective_date: '2024-07-01' },
  { id: 22, item_id: 19, cost_price: 1800000, retail_price: 3200000, wholesale_price: 2600000, effective_date: '2024-07-10' },
  { id: 23, item_id: 20, cost_price: 35000, retail_price: 65000, wholesale_price: 48000, effective_date: '2024-07-15' },
  { id: 24, item_id: 21, cost_price: 280000, retail_price: 480000, wholesale_price: 380000, effective_date: '2024-08-01' },
  { id: 25, item_id: 22, cost_price: 22000, retail_price: 42000, wholesale_price: 32000, effective_date: '2024-08-05' },
  { id: 26, item_id: 23, cost_price: 12000, retail_price: 25000, wholesale_price: 18000, effective_date: '2024-08-10' },
  { id: 27, item_id: 24, cost_price: 350000, retail_price: 580000, wholesale_price: 460000, effective_date: '2024-08-15' },
  { id: 28, item_id: 25, cost_price: 18000, retail_price: 35000, wholesale_price: 25000, effective_date: '2024-09-01' },
  { id: 29, item_id: 26, cost_price: 1200000, retail_price: 2100000, wholesale_price: 1700000, effective_date: '2024-09-05' },
  { id: 30, item_id: 27, cost_price: 180000, retail_price: 320000, wholesale_price: 250000, effective_date: '2024-09-10' },
  { id: 31, item_id: 28, cost_price: 85000, retail_price: 150000, wholesale_price: 120000, effective_date: '2024-09-12' },
  { id: 32, item_id: 29, cost_price: 15000, retail_price: 28000, wholesale_price: 20000, effective_date: '2024-09-14' },
  { id: 33, item_id: 30, cost_price: 650000, retail_price: 1100000, wholesale_price: 880000, effective_date: '2024-09-16' },
]

// Stocks
export const stocks = [
  { id: 1, item_id: 1, warehouse_id: 1, location_id: 1, quantity: 150, minimum_stock: 20, maximum_stock: 200 },
  { id: 2, item_id: 1, warehouse_id: 2, location_id: 4, quantity: 45, minimum_stock: 10, maximum_stock: 100 },
  { id: 3, item_id: 2, warehouse_id: 1, location_id: 2, quantity: 200, minimum_stock: 50, maximum_stock: 500 },
  { id: 4, item_id: 3, warehouse_id: 1, location_id: 3, quantity: 80, minimum_stock: 15, maximum_stock: 150 },
  { id: 5, item_id: 3, warehouse_id: 3, location_id: 6, quantity: 30, minimum_stock: 10, maximum_stock: 80 },
  { id: 6, item_id: 4, warehouse_id: 1, location_id: 1, quantity: 300, minimum_stock: 50, maximum_stock: 500 },
  { id: 7, item_id: 5, warehouse_id: 1, location_id: 2, quantity: 8, minimum_stock: 20, maximum_stock: 100 },
  { id: 8, item_id: 5, warehouse_id: 2, location_id: 5, quantity: 5, minimum_stock: 10, maximum_stock: 50 },
  { id: 9, item_id: 6, warehouse_id: 1, location_id: 3, quantity: 120, minimum_stock: 30, maximum_stock: 200 },
  { id: 10, item_id: 7, warehouse_id: 1, location_id: 1, quantity: 95, minimum_stock: 20, maximum_stock: 150 },
  { id: 11, item_id: 8, warehouse_id: 1, location_id: 2, quantity: 25, minimum_stock: 10, maximum_stock: 80 },
  { id: 12, item_id: 9, warehouse_id: 1, location_id: 3, quantity: 18, minimum_stock: 5, maximum_stock: 40 },
  { id: 13, item_id: 10, warehouse_id: 1, location_id: 1, quantity: 12, minimum_stock: 5, maximum_stock: 30 },
  { id: 14, item_id: 11, warehouse_id: 1, location_id: 2, quantity: 8, minimum_stock: 3, maximum_stock: 20 },
  { id: 15, item_id: 12, warehouse_id: 1, location_id: 3, quantity: 60, minimum_stock: 15, maximum_stock: 100 },
  { id: 16, item_id: 12, warehouse_id: 2, location_id: 4, quantity: 35, minimum_stock: 10, maximum_stock: 60 },
  { id: 17, item_id: 13, warehouse_id: 1, location_id: 1, quantity: 3, minimum_stock: 10, maximum_stock: 50 },
  { id: 18, item_id: 14, warehouse_id: 1, location_id: 2, quantity: 15, minimum_stock: 5, maximum_stock: 30 },
  { id: 19, item_id: 15, warehouse_id: 1, location_id: 3, quantity: 22, minimum_stock: 8, maximum_stock: 40 },
  { id: 20, item_id: 16, warehouse_id: 1, location_id: 1, quantity: 55, minimum_stock: 15, maximum_stock: 80 },
  { id: 21, item_id: 17, warehouse_id: 1, location_id: 2, quantity: 4, minimum_stock: 3, maximum_stock: 15 },
  { id: 22, item_id: 18, warehouse_id: 1, location_id: 3, quantity: 10, minimum_stock: 5, maximum_stock: 25 },
  { id: 23, item_id: 19, warehouse_id: 1, location_id: 1, quantity: 6, minimum_stock: 2, maximum_stock: 10 },
  { id: 24, item_id: 20, warehouse_id: 1, location_id: 2, quantity: 180, minimum_stock: 30, maximum_stock: 250 },
  { id: 25, item_id: 21, warehouse_id: 1, location_id: 3, quantity: 7, minimum_stock: 3, maximum_stock: 15 },
  { id: 26, item_id: 22, warehouse_id: 1, location_id: 1, quantity: 90, minimum_stock: 20, maximum_stock: 150 },
  { id: 27, item_id: 23, warehouse_id: 1, location_id: 2, quantity: 45, minimum_stock: 15, maximum_stock: 80 },
  { id: 28, item_id: 24, warehouse_id: 1, location_id: 3, quantity: 5, minimum_stock: 3, maximum_stock: 15 },
  { id: 29, item_id: 25, warehouse_id: 1, location_id: 1, quantity: 130, minimum_stock: 30, maximum_stock: 200 },
  { id: 30, item_id: 26, warehouse_id: 1, location_id: 2, quantity: 4, minimum_stock: 2, maximum_stock: 10 },
  { id: 31, item_id: 27, warehouse_id: 3, location_id: 6, quantity: 9, minimum_stock: 3, maximum_stock: 20 },
  { id: 32, item_id: 28, warehouse_id: 1, location_id: 3, quantity: 28, minimum_stock: 10, maximum_stock: 50 },
  { id: 33, item_id: 29, warehouse_id: 1, location_id: 1, quantity: 75, minimum_stock: 20, maximum_stock: 120 },
  { id: 34, item_id: 30, warehouse_id: 1, location_id: 2, quantity: 3, minimum_stock: 2, maximum_stock: 10 },
]

// Item Compatibilities
export const itemCompatibilities = [
  { id: 1, item_id: 1, motor_brand: 'Honda', motor_model: 'Beat FI', motor_type: 'Matic', year_from: 2014, year_to: 2024 },
  { id: 2, item_id: 1, motor_brand: 'Honda', motor_model: 'Beat Street', motor_type: 'Matic', year_from: 2017, year_to: 2024 },
  { id: 3, item_id: 1, motor_brand: 'Honda', motor_model: 'Scoopy FI', motor_type: 'Matic', year_from: 2013, year_to: 2024 },
  { id: 4, item_id: 2, motor_brand: 'Honda', motor_model: 'Beat FI', motor_type: 'Matic', year_from: 2012, year_to: 2024 },
  { id: 5, item_id: 2, motor_brand: 'Yamaha', motor_model: 'Mio M3', motor_type: 'Matic', year_from: 2015, year_to: 2024 },
  { id: 6, item_id: 2, motor_brand: 'Yamaha', motor_model: 'Jupiter Z', motor_type: 'Bebek', year_from: 2010, year_to: 2020 },
  { id: 7, item_id: 3, motor_brand: 'Honda', motor_model: 'Supra X 125', motor_type: 'Bebek', year_from: 2005, year_to: 2024 },
  { id: 8, item_id: 3, motor_brand: 'Honda', motor_model: 'CB150R', motor_type: 'Sport', year_from: 2015, year_to: 2024 },
  { id: 9, item_id: 3, motor_brand: 'Yamaha', motor_model: 'Vixion', motor_type: 'Sport', year_from: 2007, year_to: 2024 },
  { id: 10, item_id: 5, motor_brand: 'Honda', motor_model: 'Beat FI', motor_type: 'Matic', year_from: 2012, year_to: 2024 },
  { id: 11, item_id: 5, motor_brand: 'Honda', motor_model: 'Vario 125', motor_type: 'Matic', year_from: 2012, year_to: 2024 },
  { id: 12, item_id: 5, motor_brand: 'Honda', motor_model: 'Scoopy FI', motor_type: 'Matic', year_from: 2013, year_to: 2024 },
  { id: 13, item_id: 6, motor_brand: 'Honda', motor_model: 'Beat FI ESP', motor_type: 'Matic', year_from: 2015, year_to: 2024 },
  { id: 14, item_id: 8, motor_brand: 'Yamaha', motor_model: 'NMAX 155', motor_type: 'Matic', year_from: 2015, year_to: 2024 },
  { id: 15, item_id: 8, motor_brand: 'Yamaha', motor_model: 'NMAX Connected', motor_type: 'Matic', year_from: 2020, year_to: 2024 },
  { id: 16, item_id: 10, motor_brand: 'Honda', motor_model: 'CB150R', motor_type: 'Sport', year_from: 2015, year_to: 2024 },
  { id: 17, item_id: 10, motor_brand: 'Yamaha', motor_model: 'Vixion', motor_type: 'Sport', year_from: 2013, year_to: 2024 },
  { id: 18, item_id: 10, motor_brand: 'Honda', motor_model: 'Verza 150', motor_type: 'Sport', year_from: 2013, year_to: 2024 },
  { id: 19, item_id: 11, motor_brand: 'Honda', motor_model: 'CBR 150R', motor_type: 'Sport', year_from: 2016, year_to: 2024 },
  { id: 20, item_id: 11, motor_brand: 'Yamaha', motor_model: 'R15 V3', motor_type: 'Sport', year_from: 2017, year_to: 2024 },
  { id: 21, item_id: 15, motor_brand: 'Honda', motor_model: 'CBR 150R', motor_type: 'Sport', year_from: 2016, year_to: 2024 },
  { id: 22, item_id: 15, motor_brand: 'Honda', motor_model: 'CB150R', motor_type: 'Sport', year_from: 2015, year_to: 2024 },
  { id: 23, item_id: 18, motor_brand: 'Kawasaki', motor_model: 'KLX 150', motor_type: 'Trail', year_from: 2015, year_to: 2024 },
  { id: 24, item_id: 20, motor_brand: 'Honda', motor_model: 'Beat FI', motor_type: 'Matic', year_from: 2012, year_to: 2024 },
  { id: 25, item_id: 20, motor_brand: 'Honda', motor_model: 'Scoopy FI', motor_type: 'Matic', year_from: 2013, year_to: 2024 },
  { id: 26, item_id: 22, motor_brand: 'Honda', motor_model: 'Beat FI', motor_type: 'Matic', year_from: 2012, year_to: 2024 },
  { id: 27, item_id: 22, motor_brand: 'Honda', motor_model: 'Scoopy FI', motor_type: 'Matic', year_from: 2013, year_to: 2024 },
  { id: 28, item_id: 22, motor_brand: 'Honda', motor_model: 'Vario 110', motor_type: 'Matic', year_from: 2014, year_to: 2024 },
  { id: 29, item_id: 25, motor_brand: 'Yamaha', motor_model: 'R15 V3', motor_type: 'Sport', year_from: 2017, year_to: 2024 },
  { id: 30, item_id: 29, motor_brand: 'Yamaha', motor_model: 'NMAX 155', motor_type: 'Matic', year_from: 2015, year_to: 2024 },
]

// Helper functions
export function getItemById(id) {
  return items.find(item => item.id === id)
}

export function getBrandName(brandId) {
  return brands.find(b => b.id === brandId)?.name || 'Unknown'
}

export function getCategoryName(categoryId) {
  return categories.find(c => c.id === categoryId)?.name || 'Unknown'
}

export function getWarehouseName(warehouseId) {
  return warehouses.find(w => w.id === warehouseId)?.name || 'Unknown'
}

export function getLocationName(locationId) {
  return locations.find(l => l.id === locationId)?.name || 'Unknown'
}

export function getItemPrices(itemId) {
  return itemPrices.filter(p => p.item_id === itemId).sort((a, b) => new Date(b.effective_date) - new Date(a.effective_date))
}

export function getLatestPrice(itemId) {
  const prices = getItemPrices(itemId)
  return prices.length > 0 ? prices[0] : null
}

export function getItemStocks(itemId) {
  return stocks.filter(s => s.item_id === itemId)
}

export function getItemCompatibilities(itemId) {
  return itemCompatibilities.filter(c => c.item_id === itemId)
}

export function getStockStatus(quantity, minimum, maximum) {
  if (quantity <= 0) return 'out'
  if (quantity < minimum) return 'critical'
  if (quantity <= minimum * 1.5) return 'low'
  if (quantity > maximum) return 'over'
  return 'ok'
}

export function getSupplierById(id) {
  return suppliers.find(s => s.id === id)
}

// Dashboard summary stats
export function getDashboardStats() {
  const totalItems = items.length
  const activeItems = items.filter(i => i.status === 'active').length
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length
  
  let lowStockCount = 0
  let totalStockValue = 0
  stocks.forEach(s => {
    const status = getStockStatus(s.quantity, s.minimum_stock, s.maximum_stock)
    if (status === 'critical' || status === 'low' || status === 'out') lowStockCount++
    const price = getLatestPrice(s.item_id)
    if (price) totalStockValue += s.quantity * price.cost_price
  })
  
  return { totalItems, activeItems, activeSuppliers, lowStockCount, totalStockValue }
}
