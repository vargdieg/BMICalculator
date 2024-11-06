import { CreateTemplateCommand,GetTemplateCommand,SESClient,TemplateDoesNotExistException } from "@aws-sdk/client-ses";
import fs from 'fs';
import path from 'path';

const client = new SESClient({});

try{
    const __dirname = new URL('.', import.meta.url).pathname;
    const filePath = path.resolve(__dirname, '../metaData.txt');
    const data = fs.readFileSync(filePath,'utf8');
    const lines = data.split(/[\n\r]+/g);
    lines.forEach(async (line)=>{
        const [TemplateName,emailSubject,filePathHtml,filePathText] = line.split(/[\s]+/g);
        if(templateExists(TemplateName)){
            throw new Error(`El template con el nombre ${TemplateName} ya existe`)
        }else{
            const textPath = path.resolve(__dirname, `../${filePathText}`);
            const htmlPath = path.resolve(__dirname, `../${filePathHtml}`);
            const TextPart = fs.readFileSync(textPath,'utf8');
            const HtmlPart = fs.readFileSync(htmlPath,'utf8');
            const templateJson = {
                Template:{
                    TemplateName,
                    SubjectPart: emailSubject.replaceAll('_',' '),
                    TextPart,
                    HtmlPart
                }
            }
            const command = new CreateTemplateCommand(templateJson);
            const response = await client.send(command);
            console.log(response);
        }
    })
}catch(error){
    console.log(error)
    throw new Error('Fallo la ejecucion del script')
}

async function templateExists(name){
    try{
        const input = { 
            TemplateName: name,
          };
          const command = new GetTemplateCommand(input);
          const response = await client.send(command);
          console.log(response);
          return true;
    }catch(error){
        if(error instanceof TemplateDoesNotExistException){
            return false;
        }else{
            throw error;
        }
    }   
}