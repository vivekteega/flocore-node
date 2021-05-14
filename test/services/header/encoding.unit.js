'use strict';

var should = require('chai').should();

var Encoding = require('../../../lib/services/header/encoding');

describe('Header service encoding', function() {

  var servicePrefix = Buffer.from('0000', 'hex');

  var hashPrefix = Buffer.from('00', 'hex');
  var heightPrefix = Buffer.from('01', 'hex');
  var encoding = new Encoding(servicePrefix);
  var hash = '91b58f19b6eecba94ed0f6e463e8e334ec0bcda7880e2985c82a8f32e4d03add';
  var hashBuf = Buffer.from(hash, 'hex');
  var header = {
    hash: hash,
    prevHash: '91b58f19b6eecba94ed0f6e463e8e334ec0bcda7880e2985c82a8f32e4d03ade',
    version: 0x2000012,
    merkleRoot: '91b58f19b6eecba94ed0f6e463e8e334ec0bcda7880e2985c82a8f32e4d03adf',
    timestamp: 1E9,
    bits: 400000,
    nonce: 123456,
    height: 123,
    chainwork: '0000000000000000000000000000000000000000000000000000000200020002',
    nextHash: '91b58f19b6eecba94ed0f6e463e8e334ec0bcda7880e2985c82a8f32e4d03ade'
  };
  var versionBuf = Buffer.alloc(4);
  var prevHashBuf = Buffer.from(header.prevHash, 'hex');
  var nextHashBuf = Buffer.from(header.nextHash, 'hex');
  var merkleRootBuf = Buffer.from(header.merkleRoot, 'hex');
  var tsBuf = Buffer.alloc(4);
  var bitsBuf = Buffer.alloc(4);
  var nonceBuf = Buffer.alloc(4);
  var heightBuf = Buffer.alloc(4);
  var chainBuf = Buffer.from('0000000000000000000000000000000000000000000000000000000200020002', 'hex');
  heightBuf.writeUInt32BE(header.height);

  it('should encode header hash key' , function() {
    encoding.encodeHeaderHashKey(hash).should.deep.equal(Buffer.concat([servicePrefix, hashPrefix, hashBuf]));
  });

  it('should decode header hash key', function() {
    encoding.decodeHeaderHashKey(Buffer.concat([servicePrefix, hashPrefix, hashBuf]))
    .should.deep.equal(hash);
  });

  it('should encode header height key' , function() {
    encoding.encodeHeaderHeightKey(header.height).should.deep.equal(Buffer.concat([servicePrefix, heightPrefix, heightBuf]));
  });

  it('should decode header height key', function() {
    encoding.decodeHeaderHeightKey(Buffer.concat([servicePrefix, heightPrefix, heightBuf]))
    .should.deep.equal(header.height);
  });
  it('should encode header value', function() {
    var prevHashBuf = Buffer.from(header.prevHash, 'hex');
    versionBuf.writeInt32BE(header.version); // signed
    tsBuf.writeUInt32BE(header.timestamp);
    bitsBuf.writeUInt32BE(header.bits);
    nonceBuf.writeUInt32BE(header.nonce);
    heightBuf.writeUInt32BE(header.height);
    encoding.encodeHeaderValue(header).should.deep.equal(Buffer.concat([
      hashBuf,
      versionBuf,
      prevHashBuf,
      merkleRootBuf,
      tsBuf,
      bitsBuf,
      nonceBuf,
      heightBuf,
      chainBuf,
      nextHashBuf
    ]));
  });

  it('should decode header value', function() {
    encoding.decodeHeaderValue(Buffer.concat([
      hashBuf,
      versionBuf,
      prevHashBuf,
      merkleRootBuf,
      tsBuf,
      bitsBuf,
      nonceBuf,
      heightBuf,
      chainBuf,
      nextHashBuf
    ])).should.deep.equal(header);
  });
});

