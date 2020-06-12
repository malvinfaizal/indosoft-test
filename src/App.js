import React, { Component } from 'react';
import './App.css';
import  axios from "axios";
class App extends Component {
  state = {
    userImgList:[],
    userNameList:[],
    userHandleList:[],
    userUrl:[]
  }

  componentDidMount(){
    console.log("ComponentDidmount Sedang Berjalan")
    console.log("Fetch data sedang berjalan") 
    const data = [] 
    for (let index = 0; index <= 5; index++) {
      var rand = Math.floor(Math.random()*10000)
      if(data.indexOf(rand) === -1) data.push(rand)
    }
    data.map((val,idx)=>{
      axios.get("https://api.github.com/users?since="+val) 
      .then(res => {
        console.log(res.data)
        this.setState({
                userImgList: [...this.state.userImgList,res.data[1].avatar_url],
                userHandleList:[...this.state.userHandleList,res.data[1].id], 
                userNameList:[...this.state.userNameList,res.data[1].login], 
                userUrl:[...this.state.userUrl,res.data[1].html_url]
              })
      })
      .catch(err => {console.log(err,'err')})
    })
    // .then(res => {
    //     if( res.status === 200 )
    //         return res.json()
    // }).then( resJson => {
    //     console.log("Mengatur State.data")

    //     this.setState({
    //       userImgList: resJson[1].avatar_url,
    //       userNameList: resJson[1].name,
    //       userHandleList: resJson[1].twitter_username
    //     })
    // })
  }
  render() {
    const {userHandleList,userImgList,userNameList,userUrl} = this.state
      // console.log(`Render lifecycle: ${JSON.stringify(this.state)}`)
      console.log(`Render lifecycle: ${userNameList}`)
    return (
    <div className="App">
      <header className="App-header">
        <h1>
          Who to follow <button className="btn" id="btRefresh"><a className="btn-text">Refresh</a></button>
        </h1>
        <div className="App-panel">
          {userImgList.map((val,idx)=>{
            return(
          <div style={{display:'flex'}} className="App-container">
            <img style={{height:'32px',width:'auto'}} className="App-userimg" src={val}/>
            <a className="App-username" href={userUrl[idx]} >{userNameList[idx]}</a>
            <a className="App-userhandle">@{userHandleList[idx]}</a>
          </div>
            )
          })
          }
        </div>
      </header>
    </div>
  );
  }
}

export default App;
