import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/userAction";
import "./Welcome.css";

const DASHBOARD_CARDS = [
  { title: "Posts", value: 12, description: "이번 주 작성한 게시글" },
  { title: "Files", value: 28, description: "공유 중인 파일" },
  { title: "Notifications", value: 5, description: "확인하지 않은 알림" },
];

const RECENT_ACTIVITIES = [
  "프로필 정보를 업데이트했습니다.",
  "신규 프로젝트 워크스페이스를 생성했습니다.",
  "팀 멤버 초대 메일을 발송했습니다.",
  "월간 리포트를 다운로드했습니다.",
];

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const profile = useSelector((state) => state.user.profile);

  const displayName = useMemo(
    () => profile?.name || profile?.email || "User",
    [profile],
  );

  const onClickLogout = () => {
    setIsLoggingOut(true);
    setLogoutError("");
    dispatch(logoutUser())
      .then((response) => {
        if (response.payload?.success) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setLogoutError("로그아웃 처리에 실패했습니다. 잠시 후 다시 시도해주세요.");
      })
      .finally(() => setIsLoggingOut(false));
  };

  return (
    <main className="welcome-layout">
      <section className="welcome-shell">
        <header className="welcome-header">
          <div>
            <p className="welcome-badge">Workspace Overview</p>
            <h1>Welcome, {displayName}</h1>
            <p className="welcome-subtitle">
              오늘의 핵심 지표와 최근 활동을 한 번에 확인하세요.
            </p>
          </div>
        </header>

        <section className="dashboard-grid" aria-label="Dashboard stats">
          {DASHBOARD_CARDS.map((card) => (
            <article className="dashboard-card" key={card.title}>
              <p className="dashboard-title">{card.title}</p>
              <p className="dashboard-value">{card.value}</p>
              <p className="dashboard-description">{card.description}</p>
            </article>
          ))}
        </section>

        <section className="welcome-section">
          <h2>Quick Actions</h2>
          {logoutError && <p className="welcome-alert">{logoutError}</p>}
          <div className="quick-actions">
            <button className="btn btn-secondary" type="button">
              프로필 보기
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={onClickLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
            </button>
          </div>
        </section>

        <section className="welcome-section">
          <h2>최근 활동</h2>
          <ul className="activity-list">
            {RECENT_ACTIVITIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default LandingPage;
