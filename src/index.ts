/**
 * Required External Modules
 */
import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { urlsRouter } from './urls/urls.router'
import { apiKeysRouter } from './apiKeys/apiKeys.router'
import { redirector } from './redirector/redirector.router'
import { errorHandler } from './middleware/error.middleware'
import { createConnection } from 'typeorm'
import { Url } from './urls/url.entity'
import { ApiKey } from './apiKeys/apiKey.entity'

dotenv.config()

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

/**
 * Database Connections
 */
// TODO: Bunu ayrı bir script'e eklemek daha mantıklı olabilir. ormconfig.ts gibi
// TODO: Sunucunun request beklemeye başlamasını connection sağlandıktan sonra yapmak daha mantıklı olabilir.
createConnection({
  "type": "mssql",
  "host": "testdb",
  "port": 1433,
  "username": "test-user",
  "password": "testDevUser111",
  "database": "UrlShortener",
  "synchronize": true,
  "entities": [
    Url,
    ApiKey
  ]
}).then(connection => {
  console.log('Connected')
}).catch(err => console.log(err))

/**
 *  App Configuration
 */
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/r', redirector)
app.use('/keys', apiKeysRouter)
app.use('/urls', urlsRouter)
// Add error handler
app.use(errorHandler)

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

/**
 * Webpack HMR Activation
 */

type ModuleId = string | number

interface WebpackHotModule {
  hot?: {
    data: any
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void
    accept(dependency: string, callback?: () => void): void
    accept(errHandler?: (err: Error) => void): void
    dispose(callback: (data: any) => void): void
  }
}

declare const module: WebpackHotModule

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.close())
}

if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => server.close())
}
