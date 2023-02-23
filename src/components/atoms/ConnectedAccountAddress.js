import { middleEllipsis } from '../../utils/format'
import { chains } from '../../utils/web3'
import NavItem from './NavItem'

export default function ConnectedAccountAddress ({ account }) {
  const accountUrl = `${chains.goerliTestnet.explorers[0].url}/address/${account}`
  return <NavItem title={middleEllipsis(account)} href={accountUrl} openNewTab={true}/>
}
