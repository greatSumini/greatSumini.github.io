---
layout: post
title: "[React Native] Failed to capture fingerprint of output files for task ':app:processDebugResources' property 'sourceOutputDir' (fixed)"
date: '2019-06-13T00:49:10.169Z'
tags: ['react-native']
thumbnail: react-native.png
keywords:
  [
    'react native Execution failed for task ":app:processReleaseResources"',
    "Failed to capture fingerprint of output files for task ':app:processDebugResources' property 'sourceOutputDir'",
  ]
---

SkyCloset 릴리즈버전 테스트를 위해

`react-native run-android --variant=release`를 입력했는데 아래 에러메세지와 함께 앱빌딩이 종료되었다.

### 에러내용

<span style="color:red; font-size: 1rem; word-break:break-all;">
What went wrong: Failed to capture fingerprint of output files for task ':app:processDebugResources' property 'sourceOutputDir' during up-to-date check. > Could not read path 'D:\react-native\rnn8\android\app\build\generated\not_namespaced_r_class_sources\debug\processDebugResources\r\android\arch\core'.</span>

### 해결

구글링 결과 다음 방법으로 해결가능하다.

라이브러리를 추가해서 `gradle file`이 update 됐는데 `react-native builder`가 check하지 못 했고, clean 후 재시도하니 잘 되는 것 같다.

```shell
cd android
./gradlew clean
cd ..
react-native run-android
```

​

### Ref

- [react-native repo issue](https://github.com/wix/react-native-navigation/issues/4858#issuecomment-488726200)
