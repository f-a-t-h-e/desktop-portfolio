import type DesktopPath from "./DesktopPath";
import FilePath from "./FilePath";
import Path, { isFolder } from "./Path";

export default class FolderPath extends Path {
  declare isFile: false;
  declare contents: {[key:string]:FilePath|FolderPath};
  constructor({
    contents,
    ...params
  }: {
    name: string;
    parent?: FolderPath|DesktopPath;
    desktop: DesktopPath;
    /**
     * @default []
     */
    contents?: (FilePath|FolderPath)[];
  }) {
    super({ ...params, isFile: false });
    contents = contents || [];
    // contents.sort((a,b)=> a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    for (let i = 0; i < contents.length; i++) {
      const el = contents[i]
      if (isFolder(el)) {
        new FolderPath({
           desktop: this.desktop,
          name: el.name,
          parent: this,
          contents: Object.values(el.contents)
        })
      }else {
        new FilePath({
          desktop: this.desktop,
          name: el.name,
          parent: this,
          contents: el.contents
        });
      }
    }
  }
}
