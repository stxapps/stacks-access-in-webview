const fs = require('fs');

const replaceMatchedLine = (fpath, actionObjs) => {
  const text = fs.readFileSync(fpath, 'utf-8');
  const lines = text.trim().split(/\r?\n/);

  const outs = [];
  for (const line of lines) {
    let didMatch = false;
    for (const actionObj of actionObjs) {
      const { match, repmt } = actionObj;
      if (line === match) {
        outs.push(repmt);
        didMatch = true;
        break;
      }
    }
    if (didMatch) continue;

    outs.push(line);
  }

  fs.writeFileSync(fpath, outs.join('\n') + '\n');
};

const patchFetch = () => {
  let match = '    Object.assign(fetchOpts, defaultFetchOpts, init);';
  let repmt = "    const inputUrl = new URL(input); if (inputUrl.host.includes('hiro.so') || inputUrl.host.includes('stacks.co') || inputUrl.host.includes('blockstack.org')) { Object.assign(fetchOpts, defaultFetchOpts, init); } else { Object.assign(fetchOpts, { referrerPolicy: 'origin' }, init); }";
  replaceMatchedLine(
    'node_modules/@stacks/network/dist/fetch.js',
    [{ match, repmt }],
  );
  replaceMatchedLine(
    'node_modules/@stacks/network/dist/esm/fetch.js',
    [{ match, repmt }],
  );
};

const patchCryptoUtils = () => {
  let match = "            const nodeCrypto = require('crypto');";
  let repmt = "            const nodeCrypto = require('crypto-browserify');";
  replaceMatchedLine(
    'node_modules/@stacks/encryption/dist/cryptoUtils.js',
    [{ match, repmt }],
  );
  replaceMatchedLine(
    'node_modules/@stacks/encryption/dist/esm/cryptoUtils.js',
    [{ match, repmt }],
  );
};

const patchInlineChunkHtmlPlugin = () => {
  // github.com/facebook/create-react-app/issues/10752
  // github.com/facebook/create-react-app/pull/10753/files

  let match1 = '        assets.headTags = assets.headTags.map(tagFunction);';
  let repmt1 = '        assets.bodyTags = [...assets.headTags.map(tagFunction), ...assets.bodyTags.map(tagFunction)];';
  let match2 = '        assets.bodyTags = assets.bodyTags.map(tagFunction);';
  let repmt2 = '        assets.headTags = [];';
  replaceMatchedLine(
    'node_modules/react-dev-utils/InlineChunkHtmlPlugin.js',
    [{ match: match1, repmt: repmt1 }, { match: match2, repmt: repmt2 }],
  );
};

patchFetch();
patchCryptoUtils();
patchInlineChunkHtmlPlugin();
