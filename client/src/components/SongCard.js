import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleDragStart(event) {
      event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
      event.preventDefault();
    }

    function handleDragEnter(event) {
      event.preventDefault();
    }

    function handleDragLeave(event) {
      event.preventDefault();
    }

    function handleDrop(event) {
      event.preventDefault();
      let targetIndex = index;
      let sourceIndex = Number(event.dataTransfer.getData("song"));

      // ASK THE MODEL TO MOVE THE DATA
      store.moveSong(sourceIndex, targetIndex);
    }

    const handleEditSong = (event) => {
      event.preventDefault();
      // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
      // TO SEE IF THEY REALLY WANT TO EDIT THE SONG
      const showEditSongModal = () => {
        let modal = document.getElementById("edit-song-modal");
        modal.classList.add("is-visible");
      };
      store.selectSong(index);
      showEditSongModal();
    };

    async function handleRemove(event) {
      event.stopPropagation();
      let _id = event.target.id;
      _id = ("" + _id).substring("remove-song-".length);
      store.markSongForDeletion(_id);
    }





    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

    if (store.songMarkedForDeletion !== null) {
      return (
        <div key={index} id={"song-" + index + "-card"} className={cardClass}>
          {index + 1}.
          <a
            id={"song-" + index + "-link"}
            className="song-link"
            href={"https://www.youtube.com/watch?v=" + song.youTubeId}
          >
            {song.title} by {song.artist}
          </a>
          <input
            type="button"
            id={"remove-song-" + index}
            className="list-card-button"
            onClick={handleRemove}
            value={"\u2715"}
          />
        </div>
      );
    }
    
    return (
      <div
        key={index}
        id={"song-" + index + "-card"}
        className={cardClass}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onDoubleClick={handleEditSong}
        onClick={handleRemove}
        draggable="true"
      >
        {index + 1}.
        <a
          id={"song-" + index + "-link"}
          className="song-link"
          href={"https://www.youtube.com/watch?v=" + song.youTubeId}
        >
          {song.title} by {song.artist}
        </a>
        <input
          type="button"
          id={"remove-song-" + index}
          className="list-card-button"
          value={"\u2715"}
        />
      </div>
    );
}

export default SongCard;