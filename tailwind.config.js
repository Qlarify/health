/** Tailwind config — mirrors the old inline tailwind.config from index.html so
 *  every existing utility class (text-ink, bg-rust, border-border, etc.)
 *  continues to compile after the switch from Tailwind CDN to a pre-built
 *  tailwind.css static file.
 */
module.exports = {
  // Scan the SPA source (all routes live in index.html) plus the generated
  // dist/*.html files so classes added per-route by build.js get picked up.
  content: [
    './index.html',
    './dist/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        ink:           '#163460',
        'ink-light':   '#2c5f84',
        rust:          '#E8835F',
        'rust-dk':     '#d05a18',
        'rust-light':  '#f2a585',
        'rust-pale':   '#fdeee5',
        cream:         '#f5f5f5',
        'section-alt': '#e8eef3',
        border:        '#c8d8e4',
        success:       '#1f8a5b',
        crimson:       '#b43f3f',
        'crimson-pale':'#fbe8e8',
        'crimson-dk':  '#7e2525',
        gold:          '#b08a3e',
        'gold-pale':   '#f6eedc'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
