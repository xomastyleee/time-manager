export abstract class BaseTransformer<T, R> {
  abstract toInterface(entity: T | null): R | null
  abstract toEntity(dto: R): T
}
