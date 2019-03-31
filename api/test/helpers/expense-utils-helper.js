export default class ExpenseUtilsHelper {
  constructor(expenseHelper, providerHelper, expenseTypeHelper) {
    this.expenseHelper = expenseHelper;
    this.providerHelper = providerHelper;
    this.expenseTypeHelper = expenseTypeHelper;

    this.createExpenseItem = this.createExpenseItem.bind(this);
  }

  async createExpenseItem({
    id = null,
    typeId = null,
    name = 'Tester',
    cpf_cnpj = '123.456.789-0',
    type = 'Compra de produto',
    date = '2019-03-10T19:52:01.000Z',
    value = 20
  }) {
    let providerId = id;
    if (!providerId) {
      const { body: provider } = await this.providerHelper.maybeCreate({
        cpf_cnpj,
        name
      });
      providerId = provider.id;
    }

    let expenseTypeId = typeId;
    if (!expenseTypeId) {
      const { body: expenseType } = await this.expenseTypeHelper.maybeCreate({
        name: type
      });
      expenseTypeId = expenseType.id;
    }

    const newItem = {
      date,
      value,
      providerId,
      expenseTypeId
    };

    return await this.expenseHelper.maybeCreate(newItem);
  }
}
