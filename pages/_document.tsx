import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script
        src="https://kit.fontawesome.com/6cd44cca33.js"
        crossOrigin="anonymous"
      ></script>
      <link
        href="https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;600;700;800&display=swap"
        rel="stylesheet"
      />
      <body dir="rtl">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
