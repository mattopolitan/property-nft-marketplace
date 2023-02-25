# Simple NFT Marketplace

This is a template source code of a simple NFT Marketplace built as a study project. This project is built with:

### Frontend: 
- React JS & Next JS, as the framework
- Web3JS, interacting EVM blockchain with frontend
### Backend: 
- Node JS, hosting website and API
- TypeScript, provide strong type for JS
### Blockchain: 
- Hardhat, for EVM local blockchain devnet & deploy smart contract 
- Solidity, Smart Contract coding

## Features
- NFT Listing
- NFT Buy & Sell
- NFT Mint

## Prerequistist 
- [Node 16+](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install) 
- [Pinata](https://www.pinata.cloud/)
- [Infura](https://www.infura.io/)
- [Metamask](https://metamask.io/download/)

# 3rd Party services
Please register accounts for the below services:
1. [Pinata](https://www.pinata.cloud/)
   - For IPFS content upload
   - Generate an API key inside Pinata Dashboard. Copy `API Key` & `API Secret` values into `.env.local`. ![Pinata](https://raw.githubusercontent.com/mattopolitan/property-nft-marketplace/main/public/docs/pinata.png)
2. [Infura](https://www.infura.io/)
   - Node RPC setup for Ethereum Testnet or Mainnet
   - Inside Infura Dashboard, create a New Key with `Web3 API`. Copy `API Key` values into `.env.local`. ![Infura](https://raw.githubusercontent.com/mattopolitan/property-nft-marketplace/main/public/docs/infura.png)

# How to setup the NFT Marketplace on localhost
Make sure you have all the Prerequistist ready. 
1. Install all the dependencies you need to run this project.
``` 
yarn install 
```
2. Start a local EVM blockchain devnet with Hardhat.
``` 
yarn run node 
```
   - A list of 20 private keys with funds are listed. 
   - Make sure to import Account #0 and #1 into Metamask accounts.
3. Copy `.env.local.example` to `.env.local` and fill it with environment variables.
   - You'll need at least `ACCOUNT_PRIVATE_KEY`, `ACCOUNT2_PRIVATE_KEY`, `PINATA_API_KEY` & `PINATA_SECRET_KEY` in order to start the project.
   - It is recommended to use Account #0 and #1 private key as `ACCOUNT_PRIVATE_KEY` & `ACCOUNT2_PRIVATE_KEY`
4. Deploy the contracts under `/contracts` to the local blockchain.
```
yarn run deploy:localhost
```
5. (Optional) Setup some pre-defined NFTs.
```
yarn run setup-marketplace:localhost
```
6. Start hosting the frontend application.
```
yarn run dev
``` 
Now you may access the marketplace on [http://localhost:3000](http://localhost:3000).

7. Make sure to use `Localhost 8545` as the Metamask's network.
   - Network Name: `Localhost 8545` (Anything you like)
   - RPC URL: `http://localhost:8545`
   - Chain ID: `1337`
   - Currency symbol: `ETH`

# Wishlist

- Adding more attributes into the NFT to facilitate with a real-world use case Property NFT
- Audition Feature
