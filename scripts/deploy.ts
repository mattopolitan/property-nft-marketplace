import { ethers, network } from "hardhat"
import dotenv from "dotenv"
import fs from "fs"

function importContractAddressesToEnv (replaceEnv: {
  marketplaceAddress: string;
  nftAddress: string;
  propertyNftAddress: string;
  networkName: string;
}) {
  const { marketplaceAddress, nftAddress, propertyNftAddress, networkName } = replaceEnv;
  const envFileName = '.env.local'
  const envFile = fs.readFileSync(envFileName, 'utf-8')
  const env = dotenv.parse(envFile)
  env[`MARKETPLACE_CONTRACT_ADDRESS_${networkName}`] = marketplaceAddress
  env[`NFT_CONTRACT_ADDRESS_${networkName}`] = nftAddress
  env[`PROPERTY_NFT_CONTRACT_ADDRESS_${networkName}`] = propertyNftAddress
  const newEnv = Object.entries(env).reduce((env, [key, value]) => {
    return `${env}${key}=${value}\n`
  }, '')

  fs.writeFileSync(envFileName, newEnv)
}

async function main() {
  const Marketplace = await ethers.getContractFactory('Marketplace')
  const marketplace = await Marketplace.deploy()
  await marketplace.deployed()
  console.log(`Marketplace contract deployed at: ${marketplace.address}`)

  const NFT = await ethers.getContractFactory('NFT')
  const nftToken = await NFT.deploy(marketplace.address)
  await nftToken.deployed()
  console.log(`NFT deployed to: ${nftToken.address}`)

  const PropertyToken = await ethers.getContractFactory('PropertyToken')
  const propertyToken = await PropertyToken.deploy()
  await propertyToken.deployed()
  console.log(`Property NFT deployed to: ${propertyToken.address}`)

  importContractAddressesToEnv({
    marketplaceAddress: marketplace.address, 
    nftAddress: nftToken.address, 
    propertyNftAddress: propertyToken.address,
    networkName: network.name.toUpperCase()
  })
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
