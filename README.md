# Birthday Celebration Website 🎂

A modern, interactive birthday celebration website built with Next.js and Tailwind CSS.

## Features

- 🎂 Beautiful welcome landing page with animated elements
- 🖼️ Photo gallery with lightbox effect
- 🎥 Embedded birthday wishes video section
- 📜 Animated birthday message
- 📅 Countdown timer until the birthday
- 💬 Guestbook for visitors to leave messages
- 🌙 Light/Dark mode toggle
- 🎶 Background birthday music
- 📱 Fully responsive design
- 🎨 Beautiful animations with Framer Motion

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the following in the code:
   - Set your birthday date in `src/app/page.tsx`
   - Add your photos in the `public/images` directory
   - Update photo paths in `src/app/page.tsx`
   - Add your birthday music in `public/music`
   - Update the YouTube video ID in `src/app/page.tsx`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Player](https://github.com/CookPete/react-player)
- [use-sound](https://github.com/joshwcomeau/use-sound)

## Customization

- Update the color scheme in `tailwind.config.js`
- Modify animations in individual components
- Add or remove sections in `src/app/page.tsx`
- Customize the birthday message
- Add more interactive elements

## License

MIT 