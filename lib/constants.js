'use strict';


module.exports = {
  BITCOIN_GENESIS_HASH: {
    livenet: '09c7781c9df90708e278c35d38ea5c9041d7ecfcdd1c56ba67274b7cff3e1cea',
    regtest: 'ec42fa26ca6dcb1103b59a1d24b161935ea4566f8d5736db8917d5b9a8dee0d7',
    testnet: '9b7bc86236c34b5e3a39367c036b7fe8807a966c22a7a1f0da2a198a27e03731', //this is testnet3
    testnet5: '000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943' //this is testnet5
  },
  DB_PREFIX: Buffer.from('ffff', 'hex')
};

