# Stockify - Replit Project Documentation

## Overview
Stockify is a Bitcoin-Native Tokenized US Stocks platform built on Stacks blockchain. This is a Next.js web application that allows users to trade tokenized stocks using Bitcoin and STX.

## Recent Changes (October 16, 2025)
- **Migration from Vercel to Replit**: Successfully migrated the project from Vercel to Replit environment
- **Next.js Update**: Updated from 14.2.5 to 15.5.5 to fix critical security vulnerabilities
- **Replit Configuration**: 
  - Configured Next.js to bind to port 5000 with host 0.0.0.0 for Replit compatibility
  - Added `allowedDevOrigins` configuration to handle cross-origin requests in Replit's iframe environment
  - This configuration allows requests from `*.replit.dev` and `127.0.0.1` in development mode
- **TypeScript Compatibility**: Fixed Stacks library serialization issues for compatibility with latest @stacks/transactions version
- **Environment Setup**: Configured environment variables for Stacks testnet integration
- **UI/UX Update**: 
  - Removed "Supported Wallets" and "TESTNET ONLY" sections from homepage
  - Added feature cards highlighting: Stock Trading, Blockchain Security, AI-Powered Agent, and Wallet Integration
- **MetaMask Integration**: 
  - Added MetaMask wallet support alongside Stacks wallets (Hiro, Leather, Xverse)
  - Implemented MetaMask authentication with ethers.js
  - Updated Header component to display wallet type (MetaMask or Stacks)
  - Supports disconnection for both wallet types

## Project Architecture

### Frontend Structure
- **Framework**: Next.js 15.5.5 with TypeScript
- **Location**: `/frontend` directory
- **Styling**: Tailwind CSS
- **Blockchain Integration**: Stacks blockchain via @stacks libraries

### Key Components
- `AgentChat.tsx`: AI-powered chat interface for trading
- `Header.tsx`: Navigation and wallet connection (supports both Stacks and MetaMask wallets)
- `PortfolioHoldings.tsx`: Display user's stock holdings
- `TransactionHistory.tsx`: Show transaction history
- `WalletLogin.tsx`: Wallet connection UI with feature cards and MetaMask integration

### Authentication Modules
- `stacksAuth.ts`: Handles Stacks wallet authentication (Hiro, Leather, Xverse)
- `metamaskAuth.ts`: Handles MetaMask wallet authentication and state management

### API Routes
- `/api/chat`: Handles chat-based trading commands (buy, sell, check balance, get price)

### Smart Contracts (Clarity)
- `stockify-core.clar`: Core contract for stock trading logic
- `stock-token.clar`: Token contract for DSTOCK

## Environment Configuration

### Required Environment Variables
All environment variables are configured in `frontend/.env.local`:

- `NEXT_PUBLIC_STACKS_NETWORK`: Set to "testnet" for development
- `NEXT_PUBLIC_HIRO_API`: Hiro API endpoint (https://api.testnet.hiro.so)
- `NEXT_PUBLIC_STOCKIFY_CONTRACT`: Deployed stockify-core contract address
- `NEXT_PUBLIC_DSTOCK_CONTRACT`: Deployed stock-token contract address

### Deployment Environment
When deploying to production, ensure these environment variables are set in Replit's deployment secrets.

## Development Workflow

### Running the Development Server
The project uses a workflow named "Dev Server" that runs:
```bash
cd frontend && npm run dev
```

This starts the Next.js development server on port 5000, accessible via the Replit webview.

### Making Changes
1. Edit files in the `frontend/src` directory
2. The dev server will automatically reload with hot module replacement (HMR)
3. Check browser console and workflow logs for any errors

## Deployment Configuration

### Build Command
```bash
cd frontend && npm run build
```

### Start Command
```bash
cd frontend && npm run start
```

### Deployment Type
- **Target**: Autoscale (stateless web application)
- **Port**: 5000
- **Host**: 0.0.0.0

## Important Notes

### Replit-Specific Configuration
- **allowedDevOrigins**: The `allowedDevOrigins` configuration in `next.config.mjs` is critical for the app to work in Replit's iframe environment. It allows cross-origin requests from Replit's proxy domains, preventing CORS issues during development.
  
### Security Considerations
- All smart contract interactions use testnet
- Private keys are managed via wallet extensions:
  - Stacks wallets: Hiro, Leather, Xverse
  - MetaMask wallet for cross-chain capabilities
- No API keys are required for basic functionality (OpenAI integration was removed)

### Known Limitations
- Currently uses mock data for some features (transaction history, portfolio holdings)
- Trading is on testnet only - not for real securities trading
- Requires either Stacks wallet extension (Hiro, Leather, Xverse) or MetaMask for authentication
- MetaMask integration is prepared for future cross-chain functionality

## Technology Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Stacks (Bitcoin Layer 2)
- **Smart Contracts**: Clarity
- **Wallet Integration**: 
  - @stacks/connect, @stacks/auth (for Stacks wallets)
  - ethers.js (for MetaMask)
- **API**: Next.js API Routes

## User Preferences
_No specific user preferences documented yet._
