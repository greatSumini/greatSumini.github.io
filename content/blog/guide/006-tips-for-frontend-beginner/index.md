---
layout: post
title: '초보 리액트 개발자를 위한 팁 13가지'
date: '2020-09-19T01:33:10.169Z'
tags: ['tip', 'front-end', 'html', 'css', 'javascript', 'react']
thumbnail: 'frontend.jpg'
---

동아리에서 코드리뷰를 하며 자주 알려드렸던 내용 11가지를 뽑아봤습니다!

## 1. CSS의 길이 단위

링크 : [https://aneok.tistory.com/56](https://aneok.tistory.com/56)

스타일링을 할 때 px, vh, rem 등 여러 길이 단위를 사용할 수 있는데요, 용도에 맞는 길이 단위를 사용하면 간략한 컴포넌트 구조를 짜는 데에도 도움이 되니 잘 숙지해주세요~

## 2. CSS : flex

링크 : [https://heropy.blog/2018/11/24/css-flexible-box/](https://heropy.blog/2018/11/24/css-flexible-box/)

flex를 사용해 레이아웃을 쉽게, 명확하게 구성할 수 있습니다.

flex-direction, flex-wrap, justify-content, align-items만큼은 꼭 제대로 숙지해주세요!

## 3. Component는 ui, logic 단위로!

영상 : [https://youtu.be/x7cQ3mrcKaY?t=551](https://youtu.be/x7cQ3mrcKaY?t=551)

React의 컴포넌트는, `UI와 logic이 긴밀하게 연관되어 작동하는 단위`입니다.

이를 통해 하나의 data에 대한 view와 template 모듈이 따로 존재하는 `coupling 현상을 방지`할 수 있습니다.

다르게 말하면, 하나의 data에 대한 로직은 되도록 컴포넌트 단위로 묶어주는게 좋습니다!

따라서 화면상의 어떤 부분의 UI 또는 logic(기능)이 `주변과 완전히 차별화` 되었을 때, 그 부분을 component로 따로 떼어내어 작성하시면 됩니다. (완전 다르게 생겼거나, 완전 특별한 기능을 갖고 있을 때)

## 4. DOM 깊이 최소화

매번 서버로부터 모든 데이터를 전송 받는는 웹 어플리케이션 특성상, 페이지의 용량과 구조에 따른 다운로드 속도가 유저가 느끼는 퍼포먼스에 많은 영향을 끼칩니다.

이때 페이지내 html 태그들의 `중첩 깊이`가 깊으면 깊을 수록 DOM의 렌더링 속도가 현저히 느려지는데요, 따라서 평소에 중첩을 최대한 줄이는 습관을 들이시면 좋습니다!

```tsx
// before : 줄별로 Space가 존재하고, Person[n]를 감싸는 Box 컴포넌트가 추가로 존재.
// depth : 4
<body>
	<Space>
		<Box>{Person[0]}</Box>
		<Box>{Person[1]}</Box>
	</Space>
	<Space>
		<Box>{Person[2]}</Box>
		<Box>{Person[3]}</Box>
	</Space>
</body>

// after : flex-wrap을 사용해 한 component안에 여러줄을 배치 + 추가로 감싸지 않고 ProfileCard를 그대로 배치.
// depth : 2
<CardsWrapper>
	{profiles
		.map(profile => (
			<ProfileCard key={profile.id} {...profile} />
	))}
</CardsWrapper>
```

## 5. 체이닝 패턴

체이닝 패턴이란 객체에 `연쇄적으로 메서드를 호출`할 수 있도록 하는 패턴입니다.

한 객체에 대해 여러가지 동작을 수행할 때, 호출을 여러 줄로 쪼개지 않고 한줄에 모을 수 있어 간략한 코드 작성에 도움이 됩니다.

```tsx
// before
profiles.sort((a, b) => a.age - b.age);
const filteredProfiles = profiles.filter(
  (profile) => profile.role !== '부회장'
);
const profileCards = filteredProfiles.map((profile) => (
  <ProfileCard {...profile} />
));
return profileCards;

// after : with chaining pattern
return profiles
  .filter((profile) => profile.role !== '부회장')
  .sort((a, b) => a.age - b.age)
  .map((profile) => <ProfileCard key={profile.id} {...profile} />);
```

## 6. jsx spread attributes

링크 : [https://gist.github.com/sebmarkbage/07bbe37bc42b6d4aef81](https://gist.github.com/sebmarkbage/07bbe37bc42b6d4aef81)

`spread operator`를 사용해서 객체 리터럴을 분해해 깔끔하게 prop으로 넘길 수 있습니다.

(객체를 통째로 넘기면 경우에 따라 렌더링 최적화가 제대로 이루어지지 않을 수 있으니 피해주세요)

```tsx
// bad : 객체를 통째로 넘김
<ProfileCard profile={profile}/>

// good : prop을 하나하나 넘김
<ProfileCard
	id={profile.id}
	name={profile.name}
	age={profile.age}
	...
/>

// best : jsx spread attributes를 활용해 한번에 넘김
<ProfileCard {...profile}/>
```

+) jsx spread attributes는 javascript환경에선 오작동할 여지가 있는 `안티패턴`입니다. [참고 링크](https://codeburst.io/react-anti-pattern-jsx-spread-attributes-59d1dd53677f)

하지만 이후에 배울 `typescript`를 사용하면 안전하게 쓸 수 있으니 걱정마세요!

## 7. 적절한 태그 사용 (semantic tag)

링크 : [https://www.semrush.com/blog/semantic-html5-guide/](https://www.semrush.com/blog/semantic-html5-guide/)

용도에 맞는 적절한 태그를 사용하면 검색 엔진 최적화에 큰 도움이 된답니다!

```tsx
// bad : 모두 div를 사용
const Name = styled.div``;
const Title = styled.div``;
const GNB = styled.div``;

// good : 용도에 맞는 태그를 사용
const Name = styled.p``;
const Title = styled.h1``;
const GNB = styled.nav``;
```

## 8. 자바스크립트 코딩 컨벤션 (명명 규칙) 준수

일관된 코딩 컨벤션은 가독성에 큰 도움이 됩니다!

```tsx
// bad
const Name - '최수민';
const namelist = () => {
	return ['수민', '병훈'];
};
const ProfileImg = styled.img``;

// good : 변수, 함수명은 camelCase로. 함수명은 동사로 시작, 배열은 복수형 명사로, 축약어는 되도록 X
const name = '최수민';
const getNames = () => ['수민', '병훈'];
const ProfileImage = styled.img``;
```

## 9. 배열 element에 key값 부여

링크 : [https://ko.reactjs.org/docs/lists-and-keys.html](https://ko.reactjs.org/docs/lists-and-keys.html)

key는 엘리먼트에 안정적인 고유성을 부여합니다. `re-render 최적화` 및 오류 방지를 위해 data의 `unique key`값으로 설정해주셔야합니다!

```tsx
// bad : no key
{
  profiles.map((profile) => <ProfileCard {...profile} />);
}

// bad : index for key - index는 해당 데이터의 unique key가 아닙니다!!
// 첫번째 데이터를 삭제하면, 두세번째 데이터를 바꾸지 않아도 해당 데이터들의 index가 바뀌기 때문.
{
  profiles.map((profile, index) => <ProfileCard key={index} {...profile} />);
}

// good : with unique key
{
  profiles.map((profile) => <ProfileCard key={profile.id} {...profile} />);
}
```

## 10. 정돈된, 그룹화된 import문

외부 모듈 import와 내부 모듈 import를 따로 배치해주세요. 가독성에 도움이 됩니다.

```tsx
// bad
import React from 'react';
import ProfileCard from '../src/components/profile-card';
import styled from 'styled-components';

// good
import React from 'react';
import styled from 'styled-components';

import ProfileCard from '../src/components/profile-card';
```

## 11. 가능하면 최대한 const를 사용

생각보다 let을 사용해야만 하는 상황이 흔치 않습니다.

let을 사용해야할 것 같으면, const로 바꿀 수 없을지 좀 더 고민해보세요!

```tsx
// bad1
let List = profiles.map((prop) => (

// good1 : const로 변경, camelCase로 변경, 화살표 함수 parameter 1개일 때 괄호 생략, 변수 이름 변경
const list = profiles.map(profile => (

// bad2
const list = [1, 2, 4, 3, 5];
let sum = 0;
for(let i = 0;i < 5;i++) {
	sum += list[i];
}

// good2 : Array.prototype.reduce 사용
const sum = [1, 2, 4, 3, 5].reduce((acc, curr) => acc + curr, 0);
```

## 12. commit할 때 주석은 최대한 제거

주석 없이도 이해 되는 코드가 좋은 코드입니다! 정말 불가피한 상황이 아니라면, 주석을 작성하기 보단 코드 구조 및 네이밍을 이해하기 쉽게 개선해보세요.

## 13. 하나의 파일에 하나의 component만 작성

한 파일에 여러 component를 작성하면 디버깅이 어려워집니다! 꼭 하나의 파일에 하나의 component만 작성해 주세요 ^^

### Refs

- [Chaing Pattern](https://webclub.tistory.com/528)
- [코딩 컨벤션 - 명명 규칙](https://ui.toast.com/fe-guide/ko_CODING-CONVENSION/#%EB%AA%85%EB%AA%85-%EA%B7%9C%EC%B9%99)
- [10 Ways Minimize Reflows Improve Performance](https://www.sitepoint.com/10-ways-minimize-reflows-improve-performance/)
