import Ember from 'ember';
import AuthenticatedRoute from 'pow-wow-frontend/routes/authenticated';

export default AuthenticatedRoute.extend({
  renderTemplate: function() {
      this.render('confirm-delete', {
      into: 'account',
      outlet: 'confirm',
      controller: 'account'
    });
  }
});
