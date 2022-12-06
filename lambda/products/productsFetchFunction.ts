import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context):Promise<APIGatewayProxyResult>{
    const lambdaRequestId = context.awsRequestId
    const apiRequestId = event.requestContext.apiId
    
    console.log(`API Gateway RequestId: ${apiRequestId} - Lambda Request Id: ${lambdaRequestId}`)
    const method = event.httpMethod;
    if(event.resource === "/products"){
        if(event.httpMethod === 'GET'){
            console.log('GET')
            return{
                statusCode: 200,
                body: JSON.stringify({
                    message: "GET Products - OK"
                })
            }
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Bad Request"
        })
    }
}