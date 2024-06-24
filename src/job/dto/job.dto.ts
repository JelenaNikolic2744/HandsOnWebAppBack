import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class JobDto {

    /**
    * @description Parameter job name
    * @type string
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsString()
    jobName: string;

    /**
    * @description Parameter job description
    * @type string
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsString()
    jobDescription: string;

    /**
    * @description Parameter company name
    * @type string
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsString()
    companyName: string;

}

export class JobIdDto {

    /**
    * @description Parameter job name
    * @type string
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsNumber()
    jobId: number;

}

