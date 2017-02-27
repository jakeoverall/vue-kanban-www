import axios from 'axios'

let api = axios.create({
  baseURL: 'https://vue-kanban.herokuapp.com/api/',
  timeout: 2000,
  withCredentials: true
})
api.post('https://vue-kanban.herokuapp.com/login', {
  email: 'jake1@boisecodeworks.com',
  password: 'testing123'
})

// REGISTER ALL DATA HERE 
let state = {
  boards: [{name: 'This is total rubbish'}],
  activeBoard: {},
  error: {}
}

let handleError = (err) => {
  state.error = err
}

export default {
  // ALL DATA LIVES IN THE STATE
  state,
  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
    getBoards() {
      api('boards')
        .then(res => {
          state.boards = res.data.data
        })
        .catch(handleError)
    },
    getBoard(id) {
      api('boards/' + id)
        .then(res => {
          state.activeBoard = res.data.data
        })
        .catch(handleError)
    },
    createBoard(board) {
      api.post('boards/',board)
        .then(res => {
          this.getBoards()
        })
        .catch(handleError)
    },
    removeBoard(board) {
      api.delete('boards/'+board._id)
        .then(res => {
          this.getBoards()
        })
        .catch(handleError)
    }
  }

}

