const bodyBuilder = () => async (context, next) => {
  const meta = {
    start_ms: Date.now()
  }
  let body = {}

  await next()

  if (context.errors) {
    body.errors = context.errors
  } else {
    body = {
      ...body,
      ...(context.data || {}),
      jsonapi: {
        version: '1.0',
      },
      meta: {
        ...meta,
        ...(context.data.meta || {}),
      },
    }

    delete body.data.password

    if (Array.isArray(body.data)) {
      body.meta.count = body.data.length
    }
  }

  body.meta.end_ms = Date.now()
  body.meta.response_ms = (body.meta.end_ms - body.meta.start_ms)

  context.body = body
}

export { bodyBuilder }
