import { ApiProperty } from "@nestjs/swagger";

export class SignUpRsp{
    @ApiProperty({type: String})
    email: string;
}
export interface LoginRsp {
    token : string ;
    email:string;
    id:string;
}
