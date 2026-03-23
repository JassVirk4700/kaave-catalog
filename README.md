# KAAVE B2B Catalog Website

Welcome to the **KAAVE** B2B Catalog, a premium, interactive, lightweight digital catalog designed specifically for showcasing traditional Indian footwear (Flat Mules, Punjabi Juttis, Lahori, etc.) to wholesale clients. 

This project is built from the ground up to be a **static, extremely fast, mobile-first frontend** that connects buyers directly to your business via WhatsApp inquiries, functioning flawlessly without needing a complex backend database.


## 🛠 Tech Stack

- **Framework:** Next.js (App Router) v15 / v16 (Turbopack)
- **Styling:** Tailwind CSS (via `globals.css`)
- **Languages:** TypeScript / React
- **Icons:** `react-icons/fa` (for WhatsApp), standard `.ico` scaling, and custom `.webp` assets (e.g., the mirroring cultural elephants).
- **Deployment:** Vercel (Statically exported and edge-ready)

## 🚀 How to Run & Deploy

### Local Development
1. Clone the repository and run `npm install`.
2. Copy `.env.example` to `.env.local` and add your WhatsApp number (e.g., `NEXT_PUBLIC_WHATSAPP_NUMBER=919876543221`) and localhost URL.
3. Start the dev server using `npm run dev`.

### Adding/Editing Products
All products are statically stored in `data/products.ts`. To add a new product or update inventory:
1. Open `data/products.ts`.
2. Duplicate an existing product block.
3. Fill in the unique details (`slug`, `name`, `images`, `specs`, etc.).
   *Ensure image paths correctly point to files placed in the `public/images/products/...` folder!*
4. Save the file. The site will automatically reflect the changes.

---

Made by Jass ❤️
