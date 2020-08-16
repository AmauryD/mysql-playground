import { helper } from '@ember/component/helper';

export default helper(function sqlData([data]/*, hash*/) {
  if (typeof data === "string") {
    return data.substring(0,255);
  }else if (data === null) {
    return "NULL";
  } else {
    return data;
  }
});
