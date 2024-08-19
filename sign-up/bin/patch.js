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

patchFetch();
