import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs'
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import * as cwlogs from "aws-cdk-lib/aws-logs"

interface EcommerceApiStackProps extends cdk.StackProps{
    productsFetchHandler: lambdaNodeJS.NodejsFunction
}

export class EcommerceApiStack extends cdk.Stack{
    constructor(scope:Construct, id:string, props: EcommerceApiStackProps){
        super(scope,id, props)

        const logGroup = new cwlogs.LogGroup(this, "EcommerceApiLogs")
        const api = new apigateway.RestApi(this, "EcommerceApi", {
            restApiName: "EcommerceApi",
            deployOptions: {
                accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod: true,
                    ip: true,
                    protocol:true,
                    requestTime: true,
                    resourcePath:true,
                    responseLength:true,
                    status: true,
                    caller: true,
                    user: true
                })
            },
            cloudWatchRole: true
        })

        const productsFetchIntegration = new apigateway.LambdaIntegration(props.productsFetchHandler);

        //criei o recurso products
        const productsResource = api.root.addResource("products")
        productsResource.addMethod("GET", productsFetchIntegration)
    }
}