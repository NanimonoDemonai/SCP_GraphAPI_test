import React from 'react';

export default class extends React.Component<Props> {

    //サーバサイド
    static async getInitialProps({req}: HttpContext): Promise<Props> {
        console.log('Called Index');
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;



        return {
            payload: JSON.stringify("ほげ"),
            userAgent
        };
    }

    //レンダー
    render() {
        return (
            <div>
                <p>
                 a
                </p>
            </div>
        );
    }
};