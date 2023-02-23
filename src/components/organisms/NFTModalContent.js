import { Grid, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { NFT } from '../organisms/NFTCardList'
// import Image from 'next/image'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // margin: '15px 25px',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      width: '100%'
    },
    zIndex: '2'
  },
  mainContainer: {
    borderRadius: '3px',
    // height: '90vh',
    overflowY: 'scroll',
    flexDirection: 'row-reverse',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      overflowY: 'hidden'
    }
  },
  imageContainer: {
    height: 'inherit',
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    }
  }
}))

export default function NFTModalContent ({ nft, onClick }) {
  const classNames = useStyles()
  console.log('nft', nft)
  return (
    <Paper className={classNames.root}>
      <Grid container className={classNames.mainContainer}>
        {NFT({
          nft,
          index: 0
        })}
        {/* <Grid item className={classNames.imageContainer}>
          <Image src={nft.image} alt={nft.title} layout='fill' objectFit='contain' onClick={onClick}/>
        </Grid> */}
      </Grid>
    </Paper>
  )
}
