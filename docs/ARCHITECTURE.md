# Project Architecture

## 📁 Folder Structure

```
src/
├── components/           # React components
│   ├── common/          # Reusable common components
│   ├── layout/          # Layout components (Sidebar, MainContent)
│   ├── sections/        # Page sections (About, Projects, etc.)
│   ├── ui/              # UI-specific components
│   └── index.js         # Component exports
├── config/              # Application configuration
│   └── app.js           # Main app config
├── data/                # Static data files (JSON)
│   ├── about.json
│   ├── projects.json
│   ├── experience.json
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useScrollSpy.js
│   └── useIntersectionObserver.js
├── lib/                 # Core business logic libraries
│   ├── api/             # API services
│   ├── constants/       # Application constants
│   ├── markdown/        # Markdown processing
│   └── index.js         # Library exports
├── styles/              # CSS and styling
│   ├── components/      # Component-specific styles
│   └── ...
└── utils/               # Utility functions (legacy)
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Pure UI/presentation logic
- **Lib**: Business logic and data processing
- **Config**: Application configuration
- **Data**: Static content and configuration

### 2. **Clean Imports**
```javascript
// ✅ Good - Clean imports via index files
import { Projects, About } from '../components';
import { fetchGitHubReadme, convertMarkdownToHtml } from '../lib';

// ❌ Avoid - Deep nested imports
import Projects from '../components/sections/Projects.jsx';
import { fetchGitHubReadme } from '../lib/api/github.js';
```

### 3. **Modular Design**
- Each feature is self-contained
- Clear dependencies between modules
- Easy to test and maintain

## 📚 Key Libraries

### `/lib/api/` - External API Services
- `github.js`: GitHub API integration
- Handles caching, rate limiting, error handling

### `/lib/markdown/` - Markdown Processing
- `converter.js`: Main markdown to HTML conversion
- `processor.js`: Inline markdown processing
- `icons.js`: Language-specific icons

### `/lib/constants/` - Application Constants
- `api.js`: API endpoints and configuration
- `markdown.js`: Markdown patterns and rules

## 🔄 Data Flow

```
User Interaction → Component → API Service → Markdown Processor → UI Update
                     ↓              ↓              ↓
                 State Update → Cache → HTML → Render
```

## 🚀 Component Hierarchy

```
App
├── MouseFollower (common)
└── main
    ├── Sidebar (layout)
    │   ├── Navigation
    │   ├── About (section)
    │   └── Contact (section)
    └── MainContent (layout)
        ├── Experience (section)
        └── Projects (section)
            ├── ProjectCard (ui) × N
            └── ProjectPopover (ui)
                └── README Content
```

## 📝 Styling Architecture

### CSS Organization
- `index.css`: Main styles, base, utilities
- `components/projectCards.css`: Project card specific styles
- `components/readme.css`: README content styling

### Design System
- **Colors**: Slate palette with teal accents
- **Typography**: Inter font family with Fira Code for code
- **Spacing**: Tailwind CSS utilities
- **Components**: Compact, modern design

## 🔧 Configuration

### App Configuration (`/config/app.js`)
- Feature flags
- UI settings
- External service configuration
- Environment-specific settings

## 🧪 Testing Strategy

### Unit Tests
- Test utility functions in `/lib/`
- Test component logic
- Test markdown conversion

### Integration Tests
- Test API services
- Test component interactions
- Test data flow

## 🚀 Performance Optimizations

### Caching
- GitHub API responses cached (5 min TTL)
- Markdown processing results cached
- Component-level memoization where needed

### Code Splitting
- Lazy loading of heavy components
- Dynamic imports for markdown processing
- Optimized bundle sizes

## 📈 Future Enhancements

### Planned Improvements
1. **TypeScript Migration**: Add type safety
2. **Testing Suite**: Comprehensive test coverage
3. **Internationalization**: Multi-language support
4. **Performance Monitoring**: Analytics and metrics
5. **Accessibility**: WCAG compliance improvements