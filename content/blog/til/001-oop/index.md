---
layout: post
title: 객체 지향의 사실과 오해를 읽고
date: '2019-07-10T16:05:40.169Z'
tags: ['book']
thumbnail: 'oop.png'
---

조영호 지음, 위키북스

민철이형이 생일 선물로 준 책이다.😍

### **현실 세계와 객체**

소프트웨어 객체는 현실 객체의 모방이라기보단, 은유에 가깝다.<br>
창조한 객체의 특성을 최대한 상기시킬 수 있는 **이상한 나라**를 창조하라.

### **타입과 추상화**

추상화의 목적은 불필요한 부분을 무시함으로써 현실에 존재하는 복잡성을 극복하는 것이다.

    객체의 타입에 대한 원칙
    1. 객체의 타입을 결정하는 것은 객체가 수행하는 행동이다.
        => 같은 타입에 속한 객체는 행동만 동일하다면 서로 다른 데이터를 가질 수 있다. (다형성)
    2. 객체의 내부적인 표현은 외부로부터 철저하게 감춰진다. (캡슐화)

객체의 계층 또한 행동에 의해 결정된다. 두 타입 간에 일반화/특수화 관계가 성립하려면 한 타입이 다른 타입보다 더 특수하게 행동해야 하고 반대로 한 타입은 다른 타입보다 더 일반적으로 행동해야 한다.<br>
이때 좀 더 일반적인 타입을 Supertype이라고 하고 좀 더 특수한 타입을 Subtype이라고 한다.

타입은 추상화다. 타입은 시간에 따른 객체의 상태 변경이라는 복잡성을 단순화할 수 있는 효과적인 방법이다. (정적모델) ↔ (동적모델, 스냅샷)

결론 : 객체를 분류하는 기준은 타입이며, 타입을 나누는 기준은 객체가 수행하는 행동이다!

### **역할, 책임, 협력**

#### **책임**

책임은 객체의 public interface를 구성한다.
책임의 두 가지 분류 : 하는 것, 아는 것

    - 하는 것(doing) : 객체를 생성하거나 계산을 하는 등의 스스로 하는 것
        다른 객체의 행동을 시작시키는 것
        다른 객체의 활동을 제어하고 조절하는 것
    - 아는 것 (knowing) : 개인적인 정보에 관해 아는 것
        관련된 객체에 대해 아는 것
        자신이 유도하거나 계산할 수 있는 것에 관해 아는 것

객체는 다른 객체의 요청을 받아 책임을 수행한다.<br>
책임과 협력의 구조가 자리를 잡기 전까지는 책임을 구현하는 방법에 대한 고민은 잠시 뒤로 미루는 것이 좋다. (ex : 어떤 클래스가 필요하고 어떤 메소드를 포함해야 하는지)

#### **역할**

역할의 개념을 사용해 유사한 협력을 추상화해서 인지 과부하를 줄일 수 있다.<br>
역할은 협력 내에서 다른 객체로 대체할 수 있음을 나타내는 일종의 표식이다. 다만 그 객체는 동일한 메세지를 이해할 수 있어야만 한다.<br>
결국 동일한 역할을 수행할 수 있다는 것은 해당 객체들이 협력 내에서 동일한 책임의 집합을 수행할 수 있다는 것을 의미한다.<br>
역할은 객체지향 설계의 단순성(simplicity). 유연성(flexibility), 재사용성(reusability)을 뒷받침하는 핵심 개념이다.

#### **협력**

데이터/클래스가 아닌 협력을 중심으로 애플리케이션을 설계해야한다.<br>
예를 들어 '왕'의 인스턴스를 모델링할 경우 '왕관을 쓰고 멋진 수염을 기른 채 근엄을 표정으로 왕좌에 앉아 있는 모습'이 아닌, 왕이 참여하는 협력을 우선적으로 고려해야 한다.

#### **객체지향 설계 기법**

1. 책임-주도 설계 : 협력에 필요한 책임들을 식별하고 적합한 객체에게 책임을 할당.

   **책임-주도 설계 프로세스**<br>

   1. 시스템이 사용자에게 제공해야 하는 기능인 **시스템 책임**을 파악한다.<br>
   2. 시스템 책임을 더 작은 책임으로 **분할**한다.<br>
   3. 분할된 책임을 수행할 수 있는 적절한 객체 또는 역할을 찾아 **책임을 할당**한다.<br>
   4. 객체가 책임을 수행하는 중에 **다른 객체의 도움**이 필요한 경우 이를 책임질 적절한 객체 또는 역할을 찾는다.<br>
   5. 해당 객체 또는 역할에게 책임을 할당함으로써 **두 객체가 협력**하게 한다.
      <br>

