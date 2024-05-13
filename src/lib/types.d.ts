type TFileContent = {
  iFrame?: false;
}|{
  iFrame: true;
  url: string;
  icon?: string;
};

type ConcatString<
  T extends TFolderPath,
  F extends TFileName
> = T extends TFolderPath ? (infer F extends TFileName ? `${T}${F}` : "") : "";
type SelectedItems = {
  /**
   * The file or folder being selected
   */
  item: FilePath | FolderPath;
  /**
   * The index in `desktop.gridItems` and `selectedItems`
   */
  i: number;
  /**
   * The spans to collied with
   */
  spans?: HTMLSpanElement[] | undefined;
}[]