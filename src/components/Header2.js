const Header2 = ({user, viewAllPostsFeed, setViewAllPostsFeed}) => {
    return(
        <div className="header">

            <div className="info-container">

                <div className="img-container"> 
                        <img src={user.img} alt="profile avatar"/> 
                </div>

                <div className="user-info-container"> 

                    <h1> {user.username} </h1>
                    <p> {user.handle} </p>

                </div>

            </div>

                    <p> {user.bio} </p>

                    <div className="sub-info-container"> 

                        <p className="sub-text"> {user.followers.length} followers </p>

                        

                        <div className="button-container">
                            <button className={viewAllPostsFeed ? "current": null} onClick={() => setViewAllPostsFeed(true)}>
                                Posts
                            </button>

                            <button className={!viewAllPostsFeed ? "current": null} onClick={() => setViewAllPostsFeed(false)}>
                                Replies
                            </button>

                        </div>

                    </div>
                
                </div>


    )
}

export default Header2