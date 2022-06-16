import {messageCheck, sendMessage, userSteps} from "./actions.js";
import {testHandler} from "./handlers/test.js";
import {helpHandler} from "./handlers/help.js";
import {leaveHandler} from "./handlers/leave.js";
import messages from "./config/messages.js";
import {questionHandler} from "./handlers/question.js";
import {answerHandler} from "./handlers/answer.js";

const router = (xmpp, message, sender, receiver, requestType, receiverData, stanzaId) => {
    if (requestType === 'body') {
        let userStep = userSteps('getStep', receiver, null);

        let handlerData = {
            xmpp,
            sender,
            receiver,
            message,
            userStep,
            receiverData,
            stanzaId,
        };

        if (userStep === 1) {
            if (messageCheck(message, 'bot test')) {
                return testHandler(handlerData);
            }
            if (messageCheck(message, 'bot')) {
                return questionHandler(handlerData);
            }
        }

        if(userStep === 2) {
            if (messageCheck(message, 'bot') && message.length > 3 && message.split(' ', 1)[0].toUpperCase() === 'BOT') {
                return answerHandler(handlerData);
            }
        }

        //Global message handlers not associated with steps
        if (receiverData.attrs.isSystemMessage && receiverData.attrs.tokenAmount > 0 && messageCheck(message, 'bot')) {
            return sendMessage(
                handlerData,
                messages.visitingHut.tnxForTransaction,
                'message',
                false,
                0,
            );
        }

        if (messageCheck(message, 'bot close') || messageCheck(message, 'bot leave')) {
            return leaveHandler(handlerData);
        }

        if (messageCheck(message, 'bot') || messageCheck(message, 'bot help')) {
            return helpHandler(handlerData);
        }

    }
}
export {router};