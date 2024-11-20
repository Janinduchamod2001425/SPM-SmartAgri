# SmartAgri 🌱
Optimizing Traditional Agriculture with Modern Technology

![SmartAgri Demo](./assets/SA.png)

## Overview
SmartAgri is a cutting-edge platform designed to revolutionize traditional agricultural practices in Sri Lanka. It integrates modern technology to address the challenges faced by farmers while promoting sustainable farming practices. By focusing on genetic engineering, efficient fertilizer usage, distribution systems, and pest management, SmartAgri empowers farmers to boost productivity, reduce costs, and make informed decisions.

## Features
1. Genetic Engineering System
- Genetic Trait Matching: Match crop traits with desired farming outcomes.
- Customized Plans: Generate tailored genetic engineering plans for specific crops and conditions.
- Benefits and Risks Analysis: Provide a comprehensive analysis of genetic modifications.
- Farmer-Friendly Guidance: Present information in an easy-to-understand format tailored to Sri Lankan farmers.
  
2. Rate-Based Fertilizer Recommender System
- Suggest optimal fertilizer rates based on soil conditions and crop needs.
- Reduce waste and promote cost-effective farming.

3. Optimized Fertilizer Distribution System
- Facilitate efficient fertilizer distribution across farming regions.
- Minimize delays and ensure equitable access to resources.

4. Pest and Disease Management System
- Detect pests and diseases using data-driven techniques.
- Recommend effective countermeasures and prevention strategies.

## Technologies Used
- Frontend: React (with Vite for improved performance).
- Backend: Node.js with Express.
- Database: MongoDB for storing and managing agricultural data.
  
# Why SmartAgri?
Traditional farming in Sri Lanka often struggles with inefficiency, lack of modern tools, and insufficient knowledge transfer. SmartAgri bridges the gap by offering a tech-enabled platform that:

- Empowers farmers with actionable insights.
- Reduces environmental impact through precision agriculture.
- Enhances crop yield and quality.

## Key Benefits
- Increased productivity and profitability for farmers.
- Sustainable use of agricultural resources.
- Simplified access to genetic engineering information.

## Env Variables
Rename the `.env.example` file to `.env` and add the following:

```env
NODE_ENV = development
PORT = 5000
MONGO_URI = mongodb+srv://janiduchamod25:spm@smartagri.6s0g6.mongodb.net/SmartAgri?retryWrites=true&w=majority&appName=SmartAgri
JWT_SECRET = 'abc123'
```

# Run the application

## User Side - Frontend
```
npm run client
```

## User Side - Backend
```
npm run server
```

## Concurrently run User side
```
npm run dev
```
