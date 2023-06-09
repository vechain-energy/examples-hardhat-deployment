// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const Greeter = await hre.thor.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, VeChain!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  const deployedGreeter = await hre.thor.getContractAt('Greeter', greeter.address)

  const greeting = await deployedGreeter.greet()
  console.log("Greeter responded with:", greeting)

  await deployedGreeter.setGreeting('Hello, VeChain-Thor')
  const greetingModified = await deployedGreeter.greet()
  console.log("After update Greeter responded with:", greetingModified)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
