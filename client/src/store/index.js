import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from "../common/AddSong_Transaction";
import MoveSong_Transaction from "../common/MoveSong_Transaction";
import DeleteSong_Transaction from "../common/DeleteSong_Transaction";
import EditSong_Transaction from "../common/EditSong_Transaction";
export const GlobalStoreContext = createContext({});

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",

  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  DELETE_MARKED_LIST: "DELETE_MARKED_LIST",
  ADD_SONG_UPDATE_LIST: "ADD_SONG_UPDATE_LIST",
  ANNOTATE_SONG_FOR_DELETION: "ANNOTATE_SONG_FOR_DELETION",
  

  MARK_SONG_FOR_EDITION: "MARK_SONG_FOR_EDITION",
  EDIT_SONG: "EDIT_SONG",
  STORE: "STORE",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
      idNamePairs: [],
      currentList: null,
      newListCounter: 0,
      listNameActive: false,

      listMarkedForDeletion: null,
      songMarkedForDeletion: null,
      indexSongDelete: 0,
      //listKeyPairMarkedForDeletion: null,
      editSongIndex: -1,

      markSongForEditionId: null,
      markSongForEdition: null,

      markEditSong: 0,
      markEditList: null,
      oldTitle: null,
      oldArtist: null,
      oldYouTubeId: null,
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
          // LIST UPDATE OF ITS NAME
          case GlobalStoreActionType.CHANGE_LIST_NAME: {
            return setStore({
              idNamePairs: payload.idNamePairs,
              currentList: payload.playlist,
              newListCounter: store.newListCounter,
              listNameActive: false,
              listMarkedForDeletion: store.listMarkedForDeletion,
              songIndexMarkedForEdit: null,
              editListNameActive: false,
              songMarkedForDeletion: null,
              listKeyPairMarkedForDeletion: null,
             
            });
          }

          case GlobalStoreActionType.STORE:{
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    markSongForEditionId: payload.markSongForEditionId,
                    markSongForEdition: payload.markSongForEdition,
                    markSongForDeletion: payload.markSongForDeletion,
                    markSongForDeletionId: payload.markSongForDeletionId,
                    markListForDeletionId: payload.markListForDeletionId,
               });
          }      

          case GlobalStoreActionType.MARK_SONG_FOR_EDITION: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: store.currentList,
              newListCounter: store.newListCounter,
              listNameActive: false,

              markEditSong: payload.markEditSong,
              markEditList: payload.markListList,
              oldTitle: payload.oldTitle,
              oldArtist: payload.oldArtist,
              oldYouTubeId: payload.oldYouTubeId,
            });
          }

          // PREPARE TO Edit A LIST
          case GlobalStoreActionType.EDIT_SONG: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: payload.playlist,
              newListCounter: store.newListCounter,
              listNameActive: false,

              markEditSong: 0,
              markEditList: null,
            });
          }

          // STOP EDITING THE CURRENT LIST
          case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: null,
              newListCounter: store.newListCounter,
              listNameActive: false,
              listMarkedForDeletion: store.listMarkedForDeletion,
              songIndexMarkedForEdit: null,
              editListNameActive: false,
              songMarkedForDeletion: null,
              songMarkedForDeletion: null,
              listKeyPairMarkedForDeletion: null,
             
            });
          }
          // CREATE A NEW LIST
          case GlobalStoreActionType.CREATE_NEW_LIST: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: payload, //EDIT MADE HERE..................................
              newListCounter: store.newListCounter + 1,
              listNameActive: false,
              listMarkedForDeletion: store.listMarkedForDeletion,
              songIndexMarkedForEdit: null,
              editListNameActive: false,
              songMarkedForDeletion: null,
              listKeyPairMarkedForDeletion: null,
            
            });
          }
          // GET ALL THE LISTS SO WE CAN PRESENT THEM
          case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
            return setStore({
              idNamePairs: payload,
              currentList: null,
              newListCounter: store.newListCounter,
              listNameActive: false,
              listMarkedForDeletion: store.listMarkedForDeletion,
              songIndexMarkedForEdit: null,
              editListNameActive: false,
              songMarkedForDeletion: null,
              listKeyPairMarkedForDeletion: null,
             
            });
          }
          // PREPARE TO DELETE A LIST
          case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: null,
              newListCounter: store.newListCounter,
              listNameActive: false,
              listMarkedForDeletion: payload,
              songIndexMarkedForEdit: null,
              editListNameActive: false,
              songMarkedForDeletion: null,
              listKeyPairMarkedForDeletion: payload,
              
            });
          }






          // UPDATE A LIST
          case GlobalStoreActionType.SET_CURRENT_LIST: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: payload,
              newListCounter: store.newListCounter,
              listNameActive: false,
              listMarkedForDeletion: store.listMarkedForDeletion,
              songIndexMarkedForEdit: null,
              editListNameActive: false,
              songMarkedForDeletion: null,
              listKeyPairMarkedForDeletion: null,
            
            });
          }
         
          case GlobalStoreActionType.ADD_SONG_UPDATE_LIST: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: payload,
              newListCounter: store.newListCounter,
              listNameActive: false,
              listMarkedForDeletion: null,
              listKeyPairMarkedForDeletion: null,
             
            });
          }

          case GlobalStoreActionType.ANNOTATE_SONG_FOR_DELETION: {
            return setStore({
              idNamePairs: store.idNamePairs,
              currentList: store.currentList,
              newListCounter: store.newListCounter,
              listNameActive: false,
              listKeyPairMarkedForDeletion: null,
              indexSongDelete: payload,
              listKeyPairMarkedForDeletion: null,
            
            });
          }
        

          default:
            return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.markListForDeletion = function (id) {
      storeReducer({
        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
        payload: id,
      });
      store.showDeleteListModal();
    };

    store.deleteList = function (id) {
      async function deleteList(id) {
        let response = await api.deletePlaylistById(id);
        if (response.data.success) {
          store.loadIdNamePairs();
          const newIdNamePairs = store.idNamePairs.filter(
            (idNamePair) => idNamePair !== id
          );
          storeReducer({
            type: GlobalStoreActionType.DELETE_MARKED_LIST,
            payload: newIdNamePairs,
          });
        }
      }
      deleteList(id);
    };

    store.deleteMarkedList = function () {
      store.deleteList(store.listMarkedForDeletion);
      store.hideDeleteListModal();
    };

    store.showDeleteListModal = function () {
      let modal = document.getElementById("delete-list-modal");
      modal.classList.add("is-visible");
    };

    store.hideDeleteListModal = function () {
      let modal = document.getElementById("delete-list-modal");
      modal.classList.remove("is-visible");
    };


    store.createNewList = function (){
        async function asyncCreatePlaylist() {
          let response = await api.createNewList();
          if (response.data.success) {
            let playlistId = response.data.playlist._id; 
            async function asyncSetCurrentList(id) {
              let response = await api.getPlaylistById(id);
              if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                  storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: playlist,
                  });
                  store.history.push("/playlist/" + playlist._id); 
                }
              }
            }
            asyncSetCurrentList(playlistId);
          } 
        }
        asyncCreatePlaylist();
    };


