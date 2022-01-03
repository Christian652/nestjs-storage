import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class settingsDTO {

    @IsOptional()
    id: number;

    @IsString({message: 'o campo tem que ser do tipo texto'})
    @IsNotEmpty({message: 'preencha o campo'})
    key: string;

    @IsString({message: 'o campo tem que ser do tipo texto'})
    @IsNotEmpty({message: 'preencha o campo'})
    value: string;

}