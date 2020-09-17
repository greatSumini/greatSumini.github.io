---
layout: post
title: 'Nextjs+Typescript 프로젝트에 styled-components 추가하기'
date: '2020-09-18T03:19:10.169Z'
tags: ['nextjs', 'styled-components']
thumbnail: 'nextjs-styled-components.png'
---

## 설치

styled-components를 설치합니다.

```shell
$ yarn add styled-components
$ yarn add --dev @types/styled-components babel-plugin-styled-components
```

`@types/styled-components`: styled-components의 type definition 모듈입니다.

(참고 : [@types라이브러리란?](https://joshua1988.github.io/ts/config/types.html#types-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%9E%80))

`babel-plugin-styled-components` : className에 해당 component의 이름을 접두사로 넣기 위해 사용합니다.

<br>

## 2. babel setting

프로젝트 루트 폴더의 `.babelrc`에 다음 내용을 추가해준다.

```json
{
  "presets": ["next/babel"],
  ...,
  "plugins": [
    ...,
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": true
      }
    ]
  ]
}
```

`ssr` : generate된 style이 `server-side`에서 적용되도록 한다. 이를 적용하지 않으면 초기렌더링 시 잠깐의 지연시간 후 client-side에서 스타일이 로드돼 유저 경험상 좋지 않다.

`displayName` : babel-plugin-styled-components가 적용된, debug하기 쉬운 `className을` 설정한다.

`preprocess` : experimental feature이므로 꺼준다.

## 3. create custom \_document.tsx

pages 폴더에 `_document.tsx` 파일을 추가한다. 내용은 다음과 같다.

```tsx
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="ko">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```

server-side에서 styled-components들로 부터 style을 collect해 `<style>` 태그로 만들어 html document에 삽입해줍니다.

### Ref

- [babel-plugin-styled-components repo](https://github.com/styled-components/babel-plugin-styled-components)
