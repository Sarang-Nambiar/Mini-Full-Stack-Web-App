import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "Srank987$",
    "database": "my_nestjs_project",
    "entities": [join(__dirname, '**', '*.entity.{ts,js}')],
    "synchronize": true
}), UsersModule],
})
export class AppModule {}
