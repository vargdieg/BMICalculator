import { SESClient,ListIdentitiesCommand,VerifyEmailIdentityCommand } from "@aws-sdk/client-ses";
export async function VerifyIdentityEmail(region,email){
    const client = new SESClient({region: "us-east-1"});
    let input = {};
    const commandIdentity = new ListIdentitiesCommand(input);
    const responseIdentity = await client.send(commandIdentity);
    if(responseIdentity.Identities){
        let identities = responseIdentity.Identities;
        let email2 = identities.filter(identity => identity == email);
        if(email2.length == 0){
            input = {
                EmailAddress: email
            };
            const command = new VerifyEmailIdentityCommand(input);
            const responseVerify = await client.send(command);
            return responseVerify;
        }else{
            return {
                error: "The email is already verified"
            };
        }
    }else{
        return {
            error: "Problem encountered sending the email"
        };
    }
}