const Header = ({user, viewPostsFeed, setViewPostsFeed}) => {
    return(
        <div className="header">

            <div className="info-container">

                <div className="img-container"> 
                        <img src={user.img} alt="profile avatar"/> 
                </div>

                <div className="user-info-container"> 

                    <h2> {user.username} </h2>
                    <p> {user.handle} </p>

                </div>

            </div>

                    <p> {user.bio} </p>

                    <div className="sub-info-container"> 

                        <p className="sub-text"> {user.followers.length} followers </p>

                        

                        <div className="button-container">
                            <button className={viewPostsFeed ? "current": null} onClick={() => setViewPostsFeed(true)}>
                                Posts
                            </button>

                            <button className={!viewPostsFeed ? "current": null} onClick={() => setViewPostsFeed(false)}>
                                Replies
                            </button>

                        </div>

                    </div>
                
                </div>


    )
}

export default Header