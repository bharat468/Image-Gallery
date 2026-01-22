import React from "react";

function About() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            About ImageGallery
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Discover, like, and manage images with a modern and secure platform.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT TEXT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Who We Are
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              ImageGallery is a modern full-stack web application built to
              showcase, explore, and interact with images. Users can browse
              high-quality images, like their favorites, and manage content
              securely using authentication.
            </p>
            <p className="text-slate-600 leading-relaxed">
              This project is developed with a focus on performance, clean UI,
              and secure authentication using JWT and Google Login. It is
              designed to be scalable and user-friendly.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">✔ Secure Authentication</h3>
              <p className="text-slate-600 text-sm">
                Login using Email/Password or Google with JWT security.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Like & Interaction</h3>
              <p className="text-slate-600 text-sm">
                Users can like images and interact in real time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Modern Tech Stack</h3>
              <p className="text-slate-600 text-sm">
                Built with React, Node.js, Express, MongoDB, and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-center mb-10">
            Why Choose This Platform?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-lg p-6 text-center shadow">
              <h3 className="font-semibold mb-2">Fast & Responsive</h3>
              <p className="text-slate-600 text-sm">
                Optimized for speed and works smoothly on all devices.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 text-center shadow">
              <h3 className="font-semibold mb-2">Clean UI/UX</h3>
              <p className="text-slate-600 text-sm">
                Minimal and modern interface for better user experience.
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 text-center shadow">
              <h3 className="font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-slate-600 text-sm">
                JWT-based authentication with protected APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEVELOPER INFO */}
      <section className="bg-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl font-bold mb-4">
            About the Developer
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
            This project is developed by <span className="font-semibold">Bharat Pareek</span>,
            a passionate web developer focused on building modern, scalable,
            and secure web applications. The goal of this project is to apply
            real-world full-stack development concepts and create a practical,
            production-ready application.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
