import { request } from 'chai';
import api from '../../src/server';

export default class DatabaseHelper {
  constructor(route) {
    this.lastCreatedId = [];
    this.route = route;
  }

  getLastCreatedId() {
    const tempArray = [...this.lastCreatedId];
    return tempArray.pop();
  }

  async maybeCreate(newItem) {
    const res = await request(api)
      .post(`/${this.route}`)
      .send(newItem);

    this.lastCreatedId.push(res.body.id);

    return res;
  }

  async maybeUpdate(newData, id) {
    const updateId = id || this.getLastCreatedId();
    const res = await request(api)
      .put(`/${this.route}/${updateId}`)
      .send(newData);

    return res;
  }

  async maybeGetItem(id) {
    const getId = id || this.getLastCreatedId();

    const res = await request(api)
      .get(`/${this.route}/${getId}`)
      .send();

    return res;
  }

  async maybeGetAll() {
    const res = await request(api)
      .get(`/${this.route}`)
      .send();

    return res;
  }

  async maybeDeleteItem(id) {
    const deleteId = id || this.getLastCreatedId();
    const res = await request(api)
      .delete(`/${this.route}/${deleteId}`)
      .send();

    return res;
  }

  async maybeDeleteAll() {
    const requests = [];
    for (const id of this.lastCreatedId) {
      requests.push(
        request(api)
          .delete(`/${this.route}/${id}`)
          .send()
      );
    }

    return await Promise.all(requests);
  }
}
