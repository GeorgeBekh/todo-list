import _ from 'lodash';

class TodoListNetworkStorage {

    constructor (provider) {
        this.provider = provider;
        this.items = [];
        this.onChangeCallback = this.onChangeCallback.bind(this);
    }

    getItems (onSuccess) {
        let callback = response => {
            this.items = _.cloneDeep(response.data);
            onSuccess(response.data);
        };

        this.provider.request(
            {
                method: 'get',
                url: '/api/todo/'
            },
            callback.bind(this)
        );
    }

    onChangeCallback (newItems) {
        let transaction = this.getTransaction(this.items, newItems);
        this.items = _.cloneDeep(newItems);
        
        this.requestTransaction(transaction);
    }
    
    getTransaction (oldItems, newItems) {
        let addedItems = [];
        let changedItems = [];
        newItems.map(newItem => {
            let oldItem = _.find(oldItems, {id: newItem.id});
            if (!oldItem) {
                addedItems.push(newItem);
                return;
            }
            
            if (!_.isEqual(oldItem, newItem)) {
                changedItems.push(newItem);
            }
        });
        
        let deletedItems = oldItems.filter(oldItem => {
            return !_.find(newItems, {id: oldItem.id});
        });
        
        let transaction = {
            add: addedItems,
            change: changedItems,
            delete: deletedItems
        };

        console.log('Transaction to perform ', transaction);

        return transaction;
    }


    requestTransaction (transaction) {
        this.add(transaction.add);
    }
    
    add (items) {
        for (let i in items) {
            this.provider.request({
                method: 'post',
                url: '/api/todo/' + items[i].id + '/',
                data: {
                    title: items[i].title
                }
            });
        }
    }
}

export default TodoListNetworkStorage;