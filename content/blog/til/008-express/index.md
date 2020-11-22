---
layout: post
title: 'Express.js 서버 개발 첫걸음 딛기'
date: '2020-11-22T18:35:10.169Z'
tags: ['expressjs', 'javascript']
thumbnail: expressjs.png
---

express.js는 가장 유명한 Node.js기반 웹프레임워크다.

이미 조약하게나마 몇번 써본 경험이 있기 때문에 Hello World는 건너 뛰고, 프로답게 사용하기 위한 방법/팁들을 배우고 정리해보겠다.

_(틀린 내용이 있을 수 있습니다! 댓글로 피드백 주세용)_

# Bulletproof node.js project architecture

사용할 구조는 Bulletproff architecture다. ([원글 링크](https://softwareontheroad.com/ideal-nodejs-project-structure/), [번역본 링크](https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0))

이 구조의 특징은 다음과 같다.

1. 3 계층 설계: Controller, Service Layer, Data Access Layer
2. Pub/Sub 계층 (+ event emitter)
3. 의존성 주입(=Dependency Injextion): [링크](https://velog.io/@wlsdud2194/what-is-di) [typedi](https://www.npmjs.com/package/typedi)
4. 스케줄링 및 반복 작업: [agenda.js 링크](https://softwareontheroad.com/nodejs-scalability-issues/)
5. env, secret 파일 : dotenv 사용
6. loaders : Node.js 서비스의 시작 프로세스를 테스트 가능한 모듈로 나누자.

# express에 대해서

1. Router
2. express.Application(app.head, app.enalbe, app.use)
3. body-parser
4. cors
5. express-jwt vs jsonwebtoken

# Librarys

Expressjs 서버 개발을 도와주는 다양한 라이브러리들이 있다.
자세한 설명은 각각 따로 포스팅 해야할듯하다.

1. typedi<br>
   의존성 주입에 사용된다. (Container, Service)
2. reflect-metadata<br>
   javascript에서 reflection, decorator를 사용할 수 있게 해준다고한다. 리플렉션이 뭔지부터 찾아봐야할듯 (= 변수의 타입을 체크하고 객체의 구조를 탐색하는 과정)<br>

   - add additional metadata to a class in a consistent manner.<br>
   - consistent approach for various tools and libraries

3. agenda
4. event-dispatch
5. winston
6. mongoose
7. 암호화: argon2, crypto

# 더 공부할 것들

- [Node + MongoDB + Elasticsearch](https://medium.com/@rahulsamant_2674/node-mongodb-elasticsearch-a92002991ad0)

### Refs

- [견고한 node.js 프로젝트 설계하기](https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0)
