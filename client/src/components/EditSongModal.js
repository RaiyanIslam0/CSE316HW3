import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalStoreContext } from "../store";

function DeleteListModal() {
  const { store } = useContext(GlobalStoreContext);
  store.history = useHistory();

  function handleDeleteList(event) {
    event.stopPropagation();
    store.deleteMarkedList();
  }

  function closeDeleteListModal() {
    store.closeDeleteListModal();
  }

  return (
    <div class="modal" id="edit-song-modal" data-animation="slideInOutLeft">
      <div class="modal-root" id="verify-edit-song-root">
        <div class="modal-north">Edit playlist</div>
        <div class="modal-center">
          <div class="modal-center-content">
             <label class="preText">Title: </label>
              <input type="text" id="titleBox" class="textBox" onClick={this.select}/>
              <br />
              <label class="preText">Artist: </label>
              <input type="text" id="artistBox" class="textBox" onClick={this.select}/>
              <br />
              <label class="preText">YouTube ID:</label>
              <input type="text" id="youtubeBox" class="textBox" onClick={this.select} />
              <br/>
          </div>
        </div>
        <div class="modal-south">
          <input
            type="button"
            id="edit-song-confirm-button"
            class="modal-button"
            onClick={handleDeleteList}
            value="Confirm"
          />
          <input
            type="button"
            id="edit-song-cancel-button"
            class="modal-button"
            onClick={closeDeleteListModal}
            value="Cancel"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteListModal;
