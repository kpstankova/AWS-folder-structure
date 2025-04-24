export interface ContextMenuProviderProps {
  openMenu: (id: string) => void;
  closeMenu: (id: string) => void;
  isMenuOpen: (id: string) => boolean;
}
