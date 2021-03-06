const { ethers } = require('hardhat')

//npx hardhat run scripts/1_deploy.js --network <network-name>

async function main () {
  const PROXY_OPENSEA = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
  const CONTRACT_URI = 'QmTs8Ycbfz1tHaGaGxZqHM2H1MFwDbFZfNTQr3cdJtXvKn'
  const TESTTOKEN_URI = 'QmUxWV87rKxRWsdv1VNUXsXeQNpcEx5wxVWPDvWm9K9P2T'
  
  const NotFasterThanLight = await ethers.getContractFactory("NotFasterThanLight");
  const nftl = await NotFasterThanLight.deploy(PROXY_OPENSEA);

  await nftl.deployed()
  console.log('nftl contract deployed to:', nftl.address)

  await nftl.setContractURI(CONTRACT_URI)
  await nftl.recordToken(TESTTOKEN_URI)
  const tokenURI = await nftl.getTokenURI()
  console.log("tokenURI", tokenURI)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
