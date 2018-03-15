
class TodoListModel {
    
    constructor () {
        this.items = [];
        this.onChangeCallbacks = [];
    }

    init (items) {
        this.items = items;
    }

    subscribe (callback) {
        this.onChangeCallbacks.push(callback);
    }

    dispatch () {
        this.onChangeCallbacks.map((callback => {
            callback(this.items);
        }).bind(this));
    }
    
    add (title) {
        let id = Math.random().toString(16).substring(7, 15);
        this.items.push({title: title, checked: false, id: id});
        
        this.dispatch();
    }

    toggle (itemToToggle) {
        this.items = this.items.map (item => {
            if (item === itemToToggle) {
                item.checked = !item.checked;
            }

            return item;
        });
        
        this.dispatch();
    }
    
    delete (itemToDelete) {
        this.items = this.items.filter(item => item !== itemToDelete);
        
        this.dispatch();
    }
    
    setAll (checked) {
        this.items = this.items.map (item => {
            item.checked = checked;

            return item;
        });
        
        this.dispatch();
    }
    
    allChecked () {
        return this.items.length !== 0 && this.items.filter(item => !item.checked).length === 0;
    }
    
    getItems (filter = 'all') {
        switch (filter) {
            case 'checked':
                return this.items.filter(item => item.checked);
            case 'unchecked':
                return this.items.filter(item => !item.checked);
            default:
                return this.items;
        }
    }
}

export default TodoListModel;
