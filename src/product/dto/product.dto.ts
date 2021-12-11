import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional, Length, IsBoolean, IsJSON, IsArray } from 'class-validator';
import { User } from 'src/user/user.entity';

export class ProductDTO {
    @IsOptional()
    id?: string;

    @IsNotEmpty({ message: `infome o titulo!` })
    @IsString({ message: `o titulo deve ser de tipo textual!` })
    @Length(3, 100)
    title: string;

    @IsNotEmpty({ message: `infome o titulo!` })
    @IsString({ message: `o titulo deve ser de tipo textual!` })
    @Length(10, 255)
    description: string;

    @IsNotEmpty({ message: `infome o titulo!` })
    @IsNumber({ maxDecimalPlaces: 3 })
    unitPrice: number;

    @IsOptional()
    @IsString({ message: `o titulo deve ser de tipo textual!` })
    @Length(3, 100)
    thumbnail?: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsNotEmpty({ message: `ìnforme os detalhes do produto!` })
    @IsJSON({ message: `os detalhes do produto devem ser json` })
    details: JSON;

    @IsNotEmpty({ message: `informe os usuários gerenciadores desse produto!` })
    @Type(() => User)
    @IsArray({ each: true })
    stockers: User[];

    @IsOptional()
    @Type(() => User)
    author?: User;
}