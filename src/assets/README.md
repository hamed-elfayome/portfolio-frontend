# Assets Directory

This directory contains static assets for the portfolio website.

## Directory Structure

```
src/assets/
├── images/
│   └── avatar.png          # Your profile avatar image
└── README.md              # This file
```

## Avatar Image

### File: `images/avatar.png`

- **Purpose**: Your profile picture displayed in the sidebar
- **Format**: PNG (recommended for transparency support)
- **Size**: 200x200px or 300x300px (will be resized to 96x96px in the UI)
- **Background**: Transparent or solid color
- **Style**: Professional headshot or avatar

### How to Update:

1. Replace the `avatar.png` file with your actual image
2. Keep the same filename: `avatar.png`
3. The image will automatically appear in the sidebar

### CSS Classes Applied:

- `w-24 h-24` - 96x96px size
- `rounded-full` - Circular shape
- `border-2 border-slate-600` - Dark border
- `hover:border-primary` - Teal border on hover
- `object-cover` - Maintains aspect ratio
- `transition-colors duration-300` - Smooth hover effect

## Adding More Assets

You can add more images, icons, or other assets to this directory as needed:

- **Icons**: SVG or PNG format
- **Images**: JPG, PNG, or WebP format
- **Documents**: PDF files for resumes, etc.

## Import Usage

To use assets in components:

```javascript
import imageName from '../../assets/images/filename.png';
```

Then use in JSX:

```jsx
<img src={imageName} alt="Description" />
```
