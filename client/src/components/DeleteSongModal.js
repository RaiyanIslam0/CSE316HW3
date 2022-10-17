import React, { useContext } from "react";
import { GlobalStoreContext } from "../store";

const DeleteSongModal = () => {
  const { store } = useContext(GlobalStoreContext);
  let cl = store.currentList;

  if (!cl){
      return null;
  } 

  let i = store.indexSongDelete;
  let name = i === undefined ? "" : cl.songs[i].title;
  let artist = i === undefined ? "" : cl.songs[i].artist;
  let yId = i === undefined ? "" : cl.songs[i].youTubeId;

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
            Are you sure you wish to permanently remove {name} from the
            playlist?
          </div>
        </div>
        <div className="modal-south">
          <input
            type="button"
            id="delete-song-confirm-button"
            className="modal-button"
            onClick={() => store.addDeleteSongTransaction(i, name, artist, yId )}
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
