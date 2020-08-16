declare module 'fastify' {
    interface FastifyRequest { // you must reference the interface and not the type
        someProp: string
    }
}

// Or you can type your request using
export type SqlQueryRequest = FastifyRequest<{
    Body: { request: string };
    Params : { database : string }
}>

