---
layout: post
title: 'How to solve "window,document is not defined" errors in Next.js'
date: '2020-09-15T03:19:10.169Z'
tags: ['nextjs']
thumbnail: nextjs.png
keywords:
  ['nextjs window is not defined', 'nextjs cannot read innerWidth of undefined']
---

Next.js 개발환경에서 window object를 사용할 때, ~~document is undefined~~, ~~Cannot read innerWidth of undefined~~ 등의 에러메세지를 마주할 때가 있다.

Next.js의 서버사이드 렌더링에 익숙하지 않을 때 자주하는 실수로, 서버에서 웹 페이지를 렌더링할 땐 window, document등의 object가 없기 때문에 발생한다!

### 솔루션

Next.js는 universal 하다.

즉, server-side에서 먼저 실행 되고, 그 후에 client-side에서 실행된다. ~~window~~는 client-side에만 존재한다. 고로 React Component내에서 ~~window~~를 사용하고 싶다면 componentDidMount내에 코드를 작성해야한다.

`next/dynamic`을 사용하는 것도 방법이다. 특정 조건에서만 import하도록 설정할 수 있으며, `ssr:false`처럼 지정할 수도 있다.

- 공식 문서 : [next/dynamic](https://nextjs.org/docs/advanced-features/dynamic-import)

- 외부 컴포넌트를 사용해야한다면 [react-no-ssr](https://github.com/kadirahq/react-no-ssr)를 고려해보자

### 원글

링크 : https://github.com/zeit/next.js/wiki/FAQ

Next.js is `universal`, which means it executes code first server-side, then client-side.

The window object is only present `client-side`, so if you absolutely need to have access to it in some React component, you should put that code in `componentDidMount`.

This lifecycle method will only be executed on the client.

You may also want to check if there isn't some alternative universal library which may suit your needs.

Alternatively, if you are aiming to render a component you can use `next/dynamic` to dynamically import modules.

You can also set the flag to `ssr:false.`

NextJS added support for this in v3.0 https://zeit.co/blog/next3-preview

If the simple fact of importing the library is enough to trigger the error, you'll need to replace it with something like below

```javascript
if (typeof window !== 'undefined') {
  require('the-lib');
}
```

<br>
<br>

- For more info read this post: [next/dynamic](https://nextjs.org/docs/advanced-features/dynamic-import)

- If you're trying to use an external React component, also check [react-no-ssr](https://github.com/kadirahq/react-no-ssr).
