export default{
namespaced:true,
 state:{
    value:0
 },
 getters:{
    FETCH_VALUE: (state) => state.value
 },
 mutations:{
    INCREASE_VALUE:(state) => state.value +=1 ,
    DECREASE_VALUE:(state) => state.value -=1 ,
 },
 actions:{
    increment: function ({commit}){
        commit("INCREASE_VALUE")
    },
    decrement: function ({commit}){
        commit("DECREASE_VALUE")
    }
 }   
   }
