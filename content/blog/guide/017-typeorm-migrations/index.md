---
layout: post
title: 'TypeORM Migration 작성 요령'
date: '2021-07-09T02:18:10.16+09:00'
tags: ['typeorm']
thumbnail: typeorm.png
---

## 소개

MIgration이란? 데이터베이스 스키마에 대한 변경 이력을 그때그때 남겨놓은 파일입니다. 다음과 같은 효과가 있습니다.

- 특정 시점으로 되돌리기 쉬움
- 변경 이력을 누구나 볼 수 있게 됨
- cli로 직접 접속해서 명령어를 칠 부담이 없어짐

보통 TypeORM의 auto generation된 파일을 조금 다듬는 것만으로 충분하지만, 특별한 상황에서는 직접 명령어를 작성해줘야할 수 있습니다.

이 문서는 대표적인 특별한 상황들에서 어떻게 Migration을 작성해야하는지에 대해서 설명합니다.

## NOT NULL 컬럼 추가

default value가 지정되지 않은 NOT NULL인 컬럼을 새로 추가하면, 기존의 레코드들은 해당 컬럼 값이 없기 때문에 에러가 납니다. 따라서 아래와 같은 절차로 추가해줘야합니다.

1. 일단 NULLABLE로 추가
2. 값 채우기
3. NOT NULL로 변경

아래는 Migration file 예시입니다.

```tsx
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentEnvOrigin1625808259780 implements MigrationInterface {
  name = 'AddPaymentEnvOrigin1625808259780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 일단 nullable로 추가
    await queryRunner.query(
      "ALTER TABLE `payment` ADD `env` enum ('pc', 'mobile') NULL"
    );
    await queryRunner.query(
      'ALTER TABLE `payment` ADD `origin` varchar(255) NULL'
    );
    // 값 채우기
    await queryRunner.query(
      "UPDATE `payment` SET env = 'pc', origin = 'https://pickk.one/orders/sheet'"
    );
    // NOT NULL로 변경
    await queryRunner.query(
      "ALTER TABLE `payment` CHANGE `env` `env` enum ('pc', 'mobile') NOT NULL"
    );
    await queryRunner.query(
      'ALTER TABLE `payment` CHANGE `origin` `origin` varchar(255) NOT NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `payment` DROP COLUMN `origin`');
    await queryRunner.query('ALTER TABLE `payment` DROP COLUMN `env`');
  }
}
```

## Enum 값 변경

PaymentStatus라는 enum이 존재하고, DB에 다음과 같이 적용되어 있다고 가정해보겠습니다.

```tsx
export declare enum PaymentStatus {
  /** 미결제 */
  Ready = 'ready',
  /** 결제완료 */
  Paid = 'paid',
  /** 전액취소 */
  Cancelled = 'cancelled',
  /** 부분취소 */
  PartialCancelled = 'partial_cancelled',
  /** 결제실패 */
  Failed = 'failed',
}
```

```tsx
@Column({
  type: 'enum',
  enum: PaymentStatus,
})
status: PaymentStatus;
```

다음과 같이 Ready가 제거되고 Pending, VbankReady를 추가할 예정입니다.

```tsx
export declare enum PaymentStatus {
  /** 미결제 */
  Pending = 'pending',
  /** 가상계좌 입금대기 */
  VbankReady = 'vbank_ready',
  /** 결제완료 */
  Paid = 'paid',
  /** 전액취소 */
  Cancelled = 'cancelled',
  /** 부분취소 */
  PartialCancelled = 'partial_cancelled',
  /** 결제실패 */
  Failed = 'failed',
}
```

이때 자동 생성된 Migration file은 다음과 같습니다.

```tsx
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePaymentStatus1625768198250 implements MigrationInterface {
  name = 'UpdatePaymentStatus1625768198250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `payment` CHANGE `status` `status` enum ('pending', 'vbank_ready', 'paid', 'cancelled', 'partial_cancelled', 'failed') NOT NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `payment` CHANGE `status` `status` enum ('ready', 'paid', 'cancelled', 'partial_cancelled', 'failed') NOT NULL"
    );
  }
}
```

단순히 column의 available enum values를 변경하고 있는 모습입니다.

기존 데이터가 존재하지 않는다면 상관 없지만, 데이터가 있는 상황이라면 위의 Migration은 정상적으로 작동하지 않습니다. 삭제되는 enum value들을 처리하지 않기 때문입니다.

원활한 Migration을 위해서, 우리는 다음과 같은 과정을 거쳐야합니다.

1. column의 available enum values를 변경전과 변경후의 합집합으로 설정한다.
2. 삭제되는 enum value들을 새로운 enum value들에 적절히 mapping한다.
3. column의 available enum values를 예정대로 변경한다.

revert할때도 마찬가지입니다. 이를 Migration file로 옮기면 다음과 같습니다.

```tsx
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePaymentStatus1625768198250 implements MigrationInterface {
  name = 'UpdatePaymentStatus1625768198250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `payment` CHANGE `status` `status` enum ('ready', 'pending', 'vbank_ready', 'paid', 'cancelled', 'partial_cancelled', 'failed') NOT NULL"
    );
    await queryRunner.query(
      "UPDATE `payment` SET status = CASE status WHEN 'ready' THEN 'vbank_ready' END WHERE status = 'ready'"
    );
    await queryRunner.query(
      "ALTER TABLE `payment` CHANGE `status` `status` enum ('pending', 'vbank_ready', 'paid', 'cancelled', 'partial_cancelled', 'failed') NOT NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `payment` CHANGE `status` `status` enum ('ready', 'pending', 'vbank_ready', 'paid', 'cancelled', 'partial_cancelled', 'failed') NOT NULL"
    );
    await queryRunner.query(
      "UPDATE `payment` SET status = CASE status WHEN 'vbank_ready' THEN 'ready' WHEN 'pending' THEN 'ready' END WHERE status IN ('vbank_ready', 'pending')"
    );
    await queryRunner.query(
      "ALTER TABLE `payment` CHANGE `status` `status` enum ('ready', 'paid', 'cancelled', 'partial_cancelled', 'failed') NOT NULL"
    );
  }
}
```

기존 Ready를 모두 VbankReady로 mapping하는 대신, 상황에 맞게 Pending 또는 VbankReady로 선택하고 싶을 수 있습니다. 이런 경우 Javascript 코드를 좀 더 추가해야할 수 있습니다.

### References

- [Can I rename the values in a MySQL ENUM column in one query?](https://dba.stackexchange.com/questions/6547/can-i-rename-the-values-in-a-mysql-enum-column-in-one-query)
