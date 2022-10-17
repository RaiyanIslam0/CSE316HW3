import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from "react-router-dom";
 
 /*
     This modal is shown when the user asks to delete a list. Note 
     that before this is shown a list has to be marked for deletion,
     which means its id has to be known so that we can retrieve its
     information and display its name in this modal. If the user presses
     confirm, it will be deleted.
     
     @author McKilla Gorilla
 */
 function DeleteSongModal() {
     const { store } = useContext(GlobalStoreContext);
     store.history = useHistory();
     let name = "";
     if (store.currentList && store.songMarkedForDeletion) {
         let id = store.songMarkedForDeletion;
         name = store.currentList.songs[id].title;
     }
     function handleDeleteSong(event) {
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
                     Delete {name}?
                 </div>
                 <div className="modal-center">
                     <div className="modal-center-content">
                         Are you sure you wish to permanently remove {name} from the playlist?
                     </div>
                 </div>
                 <div className="modal-south">
                     <input type="button" id="remove-song-confirm-button" className="modal-button" onClick={handleDeleteSong} value='Confirm' />
                     <input type="button" id="remove-song-cancel-button" className="modal-button" onClick={handleCancelDeleteSong} value='Cancel' />
                 </div>
             </div>
         </div>
     );
 }

 export default DeleteSongModal;