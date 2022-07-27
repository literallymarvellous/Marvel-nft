import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

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
      // it("should mint a single nft", async () => {
      //   const [owner] = await ethers.getSigners();

      //   const tx = await collectible.mint();

      //   const receipt = await tx.wait();
      //   expect(receipt.status).to.equal(1);

      //   expect(await collectible.balanceOf(owner.address)).to.equal(1);
      // });

      it("should mint a specified number of nft", async () => {
        const [owner] = await ethers.getSigners();

        const tx = await collectible.mint(4);

        const receipt = await tx.wait();
        expect(receipt.status).to.equal(1);

        expect(await collectible.balanceOf(owner.address)).to.equal(4);
      });
    });
  });
});
