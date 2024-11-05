input = "metaData.txt"
while read templateName subjectName templateFileNameHTML templateFileNameTEXT
  do
    htmlValue = `cat $templateFileNameHTML`
    textValue = `cat $templateFileNameTEXT`
    json = "{
      \"Template\": {
      \"TemplateName\": \"$templateName\",
      \"SubjectPart\": \"$subjectName\",
      \"TextPart\": \"$textValue\",
      \"HtmlPart\": \"$htmlValue\"
                    }
            }"
    echo $json > deployConfiguration.json
    aws ses create-template --cli-input-json deployConfiguration.json 
done < "$input"