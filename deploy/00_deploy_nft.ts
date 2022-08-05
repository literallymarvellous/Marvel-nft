import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployment: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;
  const chainId = await getChainId();

  console.log(`Chain ID: ${chainId}`);

  const { deployer } = await getNamedAccounts();

  const collectible = await deploy("Collectible", {
    from: deployer,
    args: [deployer],
    log: true,
  });

  console.log("Collectible:", collectible.address);
};

export default deployment;

deployment.tags = ["nft"];
