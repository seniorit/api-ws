import { MemoryDB, createBot, createFlow, createProvider } from "@bot-whatsapp/bot";
import { BaileysProvider } from "@bot-whatsapp/provider-baileys";
import { mediaMessage, normalMessage } from './messageHandler';
import { flowBienvenida } from './controlFlow';


const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(8001);

  normalMessage(provider);

  mediaMessage(provider);

  createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider,
  });
};

main();
