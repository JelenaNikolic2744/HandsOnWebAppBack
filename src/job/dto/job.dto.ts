import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class JobDto {

    /**
    * @description Parameter job id
    * @type number
    * @memberof JobDto
    */
    @IsOptional()
    jobId: number

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
    * @description Parameter company id
    * @type number
    * @memberof JobDto
    */
    @IsNotEmpty()
    @IsNumber()
    companyId: number;

}

export class JobIdDto {

    /**
    * @description Parameter job id
    * @type number
    * @memberof JobIdDto
    */
    @IsNotEmpty()
    @IsNumber()
    jobId: number;

}

