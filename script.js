console.log('script loaded');

document.addEventListener("DOMContentLoaded", function () {

    var listItems = [
        'relax on a beach',
        'swim in a cenote',
        'snorkel',
        'see Mayan ruins',
        'eat plenty of tamales'
    ];

    function Item(item, complete, edit, display) {
        var self = this;
        self.item = ko.observable(item);
        self.complete = ko.observable(complete);
        self.edit = ko.observable(edit);
        self.display = ko.observable(display);

    }

    function AppViewModel() {
        var self = this;
        self.list = ko.observableArray([]);

        self.initializeList = function (items) {
            items.forEach((item) => {
                var newItem = new Item(item, false, false, true);
                self.list.push(newItem);
            });
        }
        self.initializeList(listItems);
        console.log('self.list: ');
        console.log(self.list);

        self.addItem = function () {
            var newItem = new Item('New item', false, true, false);
            self.list.push(newItem);
            console.log('new item:');
            console.log(newItem);

        }

        self.complete = function (selectedItem) {
            //console.log(self.list);
            var newItem = new Item(selectedItem.item, true, false, true);
            self.list.replace(selectedItem, newItem);

            // self.list.forEach((item, i) => {
            //     if (item.item == selectedItem.item) {
            //         self.list[i].complete = true;
            //     }
            //     console.log('worked');

            // });           
        }

        self.edit = function (selectedItem) {
            var newItem = new Item(selectedItem.item(), false);
            newItem.edit = true;
            newItem.display = false;
            self.list.replace(selectedItem, newItem);
            console.log(selectedItem.item());

        }
        self.onBlurEvent = function (selectedItem) {
            console.log('on blur');
            var newItem = new Item(selectedItem.item(), false);
            newItem.edit = false;
            newItem.display = true;
            self.list.replace(selectedItem, newItem);
            console.log(selectedItem.item());
        }
    }

  


    // Activates knockout.js
    ko.applyBindings(new AppViewModel());
});