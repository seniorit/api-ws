export const parseMessage = (message) => {
    return message.replace(/%0A/g, '\n');
};
