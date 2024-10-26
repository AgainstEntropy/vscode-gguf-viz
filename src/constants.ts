export const replaceMark = "#REPLACE_ME#";

export const htmlContentTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GGUF Visualizer</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        th {
            background-color: #a1a1a1;
            color: #222;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>GGUF file: ${replaceMark}{fileName}${replaceMark}</h1>

    <h2>Metadata</h2>
    <table>
    <thead>
        <tr>
        <th>Metadata</th>
        <th>Value</th>
        </tr>
    </thead>
    <tbody>
        ${replaceMark}{metadataRows}${replaceMark}
    </tbody>
    </table>

    <h2>Tensors</h2>
    <table>
    <thead>
        <tr>
        <th>Tensors</th>
        <th>Shape</th>
        <th>Precision</th>
        </tr>
    </thead>
    <tbody>
        ${replaceMark}{tensorRows}${replaceMark}
    </tbody>
    </table>
</body>
</html>`;

export const htmlContentLoading = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
    <style>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
    }
    .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #3498db;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    </style>
</head>
<body>
    <div class="loader"></div>
</body>
</html>
`;
