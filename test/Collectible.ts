import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

describe("NFT", function () {
  let collectible: Contract;

  describe("Collectible", function () {
    it("should deploy Collectible", async () => {
      const Collectible = await ethers.getContractFactory("Collectible");
      collectible = await Collectible.deploy();
    });

    it("should have the right name and symbol", async () => {
      const name = await collectible.name();
      const symbol = await collectible.symbol();
      expect(name).to.equal("Marvels");
      expect(symbol).to.equal("MARV");
    }
  });
});
