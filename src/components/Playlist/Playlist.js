import React from "react";
import "./Playlist.css"

import TrackList  from "../TrackList/TrackList"

class Playlist extends React.Component{
    constructor(props){
        super(props);

        this.handleNameChange =this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.values);
    }

  
    render(){
        return(
            <div className="Playlist"> 
            <input onChange={this.props.handleNameChange} defaultValue={"New Playlist"}></input>
            <TrackList track={this.props.PlaylistTracks}
                        isRemoval={true}
                        onRemove={this.props.onRemove}
            />
            <button className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</button>
            </div>
        );
    }
}

export default Playlist;