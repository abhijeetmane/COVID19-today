import orderBy from "lodash/orderBy";

export const sortBy = (collection, iterator, order = "desc") =>
  orderBy(collection, [iterator], [order]);
