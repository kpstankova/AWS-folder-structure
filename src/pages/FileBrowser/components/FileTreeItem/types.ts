export interface FileTreeItem {
  name: string;
  type: FileTreeItemType;
  fullPath: string;
  children?: Array<FileTreeItem>;
}

export enum FileTreeItemType {
  File = "file",
  Folder = "folder",
}

export interface FileTreeItemProps {
  item: FileTreeItem;
}
