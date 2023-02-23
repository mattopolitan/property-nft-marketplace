import { useContext, useEffect, useState } from 'react'
import NFTCardList from '../components/organisms/NFTCardList'
import { Web3Context } from '../components/providers/Web3Provider'
import { LinearProgress } from '@mui/material'
import UnsupportedChain from '../components/molecules/UnsupportedChain'
import { mapAvailableMarketItems } from '../utils/nft'

export default function Home () {
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { marketplaceContract, nftContract, isReady, network } = useContext(Web3Context)

  useEffect(() => {
    loadNFTs()
  }, [isReady])
  async function loadNFTs () {
    if (!isReady) return
    const data = await marketplaceContract.fetchAvailableMarketItems()
    const items = await Promise.all(data.map(mapAvailableMarketItems(nftContract)))
    setNfts(items)
    setIsLoading(false)
  }

  if (!network) return <UnsupportedChain/>
  if (isLoading) return <LinearProgress/>
  if (!isLoading && !nfts.length) return <h1>No NFT available for sale</h1>
  return (
    <NFTCardList nfts={nfts} setNfts={setNfts} withCreateNFT={false}/>
  )
}
