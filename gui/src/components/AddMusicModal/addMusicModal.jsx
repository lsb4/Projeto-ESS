import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../common/server";
import "./addMusicModal.css";

import closeX from "./assets/closeX.svg";
import defaultMusicImage from "./assets/defaultMusicImage.png";

function AddMusicModal(props) {
  const {
    playlistName,
    followersNumber,
    playlistOwner,
    playlistMusics,
    playlistID,
    playlistImage,
    playlistCategory,
    selectedPlaylist,
    dataBaseMusics,
  } = props;

  const [selectDataBaseMusics, setSelectDataBaseMusics] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSucessMessage] = useState(null)
  const [newList, setNewList] = useState(null)

  useEffect(()=>{
    if(dataBaseMusics) {
      setSelectDataBaseMusics(new Array(dataBaseMusics.length).fill(0))
      setNewList(playlistMusics? playlistMusics.map(el=> el.id) : [])
    }
  },[props.dataBaseMusics])

  function addFromDatabase(value) {
    let val = selectDataBaseMusics
    val[value] = 1 - val[value]
    setSelectDataBaseMusics(val)
    const addition = dataBaseMusics.filter((el,index) => val[index]===1)
    const additions = addition.map(el => el.id)
    
    const brandNewList = (playlistMusics ? playlistMusics.map(el=> el.id).concat(additions): additions )
    setNewList(brandNewList)
  }



  async function addToPlaylist() {
    try {
      const response = await axiosInstance({
        method: 'post',
        url: '/updatePlaylist',
        headers: {}, 
        data: {
          id: playlistID,
          name: playlistName,
          image:  playlistImage,
          category: playlistCategory,
          musics: newList,
          accountID: parseInt(localStorage.getItem('accountID'),10)
        }
      })
      document.querySelector('.addMusicModal-modal').style.display = 'none'
      setSucessMessage(
      <div className="addMusicModal-modal">
      <p className="addMusicModal-modal-text">
          Músicas adicionadas com sucesso!
        </p>
      </div>)
      let val = response.data
      setTimeout(() => {window.location.reload()}, 2000)
    } catch(error) {
      document.querySelector('.addMusicModal-modal').style.display = 'none'
      setErrorMessage(
        <div className="addMusicModal-modal">
        <p className="addMusicModal-modal-text">
            Erro ao adicionar músicas! Tente novamente mais tarde
          </p>
        </div>
      )
      setTimeout(() => {window.location.reload()}, 2000)
    }


  }

  return (
    <div className="addMusicModal-main">
      <img
        onClick={closeModal}
        className="closeButtonModal"
        src={closeX}
        alt="Close Button"
      />
      <div className="addMusicModal-modal">
        <p className="addMusicModal-modal-text">Músicas recomendadas</p>
        <div className="addMusicModal-modal-musics">
          {dataBaseMusics &&
            dataBaseMusics.map((music, index) => {
              return (
                <div key={index} className="addMusicModal-music">
                  <div className="addMusicModal-music-infos">
                    <img
                      src={music.image ? music.image : defaultMusicImage}
                      alt=""
                    />
                    <div className="addMusicModal-music-infos-names">
                      <p className="addMusicModal-music-musicName">
                        {music.name}
                      </p>
                      <p className="addMusicModal-music-text">{music.owner}</p>
                    </div>
                  </div>
                  <div className="addMusicModal-music-removeCheckbox">
                    <input
                      type="checkbox"
                      value={index}
                      onChange={(event) =>
                        addFromDatabase(event.target.value)
                      }
                      id={`addMusicModal-removeCheckbox${index}`}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <p className="addMusicModal-modal-button" onClick={addToPlaylist}>
          Adicionar
        </p>
      </div>
      {errorMessage}
      {sucessMessage}
    </div>
  );

  function AddSelectedMusics() {}

  function closeModal() {
    document.querySelector(".editPlaylistModalDiv").style.display = "none";
    document.querySelector(".removeMusicModalDiv").style.display = "none";
    document.querySelector(".removePlaylistModalDiv").style.display = "none";
    document.querySelector(".addMusicModalDiv").style.display = "none";
  }
}

export default AddMusicModal;
