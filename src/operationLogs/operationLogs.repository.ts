import { Repository, EntityRepository } from 'typeorm';
import { Log } from './log.entity';
import { OperationLogsDTO } from './dto/operationLogs.dto';
import { LogFiltersDto } from './dto/logFilters.dto';

@EntityRepository(Log)
export class OperationLogsRepository extends Repository<Log> {

  public async saveOperationLogs(
    operationLogsDto: OperationLogsDTO,
  ) {
    const { id, operation_type, object_type, data } = operationLogsDto;

    const log = new Log();
    log.id = id ? id : null;
    log.operation_type = operation_type;
    log.object_type = object_type;
    log.data = data;

    await log.save();
  }

  public async getAllWithFilters(logFilter: LogFiltersDto): Promise<Log[]> {
    const { object_type, operation_type, object_id } = logFilter;
    
    const query = this.createQueryBuilder('log');

    if (operation_type) query.orWhere('log.operation_type LIKE :search', { search: `%${operation_type}%` });
    if (object_type) query.orWhere('log.object_type LIKE :search', { search: `%${object_type}%` });
    if (object_id) {
      query.orWhere('log.data.body.id = :search', { search: `%${object_id}%` });
    }
    
    query.orderBy("log.id", "DESC");
    const fetch = await query.getMany();

    return fetch;
  }
}