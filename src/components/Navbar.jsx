import { Link, NavLink } from "react-router-dom";

const buttonInfo = [
  { name: "홈", link: "/" },
  { name: "내 다이어리", link: "/profile" },
  { name: "팀 홈", link: "/team" },
  { name: "북마크", link: "/bookmark" },
  { name: "통계", link: "/statistics" },
];

const Navbar = () => {
  return (
    <div >
      <Link to="/" >
        <div>Codiary</div>
      </Link>
      <div>
        {buttonInfo.map((contenst, index) => {
          return (
            <div>
                <NavLink
                key={index}
                to={contenst.link}
                >
                {contenst.name}
                </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;