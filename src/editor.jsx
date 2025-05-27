import { useEffect, useState } from "react";
import img from "./codepen_logo.png";
import useLocalStorage from "./storage";

function Editor() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");

  const [codepenCode, setCodepenCode] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const code = `
      <html>
          <style>${css}</style>
          <script>${js}</script>
        <body>${html}</body>
      </html>
    `;
      setCodepenCode(code);
    }, 200);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="wrapper">
      <div className="header">
        <img src={img} alt="logo" />
        <span>Codepen</span>
      </div>
      <div className="input-cover">
        <textarea
          value={html}
          type="text"
          placeholder="HTML"
          className="input"
          onChange={(e) => {
            setHtml(e.target.value);
          }}
        />
        <textarea
          value={css}
          type="text"
          placeholder="CSS"
          className="input"
          onChange={(e) => {
            setCss(e.target.value);
          }}
        />
        <textarea
          value={js}
          type="text"
          placeholder="JavaScript"
          className="input"
          onChange={(e) => {
            setJs(e.target.value);
          }}
        />
      </div>
      <div className="output">
        <iframe
          srcDoc={codepenCode}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder={0}
        />
      </div>
    </div>
  );
}

export default Editor;
