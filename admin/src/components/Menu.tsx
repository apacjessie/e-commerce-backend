import { MdDashboard, MdInventory } from "react-icons/md";
import { RiFolderUserFill } from "react-icons/ri";
import { BsChevronDown, BsActivity } from "react-icons/bs";
import { MouseEvent, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiLogoutBoxFill } from "react-icons/ri";
import { nanoid } from "nanoid";

const Menu = ({ open }: { open: boolean }) => {
  const [menus, setMenus] = useState<any>([
    {
      title: "Inventory",
      link: "/dashboard/inventory",
      icon: <MdInventory />,
      submenu: true,
      submenuOpen: false,
      submenuItems: [
        { title: "Add Product", link: "/dashboard/inventory/add" },
        { title: "Modify Product", link: "/dashboard/inventory/modify" },
        { title: "Delete Product", link: "/dashboard/inventory/delete" },
        { title: "View Stock", link: "/dashboard/inventory/stock" },
      ],
    },
    {
      title: "Customers",
      link: "/dashboard/customers",
      icon: <RiFolderUserFill />,
      submenu: true,
      submenuOpen: false,
      submenuItems: [
        { title: "Customer Order", link: "/dashboard/customers/order" },
        { title: "Track Order", link: "/dashboard/customers/track-order" },
      ],
    },
    {
      title: "Activity log",
      link: "/dashboard/activity",
      icon: <BsActivity />,
    },
  ]);

  useEffect(() => {
    const defaultMenus = menus.map((menu: any) => {
      return { ...menu, submenuOpen: false };
    });
    setMenus(defaultMenus);
  }, [open]);

  const active = `${open ? "w-full" : "w-12"} 
  flex flex-1 cursor-pointer  bg-blue-400 text-gray-800
  items-center gap-x-4 rounded-sm p-2 text-xl duration-300
  text-gray-300`;

  const notActive = `${open ? "w-full" : "w-12"} 
  flex flex-1 cursor-pointer 
  items-center gap-x-4 rounded-sm p-2 text-xl
  text-gray-300 hover:bg-blue-400 hover:text-gray-800`;

  const handleSubmenuOpen = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedData = [...menus];
    const updatedObject = { ...updatedData[id] };
    updatedObject.submenuOpen = !updatedObject.submenuOpen;

    updatedData[id] = updatedObject;

    setMenus(updatedData);
  };

  return (
    <>
      <Link
        to="/dashboard"
        className={`flex origin-left items-center duration-300 ${
          open ? "block" : "scale-0"
        }`}
      >
        <MdDashboard className="text-4xl text-gray-100" />
        <h1 className="text-3xl text-gray-100">Dashboard</h1>
      </Link>
      <ul
        className={`flex h-full ${
          open ? "w-full" : "w-[3rem]"
        } flex-col justify-between pt-1 duration-500`}
      >
        <div className="flex  w-full flex-col gap-2" key={nanoid()}>
          {menus.map((menu: any, index: number) => (
            <div key={index}>
              <NavLink
                to={menu.link}
                className={({ isActive }: any) =>
                  isActive ? active : notActive
                }
              >
                <span className="float-left block text-3xl">{menu.icon}</span>
                <span
                  className={`${
                    open ? "block" : "scale-0"
                  }   flex h-0 flex-1 origin-left items-center text-lg font-medium transition-transform duration-200`}
                >
                  {menu.title}
                </span>
                {menu.submenu && (
                  <BsChevronDown
                    className={`${!open && "scale-0"} duration-300
                              ${menu.submenuOpen && "rotate-180"}
                            `}
                    onClick={(e: MouseEvent) => handleSubmenuOpen(e, index)}
                  />
                )}
              </NavLink>
              {menu.submenu && menu.submenuOpen && open && (
                <ul key={nanoid()}>
                  {menu.submenuItems.map((item: any) => (
                    <NavLink
                      to={item.link}
                      key={nanoid()}
                      className="flex w-fit cursor-pointer items-center gap-x-4 rounded-sm p-1
                    px-10 text-base text-gray-300 hover:text-blue-400
                    "
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <NavLink
          to="/"
          className={`
          flex ${open ? "w-full" : "w-12"}
          gap-x-4 p-2 text-gray-300 
          hover:bg-blue-400 hover:text-gray-800`}
        >
          <span className="float-left block text-3xl">
            <RiLogoutBoxFill />
          </span>
          <span
            className={`${
              open ? "block" : "scale-0"
            }   flex-1 origin-left text-lg font-medium transition-transform duration-200`}
          >
            Logout
          </span>
        </NavLink>
      </ul>
    </>
  );
};

export default Menu;
