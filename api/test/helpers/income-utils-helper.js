export default class IncomeUtilsHelper {
  constructor(incomeHelper, memberHelper, incomeTypeHelper) {
    this.incomeHelper = incomeHelper;
    this.memberHelper = memberHelper;
    this.incomeTypeHelper = incomeTypeHelper;

    this.createIncomeItem = this.createIncomeItem.bind(this);
  }

  async createIncomeItem({
    id = null,
    typeId = null,
    name = 'Tester',
    type = 'Oferta',
    date = '2019-03-10T19:52:01.000Z',
    value = 20
  }) {
    let memberId = id;
    if (!memberId) {
      const { body: member } = await this.memberHelper.maybeCreate({ name });
      memberId = member.id;
    }

    let incomeTypeId = typeId;
    if (!incomeTypeId) {
      const { body: incomeType } = await this.incomeTypeHelper.maybeCreate({
        name: type
      });
      incomeTypeId = incomeType.id;
    }

    const newItem = {
      date,
      value,
      memberId,
      incomeTypeId
    };

    return await this.incomeHelper.maybeCreate(newItem);
  }
}
