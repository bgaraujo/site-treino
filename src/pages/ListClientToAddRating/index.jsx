import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { 
    Grid
 } from "@material-ui/core";
import CardUser from "../../components/CardUser";
import { database } from "../../Firebase/index";


const ListClientToAddRating = ({state}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getUsers = () => {
        database.ref().child("users").get().then((snapshot) => {
            if (snapshot.exists()) {
                const objUsers = snapshot.val();
                var arrUsers = [];
                for (const uuid in objUsers) {
                    objUsers[uuid].uuid = uuid;
                    arrUsers.push(objUsers[uuid])
                }
                setUsers(arrUsers);
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <Grid
            container
            justify="center"
            className="ListClientToAddRating"
            spacing={3}
        >
            {
                users.map(user => 
                    <Grid key={user.uuid} item xs={12} md={6}>
                        <CardUser user={user} />
                    </Grid>
                )
            }
        </Grid>
    );
}

export default connect(state => ({state:state})) (ListClientToAddRating);