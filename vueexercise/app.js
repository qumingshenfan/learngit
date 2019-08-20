var list = [
    {
        title:"吃饭打豆豆",
        isChecked:false
    },
    {
        title:"吃饭打豆豆",
        isChecked:true    //状态为true：选中
    }
];
new Vue({
    el:".main",
    data:{
        list:list,
        todo:"",
        edtorTodos:''  //记录正在编辑的数据
    },
    methods: {
        addTodo(){//添加任务
            this.list.push({
                title:this.todo,
                isChecked:false
            });
            this.todo = '';
        },
        deleteTodo(todo){//删除任务
            var index = this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        edtorTodo(todo){
            console.log(todo);
            this.edtorTodos = todo;
        }
    }
})