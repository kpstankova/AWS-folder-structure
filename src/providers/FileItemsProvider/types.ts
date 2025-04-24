import { FileTreeItem } from "../../pages/FileBrowser/components/FileTreeItem/types";

export interface FileItemsProviderProps {
  fileItems: Array<FileTreeItem>;
  setFileItems: (items: Array<FileTreeItem>) => void;
}
