import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from "react-router-dom";
     
     
 function DeleteSongModal() {
     const { store } = useContext(GlobalStoreContext);
     store.history = useHistory();
     let name = "";
     if (store.currentList && store.songMarkedForDeletion) {
         let id = store.songMarkedForDeletion;
         name = store.currentList.songs[id].title;
     }
     function handleConfirmDeleteSong(event) {
         event.stopPropagation();
         store.deleteMarkedSong();
     }
     function handleCancelDeleteSong(event) {
         store.hideDeleteSongModal();
     }
     return (
         <div
             id="remove-song-modal"
             className="modal"
             data-animation="slideInOutLeft">
             <div className="modal-root" id='verify-remove-song-root'>
                 <div className="modal-north">
                     Delete Song?
                 </div>
                 <div className="modal-center">
                     <div className="modal-center-content">
                         Are you sure you wish to permanently remove {name} from the playlist?
                     </div>
                 </div>
                 <div className="modal-south">
                     <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={handleConfirmDeleteSong} value='Confirm' />
                     <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={handleCancelDeleteSong} value='Cancel' />
                 </div>
             </div>
         </div>
     );
 }

 export default DeleteSongModal;