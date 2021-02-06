/*jshint esversion: 6 */

/*
    Kaguya - The opensource instant messaging framework.
    ---
    Copyright 2020 Star Inc.(https://starinc.xyz)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

const API_VERSION = 1;

function KaguyaAPI(API_HOST) {
    this.identity = "";
    this.client = new WebSocket(API_HOST);
    this.client.onclose = () => console.log("Closed");
}

KaguyaAPI.prototype = {
    _responseFactory: function (
        actionType, action, data
    ) {
        let actionID = this._uuid();
        return {
            id: actionID,
            data: JSON.stringify({
                version: API_VERSION,
                actionID: actionID,
                authToken: this.identity,
                actionType: actionType,
                action: action,
                data: data ? data : {}
            })
        }
    },

    _uuid: function () {
        let d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },

    setOnMessageHandle: function (func) {
        this.client.onmessage = func;
    },

    registerUser: function (displayName, username, password) {
        let apiStmt = this._responseFactory(
            "authService",
            "registerUser", {
                displayName: displayName,
                username: username,
                password: password
            }
        );
        this.client.send(apiStmt.data);
        return apiStmt.id;
    },

    getAccess: function (userId, userPw) {
        let apiStmt = this._responseFactory(
            "authService",
            "getAccess", {
                username: userId,
                password: userPw
            }
        );
        this.client.send(apiStmt.data);
        return apiStmt.id;
    },

    syncMessage: function () {
        let apiStmt = this._responseFactory(
            "talkService",
            "syncMessage", {}
        );
        this.client.send(apiStmt.data);
        return apiStmt.id;
    },

    sendTextMessage: function (targetType, target, message) {
        let apiStmt = this._responseFactory(
            "talkService",
            "sendMessage", {
                contentType: 0,
                targetType: targetType,
                target: target,
                content: message
            }
        );
        this.client.send(apiStmt.data);
        return apiStmt.id;
    }
}
