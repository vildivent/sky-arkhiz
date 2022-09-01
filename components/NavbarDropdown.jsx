import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import {
//   contentStyle,
//   overlayStyle,
//   arrowStyle,
// } from "../styles/navbarDropdown";

const NavbarDropdown = ({ children }) => {
  return (
    <Popup
      trigger={children}
      position="bottom center"
      on="hover"
      mouseLeaveDelay={0}
      mouseEnterDelay={0}
      closeOnDocumentClick
      arrow={true}
    >
      <div className="menu">
        <div className="menu-item"> item 1</div>
        <div className="menu-item"> item 2</div>
        <div className="menu-item"> item 3</div>
      </div>
    </Popup>
  );
};

export default NavbarDropdown;
