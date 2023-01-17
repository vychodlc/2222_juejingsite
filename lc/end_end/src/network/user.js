import { request } from "./request";

export function getUserList(p) {
  return request({
    url: '/user/getList',
    params: {p:p},
  })
}

export function editUser(table) {
  console.log(table);
  let formData = new FormData();
  formData.append('id',table.id);
  formData.append('username',table.username);
  formData.append('email',table.email);
  formData.append('password',table.password);
  formData.append('information',table.information);
  // fromDataMeth(formData)
  return request({
    method: 'POST',
    url: '/user/edit',
    data: formData
  })
}

export function addUser(table) {
  console.log(table);
  let formData = new FormData();
  formData.append('username',table.username);
  formData.append('email',table.email);
  formData.append('password',table.password);
  formData.append('information',table.information);
  // fromDataMeth(formData)
  return request({
    method: 'POST',
    url: '/user/add',
    data: formData
  })
}

export function delUser(id) {
  return request({
    url: '/user/delete',
    params: {userId:id},
  })
}

//处理fromData
function fromDataMeth(formData) {
  for (var key of formData.keys()) {
    console.log("key:" + key + " value:" + formData.get(key));
  }
  return 123;
}
