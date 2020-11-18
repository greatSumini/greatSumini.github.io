---
layout: post
title: 'Next.js 10, 뭐가 바뀌었을까?'
date: '2020-11-19T00:13:38.169Z'
tags: ['nextjs']
thumbnail: 'nextjs.jpg'
---

> Nextjs 공식 블로그의 [Next.js 10](https://nextjs.org/blog/next-10)를 번역 및 요약한 글입니다.<br>의역 및 개인적인 의견이 많이 추가될 예정입니다.<br>

와! Next.js 10!

지난 Next conf와 함께 Next.js 10이 공개되었다.

언제나 실망시키지 않는 Vercel이 이번엔 어떤 재미난 기능들을 준비했을지 살펴보자.

## 1. Built-in Image Component and Automatic Image Optimization

```tsx
import Image from 'next/image'

<Image src="/profile-picture.jpg" width="400" height="400" alt="Profile Picture">
```

<br>

웹 이미지를 최적화하기 위해서 다음 사항들을 고려해야한다. : 크기, 용량, Lazy loading, 최신 이미지 포맷

next/image는 이 모든 것을 자동으로 처리해준다.

- 자동 lazy loading 적용
- image dimension(width, height)를 통한 layout shift 방지
- 반응형 자동 대응 (이건 써봐야 알듯)
- 자동 preload 적용
- built-in Image Optimization 자동 적용 (어떤 source에서 왔던 상관 없이!)
- on-demand image optimizing : user가 요청했을 때 압축하기 때문에 빌드타임이 증가하지 않음
- 가능한 브라우저에 대해서 WebP등 최신 이미지 포맷으로 제공

**공식 문서** : [Next.js Image Component and Automatic Image Optimization documentation.](https://nextjs.org/docs/basic-features/image-optimization)

## 2. Internationalized Routing

국제화?를 쉽게 할 수 있다.

- 제공하는 locale 설정
- locale별 domain 설정
- Accept-Language header를 통한 언어 감지 + 자동 리다이렉트
- 감지한 언어를 자동으로 html tag의 lang 속성으로 추가
- 앞으로 더 많은 국제화 관련 기능들을 추가할 것!

**공식 문서** : [Internationalized Routing documentation](https://nextjs.org/docs/advanced-features/i18n-routing)

## 3. Next.js Analytics

웹사이트 로딩이 3초 이상 걸리면 50% 이상의 고객이 떠난다. [E커머스에서 로딩 시간을 0.1초 개선할 때마다 전환률이 1% 늘어난다는 통계](http://robotics.stanford.edu/~ronnyk/2007IEEEComputerOnlineExperiments.pdf)도 있다.

- 지속적인 측정
- visitor들이 사용하는 실제 기기로 측정

## 4. Next.js Commerce

Next.js 10에서 새롭게 추가된 기능들이 E커머스를 만들 때 좋다고 한다. [Next.js Commerce](https://nextjs.org/commerce)는 이를 쉽게 시작해볼 수 있는 스타터킷이다.

## 5. React 17 Support

어떤 설정을 건드릴 필요도 없이, Next.js와 React를 업그레이드하는 것만으로도 React 17을 사용할 수 있다.

React 17이 사용되면 [new JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)이 자동으로 활성화된다.

```shell
$ yarn add next@latest react@latest react-dom@latest
```

## 6. getStaticProps / getServerSideProps Fast Refresh

이제 getStaticProps / getServerSideProps 을 수정하면 자동으로 다시 실행해 새로운 데이터를 적용한다.

## 7. Fast Refresh for MDX

~~@next/mdx~~를 사용하면 MDX 수정시 Fast Refresh가 활성화된다.

[가이드(@next/mdx)](https://github.com/vercel/next.js/tree/canary/packages/next-mdx)

## 8. Importing CSS from Third Party React Components

```tsx
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
```

<br>

이제 컴포넌트 내에서 외부 컴포넌트의 css를 import할 수 있다. 이로 인해 CSS code-splitting을 적용된다!

## 9. Automatic Resolving of href

이제 ~~next/link~~를 사용할 때 ~~as~~를 생략해도 된다.

## 10. @next/codemod CLI

Next.js 버전 업데이트로 인한 코드 변경을 쉽게할 수 있도록 도와주는 CLI다.

## 11. Bloacking Fallback for getStaticPaths

원래는 등록되지 않은 path에 대해서 fallback:false면 404, true면 데이터가 빈 채로 렌더링했다.

새로 추가된 'blocking' 값을 넣으면 등록되지 않은 path에 대해서 일단 block한 상태로 getServerSideProps처럼 데이터를 불러와 새로 HTML을 generate한뒤 반환한다고한다.

## 12. Redirect and notFound Support for getStaticProps / getServerSideProps

```tsx
export function getStaticProps() {
  return {
    // returns the default 404 page with a status code of 404
    notFound: true,
  };
  return {
    // returns a redirect to an internal page `/another-page`
    redirect: {
      destination: '/another-page',
      permanent: false,
    },
  };
  return {
    // returns a redirect to an external domain `example.com`
    redirect: {
      destination: 'https://example.com',
      permanent: false,
    },
  };
}
```

<br>

이제 redirect, notFound를 처리하기 위해 복잡한 코드를 쓰지 않아도 된다!
