# issue

* 页面被顶上去后不会自动下来

  ```js
  {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollTop - 1, 0));
  }
  ```

* [map与parseInt的陷阱](./map&parseInt.md)
