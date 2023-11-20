# Caddy Reverse Proxy Web UI

This project provides a user-friendly web interface for managing a Caddy reverse proxy server. With this UI, you can easily view, add, edit, and delete routes, as well as manage user accounts. At least, thats the plan

## Features

* Dockerfile
* View all Routes
* Delete routes
* Add routes
* Edit routes

## TODO

- [ ] Authentication 
- [ ] Persistant storage

## Getting Started

To build and run the project, follow these steps:

1. Clone the repository
2. Create a .env file
3. Fill out required information in the .env from the .env.example
4. Build docker image with `docker build . -t caddy-ui:latest`
5. Start the development server with `docker run --env-file .env -p 3000:3000 caddy-ui`
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

This project is built using the following technologies:

- React
- Next.js
- Tailwind CSS
- Caddy API

## Contributions

Contributions are welcome! Feel free to submit pull requests or open issues if you find any bugs or have suggestions for new features.