//SONG FUNCTIONS

    //FUNCTION TO ADD SONG
     store.addSong = () => {
       let cl = store.currentList;
       let addSong = {
         title: "untitled",
         artist: "unknown",
         youTubeId: "dQw4w9WgXcQ",
       };
       cl.songs.push(addSong);
       store.updateCurrentList(cl);
     };


     //This function is to update current list
      store.updateCurrentList = async (list) => {
         const r = await api.updatePlaylistById(list._id, list);
         if (r.data.success) {
             storeReducer({
               type: GlobalStoreActionType.ADD_SONG_UPDATE_LIST,
               payload: list,
             });
         }        
     }

    //FUNCTION FOR DRAG AND DROP SONG
     store.dragAndDropSong = (first, last) => {
       let playlist = store.currentList;

        if (first > last) {
          let arr = playlist.songs[first];
          for (let i = first; i > last; i--) {
            playlist.songs[i] = playlist.songs[i - 1];
          }
          playlist.songs[last] = arr;
        }

        else if (first < last) {
         let arr = playlist.songs[first];
         for (let i = first; i < last; i++) {
           playlist.songs[i] = playlist.songs[i + 1];
         }
         playlist.songs[last] = arr;
       } 
       
       store.updateCurrentList(playlist);
     };



    //Functions for DELETE SONG

    store.annotateSongDelete = (i) => {
       storeReducer({
         type: GlobalStoreActionType.ANNOTATE_SONG_FOR_DELETION,
         payload: i,
       });
     };

     store.deleteSong = (i) => {
       let cl = store.currentList;
       cl.songs.splice(i, 1);
       store.updateCurrentList(cl);
       store.hideDeleteSongModal();
     };

     store.showDeleteSongModal = () => {
       let modal = document.getElementById("delete-song-modal");
       modal.classList.add("is-visible");
     };

     store.hideDeleteSongModal = () => {
       let modal = document.getElementById("delete-song-modal");
       modal.classList.remove("is-visible");
     };


