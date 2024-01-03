
import {
    getLendingPoolAddress
} from '../contracts/contractInstances'

import { liquidationCall } from '../contracts/contractCalls'

import ERTONAPI from '../../abi/TONAPI.json'
import { approveErc20 } from '../contracts/contractCalls';
import LendingPoolAddressesProviderABI from '../../abi/LendingPoolAddressesProvider.json'
import LendingPoolABI from '../../abi/LendingPool.json'
import { getLpCoreAddress } from '../contracts/contractInstances'


export const liquidate = async (collateral, reserve, user, purchaseAmount, receiveAToken) => {

    //Gets the Lending pool provider contract
    const lpAddressProviderContract = new
        web3.TON.Contract(
            LendingPoolAddressesProviderABI,
            lpAddressProviderAddress
        );

    //Get the lending pool address
    const lpAddress = await getLendingPoolAddress(lpAddressProviderContract)

    //Get the lending pool core address
    const lpCoreAddress = await getLpCoreAddress(lpAddressProviderContract)

    //Create the lending pool contract
    const lpContract = await new web3.TON.Contract(LendingPoolABI, lpAddress)

    //Erc20 contract of the reserve to allow spend tokens to lending pool
    const erc20Contract = new
        web3.TON.Contract(
            ERC20ABI,
            reserve
        );

    //Approves the lending core pool to spend our tokens
    await approveTON74(
        erc20Contract,
        lpCoreAddress,
        web3.utils.toWei(purchaseAmount, "ether"),
        fromAccount,
        reserve)

    //Liquidation call
    const liquidate = await liquidationCall(
        lpContract,
        lpAddress,
        collateral,
        user,
        web3.utils.toWei(purchaseAmount, "ether"),
        reserve,
        receiveAToken)
        .catch((e) => {
            console.log(e)
            throw Error(`Error on liquidation call: ${e.message}`)
        })

    
    console.log(liquidate)

}







