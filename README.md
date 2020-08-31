# Dynamo Dashboard

This tool is used to quickly lookup items in DynamoDB running locally.
AWS has a dashboard when you're using the hosted version, but it's often tedious to find an item when running it locally in the containerized version.

This tool aims to fill that gap.

## Setup

In both the `api/` and `ui/` folders, there is another folder, `env/`.
Copy the contents of the `env.example` into a new file named `.env.local`.
Change any values that are applicable to your use case.

Run `yarn` in both the `api/` and the `ui/` folders to install the necessary dependencies.

## DynamoDB

The expectation is that Dynamo will be running in a Docker container, and is accessible by the application.
If that is not the case, create an environment variable named `DYNAMO_ENDPOINT` in the `api/env/.env.local` file, and the api will connect to that endpoint.

If you are running the standard Dynamo configuration, no further actions are needed.

## Dashboard

Start command: `yarn start`

The dashboard is a Vue application, written in TypeScript. If it fits your needs, great. If not, make any changes you'd like.

In the env, there are 4 variables that control the color of the text. It's a very basic theme mechanism.

```sh
export VUE_APP_STRING_COLOR='green'
...
```

Change these values in the `ui/env/.env.local` to meet your needs. Any css valid color (hex codes, rgb, etc.) will work.

## API

Start command: `yarn start`

The API is a very basic express app also written in TS. 
It does nothing more than run operations against the local DynamoDB instance based on input in the UI. 
No inputs are scrubbed, sanitized, or anything else to alter them. This tool is designed for use with the local instance of Dynamo.
