class API {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = this.queryString;

    const excludedFields = [];

    excludedFields.forEach((ele) => delete queryObject[ele]);

    // Advanded Filtering

    let queryStr = JSON.stringify(queryObject);

    // eslint-disable-next-line no-unused-vars
    queryStr = queryStr.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (match) => `$${match}`,
      this.query.find(JSON.parse(queryStr))
    );
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limiting() {
    if (this.queryString.fields) {
      const selectBy = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(selectBy);
    }
    return this;
  }

  pagination() {
    // Pagination

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = API;
