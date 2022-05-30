import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            name : 'kim',
            age : 20,
            likes : 30,
            temp: true,
            more: {},
        }
    },
    mutations : {
        이름변경(state){
            state.name = 'park'
        },
        나이변경(state, payload){
            state.age += payload;
        },
        likeAdd(state){

            if(state.temp == true) {
                state.likes++;
                state.temp = false;
                // this.temp = false;
            } else {
                state.likes--;
                state.temp = true;
            }
        },
        setMore(state, payload){
            state.more = payload
        }
    },
    // 더보기 게시물 ajax요청 하려면?
    actions: {
        getData(context){
            axios.get(`https://codingapple1.github.io/vue/more0.json`)
            .then((a) => {
                context.commit('setMore', a.data)
            })
        },
    }
})

export default store;