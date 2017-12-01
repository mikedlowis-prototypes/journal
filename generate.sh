#!/bin/bash
style="$(cat "style.css")"
script="$(cat "editor.js")"

cat <<-eos
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <meta charset="utf-8">
    <style>
$style
    </style>
</head>
<body>
    <section>
        <header id="header"></header>
        <article id="content" contenteditable="true">
            <p>Edit here...</p>
        </article>
    </section>
    <script>
$script
    </script>
</body>
</html>
eos
