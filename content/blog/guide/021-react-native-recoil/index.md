---
layout: post
title: 'React-Native에 Recoil 추가하기 (v0.70.0'
date: '2022-09-12T03:01:10.169Z'
tags: ['react-native', 'recoil']
thumbnail: react-recoil.png
---

Recoil은 React를 위한 상태관리 라이브러리입니다.

React Native 프로젝트에 Recoil을 추가하는 방법에 대해 알아보겠습니다.

## 설치하기

```shell
yarn add recoil
```

## 시작하기

`App.tsx` 또는 `App.js` 파일에 아래와 같이 RecoilRoot를 추가해줍니다.

```tsx
import React from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import { RecoilRoot } from 'recoil';

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Hello React Native Recoil</Text>
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;
```

이제 자유롭게 `atom`, `selector` 등을 사용하시면 됩니다.
