export interface ContextMenuProps {
  id: string;
  options: Array<MenuOption>;
  position: MenuPosition;
  isOpen: boolean;
  onClose: () => void;
}

export interface MenuPosition {
  xPosition: number;
  yPosition: number;
}

export interface MenuOption {
  label: string;
  onClick: () => void;
}
