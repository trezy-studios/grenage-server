const bodyBuilder = () => async (context, next) => {
  const meta = {
    start_ms: Date.now()
  }
  let body = {}

  context.errors = []

  await next()

  if (context.errors.length) {
    body.errors = context.errors
  } else if (context.data) {
    body = {
      ...body,
      ...context.data,
      jsonapi: {
        version: '1.0',
      },
      meta: context.data.meta || {},
    }

    if (Array.isArray(body.data)) {
      body.meta.count = body.data.length
    }
  }

  meta.end_ms = Date.now()
  meta.response_ms = (meta.end_ms - meta.start_ms)

  body.meta = {
    ...meta,
    ...body.meta,
  }

  context.body = body
}





export { bodyBuilder }
