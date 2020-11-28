---
layout: post
title: 'RN Gesture Handler : Gesture Handler란? (2)'
date: '2020-11-29T01:20:10.169Z'
tags: ['react-native']
thumbnail: react-native.png
---

## 소개

Gesture handler는 RNGH의 핵심 block이다. 이를 통해 우리는 Javascript + React Component로 ~~Native touch system을 구현하고 조작~~할 수 있다.

각 handler는 ~~하나의 gesture~~(pan, pinch, etc.)와, ~~관련된 event~~ 정보(translation, scale, etc.)들을 제공한다.

Handler는 ~~UI thread~~에서 작동하기 때문에, JS thread가 block되어도 영향을 받지 않는다.

## Handler의 상태

각 handler는 각자의 상태를 갖는다. Touch stream을 입력 받으며, 입력에 따라 상태를 전환한다.

Gesture가 시작하는 순간, 해당 gesture과 관련된 handler들이 선택되며, 발생하는 모든 touch event들이 선택된 모든 handler들에게 전달된다.

한 gesture가 active되면, 다른 모든 gesture들은 취소된다.

## View와의 관계

Gesture Handler 컴포넌트는 렌더 hierarchy내에 View로 구현되지 않는다. 대신, 라이브러리 고유의 레지스터리를 가지며 ~~View와 연결만~~ 된다.

따라서 Gesture Handler 컴포넌트를 사용할 땐 꼭 View를 child로 배치해야한다.

Gesture Handler 컴포넌트가 hierarchy내에 존재하지 않기 때문에, 발생한 event들이 child에 배치된 View에 걸리기 때문이다.

## Gesture Handler의 종류

- [PanGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-pan)
- [TapGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-tap)
- [LongPressGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-longpress)
- [RotationGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-rotation)
- [FlingGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-fling)
- [PinchGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-pinch)
- [ForceTouchGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-force)

## Gesture의 종류 (discrete, continuous)

1. Continuous

오랜 시간동안 활성화(active)될 수 있으며, gesture가 끝날때까지 Gesture event stream을 생성한다. (ex:[PanGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-pan))

2. Discrete

활성화(active)된 순간 즉시 종료된다. (ex: [LongPressGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handler-longpress))

<i>(`onGestureEvent`는 continuous gesture handler에서만 발생한다.)</i>

## Handler 중첩

Handler 컴포넌트를 중첩시킬 수 있다. 가장 내부의 handler는 View를 포함해야한다.

```tsx
class Multitap extends Component {
  render() {
    return (
      <LongPressGestureHandler
        onHandlerStateChange={this._onLongpress}
        minDurationMs={800}
      >
        <TapGestureHandler
          onHandlerStateChange={this._onSingleTap}
          waitFor={this.doubleTapRef}
        >
          <TapGestureHandler
            ref={this.doubleTapRef}
            onHandlerStateChange={this._onDoubleTap}
            numberOfTaps={2}
          >
            <View style={styles.box} />
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    );
  }
}
```

## Events with useNativeDriver

Handler component가 child view에 종속적이기 때문에, `Animated.event`를 사용할 때 두 gesture를 직접 중첩할 수 없다. Animated.View를 handler 사이에 배치해 해결할 수 있다.

```tsx
// BAD
const PanAndRotate = () => (
  <PanGestureHandler onGestureEvent={Animated.event({ ... }, { useNativeDriver: true })}>
    <RotationGestureHandler onGestureEvent={Animated.event({ ... }, { useNativeDriver: true })}>
      <Animated.View style={animatedStyles}/>
    </RotationGestureHandler>
  </PanGestureHandler>
);

// GOOD : Animated.View를 삽입했다.
const PanAndRotate = () => (
  <PanGestureHandler onGestureEvent={Animated.event({ ... }, { useNativeDriver: true })}>
    <Animated.View>
      <RotationGestureHandler onGestureEvent={Animated.event({ ... }, { useNativeDriver: true })}>
        <Animated.View style={animatedStyles}/>
      </RotationGestureHandler>
    </Animated.View>
  </PanGestureHandler>
);
```

<br>

또, event가 children node에 걸리기 때문에 `useNativeDriver` + `Animated.event`를 사용할 경우 children node는 `Animated.View`여야한다.

```tsx
class Draggable extends Component {
  render() {
    return (
      <PanGestureHandler onGestureEvent={Animated.event({ ... }, { useNativeDriver: true })}>
        <Animated.View style={animatedStyles} /> {/* <-- NEEDS TO BE Animated.View */}
      </PanGestureHandler>
    );
  }
};
```

## React Native Components

[NativeViewGestureHandler](https://docs.swmansion.com/react-native-gesture-handler/docs/handlers)로 감싼 리액트 네이티브 컴포넌트들을 제공한다.

- `ScrollView`
- `FlatList`
- `Switch`
- `TextInput`
- `DrawerLayoutAndroid` (**Android only**)
