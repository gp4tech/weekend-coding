# DevFest Adm

## Install dependencies

- Install [NVM](https://github.com/nvm-sh/nvm), you will need to switch between Node v10.15.3 and v16.16.0 for the project to work
- Install the previously mentioned versions of Node (`v10.15.3 and v16.16.0`)
- Use Node v10.15.3 `nvm use 10.15.3`
- Run `npm ci`

## Generate keys.ts file

- Use Node v16.16.0 `nvm use 16.16.0`
- Run `npm run keys:create`
- A file name `keys.ts` will be generated under `src/environments/`. You need to pass there the `Firebase keys`. For the development project, you can locate them [here](https://console.firebase.google.com/u/0/project/devfest2022dev/settings/general/web:MjhmMmFhMzEtOWQ3MS00YTg5LWE0MTYtMGZkN2IyZTk4ODcy)
- Note that you must not commit the generated file (it's ignored by default in the .gitignore file)

## Run the project in dev mode with JIT compilation

- Use Node v16.16.0 `nvm use 16.16.0`
- Install [Angular CLI](https://angular.io/cli)
- Run `ng serve`

## Generate dist bundles

- Use Node v16.16.0 `nvm use 16.16.0`
- Install [Angular CLI](https://angular.io/cli)
- Run `ng build --prod`

## Deploy project

- Use Node v16.16.0 `nvm use 16.16.0`
- Install [Firebase Tools](https://www.npmjs.com/package/firebase-tools)
- Run `npm run firebase:deploy`

## Additional Notes

- As you can see, you will need to use Node v10.15.3 to install packages. It's very important that you use `npm ci` instead of `npm i` to avoid sub-dependencies being overwritten
- Node v16.16.0 is used for everything else. The latest Node version may work as well, but the project was tested with the mentioned version
