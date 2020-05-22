import React from 'react';
import './Notification.css'

const Notification = (props) => {
    if (props.message === null) {
        return null
    }

    return (
        <div className={props.problem ? 'error' : 'notification'}>
            {props.message}
        </div>
    );
}

export default Notification;
