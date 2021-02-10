import React, { useState } from "react";
import { useClipboard } from "use-clipboard-copy";
import { useHistory, useLocation } from "react-router-dom";

import "./MemeGenerated.css";

export const MemeGenerated = () => {
  const [copied, setCopied] = useState(false);
  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };

  return (
    <div className="meme__generated__container">
      <button className="meme__generated__home" onClick={() => history.push("/")}>
        Make More Memes
      </button>
      {url && <img alt="meme" src={url} />}
      <button className="meme__generated__copy" onClick={copyLink}>
        {copied ? "Link copied!" : "Copy link"}
      </button>
    </div>
  );
};
