import {MigrationInterface, QueryRunner} from "typeorm";

export class a1639240897096 implements MigrationInterface {
    name = 'a1639240897096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, `operation_type` varchar(255) NOT NULL, `object_type` varchar(255) NOT NULL, `data` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `profile_path` varchar(255) NULL, `password_reset_token` varchar(255) NULL, `password_reset_expires` timestamp NULL, `confirmation_token` varchar(255) NULL, `confirmated` tinyint NOT NULL DEFAULT 0, `password` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(100) NOT NULL, `thumbnail` varchar(100) NULL, `status` tinyint NOT NULL DEFAULT '1', `description` text NULL, `unitPrice` decimal(5,2) NOT NULL, `details` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products_stockers_users` (`productsId` int NOT NULL, `usersId` int NOT NULL, INDEX `IDX_a9602f2e9f5e7963e02a3a226d` (`productsId`), INDEX `IDX_ead85b86fceca1656365819f5e` (`usersId`), PRIMARY KEY (`productsId`, `usersId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_76ec85a3cf5734a18f3fecda246` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products_stockers_users` ADD CONSTRAINT `FK_a9602f2e9f5e7963e02a3a226d6` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `products_stockers_users` ADD CONSTRAINT `FK_ead85b86fceca1656365819f5ec` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products_stockers_users` DROP FOREIGN KEY `FK_ead85b86fceca1656365819f5ec`");
        await queryRunner.query("ALTER TABLE `products_stockers_users` DROP FOREIGN KEY `FK_a9602f2e9f5e7963e02a3a226d6`");
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_76ec85a3cf5734a18f3fecda246`");
        await queryRunner.query("DROP INDEX `IDX_ead85b86fceca1656365819f5e` ON `products_stockers_users`");
        await queryRunner.query("DROP INDEX `IDX_a9602f2e9f5e7963e02a3a226d` ON `products_stockers_users`");
        await queryRunner.query("DROP TABLE `products_stockers_users`");
        await queryRunner.query("DROP TABLE `products`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `log`");
    }

}
