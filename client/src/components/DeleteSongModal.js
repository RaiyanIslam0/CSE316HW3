import React, { useContext } from "react";
import { GlobalStoreContext } from "../store";

const DeleteSongModal = () => {
  const { store } = useContext(GlobalStoreContext);
  let cl = store.currentList;

  if (!cl){
      return null;
  } 

  let index = store.indexSongDelete;

  let name = index;
  if (name===undefined){
    name="";
  } 
  else {
    name=cl.songs[index].title;
  }

  let artist=index;
  if (artist===undefined){
    artist="";
  }
  else {
    artist = cl.songs[index].artist;
  }

  let youtube=index;
  if (youtube===undefined){
    youtube="";
  }
  else {
    youtube = cl.songs[index].youTubeId;
  }

  return (
    <div
      className="modal"
      id="delete-song-modal"
      data-animation="slideInOutLeft"
    >
      <div className="modal-root" id="verify-delete-song-root">
        <div className="modal-north">Delete Song?</div>
        <div className="modal-center">
          <div className="modal-center-content">
            Are you sure you wish to permanently remove {name} from the playlist?
          </div>
        </div>
        <div className="modal-south">
          <input
            type="button"
            id="delete-song-confirm-button"
            className="modal-button"
            onClick={() => store.addDeleteSongTransaction(index, name, artist,youtube)}
            value="Confirm"
          />
          <input
            type="button"
            id="delete-song-cancel-button"
            className="modal-button"
            onClick={store.hideDeleteSongModal}
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteSongModal;
