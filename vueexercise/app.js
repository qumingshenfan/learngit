var list = [
  /*  {
        title:"吃饭打豆豆"
    },
    {
        title:"吃饭打豆豆"
    }*/
];
new Vue({
    el:".main",
    data:{
        list:list
    },
    methods: {
        addTodo(ev){//添加任务
            //向list中添加一项任务
            /*
            {

            }
             */

             //事件处理函数中的this指向的是，当前这个根实例
            if(ev.keyCode === 13)
            this.list.push({
                title:ev.target.value
            })
        }
    }
})