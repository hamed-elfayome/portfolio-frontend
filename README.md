# Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, inspired by Brittany Chiang's design.

## Features

- **Responsive Design** - Optimized for all screen sizes
- **Modern UI** - Clean, professional design with smooth animations
- **Interactive Elements** - Hover effects, scroll spy navigation, and mouse follower
- **Performance Optimized** - Fast loading with Vite build system
- **Accessible** - Built with accessibility best practices

## Tech Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Left sidebar navigation
│   │   └── MainContent.jsx      # Main content area
│   ├── sections/
│   │   ├── About.jsx            # About section
│   │   ├── Experience.jsx       # Work experience
│   │   ├── Projects.jsx         # Featured projects
│   │   └── Contact.jsx          # Contact information
│   └── ui/
│       ├── HighlightedText.jsx  # Text highlighting component
│       └── MouseFollower.jsx    # Mouse cursor effect
├── data/
│   ├── about.json               # About section content
│   ├── contact.json             # Contact information
│   ├── experience.json          # Work experience data
│   ├── navigation.json          # Navigation links
│   ├── personalInfo.json        # Personal information
│   ├── projects.json            # Projects data
│   └── socialLinks.json         # Social media links
├── hooks/
│   ├── useIntersectionObserver.js # Scroll animations
│   └── useScrollSpy.js          # Navigation highlighting
├── styles/
│   └── projectCards.css         # Custom project card styles
└── utils/
    └── helpers.js               # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Customization

### Content Updates

All content is stored in JSON files in the `src/data/` directory:

- **Personal Info**: Update `personalInfo.json` for name, title, and tagline
- **About Section**: Modify `about.json` for about content and highlighted words
- **Experience**: Edit `experience.json` for work history
- **Projects**: Update `projects.json` for featured projects
- **Contact**: Modify `contact.json` for contact information
- **Social Links**: Update `socialLinks.json` for social media links

### Styling

- **Colors**: Customize colors in `tailwind.config.js`
- **Fonts**: Update font imports in `src/index.css`
- **Custom Styles**: Add custom CSS in `src/styles/` directory

### Assets

- **Avatar**: Replace `src/assets/images/avatar.png` with your photo
- **Favicon**: Update favicon files in `public/` directory

## Deployment

The project is ready for deployment to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment
- **AWS S3**: Upload the `dist/` folder contents

## Performance

- **Bundle Size**: ~218KB JavaScript, ~20KB CSS
- **Total Size**: ~1.3MB (including avatar image)
- **Lighthouse Score**: Optimized for 90+ scores

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Design inspiration from [Brittany Chiang's portfolio](https://brittanychiang.com/)
- Icons from Heroicons
- Fonts from Google Fonts