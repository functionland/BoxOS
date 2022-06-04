import { DID } from 'dids'
import {ethers, utils } from 'ethers'
import secp256k1 from 'secp256k1';
import createKeccakHash from 'keccak';
import KeyResolver from 'key-did-resolver'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import {Buffer} from 'buffer';
/**
 * @class FullaDID
 * @description Creates Decentrilized Identity for Clinet side application
 * based on Ed25519 Private Key - Edwards-curve Digital Signature Algorithm(EdDSA)
 */

interface IFulaDID {
    privateKey: string;
    address: string;
    mnemonic: string;
    authDID: string;
    did: any;
}

export class FulaDID implements IFulaDID {
    privateKey!: string;
    address!: string;
    mnemonic!: string;
    authDID!: string;
    did: any;
    /**
     * This private function only class functions can use it
     * @function didProvider()
     * @property privateKey
     * @returns  authDID
     */
    private async didProvider () {
        const pvkey=this.privateKey.replace("0x","")
        const seed=Buffer.from(pvkey, 'hex');
        const provider = new Ed25519Provider(seed)
        this.did = new DID({ provider, resolver: KeyResolver.getResolver() })
        return this.did.authenticate();
    }
    /**
     * Creates mnemocic phrase and private key
     * @function create()
	 * @returns Object - {authDID, privateKey, mnemonic}
	 */
    async create () {
        const wallet = ethers.Wallet.createRandom()
        this.mnemonic = wallet.mnemonic.phrase
        this.privateKey = wallet.privateKey
        let pubKey = secp256k1.publicKeyCreate(new Uint8Array(Buffer.from(this.privateKey.slice(2), 'hex')), false);
        let compresedPubKey = secp256k1.publicKeyConvert(pubKey, true);
        this.address = wallet.address
        this.authDID = await this.didProvider();
        return {
            mnemonic: this.mnemonic,
            privateKey: this.privateKey,
            address: this.address,
            publicKey: Buffer.from(compresedPubKey).toString('hex'),
            authDID: this.authDID
        }
    }
    /**
     * Improt mnemonic phrases (12 random words)
     * @function importMnemonic()
     * @param mnemonic: string
	 * @returns Object - {authDID, privateKey}
	 */
    async importMnemonic (mnemonic: string) {
        const hdwallet = utils.HDNode.fromMnemonic(mnemonic);
        this.privateKey = hdwallet.derivePath(`m/44'/60'/0'/0/0`).privateKey //.getPrivateKey().toString('hex')
        let pubKey = secp256k1.publicKeyCreate(new Uint8Array(Buffer.from(this.privateKey.slice(2), 'hex')), false);
        let compresedPubKey = secp256k1.publicKeyConvert(pubKey, true);
        let address = createKeccakHash('keccak256').update(Buffer.from(pubKey)).digest().slice(-20);
        this.authDID = await this.didProvider();
        return {
            address: address.toString('hex'),
            publicKey: Buffer.from(compresedPubKey).toString('hex'),
            privateKey: this.privateKey,
            authDID: this.authDID
        }
    }
    /**
     * Improt existing privateKey
     * @function importPrivateKey()
     * @param privateKey: string
	 * @returns Object - {authDID, privateKey}
	 */
    async importPrivateKey (privateKey: string) {
        this.privateKey = privateKey;
        let pubKey = secp256k1.publicKeyCreate(new Uint8Array(Buffer.from(this.privateKey.slice(2), 'hex')), false);
        let compresedPubKey = secp256k1.publicKeyConvert(pubKey, true);
        let address = createKeccakHash('keccak256').update(Buffer.from(pubKey)).digest().slice(-20);
        this.authDID = await this.didProvider();
        return {
            address: address.toString('hex'),
            publicKey: Buffer.from(compresedPubKey).toString('hex'),
            privateKey: this.privateKey,
            authDID: this.authDID
        }
    }
}
