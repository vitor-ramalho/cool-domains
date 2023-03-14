const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("cacildis");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let rawPrice = await domainContract.price("mussum");

  let price = (parseInt(rawPrice, 10) / 10 ** 18).toString();
  // let txnGas = await domainContract.estimateGas.register("mussumalive", { value: hre.ethers.utils.parseEther('0.1') });

  // console.log(txnGas);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  
  let txn = await domainContract.register("mussum", { value: hre.ethers.utils.parseEther(price)});
  await txn.wait();
  console.log("Minted domain mussum.cacildis");

  // const startEstimate = await domainContract.estimateGas.setRecord("mussumalive", "Am I a mussum or a cacildis??")

  // console.log(startEstimate);

  txn = await domainContract.setRecord("mussum", "Am I a mussum or a cacildis??");
  await txn.wait();
  console.log("Set record for mussum.cacildis");

  const address = await domainContract.getAddress("mussum");
  console.log("Owner of domain mussum:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();