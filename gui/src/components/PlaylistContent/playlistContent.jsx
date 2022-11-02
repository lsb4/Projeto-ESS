import React from "react";
import "./playlistContent.css";

import RemoveModal from "../RemoveModal/removeModal";
import EditPlaylistModal from "../EditPlaylistModal/editPlaylistModal";
import FollowersListModal from "../FollowersListModal/followersListModal";

import heart from "./assets/followersHeart.svg";
import coloredHeart from "./assets/followersHeartColored.svg";
import playButton from "./assets/playButton.svg";
import followButton from "./assets/followButton.svg";
import downloadButton from "./assets/downloadButton.svg";
import optionsButton from "./assets/optionsButton.svg";
import editButton from "./assets/Edit.svg";
import removeMusicButton from "./assets/removeMusic.svg";
import removePlaylistButton from "./assets/removePlaylist.svg";
import shareButton from "./assets/share.svg";

import defaultImage from "./assets/defaultPlaylistImage.svg";
import { useEffect } from "react";
import axiosInstance from "../common/server";
import { useState } from "react";

import Share from "../SharePlaylist/shareMusic"
import Compartilhar from "../SharePlaylist/shareMusic";

function PlaylistContent(props) {
  const {
    playlistName,
    playlistOwner,
    playlistDuration,
    playlistMusics,
    playlistID,
    playlistImage,
    playlistCategory,
    selectedPlaylist,
  } = props;

  let optionsFlag = 0;
  const [followers,setFollowers] = useState([])
  const [followersNumber, setFollowersNumber] = useState(0)
  const accountID = parseInt(localStorage.getItem('accountID'),10)
  const [user, setUser] = useState(null)


  useEffect(()=>{
    async function getFollowers() {
        const response = await axiosInstance({
            method: "post",
            url: `/listPlaylistFollowers`,
            headers: {},
            data: {
              id: playlistID 
            },
          })
        return response.data
    }

    async function fetchUser(value) {
      const response = await axiosInstance({
        method: "post",
        url: `/getUser`,
        headers: {},
        data: {
          accountID: parseInt(localStorage.getItem('accountID'),10)
        },
      });
      let val = await response.data
      return val
    }

    async function run() {
        const followrs = await getFollowers()
        const user = await fetchUser()
        setUser(user)
        setFollowers(followrs)
        setFollowersNumber(followrs ? followrs.length : 0)
        if (followrs.indexOf(accountID) === -1) {
          document
        .querySelectorAll(".playlistContent-followHeart")
        .forEach((heartImage) => {
          if (heartImage.firstElementChild != null) {
            heartImage.firstElementChild.src = followButton;
          } else {
            heartImage.src = followButton;
          }
        }
        )}
        else {
          document
          .querySelectorAll(".playlistContent-followHeart")
          .forEach((heartImage) => {
            if (heartImage.firstElementChild != null) {
              heartImage.firstElementChild.src = coloredHeart;
            } else {
              heartImage.src = coloredHeart;
            }
          });
        }
    }
    run()

  },[])

  async function updateFollowers(value) {
    async function run(value) {
      
      try {
        const response = await axiosInstance({
          method: 'post',
          url: '/updatePlaylistFollowers',
          headers: {}, 
          data: {
            id: playlistID,
            followers: value,
            accountID: parseInt(localStorage.getItem('accountID'),10)
          }
        })
        const val = response.data
        return val
      } catch(error) {
        return error.message
      }
    }
    const val = await run(value)

    return val
  }

  function closeOptions() {
    document.querySelector(
      ".playlistContent-buttons-optionsPopup"
    ).style.display = "none";
    document.querySelector(".darkOverlay").style.display = "none";

    document.querySelector(".playlistContent-buttons-options").style.zIndex =
      "initial";
    document.querySelector(
      ".playlistContent-buttons-optionsPopup"
    ).style.zIndex = "initial";
    document.querySelector(".darkOverlay").style.zIndex = "initial";

    document.querySelector(".playlistMusics-main").style.zIndex = "initial";

    optionsFlag = 0;
  }

  function openOptions() {
    document.querySelector(
      ".playlistContent-buttons-optionsPopup"
    ).style.display = "flex";
    document.querySelector(".darkOverlay").style.display = "block";

    document.querySelector(".playlistContent-buttons-options").style.zIndex =
      "3";
    document.querySelector(
      ".playlistContent-buttons-optionsPopup"
    ).style.zIndex = "3";
    document.querySelector(".darkOverlay").style.zIndex = "2";

    document.querySelector(".playlistMusics-main").style.zIndex = "0";
    optionsFlag = 1;
  }

  async function followPLaylist() {
    const followersID = followers ? followers.map(el => el.id) : []
    let isFollower = followersID.indexOf(parseInt(localStorage.getItem('accountID'), 10))
    if (isFollower !== -1) {
      const val = followersID
      const filtered = val.filter(el=> el !== parseInt(localStorage.getItem('accountID'),10))
      const err = await updateFollowers(filtered)
      if(!err) {
        document
        .querySelectorAll(".playlistContent-followHeart")
        .forEach((heartImage) => {
          if (heartImage.firstElementChild != null) {
            heartImage.firstElementChild.src = followButton;
          } else {
            heartImage.src = followButton;
          }
        })

        const newFollowers = followers.filter(el => filtered.indexOf(el.id)!== -1)
        setFollowers(newFollowers)
        setFollowersNumber(newFollowers.length)
      }
    } else {
        followersID.push(parseInt(localStorage.getItem('accountID')))
        const err = await updateFollowers(followersID)
        if(!err) {
          document
          .querySelectorAll(".playlistContent-followHeart")
          .forEach((heartImage) => {
            if (heartImage.firstElementChild != null) {
              heartImage.firstElementChild.src = coloredHeart;
            } else {
              heartImage.src = coloredHeart;
            }
          })
          const newFollowers = [...followers, user]
          setFollowers(newFollowers)
          setFollowersNumber(newFollowers.length)
        }
    }
    // Se a pessoa não seguir -> Começa a seguir e o coração fica colorido
    // Se a pessoa seguir -> Deixa de seguir e o coração fica escuro
  }

  function showOptions() {
    if (optionsFlag) {
      closeOptions();
    } else {
      openOptions();
    }
  }

  function removeMusics() {
    document.querySelectorAll(".playlistMusics-music").forEach((music) => {
      music.lastElementChild.style.display = "none";
      music.lastElementChild.previousSibling.style.display = "block";
    });
    closeOptions();
    document.querySelector(
      ".playlistMusics-removeAllMusicsButton"
    ).style.display = "flex";
  }

  function showRemovePlaylistModal() {
    document.querySelector(".removePlaylistModalDiv").style.display = "block";
  }

  function showEditPlaylistModal() {
    document.querySelector(".editPlaylistModalDiv").style.display = "block";
  }

  function showFollowersList() {
    document.querySelector(".followersListModalDiv").style.display = "block";
  }

  return (
    <div className="playlistContent-main">
      <div className="removePlaylistModalDiv">
        <RemoveModal
          ID={playlistID}
          selectedPlaylist={selectedPlaylist}
          playlistName={playlistName}
          playlistImage={playlistImage}
          playlistCategory={playlistCategory}
          modalFlag="removePlaylist"
        />
      </div>
      <div className="removeMusicModalDiv">
        <RemoveModal
          ID={playlistID}
          selectedPlaylist={selectedPlaylist}
          playlistName={playlistName}
          playlistImage={playlistImage}
          playlistCategory={playlistCategory}
          modalFlag="removeMusic"
        />
      </div>
      <div className="editPlaylistModalDiv">
        <EditPlaylistModal
          playlistName={playlistName}
          followersNumber={followersNumber}
          playlistOwner={playlistOwner}
          playlistMusics={playlistMusics}
          playlistID={playlistID}
          playlistImage={playlistImage}
          playlistCategory={playlistCategory}
        />
      </div>
      <div className="followersListModalDiv">
        <FollowersListModal followers={followers} />
      </div>
      <div
        className="playlistContent-image"
        style={
          playlistImage
            ? {
                backgroundImage: `url(${playlistImage})`,
                backgroundPosition: "center",
              }
            : { backgroundImage: `url(${defaultImage})` }
        }
      >
        <p style={{ cursor: "pointer" }} onClick={showFollowersList}>
          <img src={heart} alt="Followers heart" />
          {followersNumber}
        </p>
      </div>
      <p className="playlistContent-name">{playlistName}</p>
      <div className="playlistContent-infos">
        <p>{playlistOwner}</p>
        <p className="playlistContent-infos-duration">{playlistDuration}</p>
      </div>
      <div className="playlistContent-buttons">
        <div className="darkOverlay"></div>
        <img src={playButton} alt="Play button" />
         <img
          onClick={followPLaylist}
          className="playlistContent-followHeart"
          src={followButton}
          alt="Follow button"
        />
        <img src={downloadButton} alt="Download button" />
        <div className="playlistContent-buttons-options">
          <img src={optionsButton} alt="Options button" onClick={showOptions} />
          <div className="playlistContent-buttons-optionsPopup">
            <p onClick={showEditPlaylistModal}>
              <img src={editButton} alt="" />
              Editar informações
            </p>
            <p
            >
              <img src={shareButton} alt="" />
              <Share/> 
            </p>
            <p className="playlistContent-followHeart" onClick={followPLaylist}>
              <img src={followButton} alt="" />
              Seguir
            </p>
            <p onClick={removeMusics}>
              <img src={removeMusicButton} alt="" />
              Remover músicas
            </p>
            <p onClick={showRemovePlaylistModal}>
              <img src={removePlaylistButton} alt="" />
              Remover playlist
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistContent;
