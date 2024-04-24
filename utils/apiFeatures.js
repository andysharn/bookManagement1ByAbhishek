class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          bookName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    let queryStr = JSON.stringify(queryCopy);
    const { author, publishYear, ...otherFilters } = JSON.parse(queryStr);
    const filter = { ...otherFilters };
    if (author) {
      filter.author = author;
    }
    if (publishYear) {
      filter.publishYear = parseInt(publishYear);
    }
    this.query = this.query.find(filter);

    return this;
  }
}
module.exports = ApiFeature;
