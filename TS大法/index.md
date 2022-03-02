### 遇到的问题

- 在使用交叉类型时，中如果存在相同的属性，但属性的类型又不兼容，如何处理？

```typescript
type A = {
  name: string;
  others: number | undefind;
};
type B = {
  age: number;
  others: string;
};

// 不能将类型“number”分配给类型“never”
export type UnitAB = A & B;
// 不能将类型“number”分配给类型“string”。
export type UnitAB = Omit<A, "others"> & B;
// 不能将类型“string”分配给类型“number | undefined”。
export interface UnitAB extends A, B {}
// 不能将类型“string”分配给类型“[]”
export interface UnitAB extends A, B {
  others: [];
}
```
