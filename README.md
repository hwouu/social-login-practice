# Social Login Practice

소셜 로그인(구글, 카카오) 구현 프로젝트

## 기능
- 구글 로그인
- 카카오 로그인
- 사용자 프로필 조회

## 기술 스택
- React
- React Router DOM
- Tailwind CSS
- OAuth 2.0

## 설치 및 실행 방법
1. 저장소 클론
```bash
git clone https://github.com/your-username/social-login-practice.git
cd social-login-practice
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env` 파일을 생성하고 다음 변수들을 설정:
```plaintext
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000/callback/google
REACT_APP_KAKAO_CLIENT_ID=your_kakao_client_id
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/callback/kakao
```

4. 개발 서버 실행
```bash
npm start
```

## 주의사항
- .env 파일은 깃허브에 업로드하지 않습니다
- 클라이언트 ID는 보안을 위해 직접 발급받아 사용해야 합니다

## 라이센스
MIT License
