import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CompanyDto {

    /**
    * @description Parameter company id
    * @type number
    * @memberof CompanyDto
    */
    @IsOptional()
    @IsNumber()
    companyId: number;

    /**
    * @description Parameter company name
    * @type string
    * @memberof CompanyDto
    */
    @IsNotEmpty()
    @IsString()
    companyName: string;

}

export class CompanyIdDto {

    /**
    * @description Parameter company id
    * @type number
    * @memberof CompanyIdDto
    */
    @IsNotEmpty()
    @IsNumber()
    companyId: number;

}

