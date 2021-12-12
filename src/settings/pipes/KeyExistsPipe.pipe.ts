import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Setting } from '../settings.entity';

@Injectable()
export class KeyExistsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { key, id } = value;
    const setting = await getRepository(Setting).findOne({
      where: [
        { key },
        { id }
      ]
    }); 

    const keyExists = setting.key == key && !value.id;
    const tryEditKey = value.id == setting.id && key !== setting.key;
    
    if (tryEditKey) throw new HttpException(`Não é permitido mudar a chave de configuração ${setting.key}`, HttpStatus.CONFLICT);
    if (keyExists) throw new HttpException(`Já Existe Configuração de Nome ${value.key}`, HttpStatus.CONFLICT);

    return value;
  }
}