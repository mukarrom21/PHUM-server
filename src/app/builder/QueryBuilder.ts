import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  // create constructor
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  // Searching method create
  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery?.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: this.query?.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }

  // Filtering method create
  filter() {
    const filterQueries = { ...this.query }
    // define exclude queries to exclude properties from filterQueries
    const excludeQueries = ['searchTerm', 'sort', 'page', 'limit', 'fields']
    // delete properties form filterQueries which match with excludeQueries elements
    excludeQueries.forEach(elm => delete filterQueries[elm])

    this.modelQuery = this.modelQuery?.find(filterQueries as FilterQuery<T>)

    return this
  }

  // Sorting method create
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt'
    this.modelQuery = this?.modelQuery?.sort(sort as string)

    return this
  }

  // Paginating method create
  paginate() {
    const limit = Number(this?.query?.limit) || 1
    const page = Number(this?.query?.page) || 1
    const skip = (page - 1) * limit

    this.modelQuery = this?.modelQuery?.skip(skip)?.limit(limit)

    return this
  }

  // Fields limiting method create
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
    this.modelQuery = this?.modelQuery?.select(fields)

    return this
  }

  // count total (meta)
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter()
    const total = await this.modelQuery.model.countDocuments(totalQueries)
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 10
    const totalPage = Math.ceil(total / limit)
    return {
      page,
      limit,
      total,
      totalPage,
    }
  }
}

export default QueryBuilder
