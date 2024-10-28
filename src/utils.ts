import * as vscode from "vscode";
import * as path from "path";
import { GGMLQuantizationType, gguf } from "@huggingface/gguf";

import { htmlContentTemplate, replaceMark } from "./constants";

export async function getWebviewContent(
  uri: vscode.Uri,
  searchTerm: string = ""
) {
  const fileName = path.basename(uri.fsPath);
  const { metadataRows, tensorRows } = await getGGUFInfo(uri, searchTerm);

  const content = formatTemplate(htmlContentTemplate, {
    fileName,
    searchTerm,
    metadataRows,
    tensorRows,
  });

  return {
    htmlContent: content,
    fileName,
  };
}

async function getGGUFInfo(uri: vscode.Uri, searchTerm: string = "") {
  const { metadata, tensorInfos } = await gguf(uri.fsPath, {
    allowLocalFile: true,
  });

  const metadataRows = Object.entries(metadata)
    .filter(([key, value]) => {
      return key.includes(searchTerm) || String(value).includes(searchTerm);
    })
    .map(([key, value]) => {
      return `
        <tr>
          <td>${key}</td>
          <td>${Array.isArray(value) ? formatArray(value) : value}</td>
        </tr>`;
    })
    .join("");

  const tensorRows = tensorInfos
    .filter((tensorInfo) => {
      return (
        tensorInfo.name.includes(searchTerm) ||
        GGMLQuantizationType[tensorInfo.dtype].includes(searchTerm) ||
        tensorInfo.shape.join(", ").includes(searchTerm)
      );
    })
    .map(
      (tensorInfo) => `
        <tr>
          <td>${tensorInfo.name}</td>
          <td>[${tensorInfo.shape.join(", ")}]</td>
          <td>${GGMLQuantizationType[tensorInfo.dtype]}</td>
        </tr>`
    )
    .join("");

  return { metadataRows, tensorRows };
}

function formatArray(array: Array<any>) {
  const maxElements = vscode.workspace
    .getConfiguration("gguf-viz")
    .get<number>("maxArrayElements", 10);
  const displayedElements = array.slice(0, maxElements);
  const moreElements = array.length > maxElements ? ", ..." : "";
  return `[${displayedElements.join(", ")}${moreElements}]`;
}

function formatTemplate(template: string, values: Record<string, any>): string {
  return template.replace(
    new RegExp(replaceMark + "\\{(.*?)\\}" + replaceMark, "g"),
    (_, key) => {
      const value = values[key];
      return value !== undefined ? String(value) : "";
    }
  );
}
