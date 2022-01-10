
// E6 syntax async and await function it is an asynchronous function  has a promise it will await for while the function runs 
const main = async() => {
//a factory that  generates instances of the contract 
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deployed to:", transactions.address);
}

const runMain = async () => {
  try {
    // calling the main function 
    await main();
    //send message process was completed successfully 
    process.exit(0);
    
  } catch (error) {
    //log the error to the console 
    console.error(error);
    // send message 1 process failed there is an error 
    process.exit(1)


  }
}
// calling the function to run 
runMain();