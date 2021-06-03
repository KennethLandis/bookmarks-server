const { v4: uuid} = require('uuid')

const bookmarks = [
    { id: uuid(),
      title: 'Thinkful',
      url: 'https://www.thinkful.com',
      description: 'Think outside the classrom',
      rating: 2  
    },
    { id: uuid(),
      title: 'Google',
      url: 'https://www.google.com',
      description: 'Where we find everything else',
      rating: 4
    },
    { id : uuid(),
      title: 'Funimation',
      url: 'https://www.funimation.com',
      description: 'You should be watching',
      rating: 1
    }
]

module.exports = { bookmarks }