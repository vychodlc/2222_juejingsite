import { request } from "./request";

export function getTagList(p) {
  return request({
    url: '/tag/getList',
    params: {p:p},
  })
}

export function editTag(table) {
  console.log(table);
  let formData = new FormData();
  formData.append('id',table.id);
  formData.append('name',table.name);
  formData.append('isShow',table.isShow);
  // fromDataMeth(formData)
  return request({
    method: 'POST',
    url: '/tag/edit',
    data: formData
  })
}

export function addTag(table) {
  console.log(table);
  let formData = new FormData();
  formData.append('name',table.name);
  // fromDataMeth(formData)
  return request({
    method: 'POST',
    url: '/tag/add',
    data: formData
  })
}

export function delTag(id) {
  return request({
    url: '/tag/delete',
    params: {tagId:id},
  })
}

//处理fromData
function fromDataMeth(formData) {
  for (var key of formData.keys()) {
    console.log("key:" + key + " value:" + formData.get(key));
  }
  return 123;
}
