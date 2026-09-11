import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString, MinLength, IsNotEmpty, isEmail} from "class-validator"

export class RegisterDto{

    @ApiProperty({example: "John Doe"})
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({example: "JohnDoe@gmail.com"})
    @IsEmail()
    email!: string;

    @ApiProperty({example: "passoword123", minLength: 8})
    @IsString()
    @MinLength(8)
    password!: string;
}