// pages/api/error/already-registered.js
export default function handler(req, res) {
    // 직접적인 에러 페이지 접근을 허용하지 않으며, 404 상태 코드를 반환합니다.
    res.status(404).end();
  }