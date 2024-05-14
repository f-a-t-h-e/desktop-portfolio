import type DesktopPath from "./DesktopPath";
import type FolderPath from "./FolderPath";
import Path from "./Path";

export default class FilePath extends Path {
  declare isFile: true;
  declare contents: TFileContent;
  fileType!: "code"|"svelte"|"next";
  constructor({
    contents,
    fileType="svelte",
    ...params
  }: {
    name: string;
    parent: FolderPath|DesktopPath;
    desktop: DesktopPath;
    contents: TFileContent;
    fileType?: "code"|"svelte"|"next";
  }) {
    super({ ...params, isFile: true });
    this.contents = contents;
    this.fileType = fileType;
  }
}
