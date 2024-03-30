# Webhook Server

This is a simple Express server that listens for webhooks coming from Chargily Epay services. It uses ngrok to expose the local server to the internet.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and production purposes.

### Prerequisites

- Node.js (version 14 or above)

- npm
- Chargily Epay account (https://pay.chargily.com/)
- Free account from ngrok (https://ngrok.com/)

### Installing

1. Clone the repository:

- <strong>git clone https://github.com/adnanebnz/chargily-webhook-server.git</strong>

2. Navigate into the project directory:

- <strong>cd chargily-webhook-server</strong>

3. Install the dependencies:

- <strong>npm install</strong>

### Configuration

Create a `.env` file in the root of your project and add the following environment variables:

```env
CHARGILY_SECRET_KEY=your_chargily_secret_key

NGROK_AUTH_TOKEN=your_ngrok_auth_token

NGROK_STATIC_DOMAIN=your_ngrok_static_domain
```

- Replace these values with the actual values that you can obtain from their respective dashboards.

### Running the Server

To start the server, run:

- npm start

### Built With

Express - The web framework used

ngrok - Used to expose local server to the internet

crypto - Used for generating HMAC

dotenv - Used to load environment variables from a .env file
