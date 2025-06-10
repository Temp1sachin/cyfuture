# 🧾 Legal PDF Analyzer (Ollama + React)

This full-stack app allows users to upload a **legal PDF** and receive AI-generated insights such as:

- 📄 Summary of the document
- ⚠️ Legal risks and liabilities
- 📚 Key legal terms with meanings

---

## 🛠️ Tech Stack

- **Frontend**: NextJs, TailwindCSS
- **Backend**: Node.js, Express
- **AI Engine**: [Ollama](https://ollama.com) with `mistral` model
- **PDF Handling**: `multer` for uploads
- **Caching**: In-memory (future: Redis)

---

## 🚀 Features

- Upload a PDF and choose the type of analysis:
  - 🧠 Summarize
  - ⚠️ Identify Risks
  - 📚 Extract Key Terms
- Real-time response on frontend
- Caching prevents duplicate re-analysis

---

## 📦 Setup Instructions

### 🔧 Prerequisites

- Node.js (v18+)
- Docker + Docker Compose
- Ollama Model: `mistral`

---

## 🧰 All Setup Commands (Grouped)

### 1. 📥 Clone the Repo

```bash
git clone https://github.com/your-username/legal-pdf-analyzer.git
cd legal-pdf-analyzer

2. 🧠 Start Ollama (via Docker)
bash
Copy
Edit
docker run -d \
  --name ollama \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama

# Pull the model (once):
docker exec ollama ollama pull mistral

3. 🖥️ Start Backend (Node.js)
bash
Copy
Edit
cd server
npm install
node index.js

4. 🌐 Start Frontend (NextJs)
bash
Copy
Edit
cd my-app
npm install
npm run dev