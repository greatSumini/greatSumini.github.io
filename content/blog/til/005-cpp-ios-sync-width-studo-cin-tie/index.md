---
layout: post
title: 'C++ ios::sync_with_stdio(false), cin.tie(NULL) 설명 및 사용법'
date: '2020-09-19T03:39:10.169Z'
tags: ['cpp', 'ps']
thumbnail: cpp.png
---

## 1. ios::sync\_with\_stdio(false);

C 표준 stream과 C++ 표준 stream의 `동기화`를 끊습니다.

기본적으로, 모든 표준 stream들은 동기화 되어있습니다. 그래서 우리는 C와 C++의 입출력방식을 자유롭게 혼용할 수 있습니다.

동기화를 끊는다면, C++ stream들은 `독립적인 버퍼`를 갖게되며, C와 C++의 입출력방식을 혼용해서 쓰는 것이 굉장히 위험해집니다.

또한 동기화된 C++ stream은 `thread-safe`합니다. (다른 thread의 output이 동시에 액세스해도 충돌하지 않습니다.)

동기화를 끊으면 사용하는 버퍼의 수가 줄어들기 때문에 `실행속도 자체는 향상`됩니다.

## 2. cin.tie(NULL);

cin을 cout으로부터 `untie`합니다. stream을 tie하면 다른 stream에서 입출력요청이 오기전에 stream을 `flush`시킵니다.:

```cpp
std::cout << "Enter name:";
std::cin >> name;
```

위의 예시에서 cin과 cout이 tie된 상태라면, user에게 입력을 요구하기 전에 output이 flush됩니다.

stream을 untie하면 output이 `flush되지 않은채로 user에게 입력을 요구`하게되며, 따라서 "Enter name" 메세지는 출력되지 않을 것입니다.

(기본적으로 cout의 output은 buffer가 가득차거나 수동적으로 flush를 시켜주기 전까지 출력되지 않습니다.)

그러므로 만약 cin과 cout을 untie한 뒤에 cin으로 입력을 받기전에 뭔가를 띄우고 싶다면 매번 수동적으로 cout을 flush 시켜줘야합니다.

이 또한 `실행속도 향상`에 도움이 됩니다.

### 결론 - 부작용

1. `ios::sync_with_stdio(false);` : C와 C++의 입출력방식을 혼용해서 사용할 수 없게 됨.
2. `cin.tie(NULL);` : 출력하고 싶을 때 stream을 수동으로 flush해줘야함
