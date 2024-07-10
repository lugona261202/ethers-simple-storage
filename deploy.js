const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // compile them in our code
  // compile them seperately
  //http://127.0.0.1:7545

  const providerUrl = "HTTP://172.29.144.1:7545";
  const provider = new ethers.providers.JsonRpcProvider(providerUrl); // endpoint of ganache rpc server
  const wallet = new ethers.Wallet(
    "0x311e24414bb8936991e2563c29b5929f25c52f8222fe7c565b40d522e712f89b",
    provider
  ); // privte key of wallet
  // now we have obtain private key and , provider to obtain abe we read directly from other file
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  // creating contractfactory , feature of ethers
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
