---
layout: post
title: 'RN Gesture Handler : Handler의 상태 (3)'
date: '2020-11-29T01:26:10.169Z'
tags: ['react-native']
thumbnail: react-native.png
---

## 종류

### UNDETERMINED

초기값이다. gesture 인식을 대기하는 중인 상태다.

### FAILED

Handler가 touch를 인식했으나, 활성화(activated)되지 못한 상태다. 이후 `UNDETERMINED`로 전환된다.

### BEGAN

Handler가 touch를 인식중이며, 아직 `FAIL` 또는 `ACTIVE` 상태가 되기에 데이터가 부족한 상태다.

### CANCELLED

외부 signal로 인해 continuous gesture가 취소된 상태다. Gesture recognizer는 `UNDERTERMINED`로 초기화된다.

### ACTIVE

Gesture를 인식한 상태다. gesture가 끝나거나 취소될 때까지 유지된다. 일반적으로 `END` 상태로 전환되지만, 취소된 경우 `CANCELLED` 상태로 전환된다.

### END

Gesture 인식을 정상적으로 종료한 상태다. 이후 `UNDETERMINED`로 전환된다.

## State 흐름

1. 일반적인 상황

   UNDETERMINED -> BEGAN ------> ACTIVE ------> END -> UNDETERMINED

2. 취소됨

   UNDETERMINED -> BEGAN ------> FAILED -> UNDETERMINED

3. 실패

   UNDETERMINED -> BEGAN ------> ACTIVE ------> CANCELLED -> UNDETERMINED

## State에 접근하기

`onHandlerStateChange`와 event의 `state` 속성을 통해 state에 접근할 수 있다.

```tsx
import { State, LongPressGestureHandler } from 'react-native-gesture-handler';

class Demo extends Component {
  _handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      Alert.alert('Longpress');
    }
  };
  render() {
    return (
      <LongPressGestureHandler onHandlerStateChange={this._handleStateChange}>
        <Text style={styles.buttonText}>Longpress me</Text>
      </LongPressGestureHandler>
    );
  }
}
```
