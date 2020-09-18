---
layout: post
title: 'Nextjs 프로젝트에 Google Analytics 깔끔하게 붙이기'
date: '2020-09-18T03:40:10.169Z'
tags: ['nextjs', 'analytics', 'ga']
thumbnail: 'nextjs-google-analytics.png'
---

유저들의 데이터를 수집 및 분석하기 위해서 구글 애널리틱스 도입은 필수죠.

[next-ga](https://www.npmjs.com/package/next-ga) 라이브러리는 글로벌 `getInitialProps` 적용으로 **automiatic static optimization**을 opt out 하므로 사용하지 않고, [react-ga](https://www.npmjs.com/package/react-ga)를 사용하겠습니다.

## 0. 가입, key 발급

구글 애널리틱스에 접속해 서비스를 생성하고, ID를 발급 받습니다.

vercel을 통해 배포중인 경우 다음 명령어를 이용해 secret을 추가해줍니다.

```shell
$ vercel secrets add <service-name>-ga-app-id <ga-app-id>
```

## 1. 설치

```shell
$ yarn add react-ga
$ yarn add --dev debug
```

## 2. analytics modules

`src/lib/ga/analytics` 경로에 다음 파일들을 추가합니다.

```tsx
import ReactGA from 'react-ga';

// server / client 구분을 위한 변수
const IS_BROWSER = typeof window !== 'undefined';

export function init(code) {
  // client-side에서만, GA가 initialize되지 않았을 때만 init
  if (IS_BROWSER && !window.GA_INITIALIZED && code) {
    ReactGA.initialize(code);
  }
}

export function pageview() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export function event(category = '', action = '') {
  if (category && action) {
    ReactGA.event({ category, action });
  }
}

export function exception(description = '', fatal = false) {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
}
```

<center>src/lib/ga/analytics/prod.js</center>

```tsx
// development 환경일 땐 logging만 합니다.
import debug from 'debug';

const log = debug('analytics');

export function init(code) {
  log(`Analytics init triggered for ${code}`);
}

export function pageview() {
  log(`Pageview triggered for ${window.location.pathname}`);
}

export function event(category = '', action = '') {
  log(`Event for category ${category} and action ${action} triggered`);
}

export function exception(description = '', fatal = false) {
  log(
    `${fatal ? 'Fatal exception' : 'Exception'} with description ${description}`
  );
}
```

<center>src/lib/ga/analytics/dev.js</center>

## 3. ga modules

`src/lib/ga/index.js` 파일을 추가합니다. 내용은 다음과 같습니다.

```tsx
import * as prodLytics from './analytics/prod';
import * as devLytics from './analytics/dev';

const isLocal = () => {
  return location.hostname === 'localhost';
};

const isDev = () => {
  return process.env.NODE_ENV !== 'production';
};

const initGA = (code, Router) => {
  // local이거나 development 환경일 땐 ga를 실행하지 않습니다.
  const shouldNotTrack = isLocal() || isDev();
  // production or dev analytics
  const analytics = shouldNotTrack ? devLytics : prodLytics;

  // init
  analytics.init(code);
  // log page
  analytics.pageview();

  // previouseCallback을 저장합니다.
  const previousCallback = Router.onRouteChangeComplete;
  // Router.onRouteChangeComplete는 라우팅 주소 변경시 트래킹을 하기 위해 필요합니다.
  Router.onRouteChangeComplete = () => {
    // previouseCallback function이 정의되어 있었으면 실행시켜 줍니다.
    if (typeof previousCallback === 'function') {
      previousCallback();
    }
    // log page
    analytics.pageview();
  };
};

export default initGA;
```

<center>src/lib/ga/index.js</center>

## 4. 적용

`pages/_app.js`에 다음 코드를 추가합니다.

```tsx
...
import Router from 'next/router';
...

import initGA from '../src/lib/ga';

...

class PickkApp extends App {
  componentDidMount() {
    initGA(process.env.GA_APP_ID, Router);
  }
  ...
```

<center>pages/_app.js</center>
