# Massa node status on a discord bot

A discord bot built with NodeJS that sends messages to a specific discord channel to notify the status of a massa node, specifically for Massa.

## Features

- Monitors Massa node status in real-time.
- Sends notifications to a specified Discord channel.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- Discord Bot Token
- Massa Wallet Secret Key

## Setup

### Clone the Repository

```
git clone https://github.com/jimmylies/is-massa-node-up.git
cd is-massa-node-up
```
### Install Dependencies
```
pnpm install
```

### Configuration

1. Rename `.env.example` to `.env`.
2. Fill in the `.env` file with the appropriate values:

```env
DISCORD_TOKEN="YourDiscordBotToken"
SECRET_KEY="YourMassaWalletSecret"
```

### Running the Bot

Start the bot using the following command:
```
npm start
```

## Usage

Once the bot is running and has been invited to your Discord server, it will automatically monitor the status of the specified blockchain node. If there's any change in the status of the node (e.g., if it goes offline or comes back online), the bot will send a notification to the specified Discord channel.

