import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const provider = localStorage.getItem("provider");
    console.log("Dashboard - Provider:", provider);
    console.log("Dashboard - Token exists:", !!token);

    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        let endpoint;
        if (provider === "google") {
          endpoint = "https://www.googleapis.com/oauth2/v1/userinfo";
        } else if (provider === "kakao") {
          endpoint = "https://kapi.kakao.com/v2/user/me";
        }

        console.log("Fetching user info from:", endpoint);

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User info response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("User info received:", data);

          // 카카오와 구글의 응답 형식 통일
          const normalizedData =
            provider === "kakao"
              ? {
                  name: data.properties?.nickname || "Unknown",
                  email: data.kakao_account?.email,
                  picture: data.properties?.profile_image,
                }
              : data;

          setUserInfo(normalizedData);
        } else {
          console.log("Failed to fetch user info");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("provider");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          프로필 정보
        </h1>

        <div className="space-y-4">
          {userInfo.picture && (
            <div className="flex justify-center">
              <img
                src={userInfo.picture}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            </div>
          )}

          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">이름:</span> {userInfo.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold">이메일:</span> {userInfo.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
