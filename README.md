# React 게임 리뷰 목록 시스템 CI/CD 환경 구축

## 1. 프로젝트 소개

본 프로젝트는 React와 TypeScript를 활용하여 구현한 간단한 게임 리뷰 목록 시스템입니다.

사용자는 등록된 게임 리뷰 목록을 확인할 수 있으며, 게임 제목 검색, 장르별 필터링, 평점순 정렬, 상세 리뷰 확인 기능을 사용할 수 있습니다.

또한 GitHub Actions를 활용하여 `main` 브랜치에 코드가 push될 때마다 자동으로 프로젝트를 빌드하고, AWS S3 정적 웹사이트 호스팅 환경에 배포되도록 CI/CD 환경을 구성했습니다.

---

## 2. 프로젝트 주제

**React 기반 게임 리뷰 목록 시스템**

본 시스템은 실제 게임 리뷰 서비스의 기본적인 목록 조회 기능을 간단하게 구현한 웹 애플리케이션입니다.  
백엔드와 데이터베이스를 사용하는 풀스택 서비스는 아니며, React의 상태 관리와 샘플 데이터를 활용하여 프론트엔드 중심의 기능을 구현했습니다.

---

## 3. 주요 기능

### 3.1 게임 리뷰 목록 조회

등록된 게임 리뷰 데이터를 카드 형태로 출력합니다.

각 게임 리뷰는 다음 정보를 포함합니다.

- 게임 제목
- 장르
- 평점
- 한 줄 요약 리뷰
- 추천 여부

### 3.2 게임 제목 검색

검색창에 게임 제목을 입력하면 해당 키워드가 포함된 게임 리뷰만 표시됩니다.

### 3.3 장르별 필터링

장르 선택 기능을 통해 특정 장르의 게임 리뷰만 확인할 수 있습니다.

지원 장르 예시:

- RPG
- FPS
- MOBA
- Action
- Adventure
- Simulation

### 3.4 평점순 정렬

게임 리뷰를 평점 기준으로 정렬할 수 있습니다.

- 기본순
- 평점 높은순
- 평점 낮은순

### 3.5 상세 리뷰 보기

각 게임 카드의 `상세 보기` 버튼을 클릭하면 모달 창을 통해 자세한 리뷰 내용을 확인할 수 있습니다.

---

## 4. 사용 기술

| 구분 | 기술 |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | CSS |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Deployment | AWS S3 Static Website Hosting |

---

## 5. 프로젝트 구조

```txt
game-review-ci-cd/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ public/
├─ src/
│  ├─ data/
│  │  └─ reviews.ts
│  ├─ types/
│  │  └─ review.ts
│  ├─ App.tsx
│  ├─ App.css
│  ├─ index.css
│  └─ main.tsx
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 6. 로컬 실행 방법
6.1 의존성 설치
```bash
npm install
```
6.2 개발 서버 실행
```bash
npm run dev
```
6.3 빌드
```bash
npm run build
```
빌드가 성공하면 `dist` 폴더가 생성됩니다.

---

## 7. CI/CD 구성
본 프로젝트는 GitHub Actions를 이용하여 CI/CD 환경을 구성했습니다.

`main` 브랜치에 코드가 push되면 GitHub Actions workflow가 자동으로 실행됩니다.

### 7.1 CI 과정

CI 단계에서는 프로젝트가 정상적으로 빌드되는지 확인합니다.

동작 과정은 다음과 같습니다.

1. GitHub Repository 코드 가져오기
2. Node.js 환경 설정
3. 의존성 설치
4. React 프로젝트 빌드

### 7.2 CD 과정

빌드가 성공하면 생성된 `dist` 폴더의 정적 파일들을 AWS S3 버킷에 업로드합니다.

동작 과정은 다음과 같습니다.

1. GitHub Secrets에 저장된 AWS 인증 정보 사용
2. AWS 자격 증명 설정
3. `dist` 폴더의 파일을 S3 버킷에 동기화
4. S3 정적 웹사이트 호스팅 주소를 통해 배포된 웹사이트 접속

---

## 8. GitHub Actions Workflow
본 프로젝트에서 사용한 workflow 파일은 다음 경로에 위치합니다.

```bash
.github/workflows/deploy.yml
```

workflow의 주요 동작은 다음과 같습니다.

```yaml
name: Deploy React App to S3

on:
  push:
    branches:
      - main
```

`main` 브랜치에 push가 발생하면 자동으로 workflow가 실행됩니다.

배포 단계에서는 다음 명령어를 사용하여 빌드 결과물을 S3에 업로드합니다.
```bash
aws s3 sync dist s3://${{ secrets.S3_BUCKET_NAME }} --delete
```
이 명령어를 통해 dist 폴더의 내용이 S3 버킷과 동기화되며, 기존에 불필요하게 남아 있는 파일은 삭제됩니다.

---

## 9. GitHub Secrets 설정
AWS Access Key와 S3 버킷 이름은 보안상 코드에 직접 작성하지 않고 GitHub Secrets에 등록하여 사용했습니다.

등록한 Secrets는 다음과 같습니다.

| Secret 이름             | 설명                         |
| --------------------- | -------------------------- |
| AWS_ACCESS_KEY_ID     | IAM 사용자의 Access Key ID     |
| AWS_SECRET_ACCESS_KEY | IAM 사용자의 Secret Access Key |
| AWS_REGION            | AWS 리전                     |
| S3_BUCKET_NAME        | 배포 대상 S3 버킷 이름             |

---

## 10. AWS S3 배포 방식
본 프로젝트는 AWS S3의 정적 웹사이트 호스팅 기능을 사용하여 배포했습니다.

React 프로젝트는 빌드 후 HTML, CSS, JavaScript 정적 파일로 변환됩니다.
따라서 별도의 백엔드 서버 없이 S3 버킷에 빌드 결과물을 업로드하여 웹사이트를 제공할 수 있습니다.

### S3 설정 내용
- S3 버킷 생성
- 정적 웹사이트 호스팅 활성화
- 인덱스 문서: index.html
- 오류 문서: index.html
- 퍼블릭 읽기 접근을 위한 버킷 정책 설정

---

## 11. 배포 주소
아래 주소에서 배포된 웹사이트를 확인할 수 있습니다.
```
http://game-review-ci-cd-jyan-202605.s3-website.ap-northeast-2.amazonaws.com/
```

---

## 12. 구현 결과 요약
본 프로젝트를 통해 다음 내용을 실습했습니다.

- React와 TypeScript 기반 웹 애플리케이션 구현
- Vite를 활용한 프론트엔드 프로젝트 빌드
- GitHub Repository 생성 및 코드 push
- GitHub Actions workflow 작성
- GitHub Secrets를 이용한 AWS 인증 정보 관리
- AWS S3 정적 웹사이트 호스팅 설정
- GitHub Actions를 통한 자동 빌드 및 자동 배포 구성