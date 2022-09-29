import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import {CoursesModule} from '../../src/courses/courses.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCourseDto } from '../../src/courses/dto/create-course.dto';

describe('Courses: /courses', () => {
  let app: INestApplication;

  const course: CreateCourseDto = {
    name: 'Nestjs com TypeORM',
    description: 'Criando apis restful com nestjs',
    tags: ['nestjs', 'typeorm', 'nodejs', 'typescript']
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'docker',
        database: 'testdb',
        autoLoadEntities: true,
        synchronize: true,
      })],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        //permite apenas os dados q estão no dto
        whitelist: true,
        //se passar dado q n ta no dto via payload, bate erro
        forbidNonWhitelisted: true,
        //transforma o payload em dto
        transform: true,
      }),
    );
    
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Create POST /courses', () => {
    return request(app.getHttpServer())
      .post('/courses')
      .send(course)
      .expect(HttpStatus.CREATED)
      .then(({body}) => {
        const expectdCourse = jasmine.objectContaining({
          ...course,
          tags: jasmine.arrayContaining(
            course.tags.map(
              name => jasmine.objectContaining({name})
            )
          )
        })
        expect(body).toEqual(expectdCourse)
      })
  });
});