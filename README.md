# API-Driven Portfolio Template

A modern, responsive portfolio template built with Next.js that can be populated with LinkedIn profile data via API requests. Perfect for creating dynamic portfolios that can be updated remotely by external services or applications.

## ✨ Features

- **API-Driven Content**: Populate portfolio data via REST API
- **Modern Design**: Clean, professional, and responsive UI
- **TypeScript**: Full type safety and better development experience
- **Server-Side Rendering**: SEO-optimized with Next.js
- **Tailwind CSS**: Beautiful styling with utility-first CSS
- **Component-Based**: Modular React components for easy customization
- **Data Validation**: Robust input validation for API requests
- **Easy Deployment**: Ready for Vercel deployment

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd portfolio-template
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 3. Submit Portfolio Data

Send a POST request to `/api/portfolio` with your data:

```bash
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d @sample-data.json
```

## 📊 Data Structure

The portfolio expects data in the following format:

### Personal Info (Required)
```json
{
  "personalInfo": {
    "name": "John Doe",                    // Required
    "title": "Full Stack Developer",      // Required
    "location": "San Francisco, CA",      // Optional
    "email": "john@example.com",          // Optional
    "phone": "+1 (555) 123-4567",         // Optional
    "website": "https://johndoe.dev",     // Optional
    "linkedin": "https://linkedin.com/in/johndoe", // Optional
    "github": "https://github.com/johndoe",        // Optional
    "summary": "Brief professional summary...",     // Optional
    "profileImage": "https://example.com/photo.jpg" // Optional
  }
}
```

### Experience (Required Array)
```json
{
  "experience": [
    {
      "id": "unique-id",                   // Required
      "company": "Company Name",           // Required
      "position": "Job Title",             // Required
      "startDate": "2022-01-15",          // Required (YYYY-MM-DD)
      "endDate": "2023-12-31",            // Optional (null for current)
      "description": "Job description",    // Optional
      "location": "City, State",          // Optional
      "isCurrentPosition": false,          // Optional
      "skills": ["React", "Node.js"]      // Optional array
    }
  ]
}
```

### Skills (Required Array)
```json
{
  "skills": [
    {
      "name": "React",                     // Required
      "level": "Expert",                   // Optional: Beginner|Intermediate|Advanced|Expert
      "category": "Frontend",              // Optional
      "endorsements": 25                   // Optional number
    }
  ]
}
```

### Projects (Required Array)
```json
{
  "projects": [
    {
      "id": "unique-id",                   // Required
      "name": "Project Name",              // Required
      "description": "Project description", // Required
      "technologies": ["React", "Node.js"], // Optional array
      "startDate": "2023-01-01",          // Optional
      "endDate": "2023-03-15",            // Optional
      "url": "https://project-demo.com",   // Optional
      "githubUrl": "https://github.com/user/repo", // Optional
      "imageUrl": "https://example.com/image.jpg",  // Optional
      "featured": true                     // Optional boolean
    }
  ]
}
```

### Education (Required Array)
```json
{
  "education": [
    {
      "id": "unique-id",                   // Required
      "institution": "University Name",    // Required
      "degree": "Bachelor of Science",     // Required
      "field": "Computer Science",         // Optional
      "startDate": "2016-08-01",          // Required
      "endDate": "2020-05-15",            // Optional
      "description": "Relevant coursework...", // Optional
      "gpa": "3.8",                       // Optional
      "location": "City, State"           // Optional
    }
  ]
}
```

## 🔌 API Endpoints

### GET `/api/portfolio`
Retrieve current portfolio data.

**Response:**
```json
{
  "success": true,
  "message": "Portfolio data retrieved successfully",
  "data": { /* portfolio data */ }
}
```

### POST `/api/portfolio`
Submit/update portfolio data.

**Request Body:** Complete portfolio data object

**Response:**
```json
{
  "success": true,
  "message": "Portfolio data updated successfully",
  "data": { /* updated portfolio data */ }
}
```

## 🔧 Customization

### Styling
The portfolio uses Tailwind CSS. Modify styles in component files:
- `src/components/Hero.tsx` - Header section
- `src/components/Experience.tsx` - Work experience
- `src/components/Skills.tsx` - Skills display
- `src/components/Projects.tsx` - Projects showcase
- `src/components/Education.tsx` - Education background

### Colors & Theme
Update the color scheme by modifying Tailwind classes:
- Primary: `indigo-600` (used throughout)
- Secondary: `gray-900` (text and accents)
- Background: `gray-50` (sections)

### Layout
Components are automatically included in the main page (`src/app/page.tsx`). Remove or reorder sections as needed.

## 📱 Portfolio Sections

1. **Hero Section**: Name, title, summary, and contact links
2. **Experience**: Work history in timeline format
3. **Skills**: Categorized skills with proficiency levels
4. **Projects**: Featured and regular projects with links
5. **Education**: Academic background
6. **Footer**: Contact information and last updated date

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Manual Deployment

```bash
npm run build
npm start
```

## 🛠️ Development

### Project Structure
```
src/
├── app/
│   ├── api/portfolio/route.ts    # API endpoints
│   ├── page.tsx                  # Main portfolio page
│   └── layout.tsx               # App layout
├── components/                   # React components
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   └── Education.tsx
├── types/
│   └── portfolio.ts             # TypeScript interfaces
└── lib/
    └── portfolio.ts             # Utility functions
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Add corresponding TypeScript interfaces in `src/types/portfolio.ts`
3. Update the API validation in `src/app/api/portfolio/route.ts`
4. Include the component in `src/app/page.tsx`

## 🤝 Integration Examples

### LinkedIn Scraper Integration
```javascript
// Example: Send scraped LinkedIn data
const portfolioData = await scrapeLinkedInProfile(profileUrl);
await fetch('https://your-portfolio.vercel.app/api/portfolio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(portfolioData)
});
```

### Webhook Integration
```javascript
// Example: Update portfolio from webhook
app.post('/linkedin-update', async (req, res) => {
  const transformedData = transformLinkedInData(req.body);
  await updatePortfolio(transformedData);
  res.json({ success: true });
});
```

## 📝 Sample Data

See `sample-data.json` for a complete example of the expected data format.

## 🐛 Troubleshooting

### Common Issues

1. **Data not displaying**: Check browser console for validation errors
2. **API request fails**: Ensure data format matches the required structure
3. **Images not loading**: Verify image URLs are accessible and valid

### Validation Errors
The API validates required fields:
- `personalInfo.name` and `personalInfo.title` are required
- All main arrays (`experience`, `education`, `skills`, `projects`) are required
- Each item in arrays must have required fields (e.g., `id`, `name`)

## 📄 License

MIT License - feel free to use this template for personal or commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
