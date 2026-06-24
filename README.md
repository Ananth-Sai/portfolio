# Anantha Sai Valluru | Interactive Developer Portfolio

> **Full-Stack Web Developer**
> Master of Computer Science | Illinois Institute of Technology

Welcome to the repository for my interactive developer portfolio. Built with a terminal-inspired aesthetic, this project goes beyond a standard static resume by serving as a live demonstration of full-stack development, database architecture, and modern UI/UX design.

## ⚙️ TECH STACK

The system is built on a modern, scalable web architecture:

* **Frontend Engine:** Next.js (App Router), React, TypeScript
* **Styling & UI:** Tailwind CSS, Custom CSS animations (Scanlines, Grid overlays)
* **Database Integration:** MongoDB with Mongoose Schema validation
* **Contact Integration:** EmailJS for direct client-to-server messaging
* **Assets:** Lucide React icons, Custom interactive cursors

## 🚀 KEY FEATURES

* **Dynamic Boot Sequence:** Decrypting text headers and typewriter terminal arrays that render upon system initialization.
* **Immersive Interface:** Visual layers including global moving scanlines, static background grids, and continuous data streams.
* **Live Data Retrieval:** Experience, Projects, and Education modules are not hardcoded. They are fetched dynamically from a secure MongoDB backend cluster.
* **Interactive Node Targets:** Custom global crosshair cursor that reacts and morphs when hovering over interactive elements and action nodes.
* **Secure Messaging:** A fully functional contact form that bypasses traditional mail clients to send messages directly via EmailJS.

## 📂 DIRECTORY STRUCTURE

A high-level overview of the system files:

```text
portfolio-website/
├── public/             # Static assets, SVG icons, and PDF resume
├── src/
│   ├── app/            # Next.js App Router, Global CSS, and API routes
│   ├── components/     # Modular UI elements (Navbar, Hero, HUD overlays)
│   ├── lib/            # MongoDB connection logic
│   └── models/         # Mongoose database schemas
├── .env.local          # Local vault for database and API keys (Git ignored)
└── tailwind.config.ts  # UI styling configuration
```

## 💻 LOCAL DEVELOPMENT SETUP
To run this project on your local machine, execute the following commands in your terminal:

1. Clone the repository
```
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)

cd portfolio-website
```

2. Install dependencies
```
npm install
```

3. Configure Environment Variables

Create a ```.env.local``` file in the root directory and securely add your database and API keys:

```
MONGODB_URI="your_mongodb_connection_string"
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service_id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template_id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_public_key"
```

4. Start the development server
```
npm run dev
```

5. Open http://localhost:3000 with your browser to view the application.
