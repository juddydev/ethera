
const { xml } = require("@xmpp/client");
import {xmpp} from './xmppCentral';
import * as xmppConstants from '../constants/xmppConstants';
import * as types from '../constants/types';
//For now only subscibed muc are being fetched
export const fetchRosterlist = (walletAddress,stanzaId) =>{
    const message = xml('iq', {
        'from': walletAddress + '@' + xmppConstants.DOMAIN,
        'to': xmppConstants.CONF_WITHOUT,
        'type': 'get',
        'id': stanzaId
    },
    xml('subscriptions', 'urn:xmpp:mucsub:0')
    );

    xmpp.send(message);

}

export const get_archive_by_room =(chat_jid) => {
    let message = xml('iq', {
        'type': 'set', 'to': chat_jid, 'id': "GetArchive"},
        xml('query', { 'xmlns' : 'urn:xmpp:mam:2' },
        xml('set', {'xmlns': 'http://jabber.org/protocol/rsm'},
        xml('max', {}, 300),
        xml('before')
        )
        )
    )
    xmpp.send(message);
}

export const get_list_of_subscribers = (chat_jid,walletAddress) => {
    let message = xml('iq', {
        'from': walletAddress + '@' + xmppConstants.DOMAIN,
        'to': chat_jid,
        'type': 'get',
        'id': 'participants'
        },
        xml('subscriptions', 'urn:xmpp:mucsub:0')
    );
    xmpp.send(message)
}

export const roomConfigurationForm = (user_jid,chat_jid,roomConfig) => {
    const message = xml('iq',{
        'from':user_jid+'@' + xmppConstants.DOMAIN,
        'id':'create2',
        'to':chat_jid,
        'type':'set'
        },
            xml('query',{'xmlns':'http://jabber.org/protocol/muc#owner'},
            xml('x',{'xmlns':'jabber:x:data', 'type':'submit'},
                xml('field',{'var':'FORM_TYPE'},
                    xml('value',{},'http://jabber.org/protocol/muc#roomconfig')
                ),
                xml('field',{'var':'muc#roomconfig_roomname'},
                    xml('value',{},roomConfig.roomName)
                )
            )
        )
    )

    xmpp.send(message);

}

export const getRoomInfo = (walletAddress,chat_jid) => {

    const message = xml('iq',{
    'from':walletAddress+'@'+xmppConstants.DOMAIN,
    'id':'roomInfo',
    'to':chat_jid,
    'type':'get'
    },
    xml('query',{xmlns:"http://jabber.org/protocol/disco#info"})
    )

    xmpp.send(message);
}

export const isComposing = async (walletAddress, chat_jid, fullName)=>{
    // <message
    // from='bernardo@shakespeare.lit/pda'
    // to='francisco@shakespeare.lit/elsinore'
    // type='chat'>
    //     <composing xmlns='http://jabber.org/protocol/chatstates'/>
    // </message>
    const message = xml('message',{
        'from': walletAddress + '@' + xmppConstants.DOMAIN,
        'to':chat_jid,
        'id':types.IS_COMPOSING,
        'type':'groupchat'
        },
        xml('composing',{
            'xmlns':'http://jabber.org/protocol/chatstates'
        }),
        xml('data',{
            'xmlns':'http://'+xmppConstants.DOMAIN,
            'fullName':fullName,
            'manipulatedWalletAddress':walletAddress
        })
    )
    
    setTimeout(()=>{
         xmpp.send(message)
    }, 100)

}

export const pausedComposing = async (walletAddress, chat_jid) => {
//     <message
//     from='romeo@montague.net/orchard'
//     to='juliet@capulet.com/balcony'
//     type='chat'>
//   <thread>act2scene2chat1</thread>
//   <paused xmlns='http://jabber.org/protocol/chatstates'/>
// </message>
    const message = xml('message',{
        'from': walletAddress + '@' + xmppConstants.DOMAIN,
        'to':chat_jid,
        'id':types.PAUSED_COMPOSING,
        'type':'groupchat'
        },
        xml('paused',{
            'xmlns':'http://jabber.org/protocol/chatstates'
        }),
        xml('data',{
            'xmlns':'http://'+xmppConstants.DOMAIN,
            'manipulatedWalletAddress':walletAddress
        })
    )

    xmpp.send(message);
    
}

