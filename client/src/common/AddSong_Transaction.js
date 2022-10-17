import jsTPS_Transaction from "../common/jsTPS";

 export default class AddSong_Transaction extends jsTPS_Transaction {
     constructor(store) {
         super();
         this.store = store;
     }

     doTransaction() {
         this.store.addSong();
     }

     undoTransaction() {
         let list= this.store.currentList;
         list.songs.pop();
         this.store.update_current_list(list);
     }
 }