# NACUBO Student Success Hub - Website

A responsive website built based on the NACUBO Student Success Hub layout, featuring a modern design with multiple pages and interactive components.

## Pages Included

### 1. **index.html** - Home Page
The main landing page featuring:
- Hero section with call-to-action buttons
- Featured highlights section
- About the Hub section
- Statistics showcase (11+ toolkits, 900+ institutions, 2,200+ users)
- Testimonials section
- Explore, Plan & Act, Measure framework
- Funding partners section
- Professional footer

### 2. **login.html** - Login Page
User authentication page with:
- Email and password login form
- Remember me functionality
- Social login options (Google, Microsoft)
- Forgot password link
- Links to signup page
- Responsive side panel with benefits

### 3. **signup.html** - Sign Up Page
New user registration page featuring:
- First name and last name fields
- Email, institution, and role selection
- Password validation
- Terms and privacy policy agreement
- Newsletter signup option
- Social signup options
- Responsive side panel with community benefits

## Features

- **Fully Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern CSS Grid & Flexbox Layout** - Clean, organized structure
- **Interactive Components** - Smooth scrolling, hover effects, and animations
- **Intersection Observer** - Fade-in animations for cards and sections
- **Form Validation** - Client-side validation for login and signup forms
- **Accessibility** - Semantic HTML and proper ARIA attributes
- **Mobile-Optimized Navigation** - Responsive header and navigation menu
- **Professional Styling** - Consistent color scheme and typography

## File Structure

```
sswebsite/
├── index.html           # Main landing page
├── login.html           # Login page
├── signup.html          # Sign up page
├── styles.css           # Main stylesheet
├── script.js            # JavaScript functionality
└── assets/              # Image assets (placeholder references)
    ├── logo.png
    ├── hero-image.png
    ├── about-image.png
    ├── icon-toolkit.png
    ├── icon-trending.png
    ├── icon-update.png
    ├── framework-assess.png
    ├── framework-plan.png
    ├── framework-implement.png
    ├── framework-measure.png
    ├── partner-logo-1.png
    ├── partner-logo-2.png
    └── partner-logo-3.png
```

## Getting Started

1. **Create Assets Folder**
   ```bash
   mkdir assets
   ```

2. **Add Images**
   - Add the required images to the `assets/` folder
   - Image references are placeholders and can be replaced with actual logo/image files

3. **Open in Browser**
   - Simply open `index.html` in a web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```

4. **Navigation**
   - Home page: `http://localhost:8000/index.html`
   - Login page: `http://localhost:8000/login.html`
   - Sign up page: `http://localhost:8000/signup.html`

## Color Scheme

- **Primary Color**: `#004b87` (Dark Blue)
- **Secondary Color**: `#00a3e0` (Light Blue)
- **Accent Color**: `#f18200` (Orange)
- **Text Color**: `#333` (Dark Gray)
- **Light Background**: `#f5f5f5` (Light Gray)
- **Border Color**: `#ddd` (Light Gray)

## JavaScript Features

- Smooth scroll navigation for anchor links
- Dynamic header shadow on scroll
- Intersection Observer for fade-in animations
- Ripple effect on button clicks
- Form handling and validation
- Social button interactions (placeholder functionality)

## Customization

### Update Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #004b87;
    --secondary-color: #00a3e0;
    --accent-color: #f18200;
    /* ... other variables ... */
}
```

### Add Content
- Update text content directly in HTML files
- Replace image paths in the `src` attributes
- Modify form fields as needed

### Modify Layout
- Adjust grid and flexbox properties in `styles.css`
- Customize breakpoints for responsive design
- Update padding and margin variables

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration for login/signup
- Dynamic content loading
- Database integration
- User dashboard
- Admin panel
- Advanced search functionality
- Email verification
- Two-factor authentication

## Notes

- All image references in the HTML are placeholder paths
- Form submissions currently show alerts instead of sending data
- Social login buttons are non-functional and require backend integration
- Password validation is client-side only

## License

© 2026 National Association of College and University Business Officers (NACUBO)

---

**Built with**: HTML5, CSS3, JavaScript (Vanilla)
