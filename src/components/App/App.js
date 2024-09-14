import React from 'react'; // Import React
import logo from './logo.svg';// Importing a logo file, though this might not be necessary if you aren't using it
import './App.css'; // Importing the App CSS styles
import Playlist from "../Playlist/Playlist"; // Playlist component
import SearchBar from "../Searchbar/SearchBar"; // SearchBar component
import SearchResults from "../SearchResults/SearchResults"; // SearchResults component
import Spotify from '../util/Spotify';
 // Spotify API utility

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchResults: [],
      playlistName: "New PlayList",
      playlistTracks: []
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistNames = this.updatePlaylistNames.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    Spotify.search(term).then(SearchResults => {
      this.setState({ SearchResults: SearchResults });
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrackSearch(track) {
    let tracks = this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ SearchResults: tracks });
  }

  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }

  updatePlaylistNames(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New PlayList",
        playlistTracks: []
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          <a href='http://localhost:3000'>Musicophile</a>
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults searchResults={this.state.SearchResults} onAdd={this.doThese} />
            <Playlist
              playlistTracks={this.state.playlistTracks}
              onName={this.updatePlaylistNames}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
