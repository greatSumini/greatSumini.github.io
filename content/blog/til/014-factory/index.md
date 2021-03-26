---
layout: post
title: 'Factory Pattern 개념부터 적용까지'
date: '2021-03-26T16:55:10.16+09:00'
tags: ['design pattern']
thumbnail: milk-factory.png
---

안녕하세요! 오늘은 Factory 패턴과 DDD의 factory에 대해서 알아보고, Typescript로 구현해보겠습니다~

- 관련 개념: Template, Abstract Factory, Prototype, Builder Pattern

## Factory란?

> A Factory is an object that has the single responsibility of creating other objects.

Factory는 다른 객체를 생성하는 역할만을 수행하는 객체입니다. 어떤 객체의 constructor를 직접 호출하는 대신, Factory 내부에 미리 만들어둔 method를 호출해 객체를 생성합니다.

아래 코드는 Factory를 간단히 사용해본 예시입니다.

```tsx
const sumin = UsersFactory.create({name: '최수민'});

const seller = UsersFactory.create({name: '브랜드 담당자'}, UserRole.Seller);

const admin = UsersFactory.create({name: '핔 관리자'}, UserRole.Admin);
```

## Factory의 장점은?

1. **생성 로직 분리**

	DDD를 적용해 개발하다보면 서비스(어플리케이션) 계층의 로직들을 최대한 도메인 계층으로 모아놓게 되는데요, 이 과정을 `도메인 엔티티의 응집성을 높인다`고 합니다.
	
	응집성이 높은 모델은 관련된 코드들이 모두 한 파일내로 모여, 가독성과 재사용성이 높다는 장점이 있습니다.
	
	그런데 어떤 모델이 여러 상황에 쓰이기 시작하면, 모든 로직을 담고 있는 엔티티 파일이 `과하게 비대`해질 수 있습니다.
	엔티티가 비대해지면(1000~2000줄) 수정할 메서드를 찾기 어렵고, 여러 명이 하나의 거대 파일을 수정하게 되어 Git과 같은 버전 관리 도구에서 `충돌이 자주 발생`하게 됩니다.
	
	이때 객체 자체를 생성하는 책임을 Factory로 분리함으로써 객체의 복잡성을 덜어내고, `생성자를 단순하게 유지`할 수 있습니다.

2. **추상화**

    클라이언트 사이드에서 필요한 정보와 일관성 검사를 수행하게되면 객체와 사용 맥락이 결합되어 추후 유지보수가 어려워집니다.
	
	Factory를 통해 구체적인 `생성 과정을 추상화`하면서 클라이언트에게 `인터페이스만 제공`하면 더 표준화된 방식으로 객체의 생성 과정을 유지할 수 있습니다.

	아래 코드는 UserPassword 객체를 생성하는 Factory 예시입니다. 클라이언트가 입력값만 넘기면 Factory 내부에서 validate, sale 생성등의 `구체적인 로직들을 수행합`니다.

	```tsx
	export class UserPasswordFactory {
      private static validRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_=(),./:;{}[\]|\\<>-]).{8,}$/;

	  public static create(password: string): UserPassword {
	    if (!this.validate(password)) {
	      throw new UserPasswordInvalidException();
	    }
  
	    const salt = bcrypt.genSaltSync();
	    return new UserPassword({
		  salt,
		  encrypted: bcrypt.hashSync(password, salt),
		  createdAt: new Date(),
	    });
	  }

	  /**
	  * 입력된 비밀번호가 규칙에 맞는지 검증합니다. (영문+숫자+특수문자, 총 8글자 이상)
	  * @param password 검증할 비밀번호 문자열
	  * @returns 통과 여부 boolean
	  */
	  private static validate(password: string): boolean {
		if (typeof password !== 'string') {
		  return false;
		}

		return this.validRegex.test(password);
	  }
	}

	// 사용 예시
	user.password = UserPasswordFactory.create(inputPassword);
	```

3. **캡슐화**

    구체적인 객체나 Aggregate의 내부 객체들의 생성 과정을 클라이언트로부터 캡슐화할 수 있습니다.

## 구현시 주의할 점들

```tsx
export class UsersFactory {
	public static create(createUserInput: CreateUserInput, role?:UserRole = UserRole.User): Seller {
		return new User({
			...createUserInput,
			role,
		});
	}
}

...

const sumin = UsersFactory.create({name: '최수민'});

const suare = UsersFactory.create({name: '수아레 담당자'}, UserRole.Seller);

const hyungwee = UsersFactory.create({name: '핔 관리자'}, UserRole.Admin);
```

1. create라는 이름의 static method를 갖습니다. 이 method는 object 구현에 필요한 정보들을 parameter로 받아, 생성된 객체를 반환합니다.
2. Factory는 create 외의 책임을 가져서는 안 됩니다.
3. create method의 parameter를 통해 특정 field를 강조하거나 조작할 수 있습니다.

## 참고

- [Factory method pattern (wikipedia)](https://en.wikipedia.org/wiki/Factory_method_pattern)
- [What are Factories in Domain Driven Design?](https://culttt.com/2014/12/24/factories-domain-driven-design/)
- [Factory Method](https://refactoring.guru/design-patterns/factory-method)
- [팩토리 메소드 패턴(Factory Method Pattern)](https://jdm.kr/blog/180)