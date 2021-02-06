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

function TalkService(API_HOST) {
    this.identity = "";
    this.client = new WebSocket(API_HOST);
    this.client.onclose = () => console.log("Closed");
}

TalkService.prototype = {
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

    setOnMessageHandle: function (func) {
        this.client.onmessage = func;
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
