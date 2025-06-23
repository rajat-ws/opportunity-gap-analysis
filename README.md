# Opportunity Gap Analysis Tool

A modern React application that helps businesses analyze market opportunities by providing comprehensive competitor analysis, customer segmentation, and feature prioritization.

## 🚀 Features

- **Market Analysis**: Analyze your market segment and identify opportunities
- **Competitor Landscape**: Comprehensive competitor analysis and comparison
- **Customer Segmentation**: Identify and understand your target customer segments
- **Unmet Needs Analysis**: Discover and rank unmet customer needs
- **Feature Prioritization**: Prioritize features based on market demand
- **Real-time Processing**: Live analysis with progress tracking
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query + Custom Hooks
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **UI Components**: Radix UI primitives

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd opportunity-gap-analysis
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   VITE_API_BASE_URL=https://n8n.wednesday.is/webhook
   VITE_ENABLE_ANALYTICS=false
   VITE_ENABLE_ERROR_REPORTING=false
   VITE_DEBUG_MODE=false
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🏗 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── ...             # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── pages/              # Page components
└── main.tsx           # Application entry point
```

### Key Components

- **MarketOpportunityForm**: Main form for collecting analysis parameters
- **AnalysisScreen**: Real-time analysis progress and results display
- **useOpportunityGapAnalysis**: Custom hook for analysis state management
- **ApiService**: Centralized API communication with retry logic

## 🔧 Configuration

The application uses a centralized configuration system in `src/lib/config.ts`:

- **API Settings**: Base URL, timeouts, retry attempts
- **Feature Flags**: Analytics, error reporting, debug mode
- **Validation Rules**: Field lengths, regex patterns
- **UI Settings**: Animation durations, intervals

## 📊 Analytics & Monitoring

The app includes built-in analytics and performance monitoring:

- **Event Tracking**: Form interactions, API calls, errors
- **Performance Monitoring**: Page load times, API response times
- **Error Reporting**: Automatic error capture and reporting
- **Debug Mode**: Enhanced logging for development

## 🚀 Deployment

### Using Lovable

1. Open [Lovable](https://lovable.dev/projects/a20e2c9e-07ce-4f05-a9f5-225f08c646c8)
2. Click Share → Publish

### Manual Deployment

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables for production

### Custom Domain

To connect a custom domain:

1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the DNS configuration instructions

## 🧪 Testing

The application includes:

- **Error Boundaries**: Graceful error handling
- **Form Validation**: Client-side and server-side validation
- **API Error Handling**: Retry logic and timeout management
- **Performance Optimization**: Code splitting and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Check the [Lovable documentation](https://docs.lovable.dev)
- Open an issue in the repository
- Contact the development team

---

Built with ❤️ using modern web technologies
