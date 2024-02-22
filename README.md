This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# 프로젝트 개요

nextauth,calender,checkout 결제, 기본페이지, 카트 푸터 링크태그 섹션등의 레이아웃 제작, 다음과 카카오 api를 활용한 map 기능,  오더페이지(토스페이를 활용), 페이지네이션, 프로필 페이지 구현, 검색기능(아직 해야함), 로더 모달등의 ui 제작, 리덕스 활용

## 상품 생성 및 정보 저장

- Admin 페이지에서 Firebase를 활용하여 상품 이미지를 저장하고, 나머지 정보는 Firestore에 저장하는 기능을 구현했습니다.
- Products 페이지에서는 Firestore에서 상품 정보를 동적으로 받아오도록 설정했습니다.

## 카트 구현

- 모달을 활용하여 사용자 카트를 효과적으로 구현하였으며, Redux를 활용하여 카트 정보를 저장하고 상태를 효과적으로 관리합니다.

## 결제

- 토스페이먼트(Toss Payments)를 활용하여 결제 기능을 구현하였습니다. 결제 후 주문 요약 페이지로 자동 이동하여 주문 내역을 사용자가 확인할 수 있도록 구현했습니다.

## Business 소개

- useState 훅을 활용하여 캐러셀로 사업 분야를 동적으로 구현하였습니다. 주의 깊게 디자인하여 사용자가 한눈에 알아볼 수 있도록 구현했습니다.

## 메인 네비게이션

- CSS를 활용하여 모바일과 웹에서 다르게 보이도록 구현했습니다. 호버 효과와 더보기 버튼을 통해 모달을 사용하여 더 많은 내용을 확인할 수 있도록 구현했습니다.

## 회사 소개 페이지

- 마크다운을 활용하여 저장된 사진과 텍스트를 통해 회사 정보를 자세히 나타내었습니다.

## 게시판

- Next Auth를 사용하여 구글, 네이버, 카카오 등의 크리덴셜 로그인 기능을 구현했습니다. 크리덴셜로 로그인, 로그아웃, 회원가입 등을 할 때 상태를 Notification 컴포넌트를 활용하여 사용자에게 알림으로 표시했습니다. 로그인 시 유저 정보를 리덕스에 저장하고 저장 시에 영구히 저장되며 로그아웃하면 자동으로 지워지도록 구현했습니다. 프로필 페이지로 이동하는 기능을 구현했습니다.

## CEO 소개

- Next Image와 fill 속성을 이용하여 동적으로 대표 소개를 표시하도록 설계했습니다.

## 컨택 페이지

- 몽고디비를 이용하여 문의를 넣을 수 있는 기능을 구현했습니다. Notification 컴포넌트를 tostify처럼 활용하여 사용자에게 메시지를 전달했습니다.


