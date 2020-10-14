---
layout: post
title: 'ECMAScript란? 개념부터 디테일까지'
date: '2020-10-14T00:52:10.169Z'
tags: ['javascript']
thumbnail: ecmascript.jpg
---

자바스크립트를 사용하는 사람이라면 ~~ES6 표준~~, ~~ES5~~, ~~ES2020~~등의 단어를 들어본 적이 있을 것이다.

나는 처음으로 들은 udemy 강의에서 ~~arrow function~~, ~~let~~, ~~spread operator~~ 등이 ES6에서 추가됐다는 것을 배우면서 처음 들었다. ES가 무슨 단어의 약자인지도 모르면서 그냥 외웠다.

자바스크립트를 접한지 벌써 2년이 다 돼가는데, 어차피 babel이 polyfill 생성해주니까 + 불편한 점 없어서 용캐 덮어두고 있던 것 같다.

이 글은 나 같은 게으름뱅이들을 위한 글이다. ECMAScript가 무엇이며, ES5/ES6/ES2020 등의 버전은 무엇이며, 이것이 우리에게 어떤 영향을 주고 있는지에 대해서 자세히 정리해보겠다.

### ECMAScript란?

ECMAScript는 말 그대로 ~~Ecma라는 기관이 만든 script 언어~~이며, [ECMA-262 표준](https://en.wikipedia.org/wiki/ECMAScript)를 따르고 있다.

Ecma internatinal은 **정보통신기술(ICT), 전자제품(CE)를 위한 국제 표준 기구**이다. ECMAScript의 언어 규격인 ECMA-262외에도 C#, C++, Dart, JSON 등 여러 시스템을 위한 표준을 책임지고 있다.

자바스크립트를 개발한 Netscape가 더 향상된 표준화를 위해 기술 규격을 Ecma에 제출했고, 그에 따라 Ecma가 새롭게 제정한 표준이 바로 ECMA-262다.

ECMA-262는 규격이며, ECMAScript는 ~~ECMA-262에 의해 표준화된 자바스크립트의 새로운 이름~~이다.

따라서 ECMAScript가 표준 또는 언어규격이라는 말은 옳지 않다.

ECMAScript(=javascript)는 엄연히 프로그래밍 언어이며, _ES6 표준을 따른다_ 라는 말은 _ECMAScript 2015가 사용중인 ECMA 규격을 따른다_, _ECMAScript 2015과 동일한 문법을 사용한다_ 와 동의어라고 볼 수 있겠다.

### ECMAScript의 버전?

ES5, ES6, ES2020등은 ECMAScript가 배포된 버전이다.

2015년 이후 매년 새로운 버전이 배포되고 있으며, 이전 명세의 문제 해결 및 간결한 문법 추가를 목표로 한다.

5판까지는 ECMAScript 5(=ES5)라는 명칭을 사용했지만, 6판부터는 ~~빠른 배포주기를 반영하기 위해~~ 숫자 대신 연도를 붙여 ECMAScript 2015(=ES6) 같은 명칭을 사용한다.

ECMAScript 2020은 많이들 ES5, ES6과 다르게 ES2020라고 부르는데, 특별한 이유는 없다. ES11라고 표기해도 되는데 배포 연도를 강조하기 위해 ES2020라고 부르는 것이다.

<i>필자는 ES9 이후부터는 ES0이라고 부를 수 없으니까 연도를 통째로 붙이는줄 알고 있었다 </i> 😅

### ES6?!

자바스크립트를 처음 공부하면 다른 언어를 공부할 때보다 비교적 버전에 대한 이야기를 많이 듣게 된다.

자바스크립트를 공부해본 사람이라면 _이것은 ES6부터 추가된 기능인데~_ 라는 말이 정말 익숙할 것이다. 자바스크립트를 다루는 기본서들은 반드시 제목 또는 표지에 큼지막하게 다루는 ECMA 규격을 명시하며, 그 중 대다수는 ES6이다.

벌써 ES11이 배포됐는데, 왜 다들 ES6에 집착하는 것일까? 이유는 ES6에서 추가된 문법들이 기존의 문제들을 매우 깔끔하게 해결했으며, 가독성 및 유지 보수성을 보강하는 문법도 대거 추가됐기 때문이다.

ES6 표준 문법은 [IE에서 지원되지 않지만](https://caniuse.com/?search=es6), 트랜스파일러(Babel)를 이용해서 하위 문법을 따르는 코드로 쉽게 변경할 수 있기 때문에 호환성 문제도 없다.

ES6에서 추가된 기능으론 ~~Promise~~, ~~Class~~, ~~Arrow function~~ 등이 있다. 각 기능에 대한 자세한 설명은 아래 링크를 참고하자.

- 참고 : [TOAST UI - ES5 TO ES6](https://ui.toast.com/fe-guide/ko_ES5-TO-ES6/)

### 3줄 요약

1. ECMAScript(=자바스크립트)는 ~~언어~~이며, ECMA-262 규격을 따른다.
2. 매년 새로운 버전이 배포되고 있으며, 현재 최신판은 ES2020이다.
3. ES6에서 중요한 기능들이 많이 추가됐으니 꼼꼼히 알아두자.

### Refs

- [wikipedia.org - Ecma internatinal](https://ko.wikipedia.org/wiki/Ecma_%EC%9D%B8%ED%84%B0%EB%82%B4%EC%85%94%EB%84%90)
- [wikipedia.org - ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)
- [medium - A World of Javascript Transpilers](https://medium.com/front-end-weekly/a-world-of-javascript-transpilers-b3b7b880a1be)
