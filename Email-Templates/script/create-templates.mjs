import { CreateTemplateCommand,SESClient } from "@aws-sdk/client-ses";
import fs from 'fs';
try{
    const data = fs.readFileSync('../metaData.txt','utf8');
    const lines = data.split(/[\n\r]+/g);
    console.log(lines);
    const client = new SESClient();
    lines.forEach(async (line)=>{
        const [templateName,emailSubject,filePathHtml,filePathText] = line.split(/[\s]+/g);
        const templateJson = {
            templateName,
            SubjectPart: emailSubject.replace('_',' '),
            TextPart: `${fs.readFileSync(`../${filePathText}`,'utf8')}`,
            HtmlPart: `${fs.readFileSync(`../${filePathHtml}`,'utf8')}`
        }
        const command = new CreateTemplateCommand(templateJson);
        const response = await client.send(command);
        console.log(response);
    })
}catch(error){
    console.log(error)
    throw new Error('Fallo la ejecucion del script')
}