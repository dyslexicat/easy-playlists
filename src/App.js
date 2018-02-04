import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: "#fff"
};

let fakeServerData = {
  user: {
    name: 'Alp',
    playlists: [
      {
        name: 'My favourites',
        songs: ['111', '222', 'Fourty-two']
      },
      {
        name: '2017 Mix',
        songs: ['AAA', 'BBB', 'CCC']
      },
      {
        name: '2018 Winter',
        songs: ['Dunno', 'Trying', 'My Best']
      },
      {
        name: 'Discover Weekly',
        songs: ['WOW', 'What a', 'Discovery']
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: "inline-block", width: "40%"}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    // reduce -> reduces something to a single value -> reduce the playlists to a list of songs
    // let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
    //   return songs.concat(eachPlaylist.songs)
    // }, [])
    // let totalDuration = allSongs.reduce((sum, eachSong) => {
    //   return sum + eachSong.duration
    // }, 0)
    return (
      <div style={{...defaultStyle, display: "inline-block", width: "40%"}}>
        <h2>{this.props.playlists.length} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div>
        <img/>
          <input type="text" onKeyUp={event =>
              this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: "inline-block", width: "20%"}}>
        <img/>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map(song =>
            <li>{song}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    // use an arrow function so that "this" is locked in the function at the initialization otherwise it won't work
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000)
  }

  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle}}>
            Hey, {this.state.serverData.user.name}
          </h1>
        <PlaylistCounter playlists={this.state.serverData.user.name}/>
        <HoursCounter playlists={this.state.serverData.user.name}/>
        <Filter onTextChange={text => this.setState({filterString: text})}/>
        {this.state.serverData.user.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
        ).map(playlist =>
          <Playlist playlist={playlist}/>
        )}
      </div> : <h1 style={{defaultStyle}}>Loading...</h1>
      }
    </div>
    );
  }
}

export default App;
