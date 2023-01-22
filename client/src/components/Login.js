import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    const changeFormData = ({ target: { name, value } }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const onLogin = async (e) => {
        e.preventDefault();

        const resp = await fetch("/login", { 
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
            }),
        });

        const respData = await resp.json();
        
        if (respData.token) {
            localStorage.setItem("token", respData.token);
            localStorage.setItem("user", JSON.stringify(respData.user) )
            navigate("/home");
        }
    }

    return (
        <div>
            <form onSubmit={onLogin}>
                <input 
                    type='text' 
                    placeholder='Enter name' 
                    value={formData.name} name='name'
                    onChange={changeFormData} 
                />
                <br />
                <input 
                    type='email' 
                    placeholder='Enter email' 
                    value={formData.email} 
                    name='email'
                    onChange={changeFormData}
                />
                <br />
                <input 
                    type='text' 
                    placeholder='Enter mobile num' 
                    value={formData.mobile} 
                    name='mobile'
                    onChange={changeFormData}
                />
                <br />
                <button type='submit'>Login</button>
            </form>
            
        </div>
    )
}

