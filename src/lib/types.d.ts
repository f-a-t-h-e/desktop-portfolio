type TFileContent = {};

type ConcatString<
  T extends TFolderPath,
  F extends TFileName
> = T extends TFolderPath ? (infer F extends TFileName ? `${T}${F}` : "") : "";