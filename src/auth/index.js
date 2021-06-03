import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authCookie } from '../helper';

function auth(ComponentToProtect) {

    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
                errMsg: ''
            };
        }
      
        async componentDidMount() {
            const token = await authCookie(document.cookie).then(t => t);

            fetch(`${process.env.REACT_APP_API}/api/check-token`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.split('=')[1]}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        this.setState({
                            ...this.state.loading,
                            ...this.state.redirect,
                            errMsg: res.statusText
                        })
                        throw error;
                    }
                })
                .catch(err => {
                    this.setState({ loading: false, redirect: true, ...this.state.errMsg });
                });
        }
      
        render() {
            const { loading, redirect, errMsg } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to={{
                    pathname: '/',
                    state: { message: errMsg }
                }} />;
            }
            return <ComponentToProtect {...this.props} />;
        }
      
    }
}

export default auth;