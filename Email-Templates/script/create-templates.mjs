import { CreateTemplateCommand,SESClient } from "@aws-sdk/client-ses";
import fs from 'fs';
import path from 'path';
try{
    const __dirname = new URL('.', import.meta.url).pathname;
    const filePath = path.resolve(__dirname, '../metaData.txt');
    const data = fs.readFileSync(filePath,'utf8');
    const lines = data.split(/[\n\r]+/g);
    console.log(lines);
    const client = new SESClient();
    lines.forEach(async (line)=>{
        const [templateName,emailSubject,filePathHtml,filePathText] = line.split(/[\s]+/g);
        const textPath = path.resolve(__dirname, `../${filePathText}`);
        const htmlPath = path.resolve(__dirname, `../${filePathHtml}`);
        const TextPart = fs.readFileSync(textPath,'utf8');
        const HtmlPart = fs.readFileSync(htmlPath,'utf8');
        console.log(TextPart);
        console.log(HtmlPart);
        const templateJson = {
            templateName,
            SubjectPart: emailSubject.replace('_',' '),
            TextPart,
            HtmlPart
        }
        const command = new CreateTemplateCommand(templateJson);
        const response = await client.send(command);
        console.log(response);
    })
}catch(error){
    console.log(error)
    throw new Error('Fallo la ejecucion del script')
}