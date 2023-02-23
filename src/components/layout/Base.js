import { useContext } from 'react'
import FaucetTip from '../molecules/FaucetTip'
import NavBar from '../molecules/NavBar'
import NFTModal from '../organisms/NFTModal'
import NFTModalProvider from '../providers/NFTModalProvider'
import { Web3Context } from '../providers/Web3Provider'

export default function BaseLayout ({ children }) {
  const { network, balance, isReady, hasWeb3 } = useContext(Web3Context)
  const isLowBalance = balance < 0.1
  return (
    <>
      <NFTModalProvider>
        <NavBar/>
        {hasWeb3 && isReady && (network.indexOf('mainnet') === -1) && isLowBalance && <FaucetTip/>}
        {children}
        <NFTModal/>
      </NFTModalProvider>
    </>
  )
}
