type NavItem = {
  text: string;
  link: string;
  children?: NavItem[];
  icon: any;
};

export type nav = {
  text: string;
  link: string;
  icon?: React.ElementType;
};

export interface SidebarProps {
  popupStatus: boolean;
  setPopupStatus: (status: boolean) => void;
}
