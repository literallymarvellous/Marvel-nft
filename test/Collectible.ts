import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, BigNumber } from "ethers";

describe("NFT", function () {
  let collectible: Contract;

  describe("Collectible", function () {
    it("should deploy Collectible", async () => {
      const [owner] = await ethers.getSigners();

      const Collectible = await ethers.getContractFactory("Collectible");
      collectible = await Collectible.deploy(owner.address);
    });

    it("should have the right name and symbol", async () => {
      const name = await collectible.name();
      const symbol = await collectible.symbol();
      expect(name).to.equal("Marvels");
      expect(symbol).to.equal("MARV");
    });

    it("it should have right owner", async () => {
      const [owner] = await ethers.getSigners();

      const contractOwner = await collectible.owner();
      expect(contractOwner).to.equal(owner.address);
    });

    describe("mint", function () {
      it("should mint a single nft", async () => {
        const [owner, addr1] = await ethers.getSigners();

        const tx = await collectible.connect(addr1)["mint()"]({
          value: ethers.utils.parseEther("0.01"),
        });

        const receipt = await tx.wait();
        expect(receipt.status).to.equal(1);

        expect(await collectible.balanceOf(addr1.address)).to.equal(1);
      });

      it("should mint a specified number of nft", async () => {
        const [owner, addr1] = await ethers.getSigners();

        const tx = await collectible.connect(addr1)["mint(uint256)"](4, {
          value: ethers.utils.parseEther("0.04"),
        });

        const receipt = await tx.wait();
        expect(receipt.status).to.equal(1);

        expect(await collectible.balanceOf(addr1.address)).to.equal(5);
      });
    });

    describe("tokenURI", function () {
      it("Should return the correct tokenURI", async function () {
        const token = await collectible.tokenURI(1);
        expect(token).to.equal(
          "https://bafybeibhqislilo36kh2bhepzilr44hgfzpkngnf2x3tbuhopg4qb3fuha.ipfs.dweb.link/metadata/1"
        );
      });
    });

    describe("withdraw", function () {
      it("it should send funds to the owner", async () => {
        const provider = ethers.provider;
        const [owner] = await ethers.getSigners();

        const ownerBalanceBefore = await owner.getBalance();
        const contractBalanceBefore = await provider.getBalance(
          collectible.address
        );

        const totalSupply = await collectible.totalSupply();
        const withdrawTx = await collectible.withdraw();
        const receipt = await withdrawTx.wait();
        expect(receipt.status).to.equal(1);

        const contractBalanceAfter = await provider.getBalance(
          collectible.address
        );

        const ownerBalanceAfter = await owner.getBalance();

        expect(contractBalanceAfter).to.equal(0);
        expect(ownerBalanceAfter).to.greaterThan(ownerBalanceBefore);
      });
    });
  });
});
