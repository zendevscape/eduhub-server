import { ConnectionArgs } from '../dto';

export async function validatePaginationParams({
  first = 0,
  last = 0,
  after,
  before,
}: ConnectionArgs): Promise<void> {
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;

  if (isForwardPaging && isBackwardPaging) {
    throw new Error('Pagination cannot be forwards and backwards!');
  }

  if ((isForwardPaging && before) || (isBackwardPaging && after)) {
    throw new Error('Paging must use either first/after or last/before!');
  }

  if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0)) {
    throw new Error('Paging limit must be positive!');
  }

  if (last && !before) {
    throw new Error('When paging backwards, a "before" argument is required!');
  }
}

export async function getPaginationParams({
  first,
  last,
  after,
  before,
}: ConnectionArgs): Promise<{ limit?: number; cursor?: string }> {
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last && !!before;

  if (isForwardPaging) {
    return {
      limit: first,
      cursor: after,
    };
  }

  if (isBackwardPaging) {
    return {
      limit: -last,
      cursor: before,
    };
  }

  return {};
}
