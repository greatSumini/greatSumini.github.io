---
layout: post
title: 'Scroll Direction Listener Hook 만들기'
date: '2019-08-19T21:29:10.169Z'
tags: ['react', 'hooks']
thumbnail: 'hooks.jpg'
---

헤더가 컨텐츠를 가리지 않게 하기 위해, ~~Scroll Direction~~에 따라 유동적으로 나타나도록 만들 필요가 있었다. ~~EventListener와 state~~를 이용해 쉽게 유동적인 헤더를 구현할 수 있다.

## **state**

```tsx
this.state = {
  scrollDirection: 'down',
  lastScrollPos: 0,
};
```

state를 위와 같이 설정해줍니다.

## **listener 추가/제거**

```tsx
componentDidMount = () => {
  window.addEventListener('scroll', this.onScroll);
};

componentWillUnmount = () => {
  window.removeEventListener('scroll', this.onScroll);
};
```

component가 mount될때 listener를 추가하고, unmount될때 제거해준다.

## **listener 작성**

```tsx
onScroll = () => {
  const { lastScrollPos } = this.state;

  if (lastScrollPos > window.scrollY + 15) {
    this.setState({
      scrollDirection: 'up',
      lastScrollPos: window.scrollY,
    });
  } else if (lastScrollPos < window.scrollY - 15) {
    this.setState({
      scrollDirection: 'down',
      lastScrollPos: window.scrollY,
    });
  }
};
```

저장된 스크롤 위치와 현재 위치를 비교해 direction을 구합니다.<br>
~~15px~~이상 차이날때만 변경되도록해 안정성을 높입니다.
