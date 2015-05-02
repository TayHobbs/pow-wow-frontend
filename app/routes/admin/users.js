import AuthenticatedRoute from 'pow-wow-frontend/routes/authenticated';

export default AuthenticatedRoute.extend({
  model() {
    return this.store.find('user');
  }
});
