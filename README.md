# Younus Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a beautiful dark theme with gradient effects, smooth animations, and a functional contact form.

## 🚀 Features

- **Modern Design**: Clean, professional design with glassmorphism effects
- **Fully Responsive**: Optimized for all device sizes from mobile to desktop
- **Dark Theme**: Beautiful dark theme with gradient backgrounds and animations
- **Interactive Elements**: Smooth scroll animations, hover effects, and transitions
- **Contact Form**: Functional contact form using EmailJS
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Performance Optimized**: Fast loading with Next.js optimization features
- **Type Safe**: Built with TypeScript for better development experience
- **Security Enhanced**: Security headers and CSP implemented

## 🛠️ Technologies Used

- **Frontend Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting


## � Project Structure

```
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Home page
├── components/
│   └── AllComponents.tsx   # All React components
├── lib/
│   ├── emailjs.ts         # Email service configuration
│   └── emailjs-backup.ts  # Backup email configuration
├── public/
│   ├── assets/
│   │   └── Logo.jpg       # Profile image
│   └── YounusResume.pdf   # Resume file
├── types/
│   └── lucide-react.d.ts  # TypeScript declarations
├── middleware.ts          # Security middleware
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- EmailJS account (for contact form)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your EmailJS credentials:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## � Setting Up EmailJS

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{timestamp}}` - Timestamp
4. Get your Service ID, Template ID, and Public Key
5. Add them to your `.env.local` file

## 🎨 Customization

### Personal Information
Edit the content in `components/AllComponents.tsx`:
- Update personal details in the Hero section
- Modify the About section content
- Update skills, projects, and experience
- Change social media links
- Update contact information

### Styling
- Colors and gradients: `tailwind.config.js`
- Animations: `app/globals.css`
- Component styling: Tailwind classes in components

### Images
- Replace `public/assets/Logo.jpg` with your profile picture
- Update `public/YounusResume.pdf` with your resume
- Add project images to the public folder

## 🔒 Security Features

- **Content Security Policy**: Prevents XSS attacks
- **Security Headers**: Various security headers implemented
- **Input Validation**: Form inputs are validated and sanitized
- **Environment Variables**: Sensitive data stored securely
- **HTTPS Ready**: Configured for secure deployment

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+
- Large screens: 1600px+

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)
3. Add environment variables in Netlify dashboard

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript check
- `npm run audit` - Check for vulnerabilities
- `npm run update-browserslist` - Update browser list

## 📊 Performance

- **Lighthouse Score**: 90+ on all metrics
- **Core Web Vitals**: Optimized for best user experience
- **Bundle Size**: Minimal JavaScript bundle
- **Loading Speed**: Optimized images and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Contact

- **Email**: sayeedataj37@gmail.com
- **LinkedIn**: [linkedin.com/in/younus4webdev](https://www.linkedin.com/in/younus4webdev/)
- **GitHub**: [github.com/Younus-younus](https://github.com/Younus-younus)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [EmailJS](https://www.emailjs.com/) for the email service

---

**⭐ If you found this project helpful, please give it a star!**

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
