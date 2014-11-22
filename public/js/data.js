//
//Copyright (c) 2014, Priologic Software Inc.
//All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are met:
//
//    * Redistributions of source code must retain the above copyright notice,
//      this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
//LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//POSSIBILITY OF SUCH DAMAGE.
//
var selfEasyrtcid = "";
var otherOccupants;
var playerIds = [];

function recieveData(who, msgType, data) {
  if(playerIds.indexof(who)) console.log("exist");
  updateOtherPlayers(data);
  console.log(data);
}

function connect() {
    easyrtc.setPeerListener(recieveData);
    easyrtc.setRoomOccupantListener(registerPlayers);
    easyrtc.connect("easyrtc.instantMessaging", loginSuccess, loginFailure);
}

function sendPlayerData(id,x,y) {
  for(var easyrtcid in otherOccupants) {
    player = {
        "player": {
        "id":id,
        "x":x,
        "y":y
       }};
      easyrtc.sendData(easyrtcid,"jsondata",player);
  }  
}

function getPlayersOnline() {
  i = 0;
  for( var id in otherOccupants) {
    i += 1;
//    playerIds[i] = id;
  }
//  playerIds.sort();
  return i;
}

function bull() {
    sendPlayerData(selfEasyrtcid,1,1);
}

function registerPlayers(roomName, occupants, isPrimary) {
  otherOccupants = occupants;
  playerIds[0] = selfEasyrtcid;
  for( var id in otherOccupants) {
    playerIds[1] = id;
  }
}

function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}
