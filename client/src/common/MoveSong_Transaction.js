import jsTPS_Transaction from "../common/jsTPS.js";
/**
 * MoveSong_Transaction
 *
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 *
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
  constructor(store, initOldSongIndex, initNewSongIndex) {
    super();
    this.store = store;
    this.oldSongIndex = initOldSongIndex;
    this.newSongIndex = initNewSongIndex;
  }

  doTransaction() {
    this.store.dragAndDropSong(this.oldSongIndex, this.newSongIndex);
  }

  undoTransaction() {
    this.store.dragAndDropSong(this.newSongIndex, this.oldSongIndex);
  }
}