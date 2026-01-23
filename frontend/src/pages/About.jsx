import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About ImageGallery
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            A modern full-stack image sharing platform where users can explore,
            like, and manage images securely with a clean and premium UI.
          </p>
        </div>
      </section>

      {/* ABOUT WEBSITE */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* TEXT */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-slate-800">
              What is ImageGallery?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              ImageGallery is a full-stack web application designed to provide a
              smooth and secure experience for browsing and interacting with
              images. Users can view the latest images, like their favorites,
              and manage content after authentication.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The platform focuses on performance, scalability, and real-world
              production practices such as JWT authentication, protected APIs,
              and modern frontend design.
            </p>
          </div>

          {/* FEATURE CARD */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 space-y-5 border border-slate-200">
            <Feature
              title="🔐 Secure Authentication"
              desc="Login using Email/Password or Google OAuth with JWT-based security."
            />
            <Feature
              title="❤️ Like & Save Images"
              desc="Users can like images and access them anytime from their profile."
            />
            <Feature
              title="⚡ Fast & Responsive"
              desc="Optimized performance with a smooth experience on all devices."
            />
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Technology Used
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <TechCard title="React + Vite" />
            <TechCard title="Node.js & Express" />
            <TechCard title="MongoDB" />
            <TechCard title="Tailwind CSS" />
          </div>
        </div>
      </section>

      {/* WHY THIS PROJECT */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Why This Project?
          </h2>
          <p className="text-slate-300 max-w-4xl mx-auto leading-relaxed">
            This project is built to demonstrate real-world full-stack
            development skills. It combines a modern frontend, a secure backend,
            authentication, and clean UI/UX practices to create a
            production-ready application.
          </p>
        </div>
      </section>

      {/* DEVELOPER */}
      <section className="bg-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-800">
            About the Developer
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ImageGallery is developed by{" "}
            <span className="font-semibold text-slate-800">
              Bharat Pareek
            </span>
            , a passionate full-stack developer focused on building scalable,
            secure, and user-friendly web applications. This project reflects
            practical experience with modern tools and real production flows.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Feature({ title, desc }) {
  return (
    <div>
      <h3 className="font-semibold text-lg text-slate-800 mb-1">
        {title}
      </h3>
      <p className="text-slate-600 text-sm">
        {desc}
      </p>
    </div>
  );
}

function TechCard({ title }) {
  return (
    <div className="bg-slate-50 rounded-xl p-6 text-center shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-slate-800">
        {title}
      </h3>
    </div>
  );
}

export default About;
