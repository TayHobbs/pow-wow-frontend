import Ember from 'ember';
import AuthenticatedRoute from 'pow-wow-frontend/routes/authenticated';


export default AuthenticatedRoute.extend({
  model: function() {
    console.log(this.store.find('user'));
    this.store.find('user');
  }
});
