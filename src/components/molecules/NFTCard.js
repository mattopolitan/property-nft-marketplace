
import { ethers } from 'ethers'
import { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Card, CardActions, CardContent, CardMedia, Button, Divider, Box, CircularProgress } from '@mui/material'
import { NFTModalContext } from '../providers/NFTModalProvider'
import { Web3Context } from '../providers/Web3Provider'
import NFTDescription from '../atoms/NFTDescription'
import NFTPrice from '../atoms/NFTPrice'
import NFTName from '../atoms/NFTName'
import CardAddresses from './CardAddresses'
import PriceTextField from '../atoms/PriceTextField'

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    display: 'flex',
    margin: '15px',
    flexGrow: 1,
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'
  },
  cardContent: {
    paddingBottom: '8px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  firstDivider: {
    margin: 'auto 0 10px'
  },
  lastDivider: {
    marginTop: '10px'
  },
  addressesAndPrice: {
    display: 'flex',
    flexDirection: 'row'
  },
  addessesContainer: {
    margin: 'auto',
    width: '60%'
  },
  priceContainer: {
    width: '40%',
    margin: 'auto'
  },
  cardActions: {
    marginTop: 'auto',
    padding: '0 16px 8px 16px'
  }
})

async function getAndSetListingFee (marketplaceContract, setListingFee) {
  if (!marketplaceContract) return
  const listingFee = await marketplaceContract.getListingFee()
  setListingFee(ethers.utils.formatUnits(listingFee, 'ether'))
}

export default function NFTCard ({ nft, action, updateNFT }) {
  const { setModalNFT, setIsModalOpen } = useContext(NFTModalContext)
  const { nftContract, marketplaceContract, hasWeb3 } = useContext(Web3Context)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [listingFee, setListingFee] = useState('')
  const [priceError, setPriceError] = useState(false)
  const [newPrice, setPrice] = useState(0)
  const classNames = useStyles()
  const { name, description, image } = nft

  useEffect(() => {
    getAndSetListingFee(marketplaceContract, setListingFee)
  }, [])

  const actions = {
    buy: {
      text: 'buy',
      method: buyNft
    },
    cancel: {
      text: 'cancel',
      method: cancelNft
    },
    approve: {
      text: 'Approve for selling',
      method: approveNft
    },
    sell: {
      text: listingFee ? `Sell (${listingFee} fee)` : 'Sell',
      method: sellNft
    },
    none: {
      text: '',
      method: () => {}
    }
  }

  async function buyNft (nft) {
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await marketplaceContract.createMarketSale(nftContract.address, nft.marketItemId, {
      value: price
    })
    await transaction.wait()
    updateNFT()
  }

  async function cancelNft (nft) {
    const transaction = await marketplaceContract.cancelMarketItem(nftContract.address, nft.marketItemId)
    await transaction.wait()
    updateNFT()
  }

  async function approveNft (nft) {
    const approveTx = await nftContract.approve(marketplaceContract.address, nft.tokenId)
    await approveTx.wait()
    updateNFT()
    return approveTx
  }

  async function sellNft (nft) {
    if (!newPrice) {
      setPriceError(true)
      return
    }
    setPriceError(false)
    const listingFee = await marketplaceContract.getListingFee()
    const priceInWei = ethers.utils.parseUnits(newPrice, 'ether')
    const transaction = await marketplaceContract.createMarketItem(nftContract.address, nft.tokenId, priceInWei, { value: listingFee.toString() })
    await transaction.wait()
    updateNFT()
    return transaction
  }

  function handleCardImageClick () {
    setModalNFT(nft)
    setIsModalOpen(true)
  }

  async function onClick (nft) {
    try {
      setIsLoading(true)
      await actions[action].method(nft)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card
      className={classNames.root}
      raised={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <CardMedia
        className={classNames.media}
        alt={name}
        image={image}
        component="img" 
        loading="lazy"
        onClick={handleCardImageClick}
      />

      <CardContent className={classNames.cardContent} >
        <NFTName name={name}/>
        <NFTDescription description={description} />
        <Divider className={classNames.firstDivider} />
        <Box className={classNames.addressesAndPrice}>
          <div className={classNames.addessesContainer}>
            <CardAddresses nft={nft} />
          </div>
          <div className={classNames.priceContainer}>
            {action === 'sell'
              ? <PriceTextField listingFee={listingFee} error={priceError} disabled={isLoading} onChange={e => setPrice(e.target.value)}/>
              : <NFTPrice nft={nft}/>
            }
          </div>
        </Box>
        <Divider className={classNames.lastDivider} />
      </CardContent>
      <CardActions className={classNames.cardActions}>
        <Button size="small" onClick={() => !isLoading && onClick(nft)}>
          {isLoading
            ? <CircularProgress size="20px" />
            : hasWeb3 && actions[action].text
          }
        </Button>
      </CardActions>
    </Card>
  )
}
