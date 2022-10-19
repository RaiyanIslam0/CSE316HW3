import jsTPS_Transaction from "../common/jsTPS";

export default class RemoveSong_Transaction extends jsTPS_Transaction {
  constructor(store, index, initTitle, initArtist, initYoutube) {
    super();
    this.store = store;
    this.index = index;
    this.title = initTitle;
    this.artist = initArtist;
    this.youTubeId = initYoutube;
  }

  doTransaction() {
    this.store.deleteSong(this.index);
  }

  undoTransaction() {
      let list = this.store.currentList;
      let oldSong = {
        title: this.title,
        artist: this.artist,
        youTubeId: this.youTubeId,
      };

      list.songs.splice(this.index, 0, oldSong);
      this.store.updateCurrentList(list);
      
    };
}
