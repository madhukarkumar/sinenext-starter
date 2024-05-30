## SineNext Starter - SingleStore, Elegance SDK & Next.js

This Next.js starter project is designed to get started with development of full stack AI applications that uses SingleStoreDB (MySQL wire protocol compatible) for transactional, analytics and vector data. It leverages Elegance SDK to simplify database interactions and build intelligent chatbots.
Features

### Next.js 13: Modern React framework for building fast and scalable web applications.
### SingleStoreDB: A powerful, distributed database that combines transactional and analytical workloads. Sign up on [singlestore.com](https://singlestore.com)
### Elegance SDK: Simplifies the integration of AI capabilities (vector search, chat) and CRUD with SingleStoreDB.
### Example API Routes: Demonstrates basic CRUD operations and provides a starting point for your API.
### Chat Component: A reusable chat component to easily build chatbot interfaces.
### Example Pages: Includes a chatbot page with a simple chat interface and a users table page with CRUD operations.

## Section 1: Local Development Setup
### 1.1 Prerequisites
Node.js and npm/yarn: Ensure you have Node.js and a package manager (npm or yarn) installed. 
SingleStoreDB Instance: Sign up for a SingleStore Cloud account or install SingleStore locally. Get your database credentials (hostname, port, username, password, database name).
OpenAI API Key (Optional): Obtain an API key from OpenAI for accessing their language models. You can also use elegance-sdk customizer to use your own model end point.

1.2 Installation

Clone the Repository:
    Bash

    git clone https://github.com/madhukarkumar/sinenext-starter.git
    cd sinenext-starter


Environment Variables:

    Copy .env.example to .env.local
    Fill in your SingleStore and OpenAI credentials in .env.local:

    DATABASE_URL="mysql://<username>:<password>@<hostname>:<port>/<database_name>"
    OPENAI_API_KEY="your_openai_api_key"
    SINGLE_STORE_DB_HOST="your_single_store_db_host"
    SINGLE_STORE_DB_PORT="your_single_store_db_port"
    SINGLE_STORE_DB_USER="your_single_store_db_user"
    SINGLE_STORE_DB_PASSWORD="your_single_store_db_password"
    SINGLE_STORE_DB_NAME="your_single_store_db_name"

Install Dependencies:
```Bash

npm install
```

Start Development Server:
```Bash

npm run dev
```

Section 2: Creating API Endpoints

The Elegance SDK provides the following methods for SingleStore interaction:

    askSingleStore: Sends a query to the database and returns a response.
    createEmbedding: Creates vector embeddings for text data.
    generateTextCompletion: Generates text responses based on a prompt.

Customizers:

    withModel: Specifies the model to use for text completion (e.g., "text-davinci-003").
    withTemperature: Controls the creativity of text generation (0 to 1).
    withMaxTokens: Limits the length of the generated response.

Example: Creating a custom query endpoint
```TypeScript

// app/api/customQuery/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { eleganceClient } from '@/lib/elegance/server-client'; // Import your Elegance client

export async function POST(request: NextRequest) {
const { query } = await request.json();

const results = await eleganceClient.askSingleStore({ question: query });

return NextResponse.json(results);
}
```

Section 3: Building Chatbot Pages with Chat Component

Create a New Page (e.g., app/chatbot/page.tsx):
```TypeScript

    import Chat from '@/components/chat/Chat'; // Assuming you have this component

    export default function ChatbotPage() {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <h1>SingleStore Chatbot</h1>
                <Chat /> 
            </main>
        );
    }
```

The Chat component (app/components/chat/Chat.tsx):
```TypeScript

'use client';

import React, { useState } from 'react';
import { eleganceClient } from "@/services/eleganceClient";
// Import other components for UI (e.g., Input, Button, MessageList)

function Chat() {
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");

    const handleSubmit = async () => {
        if (!input) return;

        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput("");

        const response = await eleganceClient.askSingleStore({ question: input });
        setMessages(prev => [...prev, { role: 'assistant', content: response.text }]); 
    };

    return (
        <div>
            {/* Render MessageList here */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    // ... other props for styling
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;
```
