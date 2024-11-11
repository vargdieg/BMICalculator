import { CreateTemplateCommand,GetTemplateCommand,UpdateTemplateCommand,SESClient,TemplateDoesNotExistException } from "@aws-sdk/client-ses";
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const client = new SESClient({});

try{
    const __dirname = new URL('.', import.meta.url).pathname;
    const TemplateName = process.env.TEMPLATE_NAME;
    const SubjectPart = process.env.SUBJECT;
    const filePathHtml = process.env.HTML_FILE_PATH;
    const filePathText = process.env.TEXT_FILE_PATH;
    
    const textPath = path.resolve(__dirname, `../${filePathText}`);
    const htmlPath = path.resolve(__dirname, `../${filePathHtml}`);
    const TextPart = fs.readFileSync(textPath,'utf8');
    const HtmlPart = fs.readFileSync(htmlPath,'utf8');
    
    const templateJson = {
        Template:{
            TemplateName,
            SubjectPart,
            TextPart,
            HtmlPart
        }
    }
    if(templateExists(TemplateName)){
        console.log(`El template con el nombre ${TemplateName} ya existe, se procede a actualizar`);
        const command = new UpdateTemplateCommand(templateJson);
        const response = await client.send(command);
        console.log(response);
    }else{
        console.log(`El template no existe, se procede a crearlo`);
        const command = new CreateTemplateCommand(templateJson);
        const response = await client.send(command);
        console.log(response);
    }

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
          console.log(response.Template.TemplateName);
          return true;
    }catch(error){
        if(error instanceof TemplateDoesNotExistException){
            return false;
        }else{
            throw error;
        }
    }   
}