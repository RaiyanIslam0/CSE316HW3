import { useContext } from "react";
import { GlobalStoreContext } from "../store";

function EditSongModal() {
  let title = "";
  const { store } = useContext(GlobalStoreContext);

  function handleEditSong() {
    let title = document.getElementById("titleBox").value;
    let artist = document.getElementById("artistBox").value;
    let youtube = document.getElementById("youtubeBox").value;
    let song = store.markSongForEdition;
    store.addEditSongTransaction(store.markSongForEditionId,song.title,title,song.artist,artist,song.youTubeId,youtube);
    store.hideEditSongModal();
  }
  function handleHideEditSong() {
    store.hideEditSongModal();
  }
  if (store.markSongForDeletion != null) {
    title = store.markSongForDeletion.title;
  }


return (
  <div class="modal" id="edit-song-modal" data-animation="slideInOutLeft">
    <div class="modal-root" id="verify-delete-list-root">
      <div class="modal-north">Edit Song</div>
      <div class="modal-center">
        <div class="modal-center-content">
          <label class="preText">Title: </label>
          <input type="text" id="titleBox" class="textBox" />
          <br />
          <label class="preText">Artist: </label>
          <input type="text" id="artistBox" class="textBox" />
          <br />
          <label class="preText">YouTube ID:</label>
          <input type="text" id="youtubeBox" class="textBox" />
          <br />
        </div>
      </div>
      <div class="modal-south">
        <input
          type="button"
          id="edit-song-confirm-button"
          class="modal-button"
          value="Confirm"
          onClick={handleEditSong}
        />
        <input
          type="button"
          id="edit-song-cancel-button"
          class="modal-button"
          value="Cancel"
          onClick={handleHideEditSong}
        />
      </div>
    </div>
  </div>
);
}

export default EditSongModal;