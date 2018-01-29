import React, { Component } from 'react';
// import './App.css';
import axios from 'axios'
import './ui-toolkit/css/nm-cx/main.css'

class App extends Component {

  constructor(props) {
    super(props);

    this.state =
      {
        githubVal: '',
        githubMsg: '',
        githubErr: false,
        disableSbmBtn: true,
        githubSuccess: false,
        githubRspMsg: '',
        githubScore: '',
        githubScoreMsg: '',
        githubScoreMsgStyle: ''
      }

    this.ongithubIn = this.ongithubIn.bind(this)
    this.onSbmClick = this.onSbmClick.bind(this)

  }

  ongithubIn({ target }) {
    if (target.value.length === 0) {
      this.setState({ githubVal: target.value, githubErr: true, githubMsg: 'Please enter a GitHub user name to search on.', githubSuccess: false, githubRspMsg: '', disableSbmBtn: true })
    } else {
      this.setState({ githubVal: target.value, githubErr: false, githubMsg: '', githubSuccess: false, disableSbmBtn: false })
    }
  }

  onSbmClick(evt) {
    evt.preventDefault();
    let apiPfx = 'https://api.github.com/users/';
    let apiVal = apiPfx + this.state.githubVal
    const promise = axios.get(apiVal)
    promise.then(response => {
      if (response.data.hasOwnProperty('Error')) {
        let githubRspErr = "Request failed with status: " + response.data.Response + " and message: " + response.data.Error
        this.setState({ githubSuccess: false, githubErr: true, githubMsg: githubRspErr })
      } else {
        let calc_gitHubScore = response.data.followers + response.data.public_repos
        let calc_gitHubScoreMsg =''
        const styles = {
          needs: {
            color: 'red'
          },
          decent: {
            color: 'orange'
          },
          good: {
            color: 'black'
          },
          great: {
            color: 'green'
          },
          elite: {
            color: 'blue'
          }
        }
        let msgStyle = {}
        if (calc_gitHubScore < 20) {
          calc_gitHubScoreMsg = 'Needs work!'
          msgStyle = styles.needs
        } else {
          if (calc_gitHubScore < 50) {
            calc_gitHubScoreMsg = 'A decent start!'
            msgStyle = styles.decent
          } else {
            if (calc_gitHubScore < 100) {
              calc_gitHubScoreMsg = 'Doing good!'
              msgStyle = styles.good
          } else {
            if (calc_gitHubScore < 200) {
              calc_gitHubScoreMsg = 'Great job!'
              msgStyle = styles.great
          } else {
            calc_gitHubScoreMsg = 'Github Elite!'
            msgStyle = styles.elite
          }
          }
          }
        }
        this.setState({ githubSuccess: true, githubErr: false, githubMsg: '', githubRspMsg: '', githubScore: calc_gitHubScore, githubScoreMsg: calc_gitHubScoreMsg, githubScoreMsgStyle: msgStyle })
      }
    });
    promise.catch(error => {
      let githubRspErr = "User does not exist, pick a different GitHub user name."
      // let githubRspErr = "Request failed with status: " + error.response.status + " and message: " + error.response.data.message
      this.setState({ githubSuccess: false, githubErr: true, githubMsg: githubRspErr })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        {/* <div class="card"> */}
          <form class= "card" onSubmit={this.onSbmClick}>
            <div>
              <div class="row">
                <div class="small-5 columns md-text-field with-floating-label icon-left">
                  <input type="search" id="github_in" placeholder='github_username' value={this.state.githubVal} onChange={this.ongithubIn} />
                  <label for="github_in">Github Username:</label>
                  <span class="error">{this.state.githubMsg}</span>
                  <span class="icon icon-sysicon-search"></span>
                </div>
                <div class="small-7 columns"></div>
              </div>
          {this.state.githubSuccess &&
            <div>
              <div class="row">
                <div class="small-2 columns">Your Score: {this.state.githubScore}</div>
                <div class="small-1 columns"></div>
                <div class="small-9 columns"></div>
              </div>
            </div>
          }
          {this.state.githubSuccess &&
            <div>
              <div class="row">
                <div class="small-1 columns"></div>
                <div class="small-2 columns" style={this.state.githubScoreMsgStyle}>{this.state.githubScoreMsg}</div>
                <div class="small-9 columns"></div>
              </div>
            </div>
          }
            </div>
              <div class="row">
                <div class="small-1 columns"></div>
            <button class="small-4 columns button btn-cta" disabled={this.state.disableSbmBtn} onChange={this.onSbmClick}>Calculate my Github Score</button>
                <div class="small-7 columns"></div>
              </div>
          {!this.state.githubSuccess &&
            <div class="row">
              <div class="small-12 columns">{this.state.githubRspMsg}</div>
            </div>
          }
        </form>
      </div>
    );
  }
}

export default App;
