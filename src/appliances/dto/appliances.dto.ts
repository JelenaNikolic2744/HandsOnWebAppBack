import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AppliancesDto {

    /**
    * @description Parameter job name
    * @type string
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsNumber()
    jobId: number;

    /**
    * @description Parameter job description
    * @type string
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsString()
    userName: string;

    /**
    * @description Parameter company name
    * @type string
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    @IsString()
    applianceText: string;

}