2. 디자인 패턴 : 전문가들이 반복적으로 사용하는 해결 방법을 정의해 놓은 설계 템플릿의 모음. 책임-주도 설계의 결과를 표현한다.<br>
   **좋은 책**

   - GOF의 『디자인 패턴』[GOF 1994]
   - 조슈아 케리에브스키(Joshua Kerievsky)의 『패턴을 활용한 리팩터링』[Kerievsky 2004]

3. 테스트-주도 개발 : 테스트를 먼저 작성하고 테스트를 통과하는 구체적인 코드를 추가하면서 애플리케이션을 완성. 따로 공부해보자!

### **책임과 메시지**

객체들의 책임이 얼마나 자율적인지가 협력의 설계 품질을 결정하게 된다. 그 이유는 다음과 같다.

1. 자율적인 책임은 협력을 단순하게 만든다. (~~추상화~~)
2. 자율적인 책임은 객체의 외부(~~인터페이스~~)와 내부(~~구현~~)를 명확하게 분리한다. (~~캡슐화~~)
3. 책임이 자율적일 경우 책임을 수행하는 내부적인 방법(~~구현~~)을 변경하더라도 외부(~~인터페이스~~)에 영향을 미치지 않는다.
4. 자율적인 책임은 협력의 대상을 다양하게 선택할 수 있는 ~~유연성~~을 제공한다.
5. 객체가 수행하는 책임들이 자율적일수록 객체의 ~~역할~~을 이해하기 쉬워진다.

객체지향의 강력함을 누리기 위한 출발점은 책임을 자율적으로 만드는 것이며, 이것은 선택하는 메시지에 따라 달라진다.<br>
메시지를 믿어라. 메시지를 중심으로 유연하고 확장 가능하며 재사용 가능한 구조를 설계하라!

### **객체 지도**

> 자주 변경되는 기능이 아니라 안정적인 구조를 따라 역할, 책임, 협력을 구성하라.

> 안정적인 도메인 모델을 기반으로 시스템의 기능을 구현하라. 도메인 모델과 코드를 밀접하게 연관시키기 위해 노력하라.

소프트웨어 설계의 두가지 측면

1. 기능적 측면 : 제품이 사용자를 위해 무엇을 할 수 있는가
2. 구조적 측면 : 제품의 형태가 어떠해야 하는가

훌륭한 기능은 훌륭한 소프트웨어를 만들기 위한 필요조건이며, 훌륭한 구조는 훌륭한 소프트웨어를 만드는 충분조건이다. 훌륭한 구조를 갖춘 소프트웨어는 사용자가 원하는 ~~새로운 기능~~을 빠르고 안정적으로 추가할 수 있다. 즉, 설계라는 행위를 중요하게 만드는 것은 ~~변경~~에 대한 필요성이다.

소프트웨어 객체를 창조하기 위해 우리는 사용자가 도메인에 대해 생각하는 ~~개념들~~ 즉, ~~도메인 모델~~을 은유해야 한다. 이를 통해 사용자가 도메인을 바라보는 관점을 그대로 코드에 반영할 수 있으며, 사용자의 멘탈 모델이 그대로 코드에 녹아 스며들도록 할 수 있다.

도메인에 대한 사용자의 관점은 무엇보다도 ~~본질적~~이다. 그러므로 다양한 요구사항에 따라 변경되는 기능에 비해 훨씬 ~~안정적~~이다.(변경될 확률이 적다.)<br>
안정적인 구조를 기반으로 자주 변경되는 기능을 배치하는 것이 객체지향적 설계의 기본이다.

#### **유스케이스**

도메인 모델이 안정적이고 본질적이지만 실제로 사용자에게 중요한 것은 도메인 모델이 아닌 소프트웨어의 기능이다. 다양한 기술들을 정리하기 위해 유스케이스라는 ~~텍스트~~ 기술 기법이 사용된다.<br>
유스케이스는 시스템의 이해관계자들 간의 계약을 ~~행위 중심~~으로 파악한다. 특별한 요청과 관계되는 조건에 따라 서로 다른 일련의 행위 혹은 ~~시나리오~~가 전개될 수 있다.<br>
유스케이스는 당연히 사용자 인터페이스와 관련된 세부 정보를 포함하지 않으며, 내부 설계와 관련된 정보도 마찬가지로 포함하지 않는다.

#### **객체 지향적 설계** : 유스케이스에 정리된 시스템의 기능을 도메인 모델을 기반으로 한 객체들의 책임으로 ~~분배~~하는 것!!

_찾아보기 : STRATEGY 패턴_

### **함께 모으기**

명세 관점과 구현 관점을 분리하라.<br>
명세 관점인 객체의 인터페이스가 설계를 주도하게 하면 설계의 품질이 향상될 수 있다는 사실을 기억하라.<br>
캡슐화를 위반해서 구현을 인터페이스 밖으로 노출해서도 안 되고,<br>
인터페이스와 구현을 명확하게 분리하지 않고 흐릿하게 섞어놓아서도 안 된다.
