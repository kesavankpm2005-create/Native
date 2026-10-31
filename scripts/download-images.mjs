import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const targetDir = path.resolve(__dirname, '../public/images/products')

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

export const productImages = [
  // Rice & Grains
  { sku: 'TN-RC-001', name: 'Ponni boiled rice', brand: 'Shree Akshara', url: 'https://images.openfoodfacts.org/images/products/890/800/508/8660/front_en.3.400.jpg' },
  { sku: 'TN-RC-002', name: 'Idli rice', brand: 'MTR', url: 'https://images.openfoodfacts.org/images/products/890/115/510/2217/front_en.14.400.jpg' },
  { sku: 'TN-RC-003', name: 'Dosa rice', brand: 'GL Dosa Rice', url: 'https://images.openfoodfacts.org/images/products/890/290/122/6867/front_en.3.400.jpg' },
  { sku: 'TN-RC-004', name: 'Seeraga samba rice', brand: 'Seeraga Samba', url: 'https://images.openfoodfacts.org/images/products/890/609/083/1734/front_en.3.400.jpg' },
  { sku: 'TN-RC-005', name: 'Red rice', brand: 'Organic Tattva', url: 'https://images.openfoodfacts.org/images/products/890/605/544/1589/front_en.10.400.jpg' },
  { sku: 'TN-RC-006', name: 'Raw rice', brand: 'India Gate', url: 'https://images.openfoodfacts.org/images/products/069/022/510/6467/front_en.3.400.jpg' },
  { sku: 'TN-RC-007', name: 'Foxtail millet (Thinai)', brand: 'Organic Tattva', url: 'https://images.openfoodfacts.org/images/products/890/605/544/1503/front_en.3.400.jpg' },
  { sku: 'TN-RC-008', name: 'Maize grain', brand: 'Organic Tattva', url: 'https://images.openfoodfacts.org/images/products/890/605/544/0414/front_en.3.400.jpg' },

  // Wheat & Flours
  { sku: 'TN-WF-001', name: 'Whole wheat atta', brand: 'Aashirvaad', url: 'https://images.openfoodfacts.org/images/products/890/172/512/1129/front_en.30.400.jpg' },
  { sku: 'TN-WF-002', name: 'Whole wheat berries', brand: '24 Mantra Organic', url: 'https://images.openfoodfacts.org/images/products/890/408/350/6485/front_en.3.400.jpg' },
  { sku: 'TN-WF-003', name: 'Wheat flour', brand: 'Aashirvaad', url: 'https://images.openfoodfacts.org/images/products/890/172/501/6838/front_en.7.400.jpg' },
  { sku: 'TN-WF-004', name: 'Ragi flour', brand: '24 Mantra Organic', url: 'https://images.openfoodfacts.org/images/products/890/408/350/6218/front_en.3.400.jpg' },
  { sku: 'TN-WF-005', name: 'Kambu flour', brand: 'Organic Tattva', url: 'https://images.openfoodfacts.org/images/products/890/605/544/0391/front_en.3.400.jpg' },
  { sku: 'TN-WF-006', name: 'Cholam flour', brand: 'More', url: 'https://images.openfoodfacts.org/images/products/890/305/959/1739/front_en.3.400.jpg' },

  // Pulses
  { sku: 'TN-PL-001', name: 'Toor dal', brand: 'Tata Sampann', url: 'https://images.openfoodfacts.org/images/products/890/404/392/6216/front_en.5.400.jpg' },
  { sku: 'TN-PL-002', name: 'Chana dal', brand: 'Tata Sampann', url: 'https://images.openfoodfacts.org/images/products/890/404/392/6643/front_en.3.400.jpg' },
  { sku: 'TN-PL-003', name: 'Whole green gram', brand: 'Tata Sampann', url: 'https://images.openfoodfacts.org/images/products/890/404/392/6322/front_en.3.400.jpg' },
  { sku: 'TN-PL-004', name: 'Whole urad dal', brand: 'Tata Sampann', url: 'https://images.openfoodfacts.org/images/products/890/404/392/6124/front_en.3.400.jpg' },
  { sku: 'TN-PL-005', name: 'Red masoor dal', brand: 'Tata Sampann', url: 'https://images.openfoodfacts.org/images/products/890/404/392/6582/front_en.3.400.jpg' },

  // Chocolate
  { sku: 'TN-CH-001', name: 'Dark chocolate bar', brand: 'Cadbury Bournville', url: 'https://images.openfoodfacts.org/images/products/762/220/232/5939/front_en.3.400.jpg' },
  { sku: 'TN-CH-002', name: 'Milk chocolate bar', brand: 'Amul', url: 'https://images.openfoodfacts.org/images/products/890/126/207/0010/front_en.11.400.jpg' },
  { sku: 'TN-CH-003', name: 'Chocolate chips', brand: 'Nestle Toll House', url: 'https://images.openfoodfacts.org/images/products/002/800/021/5804/front_en.33.400.jpg' },
  { sku: 'TN-CH-004', name: 'Cocoa powder', brand: 'Cadbury', url: 'https://images.openfoodfacts.org/images/products/762/220/176/2353/front_en.5.400.jpg' },
  { sku: 'TN-CH-005', name: 'Cadbury Dairy Milk chocolate', brand: 'Cadbury', url: 'https://images.openfoodfacts.org/images/products/762/220/233/4009/front_en.9.400.jpg' },
  { sku: 'TN-CH-006', name: 'Nestle Milkybar white chocolate', brand: 'Nestle', url: 'https://images.openfoodfacts.org/images/products/800/030/043/0349/front_en.21.400.jpg' },
  { sku: 'TN-CH-007', name: 'KitKat chocolate', brand: 'Nestle', url: 'https://images.openfoodfacts.org/images/products/629/400/355/0196/front_fr.4.400.jpg' },
  { sku: 'TN-CH-008', name: 'Cadbury 5 Star chocolate', brand: 'Cadbury', url: 'https://images.openfoodfacts.org/images/products/762/220/231/8047/front_en.3.400.jpg' },
  { sku: 'TN-CH-009', name: 'Nestle Munch chocolate', brand: 'Nestle', url: 'https://images.openfoodfacts.org/images/products/000/008/900/9802/front_en.9.400.jpg' },

  // Biscuits
  { sku: 'TN-BI-001', name: 'Marie Biscuits', brand: 'Britannia', url: 'https://images.openfoodfacts.org/images/products/890/106/316/2914/front_en.3.400.jpg' },
  { sku: 'TN-BI-002', name: 'Digestive Biscuits', brand: 'Britannia NutriChoice', url: 'https://images.openfoodfacts.org/images/products/890/106/314/2015/front_en.30.400.jpg' },
  { sku: 'TN-BI-003', name: 'Assorted Crackers', brand: 'Britannia 50-50', url: 'https://images.openfoodfacts.org/images/products/890/106/301/6873/front_en.10.400.jpg' },

  // Cookies
  { sku: 'TN-CO-001', name: 'Chocolate Chip Cookies', brand: 'Sunfeast Dark Fantasy', url: 'https://images.openfoodfacts.org/images/products/890/172/501/5909/front_en.3.400.jpg' },
  { sku: 'TN-CO-002', name: 'Butter Cookies', brand: 'Britannia Good Day', url: 'https://images.openfoodfacts.org/images/products/890/106/309/3287/front_en.18.400.jpg' },
  { sku: 'TN-CO-003', name: 'Assorted Cookies', brand: "Sunfeast Mom's Magic", url: 'https://images.openfoodfacts.org/images/products/890/172/513/5485/front_en.4.400.jpg' },

  // Beverages
  { sku: 'TN-BV-001', name: 'Filter coffee powder', brand: 'Bru', url: 'https://images.openfoodfacts.org/images/products/890/103/090/4561/front_en.3.400.jpg' },
  { sku: 'TN-BV-002', name: 'Herbal tea', brand: 'Tata Tea', url: 'https://images.openfoodfacts.org/images/products/890/105/200/6717/front_en.6.400.jpg' },
  { sku: 'TN-BV-003', name: 'Coca-Cola soft drink', brand: 'Coca-Cola', url: 'https://images.openfoodfacts.org/images/products/890/176/401/2303/front_en.30.400.jpg' },
  { sku: 'TN-BV-004', name: 'Pepsi soft drink', brand: 'Pepsi', url: 'https://images.openfoodfacts.org/images/products/890/208/000/1156/front_en.3.400.jpg' },
  { sku: 'TN-BV-005', name: 'Maa Mango drink', brand: 'Parle Frooti', url: 'https://images.openfoodfacts.org/images/products/890/257/900/1599/front_en.9.400.jpg' },
  { sku: 'TN-BV-006', name: 'Maaza mango drink', brand: 'Maaza', url: 'https://images.openfoodfacts.org/images/products/890/176/409/2206/front_en.86.400.jpg' },
  { sku: 'TN-BV-007', name: 'Slice mango drink', brand: 'Slice', url: 'https://images.openfoodfacts.org/images/products/890/208/000/3068/front_en.12.400.jpg' },

  // Home Care
  { sku: 'TN-HC-001', name: 'Dishwash liquid', brand: 'Vim', url: 'https://images.openfoodfacts.org/images/products/890/910/600/0230/front_en.3.400.jpg' },
  { sku: 'TN-HC-002', name: 'Laundry detergent', brand: 'Surf Excel', url: 'https://images.openproductsfacts.org/images/products/890/910/601/5081/front_en.3.400.jpg' },

  // Toiletries
  { sku: 'TN-TL-001', name: 'Bathing soap', brand: 'Medimix', url: 'https://images.openbeautyfacts.org/images/products/890/401/830/0249/front_fr.3.400.jpg' },
  { sku: 'TN-TL-002', name: 'Toothpaste', brand: 'Colgate', url: 'https://images.openbeautyfacts.org/images/products/890/131/400/9067/front_en.4.400.jpg' },
  { sku: 'TN-TL-003', name: 'Clinic Plus shampoo', brand: 'Clinic Plus', url: 'https://images.openbeautyfacts.org/images/products/890/910/607/2534/front_en.3.400.jpg' },
  { sku: 'TN-TL-004', name: 'Head & Shoulders shampoo', brand: 'Head & Shoulders', url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Head_%26_Shoulders_shampoo_bottle.jpg' },

  // Beauty Products
  { sku: 'TN-BP-001', name: 'Coconut hair oil', brand: 'Parachute', url: 'https://images.openfoodfacts.org/images/products/890/108/810/2872/front_en.5.400.jpg' },
  { sku: 'TN-BP-002', name: 'Aloe vera gel', brand: 'Patanjali', url: 'https://images.openbeautyfacts.org/images/products/890/410/940/0643/front_en.4.400.jpg' },

  // Dairy Products
  { sku: 'TN-DA-001', name: 'Fresh cow milk', brand: 'Aavin', url: 'https://images.openfoodfacts.org/images/products/890/401/130/1601/front_en.3.400.jpg' },
  { sku: 'TN-DA-002', name: 'Thick curd', brand: 'Milky Mist', url: 'https://images.openfoodfacts.org/images/products/890/408/330/6085/front_en.5.400.jpg' },
  { sku: 'TN-DA-003', name: 'Fresh buttermilk', brand: 'Amul Masti', url: 'https://images.openfoodfacts.org/images/products/890/126/220/0233/front_en.3.400.jpg' },
  { sku: 'TN-DA-004', name: 'Cheddar cheese', brand: 'Amul', url: 'https://images.openfoodfacts.org/images/products/890/126/202/0039/front_en.40.400.jpg' },
  { sku: 'TN-DA-005', name: 'Salted butter', brand: 'Amul', url: 'https://images.openfoodfacts.org/images/products/890/126/201/0016/front_en.53.400.jpg' },
  { sku: 'TN-DA-006', name: 'Fresh paneer', brand: 'Amul', url: 'https://images.openfoodfacts.org/images/products/890/126/218/0016/front_en.5.400.jpg' },
  { sku: 'TN-DA-007', name: 'Pure cow ghee', brand: 'Amul', url: 'https://images.openfoodfacts.org/images/products/890/126/203/0663/front_en.13.400.jpg' },

  // Leafy Greens
  { sku: 'TN-LG-001', name: 'Murungai keerai', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vibrant_Green_of_Moringa_leaf_at_Songhai_Farm_Rivers_State.jpg' },
  { sku: 'TN-LG-002', name: 'Arai keerai', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Bayam_Merah_Topview.jpg' },
  { sku: 'TN-LG-003', name: 'Siru keerai', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Amaranthus_viridis_sl9.jpg' },
  { sku: 'TN-LG-004', name: 'Fresh spinach', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Fresh_Spinach_leaves.jpg' },
  { sku: 'TN-LG-005', name: 'Fresh curry leaves', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Curry_Leaves_%285194454978%29.jpg' },

  // Fruits
  { sku: 'TN-FR-001', name: 'Poovan bananas', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Bananas.jpg' },
  { sku: 'TN-FR-002', name: 'Salem mangoes', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Mangoes_in_a_basket_02.jpg' },
  { sku: 'TN-FR-003', name: 'Guava', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Fresh_Guava.jpg' },
  { sku: 'TN-FR-004', name: 'Papaya', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Papaya_cross_section_BNC.jpg' },
  { sku: 'TN-FR-005', name: 'Sweet lime', brand: 'Salem Orchard', url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Sweet_limes_of_Salem.jpg' },
  { sku: 'TN-FR-006', name: 'Tender coconut', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Tender_coconut%2C_one_part.jpg' },
  { sku: 'TN-FR-007', name: 'Jackfruit bulbs', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/DFC_4176_Golden_jackfruit_bulbs_piled_together_ready_to_eat.jpg' },

  // Vegetables
  { sku: 'TN-VG-001', name: 'Farm tomatoes', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg' },
  { sku: 'TN-VG-002', name: 'Small onions', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shallot_%28Sambar_Onion%29_%281%29.JPG' },
  { sku: 'TN-VG-003', name: 'Purple brinjal', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Solanum_melongena_24_08_2012_%281%29.JPG' },
  { sku: 'TN-VG-004', name: 'Fresh okra', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Okra_or_lady_finger.jpg' },
  { sku: 'TN-VG-005', name: 'Drumstick (murungakkai)', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Moringa_oleifera_drumstick_pods.JPG' },
  { sku: 'TN-VG-006', name: 'Carrots', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Fresh_orange_carrots.jpg' },
  { sku: 'TN-VG-007', name: 'Potatoes', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg' },
  { sku: 'TN-VG-008', name: 'Cucumber', brand: 'Farm Fresh', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Fresh_green_cucumbers.jpg' }
]

async function downloadFile(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'NativeGroceriesPackaging/1.0 (contact@nativegroceries.com; https://nativegroceries.in)'
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  if (buffer.length < 100) throw new Error('File too small or empty')
  fs.writeFileSync(dest, buffer)
  return buffer.length
}

async function main() {
  console.log(`Starting download of ${productImages.length} authentic grocery images...`)
  let successCount = 0
  let failCount = 0

  for (let i = 0; i < productImages.length; i++) {
    const item = productImages[i]
    const dest = path.join(targetDir, `${item.sku}.jpg`)

    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[${i + 1}/${productImages.length}] SKIP: ${item.sku} already downloaded (${fs.statSync(dest).size} bytes)`)
      successCount++
      continue
    }

    try {
      const size = await downloadFile(item.url, dest)
      console.log(`[${i + 1}/${productImages.length}] OK: ${item.sku} (${item.name} - ${item.brand}) -> ${size} bytes`)
      successCount++
    } catch (err) {
      console.error(`[${i + 1}/${productImages.length}] FAILED: ${item.sku} (${item.name}) from ${item.url} -> ${err.message}`)
      failCount++
    }

    // Gentle delay to respect rate limits
    await new Promise(r => setTimeout(r, 400))
  }

  console.log(`\nFinished: ${successCount} succeeded, ${failCount} failed.`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch(err => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
}
