const fs = require('fs');

const patchFetchPrivate = () => {
  // In webview, fetch with no-referrer throws an error!
  const fpath = 'node_modules/@stacks/common/dist/esm/fetchUtil.js';
  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n')

  const outs = [];
  for (const line of lines) {
    if (
      line.includes("referrer: 'no-referrer',") ||
      line.includes("referrerPolicy: 'no-referrer',")
    ) continue;
    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

const patchWalletSdk = () => {
  // Use new Stacks apis instead of the old one
  const fpath = 'node_modules/@stacks/wallet-sdk/dist/utils.js';
  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.split('\n')

  const outs = [];
  for (const line of lines) {
    if (line === '    const url = `https://core.blockstack.org/v1/names/${name}`;') {
      outs.push('    const url = `https://stacks-node-api.mainnet.stacks.co/v1/names/${name}`;');
      continue;
    }

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n'));
};

patchFetchPrivate();
patchWalletSdk();
