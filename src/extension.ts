import * as vscode from "vscode";
import { getWebviewContent } from "./utils";
import { htmlContentLoading } from "./constants";

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "gguf-viz" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("gguf-viz.start", (uri: vscode.Uri) => {
      const panel = vscode.window.createWebviewPanel(
        "gguf-viz", // Identifies the type of the webview. Used internally
        "gguf-viz", // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {
          // Webview options.
          enableScripts: true, // Enable scripts in the webview
        }
      );

      panel.webview.html = htmlContentLoading;

      getWebviewContent(uri)
        .then(({ htmlContent, fileName }) => {
          panel.title = `GGUF: ${fileName}`;
          panel.webview.html = htmlContent;
        })
        .catch((error) => {
          console.error("Failed to get webview content:", error);
        });

      panel.webview.onDidReceiveMessage((message) => {
        let searchTerm = "";
        switch (message.command) {
          case "search":
            searchTerm = message.text;
            break;
          case "reset":
            break;
        }
        getWebviewContent(uri, searchTerm).then(({ htmlContent }) => {
          panel.webview.html = htmlContent;
        });
      });
    })
  );
}

export function deactivate() {}
