import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTo, setDraggedTo] = useState(false);

  function handleDragStart(event) {
    event.dataTransfer.setData("song", event.target.id);
    setIsDragging(true);
    setDraggedTo(draggedTo);
  }

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(isDragging);
    setDraggedTo(true);
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setIsDragging(isDragging);
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setIsDragging(isDragging);
    setDraggedTo(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    let target = event.target;
    let targetId = target.id;
    targetId = targetId.substring(target.id.indexOf("-") + 1);
    let sourceId = event.dataTransfer.getData("song");
    sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
    setIsDragging(false);
    setDraggedTo(false);
    //store.dragAndDropSong(parseInt(sourceId), parseInt(targetId));
    store.addMoveSongTransaction(parseInt(sourceId), parseInt(targetId));       
  }

  function handleDeleteSong(event) {
    event.stopPropagation();
    store.annotateSongDelete(index);
    store.showDeleteSongModal();
  }

  function handleEditSong() {
    store.markSongForEdit(index, song);
  }


  const { song, index } = props;
  let cardClass = "list-card unselected-list-card";
  return (
    <div
      key={index}
      id={"song-" + index} //+ "-card"}
      className={cardClass}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDoubleClick={handleEditSong}
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
        id={"delete-song-" + index}
        className="list-card-button"
        value={"\u2715"}
        onClick={handleDeleteSong}
      />
    </div>
  );
}

export default SongCard;