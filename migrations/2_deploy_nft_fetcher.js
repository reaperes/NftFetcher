const NftFetcher = artifacts.require("NftFetcher");

module.exports = async function(deployer) {
  await deployer.deploy(NftFetcher);
};
