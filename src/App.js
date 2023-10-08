import {useState, useEffect} from "react"
import { Link, withRouter } from "react-router-dom";
import Nav from './components/Nav'
import Header from './components/Header'
import Feed from './components/Feed'
import WriteIcon from "./components/WriteIcon"
import HomeIcon from "./components/HomeIcon"
import PopUp from "./components/PopUp"





const App = () => {

  const [user, setUser] = useState(null)
  const [posts, setPosts ] = useState(null)
  const [allPosts, setAllPosts ] = useState(null)
  const [viewPostsFeed, setViewPostsFeed] = useState(true)
  const [filteredPosts, setFilteredPosts] = useState(null)
  const [openPopUp, setOpenPopUp] = useState(false)
  const [interactingPost, setInteractingPost] = useState(null)
  const [popUpFeedPosts, setPopUpFeedPosts] = useState(null)
  const [text, setText] = useState("")


  const userId = "8e2c0f1d-ded4-4e76-a529-a6b18f25a0ef"

  const getUser = async () => {

    try{
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`)
      const data = await response.json()
      setUser(data[0])

    } catch (error){
      console.error(error)
    }

  }


  const getPosts = async () => {
    try{
      const response = await fetch(`http://localhost:3000/posts?thread_from=${userId}`)
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error(error)
    }
  }



  const getPostsFeed = () => {
    if(viewPostsFeed){
      const standAlonePosts = posts?.filter(post => post.reply_to === null)
      setFilteredPosts(standAlonePosts)
    }
    if (!viewPostsFeed) {
      const replyPosts = posts?.filter(post => post.reply_to!== null)
      setFilteredPosts(replyPosts)
    }
  }

  const getReplies = async () => {

    try{
      const response = await fetch(`http://localhost:3000/posts?reply_to=${interactingPost?.id}`)
      const data = await response.json()
      setPopUpFeedPosts(data)
    } catch (error) {
      console.error(error)
    }

  }

  const postPost = async () => {

    const post = 

    {
      "timestamp": new Date(),
      "thread_from": user.user_uuid,
      "thread_to": user.user_uuid || null,
      "reply_to": interactingPost?.id || null,
      "text": text,
      "likes": []
    }

    try{

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
  
        body: JSON.stringify(post)
  
          })

          const result = await response.json()

          console.log(result)
          getPosts()
          getReplies()
          setText("")

    }catch (error) {
      console.error(error)
    }
  }

  const handleClick = () => {
    setPopUpFeedPosts(null)
    setInteractingPost(null)
    setOpenPopUp(true)
  }


  useEffect(() => {
    getReplies()
  }, [interactingPost])


  useEffect(() => {
    getUser()
    getPosts()
  }, [] )

  useEffect(() => {
    getPostsFeed()
  }, [user, posts, viewPostsFeed] )

  console.log('interactingPost', interactingPost)


  return (
    <>

    {user && <div className="app">

      <Nav/>
      <Header
      user = {user}
      viewPostsFeed = {viewPostsFeed}
      setViewPostsFeed={setViewPostsFeed}
      />
      <Feed
        user = {user}
        setOpenPopUp={setOpenPopUp}
        filteredPosts = {filteredPosts}
        getPosts = {getPosts}
        setInteractingPost = {setInteractingPost}
      />

      {openPopUp && 
      
      <PopUp
        
        user={user}
        setOpenPopUp={setOpenPopUp}
        popUpFeedPosts = {popUpFeedPosts}
        text = {text}
        setText={setText}
        postPost={postPost}
      
      />}

      <div   className="write-icon-container">

      <div onClick={handleClick}>  <WriteIcon/> </div>


      </div>

      
      </div>}
    </>
  );
}

export default App;
