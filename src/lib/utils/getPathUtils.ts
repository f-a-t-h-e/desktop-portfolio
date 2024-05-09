import type DesktopPath from "$lib/system/DesktopPath";
import type FilePath from "$lib/system/FilePath";
import type FolderPath from "$lib/system/FolderPath";
import Path, { isFolder } from "$lib/system/Path";

export function getToPath(pathNames: string[], path: FolderPath | FilePath):(FolderPath | FilePath|null) {
  if (pathNames.length) {
    const currentPathName = pathNames[0].trim();
    if (isFolder(path)) {
      const [_, ...newPathNames] = pathNames;
      if (path.contents[currentPathName]) {
        if (path.contents[currentPathName].isFile) {
          return path.contents[currentPathName];
        }
        if (newPathNames.length) {
          return getToPath(newPathNames, path.contents[currentPathName]);
        }
        return path.contents[currentPathName];
      } else {
        return null;
      }
    } else {
      if (path.name === currentPathName) {
        return path;
      } else {
        return null;
      }
    }
  }
  return null;
}

export function getPathFromStringAndDesktop(
  pathString: string,
  desktop: DesktopPath
) {
  const pathArr = pathString
    .split("/")
    .filter((v) => v != "" && !/^\s*$/.test(v));
  if (pathArr.length > 1) {
    const [_, ...newPathNames] = pathArr;
    const currentPathName = pathArr[0].trim();
    if (desktop.contents[currentPathName]) {
      if (desktop.contents[currentPathName].isFile) {
        return desktop.contents[currentPathName];
      }
      const targetPath = getToPath(
        newPathNames,
        desktop.contents[currentPathName]
      );
      if (targetPath) {
        // open
        return targetPath;
      } else {
        alert("Path not found!");
        return null;
      }
    } else {
      alert("Path not found!");
      return null;
    }
  } else if (pathArr.length === 1) {
    const targetPath = desktop.contents[pathArr[0]];
    if (targetPath) {
      // open
      return targetPath;
    } else {
      alert("Path not found!");
      return null;
    }
  } else {
    alert("Invalid path name");
    return null;
  }
}
