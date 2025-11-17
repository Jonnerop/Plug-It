# Plug It

Plug It is a web application developed as part of a Web Development course at Metropolia University of Applied Sciences. The app helps electric vehicle (EV) users locate charging stations across Finland with real-time data and an interactive map. The project emphasizes usability, secure authentication, and mobile responsiveness.

---

## Features

- **EV Charging Station Locator**: Fetches live station data using the Open Charge Map API.  
- **Interactive Map**: Displays charging stations dynamically with detailed information, using Leaflet.  
- **Secure Authentication**: Implements JWT-based login and signup, along with Google OAuth integration.  
- **Responsive Design**: Built with Tailwind CSS for seamless use across devices.  
- **Station Reviews and Favorites**: Allows users to review stations and save favorites for quick access.  
- **Contact Form**: Enables user inquiries and feedback directly through the app.  

---

## Technical Specifications

- **Frontend**: React with React Router DOM for seamless navigation.  
- **Backend**: Express.js with Node.js for REST API implementation.  
- **Database**: MongoDB for storing user data, reviews, and favorites.  
- **Authentication**: JWT for secure user sessions and Google OAuth for easy login.  
- **Mapping**: Leaflet and React-Leaflet for interactive maps and geolocation.  
- **Styling**: Tailwind CSS for responsive design.  
- **Hosting**: Render (Frontend and Backend).  

---

## Components

- React Frontend  
- Express.js Backend  
- MongoDB Database  
- Open Charge Map API Integration  

---

## Getting Started

### Prerequisites

- Node.js and npm installed.  
- MongoDB database set up.  
- API keys for Open Charge Map and Mapbox.  
- Google OAuth credentials.  

### Setup

1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/your-repo/plug-it.git  
   cd plug-it  
   ```  

2. **Install Dependencies**:  
   Navigate to both the frontend and backend directories and run:  
   ```bash  
   npm install  
   ```  

3. **Set Up Environment Variables**:  
   - Create a `.env` file in both the frontend and backend directories.  
   - Add necessary credentials such as API keys, MongoDB URI, and JWT secret.  

4. **Run the Application**:  
   - Start the backend server:  
     ```bash  
     npm run dev  
     ```  
   - Start the frontend development server:  
     ```bash  
     npm start  
     ```  

---

## Usage

1. **Search for Charging Stations**: Use the interactive map to locate stations based on current location or search queries.  
2. **Save Favorites**: Mark stations for quick access later.  
3. **Submit Reviews**: Add feedback for charging stations.  
4. **Contact Support**: Use the built-in contact form for inquiries.  

---

## Troubleshooting

- **API Errors**: Ensure the Open Charge Map and Mapbox API keys are valid and configured.  
- **Authentication Issues**: Check Google OAuth credentials and ensure proper redirection URIs are set.  
- **Database Connection**: Verify MongoDB URI and ensure the database server is running.  

---

## Future Enhancements

- Add support for international charging station data.  
- Implement advanced filtering options (e.g., connector types, charging speeds).  
- Enable real-time station availability updates.   

---

## Contributors

- Ade Aiho
- Heta Hartzell
- Mika Laakkonen
- Jonne Roponen  

---
