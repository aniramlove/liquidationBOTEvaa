myBalance.usdt = (await tonClient.runMethod(jettonWallets.usdt, 'get_wallet_data')).stack.readBigNumber();
      assetBalance = Uint(64);
	  const assetsDataResult = await tonClient.runMethod(masterAddress, 'getAssetsData');
	  
	  [
        Dict<key: int256, {
          sRate = Uint(64);
          bRate = Uint(64);
          totalSupply = Uint(64);
          totalBorrow = Uint(64);
          lastAccural = Uint(32);
          balance = Uint(64);
          }>
      ] 
	  const assetConfigResult = await tonClient.runMethod(masterAddress, 'getAssetsConfig');
	  
	        [
        Dict<key=tokenId: int256, {
          oracle = slice; 
          decimals = Uint(8); 
          collateralFactor = Uint(16); 
          liquidationThreshold = Uint(16); 
          liquidationPenalty = Uint(16); 
          baseBorrowRate = Uint(64); 
          borrowRateSlopeLow = Uint(64); 
          borrowRateSlopeHigh = Uint(64); 
          supplyRateSlopeLow = Uint(64); 
          supplyRateSlopeHigh = Uint(64); 
          targeUtilization = Uint(64);
          }>
      ]
	  
	  userDataResult = await tonClient.runMethodWithError(userContractAddress, 'getAllUserScData');
	  
	        [
        Dict<key=: int256,{
          codeVersion = Uint(64);
          userAddress = Uint(64);
          userPrincipals = {
            ton?: Uint(64),
            usdt?: Uint(64),
            usdc?: Uint(64),
          };
        }>
      ]