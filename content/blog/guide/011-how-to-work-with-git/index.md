---
layout: post
title: 'git 협업 기본 가이드 (명령어 & 활용)'
date: '2020-11-28T23:55:10.169Z'
tags: ['git']
thumbnail: git.jpg
---

이 글에서는 git의 기본 명령어들에 대해서 정리하고, 협업시 지켜야할 기본 규칙들에 대해 설명해 보겠습니다.

## Git을 왜 사용하나요?

<i>(이제는 모두가 당연하게 git을 사용하기 때문에, 다른 버전관리 시스템과 git과의 차별점은 다루지 않겠습니다.)</i>

git을 사용함으로써 얻을 수 있는 이익은 다음과 같습니다.

1. 각자가 작업한 내용을 ~~쉽고 명확하게 합칠~~ 수 있습니다.
2. 코드를 버전별로 저장하고 특정 시점으로 돌아갈 수 있습니다.
3. 저장된 코드 기록을 쉽게 열람할 수 있습니다.

따라서, git은 위의 3가지 장점을 극대화하는 방향으로 활용해주시면 됩니다.

## Git의 3가지 상태

git에서 관리되는 파일들은 modified, staged, commited라는 3가지 상태를 가집니다.

1. modified: 말 그대로 파일이 수정된 상태입니다.
2. staged: 수정된 파일이 staging area로 올라간 상태입니다.
3. commited: 커밋된 상태입니다. staged 상태인 파일만 커밋할 수 있습니다.

## 자주 사용하는 명령어들

### 1. 저장소

```shell
# 저장소 생성
$ git init

# 원격 저장소로부터 복제
$ git clone (url)

# 원격 저장소 추가
git remote add origin (url)
```

### 2. 파일 상태 변경

```shell
# 변경 상태 체크
git status

# 특정 파일 stage
git add (file-name)

# 변경된 모든 파일 stage
git add *

# 모든 stage 취소
$ git reset HEAD *

# 커밋
git commit -m "message"

# 원격 저장소로 커밋 업로드
git push origin (branch-name)

# 원격 저장소의 내용 가져와 병합하기
git pull origin (branch-name)
```

### 3. 커밋 (상세)

```shell
# 커밋 취소
$ git reset HEAD^ // 마지막 커밋 삭제
$ git reset --soft HEAD^ // 마지막 커밋을 staged 상태로 변경
$ git reset --hard HEAD // 마지막 커밋 상태로 되돌림

# 마지막 커밋 내용 변경 + 메세지 수정
$ git commit --amend

# 커밋 로그
$ git log // 모든 커밋로그 확인
$ git log -3 // 최근 3개 커밋로그 확인
$ git log --oneline // 각 커밋을 한 줄로 표시
$ git reflog // reset 혹은 rebase로 없어진 과거의 커밋 이력 확인

# 커밋 로그 (상세한 변경점 포함)
$ git show

# 커밋 합치기
$ git rebase -i HEAD~4 // 최신 4개의 커밋을 하나로 합치기
```

### 4. stash

```shell
# stage 상태인 파일들을 임시 저장
$ git stash

# stash 목록
$ git stash list

# stash 가져오기
$ git stash pop // 가장 최근의 stash를 가져오고 제거한다.
$ git stash apply // 가장 최근의 stash를 가져오고 제거하진 않는다.

# stash 삭제
$ git stash drop // 가장 최근의 stash를 삭제한다.
```

### 5. 브랜치

```shell
# 브랜치 이동
$ git checkout (branch-name)

# 브랜치 목록
$ git branch // 로컬
$ git branch -r // 리모트
$ git branch -a // 로컬 + 리모트

# 브랜치 생성
$ git checkout -b (branch-name)

# 리모트 브랜치 가져오기
$ git remote update // remote branch ref를 업데이트한다. (fetch)
$ git checkout -t origin/(branch-name)

# 브랜치 삭제
$ git branch -D (branch-name)

# 브랜치 이름 변경
$ git branch -m (branch-name)
```

## 알아두면 유용한 꿀팁

1. ~~git commit --amend~~를 사용해 커밋 메세지뿐만 아니라 내용을 수정, 추가할 수도 있습니다.

```shell
# 마지막 커밋 내용에 a.txt를 추가하고 메세지는 변경하지 않음.
$ git add ./a.txt
$ git commit --amend --no-edit // —-no-edit 를 적어주면 커밋 메세지 수정을 안하게 됩니다.
```

<br>

2. **리모트에 반영된 커밋들의 히스토리를 변경하지 마세요.**<br>
   커밋 히스토리를 변경하면 작업중이던 다른 사람들도 영향을 받습니다.

<br>

3. **커밋은 자주, push는 필요할 때만 하세요.**<br>
   일단 push를 해버리면 변경점을 되돌리기 쉽지 않습니다.<br>
   또, git 저장소에 CI/CD가 설정되어 있는 경우 불필요한 자원 낭비가 발생할 수 있습니다.

## Refs

- [git-usage](https://github.com/jeonghwan-kim/git-usage)
- [[Git] 어떻게 Git 전문가가 되는가? (amend, rebase)](https://dongmin-jang.medium.com/git-%EC%96%B4%EB%96%BB%EA%B2%8C-git-%EC%A0%84%EB%AC%B8%EA%B0%80%EA%B0%80-%EB%90%98%EB%8A%94%EA%B0%80-amend-rebase-3d3d31acbe5a)
