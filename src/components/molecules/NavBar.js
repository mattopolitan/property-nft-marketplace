
import { useContext, useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Web3Context } from '../providers/Web3Provider'
import NavItem from '../atoms/NavItem'
import ConnectedAccountAddress from '../atoms/ConnectedAccountAddress'
import WalletConnection from '../atoms/WalletConnection'

const pages = [
  {
    title: 'Market',
    href: '/'
  },
  {
    title: 'Mint Property NFT',
    href: '/mint-property-nft'
  },
  {
    title: 'My NFTs',
    href: '/my-nfts'
  }
]

const NavBar = () => {
  const { account } = useContext(Web3Context)
  const [connectionComponent, setConnectionComponent] = useState(<></>);
  const logo = '🖼️'

  useEffect(() => {
    if(account) {
      setConnectionComponent(<ConnectedAccountAddress account={account}/>)
    } else {
      setConnectionComponent(<WalletConnection />);
    }
  }, [account])

  return (
    <AppBar position="static">
      <Container maxWidth="100%">
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ p: '10px', flexGrow: { xs: 1, md: 0 }, display: 'flex' }}
          >
            {logo}
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {pages.map(({ title, href }) => <NavItem title={title} href={href} key={title}/>)}
          </Box>
          {connectionComponent}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
