export default class hollandModel {
  apply = true;

  single_p = new Array(42);

  multi_p = new Map([
    ["r", new Array(7)],
    ["i", new Array(7)],
    ["a", new Array(7)],
    ["s", new Array(7)],
    ["e", new Array(7)],
    ["c", new Array(7)],
  ]);

  resetValue() {
    this.apply = true;

    this.single_p = new Array(42);

    this.multi_p = new Map([
      ["r", new Array(7)],
      ["i", new Array(7)],
      ["a", new Array(7)],
      ["s", new Array(7)],
      ["e", new Array(7)],
      ["c", new Array(7)],
    ]);
  }

  updateAtt() {
    this.apply = document.getElementById("apply-holland").checked;

    document.querySelectorAll(".holland-p").forEach((input) => {
      this.single_p[input.dataset.index] = Number(input.value);
    });

    document.querySelectorAll(".multi-holland-p").forEach((input) => {
      this.multi_p.get(input.dataset.subject)[input.dataset.index] = Number(
        input.value
      );
    });
  }

  updatePage() {
    const validate = (value, selectElm) => {
      if (
        Array.from(selectElm.options)
          .map((opt) => Number(opt.value))
          .includes(value)
      )
        return value;
      else return 0;
    };

    document.getElementById("apply-holland").checked = this.apply;

    document.querySelectorAll("select.holland-p").forEach((input) => {
      input.value = validate(this.single_p[input.dataset.index], input);
    });

    document.querySelectorAll("select.multi-holland-p").forEach((input) => {
      input.value = validate(
        this.multi_p.get(input.dataset.subject)[input.dataset.index],
        input
      );
    });
  }

  getJSON() {
    const convertField = (classField) => {
      if (classField instanceof Map)
        return Object.fromEntries(classField.entries());
      else return classField;
    };

    return {
      apply: this.apply,
      single_p: convertField(this.single_p),
      multi_p: convertField(this.multi_p),
    };
  }

  getCode() {
    this.updateAtt();
    return btoa(JSON.stringify(this.getJSON()));
  }

  decode(code) {
    const getValidArr = (validLength, arr) => {
      if (arr.length < validLength)
        arr = arr.concat(new Array(validLength - arr.length));

      return arr;
    };

    try {
      this.resetValue();

      let jsonObj = JSON.parse(atob(code));

      for (let [key, value] of Object.entries(jsonObj)) {
        if (!this.hasOwnProperty(key)) continue;

        if (Array.isArray(value))
          this[key] = getValidArr(this[key].length, value);
        else if (typeof value === "object") {
          for (let [vKey, vValue] of Object.entries(value))
            if (this[key].has(vKey) && Array.isArray(vValue))
              this[key].set(
                vKey,
                getValidArr(this[key].get(vKey).length, vValue)
              );
        } else this[key] = value;
      }

      this.updatePage();

      return true;
    } catch (err) {
      return false;
    }
  }
}
