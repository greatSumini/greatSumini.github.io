---
layout: post
title: 'React+Typescript 절대경로 import 설정하기'
date: '2020-09-18T03:03:10.169Z'
tags: ['react', 'typescript']
thumbnail: 'ts-react.png'
---

상대 경로를 사용하면 package 구조가 깊어질 수록 파일 간의 관계를 파악하기 어려워지고, 파일 이동시 귀찮게 경로를 수정해야 합니다.

### 예시

```tsx
import { P, Space, Line } from '../../../../../../../component/atoms';
import { MIDDLE_GREY } from '../../../../../../../component/atoms/colors';
```

<br>

절대 경로를 사용하면 depth와 상관 없이 일관되고 짧은 경로를 작성할 수 있으며, 파일 이동시에도 그대로 사용할 수 있습니다.

```tsx
import { P, Space, Line } from '@src/component/atoms';
import { MIDDLE_GREY } from '@src/component/atoms/colors';
```

## 1. 타입스크립트 컴파일러 설정

typescript compiler에게 `@src`가 루트 경로의 `src` 폴더 임을 알려줘야 합니다. 루트 경로의 `tsconfig.json` 파일을 수정하면 됩니다.

```json
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@src/*": [
        "src/*"
      ]
    }
  }
}
```

<center>tsconfig.json</center>

## 2. Babel 설정

babel이 코드를 compile할 때, 절대 경로로 작성된 path를 이해하도록 설정을 추가해야합니다. 루트 경로의 `.babelrc` 파일을 수정하면 됩니다.

1. `npm i -D babel-plugin-module-resolver` 을 입력해 플러그인을 설치합니다.
2. 루트 경로의 `.babelrc` 파일에 다음 코드를 추가합니다.

```json
{
  ...,
  "plugins": [
    ...,
    [
      "module-resolver",
      {
        "root": ["./"],
        "alias": {
          "@src": "./src"
        }
      }
    ]
  ]
}
```

#### Ref

- [typescript - module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [공식 문서](https://www.typescriptlang.org/docs/home.html)
