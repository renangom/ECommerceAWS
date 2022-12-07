#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack';
import { EcommerceApiStack } from '../lib/ecommerceApi-stack';


const app = new cdk.App();

const env: cdk.Environment = {
  account: "061299128816",
  region: "us-east-1"
}

const tags = {
  cost: "Ecommerce",
  team: "SiecolaCode"
}

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags: tags,
  env: env
})

const ecommerceApiStack = new EcommerceApiStack(app, "EcommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags: tags,
  env: env
})

ecommerceApiStack.addDependency(productsAppStack)
