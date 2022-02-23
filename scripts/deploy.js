const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("links");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("mmednik",  {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();
  console.log("Minted domain mmednik.links");

  txn = await domainContract.setIpfsUrl("mmednik", "https://ipfs.io/ipfs/QmbHRN8tjfMv1cXks9URGvkKnSxtAcP1bH2hB3ySeyZgUY?filename=ejemplo.txt");
  await txn.wait();
  console.log("Set IPFS url for mmednik.links");

  const address = await domainContract.getAddress("mmednik");
  console.log("Owner of domain mmednik:", address);

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