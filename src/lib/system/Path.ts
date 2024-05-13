import type DesktopPath from "./DesktopPath";
import type FilePath from "./FilePath";
import type FolderPath from "./FolderPath";

export default class Path {
  static id = 0;
  id!: number;
  set name (val:string){
    this._name = val.trim();
    if (isFolder(this)) {
      this._path = `${this.parent.path}${this._name}"/"`;
      const keys = Object.keys(this.contents);
      for (let key = 0; key < keys.length; key++) {
        if (Object.prototype.hasOwnProperty.call(this.contents, key)) {
          this.contents[key]._path = `${this._path}${this.contents[key].path}${this.contents[key].isFile ? "":"/"}`;
        }
      }
    }else{
      this._path = `${this.parent.path}${this._name}`;
    }

  }
  get name (){
    return this._name;
  }
  private _name!: string;
  set parent(
    parent:
      | (Path & { isFile: false; contents: { [key: string]: Path } })
      | DesktopPath
  ) {
    /**
     * @todo Move this check to `this.cutPaste` method to make this `set` usable in `this.copyPaste` method
     */
    if (this._parent && this._parent !== parent) {
      delete this._parent.contents[this.name];
    }
    this._parent = parent;
    parent.contents[this.name] = this;
    this._path = `${parent.path}${this.name}${this.isFile ? "": "/"}`;
    if (isFolder(this)) {
      const keys = Object.keys(this.contents);
      for (let key = 0; key < keys.length; key++) {
        if (Object.prototype.hasOwnProperty.call(this.contents, key)) {
          this.contents[key].parent = this;
        }
      }
    }
  }
  private _parent!:
    | (Path & { isFile: false; contents: { [key: string]: Path } })
    | DesktopPath;
  get parent() {
    return this._parent;
  }
  private _path!: string;
  set path(val:string) {
    this._path = this.isFile ? val : `${val}/`;
    if (isFolder(this)) {
      const keys = Object.keys(this.contents);
      for (let key = 0; key < keys.length; key++) {
        if (Object.prototype.hasOwnProperty.call(this.contents, key)) {
          this.contents[key].path = `${this.path}${this.contents[key].name}`;
        }
      }
    }
  }
  get path() {
    return this._path;
  }
  isFile!: boolean;
  contents!: TFileContent | { [key: string]: FilePath|FolderPath };
  desktop!: DesktopPath;
  constructor({
    parent,
    name,
    isFile,
    desktop,
  }: {
    name: string;
    parent?: FolderPath | DesktopPath;
    isFile: boolean;
    desktop: DesktopPath;
  }) {
    this.id = Path.id++
    /**
     * The order matters here
     */
    this._name = name.trim();
    /**
     * 1 - Use the desktop as default fallback
     */
    parent = parent || desktop;
    /**
     * 2 - Get the desktop to use it in the set method of `this.parent` to apply chnges (applying changes now is in each action function for avoiding calling the apply method for each child)
     */
    this.desktop = desktop;
    /**
     * 3 - Get the path type to use it in the set method of `this.parent` to know if the content needs update or not
     */
    this.isFile = isFile;
    if (!isFile) {
      this.contents = {};
    }
    /**
     * 4 - Get the path to use it in the set method of `this.parent` to use it for the contents
     */
    this._path = `${parent.path}${name}${isFile ? "" : "/"}`;
    /**
     * 5 - Mount this
     */
    this.parent = parent;
    // Don't call the `this.desktop.apply` method here as the other classes that implement this class will do more actions that will need to be applied
  }
  //   copyPaste(
  //     /*fromPath: Path | DesktopPath, */ toPath: TFolderPathType | DesktopPath
  //   ) {
  //     if (toPath !== this.parent) {
  //         // this.parent = toPath;
  //     }
  //   }
  cutPaste(/*fromPath: Path | DesktopPath, */ toPath: FolderPath | DesktopPath) {
    if (toPath !== this.parent) {
      this.parent = toPath;
      /**
       * This was used inside the set method of the parent property, but here it's better to be run only once for a single cutPaste action instead of running it for each child as well
       */
      this.desktop.apply();
    }
  }
}

export function isFolder(path: Path): path is FolderPath {
  return !path.isFile;
}
