import jsTPS_Transaction from "../common/jsTPS.js";
/**
 * MoveSong_Transaction
 *
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 *
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
  constructor(store, initOldIndex, initNewIndex) {
    super();
    this.store = store;
    this.oldIndex = initOldIndex;
    this.newIndex = initNewIndex;
  }

  doTransaction() {
    this.store.dragAndDropSong(this.oldIndex, this.newIndex);
  }

  undoTransaction() {
    this.store.dragAndDropSong(this.newIndex, this.oldIndex);
  }
}
