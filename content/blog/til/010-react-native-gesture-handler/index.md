---
layout: post
title: 'RN Gesture Handler : 시작하기 (1)'
date: '2020-11-29T01:18:10.169Z'
tags: ['react-native']
thumbnail: react-native.png
---

## 소개

React Native의 기본 터치 시스템인 [Gesture Responder System](https://reactnative.dev/docs/gesture-responder-system)을 대체한다. 차별점은 성능 및 Native Component의 가짓수이다.

### 제공하는 기능

Gesture Handler가 제공하는 것들은 다음과 같다.

- 각 플랫폼의 native touch handling system (pinch, rotation, pan, ... )
- Gesture Handler간의 관계 정의

  ⇒ 예를 들어 ScrollView 안에 Pan handler를 생성하면, Pan이 인식되지 않을 때만 Scoll되도록 만들 수 있다.

- Native thread에서 동작하고 플랫폼 기본 동작을 따르는 touchable

  ⇒ Scrollable component 내부에 위치한 touchable은 스크롤 중에 하이라이트되는 것을 방지하기위해 살짝 느리게 눌린다.

- Animated Native Driver를 사용한 부드러운 gesture interaction

## 주의할 점들

### Android의 modal과 함께 사용할 때

modal은 React Native Root view 외부에 존재하기 때문에 작동하지 않는다. `gestureHandlerRootHOC`로 감싸줘야한다. (iOS와 웹에선 무시된다.)

```tsx
const ExampleWithHoc = gestureHandlerRootHOC(function GestureExample() {
  return (
    <View>
      <DraggableBox />
    </View>
  );
});

export default function Example() {
  return (
    <Modal animationType="slide" transparent={false}>
      <ExampleWithHoc />
    </Modal>
  );
}
```

### GestureHandlerRootView

`shouldCancelWhenOutside`, `simultaneousHandlers`, `waitFor` 등의 prop을 사용하려면 상위에 GestureHandlerRootView가 1개만 존재해야한다. 따라서 GestureHandlerRootView는 실제 root view와 가까이 위치할수록 좋다.

GestureHandlerRootView는 일반 View와 동일하게 작동하기 때문에, 스크린을 가득 채우고 싶으면 `{ flex : 1}`을 넘겨줘야한다. 기본적으로는 content size를 따라간다.

## Ref

- [공식문서](https://docs.swmansion.com/react-native-gesture-handler/docs/)
