import { EntityRepository, Repository } from "typeorm";
import { settings } from "./settings.entity";



@EntityRepository(settings)
export class SettingsRepository extends Repository<settings> {}