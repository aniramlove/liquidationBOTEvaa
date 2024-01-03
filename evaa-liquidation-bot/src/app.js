import { setGlobals } from './globals';
import { liquidate } from './liquidation/liquidation'

require('dotenv').config()

setGlobals();

const collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" 
const reserveAddress = "0x98f8eb12127ee205a7b84e6910021e1e65ec5c8d92f89acdffea7be20104e899"
const userLiquidated = "0x85f0045998038bebd076987deb4d4c680a323cb04380491eaa7857b6469ba923" 
const purchaseAmount = '10'
const receiveATokens = false

liquidate(
    collateralAddress,
    reserveAddress,
    userLiquidated,
    purchaseAmount,
    receiveATokens
)
