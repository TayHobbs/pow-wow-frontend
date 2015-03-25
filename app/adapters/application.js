import ENV from 'pow-wow-frontend/config/environment';
import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: '',
  host: ENV.apiDomain
});
