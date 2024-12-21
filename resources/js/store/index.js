import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        users: []
    },
    mutations: {
        SET_USER_LIST(state, users) {
            state.users = users;
        }
    },
    actions: {
        async fetchUserList({ commit }) {
            try {
                const response = await axios.get('/api/users');
                commit('SET_USER_LIST', response.data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        }
    },
    getters: {
        getUsers(state) {
            return state.users;
        }
    }
});

export default store;
