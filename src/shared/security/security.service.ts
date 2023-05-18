import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Encrypted } from './interfaces/encrypted';

const algorithm = 'aes-256-cbc';

@Injectable()
export class SecurityService {

    /**
     * Crea el hash para la contraseña del usuario
     * @param password Contraseña introducida por el usuario
     */
    async hash(password: string): Promise<string>{
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch (error) {
            return undefined;
        }
    }
    getCryptoKey(): string{
        return crypto.createHash('sha256').update(String('TjWnZr4u7a!A%D*G-JaPdRgUkXp2s5v8y/B?E(H+MbPeShVwYq3t8w9z$C&F)J@N')).digest('base64').substr(0, 32);
    }
    /**
     * Compara si la contraseña que introdujo el usuario es la misma que está guardada en la BD
     * @param password Contraeña introducida por el usuario
     * @param hash Hash guardado en la BD
     */
    async compareHash(password, hash): Promise<boolean>{
        return new Promise((res, rej) => {
            try {
                bcrypt.compare(password, hash, (error, result) => {
                    res((result)?true:false);
                });
            } catch (error) {
                rej(false);
            }
        });
    }

    /**
     * Se encripta un texto con una llave de 256 bits, y esta misma va a servir para desencriptarlo luego
     * @param text texto de cualquier tamaño que se quiera encriptar
     * @param key llave secreta con la que se va a encriptar el texto, debe ser de 32 Bytes (256 bits)
     */
    async encrypt(text: string): Promise<Encrypted> {
        return new Promise((res,rej)=>{
            try {
                // crea el hash de la key; necesaria para encriptar, el key debe ser de 32 Bytes (256 bits), por eso se hace el substr
                const cryptoKey = this.getCryptoKey();
                const iv = crypto.randomBytes(16); // Vector de inicialización
                // Se declara el cipher, encargado de encriptar
                const cipher = crypto.createCipheriv(algorithm, cryptoKey, iv);
        
                // Proceso de encriptación
                let encrypted = '';
                cipher.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = cipher.read())) {
                        encrypted += chunk.toString('hex');
                    }
                });
                cipher.on('end', () => {
                    // Ya ha terminado de encriptar
                    res({ iv: iv.toString('hex'), data: encrypted });
                });
                // Aquí se le pasa el texto que se quiere encriptar
                cipher.write(text);
                cipher.end();
            } catch (error) {
                console.log("error:", error);
                rej(false);
            }
        });
    }

    /**
     * Desencripta un texto con la misma llave de 256 bits que usó para encriptarlo en el método "encrypt" de este mismo servicio
     * @param encrypted Objeto encriptado con el método encrypt de este mismo servicio
     * @param key Llave que se utilizó para encriptar el texto el encrypt, es necesaria para poder desencriptar, debe ser de 32 Bytes (256 bits)
     */
    async decrypt(encrypted: Encrypted): Promise<string> {
        return new Promise((res, rej) => {
            try {
                // crea el hash de la key; necesaria para encriptar, el key debe ser de 32 Bytes (256 bits), por eso se hace el substr
                const cryptoKey = this.getCryptoKey();
                const iv = Buffer.from(encrypted.iv, 'hex');// Vector de inicialización guardado al momento de hacer encrypt
                // Se declara el decipher, encargado de desencriptar
                const decipher = crypto.createDecipheriv(algorithm, cryptoKey, iv);
        
                // Proceso de desencriptación
                let decrypted = '';
                decipher.on('readable', () => {
                    let chunk;
                    while (null !== (chunk = decipher.read())) {
                        decrypted += chunk.toString('utf8');
                    }
                });
                decipher.on('end', () => {
                    // Ya ha terminado de desencriptar
                    res(decrypted);
                });
                // Aquí se le pasa la data encriptada anteriormente en el encrypt
                decipher.write(encrypted.data, 'hex');
                decipher.end();
            } catch (error) {
                console.log("error:", error);
                rej(false);
            }
        });
    }
    
}
