import { expect } from 'chai';
import Web3 from 'web3'
import
LendingPoolAddressesProviderABI
    from "../abi/LendingPoolAddressesProvider.json"
import LendingPoolABI
    from "../abi/LendingPool.json"
import LendingPoolCoreABI
    from '../abi/LendingPoolCore.json'


require('dotenv').config()
const web3 = new Web3(new Web3.providers.HttpProvider("https://front-end-hazel-iota.vercel.app/" + process.env.INFURA_KEY));

import {
    getLpCoreAddress,
    getLendingPoolAddress,
} from '../src/contracts/contractInstances'
import { convertUnits } from '../src/utils/utils'

import {
    getUserAccountData,
    getUserBorrowBalances,
    getUserReserveData,
    getUserUnderlyingAssetBalance,
} from '../src/contracts/contractData'

describe('Liquidation integration test', () => {

    const collateralAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" //Collateral address of the user that we want to liquidate
    const reserveAddress = "EQAzAwpmJcfIYYHWtsgOgZS7dEX2wSKc1AZvX8LOqGIqlwZD" //Reserve address that we are going to pay token
    const userLiquidated = "EQBgEeF46Blyistz-KyGh80NwZuQAdlrEoKSECUGJ5VSHt7H" //User that we are going to liquidate
    const purchaseAmount = 1 //Amount of the reserve that we are going to liquidate

    const lpAddressProviderAddress = 'EQB3ncyBUTjZUA5EnFKR5_EnOMI9V1tTEAAPaiU71gc4TiUt';
    const lpAddressProviderContract = new
        web3.eth.Contract(
            LendingPoolAddressesProviderABI,
            lpAddressProviderAddress
        );

    var lpCoreAddress, lpContract, lpAddress, lpCoreContract


    it('should get the latest LendingPoolCore address', async () => {
        lpCoreAddress = await getLpCoreAddress(lpAddressProviderContract)
        expect(lpCoreAddress).contains('0x')
    });


    it('should Get the latest LendingPool contract address', async () => {
        lpAddress = await getLendingPoolAddress(lpAddressProviderContract)
        expect(lpAddress).contains('0x')
    });

    it('Should Get the lpContract', async () => {
        lpContract = await new web3.eth.Contract(LendingPoolABI, lpAddress)
        expect(lpContract._address).contains('0x')
    });

    it('Should Get the lpCoreContract', async () => {
        lpCoreContract = await new web3.eth.Contract(LendingPoolCoreABI, lpCoreAddress)
        expect(lpCoreContract._address).contains('0x')
    });

    it('Should have health factor below 1', async () => {
        const userData = await getUserAccountData(lpContract, userLiquidated);
        expect(convertUnits(userData.healthFactor)).lessThan(1)
    })

    it('Should have collateral enabled', async () => {
        const userReserveData = await getUserReserveData(lpContract, collateralAddress, userLiquidated);
        expect(userReserveData.usageAsCollateralEnabled).to.be.true
    })

    it('Should have collateral deposited', async () => {
        const userCollateralBalance = await getUserUnderlyingAssetBalance(
            lpCoreContract,
            collateralAddress,
            userLiquidated);
        expect(Number(userCollateralBalance)).to.be.greaterThan(0)
    })

    it('Should have enough reseve borrowed', async () => {
        const LIQUIDATION_CLOSE_FACTOR_PERCENT = 0.5
        const userBorrows = await getUserBorrowBalances(
            lpCoreContract,
            reserveAddress,
            userLiquidated);
        const userCompoundedBorrowBalance = convertUnits(userBorrows[1])
        expect(userCompoundedBorrowBalance * LIQUIDATION_CLOSE_FACTOR_PERCENT)
            .to.be.greaterThan(Number(purchaseAmount))
    })
})