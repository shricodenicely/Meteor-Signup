import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    tasks.update(this._id, {
      $set: { checked: this.checked },
    });
  },

   'click .delete'() {
    tasks.remove(this._id);
  },
});
