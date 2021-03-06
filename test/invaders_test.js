const { expect } = require("chai");

const PROXY_OPENSEA_MAIN = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
const PROXY_OPENSEA_RINKEBY = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
const CONTRACT_URI = 'QmTs8Ycbfz1tHaGaGxZqHM2H1MFwDbFZfNTQr3cdJtXvKn'
const TESTTOKEN_URI = 'QmUxWV87rKxRWsdv1VNUXsXeQNpcEx5wxVWPDvWm9K9P2T'

describe("DEPLOY NFT", function() {
  let nftl
  it("setup contracts", async function() {
    let NotFasterThanLight = await ethers.getContractFactory("NotFasterThanLight");
    nftl = await NotFasterThanLight.deploy(PROXY_OPENSEA_MAIN);

    await nftl.deployed();
  });

  it("set contract URI", async function() {
    await nftl.setContractURI(CONTRACT_URI)
    const contractURI = await nftl.contractURI()
    expect(contractURI).to.equal("ipfs://"+CONTRACT_URI);
  });

  it("mint a token", async function() {
    await nftl.recordToken(TESTTOKEN_URI)
    const tokenURI = await nftl.tokenURI(1)
    const baseURI = await nftl.baseURI()
    expect(tokenURI).to.equal("ipfs://"+TESTTOKEN_URI);
  });

});
