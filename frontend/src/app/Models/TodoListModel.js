
class TodoListModel {

    constructor (items) {
        this.items = items;
    }
    
    subscribeOnChange (callback) {
        this.onChange = callback;
    }
    
    add (title) {
        let id = Math.random().toString(16).substring(7);
        this.items.push({title: title, checked: false, id: id});
        
        this.onChange();
    }
    
    toggle (itemToToggle) {
        this.items = this.items.map (item => {
            if (item === itemToToggle) {
                item.checked = !item.checked;
            }

            return item;
        });
        
        this.onChange();
    }
    
    delete (itemToDelete) {
        this.items = this.items.filter(item => item !== itemToDelete);
        
        this.onChange();
    }
    
    setAll (checked) {
        this.items = this.items.map (item => {
            item.checked = checked;

            return item;
        });
        
        this.onChange();
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
