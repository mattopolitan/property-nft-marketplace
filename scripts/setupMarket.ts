import { ContractTransaction } from "ethers/lib"
import hre from "hardhat"
// import { PropertyAttributes } from "../src/models/property"

// const propertyMetadata: PropertyAttributes[] = [
//   {
//     name: "XXX",
//     location: "Aberdeen",
//     block: "Block 1",
//     floor: "Floor 1",
//     flat: "Flat A"
//   },
// ]

const propertiesNftMetadataUrl = [
  'https://ipfs.io/ipfs/QmY9fPk5pTyky2qoyZj1numVk5B4U9m49Gg7ZTMYgv5Cxm?filename=The%20Pavilia%20Bay',
  'https://ipfs.io/ipfs/QmZMSDZCcRguyNogkvUzxuD9Xxk1uH6BLLA4BsE3AP34Yz?filename=Parc%20City',
  'https://ipfs.io/ipfs/QmQDUHDvZUjujG6yaYPYnBvorKCATF9Fyq5A7QDLyciaTk?filename=Ocean%20Pride',
  'https://ipfs.io/ipfs/QmXDEB6DxwkmkGJGmEsJ4gusDte6EmsxiDScLndt5JXb3G?filename=Malibu',
  'https://ipfs.io/ipfs/QmUBCL1xtZ57aF4EXjtqsR1maX5fu68ChEEE9s6uMLMf9v?filename=LP6',
  'https://ipfs.io/ipfs/QmSZen5P1edNASdMyuy5UKKxCo3XkV5VACPoPaAWG4dtgc?filename=Mei%20Foo%20Sun%20Chuen',
  'https://ipfs.io/ipfs/QmXx962FtyUhLfdLVdzNdS2EH64CZ99tAPaJyZocnw1nZP?filename=Aqua Marine',
  'https://ipfs.io/ipfs/QmQ55Uh5ExWCn2AWrFAbg1vXv1xvtE3h1npyokZtiXFXY5?filename=Liberte'
]

async function getMintedTokenId (transaction: ContractTransaction) {
  const transactionResult = await transaction.wait()
  if(!transactionResult.events) return 
  const event = transactionResult.events[0]
  if(!event.args) return
  const value = event.args[2]
  return value.toNumber()
}

async function getCreatedMarketItemId (transaction: ContractTransaction) {
  const transactionResult = await transaction.wait()
  if(!transactionResult.events) return 
  const marketItemEvent = transactionResult.events.find(event => event.args)
  if(!marketItemEvent) return
  if(!marketItemEvent.args) return
  const value = marketItemEvent.args[0]
  return value.toNumber()
}

async function setupMarket (marketplaceAddress?: string, nftAddress?: string) {
  const networkName = hre.network.name.toUpperCase()
  marketplaceAddress = marketplaceAddress || process.env[`MARKETPLACE_CONTRACT_ADDRESS_${networkName}`] || ''
  nftAddress = nftAddress || process.env[`NFT_CONTRACT_ADDRESS_${networkName}`] || ''

  const marketplaceContract = await hre.ethers.getContractAt('Marketplace', marketplaceAddress)
  const nftContract = await hre.ethers.getContractAt('NFT', nftAddress)
  const nftContractAddress = nftContract.address
  const [acc1, acc2] = await hre.ethers.getSigners()

  const price = hre.ethers.utils.parseEther('0.01')
  const listingFee = await marketplaceContract.getListingFee()

  const promises: Promise<string>[] = [];

  const mintTokenAndListMarketItem = async (url: string) => {
    const mintTx = await nftContract.mintToken(url)
    const tokenId = await getMintedTokenId(mintTx)
    await marketplaceContract.createMarketItem(nftContractAddress, tokenId, price, { value: listingFee })

    return tokenId;
  }

  for (let i = 0; i < propertiesNftMetadataUrl.length; i++) {
    promises.push(mintTokenAndListMarketItem(propertiesNftMetadataUrl[i]));
  }

  const tokenIdList = await Promise.all(promises);

  console.log(`${acc1.address} minted tokens ${tokenIdList.join(',')} and are listed as market items`)
}

async function main () {
  await setupMarket()
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

module.exports = {
  setupMarket: setupMarket
}
