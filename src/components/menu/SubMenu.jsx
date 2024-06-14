import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { closeBlock } from "../../redux/reducer/popupReducer";

const SubMenu = ({
  name = "Danh mục",
  listItem,
  classNameMenuList,
  level,
  icon,
  title,
  link,
  handleCloseMenu,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const handleShow = () => {
    if (window.innerWidth < 1024) {
      setShowMenu(!showMenu);
    } else {
    }

    if (!(window.innerWidth < 1024 && listItem?.length > 0)) {
      navigate(link);
      handleCloseMenu();
    }
    // console.log(window.innerWidth);
  };

  return (
    <div
      href="#"
      className={`item relative w-full  items-center border-none  border-gray-200 text-gray-dark cursor-pointer transition-colors duration-150 lg:w-auto lg:border-r lg:justify-normal`}
    >
      <div
        className={`flex w-full justify-between px-5 lg:justify-between lg:gap-x-2 hover:bg-second hover:text-white py-2 ${
          level <= 1 && "lg:py-0"
        } p-left-${level}  ${
          level <= 1
            ? "lg:text-white lg:hover:bg-transparent"
            : "lg:text-gray-dark"
        }
       items-center`}
        onClick={handleShow}
      >
        {icon && <div className="leading-none hidden lg:block">{icon}</div>}

        <span className={`text-sm ${listItem?.length > 0 && "font-medium"}`}>
          {name}
        </span>
        {listItem?.length > 0 && (
          <i
            class={`ri-arrow-down-s-line ${
              level >= 2 && "lg:-rotate-90"
            } transition-all ${showMenu ? "rotate-180" : "rotate-0"}`}
          ></i>
        )}
      </div>

      {listItem?.length > 0 && (
        <div
          className={`w-full ${
            showMenu ? "h-fit" : "h-0"
          } ${classNameMenuList}  overflow-hidden border-transparent  item-list transition-[height] duration-300 shadow-none 
   top-[115%] left-0 bg-white  border-t lg:border-gray-200 lg:absolute lg:shadow-md  ${
     level >= 3 && listItem.length >= 3
       ? "lg:w-[500px] lg:grid-cols-3 lg:grid lg:!h-fit"
       : "lg:w-52  lg:min-h-80"
   } lg:!h-[400px] lg:before:absolute lg:overflow-visible lg:invisible lg:before:w-full lg:before:h-5 lg:before:-top-5 lg:before:left-0 lg:before:bg-transparent z-50`}
          style={{
            left: `${level >= 2 && "100%"}`,
            top: `${level >= 2 && "-1%"}`,
          }}
        >
          {listItem?.map((item) => (
            <SubMenu
              key={item[name]}
              handleCloseMenu={handleCloseMenu}
              name={item.name}
              listItem={item.listItem}
              level={level + 1}
              icon={item.icon}
              link={item.link}
            ></SubMenu>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubMenu;
