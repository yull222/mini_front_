import { useNavigate, matchPath, type NavigateFunction } from "react-router-dom";

export default function Header() {
  const navigate:NavigateFunction = useNavigate();
  const isLoggedIn:boolean = !!localStorage.getItem("userId");

  const handleLogout = ():void => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  const scrapButtonClass:string = matchPath(location.pathname, "/liked")
    ? "text-red-400"
    : "hover:text-red-400";

  return (
    <header className="relative bg-red-200 text-gray-800 py-8 shadow-md">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,-25&icon_names=favorite"
      />
      <h1 className="text-3xl font-bold text-center tracking-wider hover:cursor-pointer" onClick={() => navigate("/")}>
        📰 News Pocket
      </h1>

      <div className="absolute right-4 bottom-2 flex gap-3">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                if (matchPath(location.pathname, "/liked")) {
                  navigate("/");
                } else {
                  navigate("/liked");
                }
              }}
              className="flex items-center"
            >
              <span className={`material-symbols-rounded ${scrapButtonClass}`}>
                favorite
              </span>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
}
