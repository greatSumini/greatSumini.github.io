---
layout: post
title: '[C++] <cstdio>, <iostream>, <stdio.h>에 대해서'
date: '2020-09-19T02:05:10.169Z'
tags: ['cpp', 'ps']
thumbnail: cpp.png
---

## \<cstdio\>란?

cstdio는 `C STandarD Input and Output`의 약자로, C언어의 `stdio.h`와 같습니다.

입/출력과 관련된 C함수들을 포함한 헤더파일입니다. (`printf()`, `fprintf()`, `fopen`, `etc`)

## C++의 <stdio.h>와 뭐가 다른가요?

기능상의 차이는 없으나

stdio.h는 `global namespace`를 사용하고

cstdio는 `std라는 namespace`를 사용합니다.

## \<iostream\>과의 차이점은 뭔가요?

iostream은 입/출력을 수행하기 위한 `모든 C++ 스트림`들을 포함한 헤더파일입니다.

`printf`는 `cout`보다 빠르기 때문에 특수한 상황에서 주로 쓰이고, 보통 C++에서는 `cout`을 씁니다.

\<cstdio\>와 \<iostream\>은 하는 일이 같지만, 둘 다 사용할 수 있다면 여러모로 iostream을 사용하는 것이 더 안전하기 때문인데요. 자세한 이유는 다음과 같습니다.

- type-safe : iostream은 컵파일러가 I/O되는 객체의 타입을 static하게 알 수 있습니다. 그러나 cstdio는 `%`를 써서 타입을 dynamic하게 알아냅니다.

- 에러 : cstdio는 `%`를 쓰기 때문에 형식지정자가 실제로 I/O할 객체와 일치해야합니다. iostream은 `%` 토큰을 쓰지 않기 때문에 error를 줄일 수 있습니다.

- 확장성 : iostream은 기존의 코드를 바꾸지 않고 유저가 정의한 타입을 I/O할 수 있습니다.

- 상속성 : iostream 메커니즘은 std::ostream이나 std:istream같은 `real class`로부터 만들어졌기 때문에 cstdio의 FILE\*과는 달리 상속이 가능합니다. 따라서 유저가 `직접 stream을 정의`해서 작동시킬 수 있습니다.
  cstdio의 printf()는 인자의 type을 검사하지 않는 가변인자함수이고, 다른 type으로 overload될 수도 없습니다.

### 추가

C의 모든 keyword들을 C++에서도 쓸 수 있지만, 역은 언제나 성립하진 않습니다.

### Refs

- [stdio.h와 cstdio의 차이](http://ilashman-textcube.blogspot.com/2004/10/stdioh%EC%99%80-cstdio%EC%9D%98-%EC%B0%A8%EC%9D%B4.html)

- [difference between iostream and cstdio](http://www.cplusplus.com/forum/beginner/14205/)

- [printf와 cout의 차이](https://hashcode.co.kr/questions/1239/c%EC%97%90%EC%84%9C-printf%EB%9E%91-cout%EC%9D%80-%EB%AC%B4%EC%8A%A8-%EC%B0%A8%EC%9D%B4%EA%B0%80-%EC%9E%88%EB%82%98%EC%9A%94)

- [Why shoud I use \<iostream\> instead of the traditional \<cstdio\>?](https://isocpp.org/wiki/faq/input-output#iostream-vs-stdio)
