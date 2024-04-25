import {
  CHAIN_ID,
  Client,
  ClientFactory,
  IAccount,
  IBaseAccount,
  IProvider,
  ProviderType,
  WalletClient,
} from "@massalabs/massa-web3";
import * as dotenv from "dotenv";

dotenv.config();


if (!process.env.SECRET_KEYS) {
  throw new Error(
    'SECRET_KEYS is not set. Did you create environment file ".env" ?'
  );
}

const secretKeys: string[] = process.env.SECRET_KEYS.split(',');

const accounts: IAccount[] = [];
const customClients: Client[] = [];
const _baseAccounts: (IBaseAccount | null)[] = [];

const node_net: Array<IProvider> = [
  {
    url: "http://127.0.0.1:33035",
    type: ProviderType.PUBLIC,
  },
  {
    url: "http://127.0.0.1:33034",
    type: ProviderType.PRIVATE,
  },
];

for (const secretKey of secretKeys) {
  const account = await WalletClient.getAccountFromSecretKey(secretKey);

  const customClient = await ClientFactory.createCustomClient(
    node_net,
    CHAIN_ID.MainNet,
    true,
    account
  );

  accounts.push(account);
  customClients.push(customClient);
  _baseAccounts.push(customClient.wallet().getBaseAccount());
}

export default customClients;
export const baseAccounts = _baseAccounts;