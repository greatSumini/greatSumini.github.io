---
layout: post
title: '좋은 코드 작성하기 (feat. 가독성, 생산성)'
date: '2021-01-17T20:38:10.169Z'
tags: ['refactoring', 'tip']
thumbnail: clean-code.png
---

## 소개

여태껏 개발을 하면서 느낀, 나만의 좋은 코드 작성법에 대해서 정리해보겠습니다.

좋은 의견/피드백 있으면 댓글로 남겨주세요 ^^

## 좋은 코드란 무엇일까?

만드는 어플리케이션에 따라, 제작진의 구성 및 상황에 따라 좋은 코드의 정의는 크게 달라질 수 있습니다.

예를 들어, MySQL DBMS 개발자가 중요하게 생각하는 부분과 카카오톡 iOS 개발자가 중요하게 생각하는 부분은 매우 다를 수 밖에 없겠죠.

이 글에서 저는 좋은 코드를 '누구나 이해하기 쉬운, 직관적인 코드'라고 정의하겠습니다.

## 이해하기 쉬운 코드 작성하기

이해하기 쉬운 코드를 작성하는 방법은 이해하기 쉬운 글을 쓰는 방법과 비슷합니다.

그렇다면 어떤 글이 이해하기 쉬운 글일까요? 저는 다음 조건들을 만족해야한다고 생각합니다.

> 1. 단락 별로 주제가 있다.
> 2. 그 주제가 무엇인지 파악하기 쉽다.
> 3. 불필요한 문장이 없다.
> 4. 표준어를 사용하며 문법에 맞는다.

이를 개발적인 언어로 바꿔보면 다음과 같습니다.

> 1. 고유한 기능을 하는 독립적인 모듈로 분리된다.
> 2. 어떤 모듈이 무슨 기능을 어떻게 하는지 파악하기 쉽다.
> 3. 불필요한 line이 없다.
> 4. 잘 정돈된, 합리적인 컨벤션을 따른다.

각 항목에 대해 좀 더 자세하게 설명해보겠습니당

## 1. 고유한 기능을 하는 독립적인 모듈로 분리된다.

이 규칙이 중요함은 누구나 아는 사실일거라고 생각합니다.

문제는 어떻게하면 **'잘'** 분리할 수 있느냐인데요, 저는 다음 두 가지를 잘 지키면 된다고 생각합니다.

- 이 모듈/메소드가 **독립성**을 갖는가?
- 이 모듈/메소드의 **선언 방식(타입)**이 적절한가?

예를 들어 의류 브랜드의 영문 이름을 입력 받아 한글 이름을 반환하는 모듈을 만든다고 생각해봅시다. (GUCCI를 입력하면 구찌가 나옵니다.)

이를 구현하는 방법은 정말 여러가지가 있습니다.

1.  object를 선언해 property로 접근해 값을 얻어온다.

```tsx
export const BRAND_KOR = {
  GUCCI: '구찌',
  NIKE: '나이키',
};

console.log(BRAND_KOR['GUCCI']);
```

2. 함수를 선언해 호출한다.

```tsx
const BRAND_KOR = {
  GUCCI: '구찌',
  NIKE: '나이키',
};

export const getBrandNameKorByEng = (brandEng: string) => {
  return BRAND_KOR[brandEng];
};

console.log(getBrandNameKorByEng('GUCCI'));
```

3. brand와 관련된 class의 method로 선언한다.
4. ...

<br>

저라면 함수를 선언할 것 같습니다. 입력된 brandEng에서 특수문자를 제거하거나 소문자로 통일시키는등의 전처리를 하기 편하고, alias가 등록되지 않은 예외 케이스를 대응하기도 좋거든요. 아래 코드처럼요!

```tsx
export const getBrandNameKorByEng = (brandEng: string) => {
  if (!brandEng) {
    return '';
  }

  const _brandEng = brandEng.toLowerCase().replace(/[^a-z0-9]/gi, '');

  return BRAND_KOR[_brandEng] || brandEng;
};
```

<br>

\+ `객체지향`에 대해 이해하면 '잘' 분리하기 좋은 것 같아요!

## 2. 어떤 모듈이 무슨 기능을 어떻게 하는지 파악하기 쉽다.

사실 모듈을 잘 분리하기만해도 이 규칙의 90%는 만족했다고 볼 수 있습니다. 잘 분리된 모듈이 파악하기도 쉽기 때문이죠!

1번 규칙이 훨씬 중요하다고 생각해주시면 됩니다.

모듈을 잘 분리한 이후, 좀 더 가독성을 좋게 만들기 위해서 다음과 같은 방법을 사용할 수 있습니다.

1. 명확한 네이밍
2. 명확한 타이핑(Typing)

사실 생산성 측면에서 동적 타입언어는 **정적 타입언어**를 이길 수 없다고 생각합니다.

