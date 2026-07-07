# 💼 SDE & Systems Engineering Portfolio

A high-performance, minimalist software engineering portfolio showcasing core distributed systems, database storage engines, and backend proxy architectures. Designed with a clean Option B light-theme layout inspired by premium tech companies like Stripe and Vercel.

Live Deployment: **[harsharajkumar-273.github.io/SDE-Portfolio/](https://harsharajkumar-273.github.io/SDE-Portfolio/)**

---

## 🚀 Key Features

*   **Clean Light Theme**: Responsive stylesheet optimized for readability, with soft slate grids and glowing hover card shadows.
*   **Active Seeking Badge**: Green pulsing dot showing availability: `🟢 Actively seeking Full-Time SDE Roles (Summer/Fall 2027)`.
*   **Systems Simulators**: Dynamic, interactive React widgets embedded directly in modal overlays so recruiters can simulate system loads without leaving the page.
*   **SDE-Focused Showcase**: Features 5 flagship systems projects:
    1.  **LSM-Tree Key-Value Engine (C++)**: Asynchronous `io_uring` direct I/O WAL, Arena SkipList MemTable, and block Bloom filters.
    2.  **Repost-Radar Deduplicator (C++)**: AVX2 SIMD vectorized locality-sensitive hashing (LSH) for high-frequency stream filtering.
    3.  **PulseStream Metrics Ingestion (TypeScript)**: Redpanda broker pipeline with Redis edge deduplication locks.
    4.  **ARIA Crisis Pathfinder (TypeScript)**: Spatial PostGIS routing graph running modified decay Dijkstra paths.
    5.  **Production API Gateway (Node.js)**: SLO error-budget monitor, rate limiting, and Circuit Breakers.

---

## 🛠️ Tech Stack & Utilities

*   **Frontend Core**: React 18, Vite, Vanilla CSS
*   **Icons & Assets**: Lucide-React
*   **Build Optimization**: Custom subpath asset resolution (`base: '/SDE-Portfolio/'`) in `vite.config.js`
*   **CI/CD Pipeline**: GitHub Actions (`.github/workflows/deploy.yml`) compiling and deploying production bundles to `gh-pages` branch automatically on every push.

---

## 📦 Local Installation & Development

```bash
# Clone the repository
git clone https://github.com/harsharajkumar-273/SDE-Portfolio.git
cd SDE-Portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for details.
