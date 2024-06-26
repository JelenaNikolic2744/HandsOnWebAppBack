import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AppliancesDto {

    /**
    * @description Parameter job id
    * @type number
    * @memberof AppliancesDto
    */
    @IsNotEmpty()
    @IsNumber()
    jobId: number;

    /**
    * @description Parameter user name
    * @type string
    * @memberof AppliancesDto
    */
    @IsNotEmpty()
    @IsString()
    userName: string;

    /**
    * @description Parameter user email
    * @type string
    * @memberof AppliancesDto
    */
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    userEmail: string;

    /**
    * @description Parameter appliance text
    * @type string
    * @memberof AppliancesDto
    */
    @IsNotEmpty()
    @IsString()
    applianceText: string;
}
