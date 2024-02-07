

export const parseMessage= (message:string)=>{

  return message.replace(/%0A/g, '\n');
}
