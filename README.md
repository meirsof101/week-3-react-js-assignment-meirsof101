# ReactApp - Week 3 React.js Assignment

A modern, responsive React application built with Vite, featuring dynamic theme switching, enhanced navigation, and clean component architecture.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Dark/Light Theme**: Seamless theme switching with persistent state
- **Enhanced Navigation**: Responsive navbar with mobile-friendly hamburger menu
- **Component Architecture**: Well-structured, reusable React components
- **Fast Development**: Powered by Vite for lightning-fast builds and HMR
- **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks and functional components
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features
- **Context API** - State management for theme switching
- **CSS3** - Custom styling and animations

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/week-3-react-js-assignment-meirsof101.git
cd week-3-react-js-assignment-meirsof101
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation component
│   └── StyledComponents.jsx    # Enhanced UI components
├── context/
│   └── themecontext.jsx       # Theme context provider
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles and Tailwind imports
```

## 🎨 Theme System

The application features a comprehensive theme system built with React Context:

### Theme Context (`themecontext.jsx`)
- Manages global theme state (light/dark mode)
- Provides theme toggle functionality
- Persists theme preference

### Usage
```jsx
import { useTheme } from './context/themecontext';

const MyComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

## 🧩 Components

### Enhanced Navbar
- **Responsive Design**: Desktop and mobile-optimized layouts
- **Theme Integration**: Built-in theme switcher
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation

### Styled Components
- **Modular Design**: Reusable UI components
- **Theme Aware**: Automatically adapts to current theme
- **Customizable**: Easy to modify and extend

## 🎯 Key Features Breakdown

### 1. Responsive Navigation
- **Desktop**: Full horizontal navigation with theme toggle
- **Mobile**: Collapsible hamburger menu
- **Smooth Transitions**: Animated menu toggle with rotating icon

### 2. Theme Switching
- **Instant Updates**: Real-time theme changes across all components
- **Tailwind Integration**: Uses Tailwind's dark mode classes
- **Visual Feedback**: Theme toggle button shows current state

### 3. Modern Design
- **Glassmorphism**: Backdrop blur effects on navigation
- **Gradient Accents**: Beautiful gradient text and backgrounds
- **Consistent Spacing**: Well-structured layout with proper spacing

## 🚀 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔧 Configuration

### Tailwind CSS Configuration
The project uses Tailwind CSS with dark mode support:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Vite Configuration
Optimized Vite setup for React development with fast refresh and optimized builds.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Styling Approach

- **Utility-First**: Tailwind CSS for rapid development
- **Component-Scoped**: Styled components for complex interactions
- **Theme Variables**: CSS custom properties for theme consistency
- **Modern Effects**: Backdrop blur, gradients, and smooth transitions

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance

- **Fast Builds**: Vite's esbuild for lightning-fast compilation
- **Hot Module Replacement**: Instant updates during development
- **Optimized Bundle**: Tree-shaking and minification for production
- **Lazy Loading**: Component-based code splitting ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Guidelines

- Use functional components with hooks
- Follow React best practices
- Maintain consistent code formatting
- Write descriptive commit messages
- Test responsive design on multiple devices

## 🐛 Known Issues

- Theme persistence needs localStorage implementation
- Mobile menu may need additional accessibility improvements
- Some animations could be optimized for performance

## 🔮 Future Enhancements

- [ ] Add routing with React Router
- [ ] Implement localStorage for theme persistence
- [ ] Add more theme options (system preference detection)
- [ ] Include unit tests with Jest/React Testing Library
- [ ] Add internationalization support
- [ ] Implement PWA features

## 📄 License

This project is part of the PLP Academy React.js curriculum and is intended for educational purposes.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/meirsof101)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/fidelmwaro)

## 🙏 Acknowledgments

- PLP Academy for the comprehensive React.js curriculum
- Tailwind CSS team for the amazing utility framework
- Vite team for the excellent build tool
- React community for continuous inspiration

---

## 📞 Support

If you have any questions or run into issues, please:
1. Check the [Issues](https://github.com/YOUR_USERNAME/week-3-react-js-assignment-meirsof101/issues) page
2. Create a new issue with detailed description
3. Contact the development team

**Happy Coding! 🚀**