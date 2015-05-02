import AuthenticatedRoute from 'pow-wow-frontend/routes/authenticated';

export default AuthenticatedRoute.extend({
  model(params) {
    return this.store.find('user', params.user_id);
  }
});

