import { Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"

@Injectable()
export class PasswordHasherService{
    // convert into protected password
    async hashPassword(password:string){
        return await bcrypt.hash(password,10)
    }
    //convert bcrypt passwoord back into string
    async comparepassword(plaintext,encryptedPassword):Promise<boolean>{
        return await bcrypt.compare(plaintext,encryptedPassword);
    }
}