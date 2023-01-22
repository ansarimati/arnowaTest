import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState('');


	useEffect(() => {
		const token = localStorage.getItem("token");
		const userJson = JSON.parse(localStorage.getItem('user'))
		console.log(userJson)
		if (!token) {
			navigate("/login");
		}
		if (userJson) {
			setUser(userJson);
		}

	}, []);

	const messageHandler = async (e) => {
		e.preventDefault();
		const resp = await fetch('/message', {
			method: 'PUT',
			headers: {
				'x-auth-token': localStorage.getItem('token'),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				msg: message
			})
		});

		const respData = await resp.json();
		if(typeof(respData.message) === "string" ) {
			onLogout();
		}
		else {
			localStorage.setItem("user", JSON.stringify(respData));
			console.log(respData);
			setUser(respData);
			setMessage('');
		}
		
	}

	const onLogout = async () => {
		const resp = await fetch('/logout', {
			method: 'POST',
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		});
		if (resp.status === 200) {
			localStorage.clear();
			navigate('/login')
		}
	}

	const getSimplifiedDateTime = (date) => {

		const _newDate = new Date(date);

		return `${_newDate.getDate()}-${_newDate.getMonth() + 1}-${_newDate.getFullYear()}  ${_newDate.getUTCHours()}:${_newDate.getUTCMinutes()}:${_newDate.getUTCSeconds()} UTC`;

	}

	const getSessionTime = (startTime, endTime) => {
		return new Date(new Date(endTime) - new Date(startTime)).getMinutes() + " minutes";
	}

	if (user) {
		return (
			<>
				<div>Welcome {user.name}</div>
				<form onSubmit={messageHandler}>
					<input type='text' placeholder='Enter message' value={message} onChange={(e) => setMessage(e.target.value)} ></input>
					<button type='submit'>Submit</button>
				</form>
				<button onClick={onLogout}>Logout</button>

				<table>
					<thead>
						<tr>
							<th>login time</th>
							<th>session</th>
							<th>message</th>
						</tr>
					</thead>

					<tbody>
						{
							user && user.message &&  Array.isArray(user.message) && user.message.map((item, index) => {
								return (

									<tr key={`${item}_${index}`}>
										<td>{getSimplifiedDateTime(user.createdAt)}</td>
										<td>{getSessionTime(user.createdAt, user.logoutTime)}</td>
										<td>{item}</td>
									</tr>

								)
							})
						}
					</tbody>

				</table>

			</>
		)
	}
	return <div></div>
}

