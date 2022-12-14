import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot(
    // {
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'thur',
    //   password: '123123',
    //   database: 'db_devtraining',
    //   autoLoadEntities: true,
    //   //synchronize: true,
    // }
    
    //config de banco de dados para docker-compose
    {
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'cursonestjs',
      entities: [__dirname + '/**/*.entity.js'],
      autoLoadEntities: false,
      synchronize: false,
    }
    
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