//Function for EDIT SONG

    store.editSong = function (index, title, artist, youtube) {
      let list = store.currentList;
      let currentId = store.currentList._id;
      list.songs[index].title = title;
      list.songs[index].artist = artist;
      list.songs[index].youTubeId = youtube;
      async function asyncEditSong() {
        let response = await api.updatePlaylistById(
          store.currentList._id,
          list
        );
        if (response.data.success) {
          storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList,
          });
          store.history.push("/playlist/" + currentId);
        }
      }
      asyncEditSong(currentId, list);
    };

    store.showEditSongModal = function (index) {
      async function asyncsetEditSong(index) {
        let response = await api.getPlaylistById(store.currentList._id);
        if (response.data.success) {
          let playlist = response.data.playlist;
          let song = playlist.songs[index];
          if (response.data.success) {
            storeReducer({
              type: GlobalStoreActionType.STORE,
              payload: {
                markSongForEditionId: index,
                markSongForEdition: song,
                markSongForDeletion: null,
                markSongForDeletionId: null,
                markListForDeletionId: null,
                markListForDeletion: null,
              },
            });
            let modal = document.getElementById("edit-song-modal");
            let oldTitle = document.getElementById("titleBox");
            let oldArtist = document.getElementById("artistBox");
            let oldYoutube = document.getElementById("youtubeBox");
            oldTitle.value = song.title;
            oldArtist.value = song.artist;
            oldYoutube.value = song.youTubeId;
            modal.classList.add("is-visible");
          }
        }
      }
      asyncsetEditSong(index);
    };


    store.hideEditSongModal = function () {
      let modal = document.getElementById("edit-song-modal");
      modal.classList.remove("is-visible");
    };
    
    



     store.addAddSongTransaction = () => {
       let transaction = new AddSong_Transaction(store);
       tps.addTransaction(transaction);
     };

     store.addMoveSongTransaction = (start, end) => {
       let transaction = new MoveSong_Transaction(store, start, end);
       tps.addTransaction(transaction);
     };

     store.addDeleteSongTransaction = (index, title, artist, id) => {
       let transaction = new DeleteSong_Transaction(store, index, title, artist, id);
       tps.addTransaction(transaction);
     };

     store.addEditSongTransaction = function(index,OldTitle,NewTitle,OldArtist,NewArtist,OldYoutube,NewYoutube){
        let transaction = new EditSong_Transaction(store,index,OldTitle,NewTitle,OldArtist,NewArtist,OldYoutube,NewYoutube);
        tps.addTransaction(transaction);
    }

     //store.addEditSongTransaction = (index) => {
     //  let transaction = new EditSong_Transaction(store, index);
    //   tps.addTransaction(transaction);
     //};


    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}