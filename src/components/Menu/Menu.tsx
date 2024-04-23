import { MenuItem } from "./MenuItem";
import { menuData } from "./menuData";

export const Menu = () => {
  return (
    <nav>
      {menuData.map((menuItem) => {
        return <MenuItem title={menuItem} />;
      })}
    </nav>
  );
};
