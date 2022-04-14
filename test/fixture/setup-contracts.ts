import { deployments, getNamedAccounts } from "hardhat";
import { ERC721AntiRugPullMock__factory } from "../../typechain";

export const setupERC721AntiRugPull = deployments.createFixture(
  async ({deployments, ethers}, options) => {
    await deployments.fixture(["ERC721AntiRugPull"]);
    const artifact = await deployments.get("ERC721AntiRugPullMock");
    const [ deployer, ...users ] = await ethers.getSigners();
    const provider = deployer.provider;
    const contract = ERC721AntiRugPullMock__factory.connect(artifact.address, deployer);
    const beneficiary = await contract.beneficiary();
    const maxSupply = await contract.MAX_SUPPLY();
    const reportThresold = await contract.threshold();
    const mintPrice = await contract.MINT_PRICE();
    const startVestingTime = await contract.start();
    const duration = await contract.duration();
    return {
      provider,
      contract,
      beneficiary,
      users,
      maxSupply,
      reportThresold,
      mintPrice,
      startVestingTime,
      duration,
    }
  }
)