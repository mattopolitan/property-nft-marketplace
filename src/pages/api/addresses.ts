import { Request, Response } from 'express';

export default function handler (req: Request, res: Response) {
  const network = req.query.network
  res.status(200).json({
    marketplaceAddress: process.env[`MARKETPLACE_CONTRACT_ADDRESS_${network}`],
    nftAddress: process.env[`NFT_CONTRACT_ADDRESS_${network}`]
  })
}
