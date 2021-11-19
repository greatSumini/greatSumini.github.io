---
layout: post
title: 'Nest.js 프로젝트 견고하게 구조화하기 1 - Config, Providers'
date: '2021-11-19T13:52:10.169Z'
tags: ['nest.js']
thumbnail: nest.jpg
---

이번 글에서는 꽤 오랫동안 NestJS를 사용하면서, 제가 만든 대부분의 프로젝트에서 사용중인 구조를 공유해보도록 하겠습니다.

NestJS를 처음 접하셨거나 구조가 뭔가 애매하다고 느끼는 개발자분들에게 도움이 됐으면 좋겠습니다 😄

## Before Getting Started

Rest API, TypeORM(MySQL), JWT 인증을 사용하는 프로젝트를 기준으로 설명합니다.

GraphQL을 사용하거나 다른 종류의 인증 방식을 사용하셔도 크게 프로젝트 구조가 달라지지 않으니 걱정마세요!

## Directory Structure 📂

프로젝트를 구성하는 directory들입니다. 각 section의 용도는 아래에서 더 자세히 설명하겠습니다.

```shell
src
├── auth
│   ├── decorators
│   ├── dtos
│   ├── exceptions
│   ├── guards
│   └── interfaces
├── common
│   ├── decorators
│   ├── dtos
│   ├── entities
│   ├── exceptions
│   ├── helpers
│   └── interfaces
├── config
│   ├── app
│   ├── database
│   │   └── mysql
│   └── jwt
├── database
│   ├── migrations
├── modules
│   ├── item
│   │   ├── brands
│   │   │   ├── entities
│   │   │   ├── interfaces
│   │   │   └── repositories
│   │   └── items
│   │       ├── entities
│   │       ├── interfaces
│   │       └── repositories
│   └── user
│       └── users
│           ├── entities
│           ├── interfaces
│           └── repositories
├── providers
|   ├── aws
│   │   ├── s3
│   │   └── sqs
|   ├── cache
│   │   └── redis
│   ├── database
│   │   └── postgres
│   └── elasticsearch
│       ├── helpers
│       └── types
├── app.controller.ts
├── app.module.ts
└── main.ts
```

## Config ⚙️

`config/` 폴더에는 상황에 따라 필요한 환경변수들이 들어있습니다.

[@nestjs/config](https://github.com/nestjs/config)를 사용합니다.

```shell
src/config
├── app
│   ├── config.module.ts
│   ├── config.service.ts
│   ├── configuration.ts
│   └── index.ts
├── database
│   └── mysql
│       ├── config.module.ts
│       ├── config.service.ts
│       ├── configuration.ts
│       └── index.ts
└── jwt
    ├── config.module.ts
    ├── config.service.ts
    ├── configuration.ts
    └── index.ts
```

각 파일의 용도는 다음과 같습니다.
- `index.ts`: 다른 모듈들을 export하는 barrel
- `configuration.ts`: **process.env** 환경 변수들을 읽어 `@nestjs/config`에 등록합니다.
- `config.service.ts`: 외부 모듈들에 각 config 값들을 노출시켜주는 인터페이스 역할을 수행합니다.
- `config.module.ts`: **ConfigModule.forRoot**를 호출하고 service를 외부 모듈들에 export합니다.

파일들의 자세한 내용은 [Creating Config Files in NestJS](https://medium.com/the-crowdlinker-chronicle/creating-config-files-in-nestjs-dcd059ae15e4) 글을 참고해주세요~

## Providers 📥

Provider는 외부 provider 엔진과 앱을 연결시켜주는 모듈들로 구성됩니다. (e.g. 데이터베이스, 검색엔진, ...)

설정 및 연결을 위한 Module 파일 1개로 구성되는 경우도 있고, 필요에 따라 그 모듈을 잘 활용할 수 있도록 도와주는 Service를 추가할 수도 있습니다.

이때 Service에는 provider 자체를 활용하는 기능만 추가하고, 비즈니스 로직은 포함하지 않습니다.

```shell
src/providers
├── aws
│   ├── s3
│   │   ├── index.ts
│   │   ├── s3.module.ts
│   │   └── s3.service.ts
│   └── sqs
│       ├── index.ts
│       └── sqs.module.ts
├── cache
│   └── redis
│       ├── redis.module.ts
│       ├── redis.service.ts
│       └── index.ts
├── database
│   └── mysql
│       ├── index.ts
│       └── mysql.module.ts
└── elasticsearch
    ├── helpers
    ├── types
    ├── elasticsearch.module.ts
    ├── elasticsearch.service.ts
    └── index.ts
```

<br />

`~~~.module.ts` 파일은 보통 아래와 같이 config로부터 값을 주입 받아 Provider별 외부 모듈을 등록합니다.


```tsx
import { Module } from '@nestjs/common';
import {
  ElasticsearchModule,
  ElasticsearchModuleAsyncOptions,
  ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';

import {
  ElasticsearchConfigModule,
  ElasticsearchConfigService,
} from '@config/providers/elasticsearch';

import { ElasticsearchService } from './provider.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ElasticsearchConfigModule],
      useFactory: async (configService: ElasticsearchConfigService) =>
        ({
          node: configService.node,
          auth: {
            username: configService.username,
            password: configService.password,
          },
        } as ElasticsearchModuleOptions),
      inject: [ElasticsearchConfigService],
    } as ElasticsearchModuleAsyncOptions),
  ],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchProviderModule {}
```

<br />

생성한 모듈을 `AppModule`에서 import하시면 됩니다.

```tsx
@Module({
  imports: [
    ... ,
    ElasticsearchProviderModule,
    ... ,
  ],
  controllers: [AppController],
})
export class AppModule {
```

대부분의 Provider 모듈(typeorm, redis, ...)들을 위와 같은 방식으로 등록할 수 있습니다.

(`forRootAsync`, `registerAsync` 대신 `forRoot`, `register` 메소드를 사용해 동기적으로 등록하는 방법도 있지만 `@nestjs/config`에 등록된 환경변수 값을 활용할 수 없기 때문에 많은 경우 확장성 측면에서 문제가 있습니다.)

## 다음에 계속
