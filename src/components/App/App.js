import logo from './logo.svg';
import './App.css';
import Playlist from "../Playlist/Playlist";
import SearchBar from ".//SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../uitl/Spotify";


class App extends React.Component{
  constructor(props){
     super(props);

     this.state = {
      SearchResults : [],
      playlistName : "New PlayList",
      playlistTracks: []
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this); 
    this.updatePlaylistNames = this.updatePlaylistNames.bind(this); //updatting for playlist
    this.savePlaylist = this.savePlaylist.bind(this);//for saving the palylist
    this.removeTrackSearch = this.removeTrackSearch.bind(this);//removing the serach track
    this.doThese = this.doThese.bind(this);//for doing all these 
  }

  search(term){// Spotify.search(term) -- Spotiy is API andulo term(take song name example) ni searching
    Spotify.search(term).then(SearchResults => {
      this.setState({SearchResults: SearchResults});// updating seraching result sucessfull or not those result updating in Serachresult feild
    });
  }

  addTrack(track){ //checking plyalist track if that is alredy present just returning otherwise saved into playlist track
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    tracks=tracks.filter(currentTrack => currentTrack.id == track.id);
    trackSearch.unshift(track);
    this.setState({playlistTracks: tracks})
  }

  removeTrackSearch(track){
    let tracks = this.state.SearchResults;
    tracks=tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({SearchResults: tracks});
  }

  doThese(track){
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  updatePlaylistNames(name){
    this.setState({updatePlaylistNames:name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackUris).then( () => {
      this.setState({
        updatePlaylistNames: "New PlayList",
        playlistTracks:[]
      });
    });
  }
}

function App() {
  return (
    <div>
      <h1>
        <a href='http://localhost:3000'>Musicophile</a>
      </h1>
      <div className='App'>
        <SearchBar onSearch={this.search}></SearchBar>
        <div className='App-playlist'>
          <SearchResults searchResult={this.state.searchResult} onAdd={this.doThese}></SearchResults>
          <Playlist playlistTracks= {this.state.playlistTracks} onName={this.updatePlaylistNames} onRemove={this.removeTrack} onSave={this.savePlaylist}></Playlist>
        </div>
      </div>   
    </div>

  );
}

export default App;
