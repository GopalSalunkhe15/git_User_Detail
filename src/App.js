import Select from 'react-select';
import {useState,useEffect} from "react";
import Highcharts from "./highchart/HighChart"
import {selectUser,userFollower,Forks,Issue,userStars,Category} from "./types/Action";
import {connect} from "react-redux";
const mapStateToProps=(state) =>{
  
  return {
    selectedUser : state.selectedUser,
    followers:state.followers,
    stars:state.stars,
    fork:state.forks,
    issue:state.issue,
    categories:state.category
  }
}
const mapDispatchtoProps = (dispatch) =>{
  
  return{
    selectUser:(e) =>{
      dispatch(selectUser(e))
    },
    userFollower:(e) =>{
      dispatch(userFollower(e))
    },
    Forks:(e) =>{
      dispatch(Forks(e))
    },
    Issue:(e) =>{
      dispatch(Issue(e))
    },
    userStars:(e) =>{
      dispatch(userStars(e))
    },
    Category:(e) =>{
      dispatch(Category(e))
    }
  }
}
function App(props) {
  
  const [options,setOption] = useState("");
  const [gitUserDetail,setGitUserDetail] = useState({});
  const [avatar,setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);  

  useEffect(()=>{
    var requestOptions = {
      method: 'GET',
    };
    
    fetch("https://api.github.com/users", requestOptions)
      .then(response => response.text())
      .then(result =>{ 
        let userDetail = JSON.parse(result)
        setGitUserDetail(userDetail)
        getOptions(userDetail)
      })
      .catch(error => console.log('error', error));
  },[]
  ) 
  
  const getOptions = (userDetail) =>{
    let options = [];
    
    for (let i = 0; i < userDetail.length; i++) {
      let option = {
        value: userDetail[i].login,
        label: userDetail[i].login,
        Avatar:userDetail[i].avatar_url,
        followers: userDetail[i].url,
        stars:userDetail[i].starred_url,
        repo: userDetail[i].repos_url
      };
      options.push(option);
    }
    setOption(options);
  }
  const getStar = (star) => {
    let addStar = 0;
    for(let i= 0 ; i<star.length; i++){
       addStar += star[i].stargazers_count
    }
    return addStar;
  }
  const onHandleChange = (e) => {
     getFollowerDetails(e)
     props.selectUser(e)
  }
   async function getFollowerDetails (e){
    setIsLoading(true);
    let forkArray = [];
    let openIssueCount = [];
    let categoryArray = [];
    let followerResponse = await fetch(e.followers);
    let followersDetais = await followerResponse.json()
    let repoResponse = await fetch(e.repo);
    let repoCount = await repoResponse.json();
    let starResponce = await fetch(`https://api.github.com/users/${e.value}/starred`);
    let star = await starResponce.json();
    let starCount = getStar(star);
    for(let i =0; i<repoCount.length; i++){
      forkArray.push(repoCount[i].forks_count);
      openIssueCount.push(repoCount[i].open_issues_count);
      categoryArray.push(repoCount[i].full_name)
    }
    props.userFollower(followersDetais.followers);
    props.Forks(forkArray);
    props.Issue(openIssueCount);
    props.userStars(starCount);
    props.Category(categoryArray);
    setAvatar(e.Avatar)
    setIsLoading(false);  
  }
  return (
    <div className="App">
       <Select
        options={options}
        onChange={(e) => onHandleChange(e)}
      />
      <div>
        {
          (isLoading) ? <div>Loding ...</div> : (avatar) ? <div>
            <img style={{width: "214px"}} src={avatar}/>
           <div> <span> 
              followers : {props.followers}
            </span>
            <span> star : {props.stars}</span>
            </div>
            <Highcharts 
               categories={ props.categories}
               fork={props.fork}
               issue={props.issue}
            />
          </div> : ""
        }       
      </div>
       
    </div>
  );
}
App.defaultProps={
  
}

export default connect(mapStateToProps,mapDispatchtoProps)(App);
