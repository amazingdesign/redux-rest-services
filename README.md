## State structure

```js
{
  isLoading: false,
  isError: false,
  [actionName]: {
    isLoading: false,
    isError: false,
    touched: null,
    data: {},
    rawData: {},
  }
}
```
