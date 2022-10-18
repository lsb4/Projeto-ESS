import React from "react";
import "./followersListModal.css";

import closeX from "./assets/closeX.svg";
import defaultFollowerImage from "./assets/defaultMusicImage.png";

function FollowersListModal(props) {
  const {
    playlistName,
    followersNumber,
    playlistOwner,
    playlistMusics,
    playlistID,
    playlistImage,
    playlistCategory,
    selectedPlaylist,
    followers
  } = props;


  return (
    <div className="followersListModal-main">
      <img
        onClick={closeModal}
        className="closeButtonModal"
        src={closeX}
        alt="Close Button"
      />
      <div className="followersListModal-modal">
        <p className="followersListModal-modal-text">Seguidores</p>
        <div className="followersListModal-modal-followers">
          {followers &&
            followers.map((follower, index) => {
              return (
                <div key={index} className="followersListModal-follower">
                  <div className="followersListModal-follower-infos">
                    <img
                      src={follower.image ? follower.image : defaultFollowerImage}
                      alt=""
                    />
                    <div className="followersListModal-follower-infos-names">
                      <p className="followersListModal-follower-followerName">
                        {follower.name}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  function closeModal() {
    document.querySelector(".editPlaylistModalDiv").style.display = "none";
    document.querySelector(".removeMusicModalDiv").style.display = "none";
    document.querySelector(".removePlaylistModalDiv").style.display = "none";
    document.querySelector(".addMusicModalDiv").style.display = "none";
    document.querySelector(".followersListModalDiv").style.display = "none";
  }
}

export default FollowersListModal;
