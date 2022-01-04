import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SettingsRepository } from "./settings.repository";


@Injectable()
export class SettingsService{
    constructor(
        @InjectRepository(SettingsRepository)
        private SettingsService: SettingsRepository,
    ) {}
}