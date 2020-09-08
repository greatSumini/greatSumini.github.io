---
layout: post
title: 'TypeScript 기초 다지기'
date: '2019-07-12T19:10:21.169Z'
tags: ['typescript']
thumbnail: typescript.png
---

Typescript에 대한 기본적인 배경 지식과 사용법을 알아보자

## Overview

- ~~프로그래밍 언어~~입니다.
- ~~Compiled Language~~입니다.
  - 전통적인 Compiled Language와는 다른 점이 많아서 ~~Transpile~~이라는 용어를 사용하기도 합니다. Compiler가 타입 체킹, 최적화를 수행함.
- Javascript는 ~~Interpreted Language~~입니다.
- Compile하면 Javascript로 변환됩니다.
- 코드 크기는 늘어나지만, 더 명확한 코딩을 할 수 있습니다.
  <br>

![TS to JS](/assets/img/2019-07-12-TIL_00.png){: width="400" height="100" .aligncenter}
<br>

## 개발 환경 구축 및 컴파일러 사용

1. 자바스크립트 실행환경 : node.js, brower 설치
2. 타입스크립트 컴파일러 설치 : npm i typescript -g (Visual Studio Plugin으로도 설치할 수 있음)<br>
   여기도 참고해보자 (https://poiemaweb.com/typescript-vscode)
3. 타입스크립트 개발환경 : VScode를 이용하겠음.

tsc test.ts 명령어를 통해 test.ts파일을 test.js로 컴파일할 수 있다.

```typescript
class Test {
  constructor() {
    console.log('test');
  }
}

new Test();
```

<center>test.ts</center>
<br>

```typescript
var Test = /** @class */ (function () {
  function Test() {
    console.log('test');
  }
  return Test;
})();
new Test();
```

<center>test.js</center>
<br>

tsc --init 명령어를 통해 tsconfig.json 파일을 만들 수 있다.<br>
해당 파일을 생성한 후엔 tsc 명령어만으로도 컴파일할 수 있다.

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "allowJs": true,
    ...
  }
}
```

<center>tsconfig.json</center>
<br>

다음은 타입스크립트의 여러가지 기초 활용법이다.

```typescript
function greeter(person: string) {
  return 'Hello, ' + person;
}
let user = 'Jane User';
document.body.textContent = greeter(user);

//Interface
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let user = { firstName: 'Jane', lastName: 'User' };
document.body.textContent = greeter(user);

// class
class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let user = new Student('Jane', 'M.', 'User');
document.body.textContent = greeter(user);
```

<center>test.ts</center>

## Types

TypeScript가 언어차원에서 기본적으로 지원하는 Type은 두 종류로 분류할 수 있다. Basic Type과 Advanced Type.

#### Ref

- [타입스크립트 코리아 기초 세미나](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%A6%AC%EC%95%84-1705-%EA%B8%B0%EC%B4%88-%EC%84%B8%EB%AF%B8%EB%82%98/dashboard)
- [공식 문서](https://www.typescriptlang.org/docs/home.html)
