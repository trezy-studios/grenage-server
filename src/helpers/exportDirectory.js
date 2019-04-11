// Module imports
import fs from 'fs'
import path from 'path'





function exportDirectory (requirePath) {
  let exports = {}

  for (const filename of fs.readdirSync(requirePath)) {
    if (!/^index\./.test(filename)) {
      exports = {
        ...exports,
        ...require(path.resolve(requirePath, filename)),
      }
    }
  }

  return exports
}





export { exportDirectory }
