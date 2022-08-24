import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../Context";

//
function UserSignOut() {
    const context = useContext(Context);
    useEffect(() => context.actions.signOut());

    return (
        <Redirect to="/" />
    );
}

export default UserSignOut;