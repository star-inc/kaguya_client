/* jshint esversion: 6 */

/*
    Kaguya - The opensource instant messaging framework.
    ---
    Copyright 2021 Star Inc.(https://starinc.xyz)

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

import { sha256 } from 'js-sha256'
import BigJSON from 'json-bigint'

function BoxService(API_HOST, responseSalt) {
  this.client = new WebSocket(API_HOST)
  this.client.onclose = () => console.log('Closed')
  this.responseSalt = responseSalt
}

BoxService.prototype = {
  _requestFactory(type, data) {
    return JSON.stringify({ type, data })
  },

  getWebSocketInstance() {
    return this.client
  },

  setOnMessageHandler(func) {
    this.client.onmessage = (event) => {
      const data = BigJSON.parse(event.data)
      const verifyHash = sha256(
        BigJSON.stringify({
          data: data.data,
          salt: this.responseSalt,
          timestamp: data.timestamp,
        })
            .replace(/</g, '\\u003c')
            .replace(/>/g, '\\u003e')
      )
      if (verifyHash === data.signature) {
        func(data.data)
      } else {
        console.error('InvalidSignature')
      }
    }
  },

  getHistoryMessagebox(timestamp, count) {
    const request = this._requestFactory('GetHistoryMessagebox', {
      timestamp,
      count,
    })
    this.client.send(request)
  },

  deleteMessagebox(messageboxUUID) {
    const request = this._requestFactory('DeleteMessagebox', messageboxUUID)
    this.client.send(request)
  },
}

export default BoxService
