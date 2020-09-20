---
layout: post
title: '여러가지 기술스택과 그 용도'
date: '2019-07-09T23:05:40.169Z'
tags: ['introduce']
thumbnail: 'labelstore.png'
---

아는게 전혀 없기 때문에 원티드의 채용공고들을 보며 현업에서 사용되는 기술스택들을 파악했다!

다음은 레이블스토어에서 사용중인 기술스택 목록이다.

1. TypeScript
2. React.js, Next.js : Front-end
3. GraphQL(Apollo, Prisma) : Back-end
4. CircleCI, Docker, EKS(k8s) : 배포 및 Ochestration
5. ESLint, Prettier : 코드 정적 분석
6. Jest, Puppeteer : Unit/E2E 테스트 자동화
7. ELK Stack

### TypeScript

> Microsoft사에서 개발 및 유지 관리하는 오픈 소스 프로그래밍 언어

Javascript의 슈퍼셋이다.<br>
TypeScript로 작성된 코드는 Javascript로 컴파일된 후 인터프리터를 통해 실행된다.<br>
참고링크 : https://hyunseob.github.io/2018/08/12/do-you-need-to-use-ts/

### Next.js

> React에서의 SSR을 위한 도구

적절한 SSR을 적용한 SPA를 만들기 위해선 높은 러닝 커브(client-side routing, page layout, ...)가 요구되는데, Next.js는 이를 간단히 해결할 수 있다.<br><br>
또 Next.js를 사용함으로써 다음을 기대할 수 있다.

1. 서버 사이드 렌더링
2. 보다 빠른 페이지 로드를 위한 자동 코드 분할
3. 간단한 클라이언트 사이드 라우팅 (페이지 기반)
4. HMR(Hot Module Replacement)를 지원하는 Webpack 기반 개발 환경
5. Express를 포함한 어떤 Node.js HTTP 서버로도 구현 가능
6. Babel과 Webpack 설정을 통한 커스터마이징

물론 단점도 있다.

1. 기존 react-router와 호환되지 않는다.
2. 뭐만 하려고 하면 "How to use ~ with Next.js"식으로 찾아봐야함

### GraphQL

> Facebook에서 만든 Application layer query language

기존 REST API 방식을 사용하면 Application의 규모가 커짐에 따라 endpoint 개수가 계속 늘어나게 됨.<br>
GraphQL을 사용함으로써 필요한 정보를 query로 만들어 서버에 전달해주면, 서버가 알아서 Processing한 뒤 주어진 틀대로 데이터를 보여줌

#### **GraphQL의 장점**

1. Node.js, Ruby, PHP, Python, Golang등 여러 환경에서 사용 가능
2. HTTP 프르토콜에 제한돼있지 않아 WebSocket이나 MQTT 프로토콜 위에서도 사용 가능
3. 어떤 데이터베이스를 사용해도 상관 없음
4. 이미 구현된 시스템에 도입해도 기존에 있던 시스템이 무너지지 않음
5. 단순한 사양 - 유연한 사용 가능

#### **Apollo**

> Subscriptions, Cache등 일반적으로 관리하기 어려운 조건들을 쉽게 관리하게 해줌

#### **Prisma**

> Prisma is a data layer that replaces traditional ORMs in your application architecture.

우리 프로젝트에 바로 도입하기에는 러닝 커브가 꽤 있어보인다 → 보류!

### CircleCI
