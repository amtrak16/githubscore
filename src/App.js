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
      }

    this.ongithubIn = this.ongithubIn.bind(this)
    this.onSbmClick = this.onSbmClick.bind(this)

  }

  ongithubIn({ target }) {
    console.log(target)
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
    // .then(function ({data}) {
    //   console.log(data)
    // })
    promise.then(response => {
      console.log(response)
      if (response.data.hasOwnProperty('Error')) {
        let githubRspErr = "Request failed with status: " + response.data.Response + " and message: " + response.data.Error
        this.setState({ githubSuccess: false, githubRspMsg: githubRspErr })
      } else {
        let calc_gitHubScore = response.data.followers + response.data.public_repos + 194
        let calc_gitHubScoreMsg =''
        if (calc_gitHubScore < 20) {
          calc_gitHubScoreMsg = 'Needs work!'
        } else {
          if (calc_gitHubScore < 50) {
            calc_gitHubScoreMsg = 'A decent start!'
          } else {
            if (calc_gitHubScore < 100) {
              calc_gitHubScoreMsg = 'Doing good!'
          } else {
            if (calc_gitHubScore < 200) {
              calc_gitHubScoreMsg = 'Great job!'
          } else {calc_gitHubScoreMsg = 'Github Elite!'}
          }
          }
        }
        this.setState({ githubSuccess: true, githubRspMsg: '', githubScore: calc_gitHubScore, githubScoreMsg: calc_gitHubScoreMsg })
      }
    });
    promise.catch(error => {
      console.log(error)
      let githubRspErr = "User does not exist, pick a different GitHub user name."
      this.setState({ githubSuccess: false, githubRspMsg: githubRspErr })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <div class="card">
          <form onSubmit={this.onSbmClick}>
            <div class="row">
                <div class="small-3 columns md-text-field with-floating-label icon-left">
                  <input type="search" id="github_in" placeholder='github_username' value={this.state.githubVal} onChange={this.ongithubIn} />
                  <label for="github_in">Github Username:</label>
                  <span class="error">{this.state.githubMsg}</span>
                  <span class="icon icon-sysicon-search"></span>
                </div>
                <div class="small-9 columns" ></div>
            </div>
          {this.state.githubSuccess &&
            <div>
                <div class="row">
                  <div class="small-12 columns" ></div>
                </div>
                <div class="row">
                  <div class="small-8 columns" ></div>
                  <div id="githubScore" class="small-3 columns">Your Score: {this.state.githubScore}</div>
                  <div class="small-1 columns" ></div>
                </div>
            </div>
          }
          {this.state.githubSuccess &&
            <div class="row">
              {/* <div class="small-12 columns" ></div> */}
              <div class="small-8 columns" ></div>
              <div id="githubScoreMsg" class="small-3 columns" >{this.state.githubScoreMsg}</div>
              <div class="small-1 columns" ></div>
            </div>
          }
            <div class="row">
              <div class="small-5 columns padding-small">
                <button class="button btn-cta" disabled={this.state.disableSbmBtn} onChange={this.onSbmClick}>Calculate my Github Score</button>
              </div>
              <div class="small-7 columns" ></div>
            </div>
          </form>
        </div>
        {!this.state.githubSuccess &&
          <div class="card">
            <div class="row">
              <div class="row">
                <div id="githubRspMsg" class="small-12 columns" >{this.state.githubRspMsg}</div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
