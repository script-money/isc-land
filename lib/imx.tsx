import { getConfig, AssetsApi } from '@imtbl/core-sdk';

const ethNetwork = 'mainnet';
const landContract = '0x9e0d99b864e1ac12565125c5a82b59adea5a09cd'; //illuvium land

export const GetLandsFromAnAddress = async (address: string) => {
  const config = getConfig(ethNetwork);
  const assetsApi = new AssetsApi(config.api);

  const response = await assetsApi.listAssets({
    user: address,
    collection: landContract
  });

  const landlist = response.data.result;
  return landlist;
};
