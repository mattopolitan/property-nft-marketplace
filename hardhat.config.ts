import { HardhatUserConfig } from "hardhat/config";

const path = require('path')
require('@nomiclabs/hardhat-waffle')
require('dotenv').config({ path: path.join(__dirname, '/.env.local') })
require('hardhat-gas-reporter')

const config: HardhatUserConfig = {
  solidity: "0.8.4",
};

export default config;
