import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { 
    Grid,
    Fab
 } from "@material-ui/core";
import CardRating from "../../components/CardRating";
import AddIcon from "@material-ui/icons/Add";
import "./style.scss";
import { database } from "../../Firebase/index"


const MyRatingsList = ({state}) => {
    const history = useHistory();
    let { uuid } = useParams();
    const [ratings, setRatings] = useState([]);
    useEffect(() => {
        getUsersRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const goTo = (href) => {
        history.push(href);
    }

    const getUsersRatings = () => {
        const dbRef = database.ref();
        dbRef.child("customer-rating").child(uuid).get().then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                var arrData = [];
                for(var id in data){
                    data[id].id = id;
                    arrData.push(data[id]);
                }
                setRatings(arrData);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <Grid
                container
                justify="center"
                className="myRatingsList"
                spacing={3}
            >
                {
                    ratings.map(rating =>
                        <Grid key={rating.id}  item xs={12} md={6}>
                            <CardRating rating={rating} uuid={uuid}/>
                        </Grid>
                    )
                }

            </Grid>
            <Fab
                onClick={() => goTo("/add-rating/"+uuid)}
                color="primary"
                className="addButton"
                aria-label="add">
                <AddIcon />
            </Fab>
        </>
    );
}

export default connect(state => ({state:state})) (MyRatingsList);