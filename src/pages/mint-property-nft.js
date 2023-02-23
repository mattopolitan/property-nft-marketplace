import { LinearProgress } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import InstallMetamask from '../components/molecules/InstallMetamask'
import NFTCardList from '../components/organisms/NFTCardList'
import { Web3Context } from '../components/providers/Web3Provider'
import { mapCreatedAndOwnedTokenIdsAsMarketItems, getUniqueOwnedAndCreatedTokenIds } from '../utils/nft'
import UnsupportedChain from '../components/molecules/UnsupportedChain'
import ConnectWalletMessage from '../components/molecules/ConnectWalletMessage'
import NFTCardCreation from '../components/molecules/NFTCardCreation';

export default function CreatorDashboard () {
  // const [nfts, setNfts] = useState([])
  const { account, marketplaceContract, nftContract, isReady, hasWeb3, network } = useContext(Web3Context)
  const [isLoading, setIsLoading] = useState(true)
  const [hasWindowEthereum, setHasWindowEthereum] = useState(false)

  useEffect(() => {
    setHasWindowEthereum(window.ethereum)
  }, [])

  useEffect(() => {
    load()
    // loadNFTs()
  }, [account, isReady])

  async function load() {
    setIsLoading(false)
  }

  // async function loadNFTs () {
  //   if (!isReady || !hasWeb3) return <></>
  //   const myUniqueCreatedAndOwnedTokenIds = await getUniqueOwnedAndCreatedTokenIds(nftContract)
  //   const myNfts = await Promise.all(myUniqueCreatedAndOwnedTokenIds.map(
  //     mapCreatedAndOwnedTokenIdsAsMarketItems(marketplaceContract, nftContract, account)
  //   ))
  //   setNfts(myNfts)
  //   setIsLoading(false)
  // }

  async function addNFTToList (tokenId) {
    const nft = await mapCreatedAndOwnedTokenIdsAsMarketItems(marketplaceContract, nftContract, account)(tokenId)
    // setNfts(prevNfts => [nft, ...prevNfts])
  }

  if (!hasWindowEthereum) return <InstallMetamask/>
  if (!hasWeb3) return <ConnectWalletMessage/>
  if (!network) return <UnsupportedChain/>
  if (isLoading) return <LinearProgress/>

  return (
    // <NFTCardList nfts={nfts} setNfts={setNfts} withCreateNFT={true}/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <NFTCardCreation addNFTToList={addNFTToList} />
    </div>
  )
}
