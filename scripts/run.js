const main = async () => {
  // The first return is the deployer, the second is a random account
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);

  let txn = await domainContract.register("doom");
  await txn.wait();

  const domainAddress = await domainContract.getAddress("doom");
  console.log("Owner of domain doom:", domainAddress);

  txn = await domainContract.setIpfsUrl("doom", "https://ipfs.io/ipfs/QmbHRN8tjfMv1cXks9URGvkKnSxtAcP1bH2hB3ySeyZgUY?filename=ejemplo.txt");
  await txn.wait()
  console.log("IPFS url recorded for domain doom");
  
  const ipfsUrlRecorded = await domainContract.getIpfsUrl("doom");
  console.log("IPFS url of domain doom:", ipfsUrlRecorded);
};

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
