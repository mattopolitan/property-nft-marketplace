import { Paper, Typography } from '@mui/material'

export default function FaucetTip () {
  return (
    <Paper
      elevation={3}
      square
      sx={{
        p: '5px 15px'
      }}>
      <Typography variant="body2" color="text.secondary">
        Low on Goerli ETH? Use this <a href='https://goerlifaucet.com/' target="_blank ">faucet</a> to get free test tokens!
      </Typography>
    </Paper>
  )
}
