import React from 'react'
//Picture User
import man from "../../../assets/images/dashboard/man.png";
import { HOST } from '../../../constants/hostBE';
import { UserState } from '../../../context/User';
const UserPanel = () => {

    const { user } = UserState();
    return (
        <div>
            <div className="sidebar-user text-center">
                <div>
                    <img
                        className="img-60 rounded-circle lazyloaded blur-up"
                        src={`${HOST}/Image/${user?.pic}`}
                        alt="#"
                    />
                </div>
                <h6 className="mt-3 f-14">{user?.fullname}</h6>
                <p>{user?.role}</p>
            </div>
        </div>
    )
}

export default UserPanel