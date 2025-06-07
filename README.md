# RasaKata - Emotion Detection and Management App

RasaKata is a web application that helps users detect, track, and manage their emotions using AI technology. The application allows users to share their feelings anonymously, receive emotion analysis, and track their emotional patterns over time.

## Features

- **Emotion Detection**: AI-powered analysis of text to identify emotional states
- **Emotion Tracking**: Monitor and visualize your emotional patterns
- **Anonymous Forum**: Share your thoughts with others in a safe, anonymous environment
- **Personalized Feedback**: Receive video recommendations based on your emotional state
- **Responsive Design**: Works on both desktop and mobile devices

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Git

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rasa-kata.git
   cd rasa-kata
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a configuration file for the API endpoint:
   
   Create a file named `axios.js` in the `src/utils` directory:
   ```javascript
   import axios from "axios";
   import authService from "../services/authService";

   // Create axios instance
   const axiosInstance = axios.create({
     baseURL: "https://rasa-kata-7ca6a75a895b.herokuapp.com/api",
     headers: {
       "Content-Type": "application/json",
     },
   });

   // Add a request interceptor to include auth token
   axiosInstance.interceptors.request.use(
     (config) => {
       const token = authService.getToken();
       if (token) {
         config.headers.Authorization = `Bearer ${token}`;
       }
       return config;
     },
     (error) => {
       return Promise.reject(error);
     }
   );

   export default axiosInstance;
   ```

4. Create a utilities file for time formatting:

   Create a file named `timeUtils.js` in the `src/utils` directory:
   ```javascript
   /**
    * Converts an ISO date string to a relative time description in Indonesian
    * @param {string} isoString - ISO date string to convert
    * @returns {string} Human-readable relative time in Indonesian (e.g. "2 jam yang lalu")
    */
   export const formatRelativeTime = (isoString) => {
     if (!isoString) return '';
     
     const date = new Date(isoString);
     const now = new Date();
     
     // Calculate time difference in seconds
     const secondsDiff = Math.floor((now - date) / 1000);
     
     // Less than a minute
     if (secondsDiff < 60) {
       return 'baru saja';
     }
     
     // Minutes
     const minutesDiff = Math.floor(secondsDiff / 60);
     if (minutesDiff < 60) {
       return `${minutesDiff} menit yang lalu`;
     }
     
     // Hours
     const hoursDiff = Math.floor(minutesDiff / 60);
     if (hoursDiff < 24) {
       return `${hoursDiff} jam yang lalu`;
     }
     
     // Days
     const daysDiff = Math.floor(hoursDiff / 24);
     if (daysDiff < 7) {
       return `${daysDiff} hari yang lalu`;
     }
     
     // Weeks
     const weeksDiff = Math.floor(daysDiff / 7);
     if (weeksDiff < 4) {
       return `${weeksDiff} minggu yang lalu`;
     }
     
     // Months
     const monthsDiff = Math.floor(daysDiff / 30);
     if (monthsDiff < 12) {
       return `${monthsDiff} bulan yang lalu`;
     }
     
     // Years
     const yearsDiff = Math.floor(daysDiff / 365);
     return `${yearsDiff} tahun yang lalu`;
   };

   /**
    * Formats an ISO date string to Indonesian date format
    * @param {string} isoString - ISO date string to convert
    * @param {boolean} includeTime - Whether to include the time in the result
    * @returns {string} Formatted date string (e.g. "12 Mei 2025")
    */
   export const formatDate = (isoString, includeTime = false) => {
     if (!isoString) return '';
     
     const date = new Date(isoString);
     
     const day = date.getDate();
     const monthNames = [
       'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
     ];
     const month = monthNames[date.getMonth()];
     const year = date.getFullYear();
     
     let result = `${day} ${month} ${year}`;
     
     if (includeTime) {
       const hours = String(date.getHours()).padStart(2, '0');
       const minutes = String(date.getMinutes()).padStart(2, '0');
       result += ` ${hours}:${minutes}`;
     }
     
     return result;
   };

   /**
    * Returns either a relative time or a formatted date depending on how recent the date is
    * @param {string} isoString - ISO date string to convert
    * @returns {string} Either relative time or formatted date string
    */
   export const smartDateFormat = (isoString) => {
     if (!isoString) return '';
     
     const date = new Date(isoString);
     const now = new Date();
     const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
     
     // If less than 7 days ago, show relative time
     if (daysDiff < 7) {
       return formatRelativeTime(isoString);
     }
     
     // Otherwise, show the formatted date
     return formatDate(isoString);
   };

   export default {
     formatRelativeTime,
     formatDate,
     smartDateFormat
   };
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

This will start the application on [http://localhost:3307](http://localhost:3307)

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `dist` directory, which can be deployed to any static hosting service.

## Project Structure

```
src/
├── App.jsx               # Main application component
├── main.jsx             # Entry point of the application
├── assets/              # Static assets (images, icons, styles)
│   ├── icons/
│   ├── img/
│   └── styles/          # CSS files
├── components/          # Reusable UI components
│   ├── Circles.jsx
│   ├── Loading.jsx
│   ├── Logo.jsx
│   └── Sidebar.jsx
├── contexts/            # React context providers
│   └── AuthContext.jsx
├── pages/               # Application pages
│   ├── Curhat.jsx
│   ├── Curhat_hasil.jsx
│   ├── Dashboard.jsx
│   ├── Feed.jsx
│   ├── feedDetail.jsx
│   ├── Layout.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   └── landing-page/
│       └── Landing_page.jsx
├── services/            # API service modules
│   ├── authService.js
│   ├── emotionService.js
│   └── postService.js
└── utils/               # Utility functions
    ├── axios.js
    └── timeUtils.js
```

## Authentication System

The application uses JWT (JSON Web Token) for authentication. The authentication flow is managed through `AuthContext.jsx` and `authService.js`.

## Progressive Web App Features

This application is configured as a Progressive Web App (PWA) using Vite PWA Plugin. This enables features like offline support, installability, and caching strategies.

## API Integration

The application communicates with a backend API for:
- User authentication
- Emotion analysis
- Post and comment management
- User profile management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [AOS](https://michalsnik.github.io/aos/)