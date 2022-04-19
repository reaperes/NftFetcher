const _ = require('lodash');

const NftFetcher = artifacts.require("NftFetcher");
const TestNft = artifacts.require("TestNft");

contract('NftFetcher', accounts => {
  let fetcher;
  let nft;

  const deployer = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    fetcher = await NftFetcher.new();
    nft = await TestNft.new();

    for (let i=0; i<10; i++) {
      if ([1, 3, 9].includes(i)) {
        await nft.mint(deployer);  // mint 1, 3, 9
      } else {
        await nft.mint(user);  // mint others
      }
    }
  });

  it('#getTokenIdsOf should response all owned token ids', async () => {
    const res = await fetcher.getTokenIdsOf(nft.address, deployer, 0, 0);
    assert(res.length === 3);
    assert(res[0].toNumber() === 1);
    assert(res[1].toNumber() === 3);
    assert(res[2].toNumber() === 9);
  });

  it('#getTokenIdsOf should response 1 when limit is 1', async () => {
    const res = await fetcher.getTokenIdsOf(nft.address, deployer, 0, 1);
    assert(res.length === 1);
    assert(res[0].toNumber() === 1);
  });

  it('#getTokenIdsOf should response token id 3 when offset is 1 and limit is 1', async () => {
    const res = await fetcher.getTokenIdsOf(nft.address, deployer, 1, 1);
    assert(res.length === 1);
    assert(res[0].toNumber() === 3);
  });

  it('#getTokenIdsOf should response 2 ids when offset is 1 and limit is 0', async () => {
    const res = await fetcher.getTokenIdsOf(nft.address, deployer, 1, 0);
    assert(res.length === 2);
    assert(res[0].toNumber() === 3);
    assert(res[1].toNumber() === 9);
  });
});
