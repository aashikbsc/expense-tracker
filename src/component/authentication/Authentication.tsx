import React, { useState } from 'react';
import { loginAPI, registerAPI } from '../../services/authService';

const Authentication = (props: any) => {
    const { callback } = props;
    
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [authData, setAuthData] = useState({
        email: '',
        password: '',
        name: ''
    });
    
    const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(authData);
        let result: any;
        if (!isLogin) {
            result = await registerAPI({
                username: authData.name,
                email: authData.email,
                password: authData.password
            })
            console.log("REGISTER API RESULT : ", result)
            localStorage.setItem("token", result.token);
            setAuthData({
                email: "",
                name: "",
                password: ""
            })
            callback();
        } else {
            result = await loginAPI({
                email: authData.email,
                password: authData.password,
            })
            console.log("LOGIN API RESULT : ", result)
            localStorage.setItem("token", result.token);
            setAuthData({
                email: "",
                name: "",
                password: ""
            })
            callback();
        }
    };
    
    return (
        <div>
            {/* Auth Modal */}
            {!localStorage.getItem("token") && (
                <div className="modal-overlay">
                    <div className="auth-modal glass-effect">
                        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
                        <form onSubmit={handleAuthSubmit}>
                            {!isLogin && (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={authData.name}
                                        onChange={handleAuthChange}
                                        required
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={authData.email}
                                    onChange={handleAuthChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={authData.password}
                                    onChange={handleAuthChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="auth-button">
                                {isLogin ? 'Sign In' : 'Sign Up'}
                            </button>
                        </form>
                        <p className="auth-toggle">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Sign Up' : 'Sign In'}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Authentication;