export const activeChatState = async (walletAddress, chat_jid) => {
    // <message
    //     from='bernardo@shakespeare.lit/pda'
    //     to='francisco@shakespeare.lit/elsinore'
    //     type='chat'>
    // <body>Long live the king!</body>
    // <active xmlns='http://jabber.org/protocol/chatstates'/>
    // </message>

    const message = xml('message',{
        'from': walletAddress + '@' + xmppConstants.DOMAIN,
        'to':chat_jid,
        'id':types.PAUSED_COMPOSING,
        'type':'groupchat'
        },
        xml('active',{
            'xmlns':'http://jabber.org/protocol/chatstates'
        })
    )



    xmpp.send(message);

}

export const commonDiscover = (walletAddress, chat_jid)=>{
//     <iq from='romeo@shakespeare.lit/orchard'
//     id='disco1'
//     to='juliet@capulet.com/balcony'
//     type='get'>
//   <query xmlns='http://jabber.org/protocol/disco#info'/>
// </iq>

const message = xml('iq',{
    'from': walletAddress + '@' + xmppConstants.DOMAIN,
    'to':chat_jid,
    'id':'disco1',
    'type':'get'
    },
    xml('query',{
        'xmlns':'http://jabber.org/protocol/disco#info'
    })
    )

    xmpp.send(message);

}

export const discoverProfileSupport = (walletAddress,chat_jid) => {
//     <iq type='get'
//     from='hamlet@denmark.lit/elsinore'
//     to='shakespeare.lit'
//     id='iq1'>
//   <profile xmlns='urn:xmpp:tmp:profile'/>
// </iq>
    const message = xml('iq', {
        'type':'get',
        'from': walletAddress +"@"+ xmppConstants.DOMAIN,
        'to' : chat_jid,
        'id' : 'iq1'
    },
    xml('profile',{
        'xmlns':'urn:xmpp:tmp:profile'
    })
    )

    xmpp.send(message)
}

export const discoverChatStates = (walletAddress,chat_jid)=>{
//     <iq from='juliet@capulet.com/balcony'
//     id='disco1'
//     to='romeo@shakespeare.lit/orchard'
//     type='result'>
//   <query xmlns='http://jabber.org/protocol/disco#info'>
//     <feature var='http://jabber.org/protocol/chatstates'/>
//   </query>
// </iq>

// const message = xml('iq',{
//     'from': walletAddress + '@z.okey.com.ua',
//     'id': 'disco1'
// })

}

export const vcardRetrievalRequest = (walletAddress) => {
//     <iq from='stpeter@jabber.org/roundabout'
//     id='v1'
//     type='get'>
//   <vCard xmlns='vcard-temp'/>
// </iq>

    const message = xml('iq', {
        'from' : walletAddress +"@"+ xmppConstants.DOMAIN,
        "id" : types.V_CARD_REQUEST,
        "type" : "get"
    },
    xml('vCard', {
        'xmlns' : 'vcard-temp'
    })
    )

    xmpp.send(message);
}


export const updateVCard = (photoURL, desc) => {
    const message = xml('iq',
    {
        'id' : types.UPDATE_VCARD,
        'type' : 'set'
    },
    xml('vCard',
    {
        'xmlns' : 'vcard-temp' 
    },
    xml('DESC',{},desc),
    xml('PHOTO', {

    },
        xml('EXTVAL',{}, photoURL)
    )
    )
)
xmpp.send(message)
}

export const retrieveOtherUserVcard = (username, userJID) => {
    const message = xml('iq', {
        'from': username +"@"+ xmppConstants.DOMAIN,
        'id': types.OTHER_USER_V_CARD_REQUEST,
        'to': userJID +"@"+ xmppConstants.DOMAIN,
        'type': 'get'
    },xml('vCard',{'xmlns':'vcard-temp'}));

    xmpp.send(message)
}


export const subscribeAndOpenChat = (manipulatedWalletAddress, chatJID) => {
    const subscribe = xml(
        'iq',
        {
            from: manipulatedWalletAddress + "@" + xmppConstants.DOMAIN,
            to: chatJID,
            type: 'set',
            id: 'subscription'
        },
        xml(
            'subscribe',
            {
                xmlns: 'urn:xmpp:mucsub:0',
                nick: manipulatedWalletAddress
            },
            xml(
                'event',
                {
                    node: 'urn:xmpp:mucsub:nodes:messages'
                }
            ),
            xml(
                'event',
                {
                    node: 'urn:xmpp:mucsub:nodes:subject'
                }
            )
        )
    );

    xmpp.send(subscribe);
    get_archive_by_room(chatJID);
}