파이썬이 아무리 Easy-To-Write여도, 읽기 힘들면 무슨 소용이겠습니까?

## 3. 불필요한 line이 없다.

이 규칙을 따름으로써 코드 읽기의 피로감을 크게 줄일 수 있습니다. 아래 내용들을 지키면 됩니다.

1. 이후 line에 의존적인 내용을 작성하지 않는다.
2. **주석은 정말 필요할 때만** 사용한다.
3. 언어가 제공하는 **built-in 기능**들을 잘 활용한다.

이중에서 가장 중요한 것은 1번입니다. 코드 line간의 의존성을 최대한 줄이고, **위에서 아래로 쭉** 읽을 수 있는 코드를 작성하는 것이 핵심입니다.

아래 예시를 통해 설명하겠습니다. 설명을 읽기 전에 코드만 보고 함수에 대해 파악해보세요.

```tsx
const solve = (users: User[]): number => {
  let result = 0;
  for (let i = 0; i <= users.length; ++i) {
    if (users[i].age >= 25) {
      result += users[i].weight;
    }
  }
  return result;
};
```

위 모듈은 입력 받은 유저 리스트에 대해서 나이가 25 이상인 사용자들의 몸무게 합을 반환하는 함수입니다.

실질적인 내용은 여섯줄 밖에 안 되지만, 코드들이 서로 얽힐 위험이 매우 큰 위험한 코드입니다. 이유는 다음과 같습니다.

<br>

먼저 body 첫줄의 `let result = 0;` line은 아래 내용을 읽기 전까진 아무런 의미를 갖지 않습니다. 따라서 읽는 사람은 해당 함수내의 모든 코드를 읽을 때까지 result 변수와 그 값의 흐름에 대해서 신경 쓰고 있어야합니다.

또 for문을 사용했기 때문에 loop counter i에 대해서 어떤 조작이 일어나진 않는지 신경 써야합니다. continue, break도 조심해야합니다.

이번 예시는 워낙 짧고 간단하기 때문에 괜찮았지만, 코드가 더 길었더라면 for문 선언부를 보자마자 한숨부터 나왔을 것입니다.

Array.prototype.filter/reduce를 사용해 아래와 같이 개선할 수 있습니다.

```tsx
const solve = (users: User[]): number =>
  users
    .filter((user) => user.age >= 25)
    .reduce((totalWeight, user) => totalWeight + user.weight, 0);
```

누군가는 개선된 버전보다 원래 코드가 더 직관적이고, 이해하기 쉽다고 말 할 수도 있습니다.

제가 여기서 강조하고 싶은 것은 자연어를 읽듯이 위에서 아래로 쭉 읽을 수 있는 안정성입니다.

```typescript
users : '입력 받은 모든 유저에 대해서'
.filter : '25살 이상인 유저로 필터링 하고'
.reduce : '몸무게를 모두 더한다.'
```

프로젝트에 기여하는 사람의 수가 늘어나고 다루는 코드가 늘어날수록 가독성과 안정성을 신경써야 합니다.

읽기 힘든 코드는 유지보수하기 매우 힘드니까요!

(퍼포먼스 측면에선 원본 코드가 당연히 훨씬 좋습니다. 낭비되는 메모리 할당 및 순회가 없으니까요.)

## 4. 잘 정돈된, 합리적인 컨벤션을 따른다.

일단 컨벤션을 지키지 않은 코드는 보기에 매우 난잡합니다.

Prettier, Eslint 등의 도구를 꼭 활용해주세요. 기본중의 기본입니다.

더 나아가서 해당 프로젝트에서 통용되는 규칙들을 정해보는 것도 좋습니다.

예를 들자면 다음과 같습니다.

> - Prop을 선언할 때 interface 대신 type alias를 사용합니다. + 거의 대부분 export 합니다.
>
>   ```tsx
>   export type CounterProps = {
>     count: number;
>     setCount: React.Dispatch<React.SetStateAction<number>>;
>   };
>   ```
>
> - 기존 interface,types와 Utility types를 최대한 활용합니다.
>
>   ```tsx
>   export type BioProps = Pick<
>     IUser,
>     'id' | 'name' | 'profileImageUrl' | 'height' | 'weight'
>   >;
>
>   export type ReviewItemEditBackdropProps = Omit<
>     BackdropProps,
>     'children'
>   > & {};
>   ```

## 마치며

실제로 개발을 하다보면 언제나 읽기 좋은 코드만을 작성할 수는 없습니다.

중요한 것은 **언제나 읽기 좋은 코드를 작성하고 싶어하는** 마음가짐이라고 생각합니다.

작동하기만 하는 코드는 Product라고 할 수 없습니다.

활용될 수 있는 코드여야만 상품 가치가 있다고 생각합니다.
