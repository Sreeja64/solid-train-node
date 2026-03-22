const { add, sub } = require('../math')

const result = (a, b, c) => {
    return add(sub(a, b), c)
}

//default export
module.exports =  result;