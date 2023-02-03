import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import man from "../../../assets/images/dashboard/man.png";
import { UserState } from '../../../context/User';
const UserMenu = () => {
	const { user } = UserState();
	const logout = ()=>{
		localStorage.removeItem("userInfo");
	};
	return (
		<Fragment>
			<li className="onhover-dropdown">
				<div className="media align-items-center">
					<img
						className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
						src={`http://localhost:4000/Image/${user?.pic}`}
						alt="header-user"
					/>
					<div className="dotted-animation">
						<span className="animate-circle"></span>
						<span className="main-circle"></span>
					</div>
					<ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
						<li>
							<Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
								<i data-feather="user"></i>Edit Profile
							</Link>
						</li>
						<li>
							<Link to={`${process.env.PUBLIC_URL}/`} onClick={logout}>
								<i data-feather="log-out"></i>Logout
							</Link>
						</li>
					</ul>
				</div>
			</li>
		</Fragment>
	)
}

export default UserMenu