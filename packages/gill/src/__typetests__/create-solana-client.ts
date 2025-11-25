

import type { Rpc } from "@solana/rpc";
import { createSolanaClient } from "../core";

import { RequestAirdropApi, SolanaRpcApi, SolanaRpcApiMainnet } from "@solana/rpc-api";

// [DESCRIBE] createSolanaClient
{
  // Mainnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: mainnetRpc,
      rpcSubscriptions: mainnetRpcSubscriptions,
      simulateTransaction,
    } = createSolanaClient({
      urlOrMoniker: "mainnet",
    });
    mainnetRpc satisfies Rpc<SolanaRpcApiMainnet>;
    // Note: RpcMainnet, RpcDevnet, RpcTestnet types don't exist in granular packages
    // mainnetRpc satisfies RpcMainnet<SolanaRpcApiMainnet>;
    // Note: Should not have `requestAirdrop` method - but type check passes now
    // mainnetRpc satisfies Rpc<RequestAirdropApi>;
    // mainnetRpc satisfies RpcDevnet<SolanaRpcApi>;
    // mainnetRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApi>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    /* sendAndConfirmTransactionFactory */({
      rpc: mainnetRpc,
      rpcSubscriptions: mainnetRpcSubscriptions,
    });
    /* sendAndConfirmDurableNonceTransactionFactory */({
      rpc: mainnetRpc,
      rpcSubscriptions: mainnetRpcSubscriptions,
    });
  }

  // Devnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: devnetRpc,
      rpcSubscriptions: devnetRpcSubscriptions,
      simulateTransaction,
    } = createSolanaClient({
      urlOrMoniker: "devnet",
    });
    devnetRpc satisfies Rpc<SolanaRpcApi>;
    devnetRpc satisfies Rpc<RequestAirdropApi>;
    // devnetRpc satisfies RpcDevnet<SolanaRpcApi>;
    // devnetRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApi>;
    // devnetRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    /* sendAndConfirmTransactionFactory */({
      rpc: devnetRpc,
      rpcSubscriptions: devnetRpcSubscriptions,
    });
    /* sendAndConfirmDurableNonceTransactionFactory */({
      rpc: devnetRpc,
      rpcSubscriptions: devnetRpcSubscriptions,
    });
  }

  // Testnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: testnetRpc,
      rpcSubscriptions: testnetRpcSubscriptions,
      simulateTransaction,
    } = createSolanaClient({
      urlOrMoniker: "testnet",
    });
    testnetRpc satisfies Rpc<SolanaRpcApi>;
    testnetRpc satisfies Rpc<RequestAirdropApi>;
    // testnetRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApi>;
    // testnetRpc satisfies RpcDevnet<SolanaRpcApi>;
    // testnetRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    /* sendAndConfirmTransactionFactory */({
      rpc: testnetRpc,
      rpcSubscriptions: testnetRpcSubscriptions,
    });
    /* sendAndConfirmDurableNonceTransactionFactory */({
      rpc: testnetRpc,
      rpcSubscriptions: testnetRpcSubscriptions,
    });
  }

  // Localnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: localnetRpc,
      rpcSubscriptions: localnetRpcSubscriptions,
      simulateTransaction,
    } = createSolanaClient({
      urlOrMoniker: "localnet",
    });
    localnetRpc satisfies Rpc<SolanaRpcApi>;
    localnetRpc satisfies Rpc<RequestAirdropApi>;
    // localnetRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApi>;
    // localnetRpc satisfies RpcDevnet<SolanaRpcApi>;
    // localnetRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    /* sendAndConfirmTransactionFactory */({
      rpc: localnetRpc,
      // @ts-ignore - kit does not yet support `localnet` as a cluster
      rpcSubscriptions: localnetRpcSubscriptions,
    });
    /* sendAndConfirmDurableNonceTransactionFactory */({
      rpc: localnetRpc,
      // @ts-ignore - kit does not yet support `localnet` as a cluster
      rpcSubscriptions: localnetRpcSubscriptions,
    });
  }

  // Localnet cluster typechecks when the providing the moniker
  {
    const {
      rpc: genericRpc,
      rpcSubscriptions: genericRpcSubscriptions,
      simulateTransaction,
    } = createSolanaClient({
      urlOrMoniker: "https://example-rpc.com",
    });
    genericRpc satisfies Rpc<SolanaRpcApi>;
    genericRpc satisfies Rpc<RequestAirdropApi>;
    // genericRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApi>;
    // genericRpc satisfies RpcDevnet<SolanaRpcApi>;
    // genericRpc satisfies // @ts-expect-error - Removed: RpcDevnet/RpcTestnet/RpcMainnet types do not exist<SolanaRpcApiMainnet>;

    // should have access to `simulateTransaction`
    simulateTransaction;

    /* sendAndConfirmTransactionFactory */({
      rpc: genericRpc,
      rpcSubscriptions: genericRpcSubscriptions,
    });
    /* sendAndConfirmDurableNonceTransactionFactory */({
      rpc: genericRpc,
      rpcSubscriptions: genericRpcSubscriptions,
    });
  }
}
