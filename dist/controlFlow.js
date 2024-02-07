import { addKeyword } from '@bot-whatsapp/bot';
export const flowBienvenida = addKeyword("Hola").addAnswer(`Gracias por Escribir a MonarcaIT. En que podemos servirte?
  *Servicios*, *Desarrollo*, *Soporte y Mantenimento*`);
export const flowServicios = addKeyword("Servicios").addAnswer("SEO,SOPORTE REMOTO, SOPORTE PRESENCIAL");
