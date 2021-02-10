import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { yatesShuffle } from "../../utils/Arrays";

import "./Meme.css";

export const Meme = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState<String[]>([]);

  const history = useHistory();

  const updateCaptions = (e: React.ChangeEvent<HTMLInputElement>, index: Number) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();
    formData.append("username", process.env.REACT_APP_USERNAME as string);
    formData.append("password", process.env.REACT_APP_PASSWORD as string);
    formData.append("template_id", currentMeme.id);
    captions.forEach((c: String, index: Number) =>{
      formData.append(`boxes[${index}][text]`, c as string)
    });

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        history.push(`/generated?url=${res.data.url}`);
      });
    });
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res.json().then((res) => {
        const _memes = res.data.memes;
        yatesShuffle(_memes);
        setMemes(_memes);
      });
    });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  return memes.length ? (
    <div className="meme__container">
      <button className="meme__generate" onClick={generateMeme}>
        Generate
      </button>
      <button className="meme__skip" onClick={() => setMemeIndex(memeIndex + 1)}>
        Skip
      </button>
      {captions.map((c, index) => (
        <input onChange={(e) => updateCaptions(e, index)} key={index} />
      ))}
      <img alt="meme" src={memes[memeIndex].url} />
    </div>
  ) : (
    <></>
  );
};
