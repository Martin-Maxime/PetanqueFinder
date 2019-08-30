import Api from '@/services/Api';

export default {
  listRequests() {
    return Api().get('requests');
  },
  postRequest(params) {
    return Api().post('requests', params);
  }
};
