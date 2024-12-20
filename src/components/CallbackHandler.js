import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CallbackHandler() {
  const { provider } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      if (provider === "google") {
        const hash = window.location.hash;
        console.log("Full hash:", hash); // 디버깅용

        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        console.log("Parsed access token:", accessToken); // 디버깅용

        if (accessToken) {
          try {
            // 토큰 저장 전에 유효성 확인
            const userInfoResponse = await fetch(
              "https://www.googleapis.com/oauth2/v1/userinfo",
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            if (userInfoResponse.ok) {
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("provider", "google");
              navigate("/dashboard");
            } else {
              console.error("Invalid token");
              navigate("/");
            }
          } catch (error) {
            console.error("Error validating token:", error);
            navigate("/");
          }
        } else {
          navigate("/");
        }
      }

      if (provider === "kakao") {
        const code = new URLSearchParams(window.location.search).get("code");
        const error = new URLSearchParams(window.location.search).get("error");

        if (error) {
          // 사용자가 로그인을 취소한 경우
          console.log("Login cancelled by user");
          alert("로그인이 취소되었습니다.");
          navigate("/");
          return;
        }

        if (!code) {
          alert("인증 코드를 받아오지 못했습니다. 다시 시도해주세요.");
          navigate("/");
          return;
        }

        try {
          const formData = new URLSearchParams();
          formData.append("grant_type", "authorization_code");
          formData.append("client_id", process.env.REACT_APP_KAKAO_CLIENT_ID);
          formData.append(
            "redirect_uri",
            process.env.REACT_APP_KAKAO_REDIRECT_URI
          );
          formData.append("code", code);

          const tokenResponse = await fetch(
            "https://kauth.kakao.com/oauth/token",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
              body: formData,
            }
          );

          if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            throw new Error(
              `Token request failed: ${errorData.error_description}`
            );
          }

          const tokenData = await tokenResponse.json();
          if (!tokenData.access_token) {
            throw new Error("Access token not received");
          }

          localStorage.setItem("accessToken", tokenData.access_token);
          localStorage.setItem("provider", "kakao");
          navigate("/dashboard");
        } catch (error) {
          console.error("Login error:", error);
          navigate("/");
        }
      }
    };

    handleCallback();
  }, [provider, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold">로그인 처리 중...</h2>
        <p className="mt-2 text-gray-600">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}

export default CallbackHandler;
