import AWS from 'aws-sdk';

async function sendNotification(destination, channel) {

    AWS.config.update({ region: process.env.region });

    const credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
    AWS.config.credentials = credentials;

    //Create a new Pinpoint object.
    var client = new AWS.Pinpoint();

    var params = {
        ApplicationId: process.env.pinpoint_project_id,
        MessageRequest: {
            Addresses: {
                [destination]: {
                    ChannelType: channel
                }
            },
            MessageConfiguration: {
                SMSMessage: {
                    Body: 'Test Message from Pinpoint',
                    Keyword: process.env.keyword,
                    MessageType: process.env.messageType,
                    OriginationNumber: process.env.sms_origin_number,
                    SenderId: process.env.sender_id
                }
            }
        }
    };

    client.sendMessages(params, function (err, data) {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Message sent!");
        }
    });
}

export { sendNotification };
