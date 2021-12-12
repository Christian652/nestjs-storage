import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class SettingDTO {
    @IsOptional()
    id?: string;

    @IsNotEmpty({ message: `infome a chave!` })
    @IsString({ message: `o chave deve ser de tipo textual!` })
    @Length(3, 255)
    key: string;

    @IsNotEmpty({ message: `infome o valor!` })
    @IsString({ message: `o valor deve ser de tipo textual!` })
    @Length(3, 255)
    value: string;
}