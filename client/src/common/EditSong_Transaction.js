import jsTPS_Transaction from "../common/jsTPS.js"
/**
* EditSong_Transaction
*
* This class represents a transaction that edits a song transaction.
* . It will be managed by the transaction stack.
*
* @author McKilla Gorilla
* @author ?
*/
export default class EditSong_Transaction extends jsTPS_Transaction {
   constructor(initStore,initIndex,initTitle,newTitle,initArtist,newArtist,initYoutube,newYoutube) {
       super();
       this.store = initStore;
       this.index = initIndex;
       this.OldTitle = initTitle;
       this.OldArtist = initArtist;
       this.OldYoutube=initYoutube;  
       this.title = newTitle;
       this.artist = newArtist;
       this.youtube=newYoutube;  
   }

   doTransaction() {
       this.store.editSong(this.index,this.title,this.artist,this.youtube);
   }

   undoTransaction() {
       this.store.editSong(this.index,this.OldTitle,this.OldArtist,this.OldYoutube);
   }
}
