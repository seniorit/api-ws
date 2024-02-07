import { handleCtx } from '@bot-whatsapp/provider-baileys';
import { parseMessage } from './helpers';
export const normalMessage = (provider) => {
    const regex = /^(0424|0414|0412|0416|0426)\d{7}$/;
    provider.http.server.post("/send-message", handleCtx(async (bot, req, res) => {
        try {
            const body = req.body;
            const recibe = body.recibe;
            const message = body.message;
            const sendMessageErrorDefault = await bot.sendMessage('584248560123', 'El Numero ' + recibe + ' no posee un formato valido o No tiene WhastApp', {});
            if (regex.test(recibe)) {
                const formattedNumber = recibe.replace(/^04/, '584');
                const msgSendParse = parseMessage(message);
                // Enviar el mensaje con un tiempo límite
                const sendMessagePromise = bot.sendMessage(formattedNumber, msgSendParse, {});
                // Configurar un temporizador para cancelar la solicitud después de 10 segundos
                const timeoutPromise = new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        reject(new Error('Tiempo de espera excedido'));
                    }, 5000); // 10 segundos
                    // Limpiar el temporizador si la promesa se resuelve antes del tiempo de espera
                    sendMessagePromise
                        .then(() => {
                        clearTimeout(timeoutId);
                        resolve();
                    })
                        .catch(() => {
                        clearTimeout(timeoutId);
                    });
                });
                // Esperar a que se complete la operación de envío del mensaje o el tiempo de espera
                await Promise.race([sendMessagePromise, timeoutPromise]);
                res.end("Mensaje Enviado");
            }
            else {
                sendMessageErrorDefault;
                res.end(403);
            }
        }
        catch (error) {
            // await bot.sendMessage('584248560123', 'El Numero '+req.body.recibe+' no posee un formato valido o No tiene WhastApp', {});
            res.end('El Numero ' + req.body.recibe + ' no posee un formato valido o No tiene WhastApp');
        }
    }));
};
export const mediaMessage = (provider) => {
    const regex = /^(0424|0414|0412|0416|0426)\d{7}$/;
    provider.http.server.post("/send-message-media", handleCtx(async (bot, req, res) => {
        const body = req.body;
        const recibe = body.recibe;
        const message = body.message;
        let msgSendParse = parseMessage(message);
        if (regex.test(recibe)) {
            const formattedNumber = recibe.replace(/^04/, '584');
            await bot.sendMessage(formattedNumber, msgSendParse, {});
            res.end("Mensaje Enviado");
        }
        else {
            res.end(403);
        }
    }));
};
