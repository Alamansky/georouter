module.exports = (content, style) => {
  return `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  ${style}
</head>
<body>
  ${content}
</body>
</html>`;
};
