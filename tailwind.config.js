/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        panel: "0 20px 60px rgba(4, 7, 17, 0.16)",
        glow: "0 0 0 1px rgba(168, 85, 247, 0.3), 0 24px 80px rgba(110, 46, 190, 0.28)",
        soft: "0 18px 50px rgba(15, 23, 42, 0.08)"
      },
      borderRadius: {
        panel: "28px"
      },
      backgroundImage: {
        "hero-dark": "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.22), transparent 34%), radial-gradient(circle at 80% 0%, rgba(34, 211, 238, 0.12), transparent 26%), linear-gradient(145deg, rgba(9, 9, 11, 0.98), rgba(17, 17, 24, 0.96))",
        "hero-light": "radial-gradient(circle at 15% 15%, rgba(14, 165, 233, 0.18), transparent 28%), radial-gradient(circle at 78% 12%, rgba(59, 130, 246, 0.12), transparent 24%), linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(241, 245, 249, 0.96))"
      }
    }
  },
  plugins: []
};
