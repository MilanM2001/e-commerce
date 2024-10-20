# E-commerce Platform

## Description
This project is a full-stack e-commerce platform that allows users to browse products, manage a shopping cart, and place orders. It features role-based authentication, with admin-specific functionalities like creating, updating, and deleting products. The application supports image uploads and uses a pageable endpoint for product listings.

## Tech Stack
- **Backend**: C#, .NET 8, Entity Framework, MySQL, AutoMapper
- **Frontend**: React (TypeScript), Vite, Material UI
- **Database**: MySQL
- **Authentication**: JWT (Role-based authentication)
- **Testing**: xUnit
- **File Management**: Supports image uploads and stores product images as base64 strings in the database
- **Other Tools**: Swagger for API documentation, Formik for form handling

## Features
- User roles (Admin and regular user)
- Product management (CRUD)
- Shopping cart functionality
- Order history
- Pagination for product listings
- Image upload for products
