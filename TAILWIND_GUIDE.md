# Tailwind CSS Setup Guide

## ✅ Installation Complete

Your React portfolio project now has Tailwind CSS fully configured and ready to use!

## 🎨 Custom Theme Colors

The following custom colors are available in your Tailwind configuration:

```css
primary: '#64ffda'      /* Green accent color */
secondary: '#0a192f'    /* Dark blue background */
accent: '#112240'       /* Lighter blue for cards */
text: '#ccd6f6'         /* Light text color */
textSecondary: '#8892b0' /* Secondary text */
dark: '#020c1b'         /* Darker background */
```

## 🧩 Custom Component Classes

### Buttons
```jsx
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-ghost">Ghost Button</button>
```

### Typography
```jsx
<h1 className="heading-1">Main Heading</h1>
<h2 className="heading-2">Section Heading</h2>
<h3 className="heading-3">Subsection Heading</h3>
<p className="body-text">Body text with proper styling</p>
<span className="text-gradient">Gradient text effect</span>
```

### Layout
```jsx
<div className="section">Section with proper spacing</div>
<div className="container-custom">Max-width container</div>
<div className="card">Card with hover effects</div>
```

### Navigation
```jsx
<a href="#" className="nav-link">Navigation link</a>
<a href="#" className="nav-link active">Active nav link</a>
```

### Timeline
```jsx
<div className="timeline-item">
  <h3>Timeline Item</h3>
  <p>Description</p>
</div>
```

### Social Links
```jsx
<a href="#" className="social-link">
  <svg>...</svg>
</a>
```

### Animations
```jsx
<div className="animate-fade-in">Fade in animation</div>
<div className="animate-slide-up">Slide up animation</div>
<div className="animate-slide-down">Slide down animation</div>
<div className="animate-slide-left">Slide left animation</div>
<div className="animate-slide-right">Slide right animation</div>
```

## 🚀 Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **View your portfolio:**
   Open [http://localhost:5173](http://localhost:5173) in your browser

3. **Customize the content:**
   Edit `src/App.jsx` to add your personal information

## 📁 File Structure

```
src/
├── components/
│   └── ExampleComponent.jsx    # Example showing custom classes
├── App.jsx                     # Main app with Tailwind demo
├── index.css                   # Tailwind directives + custom styles
└── main.jsx                    # App entry point
```

## 🎯 Next Steps

1. **Replace demo content** in `App.jsx` with your personal information
2. **Create individual components** for each section (Header, About, Experience, etc.)
3. **Add your project data** and images
4. **Customize colors** in `tailwind.config.js` if needed
5. **Add animations** using the custom animation classes

## 🛠️ Customization

### Adding New Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      yourColor: '#your-hex-code',
    }
  }
}
```

### Adding New Animations
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    animation: {
      'your-animation': 'yourKeyframe 1s ease-in-out',
    },
    keyframes: {
      yourKeyframe: {
        '0%': { /* start state */ },
        '100%': { /* end state */ },
      }
    }
  }
}
```

### Adding New Component Classes
Edit `src/index.css`:
```css
@layer components {
  .your-component {
    @apply bg-primary text-white px-4 py-2 rounded;
  }
}
```

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 🎨 Design System

The setup follows a consistent design system inspired by Brittany Chiang's portfolio:
- **Dark theme** with green accents
- **Clean typography** using Inter font
- **Smooth animations** and transitions
- **Glass morphism** effects
- **Accessible** color contrasts

## 🔧 Development Tips

1. **Use the custom classes** instead of writing custom CSS
2. **Leverage Tailwind's utility classes** for quick styling
3. **Use the component classes** for consistent styling
4. **Test on different screen sizes** using browser dev tools
5. **Keep animations subtle** and purposeful

Your Tailwind CSS setup is now ready for building a professional portfolio! 🎉
