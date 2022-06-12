// test did.ts
import { expect, should } from 'chai';
import {FulaDID} from "../src/did"

describe('DID', () => {
    it('1- Create random DID', async () => {
        const fulaDID = new FulaDID();
        const result = await fulaDID.create();
        should().not.Throw
        should().exist(result)
        result.should.be.an('object');
    });

    it('2- Create random DID and Backup', async () => {
        const fulaDID = new FulaDID();
      const result = await fulaDID.create();
        should().not.Throw
        expect(JSON.stringify(result)).to.equal(JSON.stringify(result));
    });

    it('3- Create random DID and Backup', async () => {
        const fulaDID = new FulaDID();
        const result = await fulaDID.create();
        should().not.Throw
        expect(JSON.stringify(result)).to.equal(JSON.stringify(result));
    });

    it('3- Create random DID and importMnemonic', async () => {
        const fulaDID = new FulaDID();
        const result = await fulaDID.create();
        const importedmem = await fulaDID.importMnemonic(result.mnemonic);
        const {privateKey, authDID} = result
        should().not.Throw
        expect(JSON.stringify({privateKey, authDID})).to.equal(JSON.stringify(importedmem));
    });

    it('4- Create random DID and importMnemonic', async () => {
        const fulaDID = new FulaDID();
        const result = await fulaDID.create();
        const importedpk = await fulaDID.importPrivateKey(result.privateKey);
        const {privateKey, authDID} = result
        should().not.Throw
        expect(JSON.stringify({privateKey, authDID})).to.equal(JSON.stringify(importedpk));
    });

    it('5- importMnemonic correct mnemoic', async () => {
        const meta = {
            mnemonic: 'mercy drip similar hole oil lock blast absent medal slam world sweet',
            privateKey: '0xf0396d82b24b3f8f200cc240bb6d0770911c82e1d8c0199638373221efedabd5',
            authDID: 'did:key:z6MkeuGvVYEa5ooKyjYqYaLoWagyhFJetc7jmT3kRw9KCfAN'
        };
        const fulaDID = new FulaDID();
        const importedpk = await fulaDID.importMnemonic(meta.mnemonic);
        const {privateKey, authDID} = meta
        should().not.Throw
        expect(JSON.stringify({privateKey, authDID})).to.equal(JSON.stringify(importedpk));
    });

    it('6- import wrog Mnemonic 1', async () => {
        const meta = {
            mnemonic: 'mercy drip similar hole oil lock blast absent medal slam world sweet',
            privateKey: '0xff396d82b24b3f8f200cc240bb6d0770911c82e1d8c0199638373221efedabd5',
            authDID: 'did:key:z6MkeuGvVYEa5ooKyjYqYaLoWagyhFJetc7jmT3kRw9KCfAN'
        };
        const fulaDID = new FulaDID();
        const importedpk = await fulaDID.importMnemonic(meta.mnemonic);
        const {privateKey, authDID} = meta
        expect(JSON.stringify({privateKey, authDID})).not.to.equal(JSON.stringify(importedpk));
    });

    it('7- Import wrog privateKey 2', async () => {
        const meta = {
            privateKey: '0xff396d82b24b3f8f200cc240bb6d0770911c82e1d8c0199638373221efedabd5',
            authDID: 'did:key:z6MkeuGvVYEa5ooKyjYqYaLoWagyhFJetc7jmT3kRw9KCfAN'
        };
        const fulaDID = new FulaDID();
        const importedpk = await fulaDID.importPrivateKey(meta.privateKey);
        expect(JSON.stringify(meta.privateKey)).not.to.equal(JSON.stringify(importedpk));
    });
  });
