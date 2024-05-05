type TViewType = "folder" | "file";
type TPath = "/"|"/projects"|"/about"|"project";
interface IFile {
  name: string;
  type: "svelte"|"next";
  path: TPath;
  isFile:true;
}
interface IFolder {
  name: string;
  path: TPath;
  contents: (IFolder | IFile)[];
  isFile?:false;
}
interface IWindow {
  title: string;
  filesAndFolders: (IFolder | IFile)[];
  path: TPath;
  viewType: TViewType;
  history: TPath[];
  historyPointer: number;
  layerIndex: string;
  isMinimized: boolean;
}
