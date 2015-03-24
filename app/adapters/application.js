import DS from 'ember-data';
import ENV from 'pow-wow-frontend/config/environment';

export default DS.ActiveModelAdapter.extend({
  namespace: '',
  host: ENV.apiDomain,
});
