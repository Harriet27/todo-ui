import React, { useEffect } from 'react';
import queryString from 'querystring';
import { useDispatch, useSelector } from 'react-redux';
import { Verification } from '../Redux/Action';
import { Redirect } from 'react-router-dom';

const Verify = (props) => {
    let params = queryString.parse(props.location.search);
    let username = params["?username"];
    let password = params.password;

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            Verification({
                username,
                password
            })
        )
    })

    let verified = useSelector((state) => state.auth.verified);

    if (verified) {
        return(
            <Redirect to='/'/>
        )
    }
    return(
        <div>
            Ini Verify
        </div>
    )
}

export default Verify;