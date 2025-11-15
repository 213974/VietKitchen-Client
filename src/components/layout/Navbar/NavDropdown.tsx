//... imports

interface NavDropdownProps {
  title: string;
  items: { path: string; label: string }[];
  isHomePage: boolean;
}

const NavDropdown = ({ title, items, isHomePage }: NavDropdownProps) => {
//... rest of component is unchanged
};

export default NavDropdown;