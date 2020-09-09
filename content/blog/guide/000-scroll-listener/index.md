---
layout: post
title: 'Custom React hook for detecting scroll direction'
date: '2019-08-19T21:29:10.169Z'
tags: ['react', 'hooks']
thumbnail: 'hooks.jpg'
---

헤더가 컨텐츠를 가리지 않게 하기 위해, ~~Scroll Direction~~에 따라 유동적으로 나타나도록 만들 필요가 있었다. ~~EventListener와 state~~를 이용해 쉽게 유동적인 헤더를 구현할 수 있다.

## 구현

```tsx
const useScrollDirection = (initialDirection?: 'up' | 'down') => {
  const [direction, setDirection] = useState(initialDirection || 'up');
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) return; // 최상단에서는 연산하지 않는다.
      if (Math.abs(lastPosition - window.scrollY) > 15) {
        // 15px 이상 스크롤했을 때만 연산한다.
        setDirection(lastPosition > window.scrollY ? 'up' : 'down');
        setLastPosition(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // unmount시 제거해준다.
    };
  });
  return direction;
};

export default useScrollDirection;
```

<center>useScrollDirection.ts</center>

저장된 스크롤 위치와 현재 위치를 비교해 direction을 구합니다.

~~15px~~이상 차이날때만 변경되도록해 안정성을 높입니다.

## 적용

```tsx
import useScrollDirection from 'src/hooks/useScrollDirection';

export default function MainHeader(props: IProps) {
  const scrollDirection = useScrollDirection('down');

  return (
    <Header
      style={{ position: scrollDirection === 'up' ? 'fixed' : 'relative' }}
    >
      ...
    </Header>
  );
}
```

<center>header.tsx</center>

위와 같이 어디에서나 사용할 수 있다!

### +) Class형 component에서의 구현

**state**

```tsx
this.state = {
  scrollDirection: 'down',
  lastScrollPos: 0,
};
```

<br>

**listener 추가/제거**

```tsx
componentDidMount = () => {
  window.addEventListener('scroll', this.onScroll);
};

componentWillUnmount = () => {
  window.removeEventListener('scroll', this.onScroll);
};
```

component가 mount될때 listener를 추가하고, unmount될때 제거해준다.
<br><br>

**listener 작성**

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
