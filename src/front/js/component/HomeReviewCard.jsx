import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

const HomeReviewCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getReviews();
        console.log("Fetch for all reviews is working")
    }, []);

    return (
        <div className='home-reviews'>
            {store.reviews
                .slice(0, 10)
                .map((review) =>
                
                <div className="card-home-review">

                    <div key={review.id} className="card bg-dark text-white my-4 container" style={{ height: "16rem", width: "20rem" }}>
                        <img src="..." className="card-img" alt="..."></img>
                        <div className="card-img-overlay">
                            <h5 className="card-title">{review.title}</h5>
                            <p className="card-text">{review.comment_text}</p>
                            <p>By {review.user.username}</p>
                            <p className="card-text">Last updated 3 mins ago</p>
                        </div>
                    </div>
                </div>


                )}

        </div>

    )
}

export default HomeReviewCard