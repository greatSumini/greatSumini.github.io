---
layout: post
title: '[React Native] Android Release버전에서 fetch가 작동하지 않는 현상 (해결)'
date: '2019-06-13T00:37:10.169Z'
tags: ['react-native']
thumbnail: react-native.png
keywords: ['react native Fetch not working for HTTP requests on Android']
---

오늘 [SkyCloset](https://github.com/greatSumini/skycloset_cli)의 Release버전을 처음으로 테스트해봤는데,

SplashScreen에서 HomeScreen으로 화면전환이 되지 않았다.

​

원인을 살펴본 결과, \_getWeather() 함수에서 isLoaded state를 true로 업데이트 해주지 못하고 있었다.

검색결과 `Android Pie부터 HTTP 연결이 막혔다`고한다!! [참고링크](https://github.com/facebook/react-native/issues/24408)

하지만 다행히도 수동으로 특정 URL에 대한 접근을 허용할 수 있다.

​

## 특정 URL에 대한 HTTP request 허용하는 법

`android/app/src/main/res/xml/network_security_config.xml` 파일을 다음과 같이 생성한다.

```xml
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">insecure.example.com</domain>
        <domain includeSubdomains="true">insecure.example2.com</domain>
    </domain-config>
</network-security-config>
```

(insecure.example.com 부분에 접속할 url을 입력하면된다.)

<br>

`android/app/src/main/res/AndroidManifest.xml` 파일에 다음 코드를 추가해준다.

```xml
<application
    ...
    android:networkSecurityConfig="@xml/network_security_config">
```

### 추가)

아래와 같은 방법으로 모든 url에 대한 http 접속을 허용할 수 있으나, 보안상의 이유로 추천하지 않는다.

```xml
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
</network-security-config>
```

### Ref

- [Protecting users with TLS by default in Android P](https://android-developers.googleblog.com/2018/04/protecting-users-with-tls-by-default-in.html)
