# Frontend-Codiary

![React](https://img.shields.io/badge/React-18.3.1-blue)
![License](https://img.shields.io/badge/license-Apache2.0-green)

## 프로젝트 소개

프로젝트에 대한 상세 설명을 여기에 작성하세요. 이 프로젝트의 목적, 주요 기능, 사용된 기술 스택 등을 설명합니다.

## 시작하기

프로젝트 실행 방법

### 설치

프로젝트를 클론하고 필요한 패키지를 설치합니다.

```bash
git clone https://github.com/Codiary-UMC-6th/Frontend-Codiary.git
cd Frontend-Codiary
npm install
```

### 실행

```bash
npm start
```

## 프로젝트 구조

project-root
├── node_modules/
├── public/
├── src/
│   ├── assets/      # 이미지 등의 애셋
│   ├── components/  # 컴포넌트
│   ├── config/      # 설정 관련
│   ├── hooks/       # 커스텀 훅
│   ├── pages/       # 페이지
│   ├── App.js
│   └── index.js
├── .gitignore       
├── LICENSE          
├── package.json     
├── package-lock.json
└── README.md        # 리드미 파일

## 기여 방법

####1. issues 탭의 new issue를 클릭하여 이슈를 생성합니다.
    * 적절한 label을 선택합니다.
    * issue title 형식
        [label명] 이슈 타이틀 이슈 타이틀

####2. 우측 development - Create a branch를 클릭하여 브랜치를 생성합니다
    * 브랜치명 형식
        label명/number

####3. 로컬에서 명령어를 실행하여 브랜치를 전환합니다.
```bash
git fetch origin
git checkout
```

####4. 기능 구현, 리팩토링, 버그 수정 등 열심히 코딩합니다.

####5. 명령어를 수행하여 작업 상황을 반영합니다.
```bash
git add .
git commit -m "커밋 메시지"
git push
```
    * 커밋 메시지 형식
        [label] commit message

####6. 깃허브 레포지토리 페이지에서 Compare & pull request를 클릭하여 pull reqeust를 생성합니다.
    * 알맞은 label 선택
    * 기록할 내용이 있다면 description에 작성 (작업 내용, 변경 사항 등)

####7. Confilt가 없다면 Merge pull request를 클릭하여 develop branch로 merge 합니다.

####8. Delete branch를 클릭하여 작업 branch를 삭제합니다.

