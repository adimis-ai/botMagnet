# BotMagnet
BotMagnet is an innovative chatbot builder designed to enhance user experiences on product documentation and support websites. Powered by advanced AI technology, it's the ideal solution for businesses of all sizes, offering scalability and efficiency.

## Key Features

- **Multi-Query Handling:** BotMagnet efficiently manages multiple user queries, saving time and boosting productivity while enhancing customer satisfaction.

## Getting Started

To begin using BotMagnet, follow these steps:

### Prerequisites

Before you start, make sure you have the following environment variables set up in a `.env` file:

- `APP_URL`: The root path where your app is hosted, e.g., https://localhost:3000.
- `OPENAI_API_KEY`: Your OpenAI API key.
- `NEXT_PUBLIC_SUPABASE_URL`: The URL for your Supabase instance (create a new project on Supabase for this).
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for your Supabase instance (create a new project on Supabase for this).
- `APP_SECRET`: The secret key for signing JWT tokens.
- `USER_SIGNUP_LIMIT`: The limit for additional signups.
- `DATABASE_URL`: The connection string for your Supabase database (create a new project on Supabase for this).

### Initializing the Database

To initialize the database, run the following command:

```bash
# Initialize the database
yarn run initDb
```

This command will create the necessary tables and data in your Supabase database.

### Building and Running

You have two options to run BotMagnet: using Docker or running it locally.

#### Using Docker

```bash
# Build the Docker image
docker build -t bot-magnet .

# Run the Docker container
docker run -p 3000:3000 bot-magnet
```

#### Running Locally

```bash
# Install dependencies
yarn install

# Build the application
yarn build

# Start the web app
yarn start
```

Once your application is running, you can access it by navigating to `http://localhost:3000` in your web browser.