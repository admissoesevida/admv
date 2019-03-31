import { request } from 'chai';
import api from '../../src/server';

export default class IncomeTypeHelper {
  constructor() {
    this.lastCreatedId = [];
  }

  getLastCreatedId() {
    const tempArray = [...this.lastCreatedId];
    return tempArray.pop();
  }

  async maybeCreate(newItem) {
    const res = await request(api)
      .post(`/income-types`)
      .send(newItem);

    this.lastCreatedId.push(res.body.id);

    return res;
  }

  async maybeUpdate(newData, id) {
    const updateId = id || this.getLastCreatedId();
    const res = await request(api)
      .put(`/income-types/${updateId}`)
      .send(newData);

    return res;
  }

  async maybeGetItem(id) {
    const getId = id || this.getLastCreatedId();

    const res = await request(api)
      .get(`/income-types/${getId}`)
      .send();

    return res;
  }

  async maybeGetAll() {
    const res = await request(api)
      .get(`/income-types`)
      .send();

    return res;
  }

  async maybeDeleteItem(id) {
    const deleteId = id || this.getLastCreatedId();
    const res = await request(api)
      .delete(`/income-types/${deleteId}`)
      .send();

    return res;
  }

  async maybeDeleteAll() {
    const requests = [];
    for (const id of this.lastCreatedId) {
      requests.push(
        request(api)
          .delete(`/income-types/${id}`)
          .send()
      );
    }

    return await Promise.all(requests);
  }
}
